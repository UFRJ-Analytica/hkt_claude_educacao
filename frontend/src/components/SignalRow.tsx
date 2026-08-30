import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * O cartão de situação (`.sit`) — a unidade de leitura da primeira tela.
 *
 * Uma situação é sempre a mesma frase: um ordinal, um título que já diz o que
 * está acontecendo, a linha de procedência (`.meta`), o agente que levantou o
 * sinal, e uma medida ao lado. A rede vê isso ordenado; a unidade vê isso
 * filtrado. Eram duas cópias do mesmo bloco em `Hoje` e `Unidade`, uma como
 * `<button>` e outra como `<div>`, divergindo só no painel lateral.
 *
 * ## O ordinal é conteúdo
 *
 * `index` vem pronto porque a numeração é uma AFIRMAÇÃO DE PRIORIDADE: só
 * conta o que é legível. Um sinal bloqueado recebe `—`, nunca um número —
 * numerá-lo diria que ele foi ordenado, e ele não foi: não há leitura para
 * ordenar. `.n.void` pinta esse traço em `--void`, fora da rampa.
 *
 * ## O painel lateral não é absorvido
 *
 * `side` é slot puro. Os cinco micro-medidores de `.decomp` são bespoke por
 * decisão: eles existem para impedir que um score único esconda cobertura, e
 * cada faixa tem rótulo próprio de 8px. Um componente genérico que os
 * "resolvesse" reintroduziria exatamente o resumo que eles desmontam. O mesmo
 * vale para o `.gauge` de unidade e para a hachura de leitura bloqueada.
 *
 * ## Elemento
 *
 * `onClick` define se a linha é `<button>` ou `<div>`, e nada mais muda —
 * `.sit` já declara `width:100%` e `text-align:left` justamente para que os
 * dois computem igual. Sem `Button` do coss pela mesma razão de `ListRow`: o
 * `whitespace-nowrap` da variante estrangularia o `<h4>` de 52ch.
 */
export function SignalRow({
  index = '—',
  title,
  meta,
  agent,
  blocked,
  side,
  levelLabel,
  footer,
  onClick,
  className,
}: {
  /** Ordinal já formatado. `—` quando não há leitura para ordenar. */
  index?: ReactNode;
  title: ReactNode;
  /** Procedência: fórmula, cobertura, motivo do bloqueio. */
  meta?: ReactNode;
  /** Quem levantou o sinal. A pastilha é petróleo porque é IA, não dado. */
  agent?: ReactNode;
  blocked?: boolean;
  /** `.decomp`, `.gauge` ou `NoReading` — medida lateral, sempre bespoke. */
  side?: ReactNode;
  /** Nome do nível, à esquerda da régua (`.glab`). */
  levelLabel?: ReactNode;
  /** Fecho à direita da régua: confiança, matrículas, "ver o que falta". */
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const content = (
    <>
      <div className={cn('n', blocked && 'void')}>{index}</div>
      <div>
        <h4>{title}</h4>
        {meta != null ? <div className="meta">{meta}</div> : null}
        {agent != null ? (
          <span className="agentchip">
            <i />
            {agent}
          </span>
        ) : null}
      </div>
      {side != null || levelLabel != null || footer != null ? (
        <div className="side">
          {side}
          {levelLabel != null || footer != null ? (
            <div className="glab">
              <span>{levelLabel}</span>
              {footer != null ? <b>{footer}</b> : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );

  const cls = cn('sit', blocked && 'blocked', className);

  if (onClick) {
    return (
      <button className={cls} onClick={onClick} type="button">
        {content}
      </button>
    );
  }
  return <div className={cls}>{content}</div>;
}

/**
 * O contêiner das situações (`.sits`). A régua superior em `--ink` que ele
 * carrega é o que separa a manchete da lista — sem ela as duas viram um bloco
 * só e a hierarquia da página some.
 */
export function SignalList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('sits', className)}>{children}</div>;
}
