import type { IndicatorId, SchoolMapFeature } from '../../api/types';
import { INDICATORS, INDICATOR_ORDER, attentionOf } from '../../domain/indicators';
import {
  FilterChipList,
  Note,
  ResultItem,
  ResultList,
  SearchInput,
  SectionHeading,
  SegmentedChoice,
  type ChoiceItem,
} from '../../components';

/**
 * A coluna de recorte: busca, indicador pintado, tipo de unidade e
 * coordenadoria. Quatro controles que decidem, juntos, o que a tela afirma.
 *
 * Os três primeiros títulos entram como `SectionHeading` com a classe legada
 * `.sectionlabel` — que continua mandando em geometria, corpo e cor. O
 * `font-normal!` desfaz o `font-medium!` do componente: aqui o rótulo sempre
 * foi um `<div>` sem peso declarado, e um `<h5>` herdaria 600 do reset.
 */
export function MapSidebar({
  q,
  setQ,
  matches,
  onPick,
  indicator,
  setIndicator,
  typeCatalog,
  types,
  setTypes,
  typeMatch,
  byCre,
  creFilter,
  focusCre,
}: {
  q: string;
  setQ: (q: string) => void;
  matches: SchoolMapFeature[];
  onPick: (f: SchoolMapFeature) => void;
  indicator: IndicatorId;
  setIndicator: (id: IndicatorId) => void;
  typeCatalog: [string, number][];
  types: Set<string>;
  setTypes: (types: Set<string>) => void;
  typeMatch: (f: SchoolMapFeature) => boolean;
  byCre: [number, SchoolMapFeature[]][];
  creFilter: number | null;
  focusCre: (cre: number | null) => void;
}) {
  const creItems: ChoiceItem[] = byCre.map(([cre, list]) => {
    const scoped = list.filter(typeMatch);
    const flagged = scoped.filter((f) => {
      const a = attentionOf(f.properties.metrics[indicator]);
      return a === 'attention' || a === 'critical';
    }).length;
    const share = scoped.length ? flagged / scoped.length : 0;
    return {
      id: String(cre),
      code: `${cre}ª`,
      label: `${scoped.length} unidades`,
      count: flagged || '—',
      // O medidor nunca desceu abaixo de 6%: fração diferente de zero tinha
      // de ser visível na coluna estreita. `ChoiceItem` só aceita a fração,
      // então o piso viaja dentro do valor.
      share: share > 0 ? Math.max(0.06, share) : 0,
    };
  });

  return (
    <aside className="mapside">
      <SearchInput
        label="Buscar escola"
        onValueChange={setQ}
        placeholder="Buscar escola, bairro ou código"
        value={q}
      >
        {matches.length > 0 && (
          <ResultList>
            {matches.map((f) => (
              <ResultItem
                context={
                  <>
                    {f.properties.identity.cre}ª CRE ·{' '}
                    {f.properties.identity.school_type ?? f.properties.identity.bairro ?? '—'}
                  </>
                }
                key={f.properties.identity.school_id}
                name={f.properties.identity.nome}
                onSelect={() => onPick(f)}
              />
            ))}
          </ResultList>
        )}
      </SearchInput>

      <SectionHeading className="sectionlabel font-normal!">Indicador no mapa</SectionHeading>
      <SegmentedChoice
        items={INDICATOR_ORDER.map((id) => ({ id, label: INDICATORS[id].short }))}
        label="Indicador no mapa"
        onChange={setIndicator}
        value={indicator}
      />

      {typeCatalog.length > 1 && (
        <>
          <SectionHeading className="sectionlabel font-normal!">
            Tipo de unidade
            {types.size > 0 && (
              <button type="button" className="linkish" onClick={() => setTypes(new Set())}>
                limpar
              </button>
            )}
          </SectionHeading>
          <FilterChipList
            items={typeCatalog.map(([t, n]) => ({ id: t, label: t, count: n }))}
            label="Tipo de unidade"
            mode="multiple"
            onToggle={(t) => {
              const next = new Set(types);
              if (next.has(t)) next.delete(t);
              else next.add(t);
              setTypes(next);
            }}
            selected={types}
          />
        </>
      )}

      <SectionHeading className="sectionlabel font-normal!">
        Coordenadorias
        {creFilter && (
          <button type="button" className="linkish" onClick={() => focusCre(null)}>
            ver todas
          </button>
        )}
      </SectionHeading>
      <FilterChipList
        items={creItems}
        label="Coordenadorias"
        mode="single"
        onToggle={(id) => focusCre(creFilter === Number(id) ? null : Number(id))}
        selected={creFilter !== null ? String(creFilter) : null}
        showMeter
      />
      <Note className="sidenote">
        A contagem à direita é o número de unidades em atenção ou crítico para o indicador
        selecionado. Limiares publicados na legenda do mapa.
      </Note>
    </aside>
  );
}
