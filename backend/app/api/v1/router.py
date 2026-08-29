from fastapi import APIRouter

from app.ai.service import AIBriefingService
from app.analytics.service import AnalyticsService
from app.api.v1.ai import build_ai_router
from app.api.v1.analytics import build_analytics_router
from app.api.v1.capabilities import build_capabilities_router
from app.api.v1.data import build_data_router
from app.api.v1.school_identity import build_school_identity_router
from app.api.v1.school_map import build_school_map_router
from app.api.v1.strategy import build_strategy_router
from app.intake.service import IntakeService
from app.mapping.join_service import JoinService
from app.mapping.service import MappingService
from app.platform.capability_service import CapabilityService
from app.schools.identity_service import SchoolIdentityResolver
from app.schools.service import SchoolMapService
from app.strategy.service import StrategyService


def build_v1_router(
    capability_service: CapabilityService,
    school_map_service: SchoolMapService | None = None,
    identity_resolver: SchoolIdentityResolver | None = None,
    intake_service: IntakeService | None = None,
    mapping_service: MappingService | None = None,
    join_service: JoinService | None = None,
    analytics_service: AnalyticsService | None = None,
    ai_service: AIBriefingService | None = None,
) -> APIRouter:
    router = APIRouter(prefix="/api/v1")
    router.include_router(build_capabilities_router(capability_service))
    router.include_router(build_school_map_router(school_map_service))
    router.include_router(build_school_identity_router(identity_resolver, school_map_service))
    router.include_router(build_analytics_router(analytics_service))
    router.include_router(build_ai_router(ai_service))
    router.include_router(build_strategy_router(StrategyService()))
    if intake_service is not None:
        router.include_router(build_data_router(intake_service, mapping_service, join_service))
    return router
