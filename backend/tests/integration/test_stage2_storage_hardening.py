import sqlite3
import uuid
from pathlib import Path

import pytest

from app.control.sqlite_repository import InvalidTransitionError, SQLiteControlRepository
from app.data_access.duckdb_adapter import DuckDBDataAccess
from scripts.generate_mock import generate_mock

ROOT = Path(__file__).parents[3]
SCENARIO = ROOT / "data/scenarios/network_improving.yml"


@pytest.mark.parametrize(
    "payload",
    [
        "João Silva",
        "telefone 11987654321",
        "RG 12.345.678-9",
        "CPF 123.456.789-09",
        "NIS 12345678901",
        "matrícula 20260001",
        "endereço Rua das Flores, 10",
        "email pessoa@example.org",
        "coordenada residencial -23.5,-46.6",
        "aluno",
        "profissional",
        "ＡＬＵＮＯ",
        "matrícula",
    ],
)
def test_control_free_text_uses_aggregate_only_allowlist(tmp_path: Path, payload: str) -> None:
    with SQLiteControlRepository(tmp_path / "control.sqlite") as repo:
        run_id = repo.create_agent_run("investigation", {"source": "synthetic"})
        with pytest.raises(ValueError, match="PII"):
            repo.create_investigation(payload, run_id)


def test_control_free_text_rejects_arbitrary_combinations_of_allowed_words(
    tmp_path: Path,
) -> None:
    with SQLiteControlRepository(tmp_path / "control.sqlite") as repo:
        with pytest.raises(ValueError, match="PII"):
            repo.create_agent_run("Max Held", {"source": "synthetic"})
        with pytest.raises(ValueError, match="PII"):
            repo.create_agent_run("investigation", {"source": "Max Held"})

        run_id = repo.create_agent_run("investigation", {"source": "synthetic"})
        with pytest.raises(ValueError, match="PII"):
            repo.create_investigation("Max Held", run_id)

        investigation_id = repo.create_investigation("Capacity signal", run_id)
        with pytest.raises(ValueError, match="PII"):
            repo.create_meeting(investigation_id, "Max Held")
        with pytest.raises(ValueError, match="PII"):
            repo.create_action_item(investigation_id, "Max Held")
        with pytest.raises(ValueError, match="PII"):
            repo.audit("investigation", investigation_id, "CHECKED", {"state": "Max Held"})


def test_public_audit_rejects_orphan_and_wrong_entity_type(tmp_path: Path) -> None:
    with SQLiteControlRepository(tmp_path / "control.sqlite") as repo:
        run_id = repo.create_agent_run("investigation", {"source": "synthetic"})
        audit_count = repo.count("audit_events")

        with pytest.raises(ValueError, match="does not exist"):
            repo.audit("investigation", str(uuid.uuid4()), "CHECKED", {"state": "OPEN"})
        with pytest.raises(ValueError, match="does not exist"):
            repo.audit("investigation", run_id, "CHECKED", {"state": "OPEN"})

        assert repo.count("audit_events") == audit_count


