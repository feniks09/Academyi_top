from django.contrib import admin
from django.contrib.admin import AdminSite
from billing.models import Apartment, ApartmentImage, Payment, PopularPayment

class MyAdminSite(AdminSite):
    site_header = "Панель управления ЖКХ"
    site_title = "ЖКХ Админка"
    index_title = "Добро пожаловать в систему"

admin_site = MyAdminSite(name="myadmin")

class ApartmentImageInline(admin.TabularInline):
    model = ApartmentImage
    extra = 1

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

@admin.action(description="Отметить как оплаченные")
def mark_as_paid(modeladmin, request, queryset):
    updated = queryset.update(status="paid")
    modeladmin.message_user(request, f"Успешно обновлено {updated} записей.")

@admin.register(Apartment, site=admin_site)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "created_at")
    inlines = [ApartmentImageInline]

@admin.register(Payment, site=admin_site)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "apartment", "service", "amount_due", "status")
    list_filter = ("service", DebtFilter)
    actions = [mark_as_paid]

@admin.register(PopularPayment, site=admin_site)
class PopularPaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "service", "tariff")