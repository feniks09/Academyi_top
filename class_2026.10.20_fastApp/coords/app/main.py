from fastapi import FastAPI

import app.routers.api


def create_application() -> FastAPI:

    instance = FastAPI(title="Coords")
    instance.include_router(app.routers.api.router)

    return instance


app = create_application()
