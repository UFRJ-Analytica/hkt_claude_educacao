import type { CriterioId } from '../api/types';

/**
 * Critérios de prioridade e a régua de pontos.
 *
 * A PONTUAÇÃO É DETERMINÍSTICA: soma dos pesos dos critérios marcados
 * (mesma regra do `perg_pontuacao` das tabelas reais). Os pesos abaixo são
 * de demonstração e mudam por processo/ano — em produção vêm do backend,
 * versionados, e é isso que torna a classificação auditável. Nenhum modelo
 * de linguagem participa desta conta.
 */
export interface Criterio {
  id: CriterioId;
  titulo: string;
  pergunta: string;
  explicacao: string;
  pontos: number;
  documento: string;
  documentoDica: string;
}

export const CRITERIOS: Criterio[] = [
  {
    id: 'deficiencia_crianca',
    titulo: 'Criança com deficiência',
    pergunta: 'A criança tem deficiência, transtorno do desenvolvimento ou altas habilidades?',
    explicacao: 'Inclui autismo, síndrome de Down, deficiência física, visual ou auditiva.',
    pontos: 25,
    documento: 'Laudo médico',
    documentoDica: 'Laudo com CID, assinatura e carimbo do profissional.',
  },
  {
    id: 'bolsa_familia',
    titulo: 'Família no Bolsa Família ou CadÚnico',
    pergunta: 'A família recebe Bolsa Família ou está inscrita no CadÚnico?',
    explicacao: 'Vale o cadastro de qualquer responsável que more com a criança.',
    pontos: 20,
    documento: 'Folha resumo do CadÚnico ou extrato do Bolsa Família',
    documentoDica: 'Pode ser a tela do app Caixa Tem ou o comprovante do CRAS.',
  },
  {
    id: 'violencia_domestica',
    titulo: 'Situação de violência doméstica',
    pergunta: 'A mãe ou responsável está em situação de violência doméstica?',
    explicacao: 'Suas informações são sigilosas e vistas só pela equipe da unidade.',
    pontos: 20,
    documento: 'Medida protetiva ou boletim de ocorrência',
    documentoDica: 'Também vale encaminhamento do CRAS/CREAS ou da Casa da Mulher.',
  },
  {
    id: 'mae_adolescente',
    titulo: 'Mãe adolescente',
    pergunta: 'A mãe da criança tem menos de 18 anos?',
    explicacao: 'A prioridade ajuda a mãe a continuar os estudos.',
    pontos: 15,
    documento: 'Documento de identidade da mãe',
    documentoDica: 'RG, CNH ou certidão de nascimento.',
  },
  {
    id: 'responsavel_deficiente',
    titulo: 'Responsável com deficiência',
    pergunta: 'Algum responsável que mora com a criança tem deficiência?',
    explicacao: 'Deficiência física, visual, auditiva, intelectual ou múltipla.',
    pontos: 15,
    documento: 'Laudo médico do responsável',
    documentoDica: 'Ou carteira de pessoa com deficiência (RioCard especial, por exemplo).',
  },
  {
    id: 'familiar_encarcerado',
    titulo: 'Familiar em privação de liberdade',
    pergunta: 'Pai, mãe ou responsável está preso?',
    explicacao: 'Informação sigilosa, usada só para a classificação.',
    pontos: 15,
    documento: 'Declaração do sistema prisional',
    documentoDica: 'Carteira de visitante ou documento da unidade prisional.',
  },
  {
    id: 'responsavel_idoso',
    titulo: 'Responsável com 60 anos ou mais',
    pergunta: 'Algum responsável pela criança tem 60 anos ou mais?',
    explicacao: 'Avós ou outros responsáveis idosos que cuidam da criança.',
    pontos: 10,
    documento: 'Documento de identidade do responsável',
    documentoDica: 'RG ou CNH com data de nascimento visível.',
  },
  {
    id: 'responsavel_trabalha',
    titulo: 'Responsável trabalha fora',
    pergunta: 'O responsável que cuida da criança trabalha ou estuda fora de casa?',
    explicacao: 'Vale trabalho formal, informal ou curso presencial.',
    pontos: 10,
    documento: 'Comprovante de trabalho ou matrícula',
    documentoDica: 'Carteira de trabalho, declaração do empregador ou comprovante do curso.',
  },
];

export const CRITERIOS_POR_ID: Record<CriterioId, Criterio> = Object.fromEntries(
  CRITERIOS.map((c) => [c.id, c]),
) as Record<CriterioId, Criterio>;

export function pontuar(criterios: CriterioId[]): number {
  return criterios.reduce((s, id) => s + (CRITERIOS_POR_ID[id]?.pontos ?? 0), 0);
}

export function criteriosMarcados(resp: Partial<Record<CriterioId, boolean>>): CriterioId[] {
  return CRITERIOS.filter((c) => resp[c.id] === true).map((c) => c.id);
}
