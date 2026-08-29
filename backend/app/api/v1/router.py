from fastapi import APIRouter

from app.analytics.service import AnalyticsService
from app.api.v1.analytics import build_analytics_router
from app.api.v1.capabilities import build_capabilities_router
from app.api.v1.data import build_data_router
from app.api.v1.school_identity import build_school_identity_router
from app.api.v1.school_map import build_school_map_router
from app.intake.service import IntakeService
from app.mapping.join_service import JoinService
from app.mapping.service import MappingService
from app.platform.capability_service import CapabilityService
from app.schools.identity_service import SchoolIdentityResolver
from app.schools.service import SchoolMapService


def build_v1_router(
    capability_service: CapabilityService,
    school_map_service: SchoolMapService | None = None,
    identity_resolver: SchoolIdentityResolver | None = None,
    intake_service: IntakeService | None = None,
    mapping_service: MappingService | None = None,
    join_service: JoinService | None = None,
    analytics_service: AnalyticsService | None = None,
) -> APIRouter:
    router = APIRouter(prefix="/api/v1")
    router.include_router(build_capabilities_router(capability_service))
    router.include_router(build_school_map_router(school_map_service))
    router.include_router(build_school_identity_router(identity_resolver))
    router.include_router(build_analytics_router(analytics_service))
    if intake_service is not None:
        router.include_router(build_data_router(intake_service, mapping_service, join_service))
    return router
