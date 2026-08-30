import type { CanalAviso, EstadoValidacao, EvidenciaTipo, MotivoRecusa, SituacaoChamada } from '../api/types';

export const MOTIVOS_RECUSA: Array<{ id: MotivoRecusa; rotulo: string }> = [
  { id: 'documento_nao_apresentado', rotulo: 'Documento não apresentado' },
  { id: 'documento_invalido', rotulo: 'Documento inválido ou vencido' },
  { id: 'nao_compareceu', rotulo: 'Não compareceu no prazo' },
  { id: 'outro', rotulo: 'Outro motivo' },
];
export const MOTIVO_LABEL: Record<MotivoRecusa, string> = Object.fromEntries(MOTIVOS_RECUSA.map((m) => [m.id, m.rotulo])) as Record<MotivoRecusa, string>;

export const ESTADO_LABEL: Record<EstadoValidacao, string> = { pendente: 'Pendente', confirmado: 'Confirmado', recusado: 'Recusado' };

export const EVIDENCIA_LABEL: Record<EvidenciaTipo, { pilula: string; descricao: string }> = {
  rmi: { pilula: 'RMI', descricao: 'Validado pelo Data Lake da Prefeitura (Registro Municipal Integrado)' },
  base: { pilula: 'comprovável', descricao: 'Comprovável pela própria base de inscrições' },
  pre_analise: { pilula: 'foto no app', descricao: 'Documento enviado pela família e pré-analisado' },
  documento: { pilula: 'documento', descricao: 'Sem registro em base — exige comprovação' },
};

export const SITUACAO_LABEL: Record<SituacaoChamada, string> = {
  a_chamar: 'A chamar',
  tentando: 'Tentando',
  falei: 'Falei',
  sem_contato: 'Sem contato',
  agendado: 'Agendado',
  encerrada: 'Encerrada',
};

export const CANAL_LABEL: Record<CanalAviso, string> = { app: 'App', pix: 'Pix', email: 'E-mail', whatsapp: 'WhatsApp', sms: 'SMS', ligacao: 'Ligação' };

/** Janela em que confirmar/recusar pode ser desfeito. */
export const JANELA_DESFAZER_MS = 15 * 60 * 1000;

export function mascararTelefone(t: string): string {
  const d = t.replace(/\D/g, '');
  if (d.length < 8) return t;
  return `(${d.slice(0, 2)}) •••••-${d.slice(-4)}`;
}

export function restante(prazo: string): { ms: number; texto: string; dia: 1 | 2 | 3 | 4 } {
  const ms = new Date(prazo).getTime() - Date.now();
  if (ms <= 0) return { ms, texto: 'vencido', dia: 4 };
  const h = Math.floor(ms / 3600000);
  const d = Math.floor(h / 24);
  const texto = d >= 1 ? `${d}d ${h % 24}h` : `${h}h ${Math.floor((ms % 3600000) / 60000)}min`;
  const dia: 1 | 2 | 3 = h >= 48 ? 1 : h >= 24 ? 2 : 3;
  return { ms, texto, dia };
}

export function idadeDoDado(iso: string): string {
  const dias = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
  if (dias === 0) return 'hoje';
  if (dias < 30) return `${dias}d`;
  if (dias < 365) return `${Math.floor(dias / 30)} meses`;
  return `${Math.floor(dias / 365)} ano(s)`;
}

export function somarDiasUteis(iso: string, dias: number): string {
  const d = new Date(iso);
  let n = 0;
  while (n < dias) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) n += 1;
  }
  return d.toISOString();
}
