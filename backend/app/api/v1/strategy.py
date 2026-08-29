"""Versioned strategy endpoints for the adaptable SME product shell."""

from fastapi import APIRouter

from app.core.errors import ERROR_RESPONSES
from app.strategy.contracts import StrategyDataPlanV1
from app.strategy.service import StrategyService


def build_strategy_router(service: StrategyService) -> APIRouter:
    router = APIRouter(prefix="/strategy", tags=["strategy"])

    @router.get(
        "/data-plan",
        response_model=StrategyDataPlanV1,
        responses=ERROR_RESPONSES,
    )
    def data_plan() -> StrategyDataPlanV1:
        return service.data_plan()

    return router
