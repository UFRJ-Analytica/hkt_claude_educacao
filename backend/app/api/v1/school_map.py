"""HTTP endpoints for the governed synthetic school map."""

from typing import Annotated

from fastapi import APIRouter, Path, Query
from pydantic import ValidationError

from app.core.errors import ERROR_RESPONSES, AppError
from app.schools.contracts import MapBounds, MapQuery, SchoolMapCollection, SchoolProfile
from app.schools.service import SchoolMapService, SchoolMapUnavailableError

_MAP_RESPONSES = {
    **ERROR_RESPONSES,
    503: {"model": ERROR_RESPONSES[500]["model"], "description": "Recurso indisponível"},
}
_CAPABILITY_MESSAGE = "O recurso de escolas está indisponível."
_INVALID_BOUNDS_MESSAGE = "Limites geográficos inválidos."


def _require_service(service: SchoolMapService | None) -> SchoolMapService:
    if service is None:
        raise AppError("capability_unavailable", _CAPABILITY_MESSAGE, 503)
    return service


def _bounds(
    west: float | None,
    south: float | None,
    east: float | None,
    north: float | None,
) -> MapBounds | None:
    supplied = (west, south, east, north)
    if all(value is None for value in supplied):
        return None
    if any(value is None for value in supplied):
        raise AppError("invalid_bounds", _INVALID_BOUNDS_MESSAGE, 422)
    try:
        return MapBounds(west=west, south=south, east=east, north=north)
    except ValidationError as error:
        raise AppError("invalid_bounds", _INVALID_BOUNDS_MESSAGE, 422) from error


def build_school_map_router(service: SchoolMapService | None) -> APIRouter:
    router = APIRouter(tags=["schools"])

    @router.get(
        "/map/schools",
        response_model=SchoolMapCollection,
        responses=_MAP_RESPONSES,
    )
    def get_school_map(
        cre: Annotated[int | None, Query(ge=1, le=11)] = None,
        west: Annotated[float | None, Query()] = None,
        south: Annotated[float | None, Query()] = None,
        east: Annotated[float | None, Query()] = None,
        north: Annotated[float | None, Query()] = None,
        limit: Annotated[int, Query(ge=1, le=2000)] = 2000,
        offset: Annotated[int, Query(ge=0)] = 0,
    ) -> SchoolMapCollection:
        selected_bounds = _bounds(west, south, east, north)
        try:
            return _require_service(service).get_map(
                MapQuery(cre=cre, bounds=selected_bounds, limit=limit, offset=offset)
            )
        except SchoolMapUnavailableError as error:
            raise AppError("capability_unavailable", _CAPABILITY_MESSAGE, 503) from error

    @router.get(
        "/schools/{school_id}/profile",
        response_model=SchoolProfile,
        responses=_MAP_RESPONSES,
    )
    def get_school_profile(
        school_id: Annotated[
            str,
            Path(min_length=1, max_length=128, pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$"),
        ],
    ) -> SchoolProfile:
        try:
            profile = _require_service(service).get_profile(school_id)
        except SchoolMapUnavailableError as error:
            raise AppError("capability_unavailable", _CAPABILITY_MESSAGE, 503) from error
        if profile is None:
            raise AppError("school_not_found", "Escola não encontrada.", 404)
        return profile

    return router
