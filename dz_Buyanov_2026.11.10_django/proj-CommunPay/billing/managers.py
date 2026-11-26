from django.db import models
from django.db.models import Count, Sum


class PaymentManager(models.Manager):
    def with_sales_count(self):
        return self.get_queryset().annotate(
            sales_count=Count("payments", distinct=True)
        )

    def in_price_range(self, min_price=None, max_price=None):
        qs = self.get_queryset()
        if min_price is not None:
            qs = qs.filter(tariff__gte=min_price)
        if max_price is not None:
            qs = qs.filter(tariff__lte=max_price)
        return qs

    def best_sellers(self, limit=10):
        return self.get_queryset().annotate(
            total_sold=Sum("quantity")
        ).order_by("-total_sold")[:limit]