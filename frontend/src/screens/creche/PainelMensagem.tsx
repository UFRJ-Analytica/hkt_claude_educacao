import { CalendarCheck2, MessageCircle, MessageSquare, Phone, PhoneCall, PhoneMissed, PhoneOff, RotateCcw, Send } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { listarModelos, registrarCobranca, registrarDesfecho, registrarMensagem } from '@/api/client';
import type { CanalMensagem, Chamada, CriterioId, DesfechoTentativa, Grupamento, Horario, ModeloId, ModeloMensagem, Tentativa, Unidade } from '@/api/types';
import { Aviso, CampoTexto, Escolha } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle } from '@/components/ui/drawer';
import { Sheet, SheetDescription, SheetFooter, SheetHeader, SheetPanel, SheetPopup, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { toastManager } from '@/components/ui/toast';
import { CANAL_LABEL, restante } from '@/domain/validacao';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { DOCUMENTOS_MATRICULA, MODELOS, MODELOS_POR_ID, modelosAplicaveis, prazoPorExtenso, preencher, recomendarModelo, textoPara, type Variaveis } from '@/mocks/modelos';
import { IconeCanal, Pilula, primeiroNome, rotuloPar } from './comum';

/**
 * Painel de mensagem da convocação. Modelo pronto + variável substituída por
 * código — nada gerado por modelo de linguagem. Depois de disparar, o painel
 * exige o desfecho: sem desfecho, a tentativa não conta.
 */

/** Criança sem chamada aberta (vem de "Cobrar documento" na aba de validação). */
export interface AlvoAvulso {
  codigo: string;
  criterio: CriterioId;
  origem: 'app' | 'demo';
  nome: string;
  grupamento: Grupamento;
  horario: Horario;
  telefone: string;
  documentoPendente: string;
}

export interface PainelMensagemProps {
  aberto: boolean;
  onFechar: () => void;
  chamada: Chamada | null;
  alvoAvulso: AlvoAvulso | null;
  /** Modelo imposto pelo contexto (ex.: "Cobrar documento" numa chamada aberta força o M4). */
  modeloForcado?: ModeloId | null;
  unidade: Unidade;
  telefoneUnidade: string;
  onMudou: () => void;
  /** Recebe a chamada devolvida pela API após cada registro, para atualizar a linha sem recarregar. */
  onChamadaAtualizada?: (c: Chamada) => void;
}

const DESFECHO_LABEL: Record<DesfechoTentativa, string> = { falei: 'Falei com a família', nao_atendeu: 'Não atendeu', numero_errado: 'Número errado' };
const ROTULO_DISPARO: Record<CanalMensagem, string> = { whatsapp: 'Disparar no WhatsApp', sms: 'Disparar por SMS', ligacao: 'Iniciar ligação' };
const CANAIS: Array<{ valor: CanalMensagem; rotulo: string; descricao: string; icone: ReactNode }> = [
  { valor: 'whatsapp', rotulo: 'WhatsApp', descricao: 'abre no aplicativo', icone: <MessageCircle className="size-5" /> },
  { valor: 'sms', rotulo: 'SMS', descricao: 'registra a tentativa', icone: <MessageSquare className="size-5" /> },
  { valor: 'ligacao', rotulo: 'Ligação', descricao: 'roteiro para ler', icone: <Phone className="size-5" /> },
];

function somenteDigitos(t: string): string {
  const d = t.replace(/\D/g, '');
  return d.length > 11 && d.startsWith('55') ? d.slice(2) : d;
}
function dataHora(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}
function paraDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function PainelMensagem(props: PainelMensagemProps) {
  const mobile = useMediaQuery('max-lg');
  const { aberto, onFechar } = props;
  const aoMudar = (o: boolean) => {
    if (!o) onFechar();
  };
  if (mobile) {
    return (
      <Drawer open={aberto} onOpenChange={aoMudar}>
        <DrawerPopup showBar>
          <Conteudo {...props} shell="drawer" />
        </DrawerPopup>
      </Drawer>
    );
  }
  return (
    <Sheet open={aberto} onOpenChange={aoMudar}>
      <SheetPopup side="right" className="sm:max-w-xl" closeProps={{ 'aria-label': 'Fechar' }}>
        <Conteudo {...props} shell="sheet" />
      </SheetPopup>
    </Sheet>
  );
}

/** Todo o estado vive aqui: o popup desmonta ao fechar, então cada abertura começa limpa. */
function Conteudo({ shell, chamada, alvoAvulso, modeloForcado, unidade, telefoneUnidade, onFechar, onMudou, onChamadaAtualizada }: PainelMensagemProps & { shell: 'sheet' | 'drawer' }) {
  const Header = shell === 'sheet' ? SheetHeader : DrawerHeader;
  const Title = shell === 'sheet' ? SheetTitle : DrawerTitle;
  const Description = shell === 'sheet' ? SheetDescription : DrawerDescription;
  const Panel = shell === 'sheet' ? SheetPanel : DrawerPanel;
  const Footer = shell === 'sheet' ? SheetFooter : DrawerFooter;

  const avulso = !chamada && alvoAvulso ? alvoAvulso : null;
  const recomendado: ModeloId = modeloForcado ?? (chamada ? recomendarModelo(chamada) : 'M4');

  const [modelos, setModelos] = useState<ModeloMensagem[]>(MODELOS);
  const [modeloId, setModeloId] = useState<ModeloId>(recomendado);
  const [canal, setCanal] = useState<CanalMensagem>('whatsapp');
  const [edicao, setEdicao] = useState<string | null>(null);
  const [faseForcada, setFaseForcada] = useState<'compor' | null>(null);
  const [disparoAvulso, setDisparoAvulso] = useState<CanalMensagem | null>(null);
  const [escolha, setEscolha] = useState<'falei' | 'numero_errado' | null>(null);
  const [dataPrevista, setDataPrevista] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    let vivo = true;
    listarModelos().then((l) => {
      if (vivo && l.length) setModelos(l);
    });
    return () => {
      vivo = false;
    };
  }, []);

  const baseAplicaveis = chamada ? modelosAplicaveis(chamada) : [MODELOS_POR_ID.M4];
  if (modeloForcado && !baseAplicaveis.some((m) => m.id === modeloForcado)) baseAplicaveis.unshift(MODELOS_POR_ID[modeloForcado]);
  const aplicaveis = baseAplicaveis.map((m) => modelos.find((x) => x.id === m.id) ?? m);
  const modelo = aplicaveis.find((m) => m.id === modeloId) ?? aplicaveis[0];

  const nome = chamada?.crianca.nome ?? alvoAvulso?.nome ?? '';
  const grupamento = chamada?.crianca.grupamento ?? alvoAvulso?.grupamento ?? null;
  const horario = chamada?.crianca.horario ?? alvoAvulso?.horario ?? null;
  const telefone = chamada?.contato.telefone ?? alvoAvulso?.telefone ?? '';
  const msRestante = chamada ? restante(chamada.prazo).ms : 0;

  const vars: Variaveis = {
    crianca: primeiroNome(nome),
    unidade: unidade.nome,
    endereco: `${unidade.endereco}, ${unidade.bairro}`,
    grupamento: grupamento ?? '',
    turno: horario ?? '',
    prazo: chamada ? prazoPorExtenso(chamada.prazo) : '—',
    dias_restantes: String(Math.max(0, Math.ceil(msRestante / 86400000))),
    documentos: DOCUMENTOS_MATRICULA,
    documento_pendente: alvoAvulso?.documentoPendente ?? 'o documento pendente',
    telefone_unidade: telefoneUnidade,
  };
  const preenchido = preencher(textoPara(canal, modelo), vars);
  const texto = edicao ?? preenchido.texto;
  const editado = edicao !== null && edicao !== preenchido.texto;

  const tentativaPendente: Tentativa | null = chamada?.tentativas.findLast((t) => !t.automatica && t.desfecho === null) ?? null;
  const fase: 'compor' | 'desfecho' = tentativaPendente && faseForcada !== 'compor' ? 'desfecho' : 'compor';

  const escolherModelo = (id: ModeloId) => {
    setModeloId(id);
    setEdicao(null);
  };
  const escolherCanal = (c: CanalMensagem) => {
    setCanal(c);
    setEdicao(null);
  };

  const disparar = async () => {
    if (canal === 'whatsapp') {
      window.open(`https://wa.me/55${somenteDigitos(telefone)}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    }
    if (!chamada) {
      setDisparoAvulso(canal);
      if (avulso) {
        setOcupado(true);
        await registrarCobranca(avulso.codigo, avulso.criterio, canal, texto);
        setOcupado(false);
        onMudou();
      }
      toastManager.add({
        title: 'Cobrança registrada com autor e horário',
        description: avulso?.origem === 'app' ? 'A família vê o pedido no acompanhamento do app. Não é tentativa de convocação: ainda não há vaga aberta.' : 'Não é tentativa de convocação: ainda não há vaga aberta para esta criança.',
        type: 'success',
      });
      return;
    }
    setOcupado(true);
    const nova = await registrarMensagem(chamada.id, { modelo: modelo.id, canal, texto });
    setOcupado(false);
    if (!nova) {
      toastManager.add({ title: 'Não foi possível registrar a tentativa', description: 'Tente de novo em instantes.', type: 'error' });
      return;
    }
    onChamadaAtualizada?.(nova);
    onMudou();
    setFaseForcada(null);
    setEscolha(null);
    toastManager.add({
      title: canal === 'whatsapp' ? 'Mensagem aberta no WhatsApp' : canal === 'sms' ? 'SMS registrado como tentativa' : 'Ligação registrada',
      description: 'Agora registre o desfecho — sem ele a tentativa não conta.',
      type: 'success',
    });
  };

  const registrar = async (d: DesfechoTentativa, extra: { dataPrevista?: string; novoTelefone?: string } = {}) => {
    if (!chamada || !tentativaPendente) return;
    setOcupado(true);
    const nova = await registrarDesfecho(chamada.id, tentativaPendente.id, d, extra);
    setOcupado(false);
    if (!nova) {
      toastManager.add({ title: 'Não foi possível registrar o desfecho', description: 'Tente de novo em instantes.', type: 'error' });
      return;
    }
    onChamadaAtualizada?.(nova);
    onMudou();
    setEscolha(null);
    setDataPrevista('');
    setNovoTelefone('');
    setEdicao(null);
    setModeloId(recomendarModelo(nova));
    if (d === 'falei') {
      toastManager.add(
        extra.dataPrevista
          ? { title: 'Comparecimento agendado', description: 'A linha virou "Agendado" e entra no alarme. Se quiser, envie a confirmação (M5).', type: 'success' }
          : { title: 'Contato registrado', description: 'A linha virou "Falei". Registre o comparecimento quando a família vier.', type: 'success' },
      );
    } else if (d === 'nao_atendeu') {
      toastManager.add({ title: 'Tentativa registrada', description: 'Não atendeu. O relógio continua; na próxima, tente outro canal.', type: 'info' });
    } else {
      toastManager.add(
        extra.novoTelefone
          ? { title: 'Telefone atualizado', description: 'O número antigo ficou no histórico. A chamada fica como "Sem contato" até a próxima tentativa com o novo número.', type: 'success' }
          : { title: 'Sem contato', description: 'Sem outro número, a linha fica marcada como "Sem contato".', type: 'warning' },
      );
    }
  };

  const digitosNovo = novoTelefone.replace(/\D/g, '');
  const titulo = avulso ? `Cobrar documento · ${primeiroNome(nome)}` : `Mensagem para a família de ${primeiroNome(nome)}`;
  const descricao = chamada
    ? `${rotuloPar(chamada.crianca.grupamento, chamada.crianca.horario)} · ${chamada.opcao}ª opção · ${chamada.situacao === 'encerrada' ? 'chamada encerrada' : `restam ${restante(chamada.prazo).texto}`}`
    : grupamento && horario
      ? `${rotuloPar(grupamento, horario)} · sem convocação aberta · documento: ${alvoAvulso?.documentoPendente ?? '—'}`
      : '';

  return (
    <>
      <Header>
        <Title className="pr-8 text-[19px] leading-tight">{titulo}</Title>
        <Description className="text-[13px] text-ink-2">{descricao}</Description>
      </Header>

      <Panel className="flex flex-col gap-4">
        {fase === 'desfecho' && chamada && tentativaPendente ? (
          <>
            <Aviso tipo="warn" titulo="Tentativa aguardando desfecho">
              Sem desfecho registrado, a tentativa não conta e a linha continua sinalizada. Registre o que aconteceu.
            </Aviso>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[13px] text-ink-2">
              <span className="inline-flex items-center gap-1 font-semibold text-ink">
                <IconeCanal canal={tentativaPendente.canal} /> {CANAL_LABEL[tentativaPendente.canal]}
              </span>
              {tentativaPendente.modelo ? <span>· {MODELOS_POR_ID[tentativaPendente.modelo as ModeloId]?.titulo ?? tentativaPendente.modelo}</span> : null}
              <span className="tnum">· {dataHora(tentativaPendente.em)}</span>
              <span className="ml-auto text-ink-3">{tentativaPendente.autor}</span>
            </div>
            {tentativaPendente.canal === 'ligacao' ? (
              <Roteiro texto={tentativaPendente.texto ?? texto} telefone={telefone} />
            ) : tentativaPendente.canal === 'sms' ? (
              <Aviso tipo="info">Envio de SMS depende de provedor configurado — registrado como tentativa.</Aviso>
            ) : (
              <Aviso tipo="info">A mensagem foi aberta no WhatsApp. O envio acontece no aplicativo — sem a API oficial não há envio direto.</Aviso>
            )}

            <div>
              <p className="mb-2 text-[15px] font-semibold text-ink">O que aconteceu?</p>
              <div className="grid gap-2">
                <Button size="lg" variant={escolha === 'falei' ? 'default' : 'outline'} className="h-11 justify-start" onClick={() => setEscolha(escolha === 'falei' ? null : 'falei')}>
                  <PhoneCall />
                  Falei com a família
                </Button>
                <Button size="lg" variant="outline" className="h-11 justify-start" loading={ocupado && escolha === null} onClick={() => registrar('nao_atendeu')}>
                  <PhoneMissed />
                  Não atendeu
                </Button>
                <Button size="lg" variant={escolha === 'numero_errado' ? 'default' : 'outline'} className="h-11 justify-start" onClick={() => setEscolha(escolha === 'numero_errado' ? null : 'numero_errado')}>
                  <PhoneOff />
                  Número errado
                </Button>
              </div>
            </div>

            {escolha === 'falei' ? (
              <div className="step-in grid gap-3 rounded-xl border border-brand-soft-2 bg-brand-soft/40 p-3.5">
                <CampoTexto
                  label="Comparecimento previsto"
                  opcional
                  dica="Se combinou dia e hora, informe aqui: a linha vira “Agendado” e entra no alarme. Sem data, fica como “Falei”."
                  type="datetime-local"
                  value={dataPrevista}
                  max={paraDatetimeLocal(chamada.prazo)}
                  onChange={(e) => setDataPrevista(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="lg" className="h-11 flex-1" loading={ocupado} onClick={() => registrar('falei', dataPrevista ? { dataPrevista: new Date(dataPrevista).toISOString() } : {})}>
                    <CalendarCheck2 />
                    {dataPrevista ? 'Registrar agendamento' : 'Registrar contato'}
                  </Button>
                  {!dataPrevista ? (
                    <Button size="lg" variant="ghost" className="h-11" onClick={() => setDataPrevista(paraDatetimeLocal(chamada.prazo))}>
                      Usar o prazo
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : null}

            {escolha === 'numero_errado' ? (
              <div className="step-in grid gap-3 rounded-xl border border-brand-soft-2 bg-brand-soft/40 p-3.5">
                <CampoTexto
                  label="Novo telefone"
                  dica="O número antigo fica no histórico com autor e horário. O novo substitui o cadastro; a chamada fica como “Sem contato” até a próxima tentativa."
                  type="tel"
                  inputMode="tel"
                  placeholder="(21) 9xxxx-xxxx"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button size="lg" className="h-11 sm:flex-1" disabled={digitosNovo.length < 10} loading={ocupado} onClick={() => registrar('numero_errado', { novoTelefone: novoTelefone.trim() })}>
                    Salvar novo telefone
                  </Button>
                  <Button size="lg" variant="outline" className="h-11" disabled={ocupado} onClick={() => registrar('numero_errado')}>
                    Não tenho outro número
                  </Button>
                </div>
              </div>
            ) : null}

            <button type="button" className="inline-flex min-h-11 items-center gap-1 self-start text-[13px] font-semibold text-brand" onClick={() => setFaseForcada('compor')}>
              <Send className="size-4" /> Escrever outra mensagem antes de registrar
            </button>
          </>
        ) : (
          <>
            {tentativaPendente ? (
              <Aviso tipo="warn" titulo="Há uma tentativa aguardando desfecho">
                {CANAL_LABEL[tentativaPendente.canal]} em {dataHora(tentativaPendente.em)}.{' '}
                <button type="button" className="font-semibold text-brand underline-offset-2 hover:underline" onClick={() => setFaseForcada(null)}>
                  Registrar o desfecho agora
                </button>
              </Aviso>
            ) : null}
            {avulso ? (
              <Aviso tipo="info">Esta criança ainda não foi convocada. A cobrança fica registrada com autor e horário e aparece no acompanhamento da família; não conta como tentativa de convocação. O nome do documento fica só aqui — a mensagem não o cita.</Aviso>
            ) : null}
            {chamada?.situacao === 'encerrada' ? <Aviso tipo="info">Chamada encerrada. Você ainda pode avisar a família — o disparo fica no histórico.</Aviso> : null}

            <Escolha
              label="Modelo"
              valor={modelo.id}
              onChange={escolherModelo}
              colunas={1}
              opcoes={aplicaveis.map((m) => ({
                valor: m.id,
                rotulo: (
                  <span className="inline-flex flex-wrap items-center gap-2">
                    {m.titulo}
                    {m.id === recomendado ? (
                      <Pilula tom="brand" className="h-5 text-[11px]">
                        recomendado
                      </Pilula>
                    ) : null}
                  </span>
                ),
                descricao: m.quando,
              }))}
            />
            <p className="-mt-2 text-[12px] leading-snug text-ink-3">A recomendação vem da situação da linha, por regra fixa — não é inferência.</p>

            <Escolha label="Canal" valor={canal} onChange={escolherCanal} colunas={3} opcoes={CANAIS} />

            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <p className="text-[15px] font-semibold text-ink">Prévia</p>
                <p className="text-[12px] text-ink-3">variáveis destacadas para conferir</p>
              </div>
              <p className="whitespace-pre-wrap rounded-xl border border-line bg-surface-2 p-3 text-[14px] leading-relaxed text-ink">
                {preenchido.segmentos.map((s, i) =>
                  s.variavel ? (
                    <span key={i} className="rounded bg-brand-soft px-1 font-medium text-brand" title={`{{${s.variavel}}}`}>
                      {s.texto}
                    </span>
                  ) : (
                    <span key={i}>{s.texto}</span>
                  ),
                )}
              </p>
              {canal === 'sms' && texto.length > 160 ? <p className="mt-1 text-[12px] text-warn">SMS com {texto.length} caracteres — acima de 160 pode ser dividido em duas partes.</p> : null}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label htmlFor="texto-final" className="text-[15px] font-semibold text-ink">
                  Texto final
                </label>
                <Button size="xs" variant="ghost" disabled={!editado} onClick={() => setEdicao(null)}>
                  <RotateCcw />
                  Restaurar modelo
                </Button>
              </div>
              <Textarea id="texto-final" value={texto} onChange={(e) => setEdicao(e.target.value)} className="text-[14px]" />
              {editado ? <p className="mt-1 text-[12px] text-ink-3">Texto editado — vai como está. A prévia acima mostra o modelo original.</p> : null}
            </div>

            {avulso && disparoAvulso ? (
              disparoAvulso === 'ligacao' ? (
                <Roteiro texto={texto} telefone={telefone} />
              ) : disparoAvulso === 'sms' ? (
                <Aviso tipo="info">Envio de SMS depende de provedor configurado. Sem chamada aberta, nada foi registrado.</Aviso>
              ) : (
                <Aviso tipo="ok">WhatsApp aberto em nova aba com o texto pronto. O envio acontece no aplicativo.</Aviso>
              )
            ) : null}
          </>
        )}

        {chamada ? <Historico chamada={chamada} /> : null}
      </Panel>

      <Footer>
        <Button variant="outline" size="lg" className="h-11 lg:h-10" onClick={onFechar}>
          Fechar
        </Button>
        {fase === 'compor' ? (
          <Button size="lg" className="h-11 lg:h-10" loading={ocupado} onClick={disparar}>
            <Send />
            {ROTULO_DISPARO[canal]}
          </Button>
        ) : null}
      </Footer>
    </>
  );
}

function Roteiro({ texto, telefone }: { texto: string; telefone: string }) {
  const d = somenteDigitos(telefone);
  return (
    <div className="step-in rounded-2xl border border-brand-soft-2 bg-brand-soft p-4">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">Roteiro da ligação · leia ao telefone</p>
      <p className="whitespace-pre-wrap text-[17px] leading-relaxed text-ink">{texto}</p>
      {d.length >= 10 ? (
        <a href={`tel:+55${d}`} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-4 text-[15px] font-semibold text-brand-ink shadow-e1">
          <Phone className="size-4.5" /> Ligar para {telefone}
        </a>
      ) : null}
    </div>
  );
}

interface EventoHistorico {
  chave: string;
  em: string;
  icone: ReactNode;
  titulo: string;
  detalhe?: string;
  pilula?: { tom: 'neutro' | 'ok' | 'warn' | 'danger' | 'brand'; texto: string };
  autor: string;
}

function Historico({ chamada }: { chamada: Chamada }) {
  const eventos: EventoHistorico[] = [];
  const autos = chamada.tentativas.filter((t) => t.automatica);
  if (autos.length) {
    eventos.push({
      chave: 'auto',
      em: autos[0].em,
      icone: (
        <span className="inline-flex gap-0.5">
          {autos.map((t) => (
            <IconeCanal key={t.id} canal={t.canal} className={cn(t.canal === 'pix' && chamada.contato.pixVerificada && 'text-brand')} />
          ))}
        </span>
      ),
      titulo: 'Aviso automático',
      detalhe: autos.map((t) => CANAL_LABEL[t.canal]).join(', '),
      autor: 'sistema',
    });
  }
  if (chamada.respostaApp) {
    eventos.push({
      chave: 'resposta',
      em: chamada.respostaApp.em,
      icone: <IconeCanal canal="app" />,
      titulo: chamada.respostaApp.resposta === 'aceita' ? 'Família aceitou no app' : 'Família recusou no app',
      pilula: chamada.respostaApp.resposta === 'aceita' ? { tom: 'ok', texto: 'aceita' } : { tom: 'danger', texto: 'recusada' },
      autor: 'família',
    });
  }
  for (const t of chamada.tentativas.filter((x) => !x.automatica)) {
    eventos.push({
      chave: t.id,
      em: t.em,
      icone: <IconeCanal canal={t.canal} />,
      titulo: CANAL_LABEL[t.canal],
      detalhe: [t.modelo ? (MODELOS_POR_ID[t.modelo as ModeloId]?.titulo ?? t.modelo) : null, t.desfechoEm ? `desfecho ${dataHora(t.desfechoEm)}` : null].filter(Boolean).join(' · ') || undefined,
      pilula: t.desfecho ? { tom: t.desfecho === 'falei' ? 'ok' : t.desfecho === 'numero_errado' ? 'danger' : 'neutro', texto: DESFECHO_LABEL[t.desfecho] } : { tom: 'warn', texto: 'aguardando desfecho' },
      autor: t.autor,
    });
  }
  for (const [i, h] of chamada.contato.historico.entries()) {
    eventos.push({ chave: `tel-${i}`, em: h.em, icone: <PhoneOff className="size-3.5" />, titulo: 'Telefone corrigido', detalhe: `antes: ${h.telefone}`, autor: h.autor });
  }
  if (chamada.prorrogacao) {
    eventos.push({ chave: 'prorrogacao', em: chamada.prorrogacao.em, icone: <CalendarCheck2 className="size-3.5" />, titulo: 'Prazo estendido em 1 dia útil', detalhe: chamada.prorrogacao.justificativa, autor: chamada.prorrogacao.autor });
  }
  if (chamada.comparecimento) {
    eventos.push({
      chave: 'comparecimento',
      em: chamada.comparecimento.em,
      icone: <CalendarCheck2 className="size-3.5" />,
      titulo: chamada.comparecimento.resultado === 'matriculou' ? 'Compareceu e matriculou' : 'Não compareceu — vaga liberada',
      pilula: chamada.comparecimento.resultado === 'matriculou' ? { tom: 'ok', texto: 'matriculou' } : { tom: 'danger', texto: 'não compareceu' },
      autor: chamada.comparecimento.autor,
    });
  }
  eventos.sort((a, b) => new Date(b.em).getTime() - new Date(a.em).getTime());

  return (
    <section className="border-t border-line pt-3">
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Histórico · {eventos.length} {eventos.length === 1 ? 'registro' : 'registros'}</h3>
      <ol className="grid gap-1.5">
        {eventos.map((e) => (
          <li key={e.chave} className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-line px-3 py-2 text-[13px] leading-snug">
            <span className="font-mono text-[12px] text-ink-3 tnum">{dataHora(e.em)}</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-ink">
              <span className="text-ink-3">{e.icone}</span>
              {e.titulo}
            </span>
            {e.detalhe ? <span className="min-w-0 text-ink-3">· {e.detalhe}</span> : null}
            {e.pilula ? (
              <Pilula tom={e.pilula.tom} className="h-5 text-[11px]">
                {e.pilula.texto}
              </Pilula>
            ) : null}
            <span className="ml-auto text-[12px] text-ink-3">{e.autor}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
