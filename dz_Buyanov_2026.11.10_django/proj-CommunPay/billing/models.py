from django.conf import settings
from django.db import models
from billing.managers import PaymentManager
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


class BaseModel(models.Model):
    """Абстрактная модель с датами создания и обновления (ДЗ3)."""
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    class Meta:
        abstract = True


class Apartment(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.CharField(max_length=255, blank=True, verbose_name="Адрес")
    epd_code = models.CharField(max_length=50, blank=True, verbose_name="Код ЕПД")
    
    # ДОБАВЛЯЕМ ПОЛЕ ПЛОЩАДИ (для содержания жилья и отопления)
    area = models.DecimalField(max_digits=8, decimal_places=2, default=0, verbose_name="Площадь (м²)")

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name="apartments", verbose_name="Владелец"
    )

class ApartmentImage(BaseModel):
    """Несколько изображений на квартиру (ДЗ6) с авто-ресайзом и превью."""
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="apartments/", verbose_name="Фото")
    thumbnail = models.ImageField(upload_to="apartments/thumbs/", blank=True, null=True)

    def save(self, *args, **kwargs):
        # Ресайз основного изображения
        if self.image:
            img = Image.open(self.image)
            if img.height > 500 or img.width > 500:
                img.thumbnail((500, 500))
                buffer = BytesIO()
                img.save(buffer, format="JPEG")
                self.image.save(self.image.name, ContentFile(buffer.getvalue()), save=False)
        super().save(*args, **kwargs)

        # Создание миниатюры
        if self.image and not self.thumbnail:
            img = Image.open(self.image)
            img.thumbnail((150, 150))
            buffer = BytesIO()
            img.save(buffer, format="JPEG")
            self.thumbnail.save(f"thumb_{self.image.name}", ContentFile(buffer.getvalue()), save=False)
            super().save(*args, **kwargs)

    def __str__(self):
        return f"Фото для {self.apartment.name}"


class Payment(BaseModel):
    """Начисления и показания (ЕПД)."""
    
    # Справочник услуг с русскими названиями
    SERVICE_CHOICES = [
        ("water", "ХВС (Холодная вода)"),
        ("hot_water", "ГВС (Горячая вода)"),
        ("water_drain", "Водоотведение"),
        ("electricity", "Электричество"),
        ("heating", "Отопление"),
        ("maintenance", "Содержание жилья"),
        ("capital_repair", "Капитальный ремонт"),
    ]

    apartment = models.ForeignKey(
        Apartment, on_delete=models.CASCADE, related_name="payments", verbose_name="Квартира"
    )
    service = models.CharField(max_length=50, choices=SERVICE_CHOICES, verbose_name="Услуга")
    year = models.PositiveIntegerField(verbose_name="Год")
    month = models.PositiveIntegerField(verbose_name="Месяц")

    # --- ПОКАЗАНИЯ СЧЕТЧИКОВ ---
    prev_reading = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Пред. показания")
    curr_reading = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Тек. показания")
    
    # --- РАСЧЕТЫ ---
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Объём")
    tariff = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Тариф")
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Начислено (₽)")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Оплачено (₽)")

    # Статус для массового изменения в админке
    STATUS_CHOICES = [("unpaid", "Не оплачено"), ("paid", "Оплачено")]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="unpaid", verbose_name="Статус")

    objects = PaymentManager()

    class Meta:
        unique_together = ("apartment", "service", "year", "month")
        verbose_name = "Начисление"
        verbose_name_plural = "Начисления"
        ordering = ["id"]

    def __str__(self):
        return f"{self.get_service_display()} {self.year}-{self.month:02d}"

    # Свойство для удобного вывода долга в шаблонах (чтобы не писать сложные теги)
    @property
    def debt(self):
        return max(0, self.amount_due - self.amount_paid)


class PopularPayment(Payment):
    """Proxy-модель (ДЗ3)."""
    class Meta:
        proxy = True
        ordering = ["-tariff"]
        verbose_name = "Популярное начисление"
        verbose_name_plural = "Популярные начисления"

    @classmethod
    def top_selling(cls, limit=10):
        return cls.objects.best_sellers(limit)