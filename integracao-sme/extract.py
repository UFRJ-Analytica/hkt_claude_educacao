#!/usr/bin/env python3
"""Extrai o extrato da SME do BigQuery para disco local (nunca versionado).

Fonte:
    SELECT * FROM `rio-sme.sme_creche.inscricoes_completa` LIMIT 1000

Usa o `bq` CLI (autenticação de usuário; a lib google.cloud.bigquery exige ADC,
que não está configurado nesta máquina). Grava CSV bruto e converte para Parquet
com DuckDB — o formato que o build_overlay lê.

Nada disto entra no Git: são registros de criança (mesmo anonimizados/sintéticos).
Só o overlay agregado em out/ é versionável.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import duckdb

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
TABLE = "rio-sme.sme_creche.inscricoes_completa"
LIMIT = 1000
SQL = f"SELECT * FROM `{TABLE}` LIMIT {LIMIT}"


def extract_csv(target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        [
            "bq",
            "query",
            "--use_legacy_sql=false",
            "--format=csv",
            f"--max_rows={LIMIT}",
            SQL,
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr)
        raise SystemExit(f"bq query falhou (exit {proc.returncode})")
    target.write_text(proc.stdout, encoding="utf-8")


def to_parquet(csv_path: Path, parquet_path: Path) -> int:
    con = duckdb.connect()
    con.execute(
        "CREATE TABLE t AS SELECT * FROM read_csv_auto(?, header=true)",
        [str(csv_path)],
    )
    con.execute("COPY t TO ? (FORMAT PARQUET)", [str(parquet_path)])
    (rows,) = con.execute("SELECT COUNT(*) FROM t").fetchone()
    con.close()
    return int(rows)


def main() -> None:
    csv_path = DATA / "inscricoes_completa.csv"
    parquet_path = DATA / "inscricoes_completa.parquet"
    print(f"[extract] consultando {TABLE} (LIMIT {LIMIT}) via bq CLI…")
    extract_csv(csv_path)
    rows = to_parquet(csv_path, parquet_path)
    print(f"[extract] {rows} linhas → {parquet_path.relative_to(HERE)}")
    print("[extract] dado bruto fica só em data/ (gitignored).")


if __name__ == "__main__":
    main()
