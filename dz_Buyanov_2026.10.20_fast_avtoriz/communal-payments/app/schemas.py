from pydantic import BaseModel, Field, computed_field


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=4)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ApartmentCreate(BaseModel):
    label: str
    address: str


class ApartmentOut(BaseModel):
    id: int
    label: str
    address: str

    class Config:
        from_attributes = True


class PaymentCreate(BaseModel):
    apartment_id: int
    service: str
    year: int = Field(ge=2000, le=2100)
    month: int = Field(ge=1, le=12)
    amount_due: float = Field(ge=0)
    amount_paid: float = Field(default=0, ge=0)


class PaymentOut(BaseModel):
    id: int
    apartment_id: int
    service: str
    year: int
    month: int
    amount_due: float
    amount_paid: float

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