# Мои квартиры и платежи (учебный проект на FastAPI)

Личный кабинет собственника нескольких квартир: учёт платежей по газу,
воде, электричеству, содержанию и прочим услугам.

## Стек
FastAPI, SQLAlchemy, Alembic, JWT (python-jose, passlib), Jinja2, SQLite.

## Запуск
1. `python -m venv .venv && .venv\Scripts\activate` (Windows) / `source .venv/bin/activate` (Linux/macOS)
2. `pip install -r requirements.txt`
3. `alembic upgrade head`
4. `python seed.py`
5. `uvicorn app.main:app --reload`
6. Открыть http://127.0.0.1:8000/ — логин `demo`, пароль `demo1234`

## Правила доступа
- Каждый пользователь видит только свои квартиры и свои платежи.
- Фильтрация выполняется на уровне SQL-запроса (`owner_id == current_user.id`).
- При попытке обратиться к чужой квартире/платежу — 404 (не раскрываем существование).

## Эндпоинты
- `POST /auth/register`, `POST /auth/token`, `GET /auth/me`
- `GET/POST /apartments/`, `DELETE /apartments/{id}`
- `GET/POST /payments/`, `PUT/DELETE /payments/{id}`
- `GET /payments/summary/?year=&month=`

Swagger: http://127.0.0.1:8000/docs