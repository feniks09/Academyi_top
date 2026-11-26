from django.db import models


class VictoryPhraseModel(models.Model):

    message = models.TextField(
        verbose_name='Сообщение',
    )

    def __str__(self):
        return f"Сообщение: '{self.message}'"
