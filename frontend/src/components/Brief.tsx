import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A abertura de uma tela: de onde estou olhando, o que o dado diz, e a ressalva.
 *
 * Seis instâncias em quatro telas repetiam a mesma tríade com dois vocabulários
 * — `.when` + `.brief h2` em Hoje, Unidade e Recomposição; `.when` + `.fluxoh` +
 * `.fluxop` em Fluxo. É o mesmo bloco em duas escalas, e a escala é a única
 * decisão real: `hero` abre a página (clamp até 2.7rem, medida de 20ch),
 * `section` abre uma seção dentro dela (clamp até 2.1rem, medida de 26ch).
 *
 * A manchete é a frase que o dado produziu, não um título fixo — por isso ela
 * chega como `headline` e não como nome de tela. É a única coisa que a pessoa
 * lê se ler uma coisa só.
 *
 * `SectionHeading` não serve para o eyebrow, e a razão não é estilo: `.when` é
 * 10.5px com entreletra 0.14em e 12px de respiro abaixo, contra 9.5px/0.13em
 * sem margem do `SectionHeading` — e, sobretudo, `SectionHeading` renderiza
 * `<h5>`. Um `h5` colado antes de um `h2` inverte a ordem de cabeçalhos da
 * página. `.when` é uma datalinha, não um cabeçalho.
 */
export function Brief({
  eyebrow,
  headline,
  lede,
  size = 'hero',
  className,
}: {
  /** Datalinha ou índice de seção: "01 · para onde o aluno vai". */
  eyebrow?: ReactNode;
  headline: ReactNode;
  /** A ressalva que impede a manchete de ser lida como conclusão. */
  lede?: ReactNode;
  size?: 'hero' | 'section';
  className?: string;
}) {
  if (size === 'section') {
    return (
      <div className={className}>
        {eyebrow ? <div className="when">{eyebrow}</div> : null}
        <h2 className="fluxoh">{headline}</h2>
        {lede ? <p className="fluxop">{lede}</p> : null}
      </div>
    );
  }

  return (
    // `.when` vive dentro de `.brief` porque `.brief` não declara nada além de
    // `.brief h2` — dentro ou fora, o respiro de 12px é o mesmo, e dentro
    // mantém o bloco inteiro como um nó só.
    <div className={cn('brief', className)}>
      {eyebrow ? <div className="when">{eyebrow}</div> : null}
      <h2>{headline}</h2>
      {/* `<div>`, não `<p>`: a regra global `p { margin: 0 }` está fora de
          camada e mataria qualquer `mt-*` vindo de utilitário. */}
      {lede ? (
        <div className="mt-[14px] max-w-[72ch] text-[13px] leading-[1.6] text-ink-2">{lede}</div>
      ) : null}
    </div>
  );
}
