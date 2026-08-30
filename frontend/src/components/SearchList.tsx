import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

/**
 * A busca por unidade do mapa: campo com lupa embutida, botão de limpar e a
 * lista de resultados ancorada logo abaixo.
 *
 * Sobre a escolha do primitivo. `Combobox` e `Command` foram lidos e os dois
 * foram descartados pelo mesmo motivo: ambos assumem o posicionamento do popup
 * (portal + âncora própria) e a máquina de estado de aberto/destacado. Aqui o
 * `.results` é posicionado dentro do próprio `.mapsearch` — `top: calc(100% + 6px)`,
 * `left: -1px`, `right: -1px`, encaixando na borda do campo — e o `:focus-within`
 * que acende o anel depende de a lista ser descendente do campo. Portal quebra
 * as duas coisas, e fidelidade visual é o critério de aceite. Além disso a tela
 * já é dona de `q`, `matches` e `selected`; um Combobox controlado duplicaria
 * esse estado sem ganho.
 *
 * O que entra do coss é o `InputGroup`, que é exatamente o pedaço que importa:
 * a composição de afixos, o `display: contents` que devolve o `<input>` à linha
 * flex do `.mapsearch`, e o clique na lupa que joga o foco no campo.
 *
 * O que deliberadamente NÃO se faz aqui: fingir semântica de combobox. Marcar
 * `role="listbox"`/`role="option"` sem gerir `aria-activedescendant` e navegação
 * por setas deixaria a a11y pior do que está. Enquanto isso não existir, os
 * resultados continuam sendo botões — tabuláveis, anunciáveis — dentro de um
 * grupo nomeado.
 */

/**
 * O `InputGroup` traz três coisas que `.mapsearch` não declara e que apareceriam
 * na tela: um fundo `--canvas` (o campo mora sobre `--surface` e é transparente),
 * uma sombra de repouso e a linha de luz do `::before`. O anel de foco do coss
 * pode ficar: `.mapsearch:focus-within` declara `box-shadow` fora de camada e
 * ganha sempre.
 */
const FIELD = 'bg-transparent shadow-none before:hidden';

/**
 * O `<input>`, corrigido a partir da raiz e não pelo `className` do
 * `InputGroupInput` — que o coss aplica no `<span data-slot="input-control">`,
 * e esse span está em `display: contents` por regra do próprio `InputGroup`:
 * não gera caixa, então altura e padding postos nele não fazem nada.
 *
 * O reset global `input { font: inherit }` já mata corpo, família e entrelinha
 * do coss, e `.mapsearch input` declara borda, contorno, fundo, cor, corpo e
 * `flex`. Sobram a altura fixa de 34px e o padding lateral de 11px, que
 * empurrariam o campo para fora do gabarito. O `!` é necessário porque o
 * seletor do grupo (`:has(...) [input]`) tem especificidade maior que um
 * utilitário solto, e vale para as duas larguras de uma vez.
 */
const FIELD_INPUT = '**:[input]:h-auto! **:[input]:px-0!';

/**
 * A lupa. As classes não são cosmética: `size-*` e `opacity-*` no atributo
 * `class` são o que desativa as regras `[&_svg:not([class*='size-'])]` e
 * `svg:not([class*='opacity-'])` do addon, que senão inflariam o ícone para 18px
 * e o deixariam a 80% de opacidade. `mx-0!` cancela o `-mx-0.5` do addon, que
 * comeria 2px de cada lado do gap de 9px.
 */
const FIELD_ICON = 'size-[14px] opacity-100 mx-0!';

/** Os addons repetem o padding lateral de 11px que `.mapsearch` já aplica. */
const ADDON_START = 'ps-0';
const ADDON_END = 'pe-0 me-0!';

/**
 * O `×`. Mesma história do `.cardclose`: o reset de `button` mata tipografia,
 * cor, fundo, borda e padding do coss; resta a caixa quadrada do tamanho `icon-xs`,
 * que o legado não pede (ele dimensiona por conteúdo), o raio e o `::before`.
 */
const CLEAR = 'size-auto rounded-none before:hidden focus-visible:ring-0 sm:size-auto';

export function SearchInput({
  value,
  onValueChange,
  label,
  placeholder,
  clearLabel = 'Limpar busca',
  children,
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  /** Nome acessível do campo — não há `<label>` visível no desenho. */
  label: string;
  placeholder?: string;
  clearLabel?: string;
  /** A `<ResultList>`. Fica dentro do campo porque é ali que ela se ancora. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <InputGroup className={cn('mapsearch', FIELD, FIELD_INPUT, className)}>
      {/* O `InputGroupInput` vem antes dos addons por invariante do coss: é a
          ordem do DOM que faz o foco funcionar. Quem reordena visualmente são
          o `order-first`/`order-last` de cada addon. */}
      <InputGroupInput
        aria-label={label}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
      <InputGroupAddon align="inline-start" className={ADDON_START}>
        <svg
          aria-hidden="true"
          className={FIELD_ICON}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M16.5 16.5L21 21" />
        </svg>
      </InputGroupAddon>
      {value ? (
        <InputGroupAddon align="inline-end" className={ADDON_END}>
          <Button
            aria-label={clearLabel}
            className={cn('clear', CLEAR)}
            onClick={() => onValueChange('')}
            size="icon-xs"
            variant="ghost"
          >
            ×
          </Button>
        </InputGroupAddon>
      ) : null}
      {children}
    </InputGroup>
  );
}

/**
 * A gaveta de resultados. Absoluta dentro do campo, com régua entre linhas e
 * `max-height` de 280px — tudo em `.results`, nada aqui.
 */
export function ResultList({
  children,
  label = 'Resultados da busca',
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div aria-label={label} className={cn('results', className)} role="group">
      {children}
    </div>
  );
}

/**
 * Uma unidade encontrada: nome em cima, contexto de CRE e tipo embaixo. As duas
 * linhas são `<span>` de bloco porque `.results .rn` e `.results .rc` é que
 * definem corpo e cor — e é o contexto, não o nome, que resolve homônimo.
 */
export function ResultItem({
  name,
  context,
  onSelect,
  className,
}: {
  name: ReactNode;
  context?: ReactNode;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button className={className} onClick={onSelect} type="button">
      <span className="rn">{name}</span>
      {context ? <span className="rc">{context}</span> : null}
    </button>
  );
}
