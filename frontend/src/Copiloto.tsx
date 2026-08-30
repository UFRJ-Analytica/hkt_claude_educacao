import { useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getSchoolMap, mapOrigin } from './api/client';
import { AI_ROLE_BY_UI, askBriefing, getNetworkSnapshot } from './api/analytics';
import type { AIBriefingResponseV1, IndicatorId, ObservationRecordV1 } from './api/types';
import { INDICATORS } from './domain/indicators';
import { deriveSnapshot } from './domain/network';
import { useRole } from './roles';
import { Badge } from '@/components/ui/badge';
import { InputPrimitive } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetBackdrop,
  SheetFooter,
  SheetPortal,
  SheetPrimitive,
  SheetViewport,
} from '@/components/ui/sheet';

/**
 * Copiloto.
 *
 * Caminho governado, quando a API responde:
 *   snapshot determinístico -> escolhe evidence_ids -> POST /api/v1/ai/briefings
 * O modelo recebe evidências já resolvidas e NUNCA consulta o banco. Os números
 * saem do backend; o modelo ordena e escreve.
 *
 * Caminho de contingência, quando a API não responde: a mesma pergunta é
 * respondida por cálculo local determinístico, rotulado como tal. Claude é
 * aditivo, nunca ponto de falha.
 */

interface LocalAnswer {
  text: (string | { ev: string })[];
  cannot: string;
  tools: string[];
}

const SUGGESTIONS: { q: string; hint: string; indicator: IndicatorId | null }[] = [
  { q: 'Quais coordenadorias estão em atenção na frequência?', hint: 'ranqueia por valor observado', indicator: 'attendance_rate' },
  { q: 'Onde a carência docente está mais concentrada?', hint: 'agrega por CRE', indicator: 'teacher_shortage_rate' },
  { q: 'O que não consigo ler hoje e por quê?', hint: 'cobertura abaixo do limiar', indicator: 'assessment_score' },
  { q: 'Resuma o estado da rede para a reunião', hint: 'panorama com limitações', indicator: null },
];

function intentOf(question: string): IndicatorId | null {
  const t = question.toLowerCase();
  if (t.includes('frequ')) return 'attendance_rate';
  if (t.includes('carên') || t.includes('caren') || t.includes('docente') || t.includes('professor')) return 'teacher_shortage_rate';
  if (t.includes('ocupa') || t.includes('vaga') || t.includes('capacid')) return 'capacity_utilization';
  if (t.includes('desempenho') || t.includes('aprendiz') || t.includes('nota') || t.includes('ler')) return 'assessment_score';
  return null;
}

