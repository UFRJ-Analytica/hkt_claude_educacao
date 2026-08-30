/**
 * Projeção Web Mercator com viewport pan/zoom.
 *
 * Sem tiles externos: o basemap é o limite oficial do município (IBGE), então o
 * mapa funciona offline. Mercator porque é a projeção que todo mundo reconhece
 * como "mapa" — uma projeção linear em lat/lon distorce visivelmente a forma da
 * cidade nesta latitude.
 */

import { RIO_BOUNDS, RIO_RINGS, type Ring } from './rio-geometry';

const DEG = Math.PI / 180;

/** Mercator normalizado em [0,1]. */
export function mercX(lon: number): number {
  return (lon + 180) / 360;
}
export function mercY(lat: number): number {
  const s = Math.sin(lat * DEG);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
}

export interface Viewport {
  /** Centro em coordenadas Mercator normalizadas. */
  cx: number;
  cy: number;
  /** 1 = município inteiro cabendo na tela. */
  zoom: number;
}

export interface Frame {
  width: number;
  height: number;
}

const X0 = mercX(RIO_BOUNDS.west);
const X1 = mercX(RIO_BOUNDS.east);
const Y0 = mercY(RIO_BOUNDS.north);
const Y1 = mercY(RIO_BOUNDS.south);
const SPAN_X = X1 - X0;
const SPAN_Y = Y1 - Y0;

export const HOME: Viewport = { cx: (X0 + X1) / 2, cy: (Y0 + Y1) / 2, zoom: 1 };
export const MIN_ZOOM = 0.9;
export const MAX_ZOOM = 14;

/** Escala em px por unidade Mercator, com 4% de respiro nas bordas. */
function scaleFor(frame: Frame, zoom: number): number {
  const fit = Math.min(frame.width / SPAN_X, frame.height / SPAN_Y) * 0.92;
  return fit * zoom;
}

export interface Projector {
  x: (lon: number) => number;
  y: (lat: number) => number;
  /** Volta de pixels para Mercator — usado no zoom ancorado no cursor. */
  invert: (px: number, py: number) => { mx: number; my: number };
  scale: number;
}

export function project(view: Viewport, frame: Frame): Projector {
  const s = scaleFor(frame, view.zoom);
  const ox = frame.width / 2 - view.cx * s;
  const oy = frame.height / 2 - view.cy * s;
  return {
    x: (lon) => mercX(lon) * s + ox,
    y: (lat) => mercY(lat) * s + oy,
    invert: (px, py) => ({ mx: (px - ox) / s, my: (py - oy) / s }),
    scale: s,
  };
}

/** Impede que a cidade saia inteira do enquadramento. */
export function clampView(view: Viewport, frame: Frame): Viewport {
  const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, view.zoom));
  const s = scaleFor(frame, zoom);
  const halfW = frame.width / 2 / s;
  const halfH = frame.height / 2 / s;
  const padX = SPAN_X * 0.35;
  const padY = SPAN_Y * 0.35;
  return {
    zoom,
    cx: Math.min(X1 + padX - halfW, Math.max(X0 - padX + halfW, view.cx)),
    cy: Math.min(Y1 + padY - halfH, Math.max(Y0 - padY + halfH, view.cy)),
  };
}

/** Enquadra um conjunto de pontos lon/lat — usado ao recortar uma CRE. */
export function fitPoints(points: [number, number][], frame: Frame, pad = 1.5): Viewport {
  if (points.length === 0) return HOME;
  const mxs = points.map((p) => mercX(p[0]));
  const mys = points.map((p) => mercY(p[1]));
  const minX = Math.min(...mxs);
  const maxX = Math.max(...mxs);
  const minY = Math.min(...mys);
  const maxY = Math.max(...mys);
  const spanX = Math.max(maxX - minX, 1e-6) * pad;
  const spanY = Math.max(maxY - minY, 1e-6) * pad;
  const fit = Math.min(frame.width / SPAN_X, frame.height / SPAN_Y) * 0.92;
  const need = Math.min(frame.width / spanX, frame.height / spanY);
  return clampView({ cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, zoom: need / fit }, frame);
}

/** Caminho SVG do município no viewport atual. */
export function landPath(p: Projector): string {
  return RIO_RINGS.map(
    (ring: Ring) =>
      'M' + ring.map(([lon, lat]) => `${p.x(lon).toFixed(1)},${p.y(lat).toFixed(1)}`).join('L') + 'Z',
  ).join(' ');
}

export { RIO_BOUNDS, RIO_RINGS };
