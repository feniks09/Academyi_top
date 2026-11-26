import time
from django.conf import settings

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Проверяем настройку в settings.py (ДЗ №5 п.2)
        if not getattr(settings, "ENABLE_REQUEST_LOGGING", False):
            return self.get_response(request)

        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time

        ip = request.META.get("REMOTE_ADDR")
        url = request.build_absolute_uri()
        
        print(f"🛡️ [LOG] IP: {ip} | URL: {url} | Время: {duration:.4f} сек")
        return response