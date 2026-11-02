from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth import (
    create_token, get_current_user, hash_password, verify_password,
)
from app.database import get_db
from app.models import Apartment, Payment, User
from app.schemas import (
    ApartmentCreate, ApartmentOut, PaymentCreate, PaymentOut,
    Token, UserCreate,
)

router = APIRouter()


# ---------- AUTH ----------

@router.post("/auth/register", response_model=Token)
def register(data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    user = User(username=data.username, hashed_password=hash_password(data.password))
    db.add(user)
    db.commit()
    return Token(access_token=create_token(user.username))


@router.post("/auth/token", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form.username).first()
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Bad username or password")
    return Token(access_token=create_token(user.username))


@router.get("/auth/me")
def me(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "username": current_user.username}


# ---------- APARTMENTS ----------

@router.get("/apartments/", response_model=list[ApartmentOut])
def list_apartments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Apartment).filter(Apartment.owner_id == current_user.id).all()


@router.post("/apartments/", response_model=ApartmentOut)
def create_apartment(
    data: ApartmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    apt = Apartment(label=data.label, address=data.address,
                    owner_id=current_user.id)
    db.add(apt)
    db.commit()
    db.refresh(apt)
    return apt


@router.delete("/apartments/{apartment_id}")
def delete_apartment(
    apartment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    apt = db.get(Apartment, apartment_id)
    if not apt or apt.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Apartment not found")
    db.delete(apt)
    db.commit()
    return {"ok": True}


# ---------- PAYMENTS ----------

@router.get("/payments/", response_model=list[PaymentOut])
def list_payments(
    year: int | None = None,
    month: int | None = None,
    service: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = db.query(Payment).join(Apartment).filter(
        Apartment.owner_id == current_user.id
    )
    if year is not None:
        q = q.filter(Payment.year == year)
    if month is not None:
        q = q.filter(Payment.month == month)
    if service is not None:
        q = q.filter(Payment.service == service)
    return q.order_by(Payment.year.desc(), Payment.month.desc()).all()


@router.post("/payments/", response_model=PaymentOut)
def create_payment(
    data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    apt = db.get(Apartment, data.apartment_id)
    if not apt or apt.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Apartment not found")

    payment = Payment(**data.model_dump())
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


@router.put("/payments/{payment_id}", response_model=PaymentOut)
def update_payment(
    payment_id: int,
    data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    payment = (
        db.query(Payment)
        .join(Apartment)
        .filter(Payment.id == payment_id, Apartment.owner_id == current_user.id)
        .first()
    )
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    for field, value in data.model_dump().items():
        setattr(payment, field, value)
    db.commit()
    db.refresh(payment)
    return payment


@router.delete("/payments/{payment_id}")
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    payment = (
        db.query(Payment)
        .join(Apartment)
        .filter(Payment.id == payment_id, Apartment.owner_id == current_user.id)
        .first()
    )
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    db.delete(payment)
    db.commit()
    return {"ok": True}


# ---------- SUMMARY ----------

@router.get("/payments/summary/")
def summary(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rows = (
        db.query(
            Apartment.id.label("apartment_id"),
            Apartment.label.label("label"),
            func.sum(Payment.amount_due).label("due"),
            func.sum(Payment.amount_paid).label("paid"),
        )
        .join(Payment, Payment.apartment_id == Apartment.id)
        .filter(
            Apartment.owner_id == current_user.id,
            Payment.year == year,
            Payment.month == month,
        )
        .group_by(Apartment.id)
        .all()
    )
    by_apartment = [
        {
            "apartment_id": r.apartment_id,
            "label": r.label,
            "due": round(r.due or 0, 2),
            "paid": round(r.paid or 0, 2),
            "debt": round((r.due or 0) - (r.paid or 0), 2),
        }
        for r in rows
    ]
    total = {
        "due": round(sum(x["due"] for x in by_apartment), 2),
        "paid": round(sum(x["paid"] for x in by_apartment), 2),
        "debt": round(sum(x["debt"] for x in by_apartment), 2),
    }
    return {"year": year, "month": month, "total": total, "by_apartment": by_apartment}