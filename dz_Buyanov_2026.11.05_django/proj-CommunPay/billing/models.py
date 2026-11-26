from django.db import models
from billing.managers import PaymentManager


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    class Meta:
        abstract = True


class User(BaseModel):
    username = models.CharField(max_length=50, unique=True, verbose_name="Имя пользователя")
    hashed_password = models.CharField(max_length=255, verbose_name="Пароль")

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return self.username


class Apartment(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.CharField(max_length=255, blank=True, verbose_name="Адрес")
    epd_code = models.CharField(max_length=50, blank=True, verbose_name="Код ЕПД")
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="apartments", verbose_name="Владелец"
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Квартира"
        verbose_name_plural = "Квартиры"

    def __str__(self):
        return self.name


class Payment(BaseModel):
    apartment = models.ForeignKey(
        Apartment, on_delete=models.CASCADE, related_name="payments", verbose_name="Квартира"
    )
    service = models.CharField(max_length=50, verbose_name="Услуга")
    year = models.PositiveIntegerField(verbose_name="Год")
    month = models.PositiveIntegerField(verbose_name="Месяц")
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Начислено (₽)")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Оплачено (₽)")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Объём потребления")
    tariff = models.FloatField(default=0.0, verbose_name="Тариф")

    objects = PaymentManager()

    class Meta:
        unique_together = ("apartment", "service", "year", "month")
        verbose_name = "Начисление"
        verbose_name_plural = "Начисления"

    def __str__(self):
        return f"{self.service} {self.year}-{self.month:02d}"


class PopularPayment(Payment):
    class Meta:
        proxy = True
        ordering = ["-tariff"]
        verbose_name = "Популярное начисление"
        verbose_name_plural = "Популярные начисления"

    @classmethod
    def top_selling(cls, limit=10):
        return cls.objects.best_sellers(limit)