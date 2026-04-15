from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy import create_engine
from sqlalchemy import String, func
from sqlalchemy import PrimaryKeyConstraint, ForeignKey, ForeignKeyConstraint
from sqlalchemy import DateTime
from datetime import datetime


class Base(MappedAsDataclass, DeclarativeBase):
    pass

class Members(Base):
    __tablename__ = "cd.members"
    memid: Mapped[int] = mapped_column(primary_key=True, init=False)



class Fasilities(Base):
    __tablename__ = "cd.fasilities"
    __table_args__ = (PrimaryKeyConstraint('fasid', name="fasilities_pk"),)
    fasid: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str] = mapped_column(String(200))
    membercost: Mapped[float]
    questcost: Mapped[float]
    initialoutlay: Mapped[float]
    monthlymaintenance: Mapped[float]

class bookings(Base):
    __tablename__ = 'cd.booking'
    __table_args__ = (PrimaryKeyConstraint('bookid', name='booking_pk'),
                        ForeignKeyConstraint(['fasid'], 
                                           ['cd.fasilities.fasid'], 
                                           name="fk_fasilities_fasid",
                                           ondelete='SET NULL',),
                        ForeignKeyConstraint(["memid"], 
                                             ["cd.members.memid"], 
                                             name='fk_members_memid', 
                                             ondelete='SET NULL',))
    bookid: Mapped[int] = mapped_column(primary_key=True, init=False)
    fasid: Mapped[int]
    memid: Mapped[int]
    starttime: Mapped[datetime] = mapped_column(DateTime(timezone=True), 
                                                server_default=func.now())
    slot: Mapped[int]

