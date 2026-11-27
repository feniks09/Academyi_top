from django.contrib import admin
from django.contrib.admin import AdminSite
from django.db.models import Sum
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.urls import reverse

from billing.models import Apartment, ApartmentImage, Payment, PopularPayment


# 1. Кастомная админка (ДЗ6)
class MyAdminSite(AdminSite):
    site_header = "Панель управления ЖКХ"
    site_title = "ЖКХ Админка"
    index_title = "Добро пожаловать в систему"


admin_site = MyAdminSite(name="myadmin")


# 2. Инлайн для картинок (ДЗ6)
class ApartmentImageInline(admin.TabularInline):
    model = ApartmentImage
    extra = 1


# 3. Инлайн для начислений внутри квартиры (чтобы видеть их сразу)
class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 0
    fields = ("service", "year", "month", "quantity", "tariff", "amount_due", "amount_paid", "status")
    ordering = ("-year", "-month")


# 4. Кастомный фильтр (ДЗ6)
class DebtFilter(admin.SimpleListFilter):
    title = "Задолженность"
    parameter_name = "has_debt"

    def lookups(self, request, model_admin):
        return (("yes", "Есть долг"), ("no", "Нет долга"))

    def queryset(self, request, queryset):
        if self.value() == "yes":
            return queryset.filter(amount_due__gt=0, amount_paid=0)
        if self.value() == "no":
            return queryset.filter(amount_due__lte=0, amount_paid__gt=0)


# 5. Экшен (массовое действие) (ДЗ6)
@admin.action(description="Отметить как оплаченные")
def mark_as_paid(modeladmin, request, queryset):
    updated = queryset.update(status="paid")
    modeladmin.message_user(request, f"Успешно обновлено {updated} записей.")


# 6. Админка для Квартир
@admin.register(Apartment, site=admin_site)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "created_at")
    inlines = [ApartmentImageInline, PaymentInline]  # Добавили PaymentInline


# 7. Админка для Начислений (с предпросмотром квитанции)
@admin.register(Payment, site=admin_site)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "apartment", "service", "year", "month", "amount_due", "status", "view_receipt_link")
    list_filter = ("service", "year", "month", DebtFilter)
    actions = [mark_as_paid]
    list_select_related = ("apartment",)
    
    # Добавляем поле в карточку редактирования (внизу)
    readonly_fields = ("receipt_preview",)

    # Кнопка "Открыть на сайте"
    def view_receipt_link(self, obj):
        if obj.apartment and obj.year and obj.month:
            url = reverse("month_details", args=[obj.apartment.id, obj.year, obj.month])
            return format_html('<a class="button" href="{}" target="_blank">Открыть на сайте ↗</a>', url)
        return "—"
    view_receipt_link.short_description = "Ссылка"

    # Предпросмотр квитанции прямо в админке
    def receipt_preview(self, obj):
        if not obj.apartment:
            return "Сначала выберите квартиру"
            
        # Получаем все начисления за этот же месяц и квартиру
        payments = Payment.objects.filter(
            apartment=obj.apartment, year=obj.year, month=obj.month
        )
        
        # Считаем итоги
        totals = payments.aggregate(d=Sum("amount_due"), p=Sum("amount_paid"))
        total_due = totals["d"] or 0
        total_paid = totals["p"] or 0
        total_debt = total_due - total_paid

        # Собираем строки таблицы
        rows = ""
        for p in payments:
            rows += f"""
            <tr>
                <td style="border: 1px solid #333; padding: 5px;">{p.service}</td>
                <td style="border: 1px solid #333; padding: 5px;">{p.amount_due} ₽</td>
                <td style="border: 1px solid #333; padding: 5px;">{p.amount_paid} ₽</td>
            </tr>
            """

        # Генерируем HTML
        html = f"""
        <div style="border: 2px solid #333; padding: 15px; margin-top: 15px; font-family: 'Times New Roman', serif; background: white; max-width: 800px; color: black;">
            <h2 style="margin-top: 0; text-align: center;">Квитанция ЕПД</h2>
            <p><b>Квартира:</b> {obj.apartment.name} | <b>Адрес:</b> {obj.apartment.description}</p>
            <p><b>Период:</b> {obj.month}.{obj.year} г.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="background: #eee;">
                    <th style="border: 1px solid #333; padding: 5px;">Услуга</th>
                    <th style="border: 1px solid #333; padding: 5px;">Начислено</th>
                    <th style="border: 1px solid #333; padding: 5px;">Оплачено</th>
                </tr>
                {rows}
            </table>
            <p style="text-align: right; font-size: 18px; margin-top: 10px;">
                <b>Итого начислено:</b> {total_due} ₽ <br>
                <b>Итого оплачено:</b> {total_paid} ₽ <br>
                <b>Долг:</b> <span style="color: red;">{total_debt} ₽</span>
            </p>
        </div>
        """
        
        return mark_safe(html)

    receipt_preview.short_description = "Предпросмотр квитанции (за этот месяц)"


# 8. Админка для Прокси-модели (Популярные начисления)
@admin.register(PopularPayment, site=admin_site)
class PopularPaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "service", "tariff")