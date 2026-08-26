from app.contracts.capabilities import Capability
from app.platform.module_registry import ModuleRegistry


class CapabilityService:
    def __init__(self, registry: ModuleRegistry) -> None:
        self._registry = registry

    def list_capabilities(self) -> list[Capability]:
        return list(self._registry.capabilities)
