from fastapi import APIRouter

from app.api.v1.capabilities import build_capabilities_router
from app.platform.capability_service import CapabilityService


def build_v1_router(capability_service: CapabilityService) -> APIRouter:
    router = APIRouter(prefix="/api/v1")
    router.include_router(build_capabilities_router(capability_service))
    return router
