from fastapi.testclient import TestClient

from app.composition import create_app
from app.core.config import Settings


def test_strategy_data_plan_separates_synthetic_current_state_from_real_candidates() -> None:
    client = TestClient(
        create_app(Settings(environment="test", mock_data_enabled=True)),
        raise_server_exceptions=False,
    )

    response = client.get("/api/v1/strategy/data-plan")

    assert response.status_code == 200
    payload = response.json()
    assert payload["api_contract_version"] == "1.0.0"
    assert payload["product_thesis"].startswith("Inteligência gerencial")
    assert payload["current_runtime"]["storage"] == "DuckDB over governed Parquet release"
    assert payload["current_runtime"]["generated"] is True
    assert payload["current_runtime"]["release_id"]
    assert set(payload["current_runtime"]["synthetic_assets"]) == {
        "schools.parquet",
        "attendance_facts.parquet",
        "assessment_facts.parquet",
        "capacity_facts.parquet",
        "teacher_shortage_facts.parquet",
        "quality_observations.parquet",
    }
    real_sources = {source["source_id"]: source for source in payload["real_source_candidates"]}
    assert "inep_censo_escolar" in real_sources
    assert "inep_ideb_saeb" in real_sources
    assert "sme_educacao_basica" in real_sources
    assert real_sources["inep_censo_escolar"]["runtime_status"] == "NOT_INGESTED"
    assert real_sources["sme_educacao_basica"]["runtime_status"] == "NOT_INGESTED"
    assert any(
        source["join_keys"] == ["co_entidade", "inep_id"]
        for source in payload["real_source_candidates"]
    )
    domains = {domain["domain_id"]: domain for domain in payload["adaptation_domains"]}
    assert domains["learning"]["probability_band"] == "HIGH"
    assert domains["attendance"]["probability_band"] == "HIGH"
    assert domains["interventions"]["runtime_status"] == "MISSING"
    assert domains["student_family"]["probability_band"] == "LOW"
    assert all(step["human_review_required"] is True for step in payload["ai_usage_ladder"])
    assert payload["critical_gaps"][0]["gap_id"] == "official_school_identity"
    assert "cpf" not in response.text.lower()
    assert "nome_aluno" not in response.text.lower()
