import sys
import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# --- 1. Добавляем корень проекта в sys.path, чтобы найти database.py и models.py ---
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# --- 2. Импортируем наши модули ---
from database import Base, SQLALCHEMY_DATABASE_URL
from models import UserProfile  # важно: регистрирует модель в Base.metadata

# --- 3. Объект конфигурации Alembic ---
config = context.config

# --- 4. Подставляем URL базы (теперь config уже существует!) ---
config.set_main_option("sqlalchemy.url", SQLALCHEMY_DATABASE_URL)

# --- 5. Логирование из alembic.ini ---
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# --- 6. Метаданные моделей для autogenerate ---
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Миграции в offline-режиме (генерация SQL без подключения)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Миграции в online-режиме (с реальным подключением к базе)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()