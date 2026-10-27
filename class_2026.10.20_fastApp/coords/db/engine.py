from sqlalchemy.ext.asyncio import create_async_engine

from db.config import resolve_database_url, settings


engine = create_async_engine(
    resolve_database_url(),
    echo=settings.debug,
    future=True,
)
