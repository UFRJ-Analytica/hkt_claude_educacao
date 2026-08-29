import logging
from datetime import UTC, datetime
from pathlib import Path

import duckdb
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.analytics.service import AnalyticsService
from app.api.v1.health import build_health_router
from app.api.v1.router import build_v1_router
from app.contracts.capabilities import Capability, CapabilityStatus
from app.contracts.provenance import SourceKind
from app.core.config import Settings
from app.core.errors import register_error_handlers
from app.data_access.duckdb_adapter import DuckDBDataAccess
from app.data_access.ports import DataAccessPort, SchoolIdentityPort
from app.data_access.school_identity_adapter import CuratedSchoolIdentityAdapter
from app.intake.middleware import IntakeBodyLimitMiddleware
from app.intake.service import IntakeRepository, IntakeService
from app.intake.sqlite_repository import SQLiteIntakeRepository
from app.mapping.join_service import JoinService
from app.mapping.service import MappingService
from app.platform.capability_service import CapabilityService
from app.platform.module_registry import ModuleDefinition, ModuleRegistry
from app.profiling.schema_profiler import ProfileLimits
from app.schools.identity_service import (
    IdentityDatasetUnavailableError,
    SchoolIdentityResolver,
)
from app.schools.service import SchoolMapService

logger = logging.getLogger("app.composition")

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


