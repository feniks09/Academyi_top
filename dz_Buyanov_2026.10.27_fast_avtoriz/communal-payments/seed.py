import asyncio

from sqlalchemy import select

from app.auth import hash_password
from app.database import Base, async_session_factory, engine
from app.models import Payment, Project, User


async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as db:
        existing = await db.execute(select(User).where(User.username == "demo"))
        if existing.scalar_one_or_none():
            print("Seed уже выполнен")
            return

        user = User(username="demo", hashed_password=hash_password("demo1234"))
        db.add(user)
        await db.flush()

        p1 = Project(name="Кв. 12", description="ул. Ленина, 5", owner_id=user.id)
        p2 = Project(name="Кв. 47", description="ул. Мира, 10", owner_id=user.id)
        db.add_all([p1, p2])
        await db.flush()

        db.add_all([
            Payment(project_id=p1.id, service="gas",         year=2026, month=9, amount_due=800,  amount_paid=800),
            Payment(project_id=p1.id, service="water",       year=2026, month=9, amount_due=600,  amount_paid=600),
            Payment(project_id=p1.id, service="electricity", year=2026, month=9, amount_due=900,  amount_paid=0),
            Payment(project_id=p2.id, service="gas",         year=2026, month=9, amount_due=1000, amount_paid=1000),
            Payment(project_id=p2.id, service="water",       year=2026, month=9, amount_due=700,  amount_paid=300),
            Payment(project_id=p2.id, service="maintenance", year=2026, month=9, amount_due=2000, amount_paid=0),
        ])
        await db.commit()

    print("Seed готов. Логин: demo / demo1234")


if __name__ == "__main__":
    asyncio.run(main())