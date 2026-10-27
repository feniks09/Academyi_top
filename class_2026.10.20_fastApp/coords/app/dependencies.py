from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from db.session import DbSession


async def provide_db() -> AsyncSession:

    async with DbSession() as session:
        yield session


DbDep = Annotated[AsyncSession, Depends(provide_db)]
