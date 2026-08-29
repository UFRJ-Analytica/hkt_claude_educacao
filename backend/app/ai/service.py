"""Governed AI briefing service.

The fake provider is intentionally deterministic and evidence-bound so frontend and
product flows can be developed without sending data to an external model. The
Anthropic provider is optional and fails closed until explicitly configured.
"""

from app.ai.contracts import (
    AIBriefingRequestV1,
    AIBriefingResponseV1,
    AIGovernancePolicyV1,
    AIProvider,
    AISchoolActionPlanRequestV1,
    AISchoolActionPlanResponseV1,
    AISchoolActionPlanV1,
)
from app.analytics.contracts import EvidenceRecordV1
from app.analytics.service import AnalyticsService, EvidenceNotFoundError, MalformedEvidenceIdError

_FAKE_MODEL = "fake-governed-v1"
_ANTHROPIC_MODEL = "claude-sonnet-4"
_GUARDRAILS = (
    "A IA explica evidências governadas; não decide alocação, punição ou ranking automático.",
    "A resposta usa apenas evidence_ids fornecidos e não acessa linhas brutas.",
    "Escopos suprimidos por privacidade permanecem suprimidos na explicação.",
    "Todo plano de ação é rascunho para validação humana pela SME, CRE e gestão escolar.",
)


class AIProviderUnavailableError(RuntimeError):
    """The configured external AI provider cannot be used safely."""


class InvalidAIRequestError(ValueError):
    """The AI request violates governance constraints."""


