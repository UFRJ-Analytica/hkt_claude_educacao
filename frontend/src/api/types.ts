/**
 * Contratos que o frontend consome. Hoje servidos por mocks locais; amanhã
 * pelo backend ligado ao BigQuery (tabelas: inscrições por opção, respostas
 * socioeconômicas, perguntas por processo, unidades escolares).
 */

export type Grupamento = 'Berçário' | 'Maternal I' | 'Maternal II';
export type Horario = 'Integral' | 'Parcial';
export type Demanda = 'baixa' | 'media' | 'alta';
export type TipoUnidade = 'Creche Municipal' | 'EDI' | 'Creche Conveniada';

export interface Oferta {
  grupamento: Grupamento;
  horario: Horario;
  vagas: number;
  vagasPrioritarias: number;
  inscritos: number;
  inscritosPrioritarios: number;
  demanda: Demanda;
}

export interface Unidade {
  id: string;
  nome: string;
  tipo: TipoUnidade;
  cre: number;
  bairro: string;
  endereco: string;
  lat: number;
  lon: number;
  ofertas: Oferta[];
}

export interface UnidadeProxima extends Unidade {
  distanciaKm: number;
  /** A oferta que casa com o grupamento da criança, se existir. */
  oferta: Oferta | null;
}

export interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  lat: number | null;
  lon: number | null;
}

export type CriterioId =
  | 'deficiencia_crianca'
  | 'responsavel_idoso'
  | 'responsavel_deficiente'
  | 'mae_adolescente'
  | 'bolsa_familia'
  | 'violencia_domestica'
  | 'familiar_encarcerado'
  | 'responsavel_trabalha';

export type DocumentoStatus = 'pendente' | 'analisando' | 'pre_aprovado' | 'revisar' | 'ilegivel';

export interface DocumentoAnalise {
  status: DocumentoStatus;
  /** Explicação curta em linguagem simples. */
  motivo: string;
  /** O que o modelo leu no documento — mostrado ao usuário para conferência. */
  camposLidos: Record<string, string>;
  analisadoEm: string;
  /** Miniatura da foto enviada (data URL reduzida), para a unidade conferir quando houver problema. */
  miniatura?: string;
  nomeArquivo?: string;
}

export type StatusInscricao =
  | 'recebida'
  | 'documentos_pendentes'
  | 'pre_classificada'
  | 'convocada'
  | 'matriculada'
  | 'vaga_recusada'
  | 'prazo_expirado';

export interface EventoTimeline {
  em: string;
  titulo: string;
  detalhe?: string;
  tipo: 'ok' | 'info' | 'warn' | 'danger';
}

export interface PosicaoOpcao {
  unidadeId: string;
  unidadeNome: string;
  ordem: number;
  posicao: number;
  vagas: number;
  demanda: Demanda;
}

export interface Convocacao {
  unidadeId: string;
  unidadeNome: string;
  emitidaEm: string;
  prazo: string;
  canais: Array<'pix' | 'whatsapp' | 'email'>;
  resposta: 'aceita' | 'recusada' | null;
}

export interface Inscricao {
  codigo: string;
  criadaEm: string;
  anoLetivo: number;
  modo: 'prioritaria' | 'normal';
  crianca: { nome: string; nascimento: string; sexo: 'F' | 'M' | 'nao_informar'; jaEstudou: boolean };
  grupamento: Grupamento;
  horario: Horario;
  responsavel: { nome: string; cpf: string; parentesco: string; telefone: string; email: string };
  contato: { pixChaves: string[]; pixVerificada: boolean; telefoneVerificado: boolean };
  endereco: Endereco;
  trabalho: Endereco | null;
  criterios: CriterioId[];
  /** Critérios recusados pela unidade na validação — saem da pontuação. */
  criteriosRecusados?: CriterioId[];
  pontuacao: number;
  documentos: Partial<Record<CriterioId, DocumentoAnalise>>;
  opcoes: string[];
  aceitaRealocacao: boolean;
  status: StatusInscricao;
  timeline: EventoTimeline[];
  classificacao: { atualizadoEm: string; porOpcao: PosicaoOpcao[] } | null;
  convocacao: Convocacao | null;
}

export type ApiMode = 'live' | 'fixture';
export interface ApiSource {
  mode: ApiMode;
  base: string | null;
  note: string;
  /** Backend respondeu ao /health e ao /capabilities (mesmo sem capacidade AVAILABLE). */
  conectado?: boolean;
  /** Status por capacidade declarada pelo backend (unidades, inscricao, fila, convocacao…). */
  capacidades?: Record<string, string>;
}

