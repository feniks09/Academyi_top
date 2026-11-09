from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.cache import close_cache
from app.database import get_db
from app.routers import router


@asynccontextmanager
async def lifespan(app: FastAPI):
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