import type { ReactNode } from 'react';
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toolbar } from '@/components/ui/toolbar';
import { cn } from '@/lib/utils';

/**
 * A régua de recorte que abre quase toda tela: o que estou olhando, de que
 * período, ordenado como — e, encostado à direita, o tamanho do recorte.
 *
 * Sobre o `Toolbar` do coss porque é literalmente isto: um agrupamento de
 * controles com `role="toolbar"`. O Base UI só arma navegação por setas para
 * itens registrados (`ToolbarButton`, `ToolbarInput`); como os controles aqui
 * são `<select>` nativos, a lista de itens fica vazia e o manipulador de
 * teclado sai sem `preventDefault` — as setas continuam abrindo o select.
 *
 * As classes extras neutralizam o que o Toolbar traz de cartão (raio, borda
 * nos quatro lados) e o legado não declara. Tudo que `.filterbar` declara —
 * flex, gap, padding, régua inferior, corpo, cor, fundo — ganha sozinho, por
 * `legacy.css` estar fora de `@layer`.
 */
export function FilterBar({
  children,
  right,
  className,
}: {
  children?: ReactNode;
  /** Contexto do recorte, alinhado à direita e em mono. Nunca um controle. */
  right?: ReactNode;
  className?: string;
}) {
  return (
    <Toolbar className={cn('filterbar rounded-none border-0', className)}>
      {children}
      {right ? <span className="right">{right}</span> : null}
    </Toolbar>
  );
}

/**
 * Um controle da régua: rótulo apagado seguido do valor em destaque. Quando
 * envolve um `<select>`, precisa ser `<label>` para que o clique no rótulo
 * chegue ao controle — daí a prop `as`.
 */
export function FilterControl({
  label,
  children,
  as = 'span',
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  as?: 'span' | 'label';
  className?: string;
}) {
  const content = (
    <>
      <span>{label}</span>
      {children}
    </>
  );
  return as === 'label' ? (
    <label className={cn('ctl', className)}>{content}</label>
  ) : (
    <span className={cn('ctl', className)}>{content}</span>
  );
}

/**
 * O `<select>` da régua, agora `Select` do coss.
 *
 * Por que existe: `.ctl select` casa o ELEMENTO `select`, e o gatilho do coss
 * é um `<button>` — a regra legada não o alcança, e o visual do registry
 * (raio, borda nos quatro lados, min-height, sombra, anel de foco) vazava.
 * Quatro telas resolveram isso sozinhas, três com uma string de utilities e
 * uma com `style` inline; as quatro copiavam a mesma receita. Aqui a receita
 * volta a ser CSS legado (`.ctltrigger`, sem camada), que é o mecanismo que o
 * resto da migração usa — então nenhuma tela precisa de `!` nem de neutralizador.
 *
 * `items` é declarado antes da renderização de propósito: é o padrão
 * items-first do coss, e é o que faz `SelectValue` resolver o rótulo sem
 * depender de os filhos já terem montado.
 */
export function FilterSelect<T extends string>({
  label,
  value,
  onValueChange,
  items,
  ariaLabel,
  className,
}: {
  /** Rótulo apagado à esquerda. Some quando o controle já se explica. */
  label?: ReactNode;
  value: T;
  onValueChange: (value: T) => void;
  items: { value: T; label: string }[];
  /** Nome acessível do gatilho, quando `label` não é dado. */
  ariaLabel?: string;
  className?: string;
}) {
  const trigger = (
    <Select
      items={items}
      onValueChange={(v: string | null) => onValueChange((v ?? '') as T)}
      value={value}
    >
      <SelectTrigger aria-label={ariaLabel} className={cn('ctltrigger', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );

  // `as="span"` e não `label`: envolver o gatilho (um <button>) num <label>
  // faz o clique no rótulo abrir e fechar o popup no mesmo gesto.
  return label === undefined ? trigger : <FilterControl label={label}>{trigger}</FilterControl>;
}
