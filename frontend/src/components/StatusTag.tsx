import type { ReactNode } from 'react';
import type { CapabilityStatus } from '@/api/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * As seis palavras que o produto usa para dizer em que pé está uma capacidade,
 * e as duas que classificam uma coluna de dado.
 *
 * A cor de cada estado continua em `legacy.css` (`.tag.AVAILABLE` e irmãs) e
 * não foi trazida para cá de propósito: são bordas em hexadecimal calibradas
 * uma a uma contra o fundo claro, e nenhuma delas tem token equivalente. Como
 * `legacy.css` não está em `@layer`, essas regras ganham do Badge do coss em
 * toda propriedade que declaram — família, corpo, entreletra, raio, padding,
 * cor e borda. O `cn` abaixo só neutraliza o que o Badge acrescenta e o legado
 * não declara: altura fixa, largura mínima, fundo e peso.
 *
 * `inline` importa: o Badge nasce `inline-flex`, e uma caixa atômica de 19,5px
 * dentro de uma célula de tabela empurraria a altura da linha. Em pai flex
 * (`.capline`, `.statepage .k`) os dois computam igual, então não há perda.
 */
const NEUTRALIZE = 'inline h-auto min-w-0 bg-transparent font-normal sm:h-auto sm:min-w-0';

export function CapabilityTag({
  status,
  children,
  className,
}: {
  status: CapabilityStatus;
  children?: ReactNode;
  className?: string;
}) {
  return <Badge className={cn('tag', status, NEUTRALIZE, className)}>{children ?? status}</Badge>;
}

export type ColumnFlagKind = 'pii' | 'key';

const FLAG_LABEL: Record<ColumnFlagKind, string> = {
  pii: 'PII provável',
  key: 'chave',
};

/**
 * O sinal de coluna do perfilador. `pii` empresta o topo da rampa de atenção
 * porque é um bloqueio; `key` usa o acento porque é uma afirmação sobre a
 * junção, não sobre risco.
 */
export function ColumnFlag({
  flag,
  children,
  className,
}: {
  flag: ColumnFlagKind;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Badge className={cn('flag', flag, NEUTRALIZE, className)}>{children ?? FLAG_LABEL[flag]}</Badge>
  );
}
