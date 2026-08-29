from datetime import UTC, datetime

import pytest
from pydantic import ValidationError

from app.contracts.provenance import Provenance, SourceKind
from app.schools.contracts import Coordinates, SchoolIdentity
from app.schools.identity_contracts import (
    CanonicalSchoolRecord,
    IdentityLookup,
    IdentityMatchField,
    IdentityResolutionStatus,
)
from app.schools.identity_service import (
    IdentityDatasetUnavailableError,
    SchoolIdentityResolver,
)

SNAPSHOT_ID = "a" * 64


def _provenance() -> Provenance:
    return Provenance(
        source_id="official_school_registry",
        source_kind=SourceKind.REAL_PUBLIC,
        generated=False,
        as_of=datetime(2026, 8, 30, tzinfo=UTC),
        data_version=SNAPSHOT_ID,
        limitations=("Cobertura operacional deve ser confirmada pela SME.",),
    )


def _record(
    school_id: str,
    *,
    inep_id: str | None,
    sme_designation: str | None,
    cre: int,
) -> CanonicalSchoolRecord:
    return CanonicalSchoolRecord(
        identity=SchoolIdentity(
            school_id=school_id,
            nome=f"Escola {school_id}",
            inep_id=inep_id,
            sme_designation=sme_designation,
            cre=cre,
            bairro="Centro",
            dependency="Municipal",
            source_kind=SourceKind.REAL_PUBLIC,
        ),
        coordinates=Coordinates(latitude=-22.9, longitude=-43.2),
    )


class FakeIdentityPort:
    def __init__(self, records: tuple[CanonicalSchoolRecord, ...]) -> None:
        self.records = records

    def validate(self) -> bool:
        return True

    def snapshot_id(self) -> str:
        return SNAPSHOT_ID

    def provenance(self) -> Provenance:
        return _provenance()

    def lookup(
        self, field: IdentityMatchField, value: str
    ) -> CanonicalSchoolRecord | None:
        field_name = {
            IdentityMatchField.SCHOOL_ID: "school_id",
            IdentityMatchField.INEP_ID: "inep_id",
            IdentityMatchField.SME_DESIGNATION: "sme_designation",
        }[field]
        for record in self.records:
            if getattr(record.identity, field_name) == value:
                return record
        return None


def test_lookup_requires_at_least_one_exact_identifier() -> None:
    with pytest.raises(ValidationError, match="at least one school identifier"):
        IdentityLookup()


@pytest.mark.parametrize(
    ("field", "value"),
    [("inep_id", "123"), ("sme_designation", "12345678"), ("school_id", "bad value")],
)
def test_lookup_rejects_malformed_identifiers(field: str, value: str) -> None:
    with pytest.raises(ValidationError):
        IdentityLookup(**{field: value})


def test_canonical_school_record_rejects_school_id_above_api_limit() -> None:
    with pytest.raises(ValidationError):
        _record(
            "A" * 129,
            inep_id="33000001",
            sme_designation="0000001",
            cre=1,
        )


def test_resolves_by_each_exact_identifier_and_reports_auditable_match() -> None:
    record = _record(
        "SME-RIO-000001",
        inep_id="33000001",
        sme_designation="0000001",
        cre=1,
    )
    resolver = SchoolIdentityResolver(FakeIdentityPort((record,)))

    for field, value in (
        (IdentityMatchField.SCHOOL_ID, "SME-RIO-000001"),
        (IdentityMatchField.INEP_ID, "33000001"),
        (IdentityMatchField.SME_DESIGNATION, "0000001"),
    ):
        result = resolver.resolve(IdentityLookup(**{field.value.lower(): value}))
        assert result.status is IdentityResolutionStatus.MATCHED
        assert result.record == record
        assert result.matched_by == (field,)
        assert result.confidence == 1.0
        assert result.provenance.data_version == SNAPSHOT_ID


def test_multiple_identifiers_must_resolve_to_the_same_school() -> None:
    record = _record(
        "SME-RIO-000001",
        inep_id="33000001",
        sme_designation="0000001",
        cre=1,
    )
    resolver = SchoolIdentityResolver(FakeIdentityPort((record,)))

    result = resolver.resolve(
        IdentityLookup(
            school_id="SME-RIO-000001",
            inep_id="33000001",
            sme_designation="0000001",
        )
    )

    assert result.status is IdentityResolutionStatus.MATCHED
    assert result.record == record
    assert result.matched_by == (
        IdentityMatchField.SCHOOL_ID,
        IdentityMatchField.INEP_ID,
        IdentityMatchField.SME_DESIGNATION,
    )


def test_conflicting_identifiers_are_blocked_without_guessing() -> None:
    first = _record("SME-RIO-000001", inep_id="33000001", sme_designation="0000001", cre=1)
    second = _record("SME-RIO-000002", inep_id="33000002", sme_designation="0000002", cre=2)
    resolver = SchoolIdentityResolver(FakeIdentityPort((first, second)))

    result = resolver.resolve(
        IdentityLookup(inep_id="33000001", sme_designation="0000002")
    )

    assert result.status is IdentityResolutionStatus.CONFLICT
    assert result.record is None
    assert result.confidence == 0.0
    assert result.matched_by == (
        IdentityMatchField.INEP_ID,
        IdentityMatchField.SME_DESIGNATION,
    )
    assert "nome" not in " ".join(result.limitations).lower()


def test_unknown_identifier_is_not_found_without_fuzzy_fallback() -> None:
    resolver = SchoolIdentityResolver(FakeIdentityPort(()))

    result = resolver.resolve(IdentityLookup(inep_id="33999999"))

    assert result.status is IdentityResolutionStatus.NOT_FOUND
    assert result.record is None
    assert result.matched_by == ()
    assert result.confidence == 0.0
    assert result.provenance.source_kind is SourceKind.REAL_PUBLIC


def test_resolver_rejects_a_port_claiming_a_different_official_source() -> None:
    class WrongSourcePort(FakeIdentityPort):
        def provenance(self) -> Provenance:
            return self_provenance.model_copy(update={"source_id": "other_registry"})

    self_provenance = _provenance()
    with pytest.raises(IdentityDatasetUnavailableError, match="provenance"):
        SchoolIdentityResolver(WrongSourcePort(()))


def test_resolver_rejects_a_port_returning_a_non_exact_record() -> None:
    record = _record(
        "SME-RIO-000001",
        inep_id="33000001",
        sme_designation="0000001",
        cre=1,
    )

    class DishonestPort(FakeIdentityPort):
        def lookup(
            self, field: IdentityMatchField, value: str
        ) -> CanonicalSchoolRecord | None:
            return record

    resolver = SchoolIdentityResolver(DishonestPort((record,)))
    with pytest.raises(IdentityDatasetUnavailableError, match="failed during lookup"):
        resolver.resolve(IdentityLookup(inep_id="33999999"))


def test_resolver_rejects_a_record_not_classified_as_real_public() -> None:
    official = _record(
        "SME-RIO-000001",
        inep_id="33000001",
        sme_designation="0000001",
        cre=1,
    )
    synthetic = official.model_copy(
        update={
            "identity": official.identity.model_copy(
                update={"source_kind": SourceKind.SYNTHETIC_SCHEMA_FAITHFUL}
            )
        }
    )

    resolver = SchoolIdentityResolver(FakeIdentityPort((synthetic,)))
    with pytest.raises(IdentityDatasetUnavailableError, match="failed during lookup"):
        resolver.resolve(IdentityLookup(inep_id="33000001"))
