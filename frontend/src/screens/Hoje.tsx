import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getSchoolMap, mapOrigin } from '../api/client';
import { COMPONENT_LABELS, getSignals } from '../domain/signals';
import { getNetworkLessonDelivery } from '../api/turmas';
import AulaEntregue from '../components/AulaEntregue';
import { deriveSnapshot } from '../domain/network';
import { int, pct, pct0 } from '../domain/format';
import {
  Brief,
  Card,
  DerivedNote,
  Footnote,
  Loading,
  Mono,
  NoReading,
  Note,
  Pad,
  SignalList,
  SignalRow,
  Stat,
  StatDelta,
  StatLine,
} from '../components';

/**
 * Equipe digital. Os estados abaixo descrevem o desenho do runtime de agentes
 * documentado em docs/architecture/agent-runtime.md; nenhum agente executa
 * ainda. O Guardiao e o unico com poder de veto sobre os demais.
 */
const AGENTS = [
  { name: 'Guardiao de Dados', state: 'watch', label: 'vigiando', line: '6 datasets monitorados - 1 bloqueio ativo sobre desempenho' },
  { name: 'Sentinela da Rede', state: 'run', label: 'analisando', line: 'Reclassificando situacoes sobre o snapshot corrente' },
  { name: 'Investigador', state: 'rev', label: 'aguarda revisao', line: 'Dossie pronto - 4 fatos, 3 hipoteses, 2 contra-hipoteses' },
  { name: 'Preparador de Reuniao', state: 'wait', label: 'aguardando dados', line: 'Precisa do calendario letivo para fechar a pauta' },
] as const;

const LEVEL_LABEL: Record<string, string> = {
  critical: 'Crítico',
  attention: 'Atenção',
  low: 'Atenção baixa',
  degraded: 'Degradado',
  unreadable: 'Sem leitura',
};

export default function Hoje() {
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const sigs = useQuery({ queryKey: ['signals'], queryFn: getSignals });
  const lessons = useQuery({ queryKey: ['lessons', 'network'], queryFn: () => getNetworkLessonDelivery(null) });
  const navigate = useNavigate();

  if (!map.data || !sigs.data) return <Loading label="cruzando sinais" />;

  const snap = deriveSnapshot(map.data);
  const attendance = snap.totals.attendance_rate;
  const shortage = snap.totals.teacher_shortage_rate;
  const assessment = snap.totals.assessment_score;
  const cov = map.data.coverage;

  const signals = sigs.data.signals;
  const readable = signals.filter((s) => s.level !== 'unreadable').length;
  const blockedUnits = assessment.blocked;

  return (
    <Pad>
      <StatLine>
        <Stat delta={<em>{pct0(cov.coverage_ratio)} geo</em>} label="Unidades" value={int(cov.total)} />
        {/* Queda de frequência é a má notícia: `worse="low"`. */}
        <Stat
          delta={<StatDelta delta={attendance.delta} worse="low" />}
          label="Frequência"
          value={attendance.value === null ? '—' : pct(attendance.value)}
        />
        {/* Alta de carência é a má notícia: mesma leitura, sinal aritmético oposto. */}
        <Stat
          delta={<StatDelta delta={shortage.delta} worse="high" />}
          label="Carência"
          value={shortage.value === null ? '—' : pct(shortage.value)}
        />
        <Stat
          delta={
            assessment.not_applicable > 0 ? (
              <em>{int(assessment.not_applicable)} não fazem a avaliação</em>
            ) : undefined
          }
          label="Desempenho"
          muted
          value={blockedUnits > 0 ? `${blockedUnits} un. sem leitura` : 'leitura completa'}
        />
      </StatLine>

      <Brief
        eyebrow={`${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })} · rede municipal`}
        headline={
          signals.length === readable
            ? `${signals.length} situações pedem atenção.`
            : `${signals.length} situações pedem atenção. ${signals.length - readable === 1 ? 'Uma delas não pode ser lida.' : `${signals.length - readable} não podem ser lidas.`}`
        }
        size="hero"
      />

      <DerivedNote variant="inline">
        <b>Priorização derivada no cliente.</b> O endpoint governado{' '}
        <Mono>GET /api/v1/network/signals</Mono> ainda não existe. Os cinco
        componentes ficam visíveis em cada sinal — um score único não pode esconder cobertura.
      </DerivedNote>

      <SignalList>
        {signals.map((s, i) => {
          const blocked = s.blocked;
          const index = blocked
            ? '—'
            : String(signals.slice(0, i + 1).filter((x) => !x.blocked).length).padStart(2, '0');
          return (
            <SignalRow
              agent={`${s.agent} · ${s.contributing_indicators.join(' + ')}`}
              blocked={blocked}
              footer={
                blocked ? 'ver o que falta' : `confiança ${Math.round(s.components.confidence * 100)}%`
              }
              index={index}
              key={s.signal_id}
              levelLabel={LEVEL_LABEL[s.level]}
              meta={`${s.meta}${s.blocked_reason ? ` · ${s.blocked_reason}` : ''}`}
              onClick={() => navigate(`/comparar?cre=${s.cre}`)}
              side={
                blocked ? (
                  // Sem `reason` de propósito: a linha inteira é um `<button>`,
                  // e o Tooltip do NoReading traria um `tabIndex` para dentro
                  // dele. O motivo já viaja na `.meta`, ao lado da hachura.
                  <NoReading shape="bar" />
                ) : (
                  // Os cinco micro-medidores continuam bespoke: eles existem
                  // para impedir que um score único esconda cobertura, e cada
                  // faixa carrega rótulo próprio de 8px.
                  <div className="decomp">
                    {COMPONENT_LABELS.map(([key, label]) => (
                      <div className={`dm${key === 'confidence' ? ' conf' : ''}`} key={key}>
                        <div className="lab">{label}</div>
                        <div className="track">
                          <i
                            className="fill"
                            style={{ width: `${Math.round(s.components[key] * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
              title={s.title}
            />
          );
        })}
      </SignalList>

      {lessons.data && (
        <div className="lessonblock">
          <AulaEntregue d={lessons.data} />
          <Note className="lessonorigin mono" mono>
            Fixture derivada da frequência carregada. O campo <b>id_situacao</b> de
            educacao_basica_frequencia__frq_frequencia traz os quatro estados —
            1 prevista, 3 excluído, 4 dada, 6 cancelada — e resolve esta decomposição de forma exata
            quando o dado entrar.
          </Note>
        </div>
      )}

      <div className="agentrail">
        {AGENTS.map((a) => (
          <Card
            eyebrow={a.state === 'run' ? <span className="dotpulse" /> : null}
            key={a.name}
            subtitle={<span className={`stt2 ${a.state}`}>{a.label}</span>}
            title={a.name}
            variant="agent"
          >
            {a.line}
          </Card>
        ))}
      </div>

      <Footnote>
        <span>{int(cov.total - blockedUnits)} unidades com leitura</span>
        <span>{int(blockedUnits)} fora de leitura</span>
        <span>{cov.missing} sem coordenada</span>
        <span>{mapOrigin().note}</span>
      </Footnote>
    </Pad>
  );
}
