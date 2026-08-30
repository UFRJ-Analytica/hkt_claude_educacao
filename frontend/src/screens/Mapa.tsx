import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getSchoolMap } from '../api/client';
import { getSchoolContext } from '../api/analytics';
import type { IndicatorId, SchoolMapFeature } from '../api/types';
import {
  INDICATORS,
  INDICATOR_ORDER,
  attentionOf,
  isNotApplicable,
  thresholdLegend,
  type Attention,
} from '../domain/indicators';
import { RIO_SOURCE } from '../domain/rio-geometry';
import {
  HOME,
  clampView,
  fitPoints,
  landPath,
  project,
  type Frame,
  type Viewport,
} from '../domain/projection';
import { Loading } from '../components';
import { takesAdr } from '../api/turmas';

const FILL: Record<Attention, string> = {
  none: 'var(--ink-4)',
  low: 'var(--a1)',
  attention: 'var(--a2)',
  critical: 'var(--a3)',
  degraded: 'var(--a1)',
  unreadable: 'transparent',
};
const ORDER: Attention[] = ['none', 'degraded', 'low', 'attention', 'critical', 'unreadable'];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

export default function Mapa() {
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const [params, setParams] = useSearchParams();
  const [indicator, setIndicator] = useState<IndicatorId>('attendance_rate');
  const [q, setQ] = useState('');
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const selectedContext = useQuery({
    queryKey: ['context', selected],
    queryFn: () => getSchoolContext(selected!),
    enabled: selected !== null,
  });
  const [hover, setHover] = useState<SchoolMapFeature | null>(null);
  const [view, setView] = useState<Viewport>(HOME);
  const [frame, setFrame] = useState<Frame>({ width: 1200, height: 640 });

  const boxRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number; moved: boolean } | null>(null);
  const anim = useRef<number | null>(null);

  const creFilter = params.get('cre') ? Number(params.get('cre')) : null;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setFrame({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const flyTo = useCallback(
    (target: Viewport) => {
      if (anim.current) cancelAnimationFrame(anim.current);
      const from = view;
      const t0 = performance.now();
      const step = (now: number) => {
        const k = easeInOut(Math.min(1, (now - t0) / 620));
        setView({
          cx: from.cx + (target.cx - from.cx) * k,
          cy: from.cy + (target.cy - from.cy) * k,
          zoom: from.zoom * (target.zoom / from.zoom) ** k,
        });
        if (k < 1) anim.current = requestAnimationFrame(step);
      };
      anim.current = requestAnimationFrame(step);
    },
    [view],
  );

  const features = useMemo(() => map.data?.features ?? [], [map.data]);
  const proj = useMemo(() => project(view, frame), [view, frame]);

  /** Tipos de equipamento vindos da release oficial — dado real, nao rotulo nosso. */
  const typeCatalog = useMemo(() => {
    const m = new Map<string, number>();
    for (const f of features) {
      const t = f.properties.identity.school_type;
      if (t) m.set(t, (m.get(t) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [features]);

  const typeMatch = (f: SchoolMapFeature) =>
    types.size === 0 || types.has(f.properties.identity.school_type ?? '');

  const byCre = useMemo(() => {
    const m = new Map<number, SchoolMapFeature[]>();
    for (const f of features) {
      const k = f.properties.identity.cre;
      const l = m.get(k);
      if (l) l.push(f);
      else m.set(k, [f]);
    }
    return [...m.entries()].sort((a, b) => a[0] - b[0]);
  }, [features]);

  const focusCre = useCallback(
    (cre: number | null) => {
      setSelected(null);
      setParams(cre ? { cre: String(cre) } : {});
      if (cre === null) {
        flyTo(HOME);
        return;
      }
      const pts = features
        .filter((f) => f.properties.identity.cre === cre)
        .map((f) => f.geometry.coordinates);
      flyTo(fitPoints(pts, frame));
    },
    [features, frame, flyTo, setParams],
  );

  if (!map.data) return <Loading />;

  const spec = INDICATORS[indicator];

  const matches =
    q.trim().length >= 2
      ? features
          .filter((f) => {
            const t = q.toLowerCase();
            const id = f.properties.identity;
            return (
              id.nome.toLowerCase().includes(t) ||
              (id.bairro ?? '').toLowerCase().includes(t) ||
              (id.school_type ?? '').toLowerCase().includes(t) ||
              id.school_id.toLowerCase().includes(t) ||
              (id.inep_id ?? '').includes(t) ||
              (id.sme_designation ?? '').includes(t)
            );
          })
          .slice(0, 7)
      : [];

  const sel = selected ? features.find((f) => f.properties.identity.school_id === selected) ?? null : null;

  const shown = features.filter(typeMatch);
  const counts: Record<Attention, number> = {
    none: 0, low: 0, attention: 0, critical: 0, degraded: 0, unreadable: 0,
  };
  // "não se aplica" e "sem leitura" caem os dois em `unreadable` na cor, porque
  // nos dois casos não há número a pintar. Na legenda eles se separam: um é
  // fato consumado, o outro é lacuna a cobrar.
  let notApplicable = 0;
  for (const f of shown) {
    const m = f.properties.metrics[indicator];
    counts[attentionOf(m)] += 1;
    if (isNotApplicable(m)) notApplicable += 1;
  }

  // desenha do menos ao mais grave: o que pede atencao fica por cima
  const ordered = [...shown].sort(
    (a, b) =>
      ORDER.indexOf(attentionOf(a.properties.metrics[indicator])) -
      ORDER.indexOf(attentionOf(b.properties.metrics[indicator])),
  );

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const anchor = proj.invert(px, py);
    const next = Math.min(14, Math.max(0.9, view.zoom * Math.exp(-e.deltaY * 0.0016)));
    const k = next / view.zoom;
    setView(
      clampView(
        {
          zoom: next,
          cx: anchor.mx + (view.cx - anchor.mx) / k,
          cy: anchor.my + (view.cy - anchor.my) / k,
        },
        frame,
      ),
    );
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, cx: view.cx, cy: view.cy, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    setView(clampView({ zoom: view.zoom, cx: d.cx - dx / proj.scale, cy: d.cy - dy / proj.scale }, frame));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const zoomBy = (k: number) => setView(clampView({ ...view, zoom: view.zoom * k }, frame));

  return (
    <div className="mapscreen">
      <aside className="mapside">
        <div className="mapsearch">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5L21 21" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar escola, bairro ou código"
            aria-label="Buscar escola"
          />
          {q && (
            <button type="button" className="clear" onClick={() => setQ('')} aria-label="Limpar busca">
              ×
            </button>
          )}
          {matches.length > 0 && (
            <div className="results">
              {matches.map((f) => (
                <button
                  key={f.properties.identity.school_id}
                  type="button"
                  onClick={() => {
                    setSelected(f.properties.identity.school_id);
                    setQ('');
                    flyTo(fitPoints([f.geometry.coordinates], frame, 42));
                  }}
                >
                  <span className="rn">{f.properties.identity.nome}</span>
                  <span className="rc">
                    {f.properties.identity.cre}ª CRE · {f.properties.identity.school_type ?? f.properties.identity.bairro ?? '—'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="sectionlabel">Indicador no mapa</div>
        <div className="segmented">
          {INDICATOR_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              className={indicator === id ? 'on' : ''}
              onClick={() => setIndicator(id)}
            >
              {INDICATORS[id].short}
            </button>
          ))}
        </div>

        {typeCatalog.length > 1 && (
          <>
            <div className="sectionlabel">
              Tipo de unidade
              {types.size > 0 && (
                <button type="button" className="linkish" onClick={() => setTypes(new Set())}>
                  limpar
                </button>
              )}
            </div>
            <div className="typelist">
              {typeCatalog.map(([t, n]) => (
                <button
                  key={t}
                  type="button"
                  className={`typerow${types.has(t) ? ' on' : ''}`}
                  onClick={() => {
                    const next = new Set(types);
                    if (next.has(t)) next.delete(t);
                    else next.add(t);
                    setTypes(next);
                  }}
                >
                  <span className="tt">{t}</span>
                  <span className="tn">{n}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="sectionlabel">
          Coordenadorias
          {creFilter && (
            <button type="button" className="linkish" onClick={() => focusCre(null)}>
              ver todas
            </button>
          )}
        </div>
        <div className="crelist">
          {byCre.map(([cre, list]) => {
            const scoped = list.filter(typeMatch);
            const flagged = scoped.filter((f) => {
              const a = attentionOf(f.properties.metrics[indicator]);
              return a === 'attention' || a === 'critical';
            }).length;
            const share = scoped.length ? flagged / scoped.length : 0;
            return (
              <button
                key={cre}
                type="button"
                className={`crerow${creFilter === cre ? ' on' : ''}`}
                onClick={() => focusCre(creFilter === cre ? null : cre)}
              >
                <span className="cn">{cre}ª</span>
                <span className="cl">
                  <span className="ct">{scoped.length} unidades</span>
                  {share > 0 && (
                    <span className="cb">
                      <i style={{ width: `${Math.max(6, Math.round(share * 100))}%` }} />
                    </span>
                  )}
                </span>
                <span className="cv">{flagged || '—'}</span>
              </button>
            );
          })}
        </div>
        <p className="sidenote">
          A contagem à direita é o número de unidades em atenção ou crítico para o indicador
          selecionado. Limiares publicados na legenda do mapa.
        </p>
      </aside>

      <div
        className="mapcanvas"
        ref={boxRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg width={frame.width} height={frame.height} role="img" aria-label="Mapa do município do Rio de Janeiro">
          <defs>
            <filter id="landshadow" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="3" stdDeviation="7" floodColor="#0e1315" floodOpacity="0.13" />
            </filter>
          </defs>
          <rect width={frame.width} height={frame.height} fill="var(--water)" />
          <path d={landPath(proj)} fill="var(--land)" stroke="var(--coast)" strokeWidth="1" filter="url(#landshadow)" />

          {ordered.map((f) => {
            const a = attentionOf(f.properties.metrics[indicator]);
            const dim = creFilter !== null && f.properties.identity.cre !== creFilter;
            const cx = proj.x(f.geometry.coordinates[0]);
            const cy = proj.y(f.geometry.coordinates[1]);
            if (cx < -20 || cy < -20 || cx > frame.width + 20 || cy > frame.height + 20) return null;
            const base = 2.2 + Math.min(3, (f.properties.enrolment ?? 400) / 330);
            const r = base * Math.min(1.9, 0.85 + view.zoom * 0.16);
            const isSel = sel?.properties.identity.school_id === f.properties.identity.school_id;
            return (
              <circle
                key={f.properties.identity.school_id}
                cx={cx}
                cy={cy}
                r={r}
                className={`dot${dim ? ' dim' : ''}${isSel ? ' sel' : ''}`}
                fill={a === 'unreadable' ? 'none' : FILL[a]}
                stroke={a === 'unreadable' ? 'var(--line-3)' : 'var(--land)'}
                strokeWidth={a === 'unreadable' ? 1.1 : 0.7}
                strokeDasharray={a === 'unreadable' ? '2 2' : undefined}
                onPointerEnter={() => setHover(f)}
                onPointerLeave={() => setHover(null)}
                onClick={() => {
                  if (!drag.current?.moved) setSelected(f.properties.identity.school_id);
                }}
              />
            );
          })}

          {sel && (
            <circle
              cx={proj.x(sel.geometry.coordinates[0])}
              cy={proj.y(sel.geometry.coordinates[1])}
              r={15}
              className="selring"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.4"
            />
          )}
        </svg>

        {hover && (
          <div
            className="maptip"
            style={{
              left: Math.min(frame.width - 220, proj.x(hover.geometry.coordinates[0]) + 14),
              top: Math.max(8, proj.y(hover.geometry.coordinates[1]) - 46),
            }}
          >
            <b>{hover.properties.identity.nome}</b>
            <span>
              {spec.label}:{' '}
              {hover.properties.metrics[indicator]?.value != null
                ? spec.format(hover.properties.metrics[indicator]!.value!)
                : 'sem leitura'}
            </span>
          </div>
        )}

        <div className="mapzoom">
          <button type="button" onClick={() => zoomBy(1.55)} aria-label="Aproximar">+</button>
          <button type="button" onClick={() => zoomBy(1 / 1.55)} aria-label="Afastar">−</button>
          <button type="button" onClick={() => flyTo(HOME)} aria-label="Enquadrar cidade">⤢</button>
        </div>

        {sel && (
          <aside className="mapcard mapcard-context">
            <button type="button" className="cardclose" onClick={() => setSelected(null)} aria-label="Fechar">×</button>
            <div className="k">Unidade real selecionada</div>
            <h5>{sel.properties.identity.nome}</h5>
            <div className="codes">
              <span>{sel.properties.identity.cre}ª CRE</span>
              {sel.properties.identity.school_type && <span>{sel.properties.identity.school_type}</span>}
              {sel.properties.identity.sme_designation && (
                <span>SME {sel.properties.identity.sme_designation}</span>
              )}
              <span className="realtag">identidade real</span>
            </div>

            {/* O ponto no mapa já está pintado por um indicador desta unidade.
                Dizer aqui "sem indicadores" enquanto a cor afirma o contrário é
                incoerente — o card mostra os mesmos números que pintaram o dot. */}
            <div className="selmetrics">
              {INDICATOR_ORDER.map((iid) => {
                const m = sel.properties.metrics[iid];
                const spec = INDICATORS[iid];
                const blocked = !m || m.value === null;
                return (
                  <div className="selrow" key={iid}>
                    <span className="nm">{spec.label}</span>
                    {blocked ? (
                      <span className="hatchbar mini" />
                    ) : (
                      <span className="bar mini">
                        <i
                          className={attentionOf(m)}
                          style={{
                            width: `${Math.max(0, Math.min(1, (m.value! - spec.scale[0]) / (spec.scale[1] - spec.scale[0]))) * 100}%`,
                          }}
                        />
                      </span>
                    )}
                    <span className={`mono sv${blocked ? ' off' : ''}`}>
                      {isNotApplicable(m)
                        ? 'não se aplica'
                        : blocked
                          ? 'sem leitura'
                          : spec.format(m.value!)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="covermini">
              <span className="mono">
                {selectedContext.isFetching ? 'carregando contexto…' : 'indicadores de demonstração'}
              </span>
              <p>
                {selectedContext.data?.metric_coverage.status === 'IDENTITY_ONLY'
                  ? 'Identidade, CRE, tipo e coordenada são reais. O snapshot do backend não tem métrica para este identificador — os números acima vêm da camada de demonstração local, a mesma que define a cor do ponto.'
                  : (selectedContext.data?.metric_coverage.message ??
                    'Identidade, CRE, tipo e coordenada vêm do cadastro real. Os indicadores acima são de demonstração.')}
              </p>
            </div>

            <div className="mapactions">
              {selectedContext.data?.map_links.google_maps_url && (
                <a
                  className="btn ghost inline"
                  href={selectedContext.data.map_links.google_maps_url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Google Maps
                </a>
              )}
              {selectedContext.data?.map_links.directions_url && (
                <a
                  className="btn ghost inline"
                  href={selectedContext.data.map_links.directions_url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Rotas
                </a>
              )}
            </div>

            <Link className="btn solid" to={`/escola/${sel.properties.identity.school_id}`}>
              Abrir Escola 360 + plano IA
            </Link>
            {takesAdr(sel.properties.identity.school_type) ? (
              <Link
                className="btn"
                to={`/recomposicao?cre=${sel.properties.identity.cre}&escola=${encodeURIComponent(sel.properties.identity.school_id)}`}
              >
                Recomposição por turma
              </Link>
            ) : (
              <p className="cardnote">
                Esta unidade não participa da avaliação diagnóstica — não há matriz de habilidades
                para ela.
              </p>
            )}
          </aside>
        )}

        <div className="maplegend">
          <div className="legrow">
            {(['none', 'low', 'attention', 'critical'] as Attention[]).map((a) => (
              <span key={a}>
                <i style={{ background: FILL[a] }} />
                {a === 'none' ? 'sem sinal' : a === 'low' ? 'baixa' : a === 'attention' ? 'atenção' : 'crítico'}{' '}
                {counts[a]}
              </span>
            ))}
            <span>
              <i className="hatch" />
              sem leitura {counts.unreadable - notApplicable}
            </span>
            {notApplicable > 0 && (
              <span title="Equipamentos que não fazem esta medição — o dado não existe, não está faltando.">
                <i className="hatch" />
                não se aplica {notApplicable}
              </span>
            )}
          </div>
          <div className="legrule">
            {spec.label} · {thresholdLegend(spec)}
          </div>
          <div className="legsrc">
            {RIO_SOURCE} · {map.data.coverage.geolocated.toLocaleString('pt-BR')} unidades no mapa ·{' '}
            {map.data.coverage.missing} sem coordenada
          </div>
        </div>
      </div>
    </div>
  );
}
