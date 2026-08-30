"""Exact school identity resolution over a curated, governed registry port."""

from collections.abc import Iterable
from typing import Any

from app.contracts.provenance import Provenance, SourceKind
from app.data_access.inep_census_adapter import FLAG_FIELDS, InepCensusAdapter
from app.data_access.ports import SchoolIdentityPort
from app.schools.contracts import (
    IndicatorId,
    MapQuery,
    SchoolIdentity,
    SchoolMapCollection,
    SchoolProfile,
)
from app.schools.identity_contracts import (
    CanonicalSchoolRecord,
    CensusRelease,
    IdentityLookup,
    IdentityMatchField,
    IdentityResolutionStatus,
    OfficialSchoolList,
    OfficialSchoolListCoverage,
    OfficialSchoolListQuery,
    SchoolCensus,
    SchoolContext,
    SchoolContextMapLinks,
    SchoolIdentityResolution,
    SchoolMetricComparison,
    SchoolMetricCoverage,
    SchoolMetricCoverageStatus,
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


def _census_block(record: dict[str, object], year: int) -> "SchoolCensus | None":
    """Traduz a linha crua do Censo para o contrato do produto.

    Os nomes do INEP (`QT_MAT_FUND_AF_6`) não sobem para a interface: eles
    descrevem o arquivo, não a decisão. O contrato usa nomes do domínio e
    carrega o ano de referência para que nenhum número real apareça sem régua.
    """
    inep_id = record.get("inep_id")
    if not isinstance(inep_id, str) or len(inep_id) != 8:
        return None

    def count(field: str) -> int | None:
        value = record.get(field)
        return int(value) if isinstance(value, int | float) else None

    grades = tuple(
        count(field)
        for field in (
            "QT_MAT_FUND_AI_1", "QT_MAT_FUND_AI_2", "QT_MAT_FUND_AI_3",
            "QT_MAT_FUND_AI_4", "QT_MAT_FUND_AI_5",
            "QT_MAT_FUND_AF_6", "QT_MAT_FUND_AF_7", "QT_MAT_FUND_AF_8", "QT_MAT_FUND_AF_9",
        )
    )
    devices = sum(
        count(field) or 0
        for field in ("QT_DESKTOP_ALUNO", "QT_COMP_PORTATIL_ALUNO", "QT_TABLET_ALUNO")
    )
    infrastructure = {
        field: (bool(value) if isinstance(value := record.get(field), bool | int) else None)
        for field in FLAG_FIELDS
    }
    return SchoolCensus(
        inep_id=inep_id,
        inep_name=str(record.get("inep_name") or inep_id),
        reference_year=year,
        enrolment_total=count("QT_MAT_BAS"),
        enrolment_infant=count("QT_MAT_INF"),
        enrolment_fundamental=count("QT_MAT_FUND"),
        enrolment_fundamental_early=count("QT_MAT_FUND_AI"),
        enrolment_fundamental_late=count("QT_MAT_FUND_AF"),
        enrolment_special=count("QT_MAT_ESP"),
        enrolment_by_grade=grades,
        classes_total=count("QT_TUR_BAS"),
        classes_fundamental=count("QT_TUR_FUND"),
        teachers_total=count("QT_DOC_BAS"),
        teachers_fundamental=count("QT_DOC_FUND"),
        rooms_used=count("QT_SALAS_UTILIZADAS"),
        rooms_climatised=count("QT_SALAS_UTILIZA_CLIMATIZADAS"),
        rooms_accessible=count("QT_SALAS_UTILIZADAS_ACESSIVEIS"),
        student_devices=devices,
        infrastructure=infrastructure,
    )


class SchoolIdentityResolver:
    def __init__(
        self, repository: SchoolIdentityPort, census: InepCensusAdapter | None = None
    ) -> None:
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
        # O Censo é opcional: sem release publicada o produto continua de pé,
        # só que sem os campos reais. Falta de dado real nunca derruba a tela.
        self._census = census if census is not None and census.available() else None

    def provenance(self) -> Provenance:
        return self._provenance

    def resolve(self, lookup: IdentityLookup) -> SchoolIdentityResolution:
        try:
            return self._resolve(lookup)
        except (ValueError, OSError, RuntimeError, KeyError) as error:
            raise IdentityDatasetUnavailableError(
                "official identity registry failed during lookup"
            ) from error

    def list_official_schools(self, query: OfficialSchoolListQuery) -> OfficialSchoolList:
        try:
            records, total, with_coordinates, available_cres = (
                self._repository.list_official_schools(query)
            )
        except (ValueError, OSError, RuntimeError, KeyError) as error:
            raise IdentityDatasetUnavailableError(
                "official identity registry failed during list query"
            ) from error
        enriched, matched = self._with_census(records)
        return OfficialSchoolList(
            records=enriched,
            census_release=self._census_release(matched),
            coverage=OfficialSchoolListCoverage(
                total=total,
                with_coordinates=with_coordinates,
                returned=len(records),
            ),
            available_cres=available_cres,
            snapshot_id=self._repository.snapshot_id(),
            generated=self._provenance.generated,
            provenance=self._provenance,
            limitations=self._provenance.limitations,
        )

    def _with_census(
        self, records: tuple[CanonicalSchoolRecord, ...]
    ) -> tuple[tuple[CanonicalSchoolRecord, ...], int]:
        """Junta o Censo pela designação SME. Chave exata, nunca por nome."""
        if self._census is None:
            return records, 0
        year = self._census.reference_year
        out: list[CanonicalSchoolRecord] = []
        matched = 0
        for record in records:
            raw = self._census.get(record.identity.sme_designation)
            block = _census_block(raw, year) if raw is not None else None
            if block is not None:
                matched += 1
                out.append(record.model_copy(update={"census": block}))
            else:
                out.append(record)
        return tuple(out), matched

    def _census_release(self, matched: int) -> "CensusRelease | None":
        if self._census is None:
            return None
        return CensusRelease(
            snapshot_id=self._census.snapshot_id,
            reference_year=self._census.reference_year,
            matched=matched,
            source_urls=self._census.source_urls,
            limitations=self._census.limitations,
        )

    def get_context(
        self, school_id: str, school_map_service: Any | None = None
    ) -> SchoolContext:
        try:
            record = self._repository.lookup(IdentityMatchField.SCHOOL_ID, school_id)
            if record is None:
                return self._not_found_context(school_id)
            record = self._with_census((record,))[0][0]
            profile = self._optional_profile(school_map_service, school_id)
            comparisons = self._comparisons(school_map_service, profile, record)
        except (ValueError, OSError, RuntimeError, KeyError) as error:
            raise IdentityDatasetUnavailableError(
                "official identity registry failed during context query"
            ) from error
        return self._context(record, profile, comparisons)

    def _not_found_context(self, school_id: str) -> SchoolContext:
        return SchoolContext(
            official_record=CanonicalSchoolRecord(
                identity=self._missing_identity(school_id),
                coordinates=None,
            ),
            map_links=SchoolContextMapLinks(
                google_maps_url="https://www.google.com/maps/search/?api=1&query=Rio%20de%20Janeiro",
                directions_url="https://www.google.com/maps/dir/?api=1&destination=Rio%20de%20Janeiro",
            ),
            metric_coverage=SchoolMetricCoverage(
                status=SchoolMetricCoverageStatus.IDENTITY_ONLY,
                message="A escola não foi encontrada no cadastro oficial carregado.",
            ),
            synthetic_profile=None,
            comparisons=(),
            provenance=self._provenance,
            limitations=(
                "Identidade escolar não encontrada na release oficial carregada; "
                "nenhum indicador foi exposto.",
            ),
        )

    def _context(
        self,
        record: CanonicalSchoolRecord,
        profile: SchoolProfile | None,
        comparisons: tuple[SchoolMetricComparison, ...],
    ) -> SchoolContext:
        if profile is None:
            coverage = SchoolMetricCoverage(
                status=SchoolMetricCoverageStatus.IDENTITY_ONLY,
                message=(
                    "Identidade e localização são reais; indicadores educacionais "
                    "ainda não estão carregados para esta unidade."
                ),
            )
            limitations = (
                "Identidade, CRE, tipo e coordenadas vêm da fonte pública SME/Data.Rio.",
                "Indicadores, notas, evasão e histórico requerem release oficial "
                "cruzada por CO_ENTIDADE/INEP; não foi aplicado match fuzzy.",
            )
        else:
            coverage = SchoolMetricCoverage(
                status=SchoolMetricCoverageStatus.SYNTHETIC_SNAPSHOT_MATCHED,
                message=(
                    "Há métricas de demonstração para este identificador no snapshot "
                    "sintético; não interpretar como desempenho real."
                ),
                snapshot_id=profile.snapshot_id,
            )
            limitations = (
                "Identidade vem da fonte pública SME/Data.Rio.",
                "Comparações usam snapshot sintético de demonstração até existir "
                "release real INEP/SME por escola.",
            )
        return SchoolContext(
            official_record=record,
            map_links=self._map_links(record),
            metric_coverage=coverage,
            synthetic_profile=profile,
            comparisons=comparisons,
            provenance=self._provenance,
            limitations=limitations,
        )

    @staticmethod
    def _missing_identity(school_id: str) -> SchoolIdentity:
        return SchoolIdentity(
            school_id=school_id,
            nome="Escola não encontrada",
            inep_id=None,
            sme_designation="0000000",
            cre=1,
            bairro=None,
            dependency="Municipal",
            school_type=None,
            source_kind=SourceKind.REAL_PUBLIC,
            limitations=("Registro sentinela para erro governado de contexto.",),
        )

    @staticmethod
    def _map_links(record: CanonicalSchoolRecord) -> SchoolContextMapLinks:
        if record.coordinates is None:
            query = record.identity.nome.replace(" ", "%20")
        else:
            query = f"{record.coordinates.latitude},{record.coordinates.longitude}"
        return SchoolContextMapLinks(
            google_maps_url=f"https://www.google.com/maps/search/?api=1&query={query}",
            directions_url=f"https://www.google.com/maps/dir/?api=1&destination={query}",
        )

    @staticmethod
    def _optional_profile(service: Any | None, school_id: str) -> SchoolProfile | None:
        if service is None or not hasattr(service, "get_profile"):
            return None
        profile = service.get_profile(school_id)
        return profile if isinstance(profile, SchoolProfile) else None

    @staticmethod
    def _average(values: Iterable[float]) -> float | None:
        collected = tuple(values)
        if not collected:
            return None
        return sum(collected) / len(collected)

    @classmethod
    def _indicator_average(
        cls, collection: SchoolMapCollection, indicator: IndicatorId
    ) -> float | None:
        return cls._average(
            metric.value
            for feature in collection.features
            if (metric := feature.properties.metrics[indicator]).value is not None
        )

    def _comparisons(
        self,
        service: Any | None,
        profile: SchoolProfile | None,
        record: CanonicalSchoolRecord,
    ) -> tuple[SchoolMetricComparison, ...]:
        if profile is None or service is None or not hasattr(service, "get_map"):
            return ()
        cre_collection = service.get_map(MapQuery(cre=record.identity.cre, limit=5000))
        network_collection = service.get_map(MapQuery(limit=5000))
        if not isinstance(cre_collection, SchoolMapCollection) or not isinstance(
            network_collection, SchoolMapCollection
        ):
            return ()
        comparisons: list[SchoolMetricComparison] = []
        for indicator, metric in profile.metrics.items():
            if metric.value is None:
                continue
            cre_average = self._indicator_average(cre_collection, indicator)
            network_average = self._indicator_average(network_collection, indicator)
            comparisons.append(
                SchoolMetricComparison(
                    indicator_id=indicator,
                    school_value=metric.value,
                    cre_average=cre_average,
                    network_average=network_average,
                    delta_vs_cre=None if cre_average is None else metric.value - cre_average,
                    delta_vs_network=None
                    if network_average is None
                    else metric.value - network_average,
                    period=metric.period.isoformat() if metric.period is not None else None,
                    evidence_id=metric.evidence_id,
                    source_kind=metric.source_kind,
                )
            )
        return tuple(comparisons)

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
