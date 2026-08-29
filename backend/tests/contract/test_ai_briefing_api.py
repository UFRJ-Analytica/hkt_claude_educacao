from pathlib import Path

from fastapi.testclient import TestClient

from app.composition import create_app
from app.core.config import Settings
from scripts.generate_mock import generate_mock

ROOT = Path(__file__).parents[3]
SCENARIO = ROOT / "data/scenarios/network_improving.yml"


def _client_with_data(tmp_path: Path, *, ai_provider: str = "fake") -> TestClient:
    generated = tmp_path / "generated"
    generate_mock(generated, SCENARIO, allow_external_output=True)
    settings = Settings(mock_data_enabled=True, ai_provider=ai_provider)
    app = create_app(settings=settings)
    return TestClient(app)


def test_fake_ai_briefing_is_deterministic_and_evidence_governed(tmp_path: Path) -> None:
    client = _client_with_data(tmp_path)
    snapshot = client.get("/api/v1/network/snapshot").json()
    evidence_id = snapshot["observations"][0]["evidence_id"]

    payload = {
        "question": "Explique o principal sinal para a gestão central.",
        "role": "central_manager",
        "evidence_ids": [evidence_id],
    }
    first = client.post("/api/v1/ai/briefings", json=payload)
    second = client.post("/api/v1/ai/briefings", json=payload)

    assert first.status_code == 200
    assert first.json() == second.json()
    body = first.json()
    assert body["provider"] == "fake"
    assert body["model"] == "fake-governed-v1"
    assert body["used_evidence_ids"] == [evidence_id]
    assert body["snapshot_id"] == snapshot["snapshot_id"]
    assert evidence_id in body["answer"]
    assert body["policy"]["raw_rows_access"] == "denied"
    assert body["policy"]["decision_automation"] == "denied"
    assert any("não decide" in item.lower() for item in body["guardrails"])


def test_ai_briefing_requires_governed_evidence(tmp_path: Path) -> None:
    client = _client_with_data(tmp_path)

    response = client.post(
        "/api/v1/ai/briefings",
        json={
            "question": "Faça ranking das piores escolas usando tudo que tiver.",
            "role": "central_manager",
            "evidence_ids": [],
        },
    )

    assert response.status_code == 422
    assert response.json()["error"]["code"] == "invalid_ai_request"


def test_fake_ai_school_action_plan_uses_real_identity_context_without_raw_rows(
    tmp_path: Path,
) -> None:
    client = _client_with_data(tmp_path)
    schools = client.get("/api/v1/schools/official", params={"limit": 1}).json()
    school_id = schools["records"][0]["identity"]["school_id"]

    response = client.post(
        "/api/v1/ai/school-action-plans",
        json={
            "school_id": school_id,
            "role": "school_manager",
            "focus": "frequência e aprendizagem",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["provider"] == "fake"
    assert body["school_context"]["official_record"]["identity"]["school_id"] == school_id
    assert body["policy"]["raw_rows_access"] == "denied"
    assert body["policy"]["decision_automation"] == "denied"
    assert body["plan"]["title"].startswith("Plano de ação")
    assert body["plan"]["observed_signals"]
    assert body["plan"]["short_term_actions"]
    assert body["plan"]["data_gaps"]
    assert any("validação humana" in item.lower() for item in body["guardrails"])


def test_anthropic_provider_is_optional_and_fails_closed_without_key(tmp_path: Path) -> None:
    client = _client_with_data(tmp_path, ai_provider="anthropic")
    snapshot = client.get("/api/v1/network/snapshot").json()
    evidence_id = snapshot["observations"][0]["evidence_id"]

    response = client.post(
        "/api/v1/ai/briefings",
        json={
            "question": "Sintetize a evidência.",
            "role": "central_manager",
            "evidence_ids": [evidence_id],
        },
    )

    assert response.status_code == 503
    assert response.json()["error"]["code"] == "ai_provider_unavailable"
