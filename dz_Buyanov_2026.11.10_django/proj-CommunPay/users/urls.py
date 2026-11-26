from django.urls import path
from users import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("users/", views.user_list, name="user_list"),
]