import { ArrowDown, ArrowUp, ArrowUpDown, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { listarInscritos } from '@/api/client';
import type { CriterioId, FiltrosUnidade, Grupamento, InscritoUnidade, Unidade } from '@/api/types';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { OpcaoTag, Pilula, ProgressoCriterios, rotuloPar } from './comum';
import { DetalheInscrito, idadeTexto, SEXO_LABEL } from './DetalheInscrito';

export interface AbaValidacaoProps {
  unidade: Unidade;
  filtros: FiltrosUnidade;
  /** Chave que muda quando algo externo alterou dados (força recarga). */
  versao: number;
  /** Notifica o cabeçalho para recalcular os números. */
  onMudou: () => void;
  /** "Cobrar documento": leva à aba de convocação com o modelo M4 para esta criança. */
  onCobrarDocumento: (inscrito: InscritoUnidade, criterio: CriterioId) => void;
}

/* ---------- filtro rápido e ordenação ---------- */

type ChipId = 'decide' | 'pendencia' | 'confirmado' | 'todos';
type Coluna = 'posicao' | 'declarada' | 'opcao';
interface Ordem {
  por: Coluna;
  dir: 'asc' | 'desc';
}

const CHIPS: Array<{ id: ChipId; rotulo: string; dica: string }> = [
  { id: 'decide', rotulo: 'Decide vaga', dica: 'Na borda do corte: confirmar ou recusar aqui muda quem entra' },
  { id: 'pendencia', rotulo: 'Com pendência', dica: 'Pelo menos um critério ainda sem decisão da direção' },
  { id: 'confirmado', rotulo: 'Tudo confirmado', dica: 'Todos os critérios declarados já foram decididos' },
  { id: 'todos', rotulo: 'Todos', dica: 'Todos os inscritos da unidade com os filtros acima' },
];

const COLUNAS: Array<{ id: Coluna; rotulo: string; padrao: Ordem['dir'] }> = [
  { id: 'posicao', rotulo: 'Posição', padrao: 'asc' },
  { id: 'declarada', rotulo: 'Declarada', padrao: 'desc' },
  { id: 'opcao', rotulo: 'Opção', padrao: 'asc' },
];

const ORDEM_GRUPAMENTO: Record<Grupamento, number> = { Berçário: 0, 'Maternal I': 1, 'Maternal II': 2 };

function temPendencia(i: InscritoUnidade): boolean {
  return i.criterios.some((c) => c.estado === 'pendente');
}
function passaChip(i: InscritoUnidade, chip: ChipId): boolean {
  if (chip === 'decide') return i.decideVaga;
  if (chip === 'pendencia') return temPendencia(i);
  if (chip === 'confirmado') return i.criterios.length > 0 && !temPendencia(i);
  return true;
}
/** Mantém cada fila (grupamento × turno) junta quando o filtro do cabeçalho está em "Todos". */
function cmpPar(a: InscritoUnidade, b: InscritoUnidade): number {
  return ORDEM_GRUPAMENTO[a.grupamento] - ORDEM_GRUPAMENTO[b.grupamento] || a.horario.localeCompare(b.horario);
}
function ordenar(lista: InscritoUnidade[], ordem: Ordem): InscritoUnidade[] {
  const s = ordem.dir === 'asc' ? 1 : -1;
  const primario = (a: InscritoUnidade, b: InscritoUnidade): number => {
    if (ordem.por === 'declarada') return s * (a.pontosDeclarados - b.pontosDeclarados);
    if (ordem.por === 'opcao') return s * (a.opcao - b.opcao);
    return s * (cmpPar(a, b) || a.posicao - b.posicao);
  };
  return [...lista].sort((a, b) => primario(a, b) || cmpPar(a, b) || a.posicao - b.posicao);
}

/* ---------- aba ---------- */

/**
 * Aba de validação: o diretor confere critério por critério, criança por
 * criança. A lista entrega a evidência pronta; quem confirma é sempre ele.
 * Cartões no celular, tabela no desktop; o detalhe abre em painel sem trocar
 * de página.
 */
export function AbaValidacao({ unidade, filtros, versao, onMudou, onCobrarDocumento }: AbaValidacaoProps) {
  const mobile = useMediaQuery('max-lg');
  const [chip, setChip] = useState<ChipId>('decide');
  const [ordem, setOrdem] = useState<Ordem>({ por: 'posicao', dir: 'asc' });
  const [selecionado, setSelecionado] = useState<string | null>(null);
  // `chave` identifica unidade + filtros: só aí a lista mostra shimmer. Mudança de `versao` recarrega em silêncio.
  const chave = `${unidade.id}|${filtros.grupamento ?? ''}|${filtros.horario ?? ''}`;
  const [dados, setDados] = useState<{ chave: string; itens: InscritoUnidade[] } | null>(null);

  useEffect(() => {
    let vivo = true;
    listarInscritos(unidade.id, filtros).then((itens) => {
      if (vivo) setDados({ chave, itens });
    });
    return () => {
      vivo = false;
    };
  }, [unidade.id, filtros, versao, chave]);

  const recarregar = useCallback(async () => {
    const itens = await listarInscritos(unidade.id, filtros);
    setDados({ chave, itens });
  }, [unidade.id, filtros, chave]);

  const mudou = useCallback(async () => {
    await recarregar();
    onMudou();
  }, [recarregar, onMudou]);

  const carregando = !dados || dados.chave !== chave;
  const itens = useMemo(() => (carregando || !dados ? [] : dados.itens), [carregando, dados]);

  const contagem = useMemo(() => {
    const c: Record<ChipId, number> = { decide: 0, pendencia: 0, confirmado: 0, todos: 0 };
    for (const i of itens) for (const id of Object.keys(c) as ChipId[]) if (passaChip(i, id)) c[id] += 1;
    return c;
  }, [itens]);

  const visiveis = useMemo(() => ordenar(itens.filter((i) => passaChip(i, chip)), ordem), [itens, chip, ordem]);
  const inscritoSel = selecionado ? (itens.find((i) => i.codigo === selecionado) ?? null) : null;

  const ordenarPor = (col: Coluna) => {
    setOrdem((o) => (o.por === col ? { por: col, dir: o.dir === 'asc' ? 'desc' : 'asc' } : { por: col, dir: COLUNAS.find((c) => c.id === col)?.padrao ?? 'asc' }));
  };

  return (
    <div className="step-in">
      {/* filtro rápido */}
      <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filtro rápido">
        {CHIPS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={chip === c.id}
            title={c.dica}
            onClick={() => setChip(c.id)}
            className={cn('inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition-colors lg:h-9 lg:px-3', chip === c.id ? 'border-brand bg-brand text-brand-ink' : 'border-line-2 bg-surface text-ink-2 hover:border-line-3')}
          >
            {c.rotulo}
            {!carregando ? <span className={cn('rounded-full px-1.5 font-mono text-[11px] tnum', chip === c.id ? 'bg-brand-ink/15' : 'bg-surface-2 text-ink-3')}>{contagem[c.id]}</span> : null}
          </button>
        ))}
      </div>

      {/* ordenação no celular (no desktop é pelo cabeçalho da tabela) */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 lg:hidden" role="group" aria-label="Ordenar por">
        <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-3">Ordenar</span>
        {COLUNAS.map((c) => {
          const ativo = ordem.por === c.id;
          const I = !ativo ? ArrowUpDown : ordem.dir === 'asc' ? ArrowUp : ArrowDown;
          return (
            <button key={c.id} type="button" aria-pressed={ativo} onClick={() => ordenarPor(c.id)} className={cn('inline-flex h-11 items-center gap-1 rounded-lg border px-3 text-[13px] font-medium transition-colors', ativo ? 'border-brand-soft-2 bg-brand-soft text-brand' : 'border-line bg-surface text-ink-2')}>
              {c.rotulo}
              <I className="size-3.5" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {carregando ? (
        <div className="grid gap-2" aria-busy="true" aria-label="Carregando inscritos">
          {Array.from({ length: 6 }, (_, k) => (
            <div key={k} className="h-16 rounded-xl shimmer lg:h-12" />
          ))}
        </div>
      ) : itens.length === 0 ? (
        <Aviso tipo="info" titulo="Nenhum inscrito com estes filtros">Troque o grupamento ou o turno no cabeçalho para ver outras filas desta unidade.</Aviso>
      ) : visiveis.length === 0 ? (
        <Aviso tipo="ok" titulo={chip === 'pendencia' ? 'Nenhuma pendência' : chip === 'decide' ? 'Ninguém na borda do corte' : 'Nada aqui'}>
          <span>{chip === 'pendencia' ? 'Todos os critérios declarados já foram decididos. ' : chip === 'confirmado' ? 'Ainda não há criança com todos os critérios decididos. ' : ''}</span>
          <button type="button" className="font-semibold text-brand underline-offset-2 hover:underline" onClick={() => setChip('todos')}>
            Ver todos os {itens.length} inscritos
          </button>
        </Aviso>
      ) : (
        <>
          {/* desktop: tabela */}
          <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface shadow-e1 lg:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <CabecalhoOrdenavel coluna="posicao" rotulo="Posição" ordem={ordem} onOrdenar={ordenarPor} />
                  <Cabecalho>Criança</Cabecalho>
                  <Cabecalho>Grupamento · turno</Cabecalho>
                  <CabecalhoOrdenavel coluna="opcao" rotulo="Opção" ordem={ordem} onOrdenar={ordenarPor} />
                  <CabecalhoOrdenavel coluna="declarada" rotulo="Declarada" ordem={ordem} onOrdenar={ordenarPor} className="text-right" />
                  <Cabecalho className="text-right">Confirmada</Cabecalho>
                  <Cabecalho>Critérios</Cabecalho>
                  <Cabecalho>
                    <span className="sr-only">Ação</span>
                  </Cabecalho>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visiveis.map((i) => (
                  <LinhaInscrito key={i.codigo} i={i} selecionado={i.codigo === selecionado} onAbrir={() => setSelecionado(i.codigo)} />
                ))}
              </TableBody>
            </Table>
          </div>

          {/* celular: cartões */}
          <ul className="grid gap-2 lg:hidden">
            {visiveis.map((i) => (
              <CartaoInscrito key={i.codigo} i={i} selecionado={i.codigo === selecionado} onAbrir={() => setSelecionado(i.codigo)} />
            ))}
          </ul>
        </>
      )}

      {/* rodapé */}
      {!carregando ? (
        <p className="mt-3 text-[13px] text-ink-2 tnum" aria-live="polite">
          <strong className="font-semibold text-ink">{contagem.pendencia}</strong> de <strong className="font-semibold text-ink">{contagem.todos}</strong> inscritos com pendência
          {visiveis.length !== itens.length ? <span className="text-ink-3"> · mostrando {visiveis.length}</span> : null}
        </p>
      ) : null}

      <DetalheInscrito inscrito={inscritoSel} aberto={inscritoSel !== null} mobile={mobile} unidade={unidade} onFechar={() => setSelecionado(null)} onMudou={mudou} onCobrarDocumento={onCobrarDocumento} />
    </div>
  );
}

/* ---------- peças da lista ---------- */

const CLS_CABECALHO = 'h-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3';

function Cabecalho({ children, className }: { children: ReactNode; className?: string }) {
  return <TableHead className={cn(CLS_CABECALHO, className)}>{children}</TableHead>;
}

function CabecalhoOrdenavel({ coluna, rotulo, ordem, onOrdenar, className }: { coluna: Coluna; rotulo: string; ordem: Ordem; onOrdenar: (c: Coluna) => void; className?: string }) {
  const ativo = ordem.por === coluna;
  const I = !ativo ? ArrowUpDown : ordem.dir === 'asc' ? ArrowUp : ArrowDown;
  return (
    <TableHead aria-sort={ativo ? (ordem.dir === 'asc' ? 'ascending' : 'descending') : 'none'} className={cn(CLS_CABECALHO, className)}>
      <button type="button" onClick={() => onOrdenar(coluna)} className={cn('-mx-1 inline-flex h-9 items-center gap-1 rounded-md px-1 uppercase tracking-[0.1em] transition-colors hover:text-ink', ativo ? 'text-ink' : 'text-ink-3')} title={`Ordenar por ${rotulo.toLowerCase()}`}>
        {rotulo}
        <I className={cn('size-3.5', !ativo && 'opacity-60')} aria-hidden="true" />
      </button>
    </TableHead>
  );
}

function Posicao({ i, grande = false }: { i: InscritoUnidade; grande?: boolean }) {
  const dentro = i.posicao <= i.vagasDoPar;
  return (
    <span className={cn('font-mono font-semibold tnum', grande ? 'text-[16px]' : 'text-[15px]', dentro ? 'text-ok' : 'text-ink')} title={dentro ? 'Dentro das vagas do par' : 'Fora das vagas do par'}>
      {i.posicao}
      <span className="text-[12px] font-normal text-ink-3">/{i.vagasDoPar}</span>
    </span>
  );
}

function LinhaInscrito({ i, selecionado, onAbrir }: { i: InscritoUnidade; selecionado: boolean; onAbrir: () => void }) {
  const confirmados = i.criterios.filter((c) => c.estado === 'confirmado').length;
  return (
    <TableRow data-state={selecionado ? 'selected' : undefined} className="cursor-pointer" onClick={onAbrir}>
      <TableCell>
        <div className="flex flex-col gap-1">
          <Posicao i={i} />
          {i.decideVaga ? <span className="text-[11px] font-semibold text-warn">decide vaga</span> : null}
        </div>
      </TableCell>
      <TableCell className="max-w-[280px]">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[14px] font-semibold text-ink">{i.crianca.nome}</span>
            {i.origem === 'app' ? <Pilula tom="brand">inscrição do app</Pilula> : null}
          </div>
          <span className="text-[12px] text-ink-3">
            {idadeTexto(i.crianca.nascimento)} · {SEXO_LABEL[i.crianca.sexo]}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-[13px] text-ink-2">{rotuloPar(i.grupamento, i.horario)}</TableCell>
      <TableCell>
        <OpcaoTag opcao={i.opcao} aceitaRealocacao={i.aceitaRealocacao} />
      </TableCell>
      <TableCell className="text-right font-mono text-[14px] text-ink-2 tnum">{i.pontosDeclarados}</TableCell>
      <TableCell className={cn('text-right font-mono text-[14px] font-semibold tnum', i.pontosConfirmados > 0 ? 'text-ok' : 'text-ink-3')}>{i.pontosConfirmados}</TableCell>
      <TableCell>{i.criterios.length === 0 ? <span className="text-[12px] text-ink-3">sem critério</span> : <ProgressoCriterios confirmados={confirmados} total={i.criterios.length} />}</TableCell>
      <TableCell className="text-right">
        <Button size="default" variant="outline" onClick={(e) => { e.stopPropagation(); onAbrir(); }} aria-label={`Abrir ${i.crianca.nome}`}>
          Abrir
          <ChevronRight />
        </Button>
      </TableCell>
    </TableRow>
  );
}

function CartaoInscrito({ i, selecionado, onAbrir }: { i: InscritoUnidade; selecionado: boolean; onAbrir: () => void }) {
  const confirmados = i.criterios.filter((c) => c.estado === 'confirmado').length;
  return (
    <li className={cn('rounded-2xl border bg-surface p-3.5 shadow-e1 transition-colors', selecionado ? 'border-brand' : 'border-line')}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[15px] font-semibold leading-tight text-ink">{i.crianca.nome}</span>
            {i.origem === 'app' ? <Pilula tom="brand">inscrição do app</Pilula> : null}
            {i.decideVaga ? <Pilula tom="warn">decide vaga</Pilula> : null}
          </div>
          <p className="mt-0.5 text-[12px] text-ink-3">
            {idadeTexto(i.crianca.nascimento)} · {SEXO_LABEL[i.crianca.sexo]} · {rotuloPar(i.grupamento, i.horario)}
          </p>
        </div>
        <OpcaoTag opcao={i.opcao} aceitaRealocacao={i.aceitaRealocacao} />
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2">
        <FatoCartao rotulo="Posição">
          <Posicao i={i} grande />
        </FatoCartao>
        <FatoCartao rotulo="Declarada">
          <span className="font-mono text-[16px] text-ink-2 tnum">{i.pontosDeclarados}</span>
        </FatoCartao>
        <FatoCartao rotulo="Confirmada">
          <span className={cn('font-mono text-[16px] font-semibold tnum', i.pontosConfirmados > 0 ? 'text-ok' : 'text-ink-3')}>{i.pontosConfirmados}</span>
        </FatoCartao>
      </dl>
      <div className="mt-3 flex items-center justify-between gap-3">
        {i.criterios.length === 0 ? <span className="text-[12px] text-ink-3">sem critério declarado</span> : <ProgressoCriterios confirmados={confirmados} total={i.criterios.length} />}
        <Button size="lg" variant="outline" className="h-11 min-w-24" onClick={onAbrir} aria-label={`Abrir ${i.crianca.nome}`}>
          Abrir
          <ChevronRight />
        </Button>
      </div>
    </li>
  );
}

function FatoCartao({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-surface-2 px-2.5 py-1.5">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">{rotulo}</dt>
      <dd className="leading-tight">{children}</dd>
    </div>
  );
}
