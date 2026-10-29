from sqlalchemy import Column, Integer, String
from database import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    age = Column(Integer, nullable=False)