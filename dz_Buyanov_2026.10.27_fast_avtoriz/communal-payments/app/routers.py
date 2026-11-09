import json

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import (
    create_token, get_current_user, hash_password, verify_password,
)
from app.cache import cache_get, cache_invalidate_group, cache_set
from app.database import get_db
from app.models import Payment, Project, User
from app.schemas import (
    PaymentCreate, PaymentOut, ProjectCreate, ProjectOut, ProjectUpdate,
    Token, UserCreate,
)

router = APIRouter()


# ---------- AUTH ----------

@router.post("/auth/register", response_model=Token)
async def register(data: UserCreate, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(User).where(User.username == data.username))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Username already taken")
    user = User(username=data.username, hashed_password=hash_password(data.password))
    db.add(user)
    await db.flush()
    return Token(access_token=create_token(user.username))


@router.post("/auth/token", response_model=Token)
async def login(
    form: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.username == form.username))
    user = result.scalar_one_or_none()
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Bad username or password",
        )
    return Token(access_token=create_token(user.username))


@router.get("/auth/me")
async def me(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "username": current_user.username}


# ---------- PROJECTS ----------

@router.get("/projects/", response_model=list[ProjectOut])
async def list_projects(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cache_key = f"projects:{current_user.id}"
    cached = await cache_get(cache_key)
    if cached:
        return json.loads(cached)

    result = await db.execute(
        select(Project).where(Project.owner_id == current_user.id)
    )
    projects = result.scalars().all()
    payload = [ProjectOut.model_validate(p).model_dump() for p in projects]
    await cache_set(cache_key, json.dumps(payload, ensure_ascii=False))
    return payload


@router.post("/projects/", response_model=ProjectOut)
async def create_project(
    data: ProjectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = Project(
        name=data.name, description=data.description, owner_id=current_user.id
    )
    db.add(project)
    await db.flush()
    await cache_invalidate_group("projects")
    await db.refresh(project)
    return project


@router.get("/projects/{project_id}", response_model=ProjectOut)
async def get_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return project


@router.put("/projects/{project_id}", response_model=ProjectOut)
async def update_project(
    project_id: int,
    data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    if data.name is not None:
        project.name = data.name
    if data.description is not None:
        project.description = data.description

    await cache_invalidate_group("projects")
    await db.flush()
    await db.refresh(project)
    return project


@router.delete("/projects/{project_id}")
async def delete_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    await db.delete(project)
    await cache_invalidate_group("projects")
    return {"ok": True}


# ---------- PAYMENTS ----------

@router.get("/payments/", response_model=list[PaymentOut])
async def list_payments(
    year: int | None = None,
    month: int | None = None,
    service: str | None = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = (
        select(Payment)
        .join(Project, Payment.project_id == Project.id)
        .where(Project.owner_id == current_user.id)
    )
    if year is not None:
        q = q.where(Payment.year == year)
    if month is not None:
        q = q.where(Payment.month == month)
    if service is not None:
        q = q.where(Payment.service == service)
    q = q.order_by(Payment.year.desc(), Payment.month.desc())

    result = await db.execute(q)
    return result.scalars().all()


@router.post("/payments/", response_model=PaymentOut)
async def create_payment(
    data: PaymentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = await db.get(Project, data.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    payment = Payment(**data.model_dump())
    db.add(payment)
    await db.flush()
    await db.refresh(payment)
    return payment


@router.put("/payments/{payment_id}", response_model=PaymentOut)
async def update_payment(
    payment_id: int,
    data: PaymentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Payment)
        .join(Project, Payment.project_id == Project.id)
        .where(Payment.id == payment_id)
    )
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    project = await db.get(Project, payment.project_id)
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    for field, value in data.model_dump().items():
        setattr(payment, field, value)
    await db.flush()
    await db.refresh(payment)
    return payment


@router.delete("/payments/{payment_id}")
async def delete_payment(
    payment_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Payment)
        .join(Project, Payment.project_id == Project.id)
        .where(Payment.id == payment_id)
    )
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    project = await db.get(Project, payment.project_id)
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    await db.delete(payment)
    return {"ok": True}


# ---------- SUMMARY ----------

@router.get("/payments/summary/")
async def summary(
    year: int,
    month: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(
            Project.id.label("project_id"),
            Project.name.label("name"),
            func.sum(Payment.amount_due).label("due"),
            func.sum(Payment.amount_paid).label("paid"),
        )
        .join(Payment, Payment.project_id == Project.id)
        .where(
            Project.owner_id == current_user.id,
            Payment.year == year,
            Payment.month == month,
        )
        .group_by(Project.id)
    )
    rows = result.all()
    by_project = [
        {
            "project_id": r.project_id,
            "name": r.name,
            "due": round(r.due or 0, 2),
            "paid": round(r.paid or 0, 2),
            "debt": round((r.due or 0) - (r.paid or 0), 2),
        }
        for r in rows
    ]
    total = {
        "due": round(sum(x["due"] for x in by_project), 2),
        "paid": round(sum(x["paid"] for x in by_project), 2),
        "debt": round(sum(x["debt"] for x in by_project), 2),
    }
    return {"year": year, "month": month, "total": total, "by_project": by_project}