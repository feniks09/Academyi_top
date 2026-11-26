from django.db import models


class PaymentPermission(models.Model):
    class Meta:
        permissions = [
            ("can_view_all_payments", "Может просматривать все начисления"),
            ("can_edit_all_payments", "Может редактировать любые начисления"),
        ]