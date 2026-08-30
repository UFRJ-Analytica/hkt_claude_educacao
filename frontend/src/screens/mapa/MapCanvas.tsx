import { useEffect, useRef, type ReactNode } from 'react';
import type { IndicatorId, SchoolMapFeature } from '../../api/types';
import { attentionOf, type IndicatorSpec } from '../../domain/indicators';
import {
  clampView,
  landPath,
  type Frame,
  type Projector,
  type Viewport,
} from '../../domain/projection';
import { FILL } from './scale';
import { Button } from '../../components/ui/button';
import { Toolbar, ToolbarButton } from '../../components/ui/toolbar';

/**
 * Os três botões do `.mapzoom`. A caixa de 32px, a cor, o corpo e a régua de
 * 1px entre eles continuam em `.mapzoom button`, fora de camada. Sai do coss o
 * raio (o contêiner é que arredonda, e um canto por botão apareceria no hover),
 * a borda de contorno — `.mapzoom button` só declara a de baixo, e as outras
 * três comeriam 1px de dentro da caixa de 32px — e o `::before`.
 */
const ZOOM = 'rounded-none border-0 before:hidden';

/**
 * A tela do mapa: projeção, sombra do continente, os pontos e o gesto.
 *
 * Nada aqui é primitivo de biblioteca e nada aqui deve virar um. O `<circle>`
 * por unidade, o raio derivado da matrícula, o traço tracejado de "sem leitura",
 * o `feDropShadow` da máscara de terra e o pan/zoom por ponteiro são desenho
 * próprio — este bloco atravessa a migração intacto.
 */
export function MapCanvas({
  frame,
  onFrame,
  view,
  setView,
  proj,
  ordered,
  indicator,
  spec,
  creFilter,
  sel,
  hover,
  setHover,
  setSelected,
  onHome,
  children,
}: {
  frame: Frame;
  onFrame: (frame: Frame) => void;
  view: Viewport;
  setView: (view: Viewport) => void;
  proj: Projector;
  ordered: SchoolMapFeature[];
  indicator: IndicatorId;
  spec: IndicatorSpec;
  creFilter: number | null;
  sel: SchoolMapFeature | null;
  hover: SchoolMapFeature | null;
  setHover: (f: SchoolMapFeature | null) => void;
  setSelected: (id: string) => void;
  onHome: () => void;
  /** O cartão da unidade e a legenda, que moram sobre a tela. */
  children?: ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number; moved: boolean } | null>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) onFrame({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [onFrame]);

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

      {/* `gap-0 p-0` desfazem as duas únicas coisas que o `Toolbar` do coss
          acrescenta e que `.mapzoom` não declara: os botões são encostados,
          separados por régua e não por espaço. */}
      <Toolbar aria-label="Zoom do mapa" className="mapzoom gap-0 p-0" orientation="vertical">
        <ToolbarButton
          aria-label="Aproximar"
          onClick={() => zoomBy(1.55)}
          render={<Button className={ZOOM} size="icon" variant="ghost" />}
        >
          +
        </ToolbarButton>
        <ToolbarButton
          aria-label="Afastar"
          onClick={() => zoomBy(1 / 1.55)}
          render={<Button className={ZOOM} size="icon" variant="ghost" />}
        >
          −
        </ToolbarButton>
        <ToolbarButton
          aria-label="Enquadrar cidade"
          onClick={onHome}
          render={<Button className={ZOOM} size="icon" variant="ghost" />}
        >
          ⤢
        </ToolbarButton>
      </Toolbar>

      {children}
    </div>
  );
}
