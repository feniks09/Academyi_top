from fastapi import APIRouter, HTTPException, status

from app.dependencies import DbDep
from app.schemas.point import PointCreate, PointOut, PointUpdate
from app.services import point_service


router = APIRouter(prefix="/points", tags=["points"])


@router.get("/", response_model=list[PointOut])
async def list_points(
session: DbDep) -> list[PointOut]:

    points = await point_service.list_points(session)

    return [PointOut.model_validate(point) for point in points]


@router.get("/{point_id}", response_model=PointOut)
async def get_point(
point_id: int,
session: DbDep) -> PointOut:

    try:
        point = await point_service.get_point(session, point_id)
    except point_service.PointServiceError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error))

    return PointOut.model_validate(point)


@router.post(
    "/",
    response_model=PointOut,
    status_code=status.HTTP_201_CREATED,
)
async def create_point(
payload: PointCreate,
session: DbDep) -> PointOut:

    point = await point_service.create_point(
        session, payload.x, payload.y
    )

    return PointOut.model_validate(point)


@router.put("/{point_id}", response_model=PointOut)
async def update_point(
point_id: int,
payload: PointUpdate,
session: DbDep) -> PointOut:

    try:
        point = await point_service.update_point(
            session, point_id, payload.x, payload.y
        )
    except point_service.PointServiceError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error))

    return PointOut.model_validate(point)


@router.delete(
    "/{point_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_point(
point_id: int,
session: DbDep) -> None:

    try:
        await point_service.delete_point(session, point_id)
    except point_service.PointServiceError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error))
