import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * A fileira de identificadores de uma unidade (`.codes`).
 *
 * Não é metadado decorativo: é a procedência. "INEP 33012345" e "INEP não
 * cruzado" são afirmações opostas sobre o quanto se pode confiar em tudo o
 * que a tela mostra abaixo, e `real` marca justamente a diferença entre um
 * identificador que veio de fonte oficial e um que o produto inventou para
 * demonstração. Por isso `.realtag` pinta em `--ok` — é uma afirmação sobre
 * origem, não um nível de atenção, e não pode entrar na rampa.
 *
 * O Badge do coss entra pela semântica (chip de status, foco e ícone já
 * resolvidos) e a aparência continua sendo `.codes span` do legado, que por
 * estar fora de camada ganha em família, corpo, cor, borda, raio e padding.
 * `NEUTRALIZE` desfaz só o que o Badge acrescenta e o legado não declara —
 * a mesma lista de `StatusTag.tsx`, pelo mesmo motivo: sem ela o chip nasce
 * com altura fixa e FUNDO PETRÓLEO, e petróleo é ação, nunca identidade.
 */
const NEUTRALIZE = 'inline h-auto min-w-0 bg-transparent font-normal sm:h-auto sm:min-w-0';

export interface CodeItem {
  label: string;
  /** Identificador de fonte oficial. Vira `.realtag`. */
  real?: boolean;
}

export function Codes({ items, className }: { items: CodeItem[]; className?: string }) {
  return (
    <div className={cn('codes', className)}>
      {items.map((item) => (
        <Badge className={cn(item.real && 'realtag', NEUTRALIZE)} key={item.label}>
          {item.label}
        </Badge>
      ))}
    </div>
  );
}
