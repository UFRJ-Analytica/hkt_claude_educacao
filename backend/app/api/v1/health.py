from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import Settings
from app.core.errors import ERROR_RESPONSES


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    environment: str


def build_health_router(settings: Settings) -> APIRouter:
    router = APIRouter(tags=["platform"])

    @router.get("/health", response_model=HealthResponse, responses=ERROR_RESPONSES)
    def health() -> HealthResponse:
        return HealthResponse(
            status="ok",
            service=settings.service_name,
            version=settings.version,
            environment=settings.environment,
        )

    return router
