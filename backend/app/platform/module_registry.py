from dataclasses import dataclass

from app.contracts.capabilities import Capability, CapabilityStatus
from app.core.errors import DuplicateModuleError, UnknownDisabledModulesError

_DISABLED_LIMITATION = "Módulo desabilitado por configuração."


@dataclass(frozen=True, slots=True)
class ModuleDefinition:
    """Explicit declaration consumed by the application composition root."""

    id: str
    version: str
    capability: Capability

    def __post_init__(self) -> None:
        if self.id != self.capability.id:
            raise ValueError("module id must match capability id")
        if not self.version.strip():
            raise ValueError("module version cannot be blank")


class ModuleRegistry:
    def __init__(
        self,
        modules: list[ModuleDefinition] | tuple[ModuleDefinition, ...],
        disabled_module_ids: set[str] | frozenset[str] = frozenset(),
    ) -> None:
        registered: dict[str, ModuleDefinition] = {}
        for module in modules:
            if module.id in registered:
                raise DuplicateModuleError(module.id)
            registered[module.id] = module
        unknown_disabled_ids = frozenset(disabled_module_ids).difference(registered)
        if unknown_disabled_ids:
            raise UnknownDisabledModulesError()
        self._modules = registered
        self._disabled_module_ids = frozenset(disabled_module_ids)

    @property
    def enabled_modules(self) -> tuple[ModuleDefinition, ...]:
        return tuple(
            module
            for module_id, module in sorted(self._modules.items())
            if module_id not in self._disabled_module_ids
        )

    @property
    def capabilities(self) -> tuple[Capability, ...]:
        capabilities: list[Capability] = []
        for module_id, module in sorted(self._modules.items()):
            capability = module.capability
            if module_id in self._disabled_module_ids:
                limitations = list(capability.limitations)
                if _DISABLED_LIMITATION not in limitations:
                    limitations.append(_DISABLED_LIMITATION)
                capability = capability.model_copy(
                    update={
                        "status": CapabilityStatus.DISABLED,
                        "limitations": tuple(limitations),
                    }
                )
            capabilities.append(capability)
        return tuple(capabilities)
