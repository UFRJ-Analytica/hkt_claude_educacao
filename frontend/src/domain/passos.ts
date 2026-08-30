import type { Rascunho } from '../store/rascunho';
import { cepValido, cpfValido, emailValido, telefoneValido } from './cpf';
import { classificarIdade } from './grupamento';
import { CRITERIOS, criteriosMarcados } from './prioridade';

export interface Passo {
  id: string;
  rota: string;
  titulo: string;
  curto: string;
}

export const PASSOS: Passo[] = [
  { id: 'crianca', rota: '/inscricao/crianca', titulo: 'Sobre a criança', curto: 'Criança' },
  { id: 'responsavel', rota: '/inscricao/responsavel', titulo: 'Quem é o responsável', curto: 'Responsável' },
  { id: 'pix', rota: '/inscricao/pix', titulo: 'Um contato que não muda', curto: 'Pix' },
  { id: 'endereco', rota: '/inscricao/endereco', titulo: 'Onde a família mora', curto: 'Endereço' },
  { id: 'prioridade', rota: '/inscricao/prioridade', titulo: 'Situação da família', curto: 'Prioridade' },
  { id: 'documentos', rota: '/inscricao/documentos', titulo: 'Documentos', curto: 'Documentos' },
  { id: 'unidades', rota: '/inscricao/unidades', titulo: 'Escolha das creches', curto: 'Creches' },
  { id: 'revisao', rota: '/inscricao/revisao', titulo: 'Revise e envie', curto: 'Revisão' },
];

/** Passos visíveis para este rascunho (documentos só aparece se houver critério). */
export function passosVisiveis(r: Rascunho): Passo[] {
  const temCriterio = criteriosMarcados(r.prioridade).length > 0 || r.modo === 'prioritaria';
  return PASSOS.filter((p) => p.id !== 'documentos' || temCriterio);
}

export function indicePasso(r: Rascunho, id: string): number {
  return passosVisiveis(r).findIndex((p) => p.id === id);
}

export function passoAnterior(r: Rascunho, id: string): Passo | null {
  const v = passosVisiveis(r);
  const i = v.findIndex((p) => p.id === id);
  return i > 0 ? v[i - 1] : null;
}

export function proximoPasso(r: Rascunho, id: string): Passo | null {
  const v = passosVisiveis(r);
  const i = v.findIndex((p) => p.id === id);
  return i >= 0 && i < v.length - 1 ? v[i + 1] : null;
}

/** Validação por passo: devolve mensagens por campo; vazio = ok. */
export function validarPasso(r: Rascunho, id: string): Record<string, string> {
  const erros: Record<string, string> = {};
  switch (id) {
    case 'crianca': {
      if (r.crianca.nome.trim().split(/\s+/).length < 2) erros.nome = 'Escreva o nome completo da criança.';
      const cls = classificarIdade(r.crianca.nascimento);
      if (!cls) erros.nascimento = 'Informe a data de nascimento.';
      else if (!cls.grupamento) erros.nascimento = cls.motivo;
      break;
    }
    case 'responsavel': {
      if (r.responsavel.nome.trim().split(/\s+/).length < 2) erros.nome = 'Escreva seu nome completo.';
      if (!cpfValido(r.responsavel.cpf)) erros.cpf = 'CPF inválido. Confira os 11 números.';
      if (!telefoneValido(r.responsavel.telefone)) erros.telefone = 'Celular com DDD e 9 dígitos, ex.: (21) 99999-9999.';
      else if (!r.responsavel.telefoneVerificado) erros.telefone = 'Confirme o celular com o código recebido.';
      if (!emailValido(r.responsavel.email)) erros.email = 'E-mail inválido.';
      break;
    }
    case 'pix': {
      if (r.pix.semChave) break;
      if (!r.pix.verificada) erros.pix = 'Confirme a chave Pix com o código recebido no banco.';
      if (!r.pix.consentimento) erros.consentimento = 'Precisamos da sua autorização para usar a chave como contato.';
      break;
    }
    case 'endereco': {
      if (!cepValido(r.endereco.cep)) erros.cep = 'CEP com 8 números.';
      if (!r.endereco.logradouro.trim()) erros.logradouro = 'Informe a rua.';
      if (!r.endereco.numero.trim()) erros.numero = 'Informe o número (ou "s/n").';
      if (!r.endereco.bairro.trim()) erros.bairro = 'Informe o bairro.';
      if (r.usarTrabalho && !r.trabalho.bairro.trim()) erros.trabalhoBairro = 'Informe ao menos o bairro do trabalho.';
      break;
    }
    case 'prioridade': {
      const faltam = CRITERIOS.filter((c) => typeof r.prioridade[c.id] !== 'boolean');
      if (faltam.length > 0) erros.prioridade = faltam.length === CRITERIOS.length ? 'Responda às perguntas para continuar.' : `Falta responder ${faltam.length} pergunta(s).`;
      break;
    }
    case 'documentos':
      break;
    case 'unidades': {
      if (r.opcoes.length === 0) erros.opcoes = 'Escolha pelo menos 1 creche.';
      break;
    }
    default:
      break;
  }
  return erros;
}

export function passoValido(r: Rascunho, id: string): boolean {
  return Object.keys(validarPasso(r, id)).length === 0;
}

/** Primeiro passo com pendência — usado para bloquear a revisão. */
export function primeiroPassoPendente(r: Rascunho): Passo | null {
  for (const p of passosVisiveis(r)) {
    if (p.id === 'revisao') continue;
    if (!passoValido(r, p.id)) return p;
  }
  return null;
}
