from datetime import UTC, datetime, timedelta, timezone

import pytest
from pydantic import ValidationError

from app.contracts.capabilities import Capability, CapabilityStatus
from app.contracts.provenance import Premise, PremiseStatus, Provenance, SourceKind


def capability(**overrides: object) -> Capability:
    data: dict[str, object] = {
        "id": "network",
        "label": "Rede",
        "description": "Visão sintética da rede.",
        "status": CapabilityStatus.MOCK_ONLY,
        "source_status": SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "screens": ["network-overview"],
        "agents": [],
        "limitations": ["Dados exclusivamente sintéticos."],
        "updated_at": datetime(2026, 8, 26, tzinfo=UTC),
    }
    data.update(overrides)
    return Capability.model_validate(data)


def test_contract_enums_are_governed_exactly() -> None:
    assert {item.value for item in SourceKind} == {
        "REAL_PUBLIC",
        "SYNTHETIC_SCHEMA_FAITHFUL",
        "SYNTHETIC_INFERRED",
        "KNOWN_UNAVAILABLE",
    }
    assert {item.value for item in PremiseStatus} == {
        "CONFIRMADA",
        "METADADO_CONFIRMADO",
        "INFERIDA",
        "ABERTA",
        "INVALIDADA",
    }
    assert {item.value for item in CapabilityStatus} == {
        "AVAILABLE",
        "MOCK_ONLY",
        "SCHEMA_ONLY",
        "UNAVAILABLE",
        "DISABLED",
        "DEGRADED",
    }


def test_capability_accepts_slug_and_declared_limitation() -> None:
    assert capability(id="platform.data-quality").id == "platform.data-quality"


@pytest.mark.parametrize("invalid_id", ["Network", "network pulse", "network_", ".network"])
def test_capability_rejects_non_slug_id(invalid_id: str) -> None:
    with pytest.raises(ValidationError):
        capability(id=invalid_id)


@pytest.mark.parametrize(
    "status",
    [
        CapabilityStatus.MOCK_ONLY,
        CapabilityStatus.SCHEMA_ONLY,
        CapabilityStatus.UNAVAILABLE,
        CapabilityStatus.DISABLED,
        CapabilityStatus.DEGRADED,
    ],
)
def test_non_available_capability_requires_limitation(status: CapabilityStatus) -> None:
    with pytest.raises(ValidationError, match="limitation"):
        capability(status=status, limitations=[])


def test_available_capability_may_have_no_limitation() -> None:
    assert capability(status=CapabilityStatus.AVAILABLE, limitations=[]).limitations == ()


def test_contracts_are_deeply_immutable_and_serialize_tuples_as_json_arrays() -> None:
    screens = [" network-overview "]
    item = capability(screens=screens)
    screens.append("injected")

    assert item.screens == ("network-overview",)
    assert item.model_dump(mode="json")["screens"] == ["network-overview"]
    with pytest.raises((AttributeError, TypeError, ValidationError)):
        item.status = CapabilityStatus.AVAILABLE  # type: ignore[misc]
    with pytest.raises((AttributeError, TypeError)):
        item.screens.append("injected")  # type: ignore[attr-defined]


@pytest.mark.parametrize("field", ["label", "description"])
def test_capability_strips_text_and_rejects_blank(field: str) -> None:
    assert getattr(capability(**{field: " valid "}), field) == "valid"
    with pytest.raises(ValidationError):
        capability(**{field: "  "})


def test_provenance_and_premise_strip_text_lists_and_are_frozen() -> None:
    provenance = Provenance(
        source_id=" source ",
        source_kind=SourceKind.REAL_PUBLIC,
        generated=False,
        as_of=datetime(2026, 8, 26, 9, tzinfo=UTC),
        limitations=[" limitation "],
    )
    premise = Premise(
        id="premise.one",
        statement=" statement ",
        status=PremiseStatus.CONFIRMADA,
        updated_at=datetime(2026, 8, 26, 9, tzinfo=UTC),
    )

    assert provenance.source_id == "source"
    assert provenance.limitations == ("limitation",)
    assert premise.statement == "statement"
    with pytest.raises((AttributeError, TypeError, ValidationError)):
        provenance.source_id = "changed"  # type: ignore[misc]


def test_provenance_and_premise_reject_blank_required_text_and_list_items() -> None:
    with pytest.raises(ValidationError):
        Provenance(
            source_id=" ",
            source_kind=SourceKind.REAL_PUBLIC,
            generated=False,
        )
    with pytest.raises(ValidationError):
        Provenance(
            source_id="source",
            source_kind=SourceKind.REAL_PUBLIC,
            generated=False,
            limitations=[" "],
        )
    with pytest.raises(ValidationError):
        Premise(
            id="premise.one",
            statement=" ",
            status=PremiseStatus.ABERTA,
            updated_at=datetime(2026, 8, 26, tzinfo=UTC),
        )


def test_contract_datetimes_must_be_timezone_aware() -> None:
    with pytest.raises(ValidationError, match="timezone"):
        capability(updated_at=datetime(2026, 8, 26))
    with pytest.raises(ValidationError, match="timezone"):
        Provenance(
            source_id="source",
            source_kind=SourceKind.REAL_PUBLIC,
            generated=False,
            as_of=datetime(2026, 8, 26),
        )
    with pytest.raises(ValidationError, match="timezone"):
        Premise(
            id="premise.one",
            statement="statement",
            status=PremiseStatus.ABERTA,
            updated_at=datetime(2026, 8, 26),
        )


def test_contract_datetimes_are_normalized_to_utc() -> None:
    value = datetime(2026, 8, 26, 6, tzinfo=timezone(timedelta(hours=-3)))
    assert capability(updated_at=value).updated_at == datetime(2026, 8, 26, 9, tzinfo=UTC)
