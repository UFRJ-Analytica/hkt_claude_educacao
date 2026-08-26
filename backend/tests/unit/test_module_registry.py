from datetime import UTC, datetime

import pytest
from pydantic import ValidationError

from app.contracts.capabilities import Capability, CapabilityStatus
from app.contracts.provenance import SourceKind
from app.core.errors import DuplicateModuleError, UnknownDisabledModulesError
from app.platform.module_registry import ModuleDefinition, ModuleRegistry


def module(
    module_id: str,
    status: CapabilityStatus = CapabilityStatus.AVAILABLE,
) -> ModuleDefinition:
    limitations = [] if status is CapabilityStatus.AVAILABLE else ["Limitação declarada."]
    return ModuleDefinition(
        id=module_id,
        version="1.0.0",
        capability=Capability(
            id=module_id,
            label=module_id.title(),
            description=f"Módulo {module_id}.",
            status=status,
            source_status=SourceKind.REAL_PUBLIC,
            screens=["network-overview"],
            agents=[],
            limitations=limitations,
            updated_at=datetime(2026, 8, 26, tzinfo=UTC),
        ),
    )


def test_registry_rejects_duplicate_module_id() -> None:
    with pytest.raises(DuplicateModuleError, match="network"):
        ModuleRegistry([module("network"), module("network")])


def test_registry_disables_module_by_explicit_configuration() -> None:
    registry = ModuleRegistry([module("network")], disabled_module_ids={"network"})

    assert registry.enabled_modules == ()
    capability = registry.capabilities[0]
    assert capability.status is CapabilityStatus.DISABLED
    assert capability.limitations


def test_registry_preserves_explicit_composition_order_independently() -> None:
    registry = ModuleRegistry([module("schools"), module("network")])

    assert [item.id for item in registry.capabilities] == ["network", "schools"]


def test_registry_rejects_unknown_disabled_module_with_sanitized_typed_error() -> None:
    with pytest.raises(UnknownDisabledModulesError) as captured:
        ModuleRegistry([module("network")], disabled_module_ids={"netwrok"})

    assert captured.value.code == "unknown_disabled_modules"
    assert "netwrok" not in str(captured.value)


def test_registry_contracts_cannot_be_mutated() -> None:
    registry = ModuleRegistry([module("network")])
    exposed = registry.capabilities[0]

    with pytest.raises((AttributeError, TypeError, ValidationError)):
        exposed.status = CapabilityStatus.DEGRADED  # type: ignore[misc]
    with pytest.raises((AttributeError, TypeError)):
        exposed.screens.append("injected")  # type: ignore[attr-defined]

    assert registry.capabilities[0].status is CapabilityStatus.AVAILABLE
    assert registry.capabilities[0].screens == ("network-overview",)