def initial_modules(
    mock_data_enabled: bool = False,
    *,
    school_data_available: bool | None = None,
    analytics_data_available: bool | None = None,
    identity_data_available: bool = False,
    identity_limitations: tuple[str, ...] = (),
) -> tuple[ModuleDefinition, ...]:
    """The explicit composition list; modules are never discovered dynamically."""
    schema_limitation = ["Schema conhecido; nenhuma linha de dados está disponível."]
    school_mock_available = mock_data_enabled and school_data_available is not False
    analytics_mock_available = mock_data_enabled and analytics_data_available is not False
    school_limitation = (
        ["Opera somente com dados sintéticos fiéis ao schema."]
        if school_mock_available
        else ["Dataset governado de escolas indisponível para consulta."]
        if mock_data_enabled and school_data_available is False
        else schema_limitation.copy()
    )
    return (
        _module(
            "network",
            "Visão da rede",
            "Síntese dos principais sinais da rede municipal.",
            CapabilityStatus.MOCK_ONLY
            if analytics_mock_available
            else CapabilityStatus.SCHEMA_ONLY,
            SourceKind.SYNTHETIC_SCHEMA_FAITHFUL
            if analytics_mock_available
            else SourceKind.KNOWN_UNAVAILABLE,
            ["Opera somente com dados sintéticos fiéis ao schema."]
            if analytics_mock_available
            else schema_limitation.copy(),
            ["network-overview"],
        ),
        _module(
            "schools",
            "Escolas",
            "Visão agregada e comparável das unidades escolares.",
            CapabilityStatus.MOCK_ONLY if school_mock_available else CapabilityStatus.SCHEMA_ONLY,
            SourceKind.SYNTHETIC_SCHEMA_FAITHFUL
            if school_mock_available
            else SourceKind.KNOWN_UNAVAILABLE,
            school_limitation,
            ["schools"],
        ),
        _module(
            "school-identity",
            "Identidade escolar oficial",
            "Resolução auditável por ID interno, INEP ou designação SME.",
            CapabilityStatus.AVAILABLE if identity_data_available else CapabilityStatus.SCHEMA_ONLY,
            SourceKind.REAL_PUBLIC if identity_data_available else SourceKind.KNOWN_UNAVAILABLE,
            list(identity_limitations)
            if identity_data_available
            else ["Release curada do cadastro oficial ainda não está conectada."],
            [],
        ),
        _module(
            "learning",
            "Aprendizagem",
            "Indicadores de avaliações e aprendizagem.",
            CapabilityStatus.MOCK_ONLY if mock_data_enabled else CapabilityStatus.SCHEMA_ONLY,
            SourceKind.SYNTHETIC_SCHEMA_FAITHFUL
            if mock_data_enabled
            else SourceKind.KNOWN_UNAVAILABLE,
            ["Opera somente com dados sintéticos agregados."]
            if mock_data_enabled
            else schema_limitation.copy(),
            ["learning"],
        ),
        _module(
            "attendance",
            "Frequência",
            "Indicadores de frequência e fluxo escolar.",
            CapabilityStatus.MOCK_ONLY if mock_data_enabled else CapabilityStatus.SCHEMA_ONLY,
            SourceKind.SYNTHETIC_SCHEMA_FAITHFUL
            if mock_data_enabled
            else SourceKind.KNOWN_UNAVAILABLE,
            ["Opera somente com dados sintéticos agregados."]
            if mock_data_enabled
            else schema_limitation.copy(),
            ["attendance"],
        ),
        _module(
            "capacity",
            "Capacidade",
            "Indicadores de vagas, salas e ocupação.",
            CapabilityStatus.MOCK_ONLY if mock_data_enabled else CapabilityStatus.SCHEMA_ONLY,
            SourceKind.SYNTHETIC_INFERRED if mock_data_enabled else SourceKind.KNOWN_UNAVAILABLE,
            ["Opera somente com dados sintéticos de schema inferido."]
            if mock_data_enabled
            else schema_limitation.copy(),
            ["capacity"],
        ),
        _module(
            "staffing",
            "Pessoal",
            "Indicadores de carência e alocação docente.",
            CapabilityStatus.MOCK_ONLY if mock_data_enabled else CapabilityStatus.SCHEMA_ONLY,
            SourceKind.SYNTHETIC_INFERRED if mock_data_enabled else SourceKind.KNOWN_UNAVAILABLE,
            ["Opera somente com dados sintéticos de schema inferido."]
            if mock_data_enabled
            else schema_limitation.copy(),
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


def _school_map_service(
    settings: Settings,
    schools_enabled: bool,
    data_access: DataAccessPort | None,
) -> SchoolMapService | None:
    if not settings.mock_data_enabled or not schools_enabled:
        return None
    try:
        access = data_access or DuckDBDataAccess(Path(__file__).parents[2] / "data/generated")
        if not access.validate():
            return None
        return SchoolMapService(access)
    except (ValueError, OSError, RuntimeError, duckdb.Error) as error:
        logger.warning(
            "school_map_dataset_unavailable",
            extra={"exception_type": type(error).__name__},
        )
        return None


def _school_identity_resolver(
    identity_port: SchoolIdentityPort | None,
) -> SchoolIdentityResolver | None:
    try:
        repository = identity_port or CuratedSchoolIdentityAdapter()
        return SchoolIdentityResolver(repository)
    except (
        IdentityDatasetUnavailableError,
        ValueError,
        OSError,
        RuntimeError,
        duckdb.Error,
    ) as error:
        logger.warning(
            "school_identity_dataset_unavailable",
            extra={"exception_type": type(error).__name__},
        )
        return None


def _analytics_service(
    settings: Settings,
    enabled: bool,
    data_access: DataAccessPort | None,
) -> AnalyticsService | None:
    if not settings.mock_data_enabled or not enabled:
        return None
    try:
        access = data_access or DuckDBDataAccess(Path(__file__).parents[2] / "data/generated")
        if not access.validate():
            return None
        if not callable(getattr(access, "analytics_snapshot", None)) or not callable(
            getattr(access, "analytics_quality", None)
        ):
            return None
        return AnalyticsService(access)
    except (ValueError, OSError, RuntimeError, duckdb.Error) as error:
        logger.warning(
            "analytics_dataset_unavailable",
            extra={"exception_type": type(error).__name__},
        )
        return None


def create_app(
    settings: Settings | None = None,
    *,
    data_access: DataAccessPort | None = None,
    identity_port: SchoolIdentityPort | None = None,
    intake_repository: IntakeRepository | None = None,
) -> FastAPI:
    resolved_settings = settings or Settings()
    schools_enabled = "schools" not in resolved_settings.disabled_modules
    analytics_enabled = "network" not in resolved_settings.disabled_modules and schools_enabled
    identity_enabled = "school-identity" not in resolved_settings.disabled_modules
    school_map_service = _school_map_service(resolved_settings, schools_enabled, data_access)
    analytics_service = _analytics_service(resolved_settings, analytics_enabled, data_access)
    identity_resolver = _school_identity_resolver(identity_port) if identity_enabled else None
    registry = ModuleRegistry(
        initial_modules(
            resolved_settings.mock_data_enabled,
            school_data_available=school_map_service is not None,
            analytics_data_available=analytics_service is not None,
            identity_data_available=identity_resolver is not None,
            identity_limitations=(
                identity_resolver.provenance().limitations if identity_resolver is not None else ()
            ),
        ),
        disabled_module_ids=resolved_settings.disabled_modules,
    )
    capability_service = CapabilityService(registry)
    catalog_path = resolved_settings.intake_catalog_path
    if resolved_settings.environment == "test" and catalog_path == Path(
        ".control/intake_catalog.sqlite3"
    ):
        # Preserve persistence across app restarts in one test without leaking catalog
        # state between independently configured temporary intake roots.
        catalog_path = (
            resolved_settings.intake_root.parent
            / f".{resolved_settings.intake_root.name}.intake_catalog.sqlite3"
        )
    repository = intake_repository or SQLiteIntakeRepository(
        catalog_path,
        resolved_settings.intake_max_descriptors,
        resolved_settings.intake_max_joins_per_dataset,
        resolved_settings.intake_max_audits_per_join,
    )
    intake_service = IntakeService(
        resolved_settings.intake_root,
        repository,
        ProfileLimits(max_bytes=resolved_settings.intake_max_bytes),
    )
    mapping_service = MappingService(repository)
    join_service = JoinService(repository, mapping_service=mapping_service)

    app = FastAPI(
        title="Pulso da Rede API",
        description="API modular e auditável para gestão da rede municipal de educação.",
        version=resolved_settings.version,
    )
    app.state.settings = resolved_settings
    app.state.module_registry = registry

    app.add_middleware(IntakeBodyLimitMiddleware, max_bytes=resolved_settings.intake_max_bytes)

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
    app.include_router(
        build_v1_router(
            capability_service,
            school_map_service,
            identity_resolver,
            intake_service,
            mapping_service,
            join_service,
            analytics_service,
        )
    )
    return app
