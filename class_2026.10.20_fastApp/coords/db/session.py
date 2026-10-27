from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from db.engine import engine


DbSession = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
