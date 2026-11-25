from django.contrib import admin
from .models import Article

# Регистрируем модель Article в админке
admin.site.register(Article)