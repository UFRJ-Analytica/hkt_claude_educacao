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
}
