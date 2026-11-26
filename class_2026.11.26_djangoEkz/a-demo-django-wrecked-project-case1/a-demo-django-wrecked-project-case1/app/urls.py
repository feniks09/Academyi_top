from django.urls import path
from app.views import get_index, api_ping 


urlpatterns = [
    path('', get_index),
    path('api/ping', api_ping),
]