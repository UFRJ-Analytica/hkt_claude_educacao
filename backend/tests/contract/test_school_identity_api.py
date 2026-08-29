from datetime import UTC, datetime
from typing import cast

import pytest
from fastapi.testclient import TestClient

from app.composition import create_app
from app.contracts.provenance import Provenance, SourceKind
from app.core.config import Settings
from app.data_access.ports import SchoolIdentityPort
from app.schools.contracts import Coordinates, SchoolIdentity
from app.schools.identity_contracts import (
    CanonicalSchoolRecord,
    IdentityMatchField,
    OfficialSchoolListQuery,
)

SNAPSHOT_ID = "b" * 64


def _record(
    school_id: str,
    inep_id: str,
    sme_designation: str,
    cre: int,
) -> CanonicalSchoolRecord:
    return CanonicalSchoolRecord(
        identity=SchoolIdentity(
            school_id=school_id,
            nome=f"Escola {school_id}",
            inep_id=inep_id,
            sme_designation=sme_designation,
            cre=cre,
            bairro="Centro",
            dependency="Municipal",
            school_type="Escola Municipal",
            source_kind=SourceKind.REAL_PUBLIC,
        ),
        coordinates=Coordinates(latitude=-22.9, longitude=-43.2),
    )


class ApiIdentityPort:
    def __init__(self) -> None:
        self.records = (
            _record("SME-RIO-000001", "33000001", "0000001", 1),
            _record("SME-RIO-000002", "33000002", "0000002", 2),
        )

    def validate(self) -> bool:
        return True

    def snapshot_id(self) -> str:
        return SNAPSHOT_ID

    def provenance(self) -> Provenance:
        return Provenance(
            source_id="official_school_registry",
            source_kind=SourceKind.REAL_PUBLIC,
            generated=False,
            as_of=datetime(2026, 8, 30, tzinfo=UTC),
            data_version=SNAPSHOT_ID,
            limitations=("Cobertura operacional deve ser confirmada pela SME.",),
        )

    def lookup(
        self, field: IdentityMatchField, value: str
    ) -> CanonicalSchoolRecord | None:
        attribute = field.value
        for record in self.records:
            if getattr(record.identity, attribute) == value:
                return record
        return None

    def list_official_schools(
        self, query: OfficialSchoolListQuery
    ) -> tuple[tuple[CanonicalSchoolRecord, ...], int, int, tuple[int, ...]]:
        filtered = tuple(
            record
            for record in self.records
            if query.cre is None or record.identity.cre == query.cre
        )
        page = filtered[query.offset : query.offset + query.limit]
        with_coordinates = sum(1 for record in filtered if record.coordinates is not None)
        available_cres = tuple(sorted({record.identity.cre for record in self.records}))
        return page, len(filtered), with_coordinates, available_cres


def _client(port: SchoolIdentityPort | None) -> TestClient:
    app = create_app(
        Settings(environment="test", mock_data_enabled=False),
        identity_port=port,
    )
    return TestClient(app, raise_server_exceptions=False)


def test_official_school_list_exposes_real_locations_for_frontend() -> None:
    response = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/api/v1/schools/official", params={"cre": 1, "limit": 10}
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["snapshot_id"] == SNAPSHOT_ID
    assert payload["generated"] is False
    assert payload["available_cres"] == [1, 2]
    assert payload["coverage"] == {"total": 1, "with_coordinates": 1, "returned": 1}
    assert payload["records"][0]["identity"]["school_id"] == "SME-RIO-000001"
    assert payload["records"][0]["identity"]["cre"] == 1
    assert payload["records"][0]["coordinates"] == {"latitude": -22.9, "longitude": -43.2}
    assert payload["provenance"]["source_kind"] == "REAL_PUBLIC"


def test_school_context_opens_real_school_even_without_metric_snapshot() -> None:
    response = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/api/v1/schools/SME-RIO-000001/context"
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["api_contract_version"] == "1.0.0"
    assert payload["official_record"]["identity"]["school_id"] == "SME-RIO-000001"
    assert payload["official_record"]["coordinates"] == {"latitude": -22.9, "longitude": -43.2}
    assert payload["map_links"]["google_maps_url"].startswith("https://www.google.com/maps/search/?api=1&query=-22.9,-43.2")
    assert payload["map_links"]["directions_url"].startswith("https://www.google.com/maps/dir/?api=1&destination=-22.9,-43.2")
    assert payload["metric_coverage"]["status"] == "IDENTITY_ONLY"
    assert payload["synthetic_profile"] is None
    assert payload["comparisons"] == []
    assert any("Indicadores" in item for item in payload["limitations"])


def test_exact_identity_resolution_is_exposed_with_official_provenance() -> None:
    response = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/api/v1/schools/resolve", params={"inep_id": "33000001"}
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "MATCHED"
    assert payload["record"]["identity"]["school_id"] == "SME-RIO-000001"
    assert payload["record"]["identity"]["school_type"] == "Escola Municipal"
    assert payload["matched_by"] == ["inep_id"]
    assert payload["confidence"] == 1.0
    assert payload["provenance"]["source_kind"] == "REAL_PUBLIC"
    assert payload["provenance"]["data_version"] == SNAPSHOT_ID


