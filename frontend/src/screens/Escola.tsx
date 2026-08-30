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
import { int, pct } from '../domain/format';
import { useRole } from '../roles';
import { Bar, Card, Codes, CoverageCard, Delta, EmptyState, FilterControl, FilterSelect, Guardrails, HatchBar, Legend, ListRow, Loading, Mono, NoReading, Note, SectionHeading, Stat, StatLine } from '../components';
import type { CodeItem } from '../components';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

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

const FOCUS_OPTIONS = [
  'frequência e aprendizagem',
  'evasão e abandono',
  'infraestrutura',
  'demanda e lotação',
  'apoio da CRE',
];

/** O `items` do Select do coss: mantém as opções conhecidas antes da hidratação. */
const FOCUS_ITEMS = FOCUS_OPTIONS.map((f) => ({ label: f, value: f }));

/**
 * O que o `SelectTrigger` do coss traz de cartão e `.ctl select` não declara —
 * e que por isso passaria: altura mínima, largura, raio, borda nos quatro
 * lados, fundo, padding, corpo e sombra. O legado só governa o que ele mesmo
 * declara, e aqui ele deixou de casar com o seletor (`.ctl select` não alcança
 * um `<button>`), então a régua de 1px embaixo é reescrita em utilitária.
 */

/**
 * `.btn.solid.inline` continua sendo a fonte da verdade visual do botão de
 * ação — fundo petróleo, raio, padding e corpo saem de `legacy.css`, que ganha
 * por estar fora de camada. A variante `ghost` é a que menos acrescenta: sem
 * sombra, sem `inset-shadow`, e o pouco que resta (`border-transparent`,
 * `text-foreground`) o legado já sobrescreve. Sobra a altura fixa do tamanho
 * padrão do coss, que é o que `h-auto` desliga.
 */
