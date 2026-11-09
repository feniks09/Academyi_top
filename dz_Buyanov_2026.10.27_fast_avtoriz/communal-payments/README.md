# Учет коммунальных платежей (Мини-проект на FastAPI)

Учебный проект: личный кабинет собственника нескольких квартир для учета коммунальных платежей (газ, вода, электричество, содержание). 

## Стек технологий
* **Бэкенд:** Python, FastAPI, Uvicorn
* **База данных:** PostgreSQL (в Docker) / SQLite (локально), SQLAlchemy (асинхронный), Alembic (миграции)
* **Кэширование:** Redis (с fallback на in-memory кэш)
* **Безопасность:** JWT (python-jose), хэширование паролей (passlib, bcrypt)
* **Фронтенд:** Jinja2, Vanilla JS
* **Инфраструктура:** Docker, Docker Compose, Render
* **Тестирование:** Pytest, httpx

## Запуск локально (без Docker)
1. Создайте и активируйте виртуальное окружение:
   ```bash
   python -m venv .venv
   # Windows:
   .venv\Scripts\activate
   # Linux/Mac:
   source .venv/bin/activate