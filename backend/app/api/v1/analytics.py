"""Versioned HTTP API for network analytics, quality, and evidence."""

from typing import Annotated

from fastapi import APIRouter, Path, Query

from app.analytics.contracts import DataQualitySummaryV1, EvidenceRecordV1, NetworkSnapshotV1
from app.analytics.service import (
    AnalyticsScopeNotFoundError,
    AnalyticsService,
    AnalyticsUnavailableError,
    EvidenceNotFoundError,
    MalformedEvidenceIdError,
)
from app.core.errors import ERROR_RESPONSES, AppError

_ANALYTICS_RESPONSES = {
    **ERROR_RESPONSES,
    503: {"model": ERROR_RESPONSES[500]["model"], "description": "Recurso indisponível"},
}
_UNAVAILABLE = "O recurso analítico está indisponível."


def _service(service: AnalyticsService | None) -> AnalyticsService:
    if service is None:
        raise AppError("capability_unavailable", _UNAVAILABLE, 503)
    return service


def build_analytics_router(service: AnalyticsService | None) -> APIRouter:
    router = APIRouter(tags=["analytics"])

    @router.get(
        "/network/snapshot",
        response_model=NetworkSnapshotV1,
        responses=_ANALYTICS_RESPONSES,
    )
    def network_snapshot(
        cre: Annotated[int | None, Query(ge=1, le=11)] = None,
    ) -> NetworkSnapshotV1:
        try:
            return _service(service).get_snapshot(cre)
        except AnalyticsScopeNotFoundError as error:
            raise AppError(
                "analytics_scope_not_found", "Escopo analítico vazio.", 404
            ) from error
        except AnalyticsUnavailableError as error:
            raise AppError("capability_unavailable", _UNAVAILABLE, 503) from error

    @router.get(
        "/data/quality",
        response_model=DataQualitySummaryV1,
        responses=_ANALYTICS_RESPONSES,
    )
    def data_quality(
        cre: Annotated[int | None, Query(ge=1, le=11)] = None,
    ) -> DataQualitySummaryV1:
        try:
            return _service(service).get_quality(cre)
        except AnalyticsUnavailableError as error:
            raise AppError("capability_unavailable", _UNAVAILABLE, 503) from error

    @router.get(
        "/evidence/{evidence_id}",
        response_model=EvidenceRecordV1,
        responses=_ANALYTICS_RESPONSES,
    )
    def evidence(
        evidence_id: Annotated[
            str,
            Path(min_length=1, max_length=512, pattern=r"^[A-Za-z0-9:._-]+$"),
        ],
    ) -> EvidenceRecordV1:
        try:
            return _service(service).get_evidence(evidence_id)
        except MalformedEvidenceIdError as error:
            raise AppError(
                "invalid_evidence_id", "Identificador de evidência inválido.", 422
            ) from error
        except EvidenceNotFoundError as error:
            raise AppError("evidence_not_found", "Evidência não encontrada.", 404) from error
        except AnalyticsUnavailableError as error:
            raise AppError("capability_unavailable", _UNAVAILABLE, 503) from error

    return router
