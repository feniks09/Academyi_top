from pydantic import BaseModel, Field, computed_field


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=4)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    description: str = ""
    epd_code: str = ""


class ProjectUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    epd_code: str | None = None


class ProjectOut(BaseModel):
    id: int
    name: str
    description: str
    epd_code: str
    owner_id: int

    class Config:
        from_attributes = True


class PaymentCreate(BaseModel):
    project_id: int
    service: str
    year: int = Field(ge=2000, le=2100)
    month: int = Field(ge=1, le=12)
    amount_due: float = Field(ge=0)
    amount_paid: float = Field(default=0, ge=0)
    volume: float = Field(default=0.0, ge=0)
    tariff: float = Field(default=0.0, ge=0)


class PaymentOut(BaseModel):
    id: int
    project_id: int
    service: str
    year: int
    month: int
    amount_due: float
    amount_paid: float
    volume: float
    tariff: float

    class Config:
        from_attributes = True

    @computed_field
    @property
    def debt(self) -> float:
        return round(self.amount_due - self.amount_paid, 2)

    @computed_field
    @property
    def status(self) -> str:
        if self.amount_paid >= self.amount_due:
            return "paid"
        if self.amount_paid > 0:
            return "partial"
        return "unpaid"