/**
 * Bairros do Rio com centroide aproximado e CRE. Serve a dois fins:
 * gerar unidades sintéticas em posição plausível e dar coordenada a um
 * endereço quando a geocodificação externa não responde.
 *
 * Coordenadas aproximadas (±1 km). CRE atribuída pela divisão administrativa
 * usual; confirmar com o cadastro oficial quando o servidor voltar.
 */
export interface Bairro {
  nome: string;
  cre: number;
  lat: number;
  lon: number;
  /** Peso relativo de unidades e de demanda (1 = médio). */
  peso: number;
  demanda: number;
}

export const BAIRROS: Bairro[] = [
  // CRE 1 — Centro e adjacências
  { nome: 'Centro', cre: 1, lat: -22.9068, lon: -43.1829, peso: 0.6, demanda: 0.9 },
  { nome: 'Santa Teresa', cre: 1, lat: -22.9210, lon: -43.1900, peso: 0.5, demanda: 0.8 },
  { nome: 'Rio Comprido', cre: 1, lat: -22.9230, lon: -43.2050, peso: 0.6, demanda: 1.1 },
  { nome: 'Estácio', cre: 1, lat: -22.9150, lon: -43.2060, peso: 0.5, demanda: 1.0 },
  { nome: 'Gamboa', cre: 1, lat: -22.8990, lon: -43.1930, peso: 0.5, demanda: 1.1 },
  { nome: 'Caju', cre: 1, lat: -22.8800, lon: -43.2200, peso: 0.5, demanda: 1.2 },
  { nome: 'São Cristóvão', cre: 1, lat: -22.9000, lon: -43.2230, peso: 0.7, demanda: 1.1 },
  { nome: 'Benfica', cre: 1, lat: -22.8920, lon: -43.2400, peso: 0.6, demanda: 1.2 },
  { nome: 'Catumbi', cre: 1, lat: -22.9170, lon: -43.1960, peso: 0.4, demanda: 1.0 },
  // CRE 2 — Zona Sul e Tijuca
  { nome: 'Copacabana', cre: 2, lat: -22.9700, lon: -43.1880, peso: 0.7, demanda: 0.6 },
  { nome: 'Botafogo', cre: 2, lat: -22.9510, lon: -43.1830, peso: 0.6, demanda: 0.6 },
  { nome: 'Flamengo', cre: 2, lat: -22.9310, lon: -43.1750, peso: 0.4, demanda: 0.6 },
  { nome: 'Catete', cre: 2, lat: -22.9250, lon: -43.1770, peso: 0.4, demanda: 0.7 },
  { nome: 'Laranjeiras', cre: 2, lat: -22.9340, lon: -43.1890, peso: 0.4, demanda: 0.6 },
  { nome: 'Gávea', cre: 2, lat: -22.9780, lon: -43.2320, peso: 0.4, demanda: 0.5 },
  { nome: 'Leblon', cre: 2, lat: -22.9840, lon: -43.2230, peso: 0.4, demanda: 0.5 },
  { nome: 'Ipanema', cre: 2, lat: -22.9850, lon: -43.2020, peso: 0.4, demanda: 0.5 },
  { nome: 'Rocinha', cre: 2, lat: -22.9880, lon: -43.2480, peso: 0.9, demanda: 1.6 },
  { nome: 'Vidigal', cre: 2, lat: -22.9930, lon: -43.2360, peso: 0.4, demanda: 1.3 },
  { nome: 'Tijuca', cre: 2, lat: -22.9250, lon: -43.2350, peso: 0.9, demanda: 0.8 },
  { nome: 'Vila Isabel', cre: 2, lat: -22.9150, lon: -43.2500, peso: 0.7, demanda: 0.9 },
  { nome: 'Maracanã', cre: 2, lat: -22.9110, lon: -43.2300, peso: 0.5, demanda: 0.8 },
  { nome: 'Andaraí', cre: 2, lat: -22.9280, lon: -43.2560, peso: 0.5, demanda: 1.0 },
  { nome: 'Grajaú', cre: 2, lat: -22.9220, lon: -43.2660, peso: 0.5, demanda: 0.9 },
  // CRE 3 — Penha, Ramos, Ilha
  { nome: 'Penha', cre: 3, lat: -22.8400, lon: -43.2800, peso: 1.0, demanda: 1.3 },
  { nome: 'Penha Circular', cre: 3, lat: -22.8380, lon: -43.2960, peso: 0.7, demanda: 1.3 },
  { nome: 'Olaria', cre: 3, lat: -22.8450, lon: -43.2680, peso: 0.7, demanda: 1.2 },
  { nome: 'Ramos', cre: 3, lat: -22.8510, lon: -43.2550, peso: 0.7, demanda: 1.2 },
  { nome: 'Bonsucesso', cre: 3, lat: -22.8620, lon: -43.2580, peso: 0.7, demanda: 1.3 },
  { nome: 'Maré', cre: 3, lat: -22.8580, lon: -43.2420, peso: 1.2, demanda: 1.7 },
  { nome: 'Complexo do Alemão', cre: 3, lat: -22.8620, lon: -43.2720, peso: 1.0, demanda: 1.7 },
  { nome: 'Brás de Pina', cre: 3, lat: -22.8300, lon: -43.2930, peso: 0.7, demanda: 1.2 },
  { nome: 'Cordovil', cre: 3, lat: -22.8210, lon: -43.2930, peso: 0.7, demanda: 1.4 },
  { nome: 'Vigário Geral', cre: 3, lat: -22.8100, lon: -43.3100, peso: 0.7, demanda: 1.4 },
  { nome: 'Parada de Lucas', cre: 3, lat: -22.8160, lon: -43.3000, peso: 0.6, demanda: 1.4 },
  { nome: 'Ilha do Governador', cre: 3, lat: -22.8100, lon: -43.2000, peso: 1.1, demanda: 0.9 },
  // CRE 4 — Méier e Grande Méier
  { nome: 'Méier', cre: 4, lat: -22.9020, lon: -43.2800, peso: 0.9, demanda: 0.9 },
  { nome: 'Engenho de Dentro', cre: 4, lat: -22.8950, lon: -43.2950, peso: 0.7, demanda: 1.0 },
  { nome: 'Engenho Novo', cre: 4, lat: -22.9050, lon: -43.2660, peso: 0.6, demanda: 1.0 },
  { nome: 'Cachambi', cre: 4, lat: -22.8900, lon: -43.2720, peso: 0.6, demanda: 1.0 },
  { nome: 'Piedade', cre: 4, lat: -22.8930, lon: -43.3100, peso: 0.7, demanda: 1.1 },
  { nome: 'Lins de Vasconcelos', cre: 4, lat: -22.9100, lon: -43.2720, peso: 0.6, demanda: 1.1 },
  { nome: 'Jacaré', cre: 4, lat: -22.8990, lon: -43.2600, peso: 0.6, demanda: 1.4 },
  { nome: 'Inhaúma', cre: 4, lat: -22.8700, lon: -43.2760, peso: 0.7, demanda: 1.3 },
  { nome: 'Del Castilho', cre: 4, lat: -22.8760, lon: -43.2750, peso: 0.5, demanda: 1.2 },
  { nome: 'Todos os Santos', cre: 4, lat: -22.8950, lon: -43.2830, peso: 0.5, demanda: 1.0 },
  { nome: 'Água Santa', cre: 4, lat: -22.9080, lon: -43.2940, peso: 0.5, demanda: 1.1 },
  { nome: 'Encantado', cre: 4, lat: -22.8900, lon: -43.3000, peso: 0.5, demanda: 1.1 },
  { nome: 'Manguinhos', cre: 4, lat: -22.8780, lon: -43.2460, peso: 0.8, demanda: 1.7 },
  // CRE 5 — Madureira, Irajá
  { nome: 'Madureira', cre: 5, lat: -22.8720, lon: -43.3400, peso: 1.0, demanda: 1.2 },
  { nome: 'Cascadura', cre: 5, lat: -22.8850, lon: -43.3300, peso: 0.7, demanda: 1.1 },
  { nome: 'Quintino Bocaiúva', cre: 5, lat: -22.8860, lon: -43.3180, peso: 0.6, demanda: 1.1 },
  { nome: 'Oswaldo Cruz', cre: 5, lat: -22.8740, lon: -43.3520, peso: 0.6, demanda: 1.2 },
  { nome: 'Bento Ribeiro', cre: 5, lat: -22.8650, lon: -43.3600, peso: 0.6, demanda: 1.2 },
  { nome: 'Marechal Hermes', cre: 5, lat: -22.8650, lon: -43.3700, peso: 0.7, demanda: 1.2 },
  { nome: 'Rocha Miranda', cre: 5, lat: -22.8600, lon: -43.3560, peso: 0.7, demanda: 1.3 },
  { nome: 'Turiaçu', cre: 5, lat: -22.8700, lon: -43.3380, peso: 0.4, demanda: 1.2 },
  { nome: 'Vaz Lobo', cre: 5, lat: -22.8550, lon: -43.3300, peso: 0.5, demanda: 1.3 },
  { nome: 'Irajá', cre: 5, lat: -22.8300, lon: -43.3300, peso: 0.9, demanda: 1.2 },
  { nome: 'Vila da Penha', cre: 5, lat: -22.8400, lon: -43.3100, peso: 0.7, demanda: 1.1 },
  { nome: 'Vicente de Carvalho', cre: 5, lat: -22.8500, lon: -43.3100, peso: 0.6, demanda: 1.2 },
  { nome: 'Vista Alegre', cre: 5, lat: -22.8300, lon: -43.3100, peso: 0.5, demanda: 1.1 },
  { nome: 'Colégio', cre: 5, lat: -22.8340, lon: -43.3340, peso: 0.5, demanda: 1.3 },
  { nome: 'Honório Gurgel', cre: 5, lat: -22.8450, lon: -43.3600, peso: 0.6, demanda: 1.4 },
  // CRE 6 — Bangu, Realengo
  { nome: 'Bangu', cre: 6, lat: -22.8800, lon: -43.4680, peso: 1.3, demanda: 1.5 },
  { nome: 'Realengo', cre: 6, lat: -22.8790, lon: -43.4300, peso: 1.1, demanda: 1.4 },
  { nome: 'Padre Miguel', cre: 6, lat: -22.8790, lon: -43.4500, peso: 0.9, demanda: 1.5 },
  { nome: 'Senador Camará', cre: 6, lat: -22.8900, lon: -43.5000, peso: 0.9, demanda: 1.6 },
  { nome: 'Jardim Sulacap', cre: 6, lat: -22.8830, lon: -43.4000, peso: 0.5, demanda: 1.1 },
  { nome: 'Magalhães Bastos', cre: 6, lat: -22.8730, lon: -43.4120, peso: 0.6, demanda: 1.3 },
  { nome: 'Vila Militar', cre: 6, lat: -22.8620, lon: -43.4000, peso: 0.5, demanda: 1.1 },
  { nome: 'Deodoro', cre: 6, lat: -22.8600, lon: -43.3830, peso: 0.6, demanda: 1.3 },
  { nome: 'Campo dos Afonsos', cre: 6, lat: -22.8750, lon: -43.3880, peso: 0.4, demanda: 1.2 },
  { nome: 'Vila Kennedy', cre: 6, lat: -22.8620, lon: -43.4870, peso: 0.8, demanda: 1.7 },
  { nome: 'Gericinó', cre: 6, lat: -22.8560, lon: -43.4750, peso: 0.5, demanda: 1.6 },
  // CRE 7 — Campo Grande
  { nome: 'Campo Grande', cre: 7, lat: -22.9040, lon: -43.5610, peso: 1.8, demanda: 1.8 },
  { nome: 'Santíssimo', cre: 7, lat: -22.8800, lon: -43.5200, peso: 0.8, demanda: 1.6 },
  { nome: 'Senador Vasconcelos', cre: 7, lat: -22.9000, lon: -43.5500, peso: 0.6, demanda: 1.5 },
  { nome: 'Inhoaíma', cre: 7, lat: -22.9050, lon: -43.6000, peso: 0.9, demanda: 1.8 },
  { nome: 'Cosmos', cre: 7, lat: -22.9000, lon: -43.6250, peso: 0.8, demanda: 1.7 },
  { nome: 'Mendanha', cre: 7, lat: -22.8800, lon: -43.5600, peso: 0.5, demanda: 1.5 },
  // CRE 8 — Santa Cruz, Guaratiba
  { nome: 'Santa Cruz', cre: 8, lat: -22.9200, lon: -43.6850, peso: 1.7, demanda: 1.9 },
  { nome: 'Paciência', cre: 8, lat: -22.9000, lon: -43.6450, peso: 1.0, demanda: 1.8 },
  { nome: 'Sepetiba', cre: 8, lat: -22.9700, lon: -43.7000, peso: 0.8, demanda: 1.6 },
  { nome: 'Guaratiba', cre: 8, lat: -23.0000, lon: -43.6000, peso: 0.7, demanda: 1.5 },
  { nome: 'Pedra de Guaratiba', cre: 8, lat: -23.0100, lon: -43.6300, peso: 0.5, demanda: 1.4 },
  { nome: 'Barra de Guaratiba', cre: 8, lat: -23.0600, lon: -43.5600, peso: 0.4, demanda: 1.2 },
  // CRE 9 — Jacarepaguá
  { nome: 'Jacarepaguá', cre: 9, lat: -22.9300, lon: -43.3700, peso: 1.2, demanda: 1.3 },
  { nome: 'Taquara', cre: 9, lat: -22.9200, lon: -43.3750, peso: 0.9, demanda: 1.2 },
  { nome: 'Freguesia (Jacarepaguá)', cre: 9, lat: -22.9400, lon: -43.3400, peso: 0.8, demanda: 1.0 },
  { nome: 'Pechincha', cre: 9, lat: -22.9300, lon: -43.3500, peso: 0.6, demanda: 1.1 },
  { nome: 'Tanque', cre: 9, lat: -22.9150, lon: -43.3600, peso: 0.6, demanda: 1.2 },
  { nome: 'Praça Seca', cre: 9, lat: -22.8900, lon: -43.3500, peso: 0.8, demanda: 1.3 },
  { nome: 'Curicica', cre: 9, lat: -22.9500, lon: -43.3800, peso: 0.7, demanda: 1.3 },
  { nome: 'Cidade de Deus', cre: 9, lat: -22.9500, lon: -43.3620, peso: 0.9, demanda: 1.8 },
  { nome: 'Gardênia Azul', cre: 9, lat: -22.9600, lon: -43.3500, peso: 0.5, demanda: 1.5 },
  { nome: 'Anil', cre: 9, lat: -22.9500, lon: -43.3400, peso: 0.5, demanda: 1.1 },
  { nome: 'Vila Valqueire', cre: 9, lat: -22.8850, lon: -43.3700, peso: 0.5, demanda: 1.0 },
  { nome: 'Rio das Pedras', cre: 9, lat: -22.9830, lon: -43.3050, peso: 0.9, demanda: 1.8 },
  // CRE 10 — Barra e Recreio
  { nome: 'Barra da Tijuca', cre: 10, lat: -23.0000, lon: -43.3650, peso: 0.7, demanda: 0.7 },
  { nome: 'Recreio dos Bandeirantes', cre: 10, lat: -23.0200, lon: -43.4600, peso: 0.7, demanda: 0.9 },
  { nome: 'Vargem Grande', cre: 10, lat: -22.9800, lon: -43.4850, peso: 0.6, demanda: 1.3 },
  { nome: 'Vargem Pequena', cre: 10, lat: -22.9900, lon: -43.4700, peso: 0.6, demanda: 1.3 },
  { nome: 'Camorim', cre: 10, lat: -22.9700, lon: -43.4200, peso: 0.4, demanda: 1.2 },
  { nome: 'Itanhangá', cre: 10, lat: -22.9900, lon: -43.3000, peso: 0.5, demanda: 1.3 },
  { nome: 'Grumari', cre: 10, lat: -23.0450, lon: -43.5250, peso: 0.2, demanda: 1.0 },
  // CRE 11 — Pavuna, Anchieta
  { nome: 'Pavuna', cre: 11, lat: -22.8100, lon: -43.3600, peso: 1.0, demanda: 1.6 },
  { nome: 'Anchieta', cre: 11, lat: -22.8250, lon: -43.4000, peso: 0.8, demanda: 1.5 },
  { nome: 'Parque Anchieta', cre: 11, lat: -22.8200, lon: -43.4100, peso: 0.6, demanda: 1.5 },
  { nome: 'Guadalupe', cre: 11, lat: -22.8500, lon: -43.3750, peso: 0.7, demanda: 1.4 },
  { nome: 'Ricardo de Albuquerque', cre: 11, lat: -22.8400, lon: -43.3900, peso: 0.6, demanda: 1.4 },
  { nome: 'Costa Barros', cre: 11, lat: -22.8300, lon: -43.3700, peso: 0.7, demanda: 1.7 },
  { nome: 'Coelho Neto', cre: 11, lat: -22.8300, lon: -43.3500, peso: 0.7, demanda: 1.5 },
  { nome: 'Acari', cre: 11, lat: -22.8200, lon: -43.3400, peso: 0.7, demanda: 1.7 },
  { nome: 'Barros Filho', cre: 11, lat: -22.8300, lon: -43.3750, peso: 0.5, demanda: 1.6 },
  { nome: 'Jardim América', cre: 11, lat: -22.8150, lon: -43.3250, peso: 0.6, demanda: 1.5 },
];

export const CRE_NOMES: Record<number, string> = {
  1: 'Centro',
  2: 'Zona Sul e Tijuca',
  3: 'Penha, Ramos e Ilha',
  4: 'Méier',
  5: 'Madureira e Irajá',
  6: 'Bangu e Realengo',
  7: 'Campo Grande',
  8: 'Santa Cruz e Guaratiba',
  9: 'Jacarepaguá',
  10: 'Barra e Recreio',
  11: 'Pavuna e Anchieta',
};

export function normalizar(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export function acharBairro(nome: string): Bairro | null {
  const n = normalizar(nome);
  if (!n) return null;
  return BAIRROS.find((b) => normalizar(b.nome) === n) ?? BAIRROS.find((b) => normalizar(b.nome).startsWith(n)) ?? BAIRROS.find((b) => normalizar(b.nome).includes(n)) ?? null;
}
