"""
Тесты по требованиям ДЗ №9:
- регистрация
- логин
- создание проекта
- обновление проекта
- проверка доступа не владельца (403)
"""

# 1. Сначала — переменные окружения ДО импорта app,
#    чтобы engine создался на тестовой БД и без Redis.
import os

os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///./test_communal.db"
os.environ["REDIS_URL"] = ""

# 2. Теперь можно импортировать app и зависимости.
import asyncio
import uuid

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app


# 3. Фикстура: создать таблицы перед тестами, удалить после.
@pytest.fixture(scope="module", autouse=True)
def setup_db():
    async def _create():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)

    asyncio.run(_create())
    yield
    asyncio.run(engine.dispose())


# 4. Один клиент на весь модуль.
client = TestClient(app)


# 5. Вспомогательные функции.
def _unique(prefix: str = "u") -> str:
    return f"{prefix}_{uuid.uuid4().hex[:8]}"


def _register(username: str, password: str = "pass1234") -> str:
    r = client.post("/auth/register", json={"username": username, "password": password})
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


# 6. Тесты.

def test_register_and_login():
    username = _unique()
    token = _register(username)
    assert token

    r = client.post(
        "/auth/token",
        data={"username": username, "password": "pass1234"},
    )
    assert r.status_code == 200
    assert r.json()["access_token"]


def test_create_project():
    token = _register(_unique())
    r = client.post(
        "/projects/",
        json={"name": "Кв. 1", "description": "addr"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert r.status_code == 200
    data = r.json()
    assert data["name"] == "Кв. 1"
    assert data["owner_id"] > 0


def test_update_project():
    token = _register(_unique())
    headers = {"Authorization": f"Bearer {token}"}
    created = client.post(
        "/projects/",
        json={"name": "Old", "description": "d"},
        headers=headers,
    ).json()

    r = client.put(
        f"/projects/{created['id']}",
        json={"name": "New"},
        headers=headers,
    )
    assert r.status_code == 200
    assert r.json()["name"] == "New"


def test_non_owner_forbidden():
    owner_token = _register(_unique("owner"))
    other_token = _register(_unique("other"))

    created = client.post(
        "/projects/",
        json={"name": "Private", "description": ""},
        headers={"Authorization": f"Bearer {owner_token}"},
    ).json()

    # Чужой пользователь пытается изменить проект → 403
    r = client.put(
        f"/projects/{created['id']}",
        json={"name": "Hacked"},
        headers={"Authorization": f"Bearer {other_token}"},
    )
    assert r.status_code == 403

    # Чужой пользователь пытается удалить проект → 403
    r = client.delete(
        f"/projects/{created['id']}",
        headers={"Authorization": f"Bearer {other_token}"},
    )
    assert r.status_code == 403

    # Чужой пользователь пытается прочитать проект → 403
    r = client.get(
        f"/projects/{created['id']}",
        headers={"Authorization": f"Bearer {other_token}"},
    )
    assert r.status_code == 403


def test_unauthorized_without_token():
    # Без токена → 401
    r = client.get("/projects/")
    assert r.status_code == 401


def test_not_found_project():
    token = _register(_unique())
    r = client.get(
        "/projects/999999",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert r.status_code == 404