import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getSchoolMap, getSchoolProfile } from '../api/client';
import { INDICATORS, INDICATOR_ORDER, attentionOf } from '../domain/indicators';
import { CRE_NAMES } from '../domain/network';
import { Loading } from '../components';

const CW = 640;
const CH = 172;

export default function Escola() {
  const { id = '' } = useParams();
  const profile = useQuery({ queryKey: ['profile', id], queryFn: () => getSchoolProfile(id) });
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });

  const peers = useMemo(() => {
    if (!profile.data || !map.data) return [];
    const me = map.data.features.find((f) => f.properties.identity.school_id === id);
    const size = me?.properties.enrolment ?? 500;
    return map.data.features
      .filter(
        (f) =>
          f.properties.identity.cre === profile.data!.identity.cre &&
          f.properties.identity.school_id !== id &&
          Math.abs((f.properties.enrolment ?? 500) - size) / size < 0.25,
      )
      .slice(0, 4);
  }, [profile.data, map.data, id]);

  if (profile.isLoading || map.isLoading) return <Loading />;
  if (!profile.data) {
    return (
      <div className="statepage">
        <div className="k">escola</div>
        <h2>Escola não encontrada neste snapshot.</h2>
        <p>
          O identificador <span className="mono">{id}</span> não existe no conjunto carregado. Isso não significa que a unidade não
          exista na rede — significa que ela não está neste recorte.
        </p>
      </div>
    );
  }

  const p = profile.data;
  const att = p.metrics.attendance_rate;
  const series = att?.series ?? null;
  const me = map.data?.features.find((f) => f.properties.identity.school_id === id);

  // faixa dos pares: min/max dos pares legíveis no valor corrente
  const peerVals = peers
    .map((f) => f.properties.metrics.attendance_rate)
    .filter((m) => m && m.value !== null && m.quality_status !== 'BLOCKED')
    .map((m) => m!.value!);
  const peerMin = peerVals.length ? Math.min(...peerVals) : null;
  const peerMax = peerVals.length ? Math.max(...peerVals) : null;

  const bounds = (() => {
    const vals = [...(series ?? []), ...(peerVals ?? [])].filter((v) => Number.isFinite(v));
    if (!vals.length) return [0.85, 0.98] as const;
    const lo = Math.min(...vals) - 0.012;
    const hi = Math.max(...vals) + 0.012;
    return [lo, hi] as const;
  })();
  const yOf = (v: number) => CH - 48 - ((v - bounds[0]) / (bounds[1] - bounds[0])) * (CH - 70);
  const xOf = (i: number, n: number) => 42 + (i / Math.max(1, n - 1)) * (CW - 62);

  return (
    <div>
      <div className="idhead">
        <div>
          <h2>{p.identity.nome}</h2>
          <div className="codes">
            <span>{p.identity.school_id}</span>
            {p.identity.inep_id && <span>INEP {p.identity.inep_id}</span>}
            {p.identity.sme_designation && <span>SME {p.identity.sme_designation}</span>}
            <span>
              {p.identity.cre}ª CRE · {CRE_NAMES[p.identity.cre]}
            </span>
            {p.identity.bairro && <span>{p.identity.bairro}</span>}
            {me?.properties.enrolment && <span>{me.properties.enrolment} matrículas</span>}
          </div>
        </div>
        <div className="matchbox">
          <div className="k mono" style={{ fontSize: 9, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            Origem da localização
          </div>
          <div className="val">{p.location.quality === 'SYNTHETIC' ? 'sintética' : p.location.quality}</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>
            match {p.location.match_method.toLowerCase()}
          </div>
        </div>
      </div>

      <div className="schoolgrid">
        <div className="schoolmain">
          <div className="chartblock">
            <div className="ct">
              <h5>Taxa de frequência · 12 meses</h5>
              <span className="cs">
                {att?.formula_version ?? '—'} · {att?.evidence_id ? att.evidence_id.slice(0, 34) + '…' : 'sem evidência'}
              </span>
            </div>
            {series ? (
              <svg viewBox={`0 0 ${CW} ${CH}`} width="100%" height={CH} role="img" aria-label="Série mensal de frequência">
                {[0, 0.5, 1].map((t) => {
                  const v = bounds[0] + t * (bounds[1] - bounds[0]);
                  return (
                    <g key={t}>
                      <line x1="42" y1={yOf(v)} x2={CW - 20} y2={yOf(v)} stroke="var(--line)" strokeWidth="1" />
                      <text x="6" y={yOf(v) + 3} fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--ink-3)">
                        {(v * 100).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}
                {peerMin !== null && peerMax !== null && (
                  <>
                    <rect
                      x="42"
                      y={yOf(peerMax)}
                      width={CW - 62}
                      height={Math.max(2, yOf(peerMin) - yOf(peerMax))}
                      fill="var(--ink-3)"
                      opacity="0.09"
                    />
                    <text
                      x={CW - 22}
                      y={yOf(peerMax) - 5}
                      textAnchor="end"
                      fontFamily="IBM Plex Mono, monospace"
                      fontSize="9"
                      fill="var(--ink-3)"
                    >
                      faixa dos pares comparáveis
                    </text>
                  </>
                )}
                <polyline
                  points={series.map((v, i) => `${xOf(i, series.length)},${yOf(v)}`).join(' ')}
                  fill="none"
                  stroke={attentionOf(att) === 'critical' ? 'var(--a3)' : attentionOf(att) === 'attention' ? 'var(--a2)' : 'var(--ink-2)'}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle
                  cx={xOf(series.length - 1, series.length)}
                  cy={yOf(series[series.length - 1])}
                  r="4.5"
                  fill={attentionOf(att) === 'critical' ? 'var(--a3)' : 'var(--ink-2)'}
                  stroke="var(--paper)"
                  strokeWidth="2"
                />
                <text
                  x={xOf(series.length - 1, series.length) - 8}
                  y={yOf(series[series.length - 1]) + 18}
                  textAnchor="end"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="11"
                  fill={attentionOf(att) === 'critical' ? 'var(--a3)' : 'var(--ink-2)'}
                >
                  {INDICATORS.attendance_rate.format(series[series.length - 1])}
                </text>
                {series.map((_, i) => (
                  <rect
                    key={i}
                    x={xOf(i, series.length) - 16}
                    y={CH - 11}
                    width="32"
                    height="3"
                    fill={i >= 10 ? 'var(--a2)' : 'var(--ink-4)'}
                  />
                ))}
                <text x="6" y={CH - 7} fontFamily="IBM Plex Mono, monospace" fontSize="7" fill="var(--ink-3)">
                  COB.
                </text>
                {['ago 25', 'nov 25', 'fev 26', 'mai 26', 'jul 26'].map((label, i) => (
                  <text
                    key={label}
                    x={xOf([0, 3, 6, 9, 11][i], 12)}
                    y={CH - 26}
                    textAnchor={i === 4 ? 'end' : 'middle'}
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize="8"
                    fill="var(--ink-3)"
                  >
                    {label}
                  </text>
                ))}
              </svg>
            ) : (
              <div style={{ padding: '18px 0' }}>
                <span className="blockcell" style={{ width: 120 }} />
                <p className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10, lineHeight: 1.6 }}>
                  Série temporal não faz parte do contrato atual de <span style={{ color: 'var(--ink-2)' }}>/api/v1/schools/&#123;id&#125;/profile</span>.
                  A tela não desenha uma linha que o backend não devolveu.
                </p>
              </div>
            )}
          </div>

          <div className="chartblock">
            <div className="ct">
              <h5>Pares comparáveis — não é um ranking</h5>
              <span className="cs">mesma CRE · porte ±25% · critério visível</span>
            </div>
            {[me, ...peers].filter(Boolean).map((f, i) => {
              const m = f!.properties.metrics.attendance_rate;
              const blocked = !m || m.value === null || m.quality_status === 'BLOCKED';
              const spec = INDICATORS.attendance_rate;
              const w = blocked ? 0 : ((m!.value! - spec.scale[0]) / (spec.scale[1] - spec.scale[0])) * 100;
              return (
                <div
                  key={f!.properties.identity.school_id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 58px',
                    gap: 12,
                    alignItems: 'center',
                    padding: '6px 0',
                    fontSize: 12.5,
                    color: i === 0 ? 'var(--ink)' : 'var(--ink-2)',
                    fontWeight: i === 0 ? 600 : 400,
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {i === 0 ? f!.properties.identity.nome : `${f!.properties.identity.nome} · ${f!.properties.enrolment} matr.`}
                  </span>
                  <span className="bar" style={{ width: 120, height: 5 }}>
                    <i
                      className={i === 0 ? attentionOf(m) : ''}
                      style={{ width: `${w}%`, background: i === 0 ? undefined : 'var(--ink-4)' }}
                    />
                  </span>
                  <span className="num mut" style={{ textAlign: 'right' }}>
                    {blocked ? '—' : spec.format(m!.value!)}
                  </span>
                </div>
              );
            })}
            {peers.length === 0 && (
              <p className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 8 }}>
                Nenhum par de porte semelhante nesta CRE dentro do recorte carregado.
              </p>
            )}
          </div>
        </div>

        <div className="qpanel">
          <h5>Qualidade por indicador</h5>
          {INDICATOR_ORDER.map((iid) => {
            const m = p.metrics[iid];
            const s = !m || m.value === null ? 'blk' : m.quality_status === 'DEGRADED' ? 'deg' : 'ok';
            return (
              <div className="qrow" key={iid}>
                <span className="nm">{INDICATORS[iid].label}</span>
                <span className="num mut" style={{ fontSize: 11 }}>
                  {m?.coverage != null ? `${(m.coverage * 100).toFixed(0)}%` : '—'}
                </span>
                <span className={`stt ${s}`}>{s === 'ok' ? 'OK' : s === 'deg' ? 'Degradado' : 'Bloqueado'}</span>
              </div>
            );
          })}

          <h5 style={{ marginTop: 24 }}>Proveniência</h5>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', lineHeight: 1.8 }}>
            <div>snapshot {p.snapshot_id.slice(0, 16)}…</div>
            <div>fonte {p.provenance.source_kind}</div>
            <div>cenário {p.provenance.scenario_reference ?? '—'}</div>
            <div>semente {p.provenance.generation_seed ?? '—'}</div>
          </div>
          {p.provenance.limitations.map((l) => (
            <p key={l} style={{ fontSize: 11.5, color: 'var(--ink-2)', marginTop: 10, lineHeight: 1.5 }}>
              {l}
            </p>
          ))}

          <Link className="btn" to={`/comparar?cre=${p.identity.cre}`}>
            Comparar na {p.identity.cre}ª CRE
          </Link>
        </div>
      </div>
    </div>
  );
}
