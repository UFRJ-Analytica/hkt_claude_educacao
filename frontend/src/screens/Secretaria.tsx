import { ExternalLink, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { alternativas, apiSource, panorama } from '@/api/client';
import type { FiltrosUnidade, Grupamento, Horario, UnidadeProxima } from '@/api/types';
import { Page, Section, TopBar } from '@/components/shell';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { formatarDistancia, RIO_CENTRO } from '@/domain/geo';
import { cn } from '@/lib/utils';
import { BAIRROS, CRE_NOMES } from '@/mocks/bairros';
import type { Panorama } from '@/mocks/creche';
import { MapaUnidades } from './passos/MapaUnidades';

/**
 * Secretaria — uma tela de acompanhamento da rede. Não decide nem edita:
 * números do recorte, mapa por pressão (crianças por vaga preenchida) e a
 * creche escolhida com as vizinhas que têm vaga no mesmo grupamento e turno.
 */
const GRUPAMENTOS: Grupamento[] = ['Berçário', 'Maternal I', 'Maternal II'];
const HORARIOS: Horario[] = ['Integral', 'Parcial'];

function demandaPorPressao(p: number | null): 'baixa' | 'media' | 'alta' {
  if (p === null || p < 1) return 'baixa';
  return p <= 3 ? 'media' : 'alta';
}
function fmtPressao(p: number | null): string {
  return p === null ? '—' : p.toFixed(1).replace('.', ',');
}
function Chip({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-pressed={ativo} onClick={onClick} className={cn('h-9 rounded-full border px-3 text-[13px] font-semibold transition-colors', ativo ? 'border-brand bg-brand text-brand-ink' : 'border-line-2 bg-surface text-ink-2 hover:border-line-3')}>
      {children}
    </button>
  );
}
function Numero({ rotulo, valor, tom = 'neutro' }: { rotulo: string; valor: number | string; tom?: 'neutro' | 'warn' | 'danger' }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3.5 py-2.5 shadow-e1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{rotulo}</p>
      <p className={cn('font-mono text-[24px] font-semibold leading-tight tnum', tom === 'warn' ? 'text-warn' : tom === 'danger' ? 'text-danger' : 'text-ink')}>{typeof valor === 'number' ? valor.toLocaleString('pt-BR') : valor}</p>
    </div>
  );
}

