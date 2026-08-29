import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getSchoolMap } from '../api/client';
import type { IndicatorId, SchoolMapFeature } from '../api/types';
import { INDICATORS, INDICATOR_ORDER, attentionOf, thresholdLegend } from '../domain/indicators';
import { CRE_NAMES } from '../domain/network';
import { centroid, convexHull, makeProjection, shrink, toPath, type Point } from '../domain/geo';
import { Loading } from '../components';

const W = 1600;
const H = 640;

const FILL: Record<string, string> = {
  none: 'var(--ink-4)',
  low: 'var(--a1)',
  attention: 'var(--a2)',
  critical: 'var(--a3)',
  degraded: 'var(--a1)',
};

export default function Mapa() {
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const [params, setParams] = useSearchParams();
  const [indicator, setIndicator] = useState<IndicatorId>('attendance_rate');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const creFilter = params.get('cre') ? Number(params.get('cre')) : null;

  const geo = useMemo(() => {
    if (!map.data) return null;
    const proj = makeProjection(map.data.features, W, H);
    const byCre = new Map<number, Point[]>();
    for (const f of map.data.features) {
      const p: Point = [proj.x(f.geometry.coordinates[0]), proj.y(f.geometry.coordinates[1])];
      const l = byCre.get(f.properties.identity.cre);
      if (l) l.push(p);
      else byCre.set(f.properties.identity.cre, [p]);
    }
    const regions = [...byCre.entries()]
      .map(([cre, pts]) => {
        const hull = shrink(convexHull(pts));
        return { cre, path: toPath(hull), label: centroid(hull) };
      })
      .sort((a, b) => a.cre - b.cre);
    return { proj, regions };
  }, [map.data]);

  if (!map.data || !geo) return <Loading />;

  const spec = INDICATORS[indicator];
  const features = map.data.features;
  const matches =
    q.trim().length >= 2
      ? features
          .filter((f) => {
            const t = q.toLowerCase();
            const id = f.properties.identity;
            return (
              id.nome.toLowerCase().includes(t) ||
              (id.bairro ?? '').toLowerCase().includes(t) ||
              id.school_id.toLowerCase().includes(t) ||
              (id.inep_id ?? '').includes(t) ||
              (id.sme_designation ?? '').includes(t)
            );
          })
          .slice(0, 8)
      : [];

  const sel = selected ? features.find((f) => f.properties.identity.school_id === selected) : null;
  const counts = { none: 0, low: 0, attention: 0, critical: 0, degraded: 0, unreadable: 0 };
  for (const f of features) counts[attentionOf(f.properties.metrics[indicator])] += 1;

  const dim = (f: SchoolMapFeature) => creFilter !== null && f.properties.identity.cre !== creFilter;

  return (
    <div>
      <div className="filterbar">
        <span className="ctl">
          <span>Indicador</span>
          <select value={indicator} onChange={(e) => setIndicator(e.target.value as IndicatorId)}>
            {INDICATOR_ORDER.map((id) => (
              <option key={id} value={id}>
                {INDICATORS[id].label}
              </option>
            ))}
          </select>
        </span>
        <span className="ctl">
          <span>Recorte</span>
          <select value={creFilter ?? ''} onChange={(e) => setParams(e.target.value ? { cre: e.target.value } : {})}>
            <option value="">todas as CREs</option>
            {geo.regions.map((r) => (
              <option key={r.cre} value={r.cre}>
                {r.cre}ª CRE · {CRE_NAMES[r.cre]}
              </option>
            ))}
          </select>
        </span>
        {creFilter && (
          <Link className="ctl" to={`/comparar?cre=${creFilter}`} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
            comparar a {creFilter}ª CRE →
          </Link>
        )}
        <span className="right">
          {map.data.coverage.geolocated.toLocaleString('pt-BR')} no mapa · {map.data.coverage.missing} sem coordenada
        </span>
      </div>

      <div className="mapstage">
        <div className="mapsearch">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5L21 21" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar escola, bairro, INEP ou designação"
            aria-label="Buscar escola"
          />
          <span className="kbd">⌘K</span>
          {matches.length > 0 && (
            <div className="results">
              {matches.map((f) => (
                <button
                  key={f.properties.identity.school_id}
                  type="button"
                  onClick={() => {
                    setSelected(f.properties.identity.school_id);
                    setQ('');
                  }}
                >
                  {f.properties.identity.nome}
                  <span className="rc">
                    {f.properties.identity.cre}ª CRE · {f.properties.identity.bairro} · {f.properties.identity.school_id}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <svg className="mapsvg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mapa da rede por CRE">
          <rect width={W} height={H} fill="var(--tint)" />
          {geo.regions.map((r) => (
            <path
              key={r.cre}
              d={r.path}
              fill={creFilter === r.cre ? 'var(--focus-tint)' : 'var(--paper)'}
              stroke={creFilter === r.cre ? 'var(--a2)' : 'var(--line-2)'}
              strokeWidth={creFilter === r.cre ? 1.6 : 1}
              onClick={() => setParams(creFilter === r.cre ? {} : { cre: String(r.cre) })}
              style={{ cursor: 'pointer' }}
            />
          ))}
          {geo.regions.map((r) => (
            <text
              key={`l-${r.cre}`}
              x={r.label[0]}
              y={r.label[1]}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="19"
              fontWeight="500"
              fill={creFilter === r.cre ? 'var(--a2)' : 'var(--ink-3)'}
              opacity={creFilter && creFilter !== r.cre ? 0.35 : 0.9}
              pointerEvents="none"
            >
              {r.cre}ª
            </text>
          ))}
          {features.map((f) => {
            const a = attentionOf(f.properties.metrics[indicator]);
            const cx = geo.proj.x(f.geometry.coordinates[0]);
            const cy = geo.proj.y(f.geometry.coordinates[1]);
            const r = 2.6 + Math.min(2.8, (f.properties.enrolment ?? 400) / 400);
            const faded = dim(f);
            if (a === 'unreadable') {
              return (
                <circle
                  key={f.properties.identity.school_id}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="var(--line-3)"
                  strokeWidth="1.1"
                  strokeDasharray="2 2"
                  opacity={faded ? 0.25 : 1}
                />
              );
            }
            return (
              <circle
                key={f.properties.identity.school_id}
                cx={cx}
                cy={cy}
                r={r}
                fill={FILL[a]}
                opacity={faded ? 0.18 : a === 'none' ? 0.5 : 1}
                onClick={() => setSelected(f.properties.identity.school_id)}
                style={{ cursor: 'pointer' }}
              >
                <title>{`${f.properties.identity.nome} — ${spec.label}: ${
                  f.properties.metrics[indicator]?.value != null ? spec.format(f.properties.metrics[indicator]!.value!) : 'sem leitura'
                }`}</title>
              </circle>
            );
          })}
          {sel && (
            <circle
              cx={geo.proj.x(sel.geometry.coordinates[0])}
              cy={geo.proj.y(sel.geometry.coordinates[1])}
              r="11"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.3"
            />
          )}
        </svg>

        {sel && (
          <aside className="mapaside">
            <div className="k">Escola selecionada</div>
            <h5>{sel.properties.identity.nome}</h5>
            <div className="codes">
              <span>{sel.properties.identity.school_id}</span>
              <span>{sel.properties.identity.cre}ª CRE</span>
              {sel.properties.identity.bairro && <span>{sel.properties.identity.bairro}</span>}
            </div>
            {INDICATOR_ORDER.map((id) => {
              const m = sel.properties.metrics[id];
              const blocked = !m || m.value === null;
              return (
                <div className="mrow" key={id}>
                  <span>{INDICATORS[id].label}</span>
                  <span className={`v${blocked ? ' mut' : ''}`}>
                    {blocked ? 'sem leitura' : INDICATORS[id].format(m!.value!)}
                  </span>
                </div>
              );
            })}
            <Link className="btn" to={`/escola/${sel.properties.identity.school_id}`}>
              Abrir Escola 360
            </Link>
            <button className="btn ghost" type="button" onClick={() => setSelected(null)}>
              Limpar seleção
            </button>
          </aside>
        )}

        <div className="maplegend">
          <span>
            <i style={{ background: 'var(--ink-4)' }} />
            sem sinal {counts.none}
          </span>
          <span>
            <i style={{ background: 'var(--a1)' }} />
            baixa {counts.low + counts.degraded}
          </span>
          <span>
            <i style={{ background: 'var(--a2)' }} />
            atenção {counts.attention}
          </span>
          <span>
            <i style={{ background: 'var(--a3)' }} />
            crítico {counts.critical}
          </span>
          <span>
            <i className="hatch" />
            sem leitura {counts.unreadable}
          </span>
          <span className="rule">
            {spec.label}: {thresholdLegend(spec)} · regiões são o casco convexo dos pontos de cada CRE, não a fronteira oficial
          </span>
        </div>
      </div>
    </div>
  );
}
