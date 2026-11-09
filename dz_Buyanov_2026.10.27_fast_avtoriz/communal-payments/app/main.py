from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

# Импортируем engine и Base для создания таблиц
from app.database import get_db, engine, Base
from app.cache import close_cache
from app.routers import router
# Важно импортировать модели, чтобы Base "увидел" их перед созданием
import app.models 


@asynccontextmanager
async def lifespan(app: FastAPI):
    # При запуске приложения (на Render или локально) создаем таблицы
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    yield
    # При остановке приложения закрываем соединение с Redis/кэшем
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