export function Secretaria() {
  const [cre, setCre] = useState<number | null>(null);
  const [f, setF] = useState<FiltrosUnidade>({ grupamento: null, horario: null });
  const [dados, setDados] = useState<Panorama | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [origem, setOrigem] = useState<string | null>(null);

  useEffect(() => {
    apiSource().then((s) => setOrigem(s.note));
  }, []);
  useEffect(() => {
    let vivo = true;
    panorama({ ...f, cre }).then((p) => {
      if (vivo) setDados(p);
    });
    return () => {
      vivo = false;
    };
  }, [f, cre]);

  const unidadeSel = dados?.unidades.find((u) => u.id === sel) ?? null;
  const vizinhas = useMemo(() => (sel ? alternativas(sel, f) : []), [sel, f]);

  const centro = useMemo<[number, number]>(() => {
    if (unidadeSel) return [unidadeSel.lat, unidadeSel.lon];
    if (cre !== null) {
      const bs = BAIRROS.filter((b) => b.cre === cre);
      if (bs.length) return [bs.reduce((s, b) => s + b.lat, 0) / bs.length, bs.reduce((s, b) => s + b.lon, 0) / bs.length];
    }
    return [RIO_CENTRO.lat, RIO_CENTRO.lon];
  }, [unidadeSel, cre]);

  const pontos = useMemo<UnidadeProxima[]>(
    () =>
      (dados?.unidades ?? []).map((u) => ({
        id: u.id,
        nome: u.nome,
        tipo: 'Creche Municipal',
        cre: u.cre,
        bairro: u.bairro,
        endereco: '',
        lat: u.lat,
        lon: u.lon,
        ofertas: [],
        distanciaKm: 0,
        oferta: { grupamento: 'Maternal I', horario: 'Integral', vagas: u.vagas, vagasPrioritarias: 0, inscritos: u.inscritos, inscritosPrioritarios: 0, demanda: demandaPorPressao(u.pressao) },
      })),
    [dados],
  );

  const abrirPerfil = (id: string) => {
    try {
      localStorage.setItem('creche-app:unidade-diretor', id);
    } catch {
      /* nada */
    }
    window.open('/creche', '_blank', 'noopener');
  };

  return (
    <>
      <TopBar voltarPara="/" cheio />
      <Page cheio className="pt-4">
        <header className="mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Secretaria Municipal de Educação · acompanhamento</p>
          <h1 className="text-[24px] font-bold tracking-tight text-ink">Inscrições e convocações na rede</h1>
          <p className="text-[13px] text-ink-2">{cre === null ? 'Cidade inteira — clique numa CRE para aproximar.' : `${cre}ª CRE · ${CRE_NOMES[cre]}`}</p>
        </header>

        <div className="mb-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          <Numero rotulo="Inscritos" valor={dados?.inscritos ?? '—'} />
          <Numero rotulo="Em espera" valor={dados?.emEspera ?? '—'} tom="warn" />
          <Numero rotulo="Convocações em aberto" valor={dados?.convocacoesAbertas ?? '—'} />
          <Numero rotulo="Sem resposta (prazo vencido)" valor={dados?.semResposta ?? '—'} tom="danger" />
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filtros">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">CRE</span>
          <Chip ativo={cre === null} onClick={() => { setCre(null); setSel(null); }}>Todas</Chip>
          {Object.keys(CRE_NOMES).map(Number).map((c) => (
            <Chip key={c} ativo={cre === c} onClick={() => { setCre(c); setSel(null); }}>{`${c}ª`}</Chip>
          ))}
          <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Grupamento</span>
          <Chip ativo={f.grupamento === null} onClick={() => setF((x) => ({ ...x, grupamento: null }))}>Todos</Chip>
          {GRUPAMENTOS.map((g) => (
            <Chip key={g} ativo={f.grupamento === g} onClick={() => setF((x) => ({ ...x, grupamento: g }))}>{g}</Chip>
          ))}
          <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Turno</span>
          <Chip ativo={f.horario === null} onClick={() => setF((x) => ({ ...x, horario: null }))}>Todos</Chip>
          {HORARIOS.map((h) => (
            <Chip key={h} ativo={f.horario === h} onClick={() => setF((x) => ({ ...x, horario: h }))}>{h}</Chip>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_520px]">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-line shadow-e2">
              <MapaUnidades centro={centro} unidades={pontos} selecionadas={[]} focoId={sel} onFoco={setSel} zoom={unidadeSel ? 14 : cre !== null ? 12 : 10} zoomPelaRoda={false} className="h-[52vh] min-h-[320px]" />
              <div className="pointer-events-none absolute left-2 top-2 z-[1000] flex flex-wrap gap-1.5 rounded-lg bg-surface/90 px-2 py-1.5 text-[11px] font-medium text-ink-2 shadow-e1 backdrop-blur">
                <span className="inline-flex items-center gap-1"><i className="size-2.5 rounded-full bg-demand-low" /> &lt; 1</span>
                <span className="inline-flex items-center gap-1"><i className="size-2.5 rounded-full bg-demand-mid" /> 1 a 3</span>
                <span className="inline-flex items-center gap-1"><i className="size-2.5 rounded-full bg-demand-high" /> &gt; 3</span>
                <span>crianças por vaga preenchida</span>
              </div>
            </div>
            <p className="mt-2 text-[12px] leading-snug text-ink-3">
              Pressão = inscritos ÷ matrículas confirmadas do par (proxy: a base não define vaga). {dados?.fonte}. {origem ? `${origem}.` : ''}
            </p>
          </div>

          <div>
            {unidadeSel ? (
              <Section className="mb-3">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{unidadeSel.id} · {unidadeSel.cre}ª CRE · {unidadeSel.bairro}</p>
                    <h2 className="text-[16px] font-bold leading-snug text-ink">{unidadeSel.nome}</h2>
                  </div>
                  <button type="button" aria-label="Fechar" className="grid size-9 shrink-0 place-items-center rounded-full text-ink-3 hover:bg-surface-2" onClick={() => setSel(null)}>
                    <X className="size-4" />
                  </button>
                </div>
                <div className="mb-3 grid grid-cols-4 gap-2 text-center">
                  {[
                    ['Inscritos', unidadeSel.inscritos],
                    ['Em espera', unidadeSel.emEspera],
                    ['Vagas', unidadeSel.vagas],
                    ['Pressão', fmtPressao(unidadeSel.pressao)],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="rounded-lg bg-surface-2 px-2 py-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">{k}</p>
                      <p className="font-mono text-[16px] font-semibold text-ink tnum">{v}</p>
                    </div>
                  ))}
                </div>
                <table className="mb-3 w-full text-[12px]">
                  <thead>
                    <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                      <th className="py-1">Par</th>
                      <th className="py-1 text-right">Inscr.</th>
                      <th className="py-1 text-right">Espera</th>
                      <th className="py-1 text-right">Conf.</th>
                      <th className="py-1 text-right">Vagas</th>
                    </tr>
                  </thead>
                  <tbody className="tnum">
                    {unidadeSel.ofertas.map((o) => (
                      <tr key={`${o.grupamento}${o.horario}`} className="border-t border-line">
                        <td className="py-1 text-ink">{o.grupamento} · {o.horario}</td>
                        <td className="py-1 text-right">{o.inscritos}</td>
                        <td className="py-1 text-right text-warn">{o.emEspera}</td>
                        <td className="py-1 text-right">{o.confirmados}</td>
                        <td className="py-1 text-right">{o.vagas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-3">Vizinhas com vaga (2 km, mesmo par)</h3>
                {vizinhas.length === 0 ? (
                  <p className="text-[13px] text-ink-3">Nenhuma creche vizinha com vaga livre no mesmo grupamento e turno.</p>
                ) : (
                  <ul className="grid gap-1.5">
                    {vizinhas.map((v) => (
                      <li key={`${v.unidade.id}-${v.par}`} className="flex items-center justify-between gap-2 rounded-lg border border-line px-2.5 py-1.5 text-[13px]">
                        <button type="button" className="min-w-0 text-left" onClick={() => setSel(v.unidade.id)}>
                          <span className="block truncate font-semibold text-ink">{v.unidade.nome}</span>
                          <span className="text-[11px] text-ink-3">{v.par}</span>
                        </button>
                        <span className="shrink-0 font-mono text-[12px] text-ok tnum">{formatarDistancia(v.distanciaKm)} · {v.vagasLivres} vagas</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button size="lg" variant="outline" className="mt-3 h-10 w-full" onClick={() => abrirPerfil(unidadeSel.id)}>
                  <ExternalLink />
                  Ver perfil da creche
                </Button>
              </Section>
            ) : null}

            {cre === null && !unidadeSel ? (
              <Section title="Por CRE · crianças em espera">
                <ul className="grid gap-1.5">
                  {(dados?.porCre ?? []).map((c) => (
                    <li key={c.cre}>
                      <button type="button" className="flex w-full items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-left hover:border-brand" onClick={() => setCre(c.cre)}>
                        <span className="text-[13px] font-semibold text-ink">{c.cre}ª · {c.nome}</span>
                        <span className="font-mono text-[13px] text-ink-2 tnum">{c.emEspera.toLocaleString('pt-BR')} <span className="text-[11px] text-ink-3">/ {c.inscritos.toLocaleString('pt-BR')} · {c.unidades} un.</span></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <Section title={`Creches por pressão${cre !== null ? ` · ${cre}ª CRE` : ''}`}>
              {!dados ? (
                <div className="h-24 rounded-xl shimmer" />
              ) : dados.unidades.length === 0 ? (
                <Aviso tipo="warn">Nenhuma creche com oferta neste recorte.</Aviso>
              ) : (
                <ul className="grid max-h-[46vh] gap-1.5 overflow-auto pr-1">
                  {dados.unidades.slice(0, 80).map((u) => (
                    <li key={u.id}>
                      <button type="button" onClick={() => setSel(u.id)} className={cn('grid w-full grid-cols-[1fr_auto] items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left hover:border-brand', sel === u.id ? 'border-brand bg-brand-soft' : 'border-line')}>
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] font-semibold text-ink">{u.nome}</span>
                          <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-line">
                            <span className={cn('block h-full rounded-full', demandaPorPressao(u.pressao) === 'alta' ? 'bg-demand-high' : demandaPorPressao(u.pressao) === 'media' ? 'bg-demand-mid' : 'bg-demand-low')} style={{ width: `${Math.min(100, ((u.pressao ?? 0) / 4) * 100)}%` }} />
                          </span>
                        </span>
                        <span className="text-right font-mono text-[12px] text-ink-2 tnum">
                          {fmtPressao(u.pressao)}<span className="text-ink-3">×</span>
                          <span className="block text-[11px] text-ink-3">{u.inscritos} insc. · {u.emEspera} esp.</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          </div>
        </div>
      </Page>
    </>
  );
}
