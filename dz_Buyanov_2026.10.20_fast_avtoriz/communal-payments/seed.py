from app.auth import hash_password
from app.database import SessionLocal, engine, Base
from app.models import Apartment, Payment, User

Base.metadata.create_all(bind=engine)  # страховка, если миграции не применялись

db = SessionLocal()

if db.query(User).filter(User.username == "demo").first():
    print("Seed уже выполнен")
    raise SystemExit

user = User(username="demo", hashed_password=hash_password("demo1234"))
db.add(user)
db.commit()
db.refresh(user)

apt1 = Apartment(label="Кв. 12", address="ул. Ленина, 5", owner_id=user.id)
apt2 = Apartment(label="Кв. 47", address="ул. Мира, 10", owner_id=user.id)
db.add_all([apt1, apt2])
db.commit()
db.refresh(apt1)
db.refresh(apt2)

payments = [
    Payment(apartment_id=apt1.id, service="gas",         year=2026, month=9, amount_due=800,  amount_paid=800),
    Payment(apartment_id=apt1.id, service="water",       year=2026, month=9, amount_due=600,  amount_paid=600),
    Payment(apartment_id=apt1.id, service="electricity", year=2026, month=9, amount_due=900,  amount_paid=0),
    Payment(apartment_id=apt2.id, service="gas",         year=2026, month=9, amount_due=1000, amount_paid=1000),
    Payment(apartment_id=apt2.id, service="water",       year=2026, month=9, amount_due=700,  amount_paid=300),
    Payment(apartment_id=apt2.id, service="maintenance", year=2026, month=9, amount_due=2000, amount_paid=0),
]
db.add_all(payments)
db.commit()
db.close()

print("Seed готов. Логин: demo / demo1234")