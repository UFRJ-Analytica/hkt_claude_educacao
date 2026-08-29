from fastapi import APIRouter

from app.ai.contracts import (
    AIBriefingRequestV1,
    AIBriefingResponseV1,
    AISchoolActionPlanRequestV1,
    AISchoolActionPlanResponseV1,
)
from app.ai.service import (
    AIBriefingService,
    AIProviderUnavailableError,
    InvalidAIRequestError,
)
from app.core.errors import ERROR_RESPONSES, AppError

_AI_RESPONSES = {
    **ERROR_RESPONSES,
    503: {"model": ERROR_RESPONSES[500]["model"], "description": "Provider IA indisponível"},
}


def build_ai_router(service: AIBriefingService | None) -> APIRouter:
    router = APIRouter(prefix="/ai", tags=["ai"])

    @router.post(
        "/briefings",
        response_model=AIBriefingResponseV1,
        responses=_AI_RESPONSES,
    )
    def create_briefing(request: AIBriefingRequestV1) -> AIBriefingResponseV1:
        if service is None:
            raise AppError("capability_unavailable", "Recurso de IA indisponível.", 503)
        try:
            return service.create_briefing(request)
        except InvalidAIRequestError as error:
            raise AppError("invalid_ai_request", "Pedido de IA fora da governança.", 422) from error
        except AIProviderUnavailableError as error:
            raise AppError(
                "ai_provider_unavailable",
                "Provider de IA indisponível ou não configurado.",
                503,
            ) from error

    @router.post(
        "/school-action-plans",
        response_model=AISchoolActionPlanResponseV1,
        responses=_AI_RESPONSES,
    )
    def create_school_action_plan(
        request: AISchoolActionPlanRequestV1,
    ) -> AISchoolActionPlanResponseV1:
        if service is None:
            raise AppError("capability_unavailable", "Recurso de IA indisponível.", 503)
        try:
            return service.create_school_action_plan(request)
        except InvalidAIRequestError as error:
            raise AppError("invalid_ai_request", "Pedido de IA fora da governança.", 422) from error
        except AIProviderUnavailableError as error:
            raise AppError(
                "ai_provider_unavailable",
                "Provider de IA indisponível ou não configurado.",
                503,
            ) from error

    return router
