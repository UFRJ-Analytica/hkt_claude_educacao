"""Deterministic product/data strategy for unknown SME hackathon datasets."""

from pathlib import Path

from app.contracts.provenance import SourceKind
from app.data_access.duckdb_adapter import DuckDBDataAccess
from app.strategy.contracts import (
    AdaptationDomainV1,
    AIUsageStepV1,
    CriticalGapV1,
    CurrentRuntimeV1,
    RealSourceCandidateV1,
    StrategyDataPlanV1,
)

_SYNTHETIC_ASSETS = (
    "schools.parquet",
    "attendance_facts.parquet",
    "assessment_facts.parquet",
    "capacity_facts.parquet",
    "teacher_shortage_facts.parquet",
    "quality_observations.parquet",
)


def _t(*parts: str) -> str:
    return " ".join(part.strip() for part in parts)


class StrategyService:
    def __init__(self, generated_root: Path | None = None) -> None:
        self._generated_root = generated_root or Path(__file__).parents[3] / "data/generated"

    def _current_runtime(self) -> CurrentRuntimeV1:
        try:
            access = DuckDBDataAccess(self._generated_root)
            manifest = access.manifest()
            scenario = manifest.get("scenario")
            return CurrentRuntimeV1(
                storage="DuckDB over governed Parquet release",
                generated=True,
                release_id=access.snapshot_id(),
                scenario=str(scenario) if scenario is not None else None,
                synthetic_assets=_SYNTHETIC_ASSETS,
                limitations=(
                    _t(
                        "Runtime atual usa dados sintéticos governados;",
                        "não há linha real da SME/INEP ingerida nos endpoints analíticos.",
                    ),
                    _t(
                        "Arquivos Parquet soltos em data/generated são legado;",
                        "a fonte operacional é a release apontada por current.json.",
                    ),
                ),
            )
        except (ValueError, OSError, RuntimeError):
            return CurrentRuntimeV1(
                storage="DuckDB over governed Parquet release",
                generated=False,
                release_id=None,
                scenario=None,
                synthetic_assets=(),
                limitations=("Release Parquet governada indisponível no runtime atual.",),
            )

    def data_plan(self) -> StrategyDataPlanV1:
        return StrategyDataPlanV1(
            product_thesis=_t(
                "Inteligência gerencial adaptável da rede de escolas:",
                "primeiro SME/CRE, depois gestor escolar, professor e família,",
                "com IA explicando evidências sem calcular KPIs nem automatizar decisão.",
            ),
            current_runtime=self._current_runtime(),
            real_source_candidates=self._real_sources(),
            adaptation_domains=self._domains(),
            ai_usage_ladder=self._ai_ladder(),
            critical_gaps=self._critical_gaps(),
            next_implementation_shot=(
                _t(
                    "Criar tela/endpoint de prontidão do dataset recebido",
                    "usando profile + mapping + data-plan.",
                ),
                "Adicionar supressão de grupos pequenos antes de qualquer recorte por turma/grupo.",
                _t(
                    "Adicionar provider fake de Claude que consome apenas",
                    "evidence_id/snapshot_id e nunca linhas brutas.",
                ),
            ),
        )

    @staticmethod
    def _real_sources() -> tuple[RealSourceCandidateV1, ...]:
        return (
            RealSourceCandidateV1(
                source_id="sme_educacao_basica",
                label="Modelos SME/IplanRio de educação básica",
                source_kind=SourceKind.METADATA_CONFIRMED,
                runtime_status="NOT_INGESTED",
                expected_grain=_t(
                    "escola, turma, aluno pseudonimizado,",
                    "período e evento educacional",
                ),
                join_keys=("co_entidade", "inep_id"),
                use_if_received=(
                    _t(
                        "substituir schools/attendance/assessment sintéticos",
                        "por dados reais ou agregados",
                    ),
                    _t(
                        "priorizar módulos de aprendizagem e frequência",
                        "se vierem avaliação/frequência",
                    ),
                ),
                caveats=(
                    "metadado público não garante acesso às linhas no hackathon",
                    _t(
                        "qualquer identificador individual precisa ser",
                        "pseudonimizado antes de análise/LLM",
                    ),
                ),
            ),
            RealSourceCandidateV1(
                source_id="inep_censo_escolar",
                label="INEP Censo Escolar / catálogo de escolas",
                source_kind=SourceKind.REAL_PUBLIC,
                runtime_status="NOT_INGESTED",
                expected_grain=_t(
                    "escola anual, turma, matrícula anonimizada",
                    "e infraestrutura escolar pública",
                ),
                join_keys=("co_entidade", "inep_id"),
                use_if_received=(
                    _t(
                        "curar identidade escolar, dependência, localização",
                        "e infraestrutura de escola",
                    ),
                    _t(
                        "cruzar baseline público com recorte SME recebido",
                        "sem depender de sistemas internos",
                    ),
                ),
                caveats=(
                    "Censo Escolar é anual e defasado para operação diária",
                    _t(
                        "microdados públicos não substituem frequência/avaliação",
                        "operacional da SME",
                    ),
                ),
            ),
            RealSourceCandidateV1(
                source_id="inep_ideb_saeb",
                label="INEP IDEB/SAEB",
                source_kind=SourceKind.REAL_PUBLIC,
                runtime_status="NOT_INGESTED",
                expected_grain="escola/rede, etapa, ano e componente de resultado externo",
                join_keys=("co_entidade", "inep_id"),
                use_if_received=(
                    "contextualizar evolução e metas sem prometer causalidade",
                    "ancorar narrativa pública de aprendizagem com baseline comparável",
                ),
                caveats=(
                    "periodicidade bienal e granularidade limitada para ação semanal/mensal",
                    "não explica sozinho por que uma unidade melhorou ou piorou",
                ),
            ),
        )

    @staticmethod
    def _domains() -> tuple[AdaptationDomainV1, ...]:
        return (
            AdaptationDomainV1(
                domain_id="learning",
                label="Aprendizagem e avaliação diagnóstica",
                probability_band="HIGH",
                runtime_status="MOCK_ONLY",
                current_synthetic_assets=("assessment_facts.parquet",),
                missing_real_fields=(
                    "instrumento de avaliação",
                    "ano/série",
                    "turma",
                    "participantes/elegíveis reais",
                    "descritor ou habilidade quando existir",
                ),
                supported_decisions=(
                    "priorizar reforço e recomposição por escola/CRE",
                    "preparar reunião pedagógica com evidências e limitações",
                ),
                primary_roles=("sme_central", "cre_manager", "school_manager", "teacher"),
                ai_boundary=_t(
                    "IA sintetiza evidências e perguntas; cálculo de nota",
                    "e cobertura é determinístico.",
                ),
            ),
            AdaptationDomainV1(
                domain_id="attendance",
                label="Frequência, abandono e busca ativa",
                probability_band="HIGH",
                runtime_status="MOCK_ONLY",
                current_synthetic_assets=("attendance_facts.parquet",),
                missing_real_fields=(
                    "data/aula",
                    "falta justificada versus não justificada",
                    "aula não lançada",
                    "movimentação de matrícula",
                ),
                supported_decisions=(
                    "identificar bolsões de risco restantes",
                    "acompanhar efeito operacional de busca ativa sem expor estudantes",
                ),
                primary_roles=("sme_central", "cre_manager", "school_manager"),
                ai_boundary=_t(
                    "IA não rotula aluno; ajuda a comparar padrões agregados",
                    "e sugerir investigação humana.",
                ),
            ),
            AdaptationDomainV1(
                domain_id="capacity_staffing",
                label="Capacidade, recursos e pessoal",
                probability_band="MEDIUM",
                runtime_status="MOCK_ONLY",
                current_synthetic_assets=(
                    "capacity_facts.parquet",
                    "teacher_shortage_facts.parquet",
                ),
                missing_real_fields=(
                    "vagas/capacidade física",
                    "demanda reprimida",
                    "disciplinas sem professor",
                    "carga necessária e atribuída",
                ),
                supported_decisions=(
                    "destinar recursos ou programas para unidades específicas",
                    "separar problema pedagógico de gargalo operacional",
                ),
                primary_roles=("sme_central", "cre_manager", "school_manager"),
                ai_boundary=_t(
                    "IA explica trade-offs; alocação de vaga, professor",
                    "ou recurso exige decisão administrativa.",
                ),
            ),
            AdaptationDomainV1(
                domain_id="interventions",
                label="Programas e intervenções",
                probability_band="MEDIUM",
                runtime_status="MISSING",
                current_synthetic_assets=(),
                missing_real_fields=(
                    "programa/intervenção",
                    "unidade/turma/público atendido",
                    "data de início/fim",
                    "intensidade ou dose",
                    "status da ação",
                ),
                supported_decisions=(
                    "acompanhar onde o reforço está chegando",
                    "evitar recomendar ação já aplicada sem resultado ou sem cobertura",
                ),
                primary_roles=("sme_central", "cre_manager", "school_manager"),
                ai_boundary=_t(
                    "IA pode redigir plano de ação revisável; não afirma",
                    "impacto causal sem desenho avaliativo.",
                ),
            ),
            AdaptationDomainV1(
                domain_id="student_family",
                label="Aluno e família",
                probability_band="LOW",
                runtime_status="MISSING",
                current_synthetic_assets=(),
                missing_real_fields=(
                    "consentimento/base legal",
                    "canal aprovado",
                    "escopo mínimo agregado",
                ),
                supported_decisions=("somente comunicação ou apoio revisado em fase posterior",),
                primary_roles=("family",),
                ai_boundary=_t(
                    "Nível final e mais restrito; sem PII no MVP",
                    "e sem mensagem externa automática.",
                ),
            ),
        )

    @staticmethod
    def _ai_ladder() -> tuple[AIUsageStepV1, ...]:
        return (
            AIUsageStepV1(
                step_id="central_triage",
                role="sme_central",
                allowed_ai_use=_t(
                    "Resumir rede/CREs, explicar limitações",
                    "e propor perguntas de investigação.",
                ),
                forbidden_ai_use=_t(
                    "Criar ranking definitivo de escolas ou decidir",
                    "alocação automática de recurso.",
                ),
                required_evidence=(
                    "snapshot_id",
                    "evidence_id",
                    "cobertura",
                    "fonte",
                    "período",
                ),
                human_review_required=True,
            ),
            AIUsageStepV1(
                step_id="school_action_brief",
                role="school_manager",
                allowed_ai_use=_t(
                    "Preparar briefing da escola com tendências,",
                    "hipóteses e ações revisáveis.",
                ),
                forbidden_ai_use=_t(
                    "Avaliar professor, diagnosticar aluno ou enviar",
                    "comunicação externa sem aprovação.",
                ),
                required_evidence=(
                    "indicador",
                    "janela temporal",
                    "comparação de pares",
                    "limitações",
                ),
                human_review_required=True,
            ),
            AIUsageStepV1(
                step_id="teacher_support",
                role="teacher",
                allowed_ai_use=_t(
                    "Sugerir foco pedagógico a partir de habilidade/turma",
                    "quando o dado existir.",
                ),
                forbidden_ai_use=_t(
                    "Substituir avaliação docente ou inferir causa",
                    "individual de desempenho.",
                ),
                required_evidence=("instrumento", "turma", "descritor/habilidade", "cobertura"),
                human_review_required=True,
            ),
        )

    @staticmethod
    def _critical_gaps() -> tuple[CriticalGapV1, ...]:
        return (
            CriticalGapV1(
                gap_id="official_school_identity",
                why_it_matters=_t(
                    "Sem identidade escolar oficial, cruzamentos com INEP/SME",
                    "quebram ou viram matching frágil.",
                ),
                pull_first=(
                    "educacao_basica__escola",
                    "INEP Censo Escolar escola",
                    "geolocalização oficial da escola",
                ),
                blocks=("mapa confiável", "drill-down por escola", "comparação com IDEB/SAEB"),
            ),
            CriticalGapV1(
                gap_id="real_assessment_attendance",
                why_it_matters=_t(
                    "Aprendizagem e frequência são o núcleo mais provável",
                    "do desafio, mas hoje só existem no mock.",
                ),
                pull_first=("avaliacao", "frequencia", "aluno_turma agregável", "movimentacao"),
                blocks=("priorização real", "plano de reforço", "gestão de escola/CRE"),
            ),
            CriticalGapV1(
                gap_id="intervention_registry",
                why_it_matters=_t(
                    "Sem saber quais ações já ocorreram, a IA só sugere investigação;",
                    "não acompanha execução nem efeito.",
                ),
                pull_first=(
                    "Trilhas/Recomposição",
                    "Bora pra Escola",
                    "programas por unidade/turma/período",
                ),
                blocks=(
                    "gestão de programas",
                    "alocação informada de recursos",
                    "monitoramento de ação",
                ),
            ),
        )
