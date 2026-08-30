import { cn } from '@/lib/utils';

/**
 * O que o sistema se recusa a responder.
 *
 * `.cannot` é uma superfície de honestidade do produto, não um aviso técnico:
 * lista, em português corrido, as perguntas que a ferramenta não vai responder
 * mesmo tendo o dado — ranking de professor, score individual de aluno, decisão
 * automatizada. Aparece três vezes (duas no copiloto, uma no plano de ação da
 * escola) e a estrutura é sempre a mesma: um rótulo mono em `--void` e uma
 * sequência de parágrafos curtos.
 *
 * A cor é `--void`, o cinza da ausência — nem a rampa de atenção nem o acento.
 * Recusa não é gravidade de dado nem ação disponível; é limite. E o espaçamento
 * entre parágrafos vem de `.cannot p + p`, o que exige que cada item seja um
 * `<p>` irmão do anterior: agrupar em `<ul>` ou envolver em `<div>` quebraria a
 * régua de 6px.
 *
 * Sem primitivo do coss. `Alert` fixaria `role="alert"`, e uma lista de limites
 * declarados não é uma notificação — é texto de contrato.
 */
export function Guardrails({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={cn('cannot', className)}>
      <div className="h">{title}</div>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}
