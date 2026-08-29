import { Fragment, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getSchoolMap } from '../api/client';
import type { IndicatorId, SchoolMapFeature } from '../api/types';
import { INDICATORS, INDICATOR_ORDER, attentionOf, type Attention } from '../domain/indicators';
import { CRE_NAMES, deriveSnapshot, type CreCell } from '../domain/network';
import { CoverageTicks, Loading, MetricCell, Sparkline } from '../components';

type SortKey = IndicatorId | 'cre' | 'units';

/** Nível visual de uma célula agregada, usando os mesmos limiares publicados. */
function cellLevel(cell: CreCell, id: IndicatorId): Attention {
  if (cell.value === null) return 'unreadable';
  if (cell.degraded > cell.readable / 2) return 'degraded';
  const spec = INDICATORS[id];
  const [t1, t2, t3] = spec.thresholds;
  const v = cell.value;
  if (spec.worse === 'low') {
    if (v < t3) return 'critical';
    if (v < t2) return 'attention';
    if (v < t1) return 'low';
    return 'none';
  }
  if (v > t3) return 'critical';
  if (v > t2) return 'attention';
  if (v > t1) return 'low';
  return 'none';
}

export default function Comparar() {
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<SortKey>('attendance_rate');
  const [open, setOpen] = useState<number | null>(null);

  const creFilter = params.get('cre') ? Number(params.get('cre')) : null;

  const snap = useMemo(() => (map.data ? deriveSnapshot(map.data) : null), [map.data]);

  const schoolsByCre = useMemo(() => {
    const m = new Map<number, SchoolMapFeature[]>();
    for (const f of map.data?.features ?? []) {
      const k = f.properties.identity.cre;
      const l = m.get(k);
      if (l) l.push(f);
      else m.set(k, [f]);
    }
    return m;
  }, [map.data]);

  if (!map.data || !snap) return <Loading />;

  const rows = [...snap.rows]
    .filter((r) => (creFilter ? r.cre === creFilter : true))
    .sort((a, b) => {
      if (sort === 'cre') return a.cre - b.cre;
      if (sort === 'units') return b.units - a.units;
      const av = a.cells[sort].value;
      const bv = b.cells[sort].value;
      if (av === null) return 1;
      if (bv === null) return -1;
      return INDICATORS[sort].worse === 'low' ? av - bv : bv - av;
    });

  const sortLabel = sort === 'cre' ? 'CRE' : sort === 'units' ? 'unidades' : INDICATORS[sort].label;

  // Domínio único para a coluna de série: pequenos múltiplos só comparam sob a
  // mesma escala. Auto-escalar cada linha transformaria ruído em sinal.
  const allSeries = rows.flatMap((r) => r.cells.attendance_rate.series ?? []);
  const sparkDomain: [number, number] = allSeries.length
    ? [Math.min(...allSeries) - 0.002, Math.max(...allSeries) + 0.002]
    : [0.86, 0.98];

  return (
    <div>
      <div className="filterbar">
        <span className="ctl">
          <span>Recorte</span>
          <select
            value={creFilter ?? ''}
            onChange={(e) => {
              const v = e.target.value;
              setParams(v ? { cre: v } : {});
            }}
          >
            <option value="">todas as CREs ({snap.rows.length})</option>
            {snap.rows.map((r) => (
              <option key={r.cre} value={r.cre}>
                {r.cre}ª CRE · {CRE_NAMES[r.cre]}
              </option>
            ))}
          </select>
        </span>
        <span className="ctl">
          <span>Período</span>
          jul 2026
        </span>
        <span className="ctl">
          <span>Ordenar</span>
          {sortLabel} {sort === 'cre' || sort === 'units' ? '' : INDICATORS[sort as IndicatorId].worse === 'low' ? '↑' : '↓'}
        </span>
        <span className="right">
          {snap.units.toLocaleString('pt-BR')} unidades no recorte · totais calculados no conjunto completo
        </span>
      </div>

      <div className="derived">
        <b>Agregação derivada no cliente.</b> O endpoint governado <span className="mono">GET /api/v1/network/snapshot</span> ainda
        não existe — até lá, a média por CRE é calculada aqui sobre os valores interpretáveis, e unidades bloqueadas ficam fora do
        numerador e do denominador. A coluna Leitura mostra a fração de indicadores que a cobertura permitiu ler em cada CRE.
      </div>

      <div className="tblwrap">
        <table className="m">
          <thead>
            <tr>
              <th>
                <button type="button" onClick={() => setSort('cre')}>
                  Coordenadoria
                </button>
              </th>
              {INDICATOR_ORDER.map((id) => (
                <th key={id} className={sort === id ? 'sorted' : ''}>
                  <button type="button" onClick={() => setSort(id)}>
                    {INDICATORS[id].label}
                  </button>
                  <br />
                  <span className="sc">
                    esc. {INDICATORS[id].format(INDICATORS[id].scale[0])}–{INDICATORS[id].format(INDICATORS[id].scale[1])}
                  </span>
                </th>
              ))}
              <th>Δ 3 meses</th>
              <th>
                12 meses
                <br />
                <span className="sc">frequência, escala comum</span>
              </th>
              <th>
                Leitura
                <br />
                <span className="sc">indicadores legíveis</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, rowIndex) => {
              const att = r.cells.attendance_rate;
              const expanded = open === r.cre;
              const kids = expanded ? (schoolsByCre.get(r.cre) ?? []).slice(0, 6) : [];
              return (
                <Fragment key={r.cre}>
                  <tr
                    className={
                      rowIndex === 0 && sort !== 'cre' && sort !== 'units' && ['critical', 'attention'].includes(cellLevel(r.cells[sort], sort))
                        ? 'focus'
                        : ''
                    }
                  >
                    <td>
                      <button type="button" className="creid" onClick={() => setOpen(expanded ? null : r.cre)}>
                        <b>{r.cre}ª CRE</b>
                        <span>
                          {expanded ? '▾' : '▸'} {r.units} un · {CRE_NAMES[r.cre]}
                        </span>
                      </button>
                    </td>
                    {INDICATOR_ORDER.map((id) => {
                      const c = r.cells[id];
                      if (c.value === null) {
                        return (
                          <td key={id}>
                            <span className="blockcell" title={`${c.blocked} unidades sem leitura`} />
                          </td>
                        );
                      }
                      const spec = INDICATORS[id];
                      const lvl = cellLevel(c, id);
                      const [min, max] = spec.scale;
                      const w = Math.max(0, Math.min(1, (c.value - min) / (max - min))) * 100;
                      return (
                        <td key={id}>
                          <span className="cell">
                            <span className={`num${lvl === 'critical' ? ' worse' : lvl === 'attention' ? ' bad' : lvl === 'none' ? ' mut' : ''}`}>
                              {spec.format(c.value)}
                            </span>
                            <span className="bar">
                              <i className={lvl} style={{ width: `${w}%` }} />
                            </span>
                          </span>
                        </td>
                      );
                    })}
                    <td>
                      {att.delta === null ? (
                        <span className="delta">—</span>
                      ) : Math.abs(att.delta) < 0.003 ? (
                        <span className="delta" title="variação dentro do ruído do período">
                          estável
                        </span>
                      ) : (
                        <span className={`delta${att.delta < -0.01 ? ' worse' : att.delta < 0 ? ' bad' : ''}`}>
                          {att.delta < 0 ? '▼' : '▲'} {Math.abs(att.delta * 100).toFixed(1).replace('.', ',')} pp
                        </span>
                      )}
                    </td>
                    <td>
                      <Sparkline series={att.series} level={cellLevel(att, 'attendance_rate')} domain={sparkDomain} />
                    </td>
                    <td>
                      <CoverageTicks ratio={r.coverage} />{' '}
                      <span className={`num ${r.coverage < 0.8 ? 'bad' : 'mut'}`} style={{ fontSize: 11 }}>
                        {(r.coverage * 100).toFixed(0)}%
                      </span>
                    </td>
                  </tr>

                  {kids.map((f) => {
                    const m = f.properties.metrics;
                    const s = m.attendance_rate;
                    return (
                      <tr key={f.properties.identity.school_id} className="child">
                        <td>
                          <Link className="creid" to={`/escola/${f.properties.identity.school_id}`}>
                            <b>{f.properties.identity.nome}</b>
                            <span>{f.properties.enrolment ?? '—'} matr.</span>
                          </Link>
                        </td>
                        {INDICATOR_ORDER.map((id) => (
                          <td key={id}>
                            <MetricCell metric={m[id]} />
                          </td>
                        ))}
                        <td>
                          {(() => {
                            const ser = s?.series;
                            if (!ser || ser.length < 12) return <span className="delta">—</span>;
                            const d = ser[11] - ser[8];
                            if (Math.abs(d) < 0.003) return <span className="delta">estável</span>;
                            return (
                              <span className={`delta${d < -0.01 ? ' worse' : d < 0 ? ' bad' : ''}`}>
                                {d < 0 ? '▼' : '▲'} {Math.abs(d * 100).toFixed(1).replace('.', ',')} pp
                              </span>
                            );
                          })()}
                        </td>
                        <td>
                          <Sparkline series={s?.series} level={attentionOf(s)} domain={sparkDomain} />
                        </td>
                        <td>
                          <CoverageTicks ratio={s?.coverage ?? 0.96} />
                        </td>
                      </tr>
                    );
                  })}
                  {expanded && (schoolsByCre.get(r.cre)?.length ?? 0) > 6 && (
                    <tr className="child" key={`${r.cre}-more`}>
                      <td colSpan={8}>
                        <Link to={`/mapa?cre=${r.cre}`} className="num mut" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
                          + {(schoolsByCre.get(r.cre)?.length ?? 0) - 6} unidades da {r.cre}ª CRE no mapa
                        </Link>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
