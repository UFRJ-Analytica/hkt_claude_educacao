import { useCallback, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getSchoolMap } from '../api/client';
import { getSchoolContext } from '../api/analytics';
import type { IndicatorId, SchoolMapFeature } from '../api/types';
import { INDICATORS, attentionOf, isNotApplicable, type Attention } from '../domain/indicators';
import { HOME, fitPoints, project, type Frame, type Viewport } from '../domain/projection';
import { Loading } from '../components';
import { MapCanvas } from './mapa/MapCanvas';
import { MapLegend } from './mapa/MapLegend';
import { MapSidebar } from './mapa/MapSidebar';
import { MapUnitCard } from './mapa/MapUnitCard';
import { ORDER } from './mapa/scale';

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

  const anim = useRef<number | null>(null);

  const creFilter = params.get('cre') ? Number(params.get('cre')) : null;

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

  return (
    <div className="mapscreen">
      <MapSidebar
        q={q}
        setQ={setQ}
        matches={matches}
        onPick={(f) => {
          setSelected(f.properties.identity.school_id);
          setQ('');
          flyTo(fitPoints([f.geometry.coordinates], frame, 42));
        }}
        indicator={indicator}
        setIndicator={setIndicator}
        typeCatalog={typeCatalog}
        types={types}
        setTypes={setTypes}
        typeMatch={typeMatch}
        byCre={byCre}
        creFilter={creFilter}
        focusCre={focusCre}
      />

      <MapCanvas
        frame={frame}
        onFrame={setFrame}
        view={view}
        setView={setView}
        proj={proj}
        ordered={ordered}
        indicator={indicator}
        spec={spec}
        creFilter={creFilter}
        sel={sel}
        hover={hover}
        setHover={setHover}
        setSelected={setSelected}
        onHome={() => flyTo(HOME)}
      >
        {sel && (
          <MapUnitCard
            sel={sel}
            context={selectedContext.data}
            isFetching={selectedContext.isFetching}
            onClose={() => setSelected(null)}
          />
        )}

        <MapLegend
          counts={counts}
          notApplicable={notApplicable}
          spec={spec}
          geolocated={map.data.coverage.geolocated}
          missing={map.data.coverage.missing}
        />
      </MapCanvas>
    </div>
  );
}
