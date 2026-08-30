import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getSchoolMap } from '../api/client';
import { AI_ROLE_BY_UI, getSchoolContext, postSchoolActionPlan } from '../api/analytics';
import { getLessonDelivery, getTurmas, takesAdr, PRIVACY_MIN_UNIT_COUNT } from '../api/turmas';
import { getFlow, getStaffingGap, isFundamental } from '../api/pipeline';
import AulaEntregue from '../components/AulaEntregue';
import type { AISchoolActionPlanResponseV1, IndicatorId, SchoolContext } from '../api/types';
import { INDICATORS, INDICATOR_ORDER, attentionOf } from '../domain/indicators';
import { useRole } from '../roles';
import { Loading } from '../components';

/**
 * Painel de contexto da escola.
 *
 * Regra central: uma unidade REAL sempre abre. Nunca "escola não encontrada":
 * a escola existe; o que falta é cobertura.
 *
 * `IDENTITY_ONLY` do backend significa que o SNAPSHOT DO BACKEND não tem métrica
 * para aquele identificador. Não significa que nada possa ser exibido: a camada
 * de demonstração local tem números para a unidade, e são exatamente os mesmos
 * que pintam o ponto dela no mapa. Esconder aqui o que o mapa mostra ali seria
 * incoerente nas duas pontas. O que a tela deve fazer é dizer de onde veio cada
 * número — e é o que ela faz.
 */

const int = (v: number) => v.toLocaleString('pt-BR');
const pct = (v: number) => `${(v * 100).toFixed(1).replace('.', ',')}%`;

const FOCUS_OPTIONS = [
  'frequência e aprendizagem',
  'evasão e abandono',
  'infraestrutura',
  'demanda e lotação',
  'apoio da CRE',
];

/** Educação infantil não tem IDEB. Não oferecer indicador que não se aplica. */
function isEarlyChildhood(schoolType: string | null): boolean {
  if (!schoolType) return false;
  const t = schoolType.toLowerCase();
  return t.includes('creche') || t.includes('edi') || t.includes('cdei');
}

/**
 * Desempenho vem da ADR, e a ADR só existe no Fundamental regular. Creche, EDI,
 * biblioteca, núcleo de arte, clube escolar e polo não fazem a avaliação —
 * atribuir proficiência a uma biblioteca é o mesmo erro que atribuir nota de
 * Português a uma creche, e é o que um avaliador da SME identifica na hora.
 */
function applicableIndicators(schoolType: string | null): IndicatorId[] {
  return takesAdr(schoolType)
    ? INDICATOR_ORDER
    : INDICATOR_ORDER.filter((id) => id !== 'assessment_score');
}

/** Nome da classe de equipamento, para explicar a omissão em vez de só omitir. */
function unitClassNote(schoolType: string | null): string | null {
  if (takesAdr(schoolType)) return null;
  if (isEarlyChildhood(schoolType))
    return 'Educação infantil não faz a Atividade Diagnóstica em Rede e não tem IDEB. Desempenho por descritor e decomposição de aula não se aplicam — foram omitidos em vez de exibidos vazios.';
  return 'Este equipamento não oferece turma regular do Ensino Fundamental. Desempenho por descritor e decomposição de aula pertencem à escola de origem do estudante, não a ele.';
}

