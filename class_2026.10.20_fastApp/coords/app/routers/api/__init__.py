from fastapi import APIRouter

from app.routers.api import points


router = APIRouter(prefix="/api")
router.include_router(points.router)