const PLAN_BUTTON = 'btn solid inline h-auto before:hidden sm:h-auto';

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
      <EmptyState
        body={
          <>
            O identificador <Mono>{id}</Mono> não está no cadastro carregado nem no recorte do mapa.
            Isso não significa que a unidade não exista na rede — significa que ela não está neste
            conjunto.
          </>
        }
        eyebrow="unidade"
        title="Identificador fora do recorte carregado."
      />
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
  const isReal = identity.source_kind === 'REAL_PUBLIC';

  /** A procedência da unidade, em chips. `real` marca o que veio de fonte oficial. */
  const codes: CodeItem[] = [
    { label: `${identity.cre}ª CRE` },
    ...(identity.school_type ? [{ label: identity.school_type }] : []),
    ...(identity.sme_designation ? [{ label: `SME ${identity.sme_designation}` }] : []),
    { label: identity.inep_id ? `INEP ${identity.inep_id}` : 'INEP não cruzado' },
    { label: isReal ? 'identidade real' : 'identidade sintética', real: isReal },
  ];

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
        <div className="min-w-0">
          <h2>{identity.nome}</h2>
          <Codes items={codes} />
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
          <CoverageCard
            alert={identityOnly}
            eyebrow="Cobertura de indicadores"
            footer={
              ctx?.metric_coverage.snapshot_id
                ? `snapshot ${ctx.metric_coverage.snapshot_id.slice(0, 16)}…`
                : undefined
            }
          >
            {localFallback
              ? `O snapshot do backend não tem métrica para este identificador. Os números abaixo vêm da camada de demonstração local — são os mesmos que pintam esta unidade no mapa, e não são desempenho real.`
              : (ctx?.metric_coverage.message ??
                'Origem local: a API não respondeu, e os indicadores desta tela vêm do recorte sintético carregado.')}
          </CoverageCard>

          {identityOnly ? (
            <Card
              subtitle="nenhum carregado para esta unidade"
              title="Indicadores educacionais"
              variant="chart"
            >
              <div className="emptymetrics">
                {indicators.map((iid) => (
                  // `layout="cells"`: `.emptyrow` é grade de três colunas
                  // (`1fr auto 110px`), e um invólucro a mais tiraria a medida
                  // da coluna do meio.
                  <ListRow
                    className="emptyrow"
                    key={iid}
                    label={INDICATORS[iid].label}
                    layout="cells"
                    meta="não carregado"
                    slots={{ label: 'nm', meta: 'mono st' }}
                    trailing={<NoReading shape="cell" />}
                  />
                ))}
              </div>
              <Note className="hint">
                A unidade existe e está localizada. O que falta é o cruzamento oficial por{' '}
                <Mono>CO_ENTIDADE</Mono>/INEP — nenhum valor foi estimado por nome ou endereço.
              </Note>
            </Card>
          ) : (
            <Card
              subtitle={
                localFallback
                  ? 'camada de demonstração local — mesma origem do mapa'
                  : ctx
                    ? 'métricas de demonstração — não são desempenho real'
                    : 'recorte sintético local'
              }
              title="Indicadores"
              variant="chart"
            >
              <div className="emptymetrics">
                {indicators.map((iid) => {
                  const m = metrics[iid];
                  const blocked = !m || m.value === null;
                  const a = attentionOf(m);
                  const spec = INDICATORS[iid];
                  const v = blocked
                    ? 0
                    : Math.max(
                        0,
                        Math.min(1, (m!.value! - spec.scale[0]) / (spec.scale[1] - spec.scale[0])),
                      );
                  return (
                    <ListRow
                      className="emptyrow"
                      key={iid}
                      label={spec.label}
                      layout="cells"
                      meta={blocked ? 'sem leitura' : spec.format(m!.value!)}
                      slots={{ label: 'nm', meta: blocked ? 'mono st' : 'mono st val' }}
                      trailing={
                        blocked ? (
                          <NoReading shape="cell" />
                        ) : (
                          // `w-[90px]!` porque `.bar { width: 50px }` está fora
                          // de camada: sem `!` a largura de 90px não chega.
                          <Bar className="bar w-[90px]!" label={spec.label} level={a} value={v} />
                        )
                      }
                    />
                  );
                })}
              </div>
            </Card>
          )}

          {classNote && <Note className="hint standalone">{classNote}</Note>}

          {/* A decomposição deriva da frequência de turma regular. Onde não há
              turma regular, não há o que decompor — e o bloco não aparece. */}
          {!takesAdr(identity.school_type) ? null : identityOnly ? (
            <Card
              subtitle="depende da frequência, que não está carregada"
              title="Aula que chegou ao estudante"
              variant="chart"
            >
              <HatchBar className="h-[12px]! rounded-[4px]!" />
              <Note className="hint">
                A decomposição entre aula dada, cancelada e sem lançamento vem do campo{' '}
                <Mono>id_situacao</Mono> da frequência diária. Sem esse dado para a unidade, não há o
                que decompor — e estimar seria inventar.
              </Note>
            </Card>
          ) : (
            lessons.data && (
              <Card
                subtitle="previstas → canceladas · sem lançamento · dadas → com presença"
                title="Aula que chegou ao estudante"
                variant="chart"
              >
                <AulaEntregue d={lessons.data} compact />
                <Note className="hint">
                  {(lessons.data.effective_rate * 100).toFixed(1).replace('.', ',')}% das{' '}
                  {lessons.data.lessons_planned} aulas previstas. Fixture derivada da frequência
                  carregada — o campo <Mono>id_situacao</Mono> resolve isto de forma exata quando o
                  dado do briefing entrar.
                </Note>
              </Card>
            )
          )}

          {/* ---------- turmas: o grão onde a decisão acontece ---------- */}
          {fundamental && turmas.data && turmas.data.turmas.length > 0 && (
            <Card
              subtitle={
                <>
                  {turmas.data.turmas.length} turmas · {suppressedCount} suprimida
                  {suppressedCount === 1 ? '' : 's'} por grupo pequeno
                </>
              }
              title="Turmas"
              variant="chart"
            >
              <div className="turmagrid">
                {turmas.data.turmas.map((t) => (
                  <ListRow
                    className={`turmacell${t.suppressed ? ' sup' : ''}`}
                    key={t.turma_id}
                    label={t.turma_label}
                    layout="cells"
                    meta={
                      t.suppressed
                        ? 'suprimida'
                        : `${t.student_count} est. · ${(t.coverage * 100).toFixed(0)}%`
                    }
                    slots={{ label: 'tl', meta: 'mono tv' }}
                    trailing={
                      t.suppressed ? (
                        <HatchBar />
                      ) : (
                        // Cobertura atendida é `--ok`, fora da rampa de atenção:
                        // é uma afirmação sobre a leitura estar completa, não um
                        // grau de gravidade. O `<i class="ok">` anterior não
                        // tinha regra e caía no cinza de `.bar i`.
                        <Bar
                          className="bar"
                          indicatorClassName="bg-ok"
                          label={`cobertura da turma ${t.turma_label}`}
                          value={t.coverage}
                        />
                      )
                    }
                  />
                ))}
              </div>
              <Note className="hint">
                Turma com menos de {PRIVACY_MIN_UNIT_COUNT} estudantes avaliados não tem valor
                exibido. Em turma pequena, o resultado agregado identifica o estudante — a supressão
                é da arquitetura, não uma configuração de tela.
              </Note>
            </Card>
          )}

          {/* ---------- fluxo: para onde o aluno desta escola foi ---------- */}
          {fundamental && flow.data && flow.data.rows.length > 0 && (
            <Card
              subtitle={
                <>
                  entrada e saída no ano · schema <Mono>movimentacao</Mono>
                </>
              }
              title="Movimentação de matrícula"
              variant="chart"
            >
              {(() => {
                const r = flow.data.rows[0];
                return (
                  <>
                    <StatLine tight variant="section">
                      <Stat label="Matrícula" value={int(r.matricula_base)} />
                      <Stat label="Entradas" value={`+${int(r.entradas)}`} />
                      <Stat
                        delta={<em>outra unidade da rede</em>}
                        label="Saída interna"
                        value={`−${int(r.saidas_internas)}`}
                      />
                      <Stat
                        delta={<em className="bad">fora da rede</em>}
                        label="Saída externa"
                        value={`−${int(r.saidas_externas)}`}
                      />
                      <Stat label="Saldo" tone={r.saldo < 0 ? 'bad' : 'neutral'} value={r.saldo} />
                    </StatLine>
                    <Note className="hint">
                      {int(r.trajetorias_interrompidas)} estudantes com três ou mais movimentações no
                      ano — contagem, nunca lista nominal. Saída interna e externa não se somam:
                      transferir dentro da rede e sair da rede pedem respostas diferentes.
                    </Note>
                  </>
                );
              })()}
            </Card>
          )}

          {/* ---------- carência por disciplina nesta unidade ---------- */}
          {fundamental && gap.data && (
            <Card
              subtitle="horas sem professor · aulas canceladas"
              title="Carência docente por disciplina"
              variant="chart"
            >
              <div className="gaptable compact">
                {gap.data.rows.slice(0, 5).map((r) => (
                  // As duas barras seguem bespoke: a amplificação de 260% é
                  // decisão de leitura, não medida linear — um `Meter` diria
                  // que a largura é o valor, e aqui ela não é.
                  <ListRow
                    className="gaprow"
                    key={r.disciplina}
                    label={r.disciplina}
                    layout="cells"
                    meta={pct(r.taxa_carencia)}
                    slots={{ label: 'gd', sub: 'gt', trailing: 'gbars', meta: 'gv mono' }}
                    sub={`${int(r.horas_sem_professor)} h`}
                    trailing={
                      <>
                        <span className="gbar">
                          <i className="car" style={{ width: `${Math.min(100, r.taxa_carencia * 260)}%` }} />
                        </span>
                        <span className="gbar">
                          <i className="can" style={{ width: `${Math.min(100, r.taxa_cancelamento * 260)}%` }} />
                        </span>
                      </>
                    }
                  >
                    <span className="gv mono bad">{pct(r.taxa_cancelamento)}</span>
                  </ListRow>
                ))}
                <Legend
                  className="gaplegend"
                  items={[
                    { swatch: 'bar', swatchClassName: 'car', label: 'horas sem professor' },
                    { swatch: 'bar', swatchClassName: 'can', label: 'aulas canceladas' },
                  ]}
                />
              </div>
              <Note className="hint">
                As duas séries coincidem nesta unidade. O dado disponível não estabelece direção
                causal entre carência e cancelamento. Carência é medida em disciplina e turma —
                nenhum identificador de profissional é usado.
              </Note>
            </Card>
          )}

          {ctx && ctx.comparisons.length > 0 && (
            <Card subtitle="comparação calculada no backend" title="Escola · CRE · rede" variant="chart">
              {ctx.comparisons.map((c) => (
                <ListRow
                  className="cmprow"
                  key={c.indicator_id}
                  label={INDICATORS[c.indicator_id].label}
                  layout="cells"
                  meta={
                    // `threshold={0}` e `severeAt={Infinity}` reproduzem a regra
                    // desta tela: aqui não há piso de ruído nem terceiro degrau —
                    // a comparação é contra outro recorte, e a leitura é binária.
                    <Delta
                      className="mono"
                      delta={c.delta_vs_cre}
                      emptyText="—"
                      severeAt={Infinity}
                      threshold={0}
                    >
                      {c.delta_vs_cre === null
                        ? undefined
                        : `${c.delta_vs_cre > 0 ? '+' : ''}${(c.delta_vs_cre * 100).toFixed(1).replace('.', ',')} pp vs CRE`}
                    </Delta>
                  }
                  slots={{ label: 'nm', trailing: 'trio' }}
                  trailing={
                    <>
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
                    </>
                  }
                />
              ))}
            </Card>
          )}

          <Card subtitle="rascunho de IA · exige validação humana" title="Plano de ação" variant="chart">
            {/* `.planbar` não é medidor apesar do nome: é a linha de ação, em
                flex, que segura o foco e o botão. */}
            <div className="planbar">
              <FilterControl label="Foco">
                <FilterSelect ariaLabel="Foco" items={FOCUS_ITEMS} onValueChange={setFocus} value={focus} />
              </FilterControl>
              <Button
                className={PLAN_BUTTON}
                disabled={planning}
                onClick={runPlan}
                type="button"
                variant="ghost"
              >
                {planning ? (
                  <>
                    <Spinner aria-hidden="true" aria-label={undefined} className="size-3" role={undefined} />
                    gerando…
                  </>
                ) : (
                  'Gerar plano de ação'
                )}
              </Button>
            </div>

            {planError && <Note className="fallbacknote">{planError}</Note>}

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
                <Guardrails items={plan.guardrails} title="Guardrails" />
                <div className="planfoot mono">
                  {plan.provider} · {plan.model} · role {plan.role} ·{' '}
                  {plan.policy.raw_rows_access === 'denied' ? 'linhas brutas negadas' : ''} ·{' '}
                  {plan.policy.decision_automation === 'denied' ? 'decisão automática negada' : ''}
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="qpanel">
          <SectionHeading>Localização</SectionHeading>
          {coords ? (
            <div className="mono coordbox">
              <div>lat {coords.latitude.toFixed(6)}</div>
              <div>lon {coords.longitude.toFixed(6)}</div>
            </div>
          ) : (
            <Note className="text-[12px] leading-[1.5]">Sem coordenada nesta release.</Note>
          )}

          <SectionHeading className="mt-[22px]!">Proveniência</SectionHeading>
          <Note className="text-[10.5px] leading-[1.8]" mono>
            <div>identidade {identity.source_kind}</div>
            {ctx && <div>fonte {ctx.provenance.source_id}</div>}
            {ctx?.provenance.data_version && (
              <div>versão {ctx.provenance.data_version.slice(0, 16)}…</div>
            )}
          </Note>

          <SectionHeading className="mt-[22px]!">Limitações</SectionHeading>
          {(ctx?.limitations ?? map.data?.limitations ?? []).map((l) => (
            <Note className="mt-2 text-ink-2 leading-[1.5]" key={l}>
              {l}
            </Note>
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