class AIBriefingService:
    def __init__(
        self,
        analytics: AnalyticsService | None,
        *,
        provider: AIProvider = "fake",
        anthropic_api_key: str | None = None,
        identity_resolver: object | None = None,
        school_map_service: object | None = None,
    ) -> None:
        self._analytics = analytics
        self._provider = provider
        self._anthropic_api_key = anthropic_api_key
        self._identity_resolver = identity_resolver
        self._school_map_service = school_map_service

    def create_briefing(self, request: AIBriefingRequestV1) -> AIBriefingResponseV1:
        if self._analytics is None:
            raise AIProviderUnavailableError("analytics evidence service is not configured")
        if not request.evidence_ids:
            raise InvalidAIRequestError("at least one evidence_id is required")
        evidence = tuple(self._load_evidence(evidence_id) for evidence_id in request.evidence_ids)
        if self._provider == "anthropic":
            return self._anthropic_briefing(request, evidence)
        return self._fake_briefing(request, evidence)

    def create_school_action_plan(
        self, request: AISchoolActionPlanRequestV1
    ) -> AISchoolActionPlanResponseV1:
        if self._provider == "anthropic":
            if not self._anthropic_api_key:
                raise AIProviderUnavailableError("Anthropic API key is not configured")
            raise AIProviderUnavailableError(
                "Anthropic action-plan execution is intentionally disabled in this MVP gate."
            )
        if self._identity_resolver is None or not hasattr(self._identity_resolver, "get_context"):
            raise AIProviderUnavailableError("school context service is not configured")
        context = self._identity_resolver.get_context(
            request.school_id, self._school_map_service
        )
        identity = context.official_record.identity
        signals = [
            (
                f"Unidade real: {identity.nome}, CRE {identity.cre}, "
                f"tipo {identity.school_type or 'não informado'}."
            ),
            context.metric_coverage.message,
        ]
        if context.comparisons:
            first = context.comparisons[0]
            signals.append(
                f"Indicador {first.indicator_id}: escola={first.school_value:.4f}, "
                f"média CRE={first.cre_average}, média rede={first.network_average}."
            )
        data_gaps = [
            (
                "Carregar indicadores oficiais INEP/IDEB/rendimento por CO_ENTIDADE "
                "quando a chave estiver disponível."
            ),
            (
                "Separar comparações por etapa/tipo de unidade; creches não devem "
                "ser avaliadas por IDEB."
            ),
        ]
        if context.metric_coverage.status.value == "IDENTITY_ONLY":
            data_gaps.append(
                "Sem snapshot de métricas para este school_id; mostrar painel "
                "institucional sem erro."
            )
        plan = AISchoolActionPlanV1(
            title=f"Plano de ação — {identity.nome}",
            observed_signals=tuple(signals),
            hypotheses_to_validate=(
                (
                    "Confirmar com a CRE se o cadastro, etapa atendida e capacidade "
                    "estão atualizados."
                ),
                (
                    "Verificar se o foco solicitado aparece em registros internos "
                    "antes de definir intervenção."
                ),
            ),
            short_term_actions=(
                "Abrir conversa de validação com gestão da unidade e equipe da CRE.",
                (
                    "Levantar frequência, demanda, matrícula e infraestrutura em "
                    "recorte compatível com o tipo da unidade."
                ),
                "Registrar dados faltantes antes de comparar desempenho ou priorizar recurso.",
            ),
            medium_term_actions=(
                "Cruzar a unidade com release oficial INEP/SME por CO_ENTIDADE.",
                (
                    "Acompanhar evolução contra média da CRE e da rede somente em "
                    "indicadores aplicáveis."
                ),
            ),
            data_gaps=tuple(data_gaps),
        )
        return AISchoolActionPlanResponseV1(
            provider="fake",
            model=_FAKE_MODEL,
            role=request.role,
            school_context=context,
            plan=plan,
            guardrails=_GUARDRAILS,
            policy=AIGovernancePolicyV1(),
        )

    def _load_evidence(self, evidence_id: str) -> EvidenceRecordV1:
        if self._analytics is None:
            raise InvalidAIRequestError("analytics evidence service is not configured")
        try:
            return self._analytics.get_evidence(evidence_id)
        except (MalformedEvidenceIdError, EvidenceNotFoundError) as error:
            raise InvalidAIRequestError(
                "evidence_id is not available in the pinned snapshot"
            ) from error

    def _fake_briefing(
        self, request: AIBriefingRequestV1, evidence: tuple[EvidenceRecordV1, ...]
    ) -> AIBriefingResponseV1:
        snapshot_id = evidence[0].snapshot_id
        if any(item.snapshot_id != snapshot_id for item in evidence):
            raise InvalidAIRequestError("evidence_ids must belong to one snapshot")
        fragments = []
        for item in evidence:
            observation = item.observation
            if observation.suppressed:
                readable_value = "valor suprimido por privacidade"
            elif observation.value is None:
                readable_value = "valor indisponível"
            else:
                readable_value = f"valor={observation.value:.4f}"
            fragments.append(
                f"{observation.indicator_id} em {observation.scope.type}:{observation.scope.id} "
                f"({readable_value}, qualidade={observation.quality}) via {item.evidence_id}"
            )
        answer = (
            f"Para a role {request.role}, a leitura governada é: "
            + "; ".join(fragments)
            + (
                ". Use isto para priorizar perguntas de gestão e validação humana, "
                "não para decisão automática."
            )
        )
        return AIBriefingResponseV1(
            provider="fake",
            model=_FAKE_MODEL,
            role=request.role,
            snapshot_id=snapshot_id,
            used_evidence_ids=tuple(item.evidence_id for item in evidence),
            answer=answer,
            guardrails=_GUARDRAILS,
            policy=AIGovernancePolicyV1(),
        )

    def _anthropic_briefing(
        self, _request: AIBriefingRequestV1, _evidence: tuple[EvidenceRecordV1, ...]
    ) -> AIBriefingResponseV1:
        if not self._anthropic_api_key:
            raise AIProviderUnavailableError("Anthropic API key is not configured")
        raise AIProviderUnavailableError(
            f"Anthropic provider placeholder is configured for {_ANTHROPIC_MODEL}, "
            "but network execution is intentionally disabled in this MVP gate."
        )
