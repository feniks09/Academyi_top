from sqlalchemy.orm import Mapped, mapped_column

from db.base import Base


class Point(Base):
    __tablename__ = "points"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )
    x: Mapped[float]
    y: Mapped[float]
