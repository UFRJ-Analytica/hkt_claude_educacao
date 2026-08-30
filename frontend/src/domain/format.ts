/**
 * Formatação pt-BR. Não é regra de negócio — é a camada que impede que o
 * mesmo número apareça com duas caras em duas telas.
 *
 * Antes desta consolidação, `pct` e `int` estavam redeclarados em Fluxo e
 * Escola. A leitura de delta ("estável" / "▼ 1,2 pp"), copiada em cinco
 * lugares, virou `formatDelta` em components/Stat.tsx — apresentação. O que
 * sobra aqui é o limiar, que é decisão de produto e precisa ser citável
 * pelas duas camadas.
 */

/** Razão 0..1 como percentual com uma casa. */
export const pct = (v: number) => `${(v * 100).toFixed(1).replace('.', ',')}%`;

/** Inteiro com separador de milhar. */
export const int = (v: number) => v.toLocaleString('pt-BR');

/** Percentual sem casa decimal — usado em cobertura e participação. */
export const pct0 = (v: number) => `${(v * 100).toFixed(0)}%`;

/**
 * Piso de ruído do delta.
 *
 * 0,3 pp é menor do que a variação que a própria coleta produz entre dois
 * snapshots. Abaixo disso a seta seria uma afirmação que o dado não sustenta,
 * então a leitura correta é "estável" — não uma seta minúscula que o olho
 * lê como tendência.
 */
export const DELTA_NOISE_FLOOR = 0.003;
