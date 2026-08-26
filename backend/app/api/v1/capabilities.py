from fastapi import APIRouter

from app.contracts.capabilities import Capability
from app.core.errors import ERROR_RESPONSES
from app.platform.capability_service import CapabilityService


def build_capabilities_router(service: CapabilityService) -> APIRouter:
    router = APIRouter(tags=["platform"])

    @router.get(
        "/capabilities",
        response_model=list[Capability],
        responses=ERROR_RESPONSES,
    )
    def list_capabilities() -> list[Capability]:
        return service.list_capabilities()

    return router
