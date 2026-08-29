import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getSchoolMap, getSituations, mapOrigin } from '../api/client';
import { getNetworkLessonDelivery } from '../api/turmas';
import AulaEntregue from '../components/AulaEntregue';
import { deriveSnapshot } from '../domain/network';
import { Loading } from '../components';

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
  const sits = useQuery({ queryKey: ['situations'], queryFn: getSituations });
  const lessons = useQuery({ queryKey: ['lessons', 'network'], queryFn: () => getNetworkLessonDelivery(null) });
  const navigate = useNavigate();

  if (!map.data || !sits.data) return <Loading />;

  const snap = deriveSnapshot(map.data);
  const attendance = snap.totals.attendance_rate;
  const shortage = snap.totals.teacher_shortage_rate;
  const assessment = snap.totals.assessment_score;
  const cov = map.data.coverage;

  const readable = sits.data.filter((s) => s.level !== 'unreadable').length;
  const blockedUnits = assessment.blocked;

  return (
    <div className="pad">
      <div className="stateline">
        <div className="st">
          <div className="k">Unidades</div>
          <div className="v">
            {cov.total.toLocaleString('pt-BR')}
            <em>{(cov.coverage_ratio * 100).toFixed(0)}% geo</em>
          </div>
        </div>
        <div className="st">
          <div className="k">Frequência</div>
          <div className="v">
            {attendance.value === null ? '—' : `${(attendance.value * 100).toFixed(1).replace('.', ',')}%`}
            {attendance.delta !== null &&
              (Math.abs(attendance.delta) < 0.003 ? (
                <em>estável</em>
              ) : (
                <em className={attendance.delta < 0 ? 'bad' : ''}>
                  {attendance.delta < 0 ? '▼' : '▲'} {Math.abs(attendance.delta * 100).toFixed(1).replace('.', ',')} pp
                </em>
              ))}
          </div>
        </div>
        <div className="st">
          <div className="k">Carência</div>
          <div className="v">
            {shortage.value === null ? '—' : `${(shortage.value * 100).toFixed(1).replace('.', ',')}%`}
            {shortage.delta !== null &&
              (Math.abs(shortage.delta) < 0.003 ? (
                <em>estável</em>
              ) : (
                <em className={shortage.delta > 0 ? 'bad' : ''}>
                  {shortage.delta > 0 ? '▲' : '▼'} {Math.abs(shortage.delta * 100).toFixed(1).replace('.', ',')} pp
                </em>
              ))}
          </div>
        </div>
        <div className="st mut">
          <div className="k">Desempenho</div>
          <div className="v">{blockedUnits > 0 ? `${blockedUnits} un. sem leitura` : 'leitura completa'}</div>
        </div>
      </div>

      <div className="brief">
        <div className="when">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })} · rede
          municipal
        </div>
        <h2>
          {sits.data.length === readable
            ? `${sits.data.length} situações mudaram.`
            : `${sits.data.length} situações mudaram. ${sits.data.length - readable === 1 ? 'Uma delas não pode ser lida.' : `${sits.data.length - readable} não podem ser lidas.`}`}
        </h2>
      </div>

      <div className="sits">
        {sits.data.map((s, i) => {
          const blocked = s.level === 'unreadable';
          const index = blocked ? '—' : String(sits.data.slice(0, i + 1).filter((x) => x.level !== 'unreadable').length).padStart(2, '0');
          return (
            <button
              key={s.id}
              type="button"
              className={`sit${blocked ? ' blocked' : ''}`}
              onClick={() => (s.cre ? navigate(`/comparar?cre=${s.cre}`) : undefined)}
            >
              <div className={`n${blocked ? ' void' : ''}`}>{index}</div>
              <div>
                <h4>{s.title}</h4>
                <div className="meta">
                  {s.meta}
                  {s.blockedReason ? ` · ${s.blockedReason}` : ''}
                </div>
                <span className="agentchip">
                  <i />
                  {s.agent}
                </span>
              </div>
              <div className="side">
                {blocked ? (
                  <span className="hatchbar" />
                ) : (
                  <span className={`gauge ${s.level}`}>
                    <i style={{ width: `${Math.round((s.confidence ?? 0.5) * 100)}%` }} />
                  </span>
                )}
                <div className="glab">
                  <span>{LEVEL_LABEL[s.level]}</span>
                  <b>{s.confidence === null ? 'ver o que falta' : `confiança ${Math.round(s.confidence * 100)}%`}</b>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {lessons.data && (
        <div className="lessonblock">
          <AulaEntregue d={lessons.data} />
          <p className="lessonorigin mono">
            Fixture derivada da frequência carregada. O campo <b>id_situacao</b> de
            educacao_basica_frequencia__frq_frequencia traz os quatro estados —
            1 prevista, 3 excluído, 4 dada, 6 cancelada — e resolve esta decomposição de forma exata
            quando o dado entrar.
          </p>
        </div>
      )}

      <div className="agentrail">
        {AGENTS.map((a) => (
          <div className="agentcard" key={a.name}>
            <div className="top">
              {a.state === 'run' ? <span className="dotpulse" /> : null}
              <span className="nm">{a.name}</span>
              <span className={`stt2 ${a.state}`}>{a.label}</span>
            </div>
            <div className="ln">{a.line}</div>
          </div>
        ))}
      </div>

      <div className="footnote">
        <span>{(cov.total - blockedUnits).toLocaleString('pt-BR')} unidades com leitura</span>
        <span>{blockedUnits.toLocaleString('pt-BR')} fora de leitura</span>
        <span>{cov.missing} sem coordenada</span>
        <span>{mapOrigin().note}</span>
      </div>
    </div>
  );
}
