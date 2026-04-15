from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import Session
from sqlalchemy import DateTime, func
from sqlalchemy import select
from sqlalchemy import create_engine
from sqlalchemy import String 
from sqlalchemy import ForeignKey
from datetime import datetime
class Base(MappedAsDataclass, DeclarativeBase):
 pass
class Members(Base):
 __tablename__ = "cd.members"
 memid: Mapped[int] = mapped_column(primary_key=True, init=False)
 surname: Mapped[str] = mapped_column(String(200))
 firstname: Mapped[str] = mapped_column(String(200))
 address: Mapped[str] = mapped_column(String(300))
 zipcode: Mapped[int]
 telephone: Mapped[int] = mapped_column(String(200))
 recomendadby: Mapped[int|None] = mapped_column(ForeignKey('Members'))
 joinedate: Mapped[datetime] = mapped_column(DateTime(timezone=True),
                                             server_default=func.now())

# pip import bc4

# with open('row_data') as f:
#   a = f.read()

# soup = Butuful(a, '')