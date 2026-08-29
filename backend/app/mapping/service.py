import re
import unicodedata
from collections import defaultdict

from app.intake.contracts import ReadinessStatus
from app.intake.service import IntakeNotFoundError, IntakeRepository
from app.mapping.contracts import (
    CanonicalField,
    MappingCandidate,
    MappingProposal,
    MappingStatus,
)

# This allowlist is deliberately finite. Similar-looking names not listed here never match.
_ALIASES: dict[CanonicalField, frozenset[str]] = {
    CanonicalField.SCHOOL_ID: frozenset(
        {"school_id", "id_escola", "escola_id", "codigo_escola", "código_escola"}
    ),
    CanonicalField.INEP_ID: frozenset(
        {"inep_id", "inep", "codigo_inep", "código_inep", "cod_inep"}
    ),
    CanonicalField.SME_DESIGNATION: frozenset(
        {"sme_designation", "designacao_sme", "designação_sme", "nome_sme"}
    ),
    CanonicalField.CRE_ID: frozenset({"cre_id", "id_cre", "codigo_cre", "código_cre"}),
    CanonicalField.INDICATOR_ID: frozenset(
        {"indicator_id", "indicador_id", "id_indicador", "codigo_indicador"}
    ),
    CanonicalField.PERIOD_START: frozenset(
        {"period_start", "inicio_periodo", "início_período", "data_inicio"}
    ),
    CanonicalField.PERIOD_END: frozenset(
        {"period_end", "fim_periodo", "fim_período", "data_fim"}
    ),
    CanonicalField.PUBLISHED_AT: frozenset(
        {"published_at", "data_publicacao", "data_publicação", "publicado_em"}
    ),
    CanonicalField.VALUE: frozenset({"value", "valor"}),
    CanonicalField.UNIT: frozenset({"unit", "unidade", "unidade_medida"}),
    CanonicalField.NUMERATOR: frozenset({"numerator", "numerador"}),
    CanonicalField.DENOMINATOR: frozenset({"denominator", "denominador"}),
    CanonicalField.SOURCE_REF: frozenset(
        {"source_ref", "referencia_fonte", "referência_fonte", "fonte_ref"}
    ),
}
_SEPARATOR = re.compile(r"[^\w]+", flags=re.UNICODE)


def normalize_alias(value: str) -> str:
    return _SEPARATOR.sub("_", unicodedata.normalize("NFKC", value).casefold()).strip("_")


_ALIAS_INDEX: dict[str, tuple[CanonicalField, ...]] = {}
_index: dict[str, set[CanonicalField]] = defaultdict(set)
for _target, _names in _ALIASES.items():
    for _name in _names:
        _index[normalize_alias(_name)].add(_target)
_ALIAS_INDEX = {name: tuple(sorted(targets, key=str)) for name, targets in _index.items()}


class MappingService:
    def __init__(self, repository: IntakeRepository) -> None:
        self._repository = repository

    def propose(self, dataset_id: str) -> MappingProposal:
        descriptor = self._repository.get(dataset_id)
        if descriptor is None:
            raise IntakeNotFoundError()
        columns = tuple(column.name for column in descriptor.profile.columns)
        if descriptor.status is ReadinessStatus.BLOCKED:
            return MappingProposal(
                dataset_id=descriptor.dataset_id,
                status=MappingStatus.BLOCKED,
                unmapped_columns=columns,
                limitations=("dataset_readiness_blocked",),
            )

        pii_columns = {finding.column for finding in descriptor.profile.privacy_findings}
        matches: dict[str, tuple[CanonicalField, ...]] = {
            column: _ALIAS_INDEX.get(normalize_alias(column), ())
            for column in columns
            if column not in pii_columns
        }
        by_target: dict[CanonicalField, list[str]] = defaultdict(list)
        for column, targets in matches.items():
            for target in targets:
                by_target[target].append(column)
        collisions = {
            column
            for column, targets in matches.items()
            if len(targets) > 1 or any(len(by_target[target]) > 1 for target in targets)
        }
        candidates = tuple(
            MappingCandidate(
                source_column=column,
                canonical_field=targets[0],
                requires_review=descriptor.status is ReadinessStatus.REVIEW,
            )
            for column in columns
            if column in matches
            and len(targets := matches[column]) == 1
            and column not in collisions
        )
        mapped = {candidate.source_column for candidate in candidates}
        limitations: list[str] = []
        if collisions:
            limitations.append("alias_collision")
        if pii_columns:
            limitations.append("pii_columns_excluded")
        if descriptor.status is ReadinessStatus.REVIEW:
            limitations.append("dataset_readiness_review")
        status = (
            MappingStatus.REVIEW
            if collisions or descriptor.status is ReadinessStatus.REVIEW
            else MappingStatus.PROPOSED
        )
        return MappingProposal(
            dataset_id=descriptor.dataset_id,
            status=status,
            candidates=candidates,
            unmapped_columns=tuple(column for column in columns if column not in mapped),
            limitations=tuple(limitations),
        )
