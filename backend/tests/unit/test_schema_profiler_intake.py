import json
from pathlib import Path

import pytest
from openpyxl import Workbook

from app.profiling.schema_profiler import ProfileLimits, SchemaProfiler


def test_profiles_latin1_semicolon_csv_without_exposing_values(tmp_path: Path) -> None:
    secret = "maria@example.com"
    (tmp_path / "opaque.csv").write_bytes(
        f"cpf;email;nome;escola_id\n123.456.789-09;{secret};João;10\n987.654.321-00;x@y.com;Ana;11\n".encode(
            "latin-1"
        )
    )

    profile = SchemaProfiler(tmp_path).profile("opaque.csv")
    dumped = json.dumps(profile.model_dump())

    assert profile.format == "csv"
    assert profile.encoding == "latin-1"
    assert profile.delimiter == ";"
    assert profile.row_estimate == 2
    assert profile.candidate_keys == ("escola_id",)
    assert {finding.column: finding.risk for finding in profile.privacy_findings} == {
        "cpf": "HIGH",
        "email": "HIGH",
        "nome": "MEDIUM",
    }
    assert secret not in dumped
    assert "123.456.789-09" not in dumped


def test_profiles_utf8_bom_tab_and_jsonl(tmp_path: Path) -> None:
    (tmp_path / "bom.csv").write_text("id\tnome\n1\tA\n", encoding="utf-8-sig")
    (tmp_path / "records.jsonl").write_text('{"id": 1}\n{"id": 2}\n', encoding="utf-8")

    csv_profile = SchemaProfiler(tmp_path).profile("bom.csv")
    jsonl_profile = SchemaProfiler(tmp_path).profile("records.jsonl")

    assert (csv_profile.encoding, csv_profile.delimiter) == ("utf-8-sig", r"\t")
    assert jsonl_profile.format == "jsonl"
    assert jsonl_profile.candidate_keys == ("id",)


def test_profiles_xlsx_sheet_inventory(tmp_path: Path) -> None:
    workbook = Workbook()
    workbook.active.title = "Escolas"
    workbook.active.append(["id", "nome"])
    workbook.active.append([1, "A"])
    workbook.create_sheet("Metadados").append(["campo", "descricao"])
    workbook.save(tmp_path / "book.xlsx")

    profile = SchemaProfiler(tmp_path).profile("book.xlsx")

    assert profile.format == "xlsx"
    assert profile.sheets == ("sheet_1", "sheet_2")
    assert profile.row_estimate == 1
    assert [column.name for column in profile.columns] == ["id", "nome"]


def test_rejects_oversized_and_unsupported_files_with_sanitized_errors(tmp_path: Path) -> None:
    (tmp_path / "private-name.txt").write_bytes(b"secret")
    profiler = SchemaProfiler(tmp_path, ProfileLimits(max_bytes=3))

    with pytest.raises(ValueError, match="byte limit") as error:
        profiler.profile("private-name.txt")
    assert "private-name" not in str(error.value)
