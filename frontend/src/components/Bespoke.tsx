import type { SchoolMetric } from '@/api/types';
import { Num, toneForAttention } from '@/components/Num';
import { INDICATORS, attentionOf, type Attention } from '@/domain/indicators';

/**
 * Os três visuais que continuam escritos à mão, de propósito.
 *
 * Sparkline, régua de cobertura e célula de métrica são densidade sob medida:
 * 66×20 pixels que precisam sobreviver dentro de uma linha de tabela. Nenhum
 * primitivo genérico chega nessa escala sem inventar padding, e cada um deles
 * carrega uma regra de leitura — domínio compartilhado, limiar de cobertura,
 * rampa de atenção — que não é estilo, é conteúdo.
 */

export function Sparkline({
  series,
  level,
  width = 66,
  height = 20,
  domain,
}: {
  series: number[] | null | undefined;
  level: Attention;
  width?: number;
  height?: number;
  /** Domínio compartilhado pela coluna: sem ele, cada linha se auto-escala e
   *  ruído vira sinal. Pequenos múltiplos só comparam sob a mesma escala. */
  domain?: [number, number];
}) {
  if (!series || series.length < 2) {
    return (
      <span
        className="blockcell"
        style={{ width, height: 8 }}
        title="Série temporal não faz parte do contrato atual do backend"
      />
    );
  }
  const min = domain ? domain[0] : Math.min(...series);
  const max = domain ? domain[1] : Math.max(...series);
  const span = max - min || 1;
  const pts = series
    .map((v, i) => {
      const x = 1 + (i / (series.length - 1)) * (width - 2);
      const y = height - 3 - ((v - min) / span) * (height - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const stroke =
    level === 'critical'
      ? 'var(--a3)'
      : level === 'attention'
        ? 'var(--a2)'
        : level === 'low' || level === 'degraded'
          ? 'var(--a1)'
          : 'var(--ink-3)';
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function CoverageTicks({ ratio }: { ratio: number }) {
  const filled = Math.round(ratio * 5);
  const warn = ratio < 0.8;
  return (
    <span className="covtick" title={`cobertura ${(ratio * 100).toFixed(0)}%`}>
      {[4, 6, 8, 10, 12].map((h, i) => (
        <i key={h} className={i < filled ? (warn ? 'warn' : 'on') : ''} style={{ height: h }} />
      ))}
    </span>
  );
}

export function MetricCell({ metric }: { metric: SchoolMetric | undefined }) {
  if (!metric || metric.value === null || metric.quality_status === 'BLOCKED') {
    return <span className="blockcell" title="Sem leitura: cobertura abaixo do limiar" />;
  }
  const spec = INDICATORS[metric.indicator_id];
  const level = attentionOf(metric);
  const [min, max] = spec.scale;
  const w = Math.max(0, Math.min(1, (metric.value - min) / (max - min))) * 100;
  return (
    <span className="cell">
      <Num tone={toneForAttention(level)}>{spec.format(metric.value)}</Num>
      <span className="bar">
        <i className={level} style={{ width: `${w}%` }} />
      </span>
    </span>
  );
}

