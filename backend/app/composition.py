from datetime import UTC, datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.health import build_health_router
from app.api.v1.router import build_v1_router
from app.contracts.capabilities import Capability, CapabilityStatus
from app.contracts.provenance import SourceKind
from app.core.config import Settings
from app.core.errors import register_error_handlers
from app.platform.capability_service import CapabilityService
from app.platform.module_registry import ModuleDefinition, ModuleRegistry

# Revision instant of the static declarations below.
# Change only when those declarations are reviewed.
CAPABILITY_DECLARATION_REVISED_AT = datetime(2026, 8, 26, tzinfo=UTC)


def _module(
    module_id: str,
    label: str,
    description: str,
    status: CapabilityStatus,
    source_status: SourceKind,
    limitations: list[str],
    screens: list[str],
) -> ModuleDefinition:
    return ModuleDefinition(
        id=module_id,
        version="1.0.0",
        capability=Capability(
            id=module_id,
            label=label,
            description=description,
            status=status,
            source_status=source_status,
            screens=screens,
            agents=[],
            limitations=limitations,
            updated_at=CAPABILITY_DECLARATION_REVISED_AT,
        ),
    )


def initial_modules() -> tuple[ModuleDefinition, ...]:
    """The explicit composition list; modules are never discovered dynamically."""
    schema_limitation = ["Schema conhecido; nenhuma linha de dados está disponível."]
    return (
        _module(
            "network",
            "Visão da rede",
            "Síntese dos principais sinais da rede municipal.",
            CapabilityStatus.MOCK_ONLY,
            SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
            ["Opera somente com dados sintéticos fiéis ao schema."],
            ["network-overview"],
        ),
        _module(
            "schools",
            "Escolas",
            "Visão agregada e comparável das unidades escolares.",
            CapabilityStatus.MOCK_ONLY,
            SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
            ["Opera somente com dados sintéticos fiéis ao schema."],
            ["schools"],
        ),
        _module(
            "learning",
            "Aprendizagem",
            "Indicadores de avaliações e aprendizagem.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            schema_limitation.copy(),
            ["learning"],
        ),
        _module(
            "attendance",
            "Frequência",
            "Indicadores de frequência e fluxo escolar.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            schema_limitation.copy(),
            ["attendance"],
        ),
        _module(
            "capacity",
            "Capacidade",
            "Indicadores de vagas, salas e ocupação.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            schema_limitation.copy(),
            ["capacity"],
        ),
        _module(
            "staffing",
            "Pessoal",
            "Indicadores de carência e alocação docente.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            schema_limitation.copy(),
            ["staffing"],
        ),
        _module(
            "equity",
            "Equidade",
            "Recortes agregados de equidade.",
            CapabilityStatus.UNAVAILABLE,
            SourceKind.KNOWN_UNAVAILABLE,
            ["Atributos, cobertura e base legal ainda não foram confirmados."],
            ["equity"],
        ),
        _module(
            "interventions",
            "Intervenções",
            "Programas, ações e intervenções da rede.",
            CapabilityStatus.UNAVAILABLE,
            SourceKind.KNOWN_UNAVAILABLE,
            ["Fonte e contrato de dados ainda não foram confirmados."],
            ["interventions"],
        ),
    )


def create_app(settings: Settings | None = None) -> FastAPI:
    resolved_settings = settings or Settings()
    registry = ModuleRegistry(
        initial_modules(),
        disabled_module_ids=resolved_settings.disabled_modules,
    )
    capability_service = CapabilityService(registry)

    app = FastAPI(
        title="Pulso da Rede API",
        description="API modular e auditável para gestão da rede municipal de educação.",
        version=resolved_settings.version,
    )
    app.state.settings = resolved_settings
    app.state.module_registry = registry

    if resolved_settings.cors_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=tuple(resolved_settings.cors_origins),
            allow_credentials=False,
            allow_methods=["GET", "OPTIONS"],
            allow_headers=["*"],
        )

    register_error_handlers(app)
    app.include_router(build_health_router(resolved_settings))
    app.include_router(build_v1_router(capability_service))
    return app
