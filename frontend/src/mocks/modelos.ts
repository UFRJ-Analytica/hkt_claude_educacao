import type { CanalMensagem, Chamada, ModeloId, ModeloMensagem } from '../api/types';

/**
 * Modelos de mensagem da unidade. Substituição de variável por código —
 * nada é gerado por modelo de linguagem. Nenhum texto carrega pontuação,
 * posição na fila ou critério de vulnerabilidade: o canal é aberto e o
 * telefone pode não ser o da mãe.
 */
export const MODELOS: ModeloMensagem[] = [
  {
    id: 'M1',
    titulo: 'Reforço da convocação',
    quando: 'Vaga aberta, família sem resposta no app após o aviso automático.',
    textos: {
      whatsapp:
        'Olá! Aqui é a {{unidade}}. Surgiu uma vaga de {{grupamento}} em turno {{turno}} para {{crianca}}. Para garantir a vaga, responda pelo app ou compareça até {{prazo}} na {{endereco}}, levando {{documentos}}. Se não puder vir nesse prazo, responda esta mensagem. Dúvidas: {{telefone_unidade}}.',
      sms: '{{unidade}}: vaga de {{grupamento}} {{turno}} disponivel. Compareca ate {{prazo}} na {{endereco}} com documentos. Info: {{telefone_unidade}}',
      ligacao:
        'Bom dia, falo com o responsável por {{crianca}}? Aqui é da {{unidade}}. Abriu uma vaga de {{grupamento}} no turno {{turno}}. O senhor precisa comparecer até {{prazo}}, no endereço {{endereco}}, trazendo {{documentos}}. Consegue vir nesse prazo? (anotar a resposta e registrar o desfecho na tela)',
    },
  },
  {
    id: 'M2',
    titulo: 'Lembrete de prazo',
    quando: 'Dia 2, sem resposta.',
    textos: {
      whatsapp:
        'Olá! A {{unidade}} tentou contato sobre a vaga de {{grupamento}} {{turno}} para {{crianca}}. Faltam {{dias_restantes}} dia(s): o prazo termina em {{prazo}}. Se você ainda tem interesse, responda pelo app ou ligue para {{telefone_unidade}}.',
      sms: '{{unidade}}: faltam {{dias_restantes}} dia(s) para garantir a vaga de {{crianca}}. Prazo {{prazo}}. Ligue {{telefone_unidade}}',
      ligacao:
        'Bom dia, falo com o responsável por {{crianca}}? Aqui é da {{unidade}}. Estamos tentando contato sobre a vaga de {{grupamento}} {{turno}}. O prazo termina em {{prazo}}. A família ainda tem interesse? (registrar o desfecho na tela)',
    },
  },
  {
    id: 'M3',
    titulo: 'Última chamada',
    quando: 'Restam menos de 24 horas.',
    textos: {
      whatsapp:
        '{{unidade}}: hoje é o último dia para confirmar a vaga de {{grupamento}} {{turno}} de {{crianca}}. O prazo termina em {{prazo}}. Se não houver comparecimento, a vaga será oferecida à próxima família da lista. Se houver um impedimento, entre em contato agora: {{telefone_unidade}}.',
      sms: '{{unidade}}: ULTIMO DIA para confirmar a vaga de {{crianca}}. Prazo {{prazo}}. Ligue agora {{telefone_unidade}}',
      ligacao:
        'Bom dia, falo com o responsável por {{crianca}}? Aqui é da {{unidade}}. Hoje é o último dia para confirmar a vaga de {{grupamento}} {{turno}}: o prazo termina em {{prazo}}. Sem comparecimento, a vaga vai para a próxima família. Há algum impedimento? (registrar o desfecho na tela)',
    },
  },
  {
    id: 'M4',
    titulo: 'Pendência de documento',
    quando: 'Critério declarado sem comprovação, antes da classificação.',
    textos: {
      whatsapp:
        'Olá! Aqui é a {{unidade}}. Na inscrição de {{crianca}} há uma informação que precisa de comprovação. Para a inscrição seguir completa, abra o app (Acompanhar inscrição) para ver qual documento é e enviar a foto, ou traga o original na {{endereco}}. Dúvidas: {{telefone_unidade}}.',
      sms: '{{unidade}}: a inscricao de {{crianca}} precisa de um documento. Veja qual no app (Acompanhar) ou traga na unidade. Info: {{telefone_unidade}}',
      ligacao:
        'Bom dia, falo com o responsável por {{crianca}}? Aqui é da {{unidade}}. A inscrição tem uma informação que precisa de comprovação. Pode enviar a foto pelo app — lá aparece qual documento — ou trazer o original na {{endereco}}. (registrar o desfecho na tela)',
    },
  },
  {
    id: 'M5',
    titulo: 'Confirmação de agendamento',
    quando: 'A família confirmou que vem.',
    textos: {
      whatsapp: 'Combinado! Esperamos {{crianca}} na {{unidade}}, {{endereco}}, até {{prazo}}. Lembre de trazer {{documentos}}.',
      sms: '{{unidade}}: combinado! Esperamos {{crianca}} ate {{prazo}} na {{endereco}} com os documentos.',
    },
  },
  {
    id: 'M6',
    titulo: 'Encerramento por prazo',
    quando: 'Prazo esgotado sem comparecimento. Disparo manual, nunca automático.',
    textos: {
      whatsapp:
        '{{unidade}}: o prazo para confirmar a vaga de {{crianca}} terminou em {{prazo}} e a vaga foi oferecida à próxima família. A inscrição continua ativa nas demais unidades escolhidas. Dúvidas: {{telefone_unidade}}.',
      sms: '{{unidade}}: o prazo da vaga de {{crianca}} terminou em {{prazo}}. A inscricao segue ativa nas outras unidades. Info: {{telefone_unidade}}',
    },
  },
];

