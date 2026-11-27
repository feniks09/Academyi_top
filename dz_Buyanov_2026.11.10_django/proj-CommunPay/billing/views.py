from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.core.cache import cache
from django.db import connection
from django.db.models import Count, Sum
from django.test.utils import CaptureQueriesContext
from billing.models import Apartment, Payment

MONTH_NAMES = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
]


# ==========================================
# ЛИЧНЫЙ КАБИНЕТ
# ==========================================
@login_required
def dashboard(request):
    if request.method == "POST":
        action = request.POST.get("action")
        if action == "delete":
            apt_id = request.POST.get("apartment_id")
            Apartment.objects.filter(id=apt_id, owner=request.user).delete()
            return redirect("dashboard")
        else:
            name = request.POST.get("name")
            description = request.POST.get("description")
            epd_code = request.POST.get("epd_code", "")
            area = request.POST.get("area", 0)
            if name and description:
                Apartment.objects.create(
                    name=name, description=description, epd_code=epd_code, 
                    area=area, owner=request.user
                )
            return redirect("dashboard")

    apartments = Apartment.objects.filter(owner=request.user).annotate(
        total_due=Sum("payments__amount_due"),
        total_paid=Sum("payments__amount_paid")
    )
    return render(request, "billing/dashboard.html", {"apartments": apartments})


# ==========================================
# СПИСОК ГОДОВ И МЕСЯЦЕВ
# ==========================================
@login_required
def apartment_years(request, pk):
    apartment = get_object_or_404(Apartment, pk=pk, owner=request.user)
    years = list(Payment.objects.filter(apartment=apartment).values_list("year", flat=True).distinct().order_by("-year"))
    if not years:
        years = [2026]
    return render(request, "billing/apartment_years.html", {"apartment": apartment, "years": years})


@login_required
def apartment_year_months(request, pk, year):
    apartment = get_object_or_404(Apartment, pk=pk, owner=request.user)
    active_months = set(Payment.objects.filter(apartment=apartment, year=year).values_list("month", flat=True))
    months_data = []
    for i in range(1, 13):
        if i in active_months:
            agg = Payment.objects.filter(apartment=apartment, year=year, month=i).aggregate(d=Sum("amount_due"), p=Sum("amount_paid"))
            total_due = float(agg["d"] or 0)
            debt = total_due - float(agg["p"] or 0)
            months_data.append({"num": i, "name": MONTH_NAMES[i - 1], "has_data": True, "debt": debt, "total_due": total_due})
        else:
            months_data.append({"num": i, "name": MONTH_NAMES[i - 1], "has_data": False, "debt": 0, "total_due": 0})
    return render(request, "billing/apartment_months.html", {"apartment": apartment, "year": year, "months": months_data})


# ==========================================
# КВИТАНЦИЯ (С УМНЫМ РАСЧЕТОМ И ЗАЩИТОЙ ОТ ДУБЛИКАТОВ)
# ==========================================
@login_required
def month_details(request, pk, year, month):
    apartment = get_object_or_404(Apartment, pk=pk, owner=request.user)
    payments = Payment.objects.filter(apartment=apartment, year=year, month=month).order_by("id")

    if request.method == "POST":
        action = request.POST.get("action")
        
        # --- 1. СОХРАНЕНИЕ ОТРЕДАКТИРОВАННЫХ ПОКАЗАНИЙ ---
        if action == "update_rows":
            for p in payments:
                prev_read = float(request.POST.get(f"prev_{p.id}", 0) or 0)
                curr_read = float(request.POST.get(f"curr_{p.id}", 0) or 0)
                tarr = float(request.POST.get(f"tariff_{p.id}", 0) or 0)
                paid = float(request.POST.get(f"amount_paid_{p.id}", 0) or 0)

                p.prev_reading = prev_read
                p.curr_reading = curr_read
                p.tariff = tarr
                p.amount_paid = paid

                if p.service == "maintenance":
                    p.quantity = apartment.area if apartment.area else 1
                    p.amount_due = float(p.quantity) * float(p.tariff)
                elif p.service == "heating":
                    vol = curr_read - prev_read
                    if vol <= 0: vol = 1 
                    p.quantity = vol
                    p.amount_due = vol * float(p.tariff)
                else:
                    vol = curr_read - prev_read
                    if vol < 0: vol = 0
                    p.quantity = vol
                    p.amount_due = vol * tarr
                
                p.save()

            # Пересчет водоотведения (сумма ХВС и ГВС)
            wd = payments.filter(service="water_drain").first()
            if wd:
                water_pays = payments.filter(service__in=["water", "hot_water"])
                total_vol = sum(float(w.quantity) for w in water_pays)
                wd.quantity = total_vol
                wd.amount_due = total_vol * float(wd.tariff)
                wd.save()

            return redirect("month_details", pk=pk, year=year, month=month)

        # --- 2. ДОБАВЛЕНИЕ НОВОЙ СТРОКИ (БЕЗ ОШИБКИ 500) ---
        elif action == "add_row":
            service = request.POST.get("service")
            if service:
                # get_or_create либо найдет существующую, либо создаст новую. Дубликатов не будет!
                Payment.objects.get_or_create(
                    apartment=apartment, service=service, year=year, month=month,
                    defaults={
                        "prev_reading": 0, "curr_reading": 0, 
                        "quantity": 0, "tariff": 0, 
                        "amount_due": 0, "amount_paid": 0
                    }
                )
            return redirect("month_details", pk=pk, year=year, month=month)

    totals = payments.aggregate(total_due=Sum("amount_due"), total_paid=Sum("amount_paid"))
    total_due = totals["total_due"] or 0
    total_paid = totals["total_paid"] or 0

    return render(request, "billing/month_details.html", {
        "apartment": apartment, "year": year, "month": month,
        "month_name": MONTH_NAMES[month - 1], "payments": payments,
        "total_due": total_due, "total_paid": total_paid,
        "total_debt": total_due - total_paid,
    })


# ==========================================
# АНАЛИТИКА
# ==========================================
class AnalyticsView(LoginRequiredMixin, PermissionRequiredMixin, TemplateView):
    template_name = "billing/analytics.html"
    permission_required = "users.can_view_all_payments"
    raise_exception = True

    @method_decorator(cache_page(60))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get_queryset(self):
        return Apartment.objects.annotate(
            payments_count=Count("payments", distinct=True),
            total_due=Sum("payments__amount_due")
        ).prefetch_related("payments").order_by("name")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        apartments = self.get_queryset()

        # Raw SQL (ДЗ 3)
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT a.id, a.name, COALESCE(SUM(pay.amount_due - pay.amount_paid), 0) AS debt
                FROM billing_apartment a LEFT JOIN billing_payment pay ON pay.apartment_id = a.id
                GROUP BY a.id, a.name ORDER BY debt DESC
            """)
            cols = [c[0] for c in cursor.description]
            context["debt_by_apartment"] = [dict(zip(cols, row)) for row in cursor.fetchall()]

        # Бенчмарк SQL (ДЗ 5)
        with CaptureQueriesContext(connection) as ctx:
            list(apartments)
        context["sql_count"] = len(ctx.captured_queries)
        context["apartments"] = apartments

        # Low-level cache (ДЗ 5)
        services_stats = cache.get("services_stats")
        if not services_stats:
            services_stats = list(Apartment.objects.annotate(p_count=Count("payments")).values("name", "p_count"))
            cache.set("services_stats", services_stats, 300)
        context["cached_services"] = services_stats
        return context