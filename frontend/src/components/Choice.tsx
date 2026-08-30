import type { ReactNode } from 'react';
import { Bar } from '@/components/Bar';
import { RadioGroup, RadioPrimitive } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

/**
 * Os dois controles de recorte do mapa. Parecem o mesmo widget e não são: um
 * escolhe *o que* está pintado, o outro escolhe *quem* está na tela. A
 * diferença de semântica decide o primitivo antes de qualquer estilo.
 */

/**
 * Escolha exclusiva com um valor sempre ativo — o indicador que pinta o mapa.
 *
 * É `RadioGroup`, não `ToggleGroup`: o guia de segmented control é explícito em
 * que Toggle Group permite limpar a seleção, e aqui nunca existe "mapa sem
 * indicador". Tirar o valor deixaria os pontos sem cor e a legenda sem sentido.
 *
 * Os itens são `RadioPrimitive.Root` com `render={<button>}`, e não o `Radio`
 * estilizado do coss, porque o `Radio` desenha a bolinha nativa — que é
 * exatamente o que uma apresentação segmentada não quer. É o caminho que o
 * próprio guia recomenda. Como o primitivo cru não traz classe nenhuma,
 * `.segmented button` e `.segmented button.on` continuam mandando sozinhos, e
 * de brinde vem a navegação por setas do grupo de rádio, que os `<button>`
 * soltos de hoje não têm.
 */
export function SegmentedChoice<T extends string>({
  items,
  value,
  onChange,
  label,
  className,
}: {
  items: { id: T; label: ReactNode }[];
  value: T;
  onChange: (id: T) => void;
  /** Nome acessível do grupo. Sem ele o `role="radiogroup"` fica mudo. */
  label: string;
  className?: string;
}) {
  return (
    <RadioGroup
      aria-label={label}
      className={cn('segmented', className)}
      onValueChange={(next) => onChange(next as T)}
      value={value}
    >
      {items.map((item) => (
        <RadioPrimitive.Root
          className={value === item.id ? 'on' : undefined}
          key={item.id}
          nativeButton
          render={<button type="button" />}
          value={item.id}
        >
          {item.label}
        </RadioPrimitive.Root>
      ))}
    </RadioGroup>
  );
}

export interface ChoiceItem {
  id: string;
  label: ReactNode;
  /** Contagem à direita da linha: `.tn` na lista de tipos, `.cv` na de CREs. */
  count?: ReactNode;
  /** Código curto da coluna de 26px (`.cn`). Só a lista com medidor tem. */
  code?: ReactNode;
  /** Fração 0..1 do medidor embutido (`.cb`). Zero não desenha barra. */
  share?: number;
}

/**
 * O que o `ToggleGroup` do coss traz e `.typelist`/`.crelist` não declaram: a
 * largura de conteúdo. Numa coluna lateral que se espera cheia, `w-fit`
 * encolheria a lista até o item mais largo.
 */
const LIST = 'w-auto';

/**
 * O mesmo, no item. `.typerow`/`.crerow` declaram display, alinhamento, gap,
 * padding, raio e transição, e ganham por `legacy.css` estar fora de camada —
 * e o reset `button { font: inherit; color: inherit; background: none; border: 0;
 * padding: 0 }` já mata sozinho tipografia, cor, fundo e borda do coss. Restam
 * quatro coisas: a altura fixa de 36px do tamanho `default`, a largura mínima,
 * a centralização do conteúdo e o `::before`. O anel de foco do coss também sai,
 * porque `:focus-visible` global já desenha um contorno e dois seriam ruído.
 */
const ROW =
  'h-auto min-w-0 justify-normal before:hidden focus-visible:ring-0 sm:h-auto sm:min-w-0';

/**
 * A lista de recorte: tipos de unidade (multisseleção) e coordenadorias
 * (seleção única, limpável, com medidor na linha).
 *
 * É `ToggleGroup` porque é filtro reversível: nenhum tipo marcado e nenhuma CRE
 * marcada são estados válidos e frequentes — significam "a rede inteira". Isso
 * é precisamente o que separa Toggle Group de Radio Group no guia.
 *
 * O medidor usa `Bar`, que é `Meter` do coss: a fração de unidades em atenção
 * dentro da CRE é escalar limitado, não progresso. O nível é fixo em
 * `attention` porque `.crerow .cb i` sempre pintou `--a2` — rampa de atenção,
 * nunca o acento, que ali seria confundido com o estado selecionado da linha.
 */
export function FilterChipList({
  items,
  selected,
  onToggle,
  showMeter,
  mode = 'multiple',
  label,
  meterLabel = 'unidades em atenção',
  className,
}: {
  items: ChoiceItem[];
  /** `Set` para multisseleção; string ou `null` para seleção única. */
  selected: Set<string> | string | null;
  /** Recebe o id que mudou — a tela decide se isso é entrar ou sair. */
  onToggle: (id: string) => void;
  /** Liga a linha de três colunas com código, medidor e contagem (`.crerow`). */
  showMeter?: boolean;
  mode?: 'single' | 'multiple';
  label: string;
  meterLabel?: string;
  className?: string;
}) {
  const selectedIds =
    selected instanceof Set ? Array.from(selected) : selected ? [selected] : [];
  const isOn = (id: string) => selectedIds.includes(id);

  // O grupo devolve o array inteiro; a tela quer saber qual item mudou. Como
  // um clique move exatamente um id, o diff resolve os dois modos de uma vez —
  // inclusive o clique que limpa a seleção única, que chega como array vazio.
  const handleChange = (next: string[]) => {
    const added = next.find((id) => !isOn(id));
    if (added !== undefined) {
      onToggle(added);
      return;
    }
    const removed = selectedIds.find((id) => !next.includes(id));
    if (removed !== undefined) onToggle(removed);
  };

  return (
    <ToggleGroup
      aria-label={label}
      className={cn(showMeter ? 'crelist' : 'typelist', LIST, className)}
      multiple={mode === 'multiple'}
      onValueChange={handleChange}
      orientation="vertical"
      value={selectedIds}
    >
      {items.map((item) => (
        <ToggleGroupItem
          className={cn(showMeter ? 'crerow' : 'typerow', isOn(item.id) && 'on', ROW)}
          key={item.id}
          value={item.id}
        >
          {showMeter ? (
            <>
              <span className="cn">{item.code ?? item.id}</span>
              {/* `.cl` é a célula do meio do grid 26px/1fr/26px. Não tem regra
                  em lugar nenhum do CSS — ver o relatório —, mas remover o
                  invólucro quebraria as três colunas. */}
              <span className="cl">
                <span className="ct">{item.label}</span>
                {item.share ? (
                  <Bar
                    className="cb"
                    indicatorClassName="rounded-[2px] transition-[width] duration-[0.4s] ease-pulso"
                    label={meterLabel}
                    level="attention"
                    value={item.share}
                  />
                ) : null}
              </span>
              <span className="cv">{item.count ?? '—'}</span>
            </>
          ) : (
            <>
              <span className="tt">{item.label}</span>
              <span className="tn">{item.count}</span>
            </>
          )}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
