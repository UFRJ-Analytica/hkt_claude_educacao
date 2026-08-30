import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * O cartão de procedência: por que o número que está logo acima é o número que
 * é, e do que ele não dá conta.
 *
 * Não é decoração nem aviso de erro. É a superfície onde o produto diz "a
 * identidade é real, a métrica é de demonstração" — a frase que impede a tela
 * inteira de ser lida como desempenho medido. Por isso a borda esquerda de 3px:
 * ela marca o bloco como comentário sobre o dado, não como dado.
 *
 * `alert` liga `.identityonly`, que troca a borda de `--ink-4` (neutra) para
 * `--a2` e tinge o fundo. Vale a distinção de sempre: `--a2` é a rampa de
 * atenção, e a cobertura ausente é exatamente isso — um grau de atenção sobre
 * a leitura. Nunca o acento, que é de IA e ação.
 *
 * Fica sem primitivo do coss de propósito. `Alert` seria o candidato, mas ele
 * fixa `role="alert"` — uma região viva que o leitor de tela anuncia na hora —
 * e este bloco é uma nota de rodapé permanente, não um alerta. Além disso o
 * `Alert` monta um grid de ícone que o legado não tem. Todo o desenho já está
 * em `.coverkard`/`.covermini`; envolver isso num primitivo só acrescentaria
 * semântica errada.
 */
export function CoverageCard({
  eyebrow,
  children,
  alert,
  footer,
  size = 'md',
  className,
}: {
  eyebrow: ReactNode;
  children: ReactNode;
  /**
   * Cobertura só de identidade. Hoje `Mapa.tsx` já sabe disto (compara
   * `metric_coverage.status === 'IDENTITY_ONLY'`) mas nunca passa a flag para
   * o `.covermini` — a regra `.covermini.identityonly` existe e nunca dispara.
   */
  alert?: boolean;
  footer?: ReactNode;
  size?: 'md' | 'sm';
  className?: string;
}) {
  const small = size === 'sm';
  return (
    <div className={cn(small ? 'covermini' : 'coverkard', alert && 'identityonly', className)}>
      {/* Em `sm` o rótulo tem de ser `<span>`: quem o estiliza é o seletor
          `.covermini span`. Em `md` é `.coverkard .k`. */}
      {small ? (
        <span className="mono">{eyebrow}</span>
      ) : (
        <div className="k">{eyebrow}</div>
      )}
      <p>{children}</p>
      {footer ? (
        small ? (
          // `<div>`, não `<span>`: `.covermini span` pegaria também o rodapé e
          // o devolveria em caixa alta de 9.5px com margem embaixo.
          <div className="mt-[8px] font-mono text-[10px] text-ink-3">{footer}</div>
        ) : (
          <span className="mono snap">{footer}</span>
        )
      ) : null}
    </div>
  );
}
