from pathlib import Path

from fastapi.testclient import TestClient

from app.composition import create_app
from app.core.config import Settings


def _client(tmp_path: Path) -> TestClient:
    return TestClient(
        create_app(
            Settings(
                environment="test",
                cors_origins=(),
                intake_root=tmp_path / "uploads",
                intake_catalog_path=tmp_path / "catalog.sqlite3",
            )
        ),
        raise_server_exceptions=False,
    )


def test_mapping_join_approval_audit_and_sanitized_errors(tmp_path: Path) -> None:
    client = _client(tmp_path)
    descriptor = client.post(
        "/api/v1/data/profile",
        files={"file": ("metrics.csv", b"codigo_inep,valor\n1,8\n", "text/csv")},
    ).json()
    dataset_id = descriptor["dataset_id"]

    proposal = client.get(f"/api/v1/data/mappings/{dataset_id}/proposal")
    assert proposal.status_code == 200
    assert [item["canonical_field"] for item in proposal.json()["candidates"]] == [
        "inep_id",
        "value",
    ]
    assert "\n1,8" not in proposal.text

    created = client.post(
        "/api/v1/data/joins",
        json={
            "dataset_id": dataset_id,
            "identity_release_id": "a" * 64,
            "mappings": [{"source_column": "codigo_inep", "target_field": "inep_id"}],
        },
    )
    assert created.status_code == 201
    join_id = created.json()["join_id"]
    assert created.json()["state"] == "DRAFT"
    assert client.post(f"/api/v1/data/joins/{join_id}/approve").json()["state"] == "APPROVED"
    conflict = client.post(f"/api/v1/data/joins/{join_id}/approve")
    assert conflict.status_code == 409
    assert dataset_id not in conflict.text

    invalid = client.post(
        f"/api/v1/data/joins/{join_id}/audits",
        json={
            "input_rows": 2,
            "matched_rows": 2,
            "unmatched_source_rows": 1,
            "unmatched_target_rows": 0,
            "conflicting_rows": 0,
        },
    )
    assert invalid.status_code == 422
    assert invalid.json()["error"]["code"] == "validation_error"

    audit = client.post(
        f"/api/v1/data/joins/{join_id}/audits",
        json={
            "input_rows": 4,
            "matched_rows": 3,
            "unmatched_source_rows": 1,
            "unmatched_target_rows": 2,
            "conflicting_rows": 0,
        },
    )
    assert audit.status_code == 201
    assert audit.json()["match_rate"] == 0.75
    assert client.get(f"/api/v1/data/joins/{join_id}/audits?limit=1&offset=0").json() == [
        audit.json()
    ]
    listed = client.get(f"/api/v1/data/joins?dataset_id={dataset_id}&limit=1&offset=0").json()
    assert listed[0] == created.json() | {
        "state": "APPROVED",
        "approved_at": listed[0]["approved_at"],
        "approval_basis": "SYSTEM_VALIDATED",
    }
    assert listed[0]["approved_at"].endswith("Z")


def test_join_openapi_and_restart_persistence(tmp_path: Path) -> None:
    client = _client(tmp_path)
    dataset_id = client.post(
        "/api/v1/data/profile",
        files={"file": ("metrics.csv", b"school_id,value\n1,8\n", "text/csv")},
    ).json()["dataset_id"]
    created = client.post(
        "/api/v1/data/joins",
        json={
            "dataset_id": dataset_id,
            "mappings": [{"source_column": "school_id", "target_field": "school_id"}],
        },
    ).json()

    restarted = _client(tmp_path)
    assert restarted.get(f"/api/v1/data/mappings/{dataset_id}/proposal").status_code == 200
    assert restarted.get(f"/api/v1/data/joins?dataset_id={dataset_id}").json() == [created]
    openapi = restarted.get("/openapi.json").json()
    paths = openapi["paths"]
    assert "/api/v1/data/mappings/{dataset_id}/proposal" in paths
    assert "/api/v1/data/joins/{join_id}/audits" in paths
    schemas = openapi["components"]["schemas"]
    assert schemas["JoinTargetField"]["enum"] == [
        "school_id",
        "inep_id",
        "sme_designation",
        "cre_id",
    ]
    assert set(schemas["ApprovalCommand"]["properties"]) == {"reviewed", "basis"}


def test_join_governance_blocks_private_unknown_and_unreviewed_mappings(tmp_path: Path) -> None:
    client = _client(tmp_path)
    blocked_id = client.post(
        "/api/v1/data/profile",
        files={"file": ("private.csv", b"email\none@example.com\n", "text/csv")},
    ).json()["dataset_id"]
    blocked = client.post(
        "/api/v1/data/joins",
        json={
            "dataset_id": blocked_id,
            "mappings": [{"source_column": "email", "target_field": "school_id"}],
        },
    )
    assert blocked.status_code == 409
    assert blocked.json()["error"]["code"] == "join_dataset_blocked"

    ready_id = client.post(
        "/api/v1/data/profile",
        files={"file": ("ready.csv", b"school_id\nS1\n", "text/csv")},
    ).json()["dataset_id"]
    unknown = client.post(
        "/api/v1/data/joins",
        json={
            "dataset_id": ready_id,
            "mappings": [{"source_column": "not_a_column", "target_field": "school_id"}],
        },
    )
    assert unknown.status_code == 409
    assert unknown.json()["error"]["code"] == "invalid_join_mapping"

    reviewed_id = client.post(
        "/api/v1/data/profile",
        files={
            "file": (
                "review.csv",
                b"school_id,nome\nS1,Escola demonstrativa\n",
                "text/csv",
            )
        },
    ).json()["dataset_id"]
    draft = client.post(
        "/api/v1/data/joins",
        json={
            "dataset_id": reviewed_id,
            "mappings": [{"source_column": "school_id", "target_field": "school_id"}],
        },
    )
    assert draft.status_code == 201
    assert draft.json()["requires_review"] is True
    join_id = draft.json()["join_id"]
    assert client.post(f"/api/v1/data/joins/{join_id}/approve").status_code == 409
    approved = client.post(
        f"/api/v1/data/joins/{join_id}/approve",
        json={"reviewed": True, "basis": "MANUAL_REVIEW"},
    )
    assert approved.status_code == 200
    assert approved.json()["approval_basis"] == "MANUAL_REVIEW"
    assert approved.json()["approved_at"] is not None


def test_join_audit_requires_approval_and_complete_source_partition(tmp_path: Path) -> None:
    client = _client(tmp_path)
    dataset_id = client.post(
        "/api/v1/data/profile",
        files={"file": ("metrics.csv", b"school_id\nS1\n", "text/csv")},
    ).json()["dataset_id"]
    join_id = client.post(
        "/api/v1/data/joins",
        json={
            "dataset_id": dataset_id,
            "mappings": [{"source_column": "school_id", "target_field": "school_id"}],
        },
    ).json()["join_id"]
    payload = {
        "input_rows": 10,
        "matched_rows": 1,
        "unmatched_source_rows": 0,
        "unmatched_target_rows": 0,
        "conflicting_rows": 0,
    }
    assert client.post(f"/api/v1/data/joins/{join_id}/audits", json=payload).status_code == 422
    complete = payload | {"unmatched_source_rows": 9}
    draft_audit = client.post(f"/api/v1/data/joins/{join_id}/audits", json=complete)
    assert draft_audit.status_code == 409
    assert draft_audit.json()["error"]["code"] == "join_not_approved"
