from pathlib import Path

from fastapi.testclient import TestClient

from app.composition import create_app
from app.core.config import Settings


def _client(tmp_path: Path, max_bytes: int = 1_000) -> TestClient:
    settings = Settings(
        environment="test",
        cors_origins=("http://localhost:5173",),
        intake_root=tmp_path,
        intake_max_bytes=max_bytes,
    )
    return TestClient(create_app(settings), raise_server_exceptions=False)


def test_profile_list_and_readiness_contracts(tmp_path: Path) -> None:
    client = _client(tmp_path)
    response = client.post(
        "/api/v1/data/profile",
        files={"file": ("schools.csv", b"school_id;score\n1;8\n2;9\n", "text/csv")},
    )

    assert response.status_code == 201
    descriptor = response.json()
    assert set(descriptor) == {
        "dataset_id",
        "created_at",
        "status",
        "profile",
        "readiness",
    }
    assert descriptor["profile"]["delimiter"] == ";"
    assert "schools.csv" not in response.text
    assert not any(tmp_path.iterdir())

    listing = client.get("/api/v1/data/datasets")
    readiness = client.get(f"/api/v1/data/readiness/{descriptor['dataset_id']}")
    assert listing.status_code == 200
    assert listing.json() == [descriptor]
    assert readiness.status_code == 200
    assert readiness.json() == descriptor["readiness"]


def test_probable_pii_blocks_and_never_echoes_raw_values(tmp_path: Path) -> None:
    secret = "maria@example.com"
    response = _client(tmp_path).post(
        "/api/v1/data/profile",
        files={"file": ("people.csv", f"id,email\n1,{secret}\n".encode(), "text/csv")},
    )

    assert response.status_code == 201
    assert response.json()["status"] == "BLOCKED"
    assert secret not in response.text


def test_upload_limit_and_bad_format_are_typed_and_sanitized(tmp_path: Path) -> None:
    too_large = _client(tmp_path, max_bytes=3).post(
        "/api/v1/data/profile",
        files={"file": ("secret.csv", b"abcdef", "text/csv")},
    )
    unsupported = _client(tmp_path).post(
        "/api/v1/data/profile",
        files={"file": ("secret.exe", b"private", "application/octet-stream")},
    )

    assert too_large.status_code == 413
    assert too_large.json() == {
        "error": {"code": "upload_too_large", "message": "Upload exceeds configured byte limit."}
    }
    assert unsupported.status_code == 415
    assert unsupported.json()["error"]["code"] == "unsupported_format"
    assert "secret" not in unsupported.text
    assert not any(tmp_path.iterdir())


def test_unknown_readiness_is_typed(tmp_path: Path) -> None:
    response = _client(tmp_path).get("/api/v1/data/readiness/not-found")

    assert response.status_code == 404
    assert response.json() == {
        "error": {"code": "dataset_not_found", "message": "Dataset was not found."}
    }


def test_cors_preflight_allows_profile_post(tmp_path: Path) -> None:
    response = _client(tmp_path).options(
        "/api/v1/data/profile",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
        },
    )

    assert response.status_code == 200
    assert "POST" in response.headers["access-control-allow-methods"]
