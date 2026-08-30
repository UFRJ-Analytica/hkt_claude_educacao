/**
 * Taxonomia de equipamento da rede municipal.
 *
 * Uma regra só, num lugar só. A rede do Rio não é feita de "escolas": são
 * escolas municipais, CIEPs, cívico-militares, creches, EDIs, CDEIs,
 * bibliotecas, núcleos de arte, clubes escolares, polos e CEJAs. Cada indicador
 * se aplica a um subconjunto diferente, e tratar todos como iguais produz o erro
 * mais fácil de flagrar numa banca da SME: nota de Língua Portuguesa numa
 * creche, proficiência numa biblioteca, aula cancelada num clube escolar.
 *
 * A distinção que importa é entre NÃO SE APLICA e SEM LEITURA. As duas aparecem
 * vazias na tela, e significam coisas opostas: uma diz que o dado não deveria
 * existir, a outra que deveria e não chegou. Só a segunda é um problema a
 * resolver.
 */

/** Participa da Atividade Diagnóstica em Rede: 1º ao 9º ano regular. */
const ADR_TYPES = ['escola municipal', 'ciep', 'escola cívico militar', 'escola civico militar'];

export function takesAdr(schoolType: string | null | undefined): boolean {
  if (!schoolType) return false;
  const t = schoolType.toLowerCase();
  if (t.includes('especial')) return false; // avaliação adaptada, fora do recorte
  return ADR_TYPES.some((allowed) => t.includes(allowed));
}

/** Oferece turma regular de Ensino Fundamental — mesmo conjunto da ADR. */
export function isFundamental(schoolType: string | null | undefined): boolean {
  return takesAdr(schoolType);
}

/** Educação infantil: frequência e ocupação se aplicam; ADR e IDEB não. */
export function isEarlyChildhood(schoolType: string | null | undefined): boolean {
  if (!schoolType) return false;
  const t = schoolType.toLowerCase();
  return t.includes('creche') || t.includes('edi') || t.includes('cdei');
}
