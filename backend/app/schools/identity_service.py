"""Exact school identity resolution over a curated, governed registry port."""

from app.contracts.provenance import Provenance, SourceKind
from app.data_access.ports import SchoolIdentityPort
from app.schools.identity_contracts import (
    CanonicalSchoolRecord,
    IdentityLookup,
    IdentityMatchField,
    IdentityResolutionStatus,
    SchoolIdentityResolution,
)


class IdentityDatasetUnavailableError(RuntimeError):
    """The curated official identity registry is unavailable or invalid."""


_NOT_FOUND_LIMITATION = (
    "Nenhuma correspondência exata foi encontrada; nenhum fallback aproximado "
    "foi aplicado."
)
_CONFLICT_LIMITATION = (
    "Os identificadores não resolvem de forma consistente; nenhum fallback "
    "aproximado foi aplicado."
)
_MATCHED_LIMITATION = (
    "Correspondência exata por identificador; nenhuma inferência aproximada "
    "foi aplicada."
)


class SchoolIdentityResolver:
    def __init__(self, repository: SchoolIdentityPort) -> None:
        if not repository.validate():
            raise IdentityDatasetUnavailableError("official identity registry is unavailable")
        provenance = repository.provenance()
        if (
            provenance.source_id != "official_school_registry"
            or provenance.source_kind is not SourceKind.REAL_PUBLIC
            or provenance.generated
            or provenance.data_version != repository.snapshot_id()
        ):
            raise IdentityDatasetUnavailableError("official identity provenance is invalid")
        self._repository = repository
        self._provenance = provenance

    def provenance(self) -> Provenance:
        return self._provenance

    def resolve(self, lookup: IdentityLookup) -> SchoolIdentityResolution:
        try:
            return self._resolve(lookup)
        except (ValueError, OSError, RuntimeError, KeyError) as error:
            raise IdentityDatasetUnavailableError(
                "official identity registry failed during lookup"
            ) from error

    @staticmethod
    def _validate_match(
        field: IdentityMatchField, value: str, record: CanonicalSchoolRecord
    ) -> None:
        identity = record.identity
        if identity.source_kind is not SourceKind.REAL_PUBLIC:
            raise ValueError("identity port returned a non-official record")
        record_value = {
            IdentityMatchField.SCHOOL_ID: identity.school_id,
            IdentityMatchField.INEP_ID: identity.inep_id,
            IdentityMatchField.SME_DESIGNATION: identity.sme_designation,
        }[field]
        if record_value != value:
            raise ValueError("identity port returned a non-exact record")

    def _resolve(self, lookup: IdentityLookup) -> SchoolIdentityResolution:
        supplied = lookup.supplied()
        resolved_items: list[
            tuple[IdentityMatchField, CanonicalSchoolRecord | None]
        ] = []
        for field, value in supplied:
            record = self._repository.lookup(field, value)
            if record is not None:
                self._validate_match(field, value, record)
            resolved_items.append((field, record))
        resolved = tuple(resolved_items)
        matches = tuple((field, record) for field, record in resolved if record is not None)

        if not matches:
            return SchoolIdentityResolution(
                status=IdentityResolutionStatus.NOT_FOUND,
                record=None,
                matched_by=(),
                confidence=0.0,
                provenance=self._provenance,
                limitations=(_NOT_FOUND_LIMITATION,),
            )

        school_ids = {record.identity.school_id for _, record in matches}
        if len(school_ids) == 1 and any(
            record != matches[0][1] for _, record in matches[1:]
        ):
            raise ValueError("identity port returned inconsistent canonical records")
        all_supplied_matched = len(matches) == len(supplied)
        if len(school_ids) != 1 or not all_supplied_matched:
            return SchoolIdentityResolution(
                status=IdentityResolutionStatus.CONFLICT,
                record=None,
                matched_by=tuple(field for field, _ in supplied),
                confidence=0.0,
                provenance=self._provenance,
                limitations=(_CONFLICT_LIMITATION,),
            )

        return SchoolIdentityResolution(
            status=IdentityResolutionStatus.MATCHED,
            record=matches[0][1],
            matched_by=tuple(field for field, _ in matches),
            confidence=1.0,
            provenance=self._provenance,
            limitations=(_MATCHED_LIMITATION,),
        )
