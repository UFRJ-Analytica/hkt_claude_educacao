import { Fragment, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getSchoolMap, mapOrigin } from '../api/client';
import { getNetworkSnapshot } from '../api/analytics';
import type { IndicatorId, SchoolMapFeature } from '../api/types';
import { INDICATORS, INDICATOR_ORDER, attentionOf, levelFor, type Attention } from '../domain/indicators';
import { DELTA_NOISE_FLOOR, pct0 } from '../domain/format';
import { deriveSnapshot, rowsFromSnapshots, type CreCell } from '../domain/network';
import { Bar, CoverageTicks, Delta, DerivedNote, FilterBar, FilterControl, FilterSelect, Loading, MetricCell, Mono, NoReading, Num, RowIdentity, Sparkline, toneForAttention } from '../components';

type SortKey = IndicatorId | 'cre' | 'units';

/**
 * O `<select>` da régua de recorte, agora `Select` do coss.
 *
 * `.ctl select` casa com o ELEMENTO `select`, e o gatilho do coss é um
 * `<button>` — a classe legada não alcança. Então a geometria dele é
 * reescrita aqui em utilitária, declaração por declaração, a partir da mesma
 * regra: peso 500, tinta `--ink`, sem fundo, sem borda exceto a régua de
 * 1px embaixo, respiro de 1px em cima e embaixo. O resto é neutralização do
 * cartão que o gatilho traz de fábrica (raio, anel, sombra, altura mínima de
 * 36px, largura mínima de 9rem).
 */

/**
 * Nível visual de uma célula agregada, usando os mesmos limiares publicados.
 *
 * A escada de limiares saiu daqui: é `levelFor` em `domain/indicators`, o
 * mesmo código que pinta ponto no mapa e barra na tabela. O que sobra é o
 * único julgamento que só existe no agregado — mais de metade das unidades
 * legíveis em modo degradado degrada a média inteira.
 */
function cellLevel(cell: CreCell, id: IndicatorId): Attention {
  if (cell.value === null) return 'unreadable';
  if (cell.degraded > cell.readable / 2) return 'degraded';
  return levelFor(INDICATORS[id], cell.value);
}