def test_creation_and_audit_roll_back_together_when_audit_fails(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    database = tmp_path / "control.sqlite"
    with SQLiteControlRepository(database) as repo:
        run_id = repo.create_agent_run("investigation", {"source": "synthetic"})
        investigation_count = repo.count("investigations")
        audit_count = repo.count("audit_events")

        def fail_audit(*args: object, **kwargs: object) -> None:
            raise RuntimeError("audit unavailable")

        monkeypatch.setattr(repo, "audit", fail_audit)
        with pytest.raises(RuntimeError, match="audit unavailable"):
            repo.create_investigation("Capacity signal", run_id)

        assert repo.count("investigations") == investigation_count
        assert repo.count("audit_events") == audit_count


def test_transition_and_audit_roll_back_together_when_audit_fails(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    database = tmp_path / "control.sqlite"
    with SQLiteControlRepository(database) as repo:
        run_id = repo.create_agent_run("investigation", {"source": "synthetic"})
        investigation_id = repo.create_investigation("Aggregate capacity signal", run_id)
        audit_count = repo.count("audit_events")

        def fail_audit(*args: object, **kwargs: object) -> None:
            raise RuntimeError("audit unavailable")

        monkeypatch.setattr(repo, "audit", fail_audit)
        with pytest.raises(RuntimeError, match="audit unavailable"):
            repo.transition_investigation(investigation_id, "IN_PROGRESS")

        row = repo._connection.execute(  # noqa: SLF001 - transaction integration assertion
            "SELECT state FROM investigations WHERE id=?", (investigation_id,)
        ).fetchone()
        assert row == ("OPEN",)
        assert repo.count("audit_events") == audit_count


def test_transition_requires_exactly_one_conditionally_updated_row(tmp_path: Path) -> None:
    with SQLiteControlRepository(tmp_path / "control.sqlite") as repo:
        run_id = repo.create_agent_run("investigation", {"source": "synthetic"})
        investigation_id = repo.create_investigation("Aggregate capacity signal", run_id)
        repo._connection.execute(  # noqa: SLF001 - simulate a concurrent write conflict
            "CREATE TRIGGER suppress_transition BEFORE UPDATE ON investigations "
            "BEGIN SELECT RAISE(IGNORE); END"
        )
        with pytest.raises(InvalidTransitionError, match="conflict"):
            repo.transition_investigation(investigation_id, "IN_PROGRESS")
        assert repo.count("audit_events") == 2


def test_repository_close_rolls_back_and_context_manager_closes(tmp_path: Path) -> None:
    repo = SQLiteControlRepository(tmp_path / "rollback.sqlite")
    repo._connection.execute("BEGIN")  # noqa: SLF001 - verify close contract
    repo._connection.execute(  # noqa: SLF001
        "INSERT INTO agent_runs(id, run_type, context_json, status) "
        "VALUES ('run', 'investigation', '{}', 'CREATED')"
    )
    repo.close()
    repo.close()
    with sqlite3.connect(tmp_path / "rollback.sqlite") as connection:
        assert connection.execute("SELECT count(*) FROM agent_runs").fetchone() == (0,)
    with pytest.raises(sqlite3.ProgrammingError):
        repo.count("agent_runs")

    managed = SQLiteControlRepository(tmp_path / "managed.sqlite")
    with managed:
        pass
    with pytest.raises(sqlite3.ProgrammingError):
        managed.count("agent_runs")


def test_schools_uses_confined_asset_resolution_and_is_not_aggregatable(tmp_path: Path) -> None:
    root = tmp_path / "generated"
    generate_mock(root, SCENARIO, allow_external_output=True)
    access = DuckDBDataAccess(root, allow_external_root=True)
    schools = access.list_schools(limit=1)
    assert len(schools) == 1
    assert schools[0]["school_id"] == "SYNTHETIC-SCHOOL-0001"
    assert schools[0]["inep_id"] is None
    assert schools[0]["sme_designation"] is None
    with pytest.raises(ValueError, match="measure or operation|aggregate"):
        access.aggregate("schools", "latitude", "avg")


def test_schools_rejects_symlink_asset(tmp_path: Path) -> None:
    root = tmp_path / "generated"
    manifest = generate_mock(root, SCENARIO, allow_external_output=True)
    release = root / "releases" / str(manifest["generation_id"])
    asset = release / "schools.parquet"
    outside = tmp_path / "outside.parquet"
    outside.write_bytes(asset.read_bytes())
    asset.unlink()
    try:
        asset.symlink_to(outside)
    except OSError:
        pytest.skip("symlinks are unavailable on this Windows environment")
    with pytest.raises(ValueError, match="symlink|reparse"):
        DuckDBDataAccess(root, allow_external_root=True)
