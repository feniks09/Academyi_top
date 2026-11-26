from django.urls import path
from billing import views

urlpatterns = [
    path("dashboard/", views.dashboard, name="dashboard"),
    path("dashboard/apartment/<int:pk>/", views.apartment_years, name="apartment_years"),
    path("dashboard/apartment/<int:pk>/<int:year>/", views.apartment_year_months, name="apartment_months"),
    path("dashboard/apartment/<int:pk>/<int:year>/<int:month>/", views.month_details, name="month_details"),
    path("analytics/", views.AnalyticsView.as_view(), name="analytics"),
]