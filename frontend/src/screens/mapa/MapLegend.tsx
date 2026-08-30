import type { Attention, IndicatorSpec } from '../../domain/indicators';
import { thresholdLegend } from '../../domain/indicators';
import { RIO_SOURCE } from '../../domain/rio-geometry';
import { Legend, type LegendItem } from '../../components';
import { FILL } from './scale';

const LABEL: Record<'none' | 'low' | 'attention' | 'critical', string> = {
  none: 'sem sinal',
  low: 'baixa',
  attention: 'atenção',
  critical: 'crítico',
};

/**
 * A legenda que publica o limiar. Este produto só pode afirmar "crítico" se
 * disser, na mesma tela, o que fez a leitura ser crítica.
 *
 * A régua (`.legrule`) e a procedência (`.legsrc`) seguem sem primitivo: são
 * duas linhas de texto com regra própria e nenhuma estrutura a ganhar. O
 * `Legend` cobre só a fileira de amostras, que é onde havia repetição.
 */
export function MapLegend({
  counts,
  notApplicable,
  spec,
  geolocated,
  missing,
}: {
  counts: Record<Attention, number>;
  notApplicable: number;
  spec: IndicatorSpec;
  geolocated: number;
  missing: number;
}) {
  const items: LegendItem[] = (['none', 'low', 'attention', 'critical'] as const).map((a) => ({
    label: LABEL[a],
    swatch: 'dot',
    // A amostra é pintada pela MESMA escala que pinta o ponto. Se a legenda
    // tivesse cor própria, ela deixaria de ser legenda.
    swatchStyle: { background: FILL[a] },
    value: counts[a],
  }));

  items.push({
    label: 'sem leitura',
    swatch: 'hatch',
    swatchClassName: 'hatch',
    value: counts.unreadable - notApplicable,
  });

  // "não se aplica" e "sem leitura" pintam igual porque nos dois casos não há
  // número; aqui elas se separam, que é onde a diferença importa.
  if (notApplicable > 0) {
    items.push({
      label: 'não se aplica',
      reason: 'Equipamentos que não fazem esta medição — o dado não existe, não está faltando.',
      swatch: 'hatch',
      swatchClassName: 'hatch',
      value: notApplicable,
    });
  }

  return (
    <div className="maplegend">
      <Legend className="legrow" items={items} />
      <div className="legrule">
        {spec.label} · {thresholdLegend(spec)}
      </div>
      <div className="legsrc">
        {RIO_SOURCE} · {geolocated.toLocaleString('pt-BR')} unidades no mapa ·{' '}
        {missing} sem coordenada
      </div>
    </div>
  );
}
