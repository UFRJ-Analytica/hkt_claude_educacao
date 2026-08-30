import type { Grupamento, Horario, Oferta, TipoUnidade, Unidade } from '../api/types';
import { classificarDemanda } from '../domain/demanda';
import { dentroDoMunicipio } from '../domain/geo';
import { BAIRROS } from './bairros';

/**
 * Rede sintética de creches: determinística (semente fixa), posicionada por
 * bairro dentro do limite oficial do município (IBGE). NÃO são unidades
 * reais. Quando o cadastro Data.Rio/SME responder, este módulo é substituído
 * por `GET /api/v1/unidades` sem mudar nenhuma tela.
 */
const SEED = 20260830;

function mulberry32(a: number) {
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NOMES = [
  'Vovó Ana', 'Professora Maria Clara', 'Tia Zezé', 'Dona Lindu', 'Irmã Dulce', 'Chiquinha Gonzaga',
  'Anísio Teixeira', 'Paulo Freire', 'Monteiro Lobato', 'Cecília Meireles', 'Cora Coralina', 'Vinicius de Moraes',
  'Clarice Lispector', 'Zumbi dos Palmares', 'Dandara', 'Marielle Franco', 'Nise da Silveira', 'Darcy Ribeiro',
  'Tarsila do Amaral', 'Villa-Lobos', 'Pixinguinha', 'Cartola', 'Dona Ivone Lara', 'Clementina de Jesus',
  'Jorge Amado', 'Machado de Assis', 'Rachel de Queiroz', 'Lygia Bojunga', 'Ruth Rocha', 'Ziraldo',
  'Mestre Vitalino', 'Candido Portinari', 'Heitor dos Prazeres', 'Elis Regina', 'Gonzaguinha', 'Tom Jobim',
  'Nelson Mandela', 'Madre Teresa', 'São Francisco', 'Nossa Senhora da Penha', 'Santa Luzia', 'São Sebastião',
  'Sementinha', 'Pequeno Príncipe', 'Arco-Íris', 'Girassol', 'Beija-Flor', 'Estrela do Amanhã',
  'Jardim Encantado', 'Mundo da Criança', 'Casa da Alegria', 'Amigos do Saber', 'Primeiros Passos', 'Ciranda',
  'Maria Felipa', 'Luiza Mahin', 'Antonieta de Barros', 'Enedina Alves', 'Laudelina de Campos', 'Tereza de Benguela',
  'Abdias Nascimento', 'Lélia Gonzalez', 'Carolina Maria de Jesus', 'Milton Santos', 'Betinho', 'Herbert de Souza',
  'Ismael Silva', 'Noel Rosa', 'Ary Barroso', 'Dorival Caymmi', 'Nelson Cavaquinho', 'Beth Carvalho',
  'Padre Cícero', 'Frei Damião', 'Irmã Zélia', 'Madre Paulina', 'Dom Hélder', 'Bispo Dom Eugênio',
  'Bento Rubião', 'Jair Rodrigues', 'Dona Neuma', 'Tia Ciata', 'Mestre Marçal', 'Hilário Jovino',
];

const PRIMEIROS = ['Maria', 'Ana', 'José', 'Zilda', 'Antônio', 'Francisca', 'Sebastiana', 'Benedita', 'Joaquim', 'Luiza', 'Helena', 'Teresa', 'Josefa', 'Raimunda', 'Ivone', 'Nair', 'Odete', 'Iracema', 'Jurema', 'Dalva', 'Neusa', 'Célia', 'Aparecida', 'Lourdes', 'Marlene', 'Vera', 'Sônia', 'Regina', 'Djalma', 'Waldir'];
const SOBRENOMES = ['da Silva', 'dos Santos', 'de Oliveira', 'Pereira', 'Nascimento', 'Ribeiro', 'Ferreira', 'Gomes', 'Barbosa', 'Cardoso', 'Moreira', 'Campos', 'Teixeira', 'Fonseca', 'Batista', 'Nunes', 'Coelho', 'Pinto', 'Sales', 'Lopes', 'Vieira', 'Lima', 'Rocha', 'Machado', 'Freitas', 'Guimarães', 'Andrade', 'Correia', 'Monteiro', 'Xavier'];
/** Nome único e determinístico para o i-ésimo estabelecimento (900 combinações sem repetir). */
function nomeBase(i: number): string {
  if (i < NOMES.length) return NOMES[i];
  const j = i - NOMES.length;
  const m = j % PRIMEIROS.length;
  const k = Math.floor(j / PRIMEIROS.length);
  return `${PRIMEIROS[m]} ${SOBRENOMES[(m + 7 * k) % SOBRENOMES.length]}`;
}

const RUAS = ['Rua', 'Avenida', 'Estrada', 'Travessa', 'Praça'];
const LOGRADOUROS = [
  'das Palmeiras', 'São João', 'Santa Rita', 'do Bispo', 'Coronel Tamarindo', 'Barão de Mesquita', 'Dom Pedro',
  'da Liberdade', 'Marechal Rondon', 'Ministro Edgard Romero', 'General Polidoro', 'Visconde de Niterói',
  'Padre Manso', 'Vinte e Quatro de Maio', 'Nossa Senhora das Graças', 'Cesário de Melo', 'Felipe Cardoso',
  'do Engenho', 'da Capela', 'Bento Cardoso', 'Pastor Martin Luther King', 'Brasil', 'Itaoca', 'Leopoldina',
];

const GRUPAMENTOS: Grupamento[] = ['Berçário', 'Maternal I', 'Maternal II'];

function oferta(rand: () => number, g: Grupamento, h: Horario, demandaBase: number): Oferta {
  const vagas = 8 + Math.floor(rand() * (h === 'Integral' ? 28 : 18));
  const vagasPrioritarias = Math.max(2, Math.round(vagas * (0.3 + rand() * 0.25)));
  const fator = demandaBase * (0.55 + rand() * 1.3) * (g === 'Berçário' ? 1.35 : g === 'Maternal I' ? 1.0 : 0.8);
  const inscritos = Math.round(vagas * fator);
  const inscritosPrioritarios = Math.round(inscritos * (0.25 + rand() * 0.3));
  return { grupamento: g, horario: h, vagas, vagasPrioritarias, inscritos, inscritosPrioritarios, demanda: classificarDemanda(inscritos, vagas) };
}

function gerar(): Unidade[] {
  const rand = mulberry32(SEED);
  const out: Unidade[] = [];
  let seq = 0;
  let nomeIdx = 0;
  for (const b of BAIRROS) {
    const n = Math.max(1, Math.round(b.peso * 3.2 + rand() * 1.4));
    for (let i = 0; i < n; i += 1) {
      let lat = b.lat;
      let lon = b.lon;
      for (let tent = 0; tent < 40; tent += 1) {
        const dl = (rand() - 0.5) * 0.022;
        const dn = (rand() - 0.5) * 0.026;
        if (dentroDoMunicipio(b.lon + dn, b.lat + dl)) {
          lat = b.lat + dl;
          lon = b.lon + dn;
          break;
        }
      }
      const r = rand();
      const tipo: TipoUnidade = r < 0.5 ? 'Creche Municipal' : r < 0.82 ? 'EDI' : 'Creche Conveniada';
      const base = nomeBase(nomeIdx);
      nomeIdx += 1;
      const nome = tipo === 'EDI' ? `EDI ${base}` : tipo === 'Creche Conveniada' ? `Creche Conveniada ${base}` : `Creche Municipal ${base}`;
      seq += 1;
      const id = `SME-${String(b.cre).padStart(2, '0')}${String(seq).padStart(4, '0')}`;
      const ofertas: Oferta[] = [];
      for (const g of GRUPAMENTOS) {
        if (g === 'Berçário' && rand() < 0.35) continue; // nem toda unidade tem berçário
        ofertas.push(oferta(rand, g, 'Integral', b.demanda));
        if (rand() < 0.45) ofertas.push(oferta(rand, g, 'Parcial', b.demanda));
      }
      const rua = `${RUAS[Math.floor(rand() * RUAS.length)]} ${LOGRADOUROS[Math.floor(rand() * LOGRADOUROS.length)]}, ${10 + Math.floor(rand() * 900)}`;
      out.push({ id, nome, tipo, cre: b.cre, bairro: b.nome, endereco: rua, lat, lon, ofertas });
    }
  }
  return out;
}

let cache: Unidade[] | null = null;
export function todasUnidades(): Unidade[] {
  if (!cache) cache = gerar();
  return cache;
}

export function unidadePorId(id: string): Unidade | null {
  return todasUnidades().find((u) => u.id === id) ?? null;
}
