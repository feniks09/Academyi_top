from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from billing.api_views import ApartmentViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r"apartments", ApartmentViewSet)
router.register(r"payments", PaymentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("token/", obtain_auth_token),
]