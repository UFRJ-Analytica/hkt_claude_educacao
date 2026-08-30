import type { Attention } from '../../domain/indicators';

/**
 * A rampa `--a1`/`--a2`/`--a3` é escala ordinal de matiz único, validada, e
 * serve DADO — nunca ação. O ponto sem leitura não entra na rampa: fica
 * transparente com traço, porque ausência de informação não tem grau.
 */
export const FILL: Record<Attention, string> = {
  none: 'var(--ink-4)',
  low: 'var(--a1)',
  attention: 'var(--a2)',
  critical: 'var(--a3)',
  degraded: 'var(--a1)',
  unreadable: 'transparent',
};

/** Ordem de pintura: desenha do menos ao mais grave. */
export const ORDER: Attention[] = [
  'none',
  'degraded',
  'low',
  'attention',
  'critical',
  'unreadable',
];
