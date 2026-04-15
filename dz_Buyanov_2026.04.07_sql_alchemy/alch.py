from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import Session
from sqlalchemy import select, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy import String
from typing import Optional
from datetime import datetime

class Basa(MappedAsDataclass, DeclarativeBase):
    pass

class User(Basa):
    __tablename__ = "members"
    __table_args__ = {'schema' : 'cd'}
    memid: Mapped[int] = mapped_column(primary_key=True, init=False)
    surname: Mapped[str] = mapped_column(String(200), nullable=False)
    firstname: Mapped[str] = mapped_column(String(200), nullable = False)
    address: Mapped[str] = mapped_column(String(200), nullable = False)
    zipcode: Mapped[int] = mapped_column(nullable = False)
    telephone: Mapped[str] = mapped_column(String(20), nullable = False)
    recommendedby: Mapped[Optional[int]] = mapped_column(
        ForeignKey('cd.members.memid', ondelete='Set NULL'),
        default=None)
    joindate: Mapped[datetime] = mapped_column(nullable=False)
    recommender: Mapped[Optional['Member']] = relationship()
    





SELECT Name memberCost