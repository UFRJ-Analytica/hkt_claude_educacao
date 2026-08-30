import logging
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

logger = logging.getLogger("app.composition")

# Revision instant of the static declarations below.
# Change only when those declarations are reviewed.
CAPABILITY_DECLARATION_REVISED_AT = datetime(2026, 8, 30, tzinfo=UTC)


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


_PENDING = ["Fonte da SME ainda não está conectada a esta capacidade."]


def initial_modules() -> tuple[ModuleDefinition, ...]:
    """The explicit composition list; modules are never discovered dynamically.

    Os módulos acompanham os três eixos do desafio da Inscrição Creche. Nenhum
    declara AVAILABLE antes de ler o dado real do `dadoscreche` — a capacidade é
    a promessa que a interface pode cobrar, não uma intenção.
    """
    return (
        _module(
            "unidades",
            "Unidades de creche",
            "Cadastro das creches e EDIs com território, grupamento e turno.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            _PENDING.copy(),
            ["inscricao-unidades"],
        ),
        _module(
            "inscricao",
            "Inscrição",
            "Fluxo da família: escolha de unidades por território e preferência.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            _PENDING.copy(),
            ["inscricao"],
        ),
        _module(
            "fila",
            "Fila e classificação",
            "Fila por unidade, grupamento e turno, com a régua de pontuação do processo.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            _PENDING.copy(),
            ["gestor-fila"],
        ),
        _module(
            "convocacao",
            "Convocação",
            "Chamadas em aberto, prazo de confirmação e rastro de contato.",
            CapabilityStatus.SCHEMA_ONLY,
            SourceKind.KNOWN_UNAVAILABLE,
            _PENDING.copy(),
            ["gestor-convocacao"],
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
        title="Vaga Certa API",
        description=(
            "API da Inscrição Creche: território, fila e convocação, "
            "com proveniência declarada."
        ),
        version=resolved_settings.version,
    )
    app.state.settings = resolved_settings
    app.state.module_registry = registry

    if resolved_settings.cors_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=tuple(resolved_settings.cors_origins),
            allow_credentials=False,
            allow_methods=["GET", "POST", "OPTIONS"],
            allow_headers=["*"],
        )

    register_error_handlers(app)
    app.include_router(build_health_router(resolved_settings))
    app.include_router(build_v1_router(capability_service))
    return app
