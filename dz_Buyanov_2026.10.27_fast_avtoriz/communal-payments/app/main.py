from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db, engine, Base
from app.cache import close_cache
from app.routers import router
import app.models 


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        # Создаем таблицы, если их нет
        await conn.run_sync(Base.metadata.create_all)
        
        # Принудительно добавляем новые колонки, если база уже была создана ранее
        try:
            await conn.execute(text("ALTER TABLE projects ADD COLUMN epd_code VARCHAR DEFAULT ''"))
        except Exception:
            pass # Колонка уже есть
        
        try:
            await conn.execute(text("ALTER TABLE payments ADD COLUMN volume FLOAT DEFAULT 0.0"))
            await conn.execute(text("ALTER TABLE payments ADD COLUMN tariff FLOAT DEFAULT 0.0"))
        except Exception:
            pass # Колонки уже есть
            
    yield
    await close_cache()


app = FastAPI(title="Communal Payments (study project)", lifespan=lifespan)
app.include_router(router)

templates = Jinja2Templates(directory="templates")


@app.get("/healthz")
async def healthz(db: AsyncSession = Depends(get_db)):
    await db.execute(text("SELECT 1"))
    return {"status": "ok"}


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse(request, "index.html")