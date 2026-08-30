import type { Attention } from '@/domain/indicators';
import { Meter, MeterIndicator } from '@/components/ui/meter';
import { cn } from '@/lib/utils';

/**
 * A cor do preenchimento sai da rampa de atenção e de mais nada. `--accent` é
 * do domínio da IA, da ação e do foco: usá-lo aqui faria uma barra de dado
 * parecer um botão. Sem nível, a barra é cinza — medida sem julgamento.
 */
const FILL: Record<Attention, string> = {
  none: 'bg-ink-3',
  low: 'bg-attn-1',
  degraded: 'bg-attn-1',
  attention: 'bg-attn-2',
  critical: 'bg-attn-3',
  unreadable: 'bg-ink-3',
};

/**
 * A barra de escalar limitado que aparece em toda tela (`.gauge`, `.bar`,
 * `.gbar`, `.track`). É `Meter` do coss, não `Progress`: nada aqui está
 * progredindo, é uma medida dentro de um domínio conhecido — e o `role="meter"`
 * é o que dá ao leitor de tela o mesmo número que o olho recebe da largura.
 *
 * O valor é 0..1 porque é assim que o backend entrega razão; `max={1}` evita
 * que a tela multiplique por 100 no caminho. Geometria padrão é a de `.gauge`
 * (5px, raio 3px); as demais chegam por `className` — `h-[4px] w-[50px]` para
 * a célula de métrica, `h-[7px]` para a barra de carência.
 */
export function Bar({
  value,
  level,
  label,
  className,
  indicatorClassName,
}: {
  /** Fração de 0 a 1. Fora da faixa, o Base UI já clampa. */
  value: number;
  level?: Attention;
  /** Nome acessível. Sem ele o `role="meter"` fica sem rótulo. */
  label?: string;
  className?: string;
  /** Escape para o preenchimento de confiança, único que usa o acento. */
  indicatorClassName?: string;
}) {
  return (
    <Meter
      aria-label={label}
      className={cn('block h-[5px] w-full overflow-hidden rounded-[3px] bg-line', className)}
      max={1}
      value={value}
    >
      <MeterIndicator
        className={cn(
          // `inherit` e não um raio fixo: o legado dá 2px em `.bar` e 3px em
          // `.gauge`, e a regra que casava isso (`.bar i`) não alcança mais o
          // indicador, que é <div> e não <i>. Herdar do contêiner faz o raio
          // seguir a classe legada sozinho, em vez de cada tela lembrar.
          'block rounded-[inherit] transition-none',
          FILL[level ?? 'none'],
          indicatorClassName,
        )}
      />
    </Meter>
  );
}

/**
 * O hachurado: não é zero, é "não dá para ler". A distinção entre um valor
 * baixo e uma leitura bloqueada é a coisa mais importante que este produto
 * comunica, e ela mora na textura, não na cor.
 *
 * Segue `<span>` sem `display` declarado, exatamente como no legado — quem
 * precisar de bloco pede `className="block w-full"`, que é o que as telas já
 * fazem hoje via `.turmacell .hatchbar`.
 */
export function HatchBar({ className, title }: { className?: string; title?: string }) {
  return <span className={cn('hatchbar', className)} role="presentation" title={title} />;
}
