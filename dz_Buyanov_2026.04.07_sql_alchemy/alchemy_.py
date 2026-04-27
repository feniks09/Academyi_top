from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy import create_engine
from sqlalchemy import String, func
from sqlalchemy import PrimaryKeyConstraint, ForeignKey, ForeignKeyConstraint
from sqlalchemy import DateTime
from datetime import datetime

from bs4 import BeautifulSoup




class Base(MappedAsDataclass, DeclarativeBase):
    pass

class Members(Base):
    __tablename__ = "cd.members"
    __table_args__ = (PrimaryKeyConstraint('memid', name="members_pk"),
                      ForeignKeyConstraint(['recommendedby'], 
                                           ['cd.members.memid'], 
                                           name='fk_members_recommendedby', 
                                           ondelete= "SET NULL"))
    memid: Mapped[int] = mapped_column(primary_key=True, init=False)
    surname: Mapped[str] = mapped_column(String(200))
    firstname: Mapped[str] = mapped_column(String(200))
    address: Mapped[str] = mapped_column(String(300))
    zipcode: Mapped[int]
    telephone: Mapped[str] = mapped_column(String(20))
    recommendedby: Mapped[int|None]
    joindate: Mapped[datetime] = mapped_column(DateTime(timezone=True), 
                                               server_default= func.now())
    



class Fasilities(Base):
    __tablename__ = "cd.fasilities"
    __table_args__ = (PrimaryKeyConstraint('fasid', name="fasilities_pk"),)
    fasid: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str] = mapped_column(String(200))
    membercost: Mapped[float]
    questcost: Mapped[float]
    initialoutlay: Mapped[float]
    monthlymaintenance: Mapped[float]

class Bookings(Base):
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


engine = create_engine('sqlite://dbname.db', echo=True)
Base.metadata.create_all(engine)




with open('dz_Buyanov_2026.04.07_sql_alchemy/table_cd_member.txt', 'r', encoding='UTF-8') as f:
    table_cd_member = f.read()
    print(table_cd_member)

with open('dz_Buyanov_2026.04.07_sql_alchemy/table_cd_facilities.txt', 'r', encoding='UTF-8') as f:
    table_cd_facilities = f.read()
    print(table_cd_facilities)

with open('dz_Buyanov_2026.04.07_sql_alchemy/table_cd_booking.txt', 'r', encoding='UTF-8') as f:
    table_cd_booking = f.read()
    print(table_cd_booking)

soup = BeautifulSoup(table_cd_member, 'html.parser')


with Session(engine) as session:


    Aleks_Buynov = Members(surname='Буянов', 
                           firstname='Алексей', 
                           address='Москва',

                           zipcode=234231,
                           telephone='1431242314324',
                           recommendedby= 1,
                           joindate= datetime.now()
                        )
    # Создание INSERT запроса
    session.add_all([Aleks_Buynov])

    fasilities_1 = Fasilities(name="поворская",
                              membercost=100,
                              questcost=200,
                              initialoutlay=100000000,
                              monthlymaintenance=100000
                              )
    session.add_all([fasilities_1])


    booking_1 = Bookings(fasid=1,
                         memid=1,
                         starttime=datetime.now(),
                         slot=5)
    
    session.add_all([booking_1])


    session.commit()

    query = select(Members)
    all_freinds = session.scalars(query)

    for member in all_freinds:
        print(member)

    query = select(Fasilities)
    all_freinds = session.scalars(query)

    for fasilitie in all_freinds:
        print(fasilitie)

    query= select(Bookings)
    all_freinds = session.scalars(query)

    for booking in all_freinds:
        print(booking)