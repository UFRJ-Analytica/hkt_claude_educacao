import { Building2, ClipboardCheck, Megaphone, Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiSource, buscarUnidades, resumoUnidade } from '@/api/client';
import type { CriterioId, FiltrosUnidade, Grupamento, Horario, InscritoUnidade, ResumoUnidade, Unidade } from '@/api/types';
import { Page, TopBar } from '@/components/shell';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogDescription, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { CRE_NOMES } from '@/mocks/bairros';
import { todasUnidades } from '@/mocks/unidades';
import { cn } from '@/lib/utils';
import { AbaConvocacao, type CobrancaDocumento } from './AbaConvocacao';
import { AbaValidacao } from './AbaValidacao';

const KEY_UNIDADE = 'creche-app:unidade-diretor';
const GRUPAMENTOS: Grupamento[] = ['Berçário', 'Maternal I', 'Maternal II'];
const HORARIOS: Horario[] = ['Integral', 'Parcial'];

/** Unidade padrão da demo: a mesma das inscrições de exemplo (CRE 7, Maternal I). */
function unidadePadrao(): string {
  try {
    const salvo = localStorage.getItem(KEY_UNIDADE);
    if (salvo) return salvo;
  } catch {
    /* sem armazenamento */
  }
  // Demo: a unidade com mais inscritos que oferta Maternal I (a turma das inscrições de exemplo).
  const candidatas = todasUnidades().filter((u) => u.ofertas.some((o) => o.grupamento === 'Maternal I'));
  const soma = (u: Unidade) => u.ofertas.reduce((s, o) => s + o.inscritos, 0);
  return [...candidatas].sort((a, b) => soma(b) - soma(a))[0]?.id ?? todasUnidades()[0].id;
}

function Chip({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-pressed={ativo} onClick={onClick} className={cn('h-11 rounded-full border px-3.5 text-[13px] font-semibold transition-colors lg:h-9 lg:px-3', ativo ? 'border-brand bg-brand text-brand-ink' : 'border-line-2 bg-surface text-ink-2 hover:border-line-3')}>
      {children}
    </button>
  );
}

function Numero({ rotulo, valor, detalhe, tom = 'neutro' }: { rotulo: string; valor: number | string; detalhe?: string; tom?: 'neutro' | 'warn' | 'ok' }) {
  return (
    <div className="min-w-0 rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-e1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{rotulo}</p>
      <p className={cn('font-mono text-[24px] font-semibold leading-tight tnum', tom === 'warn' ? 'text-warn' : tom === 'ok' ? 'text-ok' : 'text-ink')}>{valor}</p>
      {detalhe ? <p className="line-clamp-2 text-[11px] leading-snug text-ink-3">{detalhe}</p> : null}
    </div>
  );
}

/**
 * Perfil da creche: uma tela, duas abas. O diretor valida o que a família
 * declarou e fala com a família antes do prazo acabar. Sem mapa, sem painel
 * gerencial — ele entra direto na unidade dele.
 */