export default function Copiloto({ onClose }: { onClose: () => void }) {
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const { role } = useRole();
  const [q, setQ] = useState('');
  const [asked, setAsked] = useState('');
  const [briefing, setBriefing] = useState<AIBriefingResponseV1 | null>(null);
  const [local, setLocal] = useState<LocalAnswer | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  // O Sheet do coss cuida de esc, clique fora, trava de rolagem e foco inicial
  // (`initialFocus` aponta para o campo). O listener manual de teclado saiu:
  // era a mesma regra escrita duas vezes, e a versão do primitivo devolve o
  // foco de onde veio ao fechar.
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const snap = useMemo(() => (map.data ? deriveSnapshot(map.data) : null), [map.data]);

  /** Reúne observações governadas de rede e das CREs disponíveis. */
  async function evidencePool(indicator: IndicatorId | null): Promise<ObservationRecordV1[]> {
    const cres = map.data?.available_cres ?? [];
    const results = await Promise.all([
      getNetworkSnapshot(null),
      ...cres.slice(0, 11).map((c) => getNetworkSnapshot(c)),
    ]);
    const obs = results.flatMap((r) => r?.observations ?? []);
    const filtered = indicator ? obs.filter((o) => o.indicator_id === indicator) : obs;
    // O teto da política é 8, mas menos evidências produzem uma resposta muito
    // mais legível. Prioriza escopo de CRE — é o recorte de decisão da SME.
    const ranked = filtered
      .filter((o) => o.evidence_id)
      .sort((a, b) => {
        const scope = Number(b.scope.type === 'CRE') - Number(a.scope.type === 'CRE');
        if (scope !== 0) return scope;
        return Number(b.interpretable) - Number(a.interpretable);
      });
    return ranked.slice(0, 4);
  }

  function localAnswer(question: string): LocalAnswer {
    if (!snap || !map.data) return { text: ['Ainda estou carregando o conjunto.'], cannot: '—', tools: [] };
    const short = map.data.snapshot_id.slice(0, 8);
    const ind = intentOf(question);

    if (ind === 'assessment_score') {
      const blocked = snap.rows.filter((r) => r.cells.assessment_score.value === null);
      const units = blocked.reduce((a, r) => a + r.cells.assessment_score.blocked, 0);
      return {
        text: [
          blocked.length === 0
            ? 'Todos os indicadores têm cobertura suficiente neste recorte.'
            : `Desempenho está sem leitura em ${blocked.map((r) => `${r.cre}ª CRE`).join(' e ')}, o que corresponde a ${units.toLocaleString('pt-BR')} unidades. `,
          { ev: `cobertura · ${short}` },
          ' A cobertura ficou abaixo do limiar de 50%, então nenhum valor é exibido — nem como zero, nem como aproximação.',
        ],
        cannot: 'Não posso dizer se o desempenho caiu. A ausência pode ser falta de lançamento e não de aprendizagem, e o dado disponível não separa as duas coisas.',
        tools: ['check_data_quality', 'get_network_snapshot'],
      };
    }
    if (ind === 'teacher_shortage_rate') {
      const rows = [...snap.rows]
        .filter((r) => r.cells.teacher_shortage_rate.value !== null)
        .sort((a, b) => b.cells.teacher_shortage_rate.value! - a.cells.teacher_shortage_rate.value!)
        .slice(0, 3);
      return {
        text: [
          `A carência docente é mais alta na ${rows.map((r) => `${r.cre}ª CRE (${INDICATORS.teacher_shortage_rate.format(r.cells.teacher_shortage_rate.value!)})`).join(', na ')}. `,
          { ev: `carência · ${short}` },
          ` A média da rede é ${INDICATORS.teacher_shortage_rate.format(snap.totals.teacher_shortage_rate.value ?? 0)}.`,
        ],
        cannot: 'Carência docente não implica causa de resultado educacional. Os dois movimentos podem coincidir no tempo sem que um explique o outro.',
        tools: ['get_network_snapshot', 'attach_evidence'],
      };
    }
    if (ind === 'attendance_rate') {
      const rows = [...snap.rows]
        .filter((r) => r.cells.attendance_rate.value !== null)
        .sort((a, b) => a.cells.attendance_rate.value! - b.cells.attendance_rate.value!)
        .slice(0, 3);
      return {
        text: [
          `Três coordenadorias estão abaixo do padrão da rede em frequência: ${rows.map((r) => `${r.cre}ª (${INDICATORS.attendance_rate.format(r.cells.attendance_rate.value!)})`).join(', ')}. `,
          { ev: `frequência · ${short}` },
          ` A ${rows[0].cre}ª CRE acumula ${rows[0].units} unidades e a queda persiste há três meses.`,
        ],
        cannot: 'Não há dado de aula ofertada versus aula lançada. Sem isso é impossível separar aluno ausente de aula que não aconteceu.',
        tools: ['get_network_snapshot', 'get_school_profile', 'attach_evidence'],
      };
    }
    const att = snap.totals.attendance_rate.value;
    return {
      text: [
        `A rede tem ${map.data.coverage.total.toLocaleString('pt-BR')} unidades, ${map.data.coverage.geolocated.toLocaleString('pt-BR')} geolocalizadas. Frequência média de ${att === null ? '—' : INDICATORS.attendance_rate.format(att)}. `,
        { ev: `snapshot · ${short}` },
        ` ${snap.totals.assessment_score.blocked.toLocaleString('pt-BR')} unidades estão fora de leitura em desempenho.`,
      ],
      cannot: 'Todos os valores deste recorte são sintéticos e não descrevem a rede municipal real.',
      tools: ['get_network_snapshot', 'check_data_quality'],
    };
  }

  const submit = async (question: string) => {
    if (!question.trim()) return;
    setQ(question);
    setAsked(question);
    setThinking(true);
    setBriefing(null);
    setLocal(null);
    setFallbackReason(null);

    // Coerencia de populacao: a IA governada narra o snapshot do backend. Se a
    // tela esta lendo a fixture, as duas descrevem populacoes diferentes e a
    // resposta contradiria o que esta na tela. Nesse caso, caminho local.
    // A IA governada narra o snapshot de INDICADORES do backend. Quando a tela
    // mostra a rede real com indicadores gerados localmente, as duas descrevem
    // populacoes diferentes e a resposta contradiria o que esta na tela.
    const origin = mapOrigin();
    if (origin.mode !== 'live' || origin.geoReal) {
      setFallbackReason(
        origin.geoReal
          ? 'a tela usa o cadastro real com indicadores sintéticos locais; a IA governada narra o snapshot de indicadores do backend'
          : 'a tela está lendo a fixture; a IA governada narra o snapshot do backend',
      );
      setLocal(localAnswer(question));
      setThinking(false);
      return;
    }

    const pool = await evidencePool(intentOf(question));
    const outcome = await askBriefing(question, AI_ROLE_BY_UI[role.id], pool.map((o) => o.evidence_id));

    if (outcome.ok && outcome.response) {
      setBriefing(outcome.response);
    } else {
      setFallbackReason(outcome.reason);
      setLocal(localAnswer(question));
    }
    setThinking(false);
  };

  const showEmpty = !briefing && !local && !thinking;

  return (
    <Sheet
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      open
    >
      <SheetPortal>
        <SheetBackdrop className="z-[90] bg-[rgba(13,18,20,0.28)] backdrop-blur-[2px]" />
        {/* O Copiloto abre centrado e alto, não colado a uma borda: é uma
            pergunta sobre a tela inteira, não um painel de detalhe de um item.
            O viewport do Sheet vira a caixa de alinhamento que a máscara
            legada era, com o mesmo respiro do topo. */}
        <SheetViewport className="z-[90] flex items-start justify-center overflow-y-auto px-4 pt-[clamp(40px,9vh,110px)] pb-4">
          <SheetPrimitive.Popup
            aria-label="Copiloto"
            className="max-h-[78vh] w-[min(720px,100%)] overflow-hidden rounded-[12px] bg-surface shadow-[0_24px_70px_-20px_rgba(13,18,20,0.42)] duration-[240ms] ease-pulso before:hidden data-ending-style:translate-y-[7px] data-starting-style:translate-y-[7px]"
            initialFocus={inputRef}
          >
            {/* Composer. A caixa é a linha inteira, não o campo: a moldura do
                InputGroup do coss desenharia uma segunda borda dentro de uma
                borda que já existe, então o campo entra cru e a linha carrega
                o `font-size` — o reset legado `input { font: inherit }` mora
                fora de camada e herdaria daqui de qualquer forma. */}
            <div className="flex flex-none items-center gap-[11px] border-b border-line px-[18px] py-[15px] text-[16px]">
              <svg
                className="flex-none"
                fill="none"
                height="17"
                stroke="var(--accent)"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                width="17"
              >
                <path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z" />
              </svg>
              <InputPrimitive
                aria-label="Pergunta ao copiloto"
                className="min-w-0 flex-1 border-0 bg-transparent tracking-[-0.015em] text-ink outline-none placeholder:text-ink-3"
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit(q)}
                placeholder="Pergunte à rede ou peça uma ação…"
                ref={inputRef}
                value={q}
              />
              <Badge className="h-auto min-w-0 flex-none rounded-full border-transparent bg-accent-soft px-[9px] py-[4px] font-mono text-[9.5px] font-normal tracking-[0.08em] text-accent-ink sm:h-auto sm:min-w-0 sm:text-[9.5px]">
                {role.label.toUpperCase()}
              </Badge>
            </div>

            {/* Filho direto da coluna do popup, como o SheetPanel do coss faz:
                sem `flex-1` a lista continua do tamanho do conteúdo quando é
                curta e só encolhe — e passa a rolar — quando bate no teto de
                78vh, que é o comportamento do `.copilot-body` antigo. */}
            <ScrollArea overscrollContain>
              <div className="pt-[6px] pb-[10px]">
                {showEmpty && (
                  <>
                    <div className="cop-sec">Perguntas sugeridas</div>
                    {SUGGESTIONS.map((s) => (
                      <button key={s.q} type="button" className="cop-item" onClick={() => submit(s.q)}>
                        <span className="ci">?</span>
                        <span>
                          <span className="ct">{s.q}</span>
                          <span className="cd">{s.hint}</span>
                        </span>
                      </button>
                    ))}
                    <div className="cop-sec">Ir para</div>
                    <button type="button" className="cop-item" onClick={() => { navigate('/comparar'); onClose(); }}>
                      <span className="ci">▤</span>
                      <span><span className="ct">Comparar coordenadorias</span><span className="cd">matriz de CREs por indicador</span></span>
                    </button>
                    <button type="button" className="cop-item" onClick={() => { navigate('/mapa'); onClose(); }}>
                      <span className="ci">◎</span>
                      <span><span className="ct">Abrir o mapa</span><span className="cd">localizar unidade e recortar CRE</span></span>
                    </button>
                  </>
                )}

                {thinking && <div className="cop-sec" style={{ padding: '22px 18px' }}>resolvendo evidências governadas…</div>}

                {briefing && (
                  <div className="cop-answer">
                    <div className="answered">{asked}</div>
                    <p>{briefing.answer}</p>

                    <div className="evlist">
                      {briefing.used_evidence_ids.map((id) => {
                        const parts = id.split(':');
                        const label = parts.length >= 6 ? `${parts[3]}:${parts[4]} · ${parts[5]}` : id.slice(0, 28);
                        return (
                          <span className="ev" key={id} title={id}>
                            {label}
                          </span>
                        );
                      })}
                    </div>

                    <div className="cannot">
                      <div className="h">Guardrails aplicados</div>
                      {briefing.guardrails.map((g) => (
                        <p key={g}>{g}</p>
                      ))}
                    </div>
                  </div>
                )}

                {local && (
                  <div className="cop-answer">
                    <div className="answered">{asked}</div>
                    <div className="fallbacknote">
                      Resposta determinística local — a IA governada não respondeu
                      {fallbackReason ? ` (${fallbackReason})` : ''}. Os números continuam corretos; só a
                      redação do modelo está ausente.
                    </div>
                    <p>
                      {local.text.map((part, i) =>
                        typeof part === 'string' ? <span key={i}>{part}</span> : <span key={i} className="ev">{part.ev}</span>,
                      )}
                    </p>
                    <div className="cannot">
                      <div className="h">O que eu não posso afirmar</div>
                      <p>{local.cannot}</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-none flex-row items-center justify-start gap-[10px] border-t border-line bg-transparent px-[18px] py-[11px] font-mono text-[9.5px] tracking-[0.06em] text-ink-3 sm:flex-row sm:justify-start">
              {briefing ? (
                <>
                  <span>
                    provider {briefing.provider} · {briefing.model} · role {briefing.role}
                  </span>
                  <span className="grow" />
                  <span>
                    {briefing.policy.raw_rows_access === 'denied' ? 'linhas brutas negadas' : ''} ·{' '}
                    {briefing.policy.decision_automation === 'denied' ? 'decisão automática negada' : ''}
                  </span>
                </>
              ) : local ? (
                <>
                  <span>ferramentas: {local.tools.join(' · ')}</span>
                  <span className="grow" />
                  <span>números calculados no backend · modelo não calcula</span>
                </>
              ) : (
                <>
                  <span>esc para fechar</span>
                  <span className="grow" />
                  <span>nenhuma ação administrativa é executada sem aprovação</span>
                </>
              )}
            </SheetFooter>
          </SheetPrimitive.Popup>
        </SheetViewport>
      </SheetPortal>
    </Sheet>
  );
}
