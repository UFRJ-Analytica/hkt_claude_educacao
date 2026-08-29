"""HTTP boundary for exact official school identity resolution."""

from typing import Annotated

from fastapi import APIRouter, Query
from pydantic import ValidationError

from app.core.errors import ERROR_RESPONSES, AppError
from app.schools.identity_contracts import (
    IdentityLookup,
    IdentityResolutionStatus,
    SchoolIdentityResolution,
)
from app.schools.identity_service import (
    IdentityDatasetUnavailableError,
    SchoolIdentityResolver,
)

_IDENTITY_RESPONSES = {
    **ERROR_RESPONSES,
    409: {"model": ERROR_RESPONSES[500]["model"], "description": "Conflito de identidade"},
    503: {"model": ERROR_RESPONSES[500]["model"], "description": "Recurso indisponível"},
}
_UNAVAILABLE_MESSAGE = "O registro oficial de identidade escolar está indisponível."


def _require_resolver(resolver: SchoolIdentityResolver | None) -> SchoolIdentityResolver:
    if resolver is None:
        raise AppError("capability_unavailable", _UNAVAILABLE_MESSAGE, 503)
    return resolver


def build_school_identity_router(resolver: SchoolIdentityResolver | None) -> APIRouter:
    router = APIRouter(tags=["school-identity"])

    @router.get(
        "/schools/resolve",
        response_model=SchoolIdentityResolution,
        responses=_IDENTITY_RESPONSES,
        description=(
            "Resolve identidade escolar por correspondência exata. É obrigatório "
            "informar ao menos um entre school_id, inep_id e sme_designation."
        ),
        openapi_extra={
            "x-at-least-one-query-parameter": [
                "school_id",
                "inep_id",
                "sme_designation",
            ]
        },
    )
    def resolve_school_identity(
        school_id: Annotated[
            str | None,
            Query(
                min_length=1,
                max_length=128,
                pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$",
            ),
        ] = None,
        inep_id: Annotated[str | None, Query(pattern=r"^\d{8}$")] = None,
        sme_designation: Annotated[str | None, Query(pattern=r"^\d{7}$")] = None,
    ) -> SchoolIdentityResolution:
        try:
            lookup = IdentityLookup(
                school_id=school_id,
                inep_id=inep_id,
                sme_designation=sme_designation,
            )
        except ValidationError as error:
            raise AppError("validation_error", "Requisição inválida.", 422) from error
        try:
            result = _require_resolver(resolver).resolve(lookup)
        except IdentityDatasetUnavailableError as error:
            raise AppError("capability_unavailable", _UNAVAILABLE_MESSAGE, 503) from error
        if result.status is IdentityResolutionStatus.NOT_FOUND:
            raise AppError(
                "school_identity_not_found",
                "Identidade escolar não encontrada.",
                404,
            )
        if result.status is IdentityResolutionStatus.CONFLICT:
            raise AppError(
                "school_identity_conflict",
                "Os identificadores escolares fornecidos são conflitantes.",
                409,
            )
        return result

    return router
