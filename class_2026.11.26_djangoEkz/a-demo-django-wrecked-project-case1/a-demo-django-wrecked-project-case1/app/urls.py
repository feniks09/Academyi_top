from django.urls import path

from app.views import get_index


urlpatterns = [
    path('', get_index),
]