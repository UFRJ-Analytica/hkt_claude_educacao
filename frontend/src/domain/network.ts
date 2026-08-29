/**
 * AGREGAÇÃO DERIVADA NO CLIENTE — provisória.
 *
 * O endpoint governado `GET /api/v1/network/snapshot` (fase B3) ainda não
 * existe. Até ele existir, a tela Comparar agrega por CRE aqui, e DECLARA isso
 * na própria tela. Quando o endpoint entrar, este módulo é apagado e a troca é
 * de URL — nenhuma fórmula de negócio deve sobreviver no front-end.
 *
 * A agregação é a média simples dos valores INTERPRETÁVEIS. Unidades bloqueadas
 * não entram no numerador nem no denominador, e a contagem de excluídas é
 * devolvida para que a tela mostre a cobertura em vez de escondê-la.
 */

import type {
  IndicatorId,
  NetworkSnapshotV1,
  SchoolMapCollection,
  SchoolMapFeature,
} from '../api/types';
import { INDICATOR_ORDER } from './indicators';

export interface CreCell {
  value: number | null;
  readable: number;
  blocked: number;
  degraded: number;
  series: number[] | null;
  delta: number | null;
}

export interface CreRow {
  cre: number;
  units: number;
  enrolment: number;
  cells: Record<IndicatorId, CreCell>;
  coverage: number;
}

export interface NetworkSnapshot {
  rows: CreRow[];
  totals: Record<IndicatorId, CreCell>;
  units: number;
  derived: true;
}

function emptyCell(): CreCell {
  return { value: null, readable: 0, blocked: 0, degraded: 0, series: null, delta: null };
}

function aggregate(features: SchoolMapFeature[]): Record<IndicatorId, CreCell> {
  const out = {} as Record<IndicatorId, CreCell>;
  for (const id of INDICATOR_ORDER) {
    const cell = emptyCell();
    let sum = 0;
    const seriesSum = new Array(12).fill(0);
    let seriesCount = 0;

    for (const f of features) {
      const m = f.properties.metrics[id];
      if (!m || m.value === null || m.quality_status === 'BLOCKED') {
        cell.blocked += 1;
        continue;
      }
      if (m.quality_status === 'DEGRADED') cell.degraded += 1;
      cell.readable += 1;
      sum += m.value;
      if (m.series && m.series.length === 12) {
        for (let i = 0; i < 12; i += 1) seriesSum[i] += m.series[i];
        seriesCount += 1;
      }
    }

    if (cell.readable > 0) cell.value = sum / cell.readable;
    if (seriesCount > 0) {
      cell.series = seriesSum.map((v) => v / seriesCount);
      cell.delta = cell.series[11] - cell.series[8];
    }
    out[id] = cell;
  }
  return out;
}

export function deriveSnapshot(collection: SchoolMapCollection, cre?: number | null): NetworkSnapshot {
  const scoped = cre ? collection.features.filter((f) => f.properties.identity.cre === cre) : collection.features;
  const byCre = new Map<number, SchoolMapFeature[]>();
  for (const f of scoped) {
    const key = f.properties.identity.cre;
    const list = byCre.get(key);
    if (list) list.push(f);
    else byCre.set(key, [f]);
  }

  const rows: CreRow[] = [...byCre.entries()]
    .map(([creId, feats]) => {
      const cells = aggregate(feats);
      const readable = INDICATOR_ORDER.reduce((acc, id) => acc + cells[id].readable, 0);
      const totalSlots = feats.length * INDICATOR_ORDER.length;
      return {
        cre: creId,
        units: feats.length,
        enrolment: feats.reduce((acc, f) => acc + (f.properties.enrolment ?? 0), 0),
        cells,
        coverage: totalSlots === 0 ? 0 : readable / totalSlots,
      };
    })
    .sort((a, b) => a.cre - b.cre);

  return { rows, totals: aggregate(scoped), units: scoped.length, derived: true };
}

/**
 * NAO ha rotulo de bairro por CRE nos dados. A release oficial traz o numero da
 * CRE mas nao a composicao de bairros, e o campo `neighborhood` vem nulo em
 * todos os 1.588 registros. Rotular a CRE por bairro aqui seria afirmar algo
 * que a fonte nao sustenta — entao a interface mostra so o numero e a contagem.
 */
export function creLabel(cre: number, units?: number): string {
  return units === undefined ? `${cre}ª CRE` : `${cre}ª CRE · ${units} un`;
}

/**
 * Constrói as linhas de Comparar a partir do contrato GOVERNADO
 * `GET /api/v1/network/snapshot`, em vez da agregação local.
 *
 * `series` e `delta` ficam nulos de propósito: série temporal não faz parte do
 * contrato, e a tela mostra hachura em vez de desenhar uma linha que o backend
 * não devolveu.
 */
export function rowsFromSnapshots(
  snapshots: { cre: number; snapshot: NetworkSnapshotV1 }[],
): CreRow[] {
  return snapshots
    .map(({ cre, snapshot }) => {
      const cells = {} as Record<IndicatorId, CreCell>;
      for (const id of INDICATOR_ORDER) {
        const o = snapshot.observations.find((x) => x.indicator_id === id);
        if (!o) {
          cells[id] = emptyCell();
          continue;
        }
        const readable = o.coverage_numerator;
        cells[id] = {
          value: o.quality === 'BLOCKED' ? null : o.value,
          readable,
          blocked: Math.max(0, o.coverage_denominator - readable),
          degraded: o.quality === 'DEGRADED' ? readable : 0,
          series: null,
          delta: null,
        };
      }
      const readable = INDICATOR_ORDER.reduce((a, id) => a + cells[id].readable, 0);
      const slots = snapshot.school_count * INDICATOR_ORDER.length;
      return {
        cre,
        units: snapshot.school_count,
        enrolment: 0,
        cells,
        coverage: slots === 0 ? 0 : readable / slots,
      };
    })
    .sort((a, b) => a.cre - b.cre);
}
