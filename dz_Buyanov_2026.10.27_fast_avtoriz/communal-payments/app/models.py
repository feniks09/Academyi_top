from sqlalchemy import (
    Column, Integer, String, Float, ForeignKey, UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    projects = relationship(
        "Project", back_populates="owner", cascade="all, delete-orphan"
    )


class Project(Base):
    """Квартира = Project. Поля по ДЗ: id, name, description, owner_id."""
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, default="")
    epd_code = Column(String, default="")  # <--- ДОБАВЛЕНО ПОЛЕ ДЛЯ КОДА ЕПД
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="projects")
    payments = relationship(
        "Payment", back_populates="project", cascade="all, delete-orphan"
    )


class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    service = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    month = Column(Integer, nullable=False)
    amount_due = Column(Float, nullable=False)
    amount_paid = Column(Float, default=0.0)

    # Добавляем поля для объема и тарифа, чтобы соответствовать квитанции
    volume = Column(Float, nullable=True, default=0.0)
    tariff = Column(Float, nullable=True, default=0.0)

    project = relationship("Project", back_populates="payments")

    __table_args__ = (
        UniqueConstraint("project_id", "service", "year", "month",
                         name="uq_payment_period"),
    )