export default function Escola() {
  const { id = '' } = useParams();
  const { role } = useRole();
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const context = useQuery({ queryKey: ['context', id], queryFn: () => getSchoolContext(id) });
  const lessons = useQuery({ queryKey: ['lessons', id], queryFn: () => getLessonDelivery(id) });
  const turmas = useQuery({ queryKey: ['turmas', id], queryFn: () => getTurmas(id) });
  const flow = useQuery({ queryKey: ['flow-school', id], queryFn: () => getFlow(null, id) });
  const gap = useQuery({ queryKey: ['gap-school', id], queryFn: () => getStaffingGap(null, id) });

  const [focus, setFocus] = useState(FOCUS_OPTIONS[0]);
  const [plan, setPlan] = useState<AISchoolActionPlanResponseV1 | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planning, setPlanning] = useState(false);

  /** Fallback quando a API não responde: o próprio recorte carregado no mapa. */
  const feature = useMemo(
    () => map.data?.features.find((f) => f.properties.identity.school_id === id) ?? null,
    [map.data, id],
  );

  if (context.isLoading || map.isLoading) return <Loading label="abrindo unidade" />;

  const ctx: SchoolContext | null = context.data ?? null;
  const identity = ctx?.official_record.identity ?? feature?.properties.identity ?? null;
  const coords =
    ctx?.official_record.coordinates ??
    (feature
      ? { latitude: feature.geometry.coordinates[1], longitude: feature.geometry.coordinates[0] }
      : null);

  if (!identity) {
    return (
      <div className="statepage">
        <div className="k">unidade</div>
        <h2>Identificador fora do recorte carregado.</h2>
        <p>
          O identificador <span className="mono">{id}</span> não está no cadastro carregado nem no
          recorte do mapa. Isso não significa que a unidade não exista na rede — significa que ela não
          está neste conjunto.
        </p>
      </div>
    );
  }

  const backendHasNoMetric = ctx ? ctx.metric_coverage.status === 'IDENTITY_ONLY' : false;
  const metrics = ctx?.synthetic_profile?.metrics ?? feature?.properties.metrics ?? {};
  const hasLocalMetrics = Object.values(metrics).some((m) => m && m.value !== null);

  // Só bloqueia quando não há NADA — nem no backend, nem na camada local.
  const identityOnly = backendHasNoMetric && !hasLocalMetrics;
  // Backend sem métrica, mas o mapa tem: exibe e diz de onde veio.
  const localFallback = backendHasNoMetric && hasLocalMetrics;
  const indicators = applicableIndicators(identity.school_type);
  const mapsUrl =
    ctx?.map_links.google_maps_url ??
    (coords
      ? `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`
      : null);
  const routeUrl =
    ctx?.map_links.directions_url ??
    (coords
      ? `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`
      : null);

  const fundamental = isFundamental(identity.school_type);
  const classNote = unitClassNote(identity.school_type);
  const suppressedCount = (turmas.data?.turmas ?? []).filter((t) => t.suppressed).length;

  const runPlan = async () => {
    setPlanning(true);
    setPlan(null);
    setPlanError(null);
    const outcome = await postSchoolActionPlan(id, AI_ROLE_BY_UI[role.id], focus);
    if (outcome.ok && outcome.response) setPlan(outcome.response);
    else setPlanError(outcome.reason);
    setPlanning(false);
  };

  return (
    <div>
      <div className="idhead">
        <div style={{ minWidth: 0 }}>
          <h2>{identity.nome}</h2>
          <div className="codes">
            <span>{identity.cre}ª CRE</span>
            {identity.school_type && <span>{identity.school_type}</span>}
            {identity.sme_designation && <span>SME {identity.sme_designation}</span>}
            <span>{identity.inep_id ? `INEP ${identity.inep_id}` : 'INEP não cruzado'}</span>
            <span className={identity.source_kind === 'REAL_PUBLIC' ? 'realtag' : ''}>
              {identity.source_kind === 'REAL_PUBLIC' ? 'identidade real' : 'identidade sintética'}
            </span>
          </div>
        </div>
        <div className="headactions">
          {mapsUrl && (
            <a className="btn ghost" href={mapsUrl} target="_blank" rel="noreferrer noopener">
              Abrir no Google Maps
            </a>
          )}
          {routeUrl && (
            <a className="btn ghost" href={routeUrl} target="_blank" rel="noreferrer noopener">
              Rotas
            </a>
          )}
        </div>
      </div>

      <div className="schoolgrid">
        <div className="schoolmain">
          <div className={`coverkard${identityOnly ? ' identityonly' : ''}`}>
            <div className="k">Cobertura de indicadores</div>
            <p>
              {localFallback
                ? `O snapshot do backend não tem métrica para este identificador. Os números abaixo vêm da camada de demonstração local — são os mesmos que pintam esta unidade no mapa, e não são desempenho real.`
                : (ctx?.metric_coverage.message ??
                  'Origem local: a API não respondeu, e os indicadores desta tela vêm do recorte sintético carregado.')}
            </p>
            {ctx?.metric_coverage.snapshot_id && (
              <span className="mono snap">
                snapshot {ctx.metric_coverage.snapshot_id.slice(0, 16)}…
              </span>
            )}
          </div>

          {identityOnly ? (
            <div className="chartblock">
              <div className="ct">
                <h5>Indicadores educacionais</h5>
                <span className="cs">nenhum carregado para esta unidade</span>
              </div>
              <div className="emptymetrics">
                {indicators.map((iid) => (
                  <div className="emptyrow" key={iid}>
                    <span className="nm">{INDICATORS[iid].label}</span>
                    <span className="blockcell" />
                    <span className="mono st">não carregado</span>
                  </div>
                ))}
              </div>
              <p className="hint">
                A unidade existe e está localizada. O que falta é o cruzamento oficial por{' '}
                <span className="mono">CO_ENTIDADE</span>/INEP — nenhum valor foi estimado por nome ou
                endereço.
              </p>
            </div>
          ) : (
            <div className="chartblock">
              <div className="ct">
                <h5>Indicadores</h5>
                <span className="cs">
                  {localFallback
                    ? 'camada de demonstração local — mesma origem do mapa'
                    : ctx
                      ? 'métricas de demonstração — não são desempenho real'
                      : 'recorte sintético local'}
                </span>
              </div>
              <div className="emptymetrics">
                {indicators.map((iid) => {
                  const m = metrics[iid];
                  const blocked = !m || m.value === null;
                  const a = attentionOf(m);
                  const spec = INDICATORS[iid];
                  const w = blocked
                    ? 0
                    : Math.max(
                        0,
                        Math.min(1, (m!.value! - spec.scale[0]) / (spec.scale[1] - spec.scale[0])),
                      ) * 100;
                  return (
                    <div className="emptyrow" key={iid}>
                      <span className="nm">{spec.label}</span>
                      {blocked ? (
                        <span className="blockcell" />
                      ) : (
                        <span className="bar" style={{ width: 90 }}>
                          <i className={a} style={{ width: `${w}%` }} />
                        </span>
                      )}
                      <span className={`mono st${blocked ? '' : ' val'}`}>
                        {blocked ? 'sem leitura' : spec.format(m!.value!)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {classNote && <p className="hint standalone">{classNote}</p>}

          {/* A decomposição deriva da frequência de turma regular. Onde não há
              turma regular, não há o que decompor — e o bloco não aparece. */}
          {!takesAdr(identity.school_type) ? null : identityOnly ? (
            <div className="chartblock">
              <div className="ct">
                <h5>Aula que chegou ao estudante</h5>
                <span className="cs">depende da frequência, que não está carregada</span>
              </div>
              <span className="hatchbar" style={{ height: 12, borderRadius: 4 }} />
              <p className="hint">
                A decomposição entre aula dada, cancelada e sem lançamento vem do campo{' '}
                <span className="mono">id_situacao</span> da frequência diária. Sem esse dado para a
                unidade, não há o que decompor — e estimar seria inventar.
              </p>
            </div>
          ) : (
            lessons.data && (
            <div className="chartblock">
              <div className="ct">
                <h5>Aula que chegou ao estudante</h5>
                <span className="cs">previstas → canceladas · sem lançamento · dadas → com presença</span>
              </div>
              <AulaEntregue d={lessons.data} compact />
              <p className="hint">
                {(lessons.data.effective_rate * 100).toFixed(1).replace('.', ',')}% das{' '}
                {lessons.data.lessons_planned} aulas previstas. Fixture derivada da frequência
                carregada — o campo <span className="mono">id_situacao</span> resolve isto de forma
                exata quando o dado do briefing entrar.
              </p>
              </div>
            )
          )}

          {/* ---------- turmas: o grão onde a decisão acontece ---------- */}
          {fundamental && turmas.data && turmas.data.turmas.length > 0 && (
            <div className="chartblock">
              <div className="ct">
                <h5>Turmas</h5>
                <span className="cs">
                  {turmas.data.turmas.length} turmas · {suppressedCount} suprimida
                  {suppressedCount === 1 ? '' : 's'} por grupo pequeno
                </span>
              </div>
              <div className="turmagrid">
                {turmas.data.turmas.map((t) => (
                  <div className={`turmacell${t.suppressed ? ' sup' : ''}`} key={t.turma_id}>
                    <span className="tl">{t.turma_label}</span>
                    {t.suppressed ? (
                      <>
                        <span className="hatchbar" />
                        <span className="mono tv">suprimida</span>
                      </>
                    ) : (
                      <>
                        <span className="bar">
                          <i className="ok" style={{ width: `${t.coverage * 100}%` }} />
                        </span>
                        <span className="mono tv">
                          {t.student_count} est. · {(t.coverage * 100).toFixed(0)}%
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <p className="hint">
                Turma com menos de {PRIVACY_MIN_UNIT_COUNT} estudantes avaliados não tem valor
                exibido. Em turma pequena, o resultado agregado identifica o estudante — a supressão
                é da arquitetura, não uma configuração de tela.
              </p>
            </div>
          )}

          {/* ---------- fluxo: para onde o aluno desta escola foi ---------- */}
          {fundamental && flow.data && flow.data.rows.length > 0 && (
            <div className="chartblock">
              <div className="ct">
                <h5>Movimentação de matrícula</h5>
                <span className="cs">entrada e saída no ano · schema <span className="mono">movimentacao</span></span>
              </div>
              {(() => {
                const r = flow.data.rows[0];
                return (
                  <>
                    <div className="statline tight">
                      <div className="st">
                        <div className="k">Matrícula</div>
                        <div className="v">{int(r.matricula_base)}</div>
                      </div>
                      <div className="st">
                        <div className="k">Entradas</div>
                        <div className="v">+{int(r.entradas)}</div>
                      </div>
                      <div className="st">
                        <div className="k">Saída interna</div>
                        <div className="v">
                          −{int(r.saidas_internas)} <em>outra unidade da rede</em>
                        </div>
                      </div>
                      <div className="st">
                        <div className="k">Saída externa</div>
                        <div className="v">
                          −{int(r.saidas_externas)} <em className="bad">fora da rede</em>
                        </div>
                      </div>
                      <div className="st">
                        <div className="k">Saldo</div>
                        <div className={`v ${r.saldo < 0 ? 'worse' : ''}`}>{r.saldo}</div>
                      </div>
                    </div>
                    <p className="hint">
                      {int(r.trajetorias_interrompidas)} estudantes com três ou mais movimentações no
                      ano — contagem, nunca lista nominal. Saída interna e externa não se somam:
                      transferir dentro da rede e sair da rede pedem respostas diferentes.
                    </p>
                  </>
                );
              })()}
            </div>
          )}

          {/* ---------- carência por disciplina nesta unidade ---------- */}
          {fundamental && gap.data && (
            <div className="chartblock">
              <div className="ct">
                <h5>Carência docente por disciplina</h5>
                <span className="cs">horas sem professor · aulas canceladas</span>
              </div>
              <div className="gaptable compact">
                {gap.data.rows.slice(0, 5).map((r) => (
                  <div className="gaprow" key={r.disciplina}>
                    <span className="gd">{r.disciplina}</span>
                    <span className="gt">{int(r.horas_sem_professor)} h</span>
                    <span className="gbars">
                      <span className="gbar">
                        <i className="car" style={{ width: `${Math.min(100, r.taxa_carencia * 260)}%` }} />
                      </span>
                      <span className="gbar">
                        <i className="can" style={{ width: `${Math.min(100, r.taxa_cancelamento * 260)}%` }} />
                      </span>
                    </span>
                    <span className="gv mono">{pct(r.taxa_carencia)}</span>
                    <span className="gv mono bad">{pct(r.taxa_cancelamento)}</span>
                  </div>
                ))}
                <div className="gaplegend">
                  <span>
                    <i className="car" />
                    horas sem professor
                  </span>
                  <span>
                    <i className="can" />
                    aulas canceladas
                  </span>
                </div>
              </div>
              <p className="hint">
                As duas séries coincidem nesta unidade. O dado disponível não estabelece direção
                causal entre carência e cancelamento. Carência é medida em disciplina e turma —
                nenhum identificador de profissional é usado.
              </p>
            </div>
          )}

          {ctx && ctx.comparisons.length > 0 && (
            <div className="chartblock">
              <div className="ct">
                <h5>Escola · CRE · rede</h5>
                <span className="cs">comparação calculada no backend</span>
              </div>
              {ctx.comparisons.map((c) => (
                <div className="cmprow" key={c.indicator_id}>
                  <span className="nm">{INDICATORS[c.indicator_id].label}</span>
                  <span className="trio">
                    <b>{INDICATORS[c.indicator_id].format(c.school_value)}</b>
                    <span>
                      CRE{' '}
                      {c.cre_average === null
                        ? '—'
                        : INDICATORS[c.indicator_id].format(c.cre_average)}
                    </span>
                    <span>
                      rede{' '}
                      {c.network_average === null
                        ? '—'
                        : INDICATORS[c.indicator_id].format(c.network_average)}
                    </span>
                  </span>
                  <span className={`mono delta${(c.delta_vs_cre ?? 0) < 0 ? ' bad' : ''}`}>
                    {c.delta_vs_cre === null
                      ? '—'
                      : `${c.delta_vs_cre > 0 ? '+' : ''}${(c.delta_vs_cre * 100).toFixed(1).replace('.', ',')} pp vs CRE`}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="chartblock">
            <div className="ct">
              <h5>Plano de ação</h5>
              <span className="cs">rascunho de IA · exige validação humana</span>
            </div>
            <div className="planbar">
              <label className="ctl">
                <span>Foco</span>
                <select value={focus} onChange={(e) => setFocus(e.target.value)}>
                  {FOCUS_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="btn solid inline" onClick={runPlan} disabled={planning}>
                {planning ? 'gerando…' : 'Gerar plano de ação'}
              </button>
            </div>

            {planError && <div className="fallbacknote">{planError}</div>}

            {plan && (
              <div className="plan">
                <div className="plantitle">{plan.plan.title}</div>
                {(
                  [
                    ['Sinais observados', plan.plan.observed_signals],
                    ['Hipóteses a validar', plan.plan.hypotheses_to_validate],
                    ['Ações de curto prazo', plan.plan.short_term_actions],
                    ['Ações de médio prazo', plan.plan.medium_term_actions],
                    ['Dados faltantes', plan.plan.data_gaps],
                  ] as [string, string[]][]
                ).map(([label, items]) => (
                  <div className="plansec" key={label}>
                    <div className="ph">{label}</div>
                    <ul>
                      {items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="cannot">
                  <div className="h">Guardrails</div>
                  {plan.guardrails.map((g) => (
                    <p key={g}>{g}</p>
                  ))}
                </div>
                <div className="planfoot mono">
                  {plan.provider} · {plan.model} · role {plan.role} ·{' '}
                  {plan.policy.raw_rows_access === 'denied' ? 'linhas brutas negadas' : ''} ·{' '}
                  {plan.policy.decision_automation === 'denied' ? 'decisão automática negada' : ''}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="qpanel">
          <h5>Localização</h5>
          {coords ? (
            <div className="mono coordbox">
              <div>lat {coords.latitude.toFixed(6)}</div>
              <div>lon {coords.longitude.toFixed(6)}</div>
            </div>
          ) : (
            <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>Sem coordenada nesta release.</p>
          )}

          <h5 style={{ marginTop: 22 }}>Proveniência</h5>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', lineHeight: 1.8 }}>
            <div>identidade {identity.source_kind}</div>
            {ctx && <div>fonte {ctx.provenance.source_id}</div>}
            {ctx?.provenance.data_version && (
              <div>versão {ctx.provenance.data_version.slice(0, 16)}…</div>
            )}
          </div>

          <h5 style={{ marginTop: 22 }}>Limitações</h5>
          {(ctx?.limitations ?? map.data?.limitations ?? []).map((l) => (
            <p key={l} style={{ fontSize: 11.5, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>
              {l}
            </p>
          ))}

          {takesAdr(identity.school_type) && (
            <Link
              className="btn"
              to={`/recomposicao?cre=${identity.cre}&escola=${encodeURIComponent(identity.school_id)}`}
            >
              Recomposição por turma
            </Link>
          )}
          {fundamental && (
            <Link className="btn ghost" to={`/fluxo?cre=${identity.cre}`}>
              Fluxo na {identity.cre}ª CRE
            </Link>
          )}
          <Link className="btn ghost" to={`/comparar?cre=${identity.cre}`}>
            Comparar na {identity.cre}ª CRE
          </Link>
          <Link className="btn ghost" to="/mapa">
            Voltar ao mapa
          </Link>
        </div>
      </div>
    </div>
  );
}
