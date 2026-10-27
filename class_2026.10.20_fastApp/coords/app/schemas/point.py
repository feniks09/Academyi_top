from pydantic import BaseModel, ConfigDict


class PointBase(BaseModel):
    x: float
    y: float


class PointCreate(PointBase):
    pass


class PointUpdate(BaseModel):
    x: float | None = None
    y: float | None = None


class PointOut(PointBase):

    model_config = ConfigDict(from_attributes=True)

    id: int
