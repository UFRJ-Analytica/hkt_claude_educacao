import { ArrowDown, ArrowUp, Briefcase, Home, ListOrdered, LocateFixed, MapPin, Plus, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { listarUnidades } from '@/api/client';
import type { UnidadeProxima } from '@/api/types';
import { BottomBar, Page, PageTitle, TopBar } from '@/components/shell';
import { Aviso, DemandaTag } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Drawer, DrawerFooter, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle } from '@/components/ui/drawer';
import { DEMANDA_DICA } from '@/domain/demanda';
import { formatarDistancia, RIO_CENTRO } from '@/domain/geo';
import { classificarIdade } from '@/domain/grupamento';
import { cn } from '@/lib/utils';
import { acharBairro } from '@/mocks/bairros';
import { MapaUnidades } from './MapaUnidades';
import { usePasso } from './usePasso';

const MAX = 5;
type Origem = 'casa' | 'trabalho' | 'gps';

export function PassoUnidades() {
  const p = usePasso('unidades');
  const { r, set } = p;
  const grupamento = classificarIdade(r.crianca.nascimento)?.grupamento ?? 'Maternal I';

  const [origem, setOrigem] = useState<Origem>('casa');
  const [gps, setGps] = useState<{ lat: number; lon: number } | null>(null);
  const [gpsErro, setGpsErro] = useState(false);
  const [bairro, setBairro] = useState('');
  const [bairroAplicado, setBairroAplicado] = useState('');
  const [unidades, setUnidades] = useState<UnidadeProxima[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [foco, setFoco] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const casaLat = r.endereco.lat;
  const casaLon = r.endereco.lon;
  const trabLat = r.usarTrabalho ? r.trabalho.lat : null;
  const trabLon = r.usarTrabalho ? r.trabalho.lon : null;

  // Só primitivos nas dependências: um objeto novo a cada render faria o
  // efeito de busca disparar em loop.
  const centro = useMemo<[number, number]>(() => {
    const b = bairroAplicado ? acharBairro(bairroAplicado) : null;
    if (b) return [b.lat, b.lon];
    if (origem === 'gps' && gps) return [gps.lat, gps.lon];
    if (origem === 'trabalho' && trabLat !== null && trabLon !== null) return [trabLat, trabLon];
    if (casaLat !== null && casaLon !== null) return [casaLat, casaLon];
    return [RIO_CENTRO.lat, RIO_CENTRO.lon];
  }, [origem, gps, trabLat, trabLon, casaLat, casaLon, bairroAplicado]);

  useEffect(() => {
    let vivo = true;
    setCarregando(true);
    listarUnidades({ lat: centro[0], lon: centro[1], grupamento, horario: r.horario, bairro: bairroAplicado || null, limite: 40 }).then((lista) => {
      if (!vivo) return;
      setUnidades(lista);
      setCarregando(false);
    });
    return () => {
      vivo = false;
    };
  }, [centro, grupamento, r.horario, bairroAplicado]);

  const usarGps = () => {
    if (gps) {
      setOrigem('gps');
      return;
    }
    if (!('geolocation' in navigator)) {
      setGpsErro(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGpsErro(false);
        setOrigem('gps');
        setBairroAplicado('');
        setBairro('');
      },
      () => setGpsErro(true),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const escolhidas = r.opcoes;
  const alternar = (id: string) => {
    setAviso(null);
    if (escolhidas.includes(id)) {
      set('opcoes', escolhidas.filter((x) => x !== id));
      return;
    }
    if (escolhidas.length >= MAX) {
      setAviso(`Você já escolheu ${MAX} creches. Remova uma para adicionar outra.`);
      return;
    }
    set('opcoes', [...escolhidas, id]);
  };
  const mover = (id: string, delta: -1 | 1) => {
    const i = escolhidas.indexOf(id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= escolhidas.length) return;
    const nova = [...escolhidas];
    [nova[i], nova[j]] = [nova[j], nova[i]];
    set('opcoes', nova);
  };

  const porId = useMemo(() => new Map(unidades.map((u) => [u.id, u])), [unidades]);
  const focada = foco ? porId.get(foco) ?? null : null;

  const listaOrdenada = useMemo(() => {
    if (!foco) return unidades;
    const f = unidades.find((u) => u.id === foco);
    return f ? [f, ...unidades.filter((u) => u.id !== foco)] : unidades;
  }, [unidades, foco]);

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape largo className="lg:grid lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-6">
        <div className="lg:sticky lg:top-[calc(var(--topbar-h)+20px)] lg:self-start">
          <PageTitle eyebrow={`Passo ${p.indice} de ${p.total} · ${grupamento} · ${r.horario}`} sub={`Até ${MAX} creches, em ordem de preferência. A cor mostra a demanda para a turma da sua criança.`}>
            Escolha as creches
          </PageTitle>

          <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Buscar a partir de">
            <Chip ativo={origem === 'casa' && !bairroAplicado} onClick={() => { setOrigem('casa'); setBairroAplicado(''); setBairro(''); }} I={Home}>
              Perto de casa
            </Chip>
            {r.usarTrabalho ? (
              <Chip ativo={origem === 'trabalho' && !bairroAplicado} onClick={() => { setOrigem('trabalho'); setBairroAplicado(''); setBairro(''); }} I={Briefcase}>
                Perto do trabalho
              </Chip>
            ) : null}
            <Chip ativo={origem === 'gps' && !bairroAplicado} onClick={usarGps} I={LocateFixed}>
              Onde estou
            </Chip>
          </div>
          <form
            className="mb-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setBairroAplicado(bairro.trim());
              setFoco(null);
            }}
          >
            <label className="relative flex-1">
              <span className="sr-only">Buscar por bairro</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
              <input
                type="search"
                placeholder="Ou digite um bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-surface pl-9 pr-9 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/24"
              />
              {bairroAplicado ? (
                <button type="button" aria-label="Limpar bairro" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-surface-2" onClick={() => { setBairro(''); setBairroAplicado(''); }}>
                  <X className="size-4" />
                </button>
              ) : null}
            </label>
            <Button type="submit" size="lg" variant="secondary" className="h-11">
              Buscar
            </Button>
          </form>
          {gpsErro ? <p className="mb-3 text-[13px] text-ink-3">Sem permissão de localização — use o endereço ou um bairro.</p> : null}
          {r.precisaoEndereco === 'bairro' && origem === 'casa' && !bairroAplicado ? <p className="mb-3 text-[13px] text-ink-3">Posição aproximada pelo bairro de casa.</p> : null}

          <div className="relative overflow-hidden rounded-2xl border border-line shadow-e2">
            <MapaUnidades centro={centro} unidades={unidades} selecionadas={escolhidas} focoId={foco} onFoco={setFoco} className="h-[46vh] min-h-[300px] lg:h-[62vh]" />
            {focada ? (
              <div className="absolute inset-x-2 bottom-2 z-[1000] rounded-xl border border-line bg-surface p-3 shadow-e3 step-in">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-bold text-ink">{focada.nome}</p>
                    <p className="text-[12px] text-ink-3">
                      {focada.bairro} · {formatarDistancia(focada.distanciaKm)}
                    </p>
                  </div>
                  <button type="button" aria-label="Fechar" className="grid size-8 shrink-0 place-items-center rounded-full text-ink-3 hover:bg-surface-2" onClick={() => setFoco(null)}>
                    <X className="size-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  {focada.oferta ? <DemandaTag demanda={focada.oferta.demanda} /> : null}
                  <BotaoEscolher escolhidas={escolhidas} id={focada.id} onClick={() => alternar(focada.id)} />
                </div>
              </div>
            ) : null}
            <Legenda />
          </div>
        </div>

        <div className="mt-5 lg:mt-0">
          {aviso ? (
            <Aviso tipo="warn" className="mb-3">
              {aviso}
            </Aviso>
          ) : null}
          {p.mostrarErro('opcoes') ? (
            <Aviso tipo="danger" className="mb-3">
              {p.mostrarErro('opcoes')}
            </Aviso>
          ) : null}
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-[15px] font-semibold text-ink">{bairroAplicado ? `Creches em ${bairroAplicado}` : 'Mais próximas primeiro'}</h2>
            <span className="text-[12px] text-ink-3">{carregando ? 'carregando…' : `${unidades.length} com vaga para ${grupamento}`}</span>
          </div>
          {!carregando && unidades.length === 0 ? (
            <Aviso tipo="warn" titulo="Nenhuma creche encontrada aqui">
              Tente outro bairro ou volte para a busca por endereço — as mais próximas aparecem primeiro.
            </Aviso>
          ) : null}
          <ul className="grid gap-2">
            {carregando
              ? Array.from({ length: 5 }).map((_, i) => <li key={i} className="h-[112px] rounded-2xl shimmer" />)
              : listaOrdenada.map((u) => {
                  const ordem = escolhidas.indexOf(u.id);
                  return (
                    <li key={u.id} className={cn('rounded-2xl border bg-surface p-3.5 shadow-e1 transition-colors', ordem >= 0 ? 'border-brand' : foco === u.id ? 'border-line-3' : 'border-line')}>
                      <div className="flex items-start gap-3">
                        {ordem >= 0 ? (
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand font-mono text-[13px] font-bold text-brand-ink" aria-label={`${ordem + 1}ª opção`}>
                            {ordem + 1}
                          </span>
                        ) : (
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-ink-3" aria-hidden="true">
                            <MapPin className="size-4" />
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <button type="button" className="text-left" onClick={() => setFoco(u.id)}>
                            <p className="text-[15px] font-bold leading-snug text-ink">{u.nome}</p>
                            <p className="text-[12px] text-ink-3">
                              {u.tipo} · {u.bairro} · <span className="font-medium text-ink-2">{formatarDistancia(u.distanciaKm)}</span>
                            </p>
                          </button>
                          {u.oferta ? (
                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <DemandaTag demanda={u.oferta.demanda} />
                              <span className="text-[12px] text-ink-2 tnum">
                                {u.oferta.vagas} vagas · {u.oferta.vagasPrioritarias} prioritárias · {u.oferta.inscritos} inscritos
                              </span>
                            </div>
                          ) : null}
                          {u.oferta && foco === u.id ? <p className="mt-1 text-[12px] text-ink-3">{DEMANDA_DICA[u.oferta.demanda]}</p> : null}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <BotaoEscolher escolhidas={escolhidas} id={u.id} onClick={() => alternar(u.id)} />
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
      </Page>

      <BottomBar note={escolhidas.length === 0 ? 'Escolha pelo menos 1 creche' : escolhidas.length < MAX ? `${escolhidas.length} de ${MAX} escolhidas — quanto mais opções, mais chance de vaga` : `${MAX} de ${MAX} escolhidas`}>
        <Button size="xl" variant="secondary" onClick={() => setDrawer(true)}>
          <ListOrdered />
          Suas escolhas ({escolhidas.length})
        </Button>
        <Button size="xl" onClick={p.avancar}>
          Continuar
        </Button>
      </BottomBar>

      <Drawer open={drawer} onOpenChange={setDrawer}>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>Suas escolhas, em ordem</DrawerTitle>
          </DrawerHeader>
          <DrawerPanel>
            {escolhidas.length === 0 ? (
              <p className="text-[14px] text-ink-2">Nenhuma creche escolhida ainda. Toque em "Escolher" na lista ou no mapa.</p>
            ) : (
              <ol className="grid gap-2">
                {escolhidas.map((id, i) => {
                  const u = porId.get(id);
                  return (
                    <li key={id} className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 p-2">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand font-mono text-[13px] font-bold text-brand-ink">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold text-ink">{u?.nome ?? id}</p>
                        <p className="text-[12px] text-ink-3">{i === 0 ? 'Preferida' : `${i + 1}ª opção`}{u ? ` · ${formatarDistancia(u.distanciaKm)}` : ''}</p>
                      </div>
                      <Button size="icon-lg" variant="outline" aria-label="Subir" disabled={i === 0} onClick={() => mover(id, -1)}>
                        <ArrowUp />
                      </Button>
                      <Button size="icon-lg" variant="outline" aria-label="Descer" disabled={i === escolhidas.length - 1} onClick={() => mover(id, 1)}>
                        <ArrowDown />
                      </Button>
                      <Button size="icon-lg" variant="ghost" aria-label="Remover" onClick={() => alternar(id)}>
                        <X />
                      </Button>
                    </li>
                  );
                })}
              </ol>
            )}
            <label className="mt-4 flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line-2 px-3 py-2.5">
              <Checkbox className="mt-0.5" checked={r.aceitaRealocacao} onCheckedChange={(v) => set('aceitaRealocacao', Boolean(v))} />
              <span className="flex flex-col">
                <span className="text-[14px] font-semibold text-ink">Aceito vaga em qualquer uma das minhas opções</span>
                <span className="text-[12px] leading-snug text-ink-3">Se a preferida não tiver vaga, você entra na fila das outras na ordem escolhida — sem precisar de nova inscrição.</span>
              </span>
            </label>
          </DrawerPanel>
          <DrawerFooter>
            <Button size="lg" onClick={() => setDrawer(false)}>
              Pronto
            </Button>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    </>
  );
}

function Chip({ ativo, onClick, I, children }: { ativo: boolean; onClick: () => void; I: typeof Home; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={cn('inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition-colors', ativo ? 'border-brand bg-brand text-brand-ink' : 'border-line-2 bg-surface text-ink-2 hover:border-line-3')}
    >
      <I className="size-4" aria-hidden="true" />
      {children}
    </button>
  );
}

function BotaoEscolher({ escolhidas, id, onClick }: { escolhidas: string[]; id: string; onClick: () => void }) {
  const ordem = escolhidas.indexOf(id);
  return ordem >= 0 ? (
    <Button size="lg" variant="outline" className="h-10 border-brand text-brand" onClick={onClick}>
      <X />
      Remover ({ordem + 1}ª)
    </Button>
  ) : (
    <Button size="lg" className="h-10" onClick={onClick}>
      <Plus />
      Escolher
    </Button>
  );
}

function Legenda() {
  return (
    <div className="pointer-events-none absolute left-2 top-2 z-[1000] flex flex-wrap gap-1.5 rounded-lg bg-surface/90 px-2 py-1.5 text-[11px] font-medium text-ink-2 shadow-e1 backdrop-blur">
      <span className="inline-flex items-center gap-1"><i className="size-2.5 rounded-full bg-demand-low" /> baixa</span>
      <span className="inline-flex items-center gap-1"><i className="size-2.5 rounded-full bg-demand-mid" /> média</span>
      <span className="inline-flex items-center gap-1"><i className="size-2.5 rounded-full bg-demand-high" /> alta</span>
      <span className="inline-flex items-center gap-1"><i className="size-2.5 rounded-full bg-brand" /> escolhida</span>
    </div>
  );
}