def test_identity_conflict_is_sanitized_409() -> None:
    response = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/api/v1/schools/resolve",
        params={"inep_id": "33000001", "sme_designation": "0000002"},
    )

    assert response.status_code == 409
    assert response.json() == {
        "error": {
            "code": "school_identity_conflict",
            "message": "Os identificadores escolares fornecidos são conflitantes.",
        }
    }


def test_unknown_identity_is_sanitized_404() -> None:
    response = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/api/v1/schools/resolve", params={"inep_id": "33999999"}
    )

    assert response.status_code == 404
    assert response.json() == {
        "error": {
            "code": "school_identity_not_found",
            "message": "Identidade escolar não encontrada.",
        }
    }


@pytest.mark.parametrize(
    "params",
    [{}, {"inep_id": "123"}, {"sme_designation": "12345678"}],
)
def test_invalid_identity_lookup_is_sanitized_422(params: dict[str, str]) -> None:
    response = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/api/v1/schools/resolve", params=params
    )

    assert response.status_code == 422
    assert response.json()["error"] == {
        "code": "validation_error",
        "message": "Requisição inválida.",
    }


class UnavailableIdentityPort(ApiIdentityPort):
    def validate(self) -> bool:
        return False


def test_missing_official_release_returns_503_and_schema_only_capability() -> None:
    client = _client(cast(SchoolIdentityPort, UnavailableIdentityPort()))

    response = client.get("/api/v1/schools/resolve", params={"inep_id": "33000001"})
    capabilities = client.get("/api/v1/capabilities").json()
    identity_capability = next(item for item in capabilities if item["id"] == "school-identity")

    assert response.status_code == 503
    assert response.json()["error"]["code"] == "capability_unavailable"
    assert identity_capability["status"] == "SCHEMA_ONLY"
    assert identity_capability["source_status"] == "KNOWN_UNAVAILABLE"


def test_connected_official_release_marks_identity_capability_available() -> None:
    capabilities = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/api/v1/capabilities"
    ).json()
    identity_capability = next(item for item in capabilities if item["id"] == "school-identity")

    assert identity_capability["status"] == "AVAILABLE"
    assert identity_capability["source_status"] == "REAL_PUBLIC"
    assert identity_capability["limitations"] == [
        "Cobertura operacional deve ser confirmada pela SME."
    ]


def test_identity_capability_propagates_governed_release_limitations() -> None:
    class LimitedPort(ApiIdentityPort):
        def provenance(self) -> Provenance:
            return super().provenance().model_copy(
                update={"limitations": ("Cobertura de 97% das unidades.",)}
            )

    capabilities = _client(cast(SchoolIdentityPort, LimitedPort())).get(
        "/api/v1/capabilities"
    ).json()
    identity_capability = next(
        item for item in capabilities if item["id"] == "school-identity"
    )

    assert identity_capability["status"] == "AVAILABLE"
    assert identity_capability["limitations"] == ["Cobertura de 97% das unidades."]


def test_identity_openapi_declares_cross_parameter_requirement() -> None:
    operation = _client(cast(SchoolIdentityPort, ApiIdentityPort())).get(
        "/openapi.json"
    ).json()["paths"]["/api/v1/schools/resolve"]["get"]

    assert operation["x-at-least-one-query-parameter"] == [
        "school_id",
        "inep_id",
        "sme_designation",
    ]
    assert "ao menos um" in operation["description"].lower()


def test_disabled_identity_module_does_not_expose_a_connected_port() -> None:
    settings = Settings(
        environment="test",
        mock_data_enabled=False,
        disabled_modules=frozenset({"equity", "interventions", "school-identity"}),
    )
    app = create_app(
        settings,
        identity_port=cast(SchoolIdentityPort, ApiIdentityPort()),
    )
    client = TestClient(app, raise_server_exceptions=False)

    response = client.get("/api/v1/schools/resolve", params={"inep_id": "33000001"})
    capabilities = client.get("/api/v1/capabilities").json()
    identity_capability = next(item for item in capabilities if item["id"] == "school-identity")

    assert response.status_code == 503
    assert identity_capability["status"] == "DISABLED"


def test_runtime_identity_port_failure_is_sanitized_503() -> None:
    class FailingPort(ApiIdentityPort):
        def lookup(
            self, field: IdentityMatchField, value: str
        ) -> CanonicalSchoolRecord | None:
            raise ValueError("post-startup asset integrity failure")

    response = _client(cast(SchoolIdentityPort, FailingPort())).get(
        "/api/v1/schools/resolve", params={"inep_id": "33000001"}
    )

    assert response.status_code == 503
    assert response.json()["error"] == {
        "code": "capability_unavailable",
        "message": "O registro oficial de identidade escolar está indisponível.",
    }
