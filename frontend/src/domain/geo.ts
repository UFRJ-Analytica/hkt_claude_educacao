/**
 * Projeção e casco convexo para o mapa.
 *
 * Sem tiles externos: o mapa é desenhado a partir das próprias coordenadas das
 * escolas, então funciona offline — requisito real para um evento com wifi
 * saturado. As regiões de CRE são o casco convexo dos pontos de cada CRE, e a
 * tela declara que a demarcação é derivada, não a fronteira oficial.
 */

import type { SchoolMapFeature } from '../api/types';

export interface Projection {
  x: (lon: number) => number;
  y: (lat: number) => number;
  width: number;
  height: number;
}

export function makeProjection(
  features: SchoolMapFeature[],
  width: number,
  height: number,
  pad = 26,
): Projection {
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const f of features) {
    const [lon, lat] = f.geometry.coordinates;
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  if (!Number.isFinite(minLon)) {
    return { x: () => width / 2, y: () => height / 2, width, height };
  }
  const spanLon = maxLon - minLon || 1e-6;
  const spanLat = maxLat - minLat || 1e-6;
  return {
    x: (lon) => pad + ((lon - minLon) / spanLon) * (width - pad * 2),
    y: (lat) => height - pad - ((lat - minLat) / spanLat) * (height - pad * 2),
    width,
    height,
  };
}

export type Point = [number, number];

/** Monotone chain. Devolve o casco em ordem horária. */
export function convexHull(points: Point[]): Point[] {
  if (points.length < 3) return points;
  const pts = [...points].sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  const cross = (o: Point, a: Point, b: Point) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

  const lower: Point[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: Point[] = [];
  for (let i = pts.length - 1; i >= 0; i -= 1) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

/** Encolhe o polígono na direção do centroide, para as CREs não se colarem. */
export function shrink(poly: Point[], factor = 0.965): Point[] {
  if (poly.length === 0) return poly;
  const cx = poly.reduce((a, p) => a + p[0], 0) / poly.length;
  const cy = poly.reduce((a, p) => a + p[1], 0) / poly.length;
  return poly.map(([x, y]) => [cx + (x - cx) * factor, cy + (y - cy) * factor] as Point);
}

export function centroid(poly: Point[]): Point {
  if (poly.length === 0) return [0, 0];
  return [
    poly.reduce((a, p) => a + p[0], 0) / poly.length,
    poly.reduce((a, p) => a + p[1], 0) / poly.length,
  ];
}

export function toPath(poly: Point[]): string {
  if (poly.length === 0) return '';
  return `M${poly.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L')}Z`;
}
