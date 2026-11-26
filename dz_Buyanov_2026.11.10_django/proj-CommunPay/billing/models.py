from django.conf import settings
from django.db import models
from billing.managers import PaymentManager

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")
    class Meta:
        abstract = True

class Apartment(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.CharField(max_length=255, blank=True, verbose_name="Адрес")
    epd_code = models.CharField(max_length=50, blank=True, verbose_name="Код ЕПД")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="apartments", verbose_name="Владелец")
    class Meta:
        ordering = ["name"]
        verbose_name = "Квартира"
        verbose_name_plural = "Квартиры"
    def __str__(self): return self.name

class ApartmentImage(BaseModel):
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="apartments/", verbose_name="Фото")
    thumbnail = models.ImageField(upload_to="apartments/thumbs/", blank=True, null=True)

class Payment(BaseModel):
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name="payments", verbose_name="Квартира")
    service = models.CharField(max_length=50, verbose_name="Услуга")
    year = models.PositiveIntegerField(verbose_name="Год")
    month = models.PositiveIntegerField(verbose_name="Месяц")
    
    # Разрешаем None для услуг без счетчиков
    prev_reading = models.FloatField(default=0.0, null=True, blank=True, verbose_name="Предыдущее показание")
    curr_reading = models.FloatField(default=0.0, null=True, blank=True, verbose_name="Текущее показание")
    
    quantity = models.FloatField(default=0.0, verbose_name="Расход")
    tariff = models.FloatField(default=0.0, verbose_name="Тариф")
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Начислено (₽)")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Оплачено (₽)")
    recalculation = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Перерасчёт (₽)")
    
    STATUS_CHOICES = [("unpaid", "Не оплачено"), ("paid", "Оплачено")]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="unpaid", verbose_name="Статус")

    objects = PaymentManager()

    class Meta:
        unique_together = ("apartment", "service", "year", "month")
        verbose_name = "Начисление"
        verbose_name_plural = "Начисления"

    def __str__(self):
        return f"{self.service} {self.year}-{self.month:02d}"

    def get_service_display(self):
        services = {"water": "Холодная вода", "hot_water": "Горячая вода", "water_drain": "Водоотведение", "electricity": "Электроэнергия", "gas": "Газ", "maintenance": "Содержание жилья", "heating": "Отопление"}
        return services.get(self.service, self.service)

class PopularPayment(Payment):
    class Meta:
        proxy = True
        ordering = ["-tariff"]
        verbose_name = "Популярное начисление"
        verbose_name_plural = "Популярные начисления"
    @classmethod
    def top_selling(cls, limit=10): return cls.objects.best_sellers(limit)