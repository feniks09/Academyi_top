from sqlalchemy import Column, Integer, String, Float, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    apartments = relationship("Apartment", back_populates="owner",
                              cascade="all, delete-orphan")


class Apartment(Base):
    __tablename__ = "apartments"
    id = Column(Integer, primary_key=True)
    label = Column(String, nullable=False)      # "Кв. 12"
    address = Column(String, nullable=False)    # "ул. Ленина, 5"
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="apartments")
    payments = relationship("Payment", back_populates="apartment",
                            cascade="all, delete-orphan")


class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True)
    apartment_id = Column(Integer, ForeignKey("apartments.id"), nullable=False)
    service = Column(String, nullable=False)    # gas / water / electricity / maintenance / other
    year = Column(Integer, nullable=False)
    month = Column(Integer, nullable=False)     # 1..12
    amount_due = Column(Float, nullable=False)  # начислено
    amount_paid = Column(Float, default=0.0)    # оплачено

    apartment = relationship("Apartment", back_populates="payments")

    __table_args__ = (
        UniqueConstraint("apartment_id", "service", "year", "month",
                         name="uq_payment_period"),
    )