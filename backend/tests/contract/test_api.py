from datetime import UTC

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient

from app.composition import CAPABILITY_DECLARATION_REVISED_AT, create_app, initial_modules
from app.core.config import Settings
from app.core.errors import UnknownDisabledModulesError


@pytest.fixture
def client() -> TestClient:
    app = create_app(Settings(environment="test", cors_origins=["http://localhost:5173"]))
    return TestClient(app, raise_server_exceptions=False)


def test_health_contract(client: TestClient) -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "vaga-certa-api",
        "version": "0.1.0",
        "environment": "test",
    }


def test_capabilities_are_sorted_and_have_initial_governed_states(client: TestClient) -> None:
    response = client.get("/api/v1/capabilities")

    assert response.status_code == 200
    payload = response.json()
    assert [item["id"] for item in payload] == sorted(item["id"] for item in payload)
    assert {item["id"]: item["status"] for item in payload} == {
        "convocacao": "SCHEMA_ONLY",
        "fila": "SCHEMA_ONLY",
        "inscricao": "SCHEMA_ONLY",
        "unidades": "SCHEMA_ONLY",
    }
    assert all(item["limitations"] for item in payload)


def test_configuration_cannot_expose_disabled_module_as_available() -> None:
    app = create_app(Settings(environment="test", disabled_modules={"fila"}))
    response = TestClient(app).get("/api/v1/capabilities")

    fila = next(item for item in response.json() if item["id"] == "fila")
    assert fila["status"] == "DISABLED"
    assert fila["limitations"]


def test_unknown_disabled_module_fails_application_startup() -> None:
    with pytest.raises(UnknownDisabledModulesError):
        create_app(Settings(environment="test", disabled_modules={"fyla"}))


def test_openapi_metadata(client: TestClient) -> None:
    schema = client.get("/openapi.json").json()

    assert schema["info"]["title"] == "Vaga Certa API"
    assert schema["info"]["description"]
    assert schema["info"]["version"] == "0.1.0"
    operation = schema["paths"]["/api/v1/capabilities"]["get"]
    assert {"404", "422", "500"} <= operation["responses"].keys()
    for status in ("404", "422", "500"):
        response_schema = operation["responses"][status]["content"]["application/json"]["schema"]
        assert response_schema["$ref"].endswith("/ErrorResponse")


def test_unknown_route_has_sanitized_error(client: TestClient) -> None:
    response = client.get("/does-not-exist")

    assert response.status_code == 404
    assert response.json() == {"error": {"code": "not_found", "message": "Recurso não encontrado."}}


def test_method_not_allowed_preserves_safe_allow_header(client: TestClient) -> None:
    response = client.post("/health")

    assert response.status_code == 405
    assert response.headers["allow"] == "GET"
    assert response.json() == {
        "error": {"code": "http_error", "message": "Não foi possível processar a requisição."}
    }


def test_unauthorized_preserves_www_authenticate_but_discards_arbitrary_headers() -> None:
    app = create_app(Settings(environment="test"))

    @app.get("/unauthorized")
    def unauthorized() -> None:
        raise HTTPException(
            status_code=401,
            headers={"wWw-AuThEnTiCaTe": 'Bearer realm="api"', "X-Internal-Detail": "secret"},
        )

    response = TestClient(app, raise_server_exceptions=False).get("/unauthorized")

    assert response.status_code == 401
    assert response.headers["www-authenticate"] == 'Bearer realm="api"'
    assert "x-internal-detail" not in response.headers


def test_too_many_requests_preserves_retry_after_case_insensitively() -> None:
    app = create_app(Settings(environment="test"))

    @app.get("/rate-limited")
    def rate_limited() -> None:
        raise HTTPException(status_code=429, headers={"rEtRy-AfTeR": "60"})

    response = TestClient(app, raise_server_exceptions=False).get("/rate-limited")

    assert response.status_code == 429
    assert response.headers["retry-after"] == "60"


def test_capability_revision_timestamp_is_stable_across_restarts_and_is_utc() -> None:
    first = [item.capability.updated_at for item in initial_modules()]
    second = [item.capability.updated_at for item in initial_modules()]

    assert first == second == [CAPABILITY_DECLARATION_REVISED_AT] * len(first)
    assert all(value.tzinfo is UTC for value in first)


def test_cors_does_not_allow_credentials(client: TestClient) -> None:
    response = client.options(
        "/api/v1/capabilities",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 200
    assert "access-control-allow-credentials" not in response.headers


def test_unexpected_error_is_logged_server_side_and_sanitized_for_client(
    caplog: pytest.LogCaptureFixture,
) -> None:
    app = create_app(Settings(environment="test"))
    cpf = "123.456.789-00"
    secret = "super-secret-value"

    @app.get("/explode/{path_value}")
    def explode(path_value: str) -> None:
        raise RuntimeError(f"CPF={cpf}; secret={secret}; path={path_value}")

    with caplog.at_level("ERROR", logger="app.errors"):
        response = TestClient(app, raise_server_exceptions=False).get(f"/explode/{secret}")

    assert response.status_code == 500
    assert response.json() == {
        "error": {"code": "internal_error", "message": "Erro interno do servidor."}
    }
    assert "unexpected_request_error" in caplog.text
    assert cpf not in caplog.text
    assert secret not in caplog.text
    record = next(record for record in caplog.records if record.name == "app.errors")
    assert record.exc_info is None
    assert record.__dict__["http_method"] == "GET"
    assert record.__dict__["http_path"] == "/explode/{path_value}"
    assert record.__dict__["error_code"] == "internal_error"
    assert record.__dict__["exception_type"] == "RuntimeError"


def test_cors_allowlist_is_a_snapshot_of_settings_input() -> None:
    origins = ["https://frontend.example"]
    settings = Settings(environment="test", cors_origins=origins)
    app = create_app(settings)
    origins.append("https://evil.example")

    response = TestClient(app).options(
        "/health",
        headers={
            "Origin": "https://evil.example",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers
