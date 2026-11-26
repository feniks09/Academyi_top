from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from billing.admin import admin_site
from users import views as user_views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("admin/", admin_site.urls),
    path("", user_views.index, name="index"),
    path("", include("users.urls")),
    path("", include("billing.urls")),
    
    # --- ПОДКЛЮЧЕНИЕ API ---
    path("api/", include("billing.api_urls")),
    # вход
    path("login/", auth_views.LoginView.as_view(template_name="users/login.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)