export function PerfilCreche() {
  const [unidadeId, setUnidadeId] = useState<string>(unidadePadrao);
  const [filtros, setFiltros] = useState<FiltrosUnidade>({ grupamento: null, horario: null });
  const [resumo, setResumo] = useState<ResumoUnidade | null>(null);
  const [aba, setAba] = useState<'validacao' | 'convocacao'>('validacao');
  const [versao, setVersao] = useState(0);
  const [seletor, setSeletor] = useState(false);
  const [cobranca, setCobranca] = useState<CobrancaDocumento | null>(null);
  const [origem, setOrigem] = useState<string | null>(null);

  useEffect(() => {
    apiSource().then((s) => setOrigem(s.note));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY_UNIDADE, unidadeId);
    } catch {
      /* sem armazenamento */
    }
  }, [unidadeId]);

  useEffect(() => {
    let vivo = true;
    resumoUnidade(unidadeId, filtros).then((r) => {
      if (vivo) setResumo(r);
    });
    return () => {
      vivo = false;
    };
  }, [unidadeId, filtros, versao]);

  const mudou = useCallback(() => setVersao((v) => v + 1), []);
  const cobrar = useCallback((inscrito: InscritoUnidade, criterio: CriterioId) => {
    setCobranca({ inscrito, criterio });
    setAba('convocacao');
  }, []);

  const u = resumo?.unidade ?? null;

  return (
    <>
      <TopBar voltarPara="/" />
      <Page largo comRodape={false} className="pt-4">
        {/* identificação */}
        <header className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Perfil da creche · direção</p>
            <h1 className="text-[22px] font-bold leading-tight tracking-tight text-ink sm:text-[26px]">{u?.nome ?? 'Carregando unidade…'}</h1>
            {u ? (
              <p className="text-[13px] text-ink-2">
                {u.tipo} · {u.id} · {u.cre}ª CRE ({CRE_NOMES[u.cre]}) · {u.endereco}, {u.bairro} · {resumo?.telefone}
              </p>
            ) : null}
          </div>
          <Button variant="outline" size="lg" onClick={() => setSeletor(true)}>
            <Building2 />
            Trocar unidade
          </Button>
        </header>

        {/* três números */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          <Numero rotulo="Na fila" valor={resumo?.naFila ?? '—'} detalhe="crianças distintas" />
          <Numero rotulo="Aguardando validação" valor={resumo?.aguardandoValidacao ?? '—'} detalhe="critério pendente" tom={resumo && resumo.aguardandoValidacao > 0 ? 'warn' : 'neutro'} />
          <Numero rotulo="Vagas abertas" valor={resumo?.vagasAbertas.total ?? '—'} detalhe={resumo ? `${resumo.vagasAbertas.prioritarias} prior. · ${resumo.vagasAbertas.gerais} gerais` : undefined} tom={resumo && resumo.vagasAbertas.total > 0 ? 'ok' : 'neutro'} />
        </div>

        {/* filtros */}
        <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filtros de grupamento e turno">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Grupamento</span>
          <Chip ativo={filtros.grupamento === null} onClick={() => setFiltros((f) => ({ ...f, grupamento: null }))}>
            Todos os grupamentos
          </Chip>
          {GRUPAMENTOS.map((g) => (
            <Chip key={g} ativo={filtros.grupamento === g} onClick={() => setFiltros((f) => ({ ...f, grupamento: g }))}>
              {g}
            </Chip>
          ))}
          <span className="mx-1 hidden h-6 w-px bg-line-2 sm:block" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Turno</span>
          <Chip ativo={filtros.horario === null} onClick={() => setFiltros((f) => ({ ...f, horario: null }))}>
            Todos os turnos
          </Chip>
          {HORARIOS.map((h) => (
            <Chip key={h} ativo={filtros.horario === h} onClick={() => setFiltros((f) => ({ ...f, horario: h }))}>
              {h}
            </Chip>
          ))}
        </div>

        <Tabs value={aba} onValueChange={(v) => setAba(v as 'validacao' | 'convocacao')}>
          <TabsList variant="underline" className="mb-3 w-full sm:w-auto">
            <TabsTab value="validacao" className="gap-1.5">
              <ClipboardCheck className="size-4" /> Validação
            </TabsTab>
            <TabsTab value="convocacao" className="gap-1.5">
              <Megaphone className="size-4" /> Convocação
            </TabsTab>
          </TabsList>
          <TabsPanel value="validacao" keepMounted={false}>
            {u ? <AbaValidacao unidade={u} filtros={filtros} versao={versao} onMudou={mudou} onCobrarDocumento={cobrar} /> : null}
          </TabsPanel>
          <TabsPanel value="convocacao" keepMounted={false}>
            {u && resumo ? <AbaConvocacao unidade={u} telefoneUnidade={resumo.telefone} filtros={filtros} versao={versao} onMudou={mudou} cobranca={cobranca} onCobrancaTratada={() => setCobranca(null)} /> : null}
          </TabsPanel>
        </Tabs>

        <p className="mt-8 text-[12px] leading-snug text-ink-3">
          {origem ? `${origem}. ` : ''}{resumo?.proxyVagas}. Todo ato registrado aqui tem autor e horário e não é apagado. Nenhum número desta tela vem de modelo de linguagem.
        </p>
      </Page>

      <SeletorUnidade aberto={seletor} onFechar={() => setSeletor(false)} onEscolher={(id) => { setUnidadeId(id); setSeletor(false); setCobranca(null); }} />
    </>
  );
}

function SeletorUnidade({ aberto, onFechar, onEscolher }: { aberto: boolean; onFechar: () => void; onEscolher: (id: string) => void }) {
  const [termo, setTermo] = useState('');
  const [lista, setLista] = useState<Unidade[]>([]);
  useEffect(() => {
    if (!aberto) return;
    let vivo = true;
    buscarUnidades(termo).then((l) => {
      if (vivo) setLista(l);
    });
    return () => {
      vivo = false;
    };
  }, [termo, aberto]);
  const vazio = useMemo(() => lista.length === 0, [lista]);
  return (
    <Dialog open={aberto} onOpenChange={(o) => !o && onFechar()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Escolher unidade</DialogTitle>
          <DialogDescription>No dia do evento, sem login: busque pelo nome, bairro ou código. Fora dele, a unidade vem do usuário autenticado.</DialogDescription>
        </DialogHeader>
        <DialogPanel className="max-h-[60vh]">
          <label className="relative mb-3 block">
            <span className="sr-only">Buscar unidade</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
            <input autoFocus type="search" value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="Nome, bairro ou código" className="h-11 w-full rounded-lg border border-input bg-surface pl-9 pr-9 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/24" />
            {termo ? (
              <button type="button" aria-label="Limpar" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-surface-2" onClick={() => setTermo('')}>
                <X className="size-4" />
              </button>
            ) : null}
          </label>
          {vazio ? (
            <Aviso tipo="warn">Nenhuma unidade encontrada.</Aviso>
          ) : (
            <ul className="grid gap-1.5">
              {lista.map((u) => (
                <li key={u.id}>
                  <button type="button" onClick={() => onEscolher(u.id)} className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-left hover:border-brand">
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-semibold text-ink">{u.nome}</span>
                      <span className="block text-[12px] text-ink-3">
                        {u.tipo} · {u.bairro} · {u.cre}ª CRE
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-ink-3">{u.id}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
}