/* ============================================================
   Perfil da creche — validação e convocação (role `creche`)
   ============================================================ */

export type EvidenciaTipo = 'rmi' | 'base' | 'pre_analise' | 'documento';

export interface Evidencia {
  tipo: EvidenciaTipo;
  /** Texto pronto para o diretor: de onde vem a informação ou aviso de que não há nenhuma. */
  texto: string;
  em?: string;
  analise?: DocumentoAnalise;
}

export type EstadoValidacao = 'pendente' | 'confirmado' | 'recusado';
export type MotivoRecusa = 'documento_nao_apresentado' | 'documento_invalido' | 'nao_compareceu' | 'outro';

/** Registro append-only: nunca se apaga; desfazer é um novo evento apontando para o anterior. */
export interface EventoValidacao {
  id: string;
  inscricao: string;
  unidadeId: string;
  criterio: CriterioId;
  estado: EstadoValidacao;
  motivo?: MotivoRecusa;
  observacao?: string;
  autor: string;
  em: string;
  desfazDe?: string;
}

export interface CriterioValidacao {
  id: CriterioId;
  titulo: string;
  pergunta: string;
  pontos: number;
  documento: string;
  evidencia: Evidencia;
  estado: EstadoValidacao;
  ultimoEvento: EventoValidacao | null;
}

export interface InscritoUnidade {
  codigo: string;
  crianca: { nome: string; nascimento: string; sexo: 'F' | 'M' | 'nao_informar' };
  responsavel: { nome: string; bairro: string; cep: string; telefone: string };
  grupamento: Grupamento;
  horario: Horario;
  /** Posição desta unidade entre as preferências da família (1ª a 5ª). */
  opcao: number;
  aceitaRealocacao: boolean;
  criadaEm: string;
  pontosDeclarados: number;
  pontosConfirmados: number;
  criterios: CriterioValidacao[];
  /** Posição na fila do par grupamento × turno desta unidade. */
  posicao: number;
  vagasDoPar: number;
  /** Está na borda do corte: confirmar ou recusar aqui muda quem entra. */
  decideVaga: boolean;
  origem: 'app' | 'demo';
}

export interface ResumoUnidade {
  unidade: Unidade;
  telefone: string;
  naFila: number;
  aguardandoValidacao: number;
  vagasAbertas: { total: number; prioritarias: number; gerais: number };
  proxyVagas: string;
}

export type SituacaoChamada = 'a_chamar' | 'tentando' | 'falei' | 'sem_contato' | 'agendado' | 'encerrada';
export type CanalMensagem = 'whatsapp' | 'sms' | 'ligacao';
export type CanalAviso = 'app' | 'pix' | 'email' | CanalMensagem;
export type DesfechoTentativa = 'falei' | 'nao_atendeu' | 'numero_errado';

export interface Tentativa {
  id: string;
  em: string;
  canal: CanalAviso;
  automatica: boolean;
  modelo?: string;
  texto?: string;
  desfecho: DesfechoTentativa | null;
  desfechoEm?: string;
  desfechoAutor?: string;
  autor: string;
}

export interface Chamada {
  id: string;
  inscricao: string;
  unidadeId: string;
  crianca: { nome: string; grupamento: Grupamento; horario: Horario };
  opcao: number;
  aceitaRealocacao: boolean;
  contato: {
    telefone: string;
    telefoneVerificado: boolean;
    pixVerificada: boolean;
    email: string;
    atualizadoEm: string;
    historico: Array<{ telefone: string; em: string; autor: string }>;
  };
  emitidaEm: string;
  prazo: string;
  prorrogacao: { em: string; justificativa: string; autor: string } | null;
  respostaApp: { resposta: 'aceita' | 'recusada'; em: string } | null;
  situacao: SituacaoChamada;
  tentativas: Tentativa[];
  dataPrevista: string | null;
  comparecimento: { resultado: 'matriculou' | 'nao_compareceu'; em: string; autor: string } | null;
  origem: 'app' | 'demo';
}

export type ModeloId = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6';

export interface ModeloMensagem {
  id: ModeloId;
  titulo: string;
  quando: string;
  textos: Partial<Record<CanalMensagem, string>>;
}

export interface FiltrosUnidade {
  grupamento: Grupamento | null;
  horario: Horario | null;
}
