import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

import duckdb
import pytest
from fastapi.testclient import TestClient
from openpyxl import Workbook
from pydantic import ValidationError

from app.composition import create_app
from app.core.config import Settings
from app.intake.contracts import Readiness, ReadinessStatus
from app.intake.middleware import IntakeBodyLimitMiddleware
from app.intake.service import IntakeService, MemoryIntakeRepository
from app.profiling.schema_profiler import ProfileLimits, SchemaProfiler


def test_json_alias_single_value_and_ambiguous_keys(tmp_path: Path) -> None:
    (tmp_path / "records.json").write_text(
        json.dumps(
            [{"cpf_aluno": "not-pii", "other": "x"}, {"cpf_aluno": "123.456.789-09", "other": "y"}]
        ),
        encoding="utf-8",
    )
    profile = SchemaProfiler(tmp_path).profile("records.json")
    assert profile.privacy_findings[0].column == "cpf_aluno"
    assert "VALUE_PATTERN" in profile.privacy_findings[0].detected_by
    assert "cpf_aluno" not in profile.candidate_keys

    (tmp_path / "bad.json").write_text('[{"a": 1}, {"b": 2}]', encoding="utf-8")
    with pytest.raises(ValueError, match="ambiguous width"):
        SchemaProfiler(tmp_path).profile("bad.json")


def test_duplicate_and_sensitive_headers_are_rejected_or_redacted(tmp_path: Path) -> None:
    (tmp_path / "duplicate.csv").write_text("id,id\n1,2\n", encoding="utf-8")
    with pytest.raises(ValueError, match="duplicate"):
        SchemaProfiler(tmp_path).profile("duplicate.csv")

    secret_header = "maria@example.com"
    (tmp_path / "header.csv").write_text(f"{secret_header},value\nx,1\n", encoding="utf-8")
    profile = SchemaProfiler(tmp_path).profile("header.csv")
    assert [column.name for column in profile.columns] == ["column_1", "value"]
    assert profile.privacy_findings[0].column == "column_1"
    assert secret_header not in profile.model_dump_json()


def test_xlsx_checks_every_sheet_and_never_returns_sheet_names(tmp_path: Path) -> None:
    secret_sheet = "maria@example.com"
    workbook = Workbook()
    workbook.active.title = "public"
    workbook.active.append(["id", "score"])
    workbook.active.append([1, 9])
    private = workbook.create_sheet(secret_sheet)
    private.append(["email_responsavel"])
    private.append(["one@example.com"])
    workbook.save(tmp_path / "book.xlsx")

    profile = SchemaProfiler(tmp_path).profile("book.xlsx")
    assert profile.sheets == ("sheet_1", "sheet_2")
    assert any(finding.risk == "HIGH" for finding in profile.privacy_findings)
    assert secret_sheet not in profile.model_dump_json()


def test_xlsx_zip_preflight_rejects_extreme_ratio(tmp_path: Path) -> None:
    path = tmp_path / "bomb.xlsx"
    with ZipFile(path, "w", ZIP_DEFLATED) as archive:
        archive.writestr("xl/worksheets/sheet1.xml", b"0" * 100_000)
    profiler = SchemaProfiler(
        tmp_path, ProfileLimits(xlsx_max_compression_ratio=2, max_bytes=1_000_000)
    )
    with pytest.raises(ValueError, match="safety limits"):
        profiler.profile("bomb.xlsx")


def test_parquet_uses_metadata_count_and_limited_sample(tmp_path: Path) -> None:
    path = tmp_path / "records.parquet"
    escaped = str(path).replace("'", "''")
    with duckdb.connect(":memory:") as connection:
        connection.execute(
            f"COPY (SELECT range AS id FROM range(100)) TO '{escaped}' "
            "(FORMAT PARQUET)"
        )
    profile = SchemaProfiler(tmp_path, ProfileLimits(max_rows=3)).profile("records.parquet")
    assert profile.row_estimate == 100
    assert profile.columns[0].distinct_estimate == 3


def test_readiness_contract_invariants() -> None:
    with pytest.raises(ValidationError):
        Readiness(status=ReadinessStatus.BLOCKED, score=0)
    with pytest.raises(ValidationError):
        Readiness(status=ReadinessStatus.READY, score=99)
    with pytest.raises(ValidationError):
        Readiness(status=ReadinessStatus.REVIEW, score=100)


def test_repository_bound_and_pagination(tmp_path: Path) -> None:
    repository = MemoryIntakeRepository(max_descriptors=2)
    service = IntakeService(tmp_path, repository)
    descriptors = [
        service.ingest(f"{index}.csv", iter((f"id,value\n{index},{index}\n".encode(),)))
        for index in range(3)
    ]
    assert repository.get(descriptors[0].dataset_id) is None
    assert service.list_datasets(limit=1, offset=1) == (descriptors[2],)


def test_api_corrupt_parser_pagination_and_openapi(tmp_path: Path) -> None:
    client = TestClient(
        create_app(Settings(environment="test", intake_root=tmp_path, intake_max_bytes=2_000)),
        raise_server_exceptions=False,
    )
    corrupt = client.post(
        "/api/v1/data/profile",
        files={
            "file": (
                "private.xlsx",
                b"not a zip",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            )
        },
    )
    assert corrupt.status_code == 422
    assert corrupt.json()["error"]["code"] == "invalid_dataset"
    assert "private" not in corrupt.text
    assert client.get("/api/v1/data/datasets?limit=0").status_code == 422
    responses = client.get("/openapi.json").json()["paths"]["/api/v1/data/profile"]["post"][
        "responses"
    ]
    assert {"413", "415"} <= responses.keys()


@pytest.mark.anyio
async def test_body_middleware_rejects_before_downstream_for_declared_and_chunked() -> None:
    calls = 0

    async def downstream(scope: object, receive: object, send: object) -> None:
        nonlocal calls
        calls += 1

    middleware = IntakeBodyLimitMiddleware(downstream, max_bytes=3)

    async def run(
        headers: list[tuple[bytes, bytes]], messages: list[dict[str, object]]
    ) -> list[dict[str, object]]:
        sent: list[dict[str, object]] = []

        async def receive() -> dict[str, object]:
            return messages.pop(0)

        async def send(message: dict[str, object]) -> None:
            sent.append(message)

        scope = {
            "type": "http",
            "method": "POST",
            "path": "/api/v1/data/profile",
            "headers": headers,
        }
        await middleware(scope, receive, send)  # type: ignore[arg-type]
        return sent

    declared = await run([(b"content-length", b"4")], [])
    chunked = await run(
        [],
        [
            {"type": "http.request", "body": b"12", "more_body": True},
            {"type": "http.request", "body": b"34", "more_body": False},
        ],
    )
    assert calls == 0
    assert declared[0]["status"] == chunked[0]["status"] == 413
