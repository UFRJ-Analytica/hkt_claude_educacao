import type { Grupamento } from '../api/types';

/**
 * Regras de idade. Parâmetros do processo — hoje fixos aqui, amanhã vindos
 * do backend (`GET /processo/atual`). A data de corte (31/03) segue a regra
 * nacional para educação infantil; a SME pode ter regra própria por
 * grupamento e ela precisa ser confirmada antes de produção.
 */
export const ANO_LETIVO = 2027;
export const DATA_CORTE = new Date(ANO_LETIVO, 2, 31); // 31/03/ANO_LETIVO

export interface ClassificacaoIdade {
  grupamento: Grupamento | null;
  idadeNaCorte: { anos: number; meses: number };
  motivo: string;
}

function diffMeses(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) - (b.getDate() < a.getDate() ? 1 : 0);
}

export function classificarIdade(nascimentoIso: string): ClassificacaoIdade | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nascimentoIso)) return null;
  const nasc = new Date(nascimentoIso + 'T00:00:00');
  if (Number.isNaN(nasc.getTime())) return null;
  const hoje = new Date();
  if (nasc > hoje) return { grupamento: null, idadeNaCorte: { anos: 0, meses: 0 }, motivo: 'A data de nascimento está no futuro.' };
  const meses = Math.max(0, diffMeses(nasc, DATA_CORTE));
  const anos = Math.floor(meses / 12);
  const idade = { anos, meses: meses % 12 };
  if (anos < 2) return { grupamento: 'Berçário', idadeNaCorte: idade, motivo: `Terá ${descreverIdade(idade)} em 31/03/${ANO_LETIVO}.` };
  if (anos === 2) return { grupamento: 'Maternal I', idadeNaCorte: idade, motivo: `Terá ${descreverIdade(idade)} em 31/03/${ANO_LETIVO}.` };
  if (anos === 3) return { grupamento: 'Maternal II', idadeNaCorte: idade, motivo: `Terá ${descreverIdade(idade)} em 31/03/${ANO_LETIVO}.` };
  return {
    grupamento: null,
    idadeNaCorte: idade,
    motivo: `Com ${descreverIdade(idade)} em 31/03/${ANO_LETIVO}, a inscrição é na Pré-escola, não na creche.`,
  };
}

export function descreverIdade(i: { anos: number; meses: number }): string {
  const a = i.anos === 1 ? '1 ano' : `${i.anos} anos`;
  const m = i.meses === 1 ? '1 mês' : `${i.meses} meses`;
  if (i.anos === 0) return m;
  if (i.meses === 0) return a;
  return `${a} e ${m}`;
}

export function formatarDataBr(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
