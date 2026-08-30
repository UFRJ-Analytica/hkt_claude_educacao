import type { ReactNode } from 'react';
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface DataColumn<Row> {
  /** Identidade estável da coluna. Cai para o índice quando não informada. */
  id?: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  /** Padrão: primeira coluna à esquerda (é o nome), as demais à direita. */
  align?: 'left' | 'right' | 'center';
  width?: number | string;
  /** Padrão: mono e tabular fora da primeira coluna — número se compara na vertical. */
  mono?: boolean;
  className?: string;
  headerClassName?: string;
}

const ALIGN = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
} as const;

/**
 * A tabela densa do produto, sobre as partes do `Table` do coss.
 *
 * O desenho é o de `table.r` no legado, reescrito em utilitário em vez de
 * carregar a classe `.r`: as regras legadas (`table.r td { font-family: mono;
 * text-align: right }`) não estão em camada e ganhariam de qualquer utilitário,
 * o que tornaria `align` e `mono` props decorativas. Reescrever é o que faz a
 * coluna mandar na própria célula.
 *
 * O que vem do coss e foi neutralizado: `h-10` no cabeçalho (a régua de 40px
 * não é a nossa), `leading-none` (o corpo herda 1.5 e a altura da linha depende
 * disso), `p-2.5` (o padding do legado é assimétrico: 8/10/8/0) e o realce de
 * hover nas linhas — que só faz sentido quando a linha leva a algum lugar.
 */
export function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  onRowClick,
  empty = 'Nada a mostrar neste recorte.',
  emptyDescription,
  minWidth,
  className,
}: {
  columns: DataColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string | number;
  onRowClick?: (row: Row, index: number) => void;
  /** Título do estado vazio. Diga o que falta, não "sem resultados". */
  empty?: ReactNode;
  emptyDescription?: ReactNode;
  minWidth?: number | string;
  className?: string;
}) {
  const flat = 'not-in-data-[variant=card]:hover:bg-transparent';

  return (
    <Table
      className={cn('w-full border-collapse text-[12px]', className)}
      style={minWidth ? { minWidth } : undefined}
    >
      <TableHeader>
        <TableRow className={flat}>
          {columns.map((c, i) => (
            <TableHead
              className={cn(
                'h-auto border-b border-b-ink p-0 pr-[10px] pb-2 font-mono text-[9px] font-medium uppercase leading-normal tracking-[0.1em] text-ink-3',
                ALIGN[c.align ?? (i === 0 ? 'left' : 'right')],
                c.headerClassName,
              )}
              key={c.id ?? i}
              style={c.width ? { width: c.width } : undefined}
            >
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, ri) => (
          <TableRow
            className={onRowClick ? 'cursor-pointer' : flat}
            key={getRowKey(row, ri)}
            onClick={onRowClick ? () => onRowClick(row, ri) : undefined}
            onKeyDown={
              onRowClick
                ? (e) => {
                    // Linha clicável precisa ser alcançável pelo teclado. O anel de
                    // foco vem da regra `:focus-visible` do produto, não do coss.
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRowClick(row, ri);
                    }
                  }
                : undefined
            }
            tabIndex={onRowClick ? 0 : undefined}
          >
            {columns.map((c, i) => (
              <TableCell
                className={cn(
                  'border-b border-b-line p-0 py-2 pr-[10px] leading-normal',
                  (c.mono ?? i !== 0) ? 'font-mono tabular-nums' : 'font-sans',
                  i === 0 ? 'text-ink' : 'text-ink-2',
                  ALIGN[c.align ?? (i === 0 ? 'left' : 'right')],
                  c.className,
                )}
                key={c.id ?? i}
              >
                {c.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {rows.length === 0 ? (
          <TableRow className={flat}>
            <TableCell className="whitespace-normal p-0" colSpan={columns.length}>
              <Empty className="gap-2 px-4 py-10 md:py-10">
                <EmptyTitle className="text-[13px] font-medium text-ink">{empty}</EmptyTitle>
                {emptyDescription ? (
                  <EmptyDescription className="text-[11.5px] text-ink-3">
                    {emptyDescription}
                  </EmptyDescription>
                ) : null}
              </Empty>
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
