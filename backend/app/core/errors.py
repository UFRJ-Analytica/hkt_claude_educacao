import logging
from typing import Any

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger("app.errors")

_SAFE_HTTP_HEADERS = frozenset({"allow", "www-authenticate", "retry-after"})


class ErrorDetail(BaseModel):
    model_config = ConfigDict(frozen=True)

    code: str
    message: str


class ErrorResponse(BaseModel):
    model_config = ConfigDict(frozen=True)

    error: ErrorDetail


ERROR_RESPONSES: dict[int | str, dict[str, Any]] = {
    404: {"model": ErrorResponse, "description": "Recurso não encontrado"},
    422: {"model": ErrorResponse, "description": "Requisição inválida"},
    500: {"model": ErrorResponse, "description": "Erro interno sanitizado"},
}


class AppError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 400) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


class DuplicateModuleError(AppError):
    def __init__(self, module_id: str) -> None:
        super().__init__(
            code="duplicate_module",
            message=f"Module id '{module_id}' is already registered.",
            status_code=500,
        )


class UnknownDisabledModulesError(AppError):
    """Startup configuration error whose public text does not disclose supplied values."""

    def __init__(self) -> None:
        super().__init__(
            code="unknown_disabled_modules",
            message="Disabled module configuration references unregistered module ids.",
            status_code=500,
        )


def _payload(code: str, message: str) -> dict[str, dict[str, str]]:
    return {"error": {"code": code, "message": message}}


async def app_error_handler(_request: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content=_payload(exc.code, exc.message))


async def validation_error_handler(_request: Request, _exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content=_payload("validation_error", "Requisição inválida."),
    )


def _safe_http_headers(exc: StarletteHTTPException) -> dict[str, str]:
    if not exc.headers:
        return {}
    return {
        key: value for key, value in exc.headers.items() if key.lower() in _SAFE_HTTP_HEADERS
    }


async def http_error_handler(_request: Request, exc: StarletteHTTPException) -> JSONResponse:
    headers = _safe_http_headers(exc)
    if exc.status_code == 404:
        return JSONResponse(
            status_code=404,
            content=_payload("not_found", "Recurso não encontrado."),
            headers=headers,
        )
    return JSONResponse(
        status_code=exc.status_code,
        content=_payload("http_error", "Não foi possível processar a requisição."),
        headers=headers,
    )


async def unexpected_error_handler(request: Request, exc: Exception) -> JSONResponse:
    route = request.scope.get("route")
    sanitized_path = getattr(route, "path", "<unmatched>")
    logger.error(
        "unexpected_request_error",
        extra={
            "event": "unexpected_request_error",
            "error_code": "internal_error",
            "http_method": request.method,
            "http_path": sanitized_path,
            "exception_type": type(exc).__name__,
        },
    )
    return JSONResponse(
        status_code=500,
        content=_payload("internal_error", "Erro interno do servidor."),
    )


def register_error_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppError, app_error_handler)  # type: ignore[arg-type]
    app.add_exception_handler(RequestValidationError, validation_error_handler)  # type: ignore[arg-type]
    app.add_exception_handler(StarletteHTTPException, http_error_handler)  # type: ignore[arg-type]
    app.add_exception_handler(Exception, unexpected_error_handler)
