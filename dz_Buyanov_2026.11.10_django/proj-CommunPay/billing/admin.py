from django.contrib import admin
from billing.models import Apartment, Payment, PopularPayment

@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "epd_code", "owner", "created_at")

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "apartment", "service", "year", "month", "amount_due", "amount_paid", "tariff")
    list_filter = ("service", "year")

@admin.register(PopularPayment)
class PopularPaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "service", "tariff")