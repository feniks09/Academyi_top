from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.point import Point


class PointServiceError(Exception):
    pass


async def list_points(
session: AsyncSession) -> list[Point]:

    stmt = select(Point).order_by(Point.id)

    return list(await session.scalars(stmt))


async def get_point(
session: AsyncSession,
point_id: int) -> Point:

    point = await session.get(Point, point_id)

    if point is None:
        raise PointServiceError("Point not found")

    return point


async def create_point(
session: AsyncSession,
x: float,
y: float) -> Point:

    point = Point(x=x, y=y)
    session.add(point)
    await session.commit()
    await session.refresh(point)

    return point


async def update_point(
session: AsyncSession,
point_id: int,
x: float | None,
y: float | None) -> Point:

    point = await get_point(session, point_id)

    if x is not None:
        point.x = x

    if y is not None:
        point.y = y

    await session.commit()
    await session.refresh(point)

    return point


async def delete_point(
session: AsyncSession,
point_id: int) -> None:

    point = await get_point(session, point_id)
    await session.delete(point)
    await session.commit()