export default function Comparar() {
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<SortKey>('attendance_rate');
  const [open, setOpen] = useState<number | null>(null);

  const creFilter = params.get('cre') ? Number(params.get('cre')) : null;

  const snap = useMemo(() => (map.data ? deriveSnapshot(map.data) : null), [map.data]);

  // Caminho governado: so vale quando o proprio mapa esta usando a API. Misturar
  // 30 unidades do backend com 1.548 da fixture produziria uma tela incoerente.
  const governed = useQuery({
    queryKey: ['governed-rows', map.data?.snapshot_id],
    enabled: !!map.data && mapOrigin().mode === 'live',
    queryFn: async () => {
      const cres = map.data?.available_cres ?? [];
      const got = await Promise.all(cres.map((c) => getNetworkSnapshot(c)));
      const pairs = cres
        .map((cre, i) => ({ cre, snapshot: got[i] }))
        .filter((p): p is { cre: number; snapshot: NonNullable<typeof p.snapshot> } => p.snapshot !== null);
      return pairs.length > 0 ? rowsFromSnapshots(pairs) : null;
    },
  });
  const governedRows = governed.data ?? null;

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

  const sourceRows = governedRows ?? snap.rows;
  const rows = [...sourceRows]
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

  // Os itens do recorte chegam prontos ao `Select`: com `items` declarado, o
  // valor selecionado sai como rótulo no gatilho sem a tela guardar um mapa
  // paralelo de código para nome.
  const creItems = [
    { label: `todas as CREs (${snap.rows.length})`, value: '' },
    ...snap.rows.map((r) => ({ label: `${r.cre}ª CRE`, value: String(r.cre) })),
  ];

  // Domínio único para a coluna de série: pequenos múltiplos só comparam sob a
  // mesma escala. Auto-escalar cada linha transformaria ruído em sinal.
  const allSeries = rows.flatMap((r) => r.cells.attendance_rate.series ?? []);
  const sparkDomain: [number, number] = allSeries.length
    ? [Math.min(...allSeries) - 0.002, Math.max(...allSeries) + 0.002]
    : [0.86, 0.98];

  return (
    <div>
      <FilterBar
        right={`${snap.units.toLocaleString('pt-BR')} unidades no recorte · totais calculados no conjunto completo`}
      >
        <FilterControl label="Recorte">
          <FilterSelect
            ariaLabel="Recorte"
            items={creItems}
            onValueChange={(v) => setParams(v ? { cre: v } : {})}
            value={creFilter ? String(creFilter) : ''}
          />
        </FilterControl>
        <FilterControl label="Período">jul 2026</FilterControl>
        <FilterControl label="Ordenar">
          {sortLabel} {sort === 'cre' || sort === 'units' ? '' : INDICATORS[sort as IndicatorId].worse === 'low' ? '↑' : '↓'}
        </FilterControl>
      </FilterBar>

      {governedRows ? (
        <DerivedNote variant="governed">
          <b>Agregação governada pelo backend.</b> Os valores vêm de{' '}
          <Mono>GET /api/v1/network/snapshot?cre=</Mono>, com numerador, denominador e cobertura
          declarados por observação. Série de 12 meses não faz parte do contrato — por isso a coluna aparece
          hachurada em vez de desenhar uma linha que o backend não devolveu.
        </DerivedNote>
      ) : (
        <DerivedNote variant="bar">
          <b>Agregação derivada no cliente.</b> O endpoint <Mono>GET /api/v1/network/snapshot</Mono>{' '}
          existe, mas o dataset governado ainda não sustenta a leitura de rede — então a média por CRE é calculada
          aqui sobre os valores interpretáveis, e unidades bloqueadas ficam fora do numerador e do denominador.
        </DerivedNote>
      )}

      {/* A tabela segue crua: `DataTable` monta uma linha por item do array e
          esta tem três espécies de linha — a CRE, as escolas que ela abre e o
          rodapé de transbordo com `colSpan` — além do realce `focus` na
          primeira. Nenhuma delas cabe no modelo de coluna do kit hoje. */}
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
                      <RowIdentity
                        expanded={expanded}
                        onClick={() => setOpen(expanded ? null : r.cre)}
                        sub={`${r.units} un`}
                        title={`${r.cre}ª CRE`}
                      />
                    </td>
                    {INDICATOR_ORDER.map((id) => {
                      const c = r.cells[id];
                      if (c.value === null) {
                        return (
                          <td key={id}>
                            <NoReading reason={`${c.blocked} unidades sem leitura`} shape="cell" />
                          </td>
                        );
                      }
                      const spec = INDICATORS[id];
                      const lvl = cellLevel(c, id);
                      const [min, max] = spec.scale;
                      const w = Math.max(0, Math.min(1, (c.value - min) / (max - min)));
                      return (
                        <td key={id}>
                          <span className="cell">
                            <Num tone={toneForAttention(lvl)}>{spec.format(c.value)}</Num>
                            {/* `indicatorClassName` devolve o raio de 2px que
                                `.bar i` desenhava: o preenchimento do `Meter` é
                                um `div`, e aquele seletor de elemento não o
                                alcança mais. */}
                            <Bar
                              className="bar"
                              indicatorClassName="rounded-[2px]"
                              label={`${spec.label}: ${spec.format(c.value)}`}
                              level={lvl}
                              value={w}
                            />
                          </span>
                        </td>
                      );
                    })}
                    <td>
                      <Delta
                        delta={att.delta}
                        title={
                          att.delta !== null && Math.abs(att.delta) < DELTA_NOISE_FLOOR
                            ? 'variação dentro do ruído do período'
                            : undefined
                        }
                      />
                    </td>
                    <td>
                      <Sparkline series={att.series} level={cellLevel(att, 'attendance_rate')} domain={sparkDomain} />
                    </td>
                    <td>
                      <CoverageTicks ratio={r.coverage} />{' '}
                      {/* O corpo de 11px é menor que o de `.num`, e `.num` está
                          fora de camada: sem `!` a utilitária perde. */}
                      <Num className="text-[11px]!" tone={r.coverage < 0.8 ? 'bad' : 'mut'}>
                        {pct0(r.coverage)}
                      </Num>
                    </td>
                  </tr>

                  {kids.map((f) => {
                    const m = f.properties.metrics;
                    const s = m.attendance_rate;
                    const ser = s?.series;
                    return (
                      <tr key={f.properties.identity.school_id} className="child">
                        <td>
                          <RowIdentity
                            as="link"
                            sub={`${f.properties.enrolment ?? '—'} matr.`}
                            title={f.properties.identity.nome}
                            to={`/escola/${f.properties.identity.school_id}`}
                          />
                        </td>
                        {INDICATOR_ORDER.map((id) => (
                          <td key={id}>
                            <MetricCell metric={m[id]} />
                          </td>
                        ))}
                        <td>
                          <Delta delta={ser && ser.length >= 12 ? ser[11] - ser[8] : null} />
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
