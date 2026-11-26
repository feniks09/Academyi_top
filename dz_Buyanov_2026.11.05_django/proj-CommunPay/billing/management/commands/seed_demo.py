from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from billing.models import User, Apartment, Payment


class Command(BaseCommand):
    help = "Демо-данные: 2 квартиры, 6 начислений"

    def handle(self, *args, **options):
        if User.objects.filter(username="demo").exists():
            self.stdout.write("Seed уже выполнен")
            return

        user = User.objects.create(
            username="demo",
            hashed_password=make_password("demo1234"),
        )

        k1 = Apartment.objects.create(name="Кв. 12", description="ул. Ленина, 5", owner=user)
        k2 = Apartment.objects.create(name="Кв. 47", description="ул. Мира, 10", owner=user)

        Payment.objects.bulk_create([
            Payment(apartment=k1, service="gas",         year=2026, month=9, amount_due=800,  amount_paid=800,  quantity=8,  tariff=100),
            Payment(apartment=k1, service="water",       year=2026, month=9, amount_due=600,  amount_paid=600,  quantity=12, tariff=50),
            Payment(apartment=k1, service="electricity", year=2026, month=9, amount_due=900,  amount_paid=0,    quantity=11, tariff=80),
            Payment(apartment=k2, service="gas",         year=2026, month=9, amount_due=1000, amount_paid=1000, quantity=10, tariff=110),
            Payment(apartment=k2, service="water",       year=2026, month=9, amount_due=700,  amount_paid=300,  quantity=12, tariff=60),
            Payment(apartment=k2, service="maintenance", year=2026, month=9, amount_due=2000, amount_paid=0,    quantity=10, tariff=200),
        ])

        self.stdout.write(self.style.SUCCESS("Seed готов. Логин: demo / demo1234"))