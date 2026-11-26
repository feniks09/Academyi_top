from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.db.models import Sum
from decimal import Decimal, InvalidOperation
from billing.models import Apartment, Payment

MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]

# Стандартный набор услуг для квитанции
STANDARD_SERVICES = [
    {"code": "maintenance", "name": "Содержание жилья", "unit": "", "metered": False},
    {"code": "water", "name": "Холодная вода", "unit": "м³", "metered": True},
    {"code": "hot_water", "name": "Горячая вода", "unit": "м³", "metered": True},
    {"code": "water_drain", "name": "Водоотведение", "unit": "", "metered": False},
    {"code": "electricity", "name": "Электроэнергия", "unit": "кВт·ч", "metered": True},
    {"code": "heating", "name": "Отопление", "unit": "", "metered": False},
]


@login_required
def dashboard(request):
    if request.method == "POST":
        name = request.POST.get("name")
        description = request.POST.get("description")
        epd_code = request.POST.get("epd_code", "")
        if name and description:
            Apartment.objects.create(name=name, description=description, epd_code=epd_code, owner=request.user)
        return redirect("dashboard")
        
    apartments = Apartment.objects.filter(owner=request.user).annotate(
        total_due=Sum("payments__amount_due"),
        total_paid=Sum("payments__amount_paid")
    )
    return render(request, "billing/dashboard.html", {"apartments": apartments})


@login_required
def apartment_years(request, pk):
    apartment = get_object_or_404(Apartment, pk=pk, owner=request.user)
    years = Payment.objects.filter(apartment=apartment).values_list("year", flat=True).distinct().order_by("-year")
    if not years:
        years = [2026]
    return render(request, "billing/apartment_years.html", {
        "apartment": apartment, 
        "years": years
    })


@login_required
def apartment_year_months(request, pk, year):
    apartment = get_object_or_404(Apartment, pk=pk, owner=request.user)
    
    months_data = []
    for i in range(1, 13):
        payments = Payment.objects.filter(apartment=apartment, year=year, month=i)
        debt = payments.aggregate(d=Sum("amount_due") - Sum("amount_paid"))["d"] or 0
        # Проверяем, есть ли РЕАЛЬНЫЕ данные (начислено или оплачено больше 0)
        has_real_data = payments.filter(amount_due__gt=0).exists() or payments.filter(amount_paid__gt=0).exists()
        
        months_data.append({
            "num": i, 
            "name": MONTH_NAMES[i-1], 
            "debt": debt, 
            "has_data": has_real_data
        })

    return render(request, "billing/apartment_months.html", {
        "apartment": apartment, 
        "year": year, 
        "months": months_data
    })


@login_required
def month_details(request, pk, year, month):
    apartment = get_object_or_404(Apartment, pk=pk, owner=request.user)
    
    # 1. АВТО-СОЗДАНИЕ СТАНДАРТНЫХ УСЛУГ (если их еще нет)
    existing_services = Payment.objects.filter(apartment=apartment, year=year, month=month).values_list("service", flat=True)
    for svc in STANDARD_SERVICES:
        if svc["code"] not in existing_services:
            Payment.objects.create(
                apartment=apartment, service=svc["code"], year=year, month=month,
                prev_reading=0 if svc["metered"] else None,
                curr_reading=0 if svc["metered"] else None,
                quantity=0, tariff=0, amount_due=0, amount_paid=0
            )

    # 2. ОБРАБОТКА СОХРАНЕНИЯ ФОРМЫ (все строки сразу)
    if request.method == "POST":
        for svc in STANDARD_SERVICES:
            code = svc["code"]
            payment = Payment.objects.get(apartment=apartment, service=code, year=year, month=month)
            
            # Безопасный парсинг чисел (заменяем запятые на точки)
            tariff_str = request.POST.get(f"tariff_{code}", "0").replace(",", ".")
            paid_str = request.POST.get(f"paid_{code}", "0").replace(",", ".")
            tariff = float(tariff_str) if tariff_str else 0.0
            amount_paid = Decimal(paid_str) if paid_str else Decimal(0)

            if svc["metered"]:
                prev_str = request.POST.get(f"prev_{code}", "0").replace(",", ".")
                curr_str = request.POST.get(f"curr_{code}", "0").replace(",", ".")
                prev = float(prev_str) if prev_str else 0.0
                curr = float(curr_str) if curr_str else 0.0
                
                qty = max(0.0, curr - prev)
                payment.prev_reading = prev
                payment.curr_reading = curr
                payment.quantity = qty
                payment.amount_due = Decimal(str(qty)) * Decimal(str(tariff))
            else:
                due_str = request.POST.get(f"due_{code}", "0").replace(",", ".")
                payment.amount_due = Decimal(due_str) if due_str else Decimal(0)
                payment.prev_reading = None
                payment.curr_reading = None
                payment.quantity = 0

            payment.tariff = tariff
            payment.amount_paid = amount_paid
            payment.save()

        return redirect("month_details", pk=pk, year=year, month=month)

    # 3. СБОР ДАННЫХ ДЛЯ ОТОБРАЖЕНИЯ
    db_payments = {p.service: p for p in Payment.objects.filter(apartment=apartment, year=year, month=month)}
    
    receipt_rows = []
    total_due = Decimal(0)
    total_paid = Decimal(0)
    
    for svc in STANDARD_SERVICES:
        p = db_payments.get(svc["code"])
        if p:
            total_due += p.amount_due
            total_paid += p.amount_paid
            receipt_rows.append({
                "code": svc["code"], 
                "name": svc["name"], 
                "unit": svc["unit"],
                "prev": p.prev_reading, 
                "curr": p.curr_reading, 
                "quantity": p.quantity,
                "tariff": p.tariff, 
                "due": p.amount_due, 
                "paid": p.amount_paid,
                "balance": p.amount_due - p.amount_paid
            })

    # 4. ПОДСЧЕТ ДОЛГА ЗА ПРОШЛЫЕ МЕСЯЦЫ
    past_payments = Payment.objects.filter(apartment=apartment).exclude(year=year, month=month)
    past_debt = sum((p.amount_due - p.amount_paid) for p in past_payments if p.year < year or (p.year == year and p.month < month))

    current_month_debt = total_due - total_paid
    total_to_pay = current_month_debt + past_debt

    return render(request, "billing/month_details.html", {
        "apartment": apartment, 
        "year": year, 
        "month_name": MONTH_NAMES[month-1], 
        "month": month,
        "receipt_rows": receipt_rows, 
        "total_due": total_due, 
        "total_paid": total_paid,
        "current_month_debt": current_month_debt, 
        "past_debt": past_debt, 
        "total_to_pay": total_to_pay
    })


# --- КЛАСС ДЛЯ АНАЛИТИКИ (ДЗ №5) ---
class AnalyticsView(LoginRequiredMixin, PermissionRequiredMixin, TemplateView):
    template_name = "billing/analytics.html"
    permission_required = "users.can_view_all_payments"
    raise_exception = True

    @method_decorator(cache_page(60))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["apartments"] = Apartment.objects.annotate(total_due=Sum("payments__amount_due"))
        return context