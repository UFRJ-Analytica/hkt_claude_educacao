from pathlib import Path
from typing import Any, cast

import pytest
from fastapi.testclient import TestClient

from app.composition import create_app
from app.core.config import Settings
from app.data_access.duckdb_adapter import DuckDBDataAccess
from app.data_access.ports import DataAccessPort
from scripts.generate_mock import generate_mock

ROOT = Path(__file__).parents[3]
SCENARIO = ROOT / "data/scenarios/network_improving.yml"


class ControlledDataAccess:
    def __init__(
        self,
        delegate: DuckDBDataAccess,
        *,
        validate_result: bool = True,
        validate_error: Exception | None = None,
        runtime_failure: str | None = None,
    ) -> None:
        self.delegate = delegate
        self.validate_result = validate_result
        self.validate_error = validate_error
        self.runtime_failure = runtime_failure
        self.map_calls = 0

    def validate(self) -> bool:
        if self.validate_error is not None:
            raise self.validate_error
        return self.validate_result

    def manifest(self) -> dict[str, object]:
        return self.delegate.manifest()

    def snapshot_id(self) -> str:
        return self.delegate.snapshot_id()

    def map_coverage(self, **kwargs: object) -> dict[str, int | float]:
        self.map_calls += 1
        if self.runtime_failure == "map":
            raise RuntimeError("secret dataset location C:/private/schools.parquet")
        return self.delegate.map_coverage(**kwargs)  # type: ignore[arg-type]

    def school_map_rows(self, **kwargs: object) -> Any:
        self.map_calls += 1
        rows = self.delegate.school_map_rows(**kwargs)  # type: ignore[arg-type]
        if self.runtime_failure == "map_type":
            rows[0]["latitude"] = "not-a-number"
        return rows

    def available_cres(self) -> Any:
        if self.runtime_failure == "available_cre_type":
            return [None]
        return self.delegate.available_cres()

    def school_profile(self, school_id: str) -> dict[str, object] | None:
        if self.runtime_failure == "profile":
            raise KeyError("secret profile table")
        row = self.delegate.school_profile(school_id)
        if self.runtime_failure == "profile_type" and row is not None:
            row["cre"] = None
        return row


def _as_port(access: ControlledDataAccess) -> DataAccessPort:
    return cast(DataAccessPort, access)


@pytest.fixture(scope="module")
def data_access(tmp_path_factory: pytest.TempPathFactory) -> DuckDBDataAccess:
    root = tmp_path_factory.mktemp("school-map") / "generated"
    generate_mock(root, SCENARIO, allow_external_output=True)
    return DuckDBDataAccess(root, allow_external_root=True)


@pytest.fixture
def client(data_access: DuckDBDataAccess) -> TestClient:
    app = create_app(
        Settings(environment="test", mock_data_enabled=True),
        data_access=data_access,
    )
    return TestClient(app, raise_server_exceptions=False)


def test_map_collection_profile_filters_and_geojson(client: TestClient) -> None:
    response = client.get("/api/v1/map/schools", params={"limit": 5})
    assert response.status_code == 200
    payload = response.json()
    assert payload["type"] == "FeatureCollection"
    assert len(payload["features"]) == 5
    assert payload["coverage"]["returned"] == 5
    assert payload["coverage"]["truncated"] is True
    assert payload["provenance"]["data_version"] == payload["snapshot_id"]

    feature = payload["features"][0]
    identity = feature["properties"]["identity"]
    coordinates = feature["geometry"]["coordinates"]
    profile_response = client.get(f"/api/v1/schools/{identity['school_id']}/profile")
    assert profile_response.status_code == 200
    profile = profile_response.json()
    assert profile["identity"]["school_id"] == identity["school_id"]
    assert profile["identity"]["inep_id"] is None
    assert profile["identity"]["sme_designation"] is None
    assert profile["provenance"]["data_version"] == profile["snapshot_id"]
    assert coordinates == [profile["coordinates"]["longitude"], profile["coordinates"]["latitude"]]

    cre_response = client.get("/api/v1/map/schools", params={"cre": identity["cre"]})
    assert cre_response.status_code == 200
    assert {item["properties"]["identity"]["cre"] for item in cre_response.json()["features"]} == {
        identity["cre"]
    }

    longitude, latitude = coordinates
    bounds_response = client.get(
        "/api/v1/map/schools",
        params={
            "west": longitude - 0.00001,
            "south": latitude - 0.00001,
            "east": longitude + 0.00001,
            "north": latitude + 0.00001,
        },
    )
    assert bounds_response.status_code == 200
    bounded_ids = [
        item["properties"]["identity"]["school_id"] for item in bounds_response.json()["features"]
    ]
    assert bounded_ids == [identity["school_id"]]


def test_unknown_school_is_sanitized_404(client: TestClient) -> None:
    response = client.get("/api/v1/schools/unknown-school/profile")
    assert response.status_code == 404
    assert response.json() == {
        "error": {"code": "school_not_found", "message": "Escola não encontrada."}
    }


@pytest.mark.parametrize(
    "params",
    [
        {"west": -44.0},
        {"west": -43.0, "south": -23.0, "east": -44.0, "north": -22.0},
        {"west": -44.0, "south": -22.0, "east": -43.0, "north": -23.0},
    ],
)
def test_partial_or_disordered_bounds_are_invalid_bounds(
    client: TestClient, params: dict[str, float]
) -> None:
    response = client.get("/api/v1/map/schools", params=params)
    assert response.status_code == 422
    assert response.json() == {
        "error": {"code": "invalid_bounds", "message": "Limites geográficos inválidos."}
    }


