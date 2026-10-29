from sqlalchemy.orm import Session
import models
import schemas


def get_profiles(db: Session, age: int | None = None):
    query = db.query(models.UserProfile)
    if age is not None:
        query = query.filter(models.UserProfile.age == age)
    return query.all()


def get_profile(db: Session, profile_id: int):
    return db.query(models.UserProfile).filter(models.UserProfile.id == profile_id).first()


def create_profile(db: Session, profile: schemas.UserProfileCreate):
    db_profile = models.UserProfile(**profile.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


def update_profile(db: Session, profile_id: int, profile: schemas.UserProfileUpdate):
    db_profile = get_profile(db, profile_id)
    if db_profile is None:
        return None
    for field, value in profile.model_dump().items():
        setattr(db_profile, field, value)
    db.commit()
    db.refresh(db_profile)
    return db_profile


def delete_profile(db: Session, profile_id: int):
    db_profile = get_profile(db, profile_id)
    if db_profile is None:
        return None
    db.delete(db_profile)
    db.commit()
    return db_profile