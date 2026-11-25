from pathlib import Path

# Основная папка проекта
BASE_DIR = Path(__file__).resolve().parent.parent


# Секретный ключ Django
# Для учебного локального проекта
SECRET_KEY = 'django-insecure-myblog-study-project-2026-local-only-change-before-deployment'

# Режим отладки
DEBUG = True

# Разрешённые хосты
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']


# Установленные приложения
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Наше приложение
    'blog',
]


# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# Главный файл маршрутов
ROOT_URLCONF = 'myblog_project.urls'


# Настройки шаблонов
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        # Папка общих шаблонов
        'DIRS': [BASE_DIR / 'templates'],

        # Поиск шаблонов внутри приложения blog
        'APP_DIRS': True,

        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# WSGI
WSGI_APPLICATION = 'myblog_project.wsgi.application'


# База данных SQLite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Проверка паролей
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Язык проекта
LANGUAGE_CODE = 'ru-ru'

# Часовой пояс
TIME_ZONE = 'Europe/Moscow'

# Использование переводов
USE_I18N = True

# Часовые пояса
USE_TZ = True


# Статические файлы (CSS, изображения)
STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]


# Медиафайлы
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'


# Тип первичного ключа
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'