def test_mock_disabled_keeps_map_routes_unavailable(data_access: DuckDBDataAccess) -> None:
    app = create_app(Settings(environment="test", mock_data_enabled=False), data_access=data_access)
    client = TestClient(app, raise_server_exceptions=False)
    for path in ("/api/v1/map/schools", "/api/v1/schools/unknown-school/profile"):
        response = client.get(path)
        assert response.status_code == 503
        assert response.json() == {
            "error": {
                "code": "capability_unavailable",
                "message": "O recurso de escolas está indisponível.",
            }
        }


def test_disabled_schools_module_keeps_routes_unavailable(data_access: DuckDBDataAccess) -> None:
    settings = Settings(
        environment="test",
        mock_data_enabled=True,
        disabled_modules={"schools"},
    )
    client = TestClient(
        create_app(settings, data_access=data_access), raise_server_exceptions=False
    )
    capability_response = client.get("/api/v1/capabilities")
    schools = next(item for item in capability_response.json() if item["id"] == "schools")
    assert schools["status"] == "DISABLED"

    response = client.get("/api/v1/map/schools")
    assert response.status_code == 503
    assert response.json()["error"]["code"] == "capability_unavailable"


def test_missing_governed_dataset_does_not_break_startup() -> None:
    app = create_app(Settings(environment="test", mock_data_enabled=True))
    response = TestClient(app, raise_server_exceptions=False).get("/api/v1/map/schools")
    assert response.status_code in {200, 503}
    if response.status_code == 503:
        assert response.json()["error"]["code"] == "capability_unavailable"


def test_school_map_openapi_contract(client: TestClient) -> None:
    schema = client.get("/openapi.json").json()
    for path in ("/api/v1/map/schools", "/api/v1/schools/{school_id}/profile"):
        operation = schema["paths"][path]["get"]
        assert {"404", "422", "500", "503"} <= operation["responses"].keys()
        for status in ("404", "422", "500", "503"):
            response_schema = operation["responses"][status]["content"]["application/json"][
                "schema"
            ]
            assert response_schema["$ref"].endswith("/ErrorResponse")

    map_schema = schema["paths"]["/api/v1/map/schools"]["get"]["responses"]["200"]["content"][
        "application/json"
    ]["schema"]
    profile_schema = schema["paths"]["/api/v1/schools/{school_id}/profile"]["get"]["responses"][
        "200"
    ]["content"]["application/json"]["schema"]
    assert map_schema["$ref"].endswith("/SchoolMapCollection")
    assert profile_schema["$ref"].endswith("/SchoolProfile")


@pytest.mark.parametrize(
    "controlled",
    [
        lambda access: ControlledDataAccess(access, validate_result=False),
        lambda access: ControlledDataAccess(access, validate_error=OSError("private path")),
    ],
)
def test_unavailable_dataset_aligns_capability_and_route(
    data_access: DuckDBDataAccess,
    controlled: Any,
) -> None:
    access = controlled(data_access)
    app = create_app(
        Settings(environment="test", mock_data_enabled=True), data_access=_as_port(access)
    )
    client = TestClient(app, raise_server_exceptions=False)

    schools = next(
        item for item in client.get("/api/v1/capabilities").json() if item["id"] == "schools"
    )
    assert schools["status"] == "SCHEMA_ONLY"
    assert schools["source_status"] == "KNOWN_UNAVAILABLE"
    assert schools["limitations"]
    response = client.get("/api/v1/map/schools")
    assert response.status_code == 503
    assert response.json()["error"]["code"] == "capability_unavailable"
    assert access.map_calls == 0


def test_startup_is_lightweight_and_available_dataset_is_mock_only(
    data_access: DuckDBDataAccess,
) -> None:
    access = ControlledDataAccess(data_access)
    app = create_app(
        Settings(environment="test", mock_data_enabled=True), data_access=_as_port(access)
    )
    assert access.map_calls == 0

    client = TestClient(app, raise_server_exceptions=False)
    schools = next(
        item for item in client.get("/api/v1/capabilities").json() if item["id"] == "schools"
    )
    assert schools["status"] == "MOCK_ONLY"
    assert client.get("/api/v1/map/schools", params={"limit": 1}).status_code == 200


@pytest.mark.parametrize(
    ("failure", "path"),
    [
        ("map", "/api/v1/map/schools"),
        ("profile", "/api/v1/schools/any-school/profile"),
        ("map_type", "/api/v1/map/schools"),
        ("available_cre_type", "/api/v1/map/schools"),
        ("profile_type", "/api/v1/schools/SYNTHETIC-SCHOOL-0001/profile"),
    ],
)
def test_runtime_dataset_failures_are_sanitized_503(
    data_access: DuckDBDataAccess,
    failure: str,
    path: str,
) -> None:
    access = ControlledDataAccess(data_access, runtime_failure=failure)
    client = TestClient(
        create_app(
            Settings(environment="test", mock_data_enabled=True), data_access=_as_port(access)
        ),
        raise_server_exceptions=False,
    )
    response = client.get(path)
    assert response.status_code == 503
    assert response.json() == {
        "error": {
            "code": "capability_unavailable",
            "message": "O recurso de escolas está indisponível.",
        }
    }
    assert "secret" not in response.text