export const MODELOS_POR_ID: Record<ModeloId, ModeloMensagem> = Object.fromEntries(MODELOS.map((m) => [m.id, m])) as Record<ModeloId, ModeloMensagem>;

export const DOCUMENTOS_MATRICULA = 'certidão de nascimento da criança, comprovante de residência, documento com foto do responsável e caderneta de vacinação';

export type Variaveis = Record<string, string>;

/** Regra fixa, não inferência: recomenda o modelo pela situação da chamada. */
export function recomendarModelo(c: Chamada): ModeloId {
  const restanteMs = new Date(c.prazo).getTime() - Date.now();
  if (c.comparecimento?.resultado === 'nao_compareceu' || restanteMs <= 0) return 'M6';
  if (c.situacao === 'agendado' || c.situacao === 'falei') return 'M5';
  if (restanteMs < 24 * 3600 * 1000) return 'M3';
  if (c.situacao === 'tentando' || c.situacao === 'sem_contato') return 'M2';
  return 'M1';
}

export function modelosAplicaveis(c: Chamada): ModeloMensagem[] {
  const rec = recomendarModelo(c);
  const ids: ModeloId[] = rec === 'M6' ? ['M6', 'M3'] : rec === 'M5' ? ['M5'] : ['M1', 'M2', 'M3', 'M5'];
  return ids.map((id) => MODELOS_POR_ID[id]);
}

export interface Segmento {
  texto: string;
  variavel: string | null;
}

/** Preenche `{{variavel}}` e devolve os segmentos para destacar na tela. */
export function preencher(modelo: string, vars: Variaveis): { texto: string; segmentos: Segmento[] } {
  const segmentos: Segmento[] = [];
  const re = /\{\{(\w+)\}\}/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(modelo)) !== null) {
    if (m.index > ultimo) segmentos.push({ texto: modelo.slice(ultimo, m.index), variavel: null });
    segmentos.push({ texto: vars[m[1]] ?? `{{${m[1]}}}`, variavel: m[1] });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < modelo.length) segmentos.push({ texto: modelo.slice(ultimo), variavel: null });
  return { texto: segmentos.map((s) => s.texto).join(''), segmentos };
}

export function prazoPorExtenso(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}, às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

export function textoPara(canal: CanalMensagem, modelo: ModeloMensagem): string {
  return modelo.textos[canal] ?? modelo.textos.whatsapp ?? '';
}
