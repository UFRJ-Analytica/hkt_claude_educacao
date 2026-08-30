/**
 * O kit de domínio do Pulso da Rede.
 *
 * A regra de divisão: `components/ui/` é o registry do coss, intocado; este
 * barril é o vocabulário do produto — o que uma tela da SME precisa dizer e
 * que nenhum primitivo genérico sabe dizer sozinho (leitura bloqueada, portão
 * de prontidão, capacidade declarada, número derivado no cliente).
 *
 * As telas importam daqui e só daqui.
 *
 * Sobre a cascata, porque isso explica quase toda decisão de estilo abaixo:
 * `legacy.css` entra SEM camada, depois das utilities do Tailwind. CSS sem
 * camada vence qualquer camada, independente de especificidade — então uma
 * classe legada no mesmo elemento de um primitivo do coss continua mandando na
 * geometria e na cor. É isso que torna a migração pixel-neutra. O reset de
 * ELEMENTO (`button`, `a`, `input`) foi movido para `@layer base` em
 * `styles/base.css` justamente para não vencer as utilities — sem isso um
 * `<Button>` do coss nasceria sem fundo e sem padding.
 */

/* ---- superfícies e narrativa ---- */
export * from '@/components/Brief';
export * from '@/components/Card';
export * from '@/components/CoverageCard';
export * from '@/components/EmptyState';
export * from '@/components/Guardrails';
export * from '@/components/Panel';
export * from '@/components/SectionHeading';

/* ---- linhas, listas e escolha ---- */
export * from '@/components/Choice';
export * from '@/components/Codes';
export * from '@/components/DataTable';
export * from '@/components/FilterBar';
export * from '@/components/Gate';
export * from '@/components/Legend';
export * from '@/components/ListRow';
export * from '@/components/RowIdentity';
export * from '@/components/SearchList';
export * from '@/components/SignalRow';

/* ---- leitura de número, medida e ausência ---- */
export * from '@/components/Bar';
export * from '@/components/NoReading';
export * from '@/components/Note';
export * from '@/components/Num';
export * from '@/components/Stat';
export * from '@/components/StatusTag';

/* ---- estados de tela ---- */
export * from '@/components/States';

/**
 * Visuais deliberadamente bespoke: `Sparkline`, `CoverageTicks` e `MetricCell`.
 * Não são controles, são leitura de dado — um primitivo genérico achataria a
 * distinção entre valor baixo e leitura impossível, que é o que este produto
 * existe para não achatar.
 */
export * from '@/components/Bespoke';

/** `Section` foi o nome anterior de `Pad`; as telas antigas ainda pedem por ele. */
export { Pad as Section } from '@/components/Panel';
