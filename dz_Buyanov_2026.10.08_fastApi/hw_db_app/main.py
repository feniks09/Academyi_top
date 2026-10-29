from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import schemas
from database import Base, engine, get_db

# На случай запуска без Alembic (в проде лучше полагаться только на миграции)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HW4: SQLAlchemy + Alembic + FastAPI")


@app.get("/profiles", response_model=list[schemas.UserProfileOut])
def list_profiles(age: int | None = None, db: Session = Depends(get_db)):
    """GET /profiles — с необязательным фильтром по возрасту (Шаг 6)."""
    return crud.get_profiles(db, age=age)


# Шаг 7: дополнительный эндпоинт получения профиля по id
@app.get("/profiles/{id}", response_model=schemas.UserProfileOut)
def get_profile(id: int, db: Session = Depends(get_db)):
    profile = crud.get_profile(db, id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@app.post("/profiles", response_model=schemas.UserProfileOut, status_code=201)
def create_profile(profile: schemas.UserProfileCreate, db: Session = Depends(get_db)):
    return crud.create_profile(db, profile)


@app.put("/profiles/{id}", response_model=schemas.UserProfileOut)
def update_profile(id: int, profile: schemas.UserProfileUpdate, db: Session = Depends(get_db)):
    updated = crud.update_profile(db, id, profile)
    if updated is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return updated


@app.delete("/profiles/{id}", response_model=schemas.UserProfileOut)
def delete_profile(id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_profile(db, id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return deleted