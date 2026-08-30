// GERADO por integracao-sme/build_unidades.py — NÃO editar à mão.
// Fonte: rio-sme.sme_creche.inscricoes_completa
// Query: SELECT unidade_codigo, grupamento, turno, COUNT(*), prioritarios FROM `rio-sme.sme_creche.inscricoes_completa` WHERE ano = MAX(ano) GROUP BY unidade, grupamento, turno (agregado no BigQuery, sem LIMIT)
// Gerado em: 2026-08-30T18:59:10+00:00
// Unidades: 808 · inscrições agregadas: 10439
// Proveniência por campo em integracao-sme/out/PROVENANCE_unidades.md
//   REAL: id, lat/lon, bairro, grupamento, horário, inscritos, inscritosPrioritarios
//   DERIVADO: cre, vagas, vagasPrioritarias, demanda
//   SINTÉTICO: o extrato inteiro (_synthetic=true); nome/tipo são rótulos
import type { Unidade } from '../api/types';

export const META = {
  "generated_at": "2026-08-30T18:59:10+00:00",
  "source_id": "rio-sme.sme_creche.inscricoes_completa",
  "query": "SELECT unidade_codigo, grupamento, turno, COUNT(*), prioritarios FROM `rio-sme.sme_creche.inscricoes_completa` WHERE ano = MAX(ano) GROUP BY unidade, grupamento, turno (agregado no BigQuery, sem LIMIT)",
  "rows_read": 10439,
  "unidades": 808,
  "provenance": {
    "REAL": [
      "id (unidade_codigo)",
      "lat/lon (cadastro Unidades_Unificadas)",
      "bairro (bairro_final)",
      "ofertas.grupamento",
      "ofertas.horario",
      "ofertas.inscritos",
      "ofertas.inscritosPrioritarios"
    ],
    "DERIVADO": [
      "cre (bairro-centroide mais próximo)",
      "ofertas.vagas (determinístico; a fonte não traz oferta)",
      "ofertas.vagasPrioritarias",
      "ofertas.demanda"
    ],
    "SINTETICO": [
      "extrato inteiro é sintético (_synthetic=true)",
      "nome/tipo da unidade são rótulos (não há nome oficial na fonte)"
    ]
  },
  "aviso": "Estrutura fiel ao processo da SME; indivíduos e ofertas de vaga não representam a rede real. Dado sintético jamais apresentado como oficial."
} as const;

export const UNIDADES_GERADAS: Unidade[] = [
  {
    "id": "SME-1004",
    "nome": "Creche SME Santa Tereza · 1004",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Santa Tereza",
    "endereco": "Santa Tereza, Rio de Janeiro",
    "lat": -22.931593,
    "lon": -43.196094,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1005",
    "nome": "Creche SME Rio Comprido · 1005",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.925071,
    "lon": -43.214324,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1006",
    "nome": "Creche SME São Cristóvão · 1006",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.897855,
    "lon": -43.23659,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 12,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1007",
    "nome": "Creche SME Catumbi · 1007",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Catumbi",
    "endereco": "Catumbi, Rio de Janeiro",
    "lat": -22.920831,
    "lon": -43.195843,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1009",
    "nome": "Creche SME Santo Cristo · 1009",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Santo Cristo",
    "endereco": "Santo Cristo, Rio de Janeiro",
    "lat": -22.900935,
    "lon": -43.19773,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-1010",
    "nome": "Creche SME São Cristóvão · 1010",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.896828,
    "lon": -43.236474,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 16,
        "vagasPrioritarias": 6,
        "inscritos": 26,
        "inscritosPrioritarios": 9,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2001",
    "nome": "Creche SME Tijuca · 2001",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.938057,
    "lon": -43.252089,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2002",
    "nome": "Creche SME Tijuca · 2002",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.924253,
    "lon": -43.220764,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2003",
    "nome": "Creche SME Rocinha · 2003",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.986423,
    "lon": -43.245219,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2004",
    "nome": "Creche SME Rocinha · 2004",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.989905,
    "lon": -43.251242,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 14,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2005",
    "nome": "Creche SME Copacabana · 2005",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.9821,
    "lon": -43.196212,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2006",
    "nome": "Creche SME Rocinha · 2006",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.987367,
    "lon": -43.245502,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2009",
    "nome": "Creche SME Tijuca · 2009",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.913669,
    "lon": -43.220719,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2010",
    "nome": "Creche SME Vila Isabel · 2010",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vila Isabel",
    "endereco": "Vila Isabel, Rio de Janeiro",
    "lat": -22.915158,
    "lon": -43.261628,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2012",
    "nome": "Creche SME Gávea · 2012",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gávea",
    "endereco": "Gávea, Rio de Janeiro",
    "lat": -22.994533,
    "lon": -43.272991,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2013",
    "nome": "Creche SME Cosme Velho · 2013",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Cosme Velho",
    "endereco": "Cosme Velho, Rio de Janeiro",
    "lat": -22.93993,
    "lon": -43.205417,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2014",
    "nome": "Creche SME Copacabana · 2014",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.960982,
    "lon": -43.179078,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2015",
    "nome": "Creche SME Laranjeiras · 2015",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Laranjeiras",
    "endereco": "Laranjeiras, Rio de Janeiro",
    "lat": -22.938628,
    "lon": -43.192667,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2016",
    "nome": "Creche SME Rio Comprido · 2016",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.960768,
    "lon": -43.220895,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2018",
    "nome": "Creche SME Gávea · 2018",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gávea",
    "endereco": "Gávea, Rio de Janeiro",
    "lat": -22.983246,
    "lon": -43.238818,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2019",
    "nome": "Creche SME Botafogo · 2019",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Botafogo",
    "endereco": "Botafogo, Rio de Janeiro",
    "lat": -22.94739,
    "lon": -43.194071,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2022",
    "nome": "Creche SME Rio Comprido · 2022",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.924035,
    "lon": -43.215492,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2025",
    "nome": "Creche SME Botafogo · 2025",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Botafogo",
    "endereco": "Botafogo, Rio de Janeiro",
    "lat": -22.953351,
    "lon": -43.195058,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2026",
    "nome": "Creche SME Catete · 2026",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Catete",
    "endereco": "Catete, Rio de Janeiro",
    "lat": -22.926962,
    "lon": -43.181752,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2028",
    "nome": "Creche SME Flamengo · 2028",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Flamengo",
    "endereco": "Flamengo, Rio de Janeiro",
    "lat": -22.937384,
    "lon": -43.179228,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2029",
    "nome": "Creche SME Botafogo · 2029",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Botafogo",
    "endereco": "Botafogo, Rio de Janeiro",
    "lat": -22.953767,
    "lon": -43.177035,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2031",
    "nome": "Creche SME Rocinha · 2031",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.990966,
    "lon": -43.249348,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2032",
    "nome": "Creche SME Jardim Botânico · 2032",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Jardim Botânico",
    "endereco": "Jardim Botânico, Rio de Janeiro",
    "lat": -22.965107,
    "lon": -43.216601,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2034",
    "nome": "Creche SME Rocinha · 2034",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.991928,
    "lon": -43.250856,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2035",
    "nome": "Creche SME Gávea · 2035",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gávea",
    "endereco": "Gávea, Rio de Janeiro",
    "lat": -22.993065,
    "lon": -43.253499,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2036",
    "nome": "Creche SME Gávea · 2036",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gávea",
    "endereco": "Gávea, Rio de Janeiro",
    "lat": -22.991909,
    "lon": -43.250821,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2037",
    "nome": "Creche SME Copacabana · 2037",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.963049,
    "lon": -43.193868,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2038",
    "nome": "Creche SME Tijuca · 2038",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.93698,
    "lon": -43.256352,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2039",
    "nome": "Creche SME Copacabana · 2039",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.980926,
    "lon": -43.195652,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 17,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2040",
    "nome": "Creche SME Rocinha · 2040",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.986335,
    "lon": -43.245367,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2041",
    "nome": "Creche SME Gávea · 2041",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gávea",
    "endereco": "Gávea, Rio de Janeiro",
    "lat": -22.985656,
    "lon": -43.242944,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2042",
    "nome": "Creche SME Rio Comprido · 2042",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.935067,
    "lon": -43.192821,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2043",
    "nome": "Creche SME Tijuca · 2043",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.939844,
    "lon": -43.254513,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2044",
    "nome": "Creche SME Andaraí · 2044",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Andaraí",
    "endereco": "Andaraí, Rio de Janeiro",
    "lat": -22.928254,
    "lon": -43.252598,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-2045",
    "nome": "Creche SME Ipanema · 2045",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Ipanema",
    "endereco": "Ipanema, Rio de Janeiro",
    "lat": -22.981634,
    "lon": -43.204742,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2046",
    "nome": "Creche SME Gávea · 2046",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gávea",
    "endereco": "Gávea, Rio de Janeiro",
    "lat": -22.97556,
    "lon": -43.227287,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2047",
    "nome": "Creche SME Rocinha · 2047",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.990015,
    "lon": -43.244788,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2048",
    "nome": "Creche SME Vila Isabel · 2048",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vila Isabel",
    "endereco": "Vila Isabel, Rio de Janeiro",
    "lat": -22.915035,
    "lon": -43.252698,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2049",
    "nome": "Creche SME Copacabana · 2049",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.963391,
    "lon": -43.202992,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2052",
    "nome": "Creche SME Botafogo · 2052",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Botafogo",
    "endereco": "Botafogo, Rio de Janeiro",
    "lat": -22.948538,
    "lon": -43.192497,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2053",
    "nome": "Creche SME Leblon · 2053",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Leblon",
    "endereco": "Leblon, Rio de Janeiro",
    "lat": -22.980733,
    "lon": -43.221172,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2054",
    "nome": "Creche SME Rocinha · 2054",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.990039,
    "lon": -43.2455,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2055",
    "nome": "Creche SME Copacabana · 2055",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.968825,
    "lon": -43.183296,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2056",
    "nome": "Creche SME Vidigal · 2056",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vidigal",
    "endereco": "Vidigal, Rio de Janeiro",
    "lat": -22.992648,
    "lon": -43.236404,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2057",
    "nome": "Creche SME Alto Da Boa Vista · 2057",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Alto Da Boa Vista",
    "endereco": "Alto Da Boa Vista, Rio de Janeiro",
    "lat": -22.947288,
    "lon": -43.244536,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2058",
    "nome": "Creche SME Rocinha · 2058",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.98785,
    "lon": -43.248652,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2060",
    "nome": "Creche SME Rocinha · 2060",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.986383,
    "lon": -43.245284,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-2061",
    "nome": "Creche SME Copacabana · 2061",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.980249,
    "lon": -43.194924,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-2063",
    "nome": "Creche SME Grajaú · 2063",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Grajaú",
    "endereco": "Grajaú, Rio de Janeiro",
    "lat": -22.920578,
    "lon": -43.254213,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3001",
    "nome": "Creche SME Engenho De Dentro · 3001",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho De Dentro",
    "endereco": "Engenho De Dentro, Rio de Janeiro",
    "lat": -22.915896,
    "lon": -43.298106,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3002",
    "nome": "Creche SME Rocha · 3002",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Rocha",
    "endereco": "Rocha, Rio de Janeiro",
    "lat": -22.900567,
    "lon": -43.249511,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 3,
        "inscritos": 23,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3003",
    "nome": "Creche SME Méier · 3003",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Méier",
    "endereco": "Méier, Rio de Janeiro",
    "lat": -22.896962,
    "lon": -43.280628,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-3004",
    "nome": "Creche SME Cachambi · 3004",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Cachambi",
    "endereco": "Cachambi, Rio de Janeiro",
    "lat": -22.894343,
    "lon": -43.273413,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3005",
    "nome": "Creche SME Cachambi · 3005",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Cachambi",
    "endereco": "Cachambi, Rio de Janeiro",
    "lat": -22.896122,
    "lon": -43.269637,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3006",
    "nome": "Creche SME Engenho De Dentro · 3006",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho De Dentro",
    "endereco": "Engenho De Dentro, Rio de Janeiro",
    "lat": -22.895743,
    "lon": -43.297398,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 16,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3007",
    "nome": "Creche SME Lins De Vasconcelos · 3007",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Lins De Vasconcelos",
    "endereco": "Lins De Vasconcelos, Rio de Janeiro",
    "lat": -22.915491,
    "lon": -43.278708,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3008",
    "nome": "Creche SME Ramos · 3008",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.863601,
    "lon": -43.272574,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3009",
    "nome": "Creche SME Ramos · 3009",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.857527,
    "lon": -43.269048,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3010",
    "nome": "Creche SME Inhaúma · 3010",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.859813,
    "lon": -43.279069,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3011",
    "nome": "Creche SME Inhaúma · 3011",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.858478,
    "lon": -43.275967,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3012",
    "nome": "Creche SME Quintino Bocaiúva · 3012",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Quintino Bocaiúva",
    "endereco": "Quintino Bocaiúva, Rio de Janeiro",
    "lat": -22.886781,
    "lon": -43.310026,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3013",
    "nome": "Creche SME Cachambi · 3013",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Cachambi",
    "endereco": "Cachambi, Rio de Janeiro",
    "lat": -22.888968,
    "lon": -43.266521,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 4,
        "inscritos": 14,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3014",
    "nome": "Creche SME Del Castilho · 3014",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Del Castilho",
    "endereco": "Del Castilho, Rio de Janeiro",
    "lat": -22.87407,
    "lon": -43.286686,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 19,
        "vagasPrioritarias": 5,
        "inscritos": 28,
        "inscritosPrioritarios": 8,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 18,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3015",
    "nome": "Creche SME Riachuelo · 3015",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Riachuelo",
    "endereco": "Riachuelo, Rio de Janeiro",
    "lat": -22.904587,
    "lon": -43.251922,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3016",
    "nome": "Creche SME Ramos · 3016",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.862443,
    "lon": -43.263753,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3017",
    "nome": "Creche SME Engenho Novo · 3017",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Novo",
    "endereco": "Engenho Novo, Rio de Janeiro",
    "lat": -22.914269,
    "lon": -43.276355,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3018",
    "nome": "Creche SME Engenho Novo · 3018",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Novo",
    "endereco": "Engenho Novo, Rio de Janeiro",
    "lat": -22.899884,
    "lon": -43.269662,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3019",
    "nome": "Creche SME Ramos · 3019",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.859897,
    "lon": -43.267883,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3020",
    "nome": "Creche SME Inhaúma · 3020",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.863887,
    "lon": -43.278458,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3021",
    "nome": "Creche SME Jacaré · 3021",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacaré",
    "endereco": "Jacaré, Rio de Janeiro",
    "lat": -22.889312,
    "lon": -43.253334,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3022",
    "nome": "Creche SME Pilares · 3022",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Pilares",
    "endereco": "Pilares, Rio de Janeiro",
    "lat": -22.874537,
    "lon": -43.293869,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3023",
    "nome": "Creche SME São Francisco Xavier · 3023",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "São Francisco Xavier",
    "endereco": "São Francisco Xavier, Rio de Janeiro",
    "lat": -22.903227,
    "lon": -43.247158,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3024",
    "nome": "Creche SME Sampaio · 3024",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Sampaio",
    "endereco": "Sampaio, Rio de Janeiro",
    "lat": -22.901241,
    "lon": -43.259252,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3025",
    "nome": "Creche SME Abolicao · 3025",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Abolicao",
    "endereco": "Abolicao, Rio de Janeiro",
    "lat": -22.885114,
    "lon": -43.301264,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3026",
    "nome": "Creche SME Manguinhos · 3026",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Manguinhos",
    "endereco": "Manguinhos, Rio de Janeiro",
    "lat": -22.880596,
    "lon": -43.25631,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 14,
        "vagasPrioritarias": 3,
        "inscritos": 29,
        "inscritosPrioritarios": 7,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3027",
    "nome": "Creche SME Méier · 3027",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Méier",
    "endereco": "Méier, Rio de Janeiro",
    "lat": -22.897389,
    "lon": -43.274659,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3028",
    "nome": "Creche SME Quintino Bocaiúva · 3028",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Quintino Bocaiúva",
    "endereco": "Quintino Bocaiúva, Rio de Janeiro",
    "lat": -22.886136,
    "lon": -43.309413,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 10,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3029",
    "nome": "Creche SME Engenho De Dentro · 3029",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho De Dentro",
    "endereco": "Engenho De Dentro, Rio de Janeiro",
    "lat": -22.910219,
    "lon": -43.297197,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3030",
    "nome": "Creche SME Engenho Novo · 3030",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Novo",
    "endereco": "Engenho Novo, Rio de Janeiro",
    "lat": -22.904339,
    "lon": -43.26414,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3031",
    "nome": "Creche SME Méier · 3031",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Méier",
    "endereco": "Méier, Rio de Janeiro",
    "lat": -22.906752,
    "lon": -43.280052,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3032",
    "nome": "Creche SME Pilares · 3032",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Pilares",
    "endereco": "Pilares, Rio de Janeiro",
    "lat": -22.882104,
    "lon": -43.29356,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3033",
    "nome": "Creche SME Lins De Vasconcelos · 3033",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Lins De Vasconcelos",
    "endereco": "Lins De Vasconcelos, Rio de Janeiro",
    "lat": -22.912049,
    "lon": -43.285062,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3034",
    "nome": "Creche SME Pilares · 3034",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Pilares",
    "endereco": "Pilares, Rio de Janeiro",
    "lat": -22.877819,
    "lon": -43.300457,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3035",
    "nome": "Creche SME Inhaúma · 3035",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.865589,
    "lon": -43.276409,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3036",
    "nome": "Creche SME Del Castilho · 3036",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Del Castilho",
    "endereco": "Del Castilho, Rio de Janeiro",
    "lat": -22.879895,
    "lon": -43.262005,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3037",
    "nome": "Creche SME Inhaúma · 3037",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.873678,
    "lon": -43.283382,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 4,
        "inscritos": 19,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 4,
        "inscritos": 11,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-3038",
    "nome": "Creche SME Engenho Da Rainha · 3038",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Da Rainha",
    "endereco": "Engenho Da Rainha, Rio de Janeiro",
    "lat": -22.865472,
    "lon": -43.289191,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 4,
        "inscritos": 17,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3039",
    "nome": "Creche SME Higienópolis · 3039",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Higienópolis",
    "endereco": "Higienópolis, Rio de Janeiro",
    "lat": -22.871976,
    "lon": -43.257367,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-3040",
    "nome": "Creche SME Engenho Novo · 3040",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Novo",
    "endereco": "Engenho Novo, Rio de Janeiro",
    "lat": -22.908912,
    "lon": -43.26861,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-3041",
    "nome": "Creche SME Encantado · 3041",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Encantado",
    "endereco": "Encantado, Rio de Janeiro",
    "lat": -22.890436,
    "lon": -43.305072,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4001",
    "nome": "Creche SME Bonsucesso · 4001",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.850823,
    "lon": -43.242234,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4002",
    "nome": "Creche SME Braz De Pina · 4002",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Braz De Pina",
    "endereco": "Braz De Pina, Rio de Janeiro",
    "lat": -22.833926,
    "lon": -43.306712,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4003",
    "nome": "Creche SME Parada De Lucas · 4003",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Parada De Lucas",
    "endereco": "Parada De Lucas, Rio de Janeiro",
    "lat": -22.812977,
    "lon": -43.296908,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4004",
    "nome": "Creche SME Penha · 4004",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.850387,
    "lon": -43.284007,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4005",
    "nome": "Creche SME Cordovil · 4005",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.829867,
    "lon": -43.307497,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 4,
        "inscritos": 9,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4006",
    "nome": "Creche SME Bonsucesso · 4006",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.859729,
    "lon": -43.259332,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4007",
    "nome": "Creche SME Penha · 4007",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.841717,
    "lon": -43.280142,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4008",
    "nome": "Creche SME Penha · 4008",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.846727,
    "lon": -43.284195,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4009",
    "nome": "Creche SME Manguinhos · 4009",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Manguinhos",
    "endereco": "Manguinhos, Rio de Janeiro",
    "lat": -22.878881,
    "lon": -43.253046,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4010",
    "nome": "Creche SME Bonsucesso · 4010",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.85783,
    "lon": -43.24325,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4011",
    "nome": "Creche SME Braz De Pina · 4011",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Braz De Pina",
    "endereco": "Braz De Pina, Rio de Janeiro",
    "lat": -22.823624,
    "lon": -43.285311,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4012",
    "nome": "Creche SME Bonsucesso · 4012",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.851584,
    "lon": -43.242203,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4013",
    "nome": "Creche SME Ramos · 4013",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.845813,
    "lon": -43.248902,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 0,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-4014",
    "nome": "Creche SME Brás De Pina · 4014",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Brás De Pina",
    "endereco": "Brás De Pina, Rio de Janeiro",
    "lat": -22.833996,
    "lon": -43.301455,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4015",
    "nome": "Creche SME Maré · 4015",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.865298,
    "lon": -43.248141,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 5,
        "inscritos": 20,
        "inscritosPrioritarios": 8,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4016",
    "nome": "Creche SME Manguinhos · 4016",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Manguinhos",
    "endereco": "Manguinhos, Rio de Janeiro",
    "lat": -22.875973,
    "lon": -43.25116,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 3,
        "inscritos": 10,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4017",
    "nome": "Creche SME Penha Circular · 4017",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.827668,
    "lon": -43.276487,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4018",
    "nome": "Creche SME Maré · 4018",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.85034,
    "lon": -43.246565,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4020",
    "nome": "Creche SME Bonsucesso · 4020",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.865223,
    "lon": -43.256528,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4021",
    "nome": "Creche SME Penha Circular · 4021",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.838169,
    "lon": -43.287945,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4022",
    "nome": "Creche SME Penha · 4022",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.845339,
    "lon": -43.29,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 4,
        "inscritos": 18,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4023",
    "nome": "Creche SME Maré · 4023",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.861311,
    "lon": -43.246942,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4024",
    "nome": "Creche SME Olaria · 4024",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.851467,
    "lon": -43.272296,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 19,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 12,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4025",
    "nome": "Creche SME Cordovil · 4025",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.821682,
    "lon": -43.290789,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4026",
    "nome": "Creche SME Parada De Lucas · 4026",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Parada De Lucas",
    "endereco": "Parada De Lucas, Rio de Janeiro",
    "lat": -22.862018,
    "lon": -43.238745,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4027",
    "nome": "Creche SME Vigário Geral · 4027",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Vigário Geral",
    "endereco": "Vigário Geral, Rio de Janeiro",
    "lat": -22.808482,
    "lon": -43.309681,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 16,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4028",
    "nome": "Creche SME Ramos · 4028",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.843334,
    "lon": -43.250275,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4029",
    "nome": "Creche SME Ramos · 4029",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.85518,
    "lon": -43.267472,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4030",
    "nome": "Creche SME Ramos · 4030",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.858064,
    "lon": -43.260027,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 3,
        "inscritos": 19,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 3,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4032",
    "nome": "Creche SME Irajá · 4032",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.838356,
    "lon": -43.311946,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 19,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4034",
    "nome": "Creche SME Vila Da Penha · 4034",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vila Da Penha",
    "endereco": "Vila Da Penha, Rio de Janeiro",
    "lat": -22.843825,
    "lon": -43.308899,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4035",
    "nome": "Creche SME Ramos · 4035",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.848366,
    "lon": -43.244877,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4036",
    "nome": "Creche SME Braz De Pina · 4036",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Braz De Pina",
    "endereco": "Braz De Pina, Rio de Janeiro",
    "lat": -22.829471,
    "lon": -43.293928,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4037",
    "nome": "Creche SME Bonsucesso · 4037",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.850549,
    "lon": -43.24137,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4038",
    "nome": "Creche SME Cordovil · 4038",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.827529,
    "lon": -43.30658,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4039",
    "nome": "Creche SME Penha Circular · 4039",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.817539,
    "lon": -43.271973,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4040",
    "nome": "Creche SME Jardim América · 4040",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Jardim América",
    "endereco": "Jardim América, Rio de Janeiro",
    "lat": -22.809948,
    "lon": -43.319679,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 14,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 17,
        "vagasPrioritarias": 4,
        "inscritos": 23,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-4041",
    "nome": "Creche SME Bonsucesso · 4041",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.857516,
    "lon": -43.244588,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4042",
    "nome": "Creche SME Cordovil · 4042",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.828353,
    "lon": -43.287789,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4043",
    "nome": "Creche SME Olaria · 4043",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.84166,
    "lon": -43.263427,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4044",
    "nome": "Creche SME Ramos · 4044",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.859332,
    "lon": -43.2565,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4045",
    "nome": "Creche SME Parada De Lucas · 4045",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Parada De Lucas",
    "endereco": "Parada De Lucas, Rio de Janeiro",
    "lat": -22.812419,
    "lon": -43.298461,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4046",
    "nome": "Creche SME Ramos · 4046",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.862033,
    "lon": -43.23867,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4047",
    "nome": "Creche SME Olaria · 4047",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.842923,
    "lon": -43.261792,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-4048",
    "nome": "Creche SME Ramos · 4048",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.851227,
    "lon": -43.25565,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4049",
    "nome": "Creche SME Bonsucesso · 4049",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.848252,
    "lon": -43.247737,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-4050",
    "nome": "Creche SME Ramos · 4050",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.854411,
    "lon": -43.24715,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-5001",
    "nome": "Creche SME Rocha Miranda · 5001",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Rocha Miranda",
    "endereco": "Rocha Miranda, Rio de Janeiro",
    "lat": -22.85261,
    "lon": -43.351923,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 16,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-5003",
    "nome": "Creche SME Quintino Bocaiúva · 5003",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Quintino Bocaiúva",
    "endereco": "Quintino Bocaiúva, Rio de Janeiro",
    "lat": -22.889508,
    "lon": -43.324465,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-5004",
    "nome": "Creche SME Irajá · 5004",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.831344,
    "lon": -43.318177,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-5005",
    "nome": "Creche SME Cavalcanti · 5005",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cavalcanti",
    "endereco": "Cavalcanti, Rio de Janeiro",
    "lat": -22.872485,
    "lon": -43.313335,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-5006",
    "nome": "Creche SME Madureira · 5006",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Madureira",
    "endereco": "Madureira, Rio de Janeiro",
    "lat": -22.887638,
    "lon": -43.345574,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 4,
        "inscritos": 22,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 19,
        "vagasPrioritarias": 4,
        "inscritos": 26,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-5007",
    "nome": "Creche SME Guadalupe · 5007",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Guadalupe",
    "endereco": "Guadalupe, Rio de Janeiro",
    "lat": -22.848236,
    "lon": -43.361627,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-5008",
    "nome": "Creche SME Vicente De Carvalho · 5008",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vicente De Carvalho",
    "endereco": "Vicente De Carvalho, Rio de Janeiro",
    "lat": -22.856333,
    "lon": -43.306898,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-5010",
    "nome": "Creche SME Irajá · 5010",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.828505,
    "lon": -43.329558,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 21,
        "vagasPrioritarias": 8,
        "inscritos": 34,
        "inscritosPrioritarios": 13,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 21,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-5012",
    "nome": "Creche SME Vila Da Penha · 5012",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vila Da Penha",
    "endereco": "Vila Da Penha, Rio de Janeiro",
    "lat": -22.842743,
    "lon": -43.311109,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 14,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-5013",
    "nome": "Creche SME Bento Ribeiro · 5013",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Bento Ribeiro",
    "endereco": "Bento Ribeiro, Rio de Janeiro",
    "lat": -22.863384,
    "lon": -43.364112,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-5014",
    "nome": "Creche SME Marechal Hermes · 5014",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Marechal Hermes",
    "endereco": "Marechal Hermes, Rio de Janeiro",
    "lat": -22.86149,
    "lon": -43.368311,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 18,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-5015",
    "nome": "Creche SME Rocha Miranda · 5015",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Rocha Miranda",
    "endereco": "Rocha Miranda, Rio de Janeiro",
    "lat": -22.8407,
    "lon": -43.349911,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 5,
        "inscritos": 18,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 3,
        "inscritos": 25,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-5016",
    "nome": "Creche SME Bento Ribeiro · 5016",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Bento Ribeiro",
    "endereco": "Bento Ribeiro, Rio de Janeiro",
    "lat": -22.85562,
    "lon": -43.352531,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 3,
        "inscritos": 18,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-6001",
    "nome": "Creche SME Anchieta · 6001",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.82191,
    "lon": -43.39912,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 3,
        "inscritos": 14,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-6002",
    "nome": "Creche SME Guadalupe · 6002",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Guadalupe",
    "endereco": "Guadalupe, Rio de Janeiro",
    "lat": -22.83417,
    "lon": -43.37066,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-6003",
    "nome": "Creche SME Anchieta · 6003",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.82355,
    "lon": -43.40247,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-6004",
    "nome": "Creche SME Pavuna · 6004",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.82067,
    "lon": -43.34701,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-6005",
    "nome": "Creche SME Anchieta · 6005",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.81704,
    "lon": -43.39683,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-6006",
    "nome": "Creche SME Acari · 6006",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Acari",
    "endereco": "Acari, Rio de Janeiro",
    "lat": -22.82359,
    "lon": -43.34934,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-6007",
    "nome": "Creche SME Acari · 6007",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Acari",
    "endereco": "Acari, Rio de Janeiro",
    "lat": -22.82279,
    "lon": -43.34669,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-6009",
    "nome": "Creche SME Anchieta · 6009",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.821956,
    "lon": -43.397526,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 17,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-6012",
    "nome": "Creche SME Guadalupe · 6012",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Guadalupe",
    "endereco": "Guadalupe, Rio de Janeiro",
    "lat": -22.84617,
    "lon": -43.36729,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-6013",
    "nome": "Creche SME Parque Anchieta · 6013",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Parque Anchieta",
    "endereco": "Parque Anchieta, Rio de Janeiro",
    "lat": -22.83706,
    "lon": -43.41045,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 2,
        "inscritos": 17,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-6015",
    "nome": "Creche SME Pavuna · 6015",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.808272,
    "lon": -43.369689,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 4,
        "inscritos": 16,
        "inscritosPrioritarios": 8,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-6016",
    "nome": "Creche SME Ricardo De Albuquerque · 6016",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Ricardo De Albuquerque",
    "endereco": "Ricardo De Albuquerque, Rio de Janeiro",
    "lat": -22.83996,
    "lon": -43.398,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-6017",
    "nome": "Creche SME Guadalupe · 6017",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Guadalupe",
    "endereco": "Guadalupe, Rio de Janeiro",
    "lat": -22.84816,
    "lon": -43.37781,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7001",
    "nome": "Creche SME Vargem Pequena · 7001",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Pequena",
    "endereco": "Vargem Pequena, Rio de Janeiro",
    "lat": -22.98963,
    "lon": -43.46062,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7002",
    "nome": "Creche SME Vargem Grande · 7002",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Grande",
    "endereco": "Vargem Grande, Rio de Janeiro",
    "lat": -22.99539,
    "lon": -43.49488,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7003",
    "nome": "Creche SME Taquara · 7003",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Taquara",
    "endereco": "Taquara, Rio de Janeiro",
    "lat": -22.91192,
    "lon": -43.4059,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 22,
        "vagasPrioritarias": 7,
        "inscritos": 40,
        "inscritosPrioritarios": 12,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 3,
        "inscritos": 19,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 13,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-7004",
    "nome": "Creche SME Pechincha · 7004",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Pechincha",
    "endereco": "Pechincha, Rio de Janeiro",
    "lat": -22.93948,
    "lon": -43.35402,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7007",
    "nome": "Creche SME Cidade De Deus · 7007",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.94353,
    "lon": -43.35555,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7008",
    "nome": "Creche SME Praça Seca · 7008",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praça Seca",
    "endereco": "Praça Seca, Rio de Janeiro",
    "lat": -22.90428,
    "lon": -43.35496,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7010",
    "nome": "Creche SME Freguesia (Jacarepaguá) · 7010",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Freguesia (Jacarepaguá)",
    "endereco": "Freguesia (Jacarepaguá), Rio de Janeiro",
    "lat": -22.94445,
    "lon": -43.34162,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7011",
    "nome": "Creche SME Barra Da Tijuca · 7011",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Barra Da Tijuca",
    "endereco": "Barra Da Tijuca, Rio de Janeiro",
    "lat": -23.0096,
    "lon": -43.46302,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 12,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7013",
    "nome": "Creche SME Cidade De Deus · 7013",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.95235,
    "lon": -43.36266,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 14,
        "vagasPrioritarias": 6,
        "inscritos": 22,
        "inscritosPrioritarios": 9,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-7014",
    "nome": "Creche SME Cidade De Deus · 7014",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.94726,
    "lon": -43.36008,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 3,
        "inscritos": 16,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-7015",
    "nome": "Creche SME Vargem Grande · 7015",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Grande",
    "endereco": "Vargem Grande, Rio de Janeiro",
    "lat": -22.98393,
    "lon": -43.49695,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 3,
        "inscritos": 19,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-7017",
    "nome": "Creche SME Recreio Dos Bandeirantes · 7017",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio Dos Bandeirantes",
    "endereco": "Recreio Dos Bandeirantes, Rio de Janeiro",
    "lat": -23.01089,
    "lon": -43.47622,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7018",
    "nome": "Creche SME Tanque · 7018",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Tanque",
    "endereco": "Tanque, Rio de Janeiro",
    "lat": -22.9138,
    "lon": -43.3644,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 13,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7019",
    "nome": "Creche SME Gardenia Azul · 7019",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardenia Azul",
    "endereco": "Gardenia Azul, Rio de Janeiro",
    "lat": -22.96342,
    "lon": -43.34745,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 2,
        "inscritos": 17,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7020",
    "nome": "Creche SME Gardênia Azul · 7020",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardênia Azul",
    "endereco": "Gardênia Azul, Rio de Janeiro",
    "lat": -22.95829,
    "lon": -43.35315,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7025",
    "nome": "Creche SME Cidade De Deus · 7025",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.94804,
    "lon": -43.35885,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7027",
    "nome": "Creche SME Itanhangá · 7027",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Itanhangá",
    "endereco": "Itanhangá, Rio de Janeiro",
    "lat": -22.93257,
    "lon": -43.37475,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7034",
    "nome": "Creche SME Curicica · 7034",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.93863,
    "lon": -43.39598,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7035",
    "nome": "Creche SME Anil · 7035",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.95058,
    "lon": -43.34142,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 14,
        "vagasPrioritarias": 4,
        "inscritos": 20,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-7036",
    "nome": "Creche SME Freguesia (Jacarepaguá) · 7036",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Freguesia (Jacarepaguá)",
    "endereco": "Freguesia (Jacarepaguá), Rio de Janeiro",
    "lat": -22.93773,
    "lon": -43.342,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7037",
    "nome": "Creche SME Tanque · 7037",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Tanque",
    "endereco": "Tanque, Rio de Janeiro",
    "lat": -22.92011,
    "lon": -43.36048,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 3,
        "inscritos": 23,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 3,
        "inscritos": 17,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7038",
    "nome": "Creche SME Vila Valqueire · 7038",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Vila Valqueire",
    "endereco": "Vila Valqueire, Rio de Janeiro",
    "lat": -22.88771,
    "lon": -43.36412,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 18,
        "vagasPrioritarias": 5,
        "inscritos": 31,
        "inscritosPrioritarios": 8,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7039",
    "nome": "Creche SME Anil · 7039",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.96408,
    "lon": -43.33653,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7040",
    "nome": "Creche SME Praça Seca · 7040",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praça Seca",
    "endereco": "Praça Seca, Rio de Janeiro",
    "lat": -22.89823,
    "lon": -43.35344,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 26,
        "vagasPrioritarias": 7,
        "inscritos": 43,
        "inscritosPrioritarios": 12,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 27,
        "vagasPrioritarias": 5,
        "inscritos": 36,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-7041",
    "nome": "Creche SME Taquara · 7041",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Taquara",
    "endereco": "Taquara, Rio de Janeiro",
    "lat": -22.91733,
    "lon": -43.37196,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 3,
        "inscritos": 19,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7042",
    "nome": "Creche SME Jacarepaguá · 7042",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepaguá",
    "endereco": "Jacarepaguá, Rio de Janeiro",
    "lat": -22.95334,
    "lon": -43.37915,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 14,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-7043",
    "nome": "Creche SME Vargem Pequena · 7043",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Pequena",
    "endereco": "Vargem Pequena, Rio de Janeiro",
    "lat": -22.98893,
    "lon": -43.44052,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-7044",
    "nome": "Creche SME Recreio Dos Bandeirantes · 7044",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio Dos Bandeirantes",
    "endereco": "Recreio Dos Bandeirantes, Rio de Janeiro",
    "lat": -23.02235,
    "lon": -43.48079,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 14,
        "vagasPrioritarias": 6,
        "inscritos": 22,
        "inscritosPrioritarios": 9,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-7045",
    "nome": "Creche SME Gardenia Azul · 7045",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardenia Azul",
    "endereco": "Gardenia Azul, Rio de Janeiro",
    "lat": -22.96375,
    "lon": -43.34749,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-8002",
    "nome": "Creche SME Realengo · 8002",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.86123,
    "lon": -43.4272,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8003",
    "nome": "Creche SME Senador Camará · 8003",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.87855,
    "lon": -43.49396,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8004",
    "nome": "Creche SME Bangu · 8004",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.85888,
    "lon": -43.48897,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-8005",
    "nome": "Creche SME Padre Miguel · 8005",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.862578,
    "lon": -43.452473,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8006",
    "nome": "Creche SME Realengo · 8006",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.8683,
    "lon": -43.42191,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8007",
    "nome": "Creche SME Bangu · 8007",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.862066,
    "lon": -43.457016,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8008",
    "nome": "Creche SME Realengo · 8008",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.88605,
    "lon": -43.42591,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8009",
    "nome": "Creche SME Senador Camará · 8009",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.87421,
    "lon": -43.48822,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 4,
        "inscritos": 14,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8010",
    "nome": "Creche SME Realengo · 8010",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.883083,
    "lon": -43.437109,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 15,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-8011",
    "nome": "Creche SME Realengo · 8011",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.88083,
    "lon": -43.49267,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 3,
        "inscritos": 17,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8013",
    "nome": "Creche SME Padre Miguel · 8013",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.8799,
    "lon": -43.43653,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-8014",
    "nome": "Creche SME Bangu · 8014",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.88082,
    "lon": -43.4709,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8016",
    "nome": "Creche SME Realengo · 8016",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.88321,
    "lon": -43.42582,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8018",
    "nome": "Creche SME Bangu · 8018",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.87388,
    "lon": -43.48101,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8019",
    "nome": "Creche SME Realengo · 8019",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.89115,
    "lon": -43.42064,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8021",
    "nome": "Creche SME Padre Miguel · 8021",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.87342,
    "lon": -43.43952,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8023",
    "nome": "Creche SME Bangu · 8023",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.85592,
    "lon": -43.48252,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8025",
    "nome": "Creche SME Jardim Sulacap · 8025",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Jardim Sulacap",
    "endereco": "Jardim Sulacap, Rio de Janeiro",
    "lat": -22.88886,
    "lon": -43.3991,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-8027",
    "nome": "Creche SME Bangu · 8027",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.89334,
    "lon": -43.46445,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9001",
    "nome": "Creche SME Campo Grande · 9001",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.90951,
    "lon": -43.53293,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9002",
    "nome": "Creche SME Senador Vasconcelos · 9002",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Senador Vasconcelos",
    "endereco": "Senador Vasconcelos, Rio de Janeiro",
    "lat": -22.90369,
    "lon": -43.53572,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9003",
    "nome": "Creche SME Campo Grande · 9003",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.92398,
    "lon": -43.52999,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9004",
    "nome": "Creche SME Cosmos · 9004",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.8919,
    "lon": -43.60452,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9007",
    "nome": "Creche SME Campo Grande · 9007",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.90733,
    "lon": -43.57735,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9008",
    "nome": "Creche SME Campo Grande · 9008",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.91489,
    "lon": -43.56694,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9009",
    "nome": "Creche SME Campo Grande · 9009",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.930233,
    "lon": -43.558059,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9010",
    "nome": "Creche SME Campo Grande · 9010",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.9164,
    "lon": -43.5345,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9011",
    "nome": "Creche SME Cosmos · 9011",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.89458,
    "lon": -43.60037,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9012",
    "nome": "Creche SME Campo Grande · 9012",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.87946,
    "lon": -43.61508,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9013",
    "nome": "Creche SME Santíssimo · 9013",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santíssimo",
    "endereco": "Santíssimo, Rio de Janeiro",
    "lat": -22.87444,
    "lon": -43.52549,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9014",
    "nome": "Creche SME Cosmos · 9014",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.91434,
    "lon": -43.61417,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 8,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9017",
    "nome": "Creche SME Campo Grande · 9017",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.91264,
    "lon": -43.53939,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-9018",
    "nome": "Creche SME Inhoaíba · 9018",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.92836,
    "lon": -43.60332,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9019",
    "nome": "Creche SME Cosmos · 9019",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.88994,
    "lon": -43.60561,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9020",
    "nome": "Creche SME Inhoaíba · 9020",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.90717,
    "lon": -43.57941,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9021",
    "nome": "Creche SME Inhoaíba · 9021",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.90626,
    "lon": -43.59867,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 6,
        "inscritos": 17,
        "inscritosPrioritarios": 8,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 4,
        "inscritos": 10,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9022",
    "nome": "Creche SME Inhoaíba · 9022",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.91745,
    "lon": -43.60024,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9023",
    "nome": "Creche SME Inhoaíba · 9023",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.91565,
    "lon": -43.60693,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-9024",
    "nome": "Creche SME Inhoaíba · 9024",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.915875,
    "lon": -43.603487,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-9025",
    "nome": "Creche SME Campo Grande · 9025",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.88272,
    "lon": -43.56714,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9026",
    "nome": "Creche SME Cosmos · 9026",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.90216,
    "lon": -43.61082,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9027",
    "nome": "Creche SME Cosmos · 9027",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.90722,
    "lon": -43.60736,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9028",
    "nome": "Creche SME Campo Grande · 9028",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.88237,
    "lon": -43.57008,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-9029",
    "nome": "Creche SME Campo Grande · 9029",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.95044,
    "lon": -43.56709,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-9030",
    "nome": "Creche SME Campo Grande · 9030",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.86709,
    "lon": -43.5593,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9031",
    "nome": "Creche SME Campo Grande · 9031",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.89867,
    "lon": -43.57786,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9032",
    "nome": "Creche SME Inhoaíba · 9032",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.913033,
    "lon": -43.582358,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9033",
    "nome": "Creche SME Campo Grande · 9033",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.89612,
    "lon": -43.57793,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9034",
    "nome": "Creche SME Campo Grande · 9034",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.90765,
    "lon": -43.54105,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9035",
    "nome": "Creche SME Campo Grande · 9035",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.90268,
    "lon": -43.57109,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-9036",
    "nome": "Creche SME Campo Grande · 9036",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.896205,
    "lon": -43.535729,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9037",
    "nome": "Creche SME Campo Grande · 9037",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.91974,
    "lon": -43.55759,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-9039",
    "nome": "Creche SME Campo Grande · 9039",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.93345,
    "lon": -43.56384,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9040",
    "nome": "Creche SME Cosmos · 9040",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.90761,
    "lon": -43.61597,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9041",
    "nome": "Creche SME Campo Grande · 9041",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.88208,
    "lon": -43.56469,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9042",
    "nome": "Creche SME Campo Grande · 9042",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.89855,
    "lon": -43.56794,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9043",
    "nome": "Creche SME Senador Vasconcelos · 9043",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Senador Vasconcelos",
    "endereco": "Senador Vasconcelos, Rio de Janeiro",
    "lat": -22.89184,
    "lon": -43.53047,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9044",
    "nome": "Creche SME Senador Vasconcelos · 9044",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Senador Vasconcelos",
    "endereco": "Senador Vasconcelos, Rio de Janeiro",
    "lat": -22.90041,
    "lon": -43.53366,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9045",
    "nome": "Creche SME Campo Grande · 9045",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.88529,
    "lon": -43.55016,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-9046",
    "nome": "Creche SME Santíssimo · 9046",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santíssimo",
    "endereco": "Santíssimo, Rio de Janeiro",
    "lat": -22.87472,
    "lon": -43.51354,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 4,
        "inscritos": 12,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 14,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10001",
    "nome": "Creche SME Santa Cruz · 10001",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.96921,
    "lon": -43.66113,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10004",
    "nome": "Creche SME Santa Cruz · 10004",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.90336,
    "lon": -43.71409,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10005",
    "nome": "Creche SME Guaratiba · 10005",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.98161,
    "lon": -43.62566,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10006",
    "nome": "Creche SME Santa Cruz · 10006",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93625,
    "lon": -43.69207,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10008",
    "nome": "Creche SME Santa Cruz · 10008",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92159,
    "lon": -43.60487,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10009",
    "nome": "Creche SME Sepetiba · 10009",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.96847,
    "lon": -43.70721,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10010",
    "nome": "Creche SME Santa Cruz · 10010",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93673,
    "lon": -43.66903,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10011",
    "nome": "Creche SME Santa Cruz · 10011",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92193,
    "lon": -43.68943,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10013",
    "nome": "Creche SME Santa Cruz · 10013",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.98837,
    "lon": -43.63944,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10014",
    "nome": "Creche SME Guaratiba · 10014",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.98416,
    "lon": -43.65166,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10018",
    "nome": "Creche SME Sepetiba · 10018",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.95394,
    "lon": -43.68347,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 16,
        "vagasPrioritarias": 6,
        "inscritos": 23,
        "inscritosPrioritarios": 8,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10019",
    "nome": "Creche SME Santa Cruz · 10019",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93446,
    "lon": -43.67244,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 4,
        "inscritos": 16,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10020",
    "nome": "Creche SME Santa Cruz · 10020",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93204,
    "lon": -43.65063,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10022",
    "nome": "Creche SME Paciência · 10022",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.9226,
    "lon": -43.63206,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10023",
    "nome": "Creche SME Santa Cruz · 10023",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.89736,
    "lon": -43.67945,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10024",
    "nome": "Creche SME Santa Cruz · 10024",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.90224,
    "lon": -43.72044,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 16,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10026",
    "nome": "Creche SME Paciência · 10026",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.91791,
    "lon": -43.62659,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 4,
        "inscritos": 22,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10027",
    "nome": "Creche SME Santa Cruz · 10027",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.90966,
    "lon": -43.67976,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10028",
    "nome": "Creche SME Santa Cruz · 10028",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.94825,
    "lon": -43.66536,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10029",
    "nome": "Creche SME Santa Cruz · 10029",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.91704,
    "lon": -43.69961,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10030",
    "nome": "Creche SME Guaratiba · 10030",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.97091,
    "lon": -43.65353,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10032",
    "nome": "Creche SME Santa Cruz · 10032",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93267,
    "lon": -43.69154,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10033",
    "nome": "Creche SME Sepetiba · 10033",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.98573,
    "lon": -43.69129,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10034",
    "nome": "Creche SME Santa Cruz · 10034",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92996,
    "lon": -43.65597,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10035",
    "nome": "Creche SME Sepetiba · 10035",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.97224,
    "lon": -43.69661,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10036",
    "nome": "Creche SME Santa Cruz · 10036",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92066,
    "lon": -43.69698,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10037",
    "nome": "Creche SME Santa Cruz · 10037",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.89778,
    "lon": -43.6834,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10039",
    "nome": "Creche SME Santa Cruz · 10039",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.94542,
    "lon": -43.68158,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 3,
        "inscritos": 19,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10040",
    "nome": "Creche SME Sepetiba · 10040",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -23.00534,
    "lon": -43.62616,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10041",
    "nome": "Creche SME Santa Cruz · 10041",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92397,
    "lon": -43.67806,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10042",
    "nome": "Creche SME Sepetiba · 10042",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.94751,
    "lon": -43.67828,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10043",
    "nome": "Creche SME Santa Cruz · 10043",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92932,
    "lon": -43.63725,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10044",
    "nome": "Creche SME Santa Cruz · 10044",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93376,
    "lon": -43.70068,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10045",
    "nome": "Creche SME Santa Cruz · 10045",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.9057,
    "lon": -43.6697,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10047",
    "nome": "Creche SME Santa Cruz · 10047",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.9059,
    "lon": -43.7084,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10053",
    "nome": "Creche SME Santa Cruz · 10053",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.98306,
    "lon": -43.68632,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 17,
        "vagasPrioritarias": 4,
        "inscritos": 23,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10054",
    "nome": "Creche SME Santa Cruz · 10054",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92614,
    "lon": -43.68532,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10055",
    "nome": "Creche SME Sepetiba · 10055",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.976573,
    "lon": -43.696587,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10056",
    "nome": "Creche SME Santa Cruz · 10056",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93585,
    "lon": -43.68192,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10057",
    "nome": "Creche SME Cosmos · 10057",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.91426,
    "lon": -43.60254,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 12,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10058",
    "nome": "Creche SME Sepetiba · 10058",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.97265,
    "lon": -43.70832,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 4,
        "inscritos": 19,
        "inscritosPrioritarios": 9,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10059",
    "nome": "Creche SME Santa Cruz · 10059",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.90309,
    "lon": -43.67469,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10060",
    "nome": "Creche SME Santa Cruz · 10060",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92958,
    "lon": -43.68569,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10061",
    "nome": "Creche SME Santa Cruz · 10061",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93413,
    "lon": -43.66251,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10062",
    "nome": "Creche SME Guaratiba · 10062",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.97964,
    "lon": -43.66379,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10063",
    "nome": "Creche SME Guaratiba · 10063",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.96041,
    "lon": -43.64983,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10064",
    "nome": "Creche SME Paciência · 10064",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.88824,
    "lon": -43.63861,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10065",
    "nome": "Creche SME Sepetiba · 10065",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.97923,
    "lon": -43.69058,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10066",
    "nome": "Creche SME Santa Cruz · 10066",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.906869,
    "lon": -43.658103,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 4,
        "inscritos": 11,
        "inscritosPrioritarios": 7,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10067",
    "nome": "Creche SME Santa Cruz · 10067",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.94696,
    "lon": -43.67592,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10068",
    "nome": "Creche SME Guaratiba · 10068",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.96729,
    "lon": -43.65904,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10069",
    "nome": "Creche SME Paciência · 10069",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.91875,
    "lon": -43.62709,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 6,
        "inscritos": 22,
        "inscritosPrioritarios": 10,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10070",
    "nome": "Creche SME Santa Cruz · 10070",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93288,
    "lon": -43.65333,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10071",
    "nome": "Creche SME Pedra De Guaratiba · 10071",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Pedra De Guaratiba",
    "endereco": "Pedra De Guaratiba, Rio de Janeiro",
    "lat": -22.99276,
    "lon": -43.64814,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10073",
    "nome": "Creche SME Guaratiba · 10073",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.94731,
    "lon": -43.60089,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10074",
    "nome": "Creche SME Paciência · 10074",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.88981,
    "lon": -43.63757,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10075",
    "nome": "Creche SME Santa Cruz · 10075",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.931093,
    "lon": -43.666614,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10076",
    "nome": "Creche SME Santa Cruz · 10076",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.932948,
    "lon": -43.697636,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10077",
    "nome": "Creche SME Santa Cruz · 10077",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92954,
    "lon": -43.69489,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10078",
    "nome": "Creche SME Santa Cruz · 10078",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.94064,
    "lon": -43.67972,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10080",
    "nome": "Creche SME Guaratiba · 10080",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.982366,
    "lon": -43.654733,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-10081",
    "nome": "Creche SME Guaratiba · 10081",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -23.01107,
    "lon": -43.53864,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 14,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10082",
    "nome": "Creche SME Santa Cruz · 10082",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.91765,
    "lon": -43.65719,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10084",
    "nome": "Creche SME Guaratiba · 10084",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.93972,
    "lon": -43.577568,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-10085",
    "nome": "Creche SME Guaratiba · 10085",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.96926,
    "lon": -43.62339,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-11001",
    "nome": "Creche SME Portuguesa · 11001",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Portuguesa",
    "endereco": "Portuguesa, Rio de Janeiro",
    "lat": -22.79554,
    "lon": -43.20989,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-11003",
    "nome": "Creche SME Pitangueiras · 11003",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Pitangueiras",
    "endereco": "Pitangueiras, Rio de Janeiro",
    "lat": -22.81567,
    "lon": -43.17681,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-11004",
    "nome": "Creche SME Jardim Carioca · 11004",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Jardim Carioca",
    "endereco": "Jardim Carioca, Rio de Janeiro",
    "lat": -22.80427,
    "lon": -43.19551,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-11006",
    "nome": "Creche SME Tauá · 11006",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Tauá",
    "endereco": "Tauá, Rio de Janeiro",
    "lat": -22.79948,
    "lon": -43.18549,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-11007",
    "nome": "Creche SME Bancários · 11007",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bancários",
    "endereco": "Bancários, Rio de Janeiro",
    "lat": -22.79792,
    "lon": -43.17526,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-11008",
    "nome": "Creche SME Bancários · 11008",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bancários",
    "endereco": "Bancários, Rio de Janeiro",
    "lat": -22.7881,
    "lon": -43.1831,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-11009",
    "nome": "Creche SME Freguesia (Ilha Do Governador) · 11009",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Freguesia (Ilha Do Governador)",
    "endereco": "Freguesia (Ilha Do Governador), Rio de Janeiro",
    "lat": -22.78936,
    "lon": -43.17063,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101601",
    "nome": "Creche SME Caju · 101601",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Caju",
    "endereco": "Caju, Rio de Janeiro",
    "lat": -22.879151,
    "lon": -43.224306,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101602",
    "nome": "Creche SME São Cristóvão · 101602",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.886423,
    "lon": -43.233212,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101603",
    "nome": "Creche SME Caju · 101603",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Caju",
    "endereco": "Caju, Rio de Janeiro",
    "lat": -22.882989,
    "lon": -43.228696,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101604",
    "nome": "Creche SME Caju · 101604",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Caju",
    "endereco": "Caju, Rio de Janeiro",
    "lat": -22.877834,
    "lon": -43.226418,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101605",
    "nome": "Creche SME Caju · 101605",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Caju",
    "endereco": "Caju, Rio de Janeiro",
    "lat": -22.876014,
    "lon": -43.222735,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101606",
    "nome": "Creche SME Caju · 101606",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Caju",
    "endereco": "Caju, Rio de Janeiro",
    "lat": -22.875318,
    "lon": -43.211624,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101607",
    "nome": "Creche SME Gamboa · 101607",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Gamboa",
    "endereco": "Gamboa, Rio de Janeiro",
    "lat": -22.898108,
    "lon": -43.197524,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-101801",
    "nome": "Creche SME Caju · 101801",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Caju",
    "endereco": "Caju, Rio de Janeiro",
    "lat": -22.884494,
    "lon": -43.23098,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 14,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101802",
    "nome": "Creche SME Santo Cristo · 101802",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Santo Cristo",
    "endereco": "Santo Cristo, Rio de Janeiro",
    "lat": -22.902003,
    "lon": -43.200648,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-101803",
    "nome": "Creche SME Gamboa · 101803",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Gamboa",
    "endereco": "Gamboa, Rio de Janeiro",
    "lat": -22.895647,
    "lon": -43.19424,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-102601",
    "nome": "Creche SME Estácio · 102601",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Estácio",
    "endereco": "Estácio, Rio de Janeiro",
    "lat": -22.918978,
    "lon": -43.202959,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 6,
        "inscritos": 14,
        "inscritosPrioritarios": 9,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-102602",
    "nome": "Creche SME Estácio · 102602",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Estácio",
    "endereco": "Estácio, Rio de Janeiro",
    "lat": -22.912295,
    "lon": -43.196778,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-102604",
    "nome": "Creche SME Centro · 102604",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Centro",
    "endereco": "Centro, Rio de Janeiro",
    "lat": -22.910794,
    "lon": -43.181706,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-102605",
    "nome": "Creche SME Centro · 102605",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Centro",
    "endereco": "Centro, Rio de Janeiro",
    "lat": -22.916844,
    "lon": -43.185946,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-102606",
    "nome": "Creche SME Centro · 102606",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Centro",
    "endereco": "Centro, Rio de Janeiro",
    "lat": -22.906898,
    "lon": -43.193638,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 17,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-102802",
    "nome": "Creche SME Centro · 102802",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Centro",
    "endereco": "Centro, Rio de Janeiro",
    "lat": -22.908079,
    "lon": -43.186536,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-102803",
    "nome": "Creche SME Centro · 102803",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Centro",
    "endereco": "Centro, Rio de Janeiro",
    "lat": -22.907017,
    "lon": -43.194719,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103601",
    "nome": "Creche SME Estácio · 103601",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Estácio",
    "endereco": "Estácio, Rio de Janeiro",
    "lat": -22.916117,
    "lon": -43.203354,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103602",
    "nome": "Creche SME Rio Comprido · 103602",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.931337,
    "lon": -43.201233,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103604",
    "nome": "Creche SME Rio Comprido · 103604",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.927155,
    "lon": -43.214382,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103605",
    "nome": "Creche SME Catumbi · 103605",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Catumbi",
    "endereco": "Catumbi, Rio de Janeiro",
    "lat": -22.918929,
    "lon": -43.19801,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103606",
    "nome": "Creche SME Rio Comprido · 103606",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.922461,
    "lon": -43.204005,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103607",
    "nome": "Creche SME Estácio · 103607",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Estácio",
    "endereco": "Estácio, Rio de Janeiro",
    "lat": -22.913974,
    "lon": -43.203886,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103801",
    "nome": "Creche SME Rio Comprido · 103801",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.927634,
    "lon": -43.213252,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103802",
    "nome": "Creche SME Santa Tereza · 103802",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Santa Tereza",
    "endereco": "Santa Tereza, Rio de Janeiro",
    "lat": -22.919001,
    "lon": -43.193367,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103804",
    "nome": "Creche SME Rio Comprido · 103804",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.926867,
    "lon": -43.200934,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103805",
    "nome": "Creche SME Estácio · 103805",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Estácio",
    "endereco": "Estácio, Rio de Janeiro",
    "lat": -22.919861,
    "lon": -43.205131,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103806",
    "nome": "Creche SME Estácio · 103806",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Estácio",
    "endereco": "Estácio, Rio de Janeiro",
    "lat": -22.919603,
    "lon": -43.203214,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-103807",
    "nome": "Creche SME Catumbi · 103807",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Catumbi",
    "endereco": "Catumbi, Rio de Janeiro",
    "lat": -22.921988,
    "lon": -43.196215,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107601",
    "nome": "Creche SME Mangueira · 107601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Mangueira",
    "endereco": "Mangueira, Rio de Janeiro",
    "lat": -22.906374,
    "lon": -43.232485,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107602",
    "nome": "Creche SME São Cristóvão · 107602",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.898459,
    "lon": -43.235698,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107604",
    "nome": "Creche SME Mangueira · 107604",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Mangueira",
    "endereco": "Mangueira, Rio de Janeiro",
    "lat": -22.903303,
    "lon": -43.236528,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 0,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-107605",
    "nome": "Creche SME Mangueira · 107605",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Mangueira",
    "endereco": "Mangueira, Rio de Janeiro",
    "lat": -22.902679,
    "lon": -43.235857,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107606",
    "nome": "Creche SME São Cristóvão · 107606",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.889746,
    "lon": -43.23006,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107607",
    "nome": "Creche SME Mangueira · 107607",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Mangueira",
    "endereco": "Mangueira, Rio de Janeiro",
    "lat": -22.905354,
    "lon": -43.239478,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107608",
    "nome": "Creche SME Benfica · 107608",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Benfica",
    "endereco": "Benfica, Rio de Janeiro",
    "lat": -22.884162,
    "lon": -43.248667,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-107609",
    "nome": "Creche SME São Cristóvão · 107609",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.886432,
    "lon": -43.227433,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107610",
    "nome": "Creche SME Benfica · 107610",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Benfica",
    "endereco": "Benfica, Rio de Janeiro",
    "lat": -22.889247,
    "lon": -43.24211,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107801",
    "nome": "Creche SME São Cristóvão · 107801",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.890748,
    "lon": -43.230827,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107803",
    "nome": "Creche SME São Cristóvão · 107803",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "São Cristóvão",
    "endereco": "São Cristóvão, Rio de Janeiro",
    "lat": -22.891507,
    "lon": -43.233074,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-121001",
    "nome": "Creche SME Paquetá · 121001",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Paquetá",
    "endereco": "Paquetá, Rio de Janeiro",
    "lat": -22.753151,
    "lon": -43.109534,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-123601",
    "nome": "Creche SME Santa Teresa · 123601",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Santa Teresa",
    "endereco": "Santa Teresa, Rio de Janeiro",
    "lat": -22.934912,
    "lon": -43.202502,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-123603",
    "nome": "Creche SME Santa Tereza · 123603",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Santa Tereza",
    "endereco": "Santa Tereza, Rio de Janeiro",
    "lat": -22.927235,
    "lon": -43.195756,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-204601",
    "nome": "Creche SME Cosme Velho · 204601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Cosme Velho",
    "endereco": "Cosme Velho, Rio de Janeiro",
    "lat": -22.941447,
    "lon": -43.205546,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-204602",
    "nome": "Creche SME Catete · 204602",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Catete",
    "endereco": "Catete, Rio de Janeiro",
    "lat": -22.928943,
    "lon": -43.179417,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 29,
        "vagasPrioritarias": 7,
        "inscritos": 39,
        "inscritosPrioritarios": 10,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 16,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-204804",
    "nome": "Creche SME Rio Comprido · 204804",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.93676,
    "lon": -43.1972,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-204805",
    "nome": "Creche SME Botafogo · 204805",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Botafogo",
    "endereco": "Botafogo, Rio de Janeiro",
    "lat": -22.954419,
    "lon": -43.188186,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-204806",
    "nome": "Creche SME Laranjeiras · 204806",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Laranjeiras",
    "endereco": "Laranjeiras, Rio de Janeiro",
    "lat": -22.931115,
    "lon": -43.190496,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-205601",
    "nome": "Creche SME Copacabana · 205601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.966176,
    "lon": -43.18712,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-205602",
    "nome": "Creche SME Copacabana · 205602",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.96286,
    "lon": -43.1939,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-205801",
    "nome": "Creche SME Leme · 205801",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Leme",
    "endereco": "Leme, Rio de Janeiro",
    "lat": -22.960596,
    "lon": -43.167882,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-206601",
    "nome": "Creche SME Vidigal · 206601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vidigal",
    "endereco": "Vidigal, Rio de Janeiro",
    "lat": -22.996197,
    "lon": -43.245549,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-206602",
    "nome": "Creche SME Vidigal · 206602",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vidigal",
    "endereco": "Vidigal, Rio de Janeiro",
    "lat": -22.993826,
    "lon": -43.235266,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-206603",
    "nome": "Creche SME Rocinha · 206603",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.994354,
    "lon": -43.270922,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-206605",
    "nome": "Creche SME Gávea · 206605",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gávea",
    "endereco": "Gávea, Rio de Janeiro",
    "lat": -22.981455,
    "lon": -43.240524,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-206606",
    "nome": "Creche SME Copacabana · 206606",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana",
    "endereco": "Copacabana, Rio de Janeiro",
    "lat": -22.981527,
    "lon": -43.196355,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208601",
    "nome": "Creche SME Tijuca · 208601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.936602,
    "lon": -43.248803,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-208603",
    "nome": "Creche SME Tijuca · 208603",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.928219,
    "lon": -43.225674,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208604",
    "nome": "Creche SME Tijuca · 208604",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.93817,
    "lon": -43.243002,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208605",
    "nome": "Creche SME Tijuca · 208605",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.943486,
    "lon": -43.24161,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208606",
    "nome": "Creche SME Tijuca · 208606",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.94015,
    "lon": -43.24459,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208607",
    "nome": "Creche SME Tijuca · 208607",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.926104,
    "lon": -43.220047,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208608",
    "nome": "Creche SME Rio Comprido · 208608",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rio Comprido",
    "endereco": "Rio Comprido, Rio de Janeiro",
    "lat": -22.922555,
    "lon": -43.215483,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 17,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208801",
    "nome": "Creche SME Alto Da Boa Vista · 208801",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Alto Da Boa Vista",
    "endereco": "Alto Da Boa Vista, Rio de Janeiro",
    "lat": -22.975728,
    "lon": -43.284476,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-208803",
    "nome": "Creche SME Tijuca · 208803",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.940985,
    "lon": -43.25352,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209601",
    "nome": "Creche SME Mangueira · 209601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Mangueira",
    "endereco": "Mangueira, Rio de Janeiro",
    "lat": -22.9068,
    "lon": -43.242383,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 5,
        "inscritos": 15,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209602",
    "nome": "Creche SME Tijuca · 209602",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Tijuca",
    "endereco": "Tijuca, Rio de Janeiro",
    "lat": -22.930966,
    "lon": -43.25058,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209603",
    "nome": "Creche SME Andaraí · 209603",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Andaraí",
    "endereco": "Andaraí, Rio de Janeiro",
    "lat": -22.933066,
    "lon": -43.260764,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209604",
    "nome": "Creche SME Grajaú · 209604",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Grajaú",
    "endereco": "Grajaú, Rio de Janeiro",
    "lat": -22.928893,
    "lon": -43.263875,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209605",
    "nome": "Creche SME Andaraí · 209605",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Andaraí",
    "endereco": "Andaraí, Rio de Janeiro",
    "lat": -22.936518,
    "lon": -43.261847,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-209606",
    "nome": "Creche SME Andaraí · 209606",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Andaraí",
    "endereco": "Andaraí, Rio de Janeiro",
    "lat": -22.932545,
    "lon": -43.257283,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209607",
    "nome": "Creche SME Vila Isabel · 209607",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vila Isabel",
    "endereco": "Vila Isabel, Rio de Janeiro",
    "lat": -22.913574,
    "lon": -43.252219,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209608",
    "nome": "Creche SME Vila Isabel · 209608",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vila Isabel",
    "endereco": "Vila Isabel, Rio de Janeiro",
    "lat": -22.913956,
    "lon": -43.255247,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-209609",
    "nome": "Creche SME Grajau · 209609",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Grajau",
    "endereco": "Grajau, Rio de Janeiro",
    "lat": -22.929088,
    "lon": -43.26211,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209610",
    "nome": "Creche SME Vila Isabel · 209610",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vila Isabel",
    "endereco": "Vila Isabel, Rio de Janeiro",
    "lat": -22.91189,
    "lon": -43.24757,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209803",
    "nome": "Creche SME Vila Isabel · 209803",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Vila Isabel",
    "endereco": "Vila Isabel, Rio de Janeiro",
    "lat": -22.914416,
    "lon": -43.259923,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209804",
    "nome": "Creche SME Grajaú · 209804",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Grajaú",
    "endereco": "Grajaú, Rio de Janeiro",
    "lat": -22.928467,
    "lon": -43.26525,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-227601",
    "nome": "Creche SME Rocinha · 227601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.987364,
    "lon": -43.246889,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-227602",
    "nome": "Creche SME Rocinha · 227602",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.985511,
    "lon": -43.246407,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-227801",
    "nome": "Creche SME Rocinha · 227801",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Rocinha",
    "endereco": "Rocinha, Rio de Janeiro",
    "lat": -22.988,
    "lon": -43.24644,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 13,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-312502",
    "nome": "Creche SME Del Castilho · 312502",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Del Castilho",
    "endereco": "Del Castilho, Rio de Janeiro",
    "lat": -22.879513,
    "lon": -43.274866,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312601",
    "nome": "Creche SME Inhaúma · 312601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.880691,
    "lon": -43.281352,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312602",
    "nome": "Creche SME Engenho Da Rainha · 312602",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Da Rainha",
    "endereco": "Engenho Da Rainha, Rio de Janeiro",
    "lat": -22.86946,
    "lon": -43.299954,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312603",
    "nome": "Creche SME Del Castilho · 312603",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Del Castilho",
    "endereco": "Del Castilho, Rio de Janeiro",
    "lat": -22.880363,
    "lon": -43.279044,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312801",
    "nome": "Creche SME Inhaúma · 312801",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.86323,
    "lon": -43.284779,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312802",
    "nome": "Creche SME Bonsucesso · 312802",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.866994,
    "lon": -43.269147,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312803",
    "nome": "Creche SME Inhaúma · 312803",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.865266,
    "lon": -43.275281,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312804",
    "nome": "Creche SME Cavalcanti · 312804",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cavalcanti",
    "endereco": "Cavalcanti, Rio de Janeiro",
    "lat": -22.87358,
    "lon": -43.308096,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312805",
    "nome": "Creche SME Inhaúma · 312805",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.860823,
    "lon": -43.28566,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312806",
    "nome": "Creche SME Inhaúma · 312806",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Inhaúma",
    "endereco": "Inhaúma, Rio de Janeiro",
    "lat": -22.864563,
    "lon": -43.275474,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-312809",
    "nome": "Creche SME Bonsucesso · 312809",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.863791,
    "lon": -43.270311,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312810",
    "nome": "Creche SME Tomás Coelho · 312810",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Tomás Coelho",
    "endereco": "Tomás Coelho, Rio de Janeiro",
    "lat": -22.862818,
    "lon": -43.306177,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-312812",
    "nome": "Creche SME Engenho Da Rainha · 312812",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Da Rainha",
    "endereco": "Engenho Da Rainha, Rio de Janeiro",
    "lat": -22.871295,
    "lon": -43.292118,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312813",
    "nome": "Creche SME Rocha · 312813",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Rocha",
    "endereco": "Rocha, Rio de Janeiro",
    "lat": -22.90075,
    "lon": -43.25066,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313601",
    "nome": "Creche SME Piedade · 313601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Piedade",
    "endereco": "Piedade, Rio de Janeiro",
    "lat": -22.876109,
    "lon": -43.305279,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313602",
    "nome": "Creche SME Lins De Vasconcelos · 313602",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Lins De Vasconcelos",
    "endereco": "Lins De Vasconcelos, Rio de Janeiro",
    "lat": -22.914311,
    "lon": -43.284815,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313603",
    "nome": "Creche SME Piedade · 313603",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Piedade",
    "endereco": "Piedade, Rio de Janeiro",
    "lat": -22.878497,
    "lon": -43.306157,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313604",
    "nome": "Creche SME Engenho Novo · 313604",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Engenho Novo",
    "endereco": "Engenho Novo, Rio de Janeiro",
    "lat": -22.916705,
    "lon": -43.263264,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313606",
    "nome": "Creche SME Sampaio · 313606",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Sampaio",
    "endereco": "Sampaio, Rio de Janeiro",
    "lat": -22.904185,
    "lon": -43.261677,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-313607",
    "nome": "Creche SME Lins De Vasconcelos · 313607",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Lins De Vasconcelos",
    "endereco": "Lins De Vasconcelos, Rio de Janeiro",
    "lat": -22.906141,
    "lon": -43.272911,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313608",
    "nome": "Creche SME Engenho De Dentro · 313608",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho De Dentro",
    "endereco": "Engenho De Dentro, Rio de Janeiro",
    "lat": -22.885294,
    "lon": -43.288125,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313609",
    "nome": "Creche SME Lins De Vasconcelos · 313609",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Lins De Vasconcelos",
    "endereco": "Lins De Vasconcelos, Rio de Janeiro",
    "lat": -22.919202,
    "lon": -43.284753,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313610",
    "nome": "Creche SME Lins De Vasconcelos · 313610",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Lins De Vasconcelos",
    "endereco": "Lins De Vasconcelos, Rio de Janeiro",
    "lat": -22.914251,
    "lon": -43.282108,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313611",
    "nome": "Creche SME Engenho Novo · 313611",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho Novo",
    "endereco": "Engenho Novo, Rio de Janeiro",
    "lat": -22.908008,
    "lon": -43.266694,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-313612",
    "nome": "Creche SME Sampaio · 313612",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Sampaio",
    "endereco": "Sampaio, Rio de Janeiro",
    "lat": -22.895698,
    "lon": -43.261933,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313801",
    "nome": "Creche SME Rocha · 313801",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Rocha",
    "endereco": "Rocha, Rio de Janeiro",
    "lat": -22.895035,
    "lon": -43.246193,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-313802",
    "nome": "Creche SME Pilares · 313802",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Pilares",
    "endereco": "Pilares, Rio de Janeiro",
    "lat": -22.873813,
    "lon": -43.298014,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 4,
        "inscritos": 14,
        "inscritosPrioritarios": 7,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313804",
    "nome": "Creche SME Cachambi · 313804",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Cachambi",
    "endereco": "Cachambi, Rio de Janeiro",
    "lat": -22.892515,
    "lon": -43.276286,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313805",
    "nome": "Creche SME Engenho De Dentro · 313805",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Engenho De Dentro",
    "endereco": "Engenho De Dentro, Rio de Janeiro",
    "lat": -22.900652,
    "lon": -43.295975,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313806",
    "nome": "Creche SME Piedade · 313806",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Piedade",
    "endereco": "Piedade, Rio de Janeiro",
    "lat": -22.882647,
    "lon": -43.306307,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-313809",
    "nome": "Creche SME Piedade · 313809",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Piedade",
    "endereco": "Piedade, Rio de Janeiro",
    "lat": -22.90646,
    "lon": -43.313662,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-328601",
    "nome": "Creche SME Jacaré · 328601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacaré",
    "endereco": "Jacaré, Rio de Janeiro",
    "lat": -22.885812,
    "lon": -43.254144,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-328602",
    "nome": "Creche SME Jacaré · 328602",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacaré",
    "endereco": "Jacaré, Rio de Janeiro",
    "lat": -22.89037,
    "lon": -43.259111,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-328604",
    "nome": "Creche SME Jacaré · 328604",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacaré",
    "endereco": "Jacaré, Rio de Janeiro",
    "lat": -22.888592,
    "lon": -43.263362,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-328801",
    "nome": "Creche SME Benfica · 328801",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Benfica",
    "endereco": "Benfica, Rio de Janeiro",
    "lat": -22.883767,
    "lon": -43.254063,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-329801",
    "nome": "Creche SME Ramos · 329801",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.860896,
    "lon": -43.267813,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 13,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-330601",
    "nome": "Creche SME Ramos · 330601",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.861757,
    "lon": -43.270948,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-330602",
    "nome": "Creche SME Bonsucesso · 330602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.865662,
    "lon": -43.270293,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 4,
        "inscritos": 18,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410601",
    "nome": "Creche SME Benfica · 410601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Benfica",
    "endereco": "Benfica, Rio de Janeiro",
    "lat": -22.880445,
    "lon": -43.25004,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410602",
    "nome": "Creche SME Ramos · 410602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.855554,
    "lon": -43.253675,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-410603",
    "nome": "Creche SME Benfica · 410603",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Benfica",
    "endereco": "Benfica, Rio de Janeiro",
    "lat": -22.88047,
    "lon": -43.24962,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410801",
    "nome": "Creche SME Benfica · 410801",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Benfica",
    "endereco": "Benfica, Rio de Janeiro",
    "lat": -22.884679,
    "lon": -43.248251,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 14,
        "vagasPrioritarias": 4,
        "inscritos": 28,
        "inscritosPrioritarios": 7,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-410802",
    "nome": "Creche SME Manguinhos · 410802",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Manguinhos",
    "endereco": "Manguinhos, Rio de Janeiro",
    "lat": -22.88338,
    "lon": -43.253337,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-410803",
    "nome": "Creche SME Manguinhos · 410803",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Manguinhos",
    "endereco": "Manguinhos, Rio de Janeiro",
    "lat": -22.875506,
    "lon": -43.25493,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410804",
    "nome": "Creche SME Olaria · 410804",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.85192,
    "lon": -43.273958,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410805",
    "nome": "Creche SME Olaria · 410805",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.849859,
    "lon": -43.265338,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410807",
    "nome": "Creche SME Olaria · 410807",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.85273,
    "lon": -43.277416,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410808",
    "nome": "Creche SME Penha · 410808",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.84681,
    "lon": -43.283699,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-410810",
    "nome": "Creche SME Olaria · 410810",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.839343,
    "lon": -43.267453,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-411601",
    "nome": "Creche SME Penha · 411601",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.843844,
    "lon": -43.287744,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-411602",
    "nome": "Creche SME Penha Circular · 411602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.840212,
    "lon": -43.288936,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-411603",
    "nome": "Creche SME Penha Circular · 411603",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.843652,
    "lon": -43.29655,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-411604",
    "nome": "Creche SME Penha · 411604",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.846304,
    "lon": -43.291751,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-411605",
    "nome": "Creche SME Penha · 411605",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.844111,
    "lon": -43.289449,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-411609",
    "nome": "Creche SME Penha · 411609",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.837612,
    "lon": -43.266566,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-411801",
    "nome": "Creche SME Vila Kosmos · 411801",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vila Kosmos",
    "endereco": "Vila Kosmos, Rio de Janeiro",
    "lat": -22.845849,
    "lon": -43.30474,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-411802",
    "nome": "Creche SME Penha Circular · 411802",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.846748,
    "lon": -43.297816,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-411803",
    "nome": "Creche SME Penha Circular · 411803",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.84136,
    "lon": -43.288855,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430601",
    "nome": "Creche SME Maré · 430601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.871385,
    "lon": -43.238471,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430602",
    "nome": "Creche SME Maré · 430602",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.869745,
    "lon": -43.236586,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430603",
    "nome": "Creche SME Maré · 430603",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.873426,
    "lon": -43.239545,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 3,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-430604",
    "nome": "Creche SME Bonsucesso · 430604",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.856316,
    "lon": -43.243106,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430605",
    "nome": "Creche SME Bonsucesso · 430605",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.854467,
    "lon": -43.242888,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-430607",
    "nome": "Creche SME Maré · 430607",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.859501,
    "lon": -43.24005,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430801",
    "nome": "Creche SME Maré · 430801",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.862239,
    "lon": -43.238621,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430802",
    "nome": "Creche SME Maré · 430802",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.865546,
    "lon": -43.243179,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430803",
    "nome": "Creche SME Maré · 430803",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.857891,
    "lon": -43.239989,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-430805",
    "nome": "Creche SME Bonsucesso · 430805",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.865663,
    "lon": -43.242858,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430806",
    "nome": "Creche SME Maré · 430806",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.854283,
    "lon": -43.241914,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430807",
    "nome": "Creche SME Maré · 430807",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.856902,
    "lon": -43.239377,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430809",
    "nome": "Creche SME Maré · 430809",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.87059,
    "lon": -43.234365,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430810",
    "nome": "Creche SME Maré · 430810",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.870255,
    "lon": -43.234242,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430811",
    "nome": "Creche SME Maré · 430811",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.869949,
    "lon": -43.234122,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430812",
    "nome": "Creche SME Maré · 430812",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.869632,
    "lon": -43.23396,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-430813",
    "nome": "Creche SME Ramos · 430813",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.841106,
    "lon": -43.250621,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430815",
    "nome": "Creche SME Maré · 430815",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Maré",
    "endereco": "Maré, Rio de Janeiro",
    "lat": -22.86549,
    "lon": -43.23884,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-431601",
    "nome": "Creche SME Cordovil · 431601",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.81681,
    "lon": -43.290269,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-431602",
    "nome": "Creche SME Jardim América · 431602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Jardim América",
    "endereco": "Jardim América, Rio de Janeiro",
    "lat": -22.802662,
    "lon": -43.31926,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-431603",
    "nome": "Creche SME Cordovil · 431603",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.818898,
    "lon": -43.292015,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-431604",
    "nome": "Creche SME Vigário Geral · 431604",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Vigário Geral",
    "endereco": "Vigário Geral, Rio de Janeiro",
    "lat": -22.807072,
    "lon": -43.304288,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431605",
    "nome": "Creche SME Jardim América · 431605",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Jardim América",
    "endereco": "Jardim América, Rio de Janeiro",
    "lat": -22.802921,
    "lon": -43.323902,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 0,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431606",
    "nome": "Creche SME Pavuna · 431606",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.804345,
    "lon": -43.331531,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-431607",
    "nome": "Creche SME Vigário Geral · 431607",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Vigário Geral",
    "endereco": "Vigário Geral, Rio de Janeiro",
    "lat": -22.801972,
    "lon": -43.304736,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431608",
    "nome": "Creche SME Parada De Lucas · 431608",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Parada De Lucas",
    "endereco": "Parada De Lucas, Rio de Janeiro",
    "lat": -22.812555,
    "lon": -43.296036,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431801",
    "nome": "Creche SME Cordovil · 431801",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.819887,
    "lon": -43.295081,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431802",
    "nome": "Creche SME Jardim América · 431802",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Jardim América",
    "endereco": "Jardim América, Rio de Janeiro",
    "lat": -22.807508,
    "lon": -43.321322,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431803",
    "nome": "Creche SME Cordovil · 431803",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cordovil",
    "endereco": "Cordovil, Rio de Janeiro",
    "lat": -22.825848,
    "lon": -43.309081,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-514009",
    "nome": "Creche SME Irajá · 514009",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.842919,
    "lon": -43.326192,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514501",
    "nome": "Creche SME Colégio · 514501",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Colégio",
    "endereco": "Colégio, Rio de Janeiro",
    "lat": -22.834911,
    "lon": -43.330928,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514601",
    "nome": "Creche SME Vila Kosmos · 514601",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vila Kosmos",
    "endereco": "Vila Kosmos, Rio de Janeiro",
    "lat": -22.849085,
    "lon": -43.303981,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-514602",
    "nome": "Creche SME Irajá · 514602",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.831074,
    "lon": -43.327411,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 16,
        "vagasPrioritarias": 7,
        "inscritos": 22,
        "inscritosPrioritarios": 10,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 4,
        "inscritos": 10,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514603",
    "nome": "Creche SME Irajá · 514603",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.821755,
    "lon": -43.321511,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514604",
    "nome": "Creche SME Irajá · 514604",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.824322,
    "lon": -43.326431,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514605",
    "nome": "Creche SME Rocha Miranda · 514605",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Rocha Miranda",
    "endereco": "Rocha Miranda, Rio de Janeiro",
    "lat": -22.85155,
    "lon": -43.336467,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514606",
    "nome": "Creche SME Vicente De Carvalho · 514606",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vicente De Carvalho",
    "endereco": "Vicente De Carvalho, Rio de Janeiro",
    "lat": -22.860794,
    "lon": -43.307537,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514607",
    "nome": "Creche SME Vicente De Carvalho · 514607",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vicente De Carvalho",
    "endereco": "Vicente De Carvalho, Rio de Janeiro",
    "lat": -22.860325,
    "lon": -43.318375,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514608",
    "nome": "Creche SME Cavalcanti · 514608",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cavalcanti",
    "endereco": "Cavalcanti, Rio de Janeiro",
    "lat": -22.867977,
    "lon": -43.309801,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514609",
    "nome": "Creche SME Irajá · 514609",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.849166,
    "lon": -43.324973,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-514801",
    "nome": "Creche SME Irajá · 514801",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.823514,
    "lon": -43.320473,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514802",
    "nome": "Creche SME Irajá · 514802",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Irajá",
    "endereco": "Irajá, Rio de Janeiro",
    "lat": -22.822981,
    "lon": -43.316319,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-514803",
    "nome": "Creche SME Colégio · 514803",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Colégio",
    "endereco": "Colégio, Rio de Janeiro",
    "lat": -22.843475,
    "lon": -43.331615,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515015",
    "nome": "Creche SME Oswaldo Cruz · 515015",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Oswaldo Cruz",
    "endereco": "Oswaldo Cruz, Rio de Janeiro",
    "lat": -22.879152,
    "lon": -43.351898,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515021",
    "nome": "Creche SME Oswaldo Cruz · 515021",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Oswaldo Cruz",
    "endereco": "Oswaldo Cruz, Rio de Janeiro",
    "lat": -22.872211,
    "lon": -43.350334,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515046",
    "nome": "Creche SME Cavalcanti · 515046",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cavalcanti",
    "endereco": "Cavalcanti, Rio de Janeiro",
    "lat": -22.877798,
    "lon": -43.314848,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515053",
    "nome": "Creche SME Cascadura · 515053",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cascadura",
    "endereco": "Cascadura, Rio de Janeiro",
    "lat": -22.883904,
    "lon": -43.322462,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515064",
    "nome": "Creche SME Madureira · 515064",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Madureira",
    "endereco": "Madureira, Rio de Janeiro",
    "lat": -22.864996,
    "lon": -43.329074,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515503",
    "nome": "Creche SME Engenheiro Leal · 515503",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Engenheiro Leal",
    "endereco": "Engenheiro Leal, Rio de Janeiro",
    "lat": -22.877129,
    "lon": -43.325708,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515601",
    "nome": "Creche SME Rocha Miranda · 515601",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Rocha Miranda",
    "endereco": "Rocha Miranda, Rio de Janeiro",
    "lat": -22.853399,
    "lon": -43.339342,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515602",
    "nome": "Creche SME Madureira · 515602",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Madureira",
    "endereco": "Madureira, Rio de Janeiro",
    "lat": -22.860679,
    "lon": -43.331741,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 3,
        "inscritos": 16,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515604",
    "nome": "Creche SME Cascadura · 515604",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cascadura",
    "endereco": "Cascadura, Rio de Janeiro",
    "lat": -22.88969,
    "lon": -43.332498,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515605",
    "nome": "Creche SME Rocha Miranda · 515605",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Rocha Miranda",
    "endereco": "Rocha Miranda, Rio de Janeiro",
    "lat": -22.855144,
    "lon": -43.341821,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515606",
    "nome": "Creche SME Campinho · 515606",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Campinho",
    "endereco": "Campinho, Rio de Janeiro",
    "lat": -22.885981,
    "lon": -43.339707,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515607",
    "nome": "Creche SME Marechal Hermes · 515607",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Marechal Hermes",
    "endereco": "Marechal Hermes, Rio de Janeiro",
    "lat": -22.869303,
    "lon": -43.374677,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515608",
    "nome": "Creche SME Vaz Lobo · 515608",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vaz Lobo",
    "endereco": "Vaz Lobo, Rio de Janeiro",
    "lat": -22.857199,
    "lon": -43.334689,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515610",
    "nome": "Creche SME Guadalupe · 515610",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Guadalupe",
    "endereco": "Guadalupe, Rio de Janeiro",
    "lat": -22.849063,
    "lon": -43.363966,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515611",
    "nome": "Creche SME Madureira · 515611",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Madureira",
    "endereco": "Madureira, Rio de Janeiro",
    "lat": -22.864671,
    "lon": -43.329916,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515612",
    "nome": "Creche SME Madureira · 515612",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Madureira",
    "endereco": "Madureira, Rio de Janeiro",
    "lat": -22.868144,
    "lon": -43.329101,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515613",
    "nome": "Creche SME Cavalcanti · 515613",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cavalcanti",
    "endereco": "Cavalcanti, Rio de Janeiro",
    "lat": -22.868759,
    "lon": -43.316545,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515801",
    "nome": "Creche SME Honório Gurgel · 515801",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Honório Gurgel",
    "endereco": "Honório Gurgel, Rio de Janeiro",
    "lat": -22.839458,
    "lon": -43.356108,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 16,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 14,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515802",
    "nome": "Creche SME Rocha Miranda · 515802",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Rocha Miranda",
    "endereco": "Rocha Miranda, Rio de Janeiro",
    "lat": -22.841024,
    "lon": -43.347547,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515803",
    "nome": "Creche SME Rocha Miranda · 515803",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Rocha Miranda",
    "endereco": "Rocha Miranda, Rio de Janeiro",
    "lat": -22.845923,
    "lon": -43.351168,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515804",
    "nome": "Creche SME Marechal Hermes · 515804",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Marechal Hermes",
    "endereco": "Marechal Hermes, Rio de Janeiro",
    "lat": -22.857065,
    "lon": -43.373658,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515805",
    "nome": "Creche SME Piedade · 515805",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Piedade",
    "endereco": "Piedade, Rio de Janeiro",
    "lat": -22.886506,
    "lon": -43.312269,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515807",
    "nome": "Creche SME Madureira · 515807",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Madureira",
    "endereco": "Madureira, Rio de Janeiro",
    "lat": -22.860399,
    "lon": -43.334597,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515808",
    "nome": "Creche SME Madureira · 515808",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Madureira",
    "endereco": "Madureira, Rio de Janeiro",
    "lat": -22.863852,
    "lon": -43.335166,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515809",
    "nome": "Creche SME Marechal Hermes · 515809",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Marechal Hermes",
    "endereco": "Marechal Hermes, Rio de Janeiro",
    "lat": -22.848431,
    "lon": -43.361544,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 15,
        "vagasPrioritarias": 3,
        "inscritos": 27,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515810",
    "nome": "Creche SME Cascadura · 515810",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cascadura",
    "endereco": "Cascadura, Rio de Janeiro",
    "lat": -22.888526,
    "lon": -43.330231,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 3,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-622202",
    "nome": "Creche SME Anchieta · 622202",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.835096,
    "lon": -43.415077,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 4,
        "inscritos": 16,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-622601",
    "nome": "Creche SME Anchieta · 622601",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.827194,
    "lon": -43.394719,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-622602",
    "nome": "Creche SME Anchieta · 622602",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.825833,
    "lon": -43.389133,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-622603",
    "nome": "Creche SME Anchieta · 622603",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.820067,
    "lon": -43.386506,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-622801",
    "nome": "Creche SME Guadalupe · 622801",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Guadalupe",
    "endereco": "Guadalupe, Rio de Janeiro",
    "lat": -22.84031,
    "lon": -43.380765,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 14,
        "vagasPrioritarias": 6,
        "inscritos": 22,
        "inscritosPrioritarios": 10,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-622802",
    "nome": "Creche SME Guadalupe · 622802",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Guadalupe",
    "endereco": "Guadalupe, Rio de Janeiro",
    "lat": -22.850418,
    "lon": -43.375531,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-622804",
    "nome": "Creche SME Ricardo De Albuquerque · 622804",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Ricardo De Albuquerque",
    "endereco": "Ricardo De Albuquerque, Rio de Janeiro",
    "lat": -22.834977,
    "lon": -43.393545,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-622805",
    "nome": "Creche SME Anchieta · 622805",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Anchieta",
    "endereco": "Anchieta, Rio de Janeiro",
    "lat": -22.822348,
    "lon": -43.41374,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-622810",
    "nome": "Creche SME Ricardo De Albuquerque · 622810",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Ricardo De Albuquerque",
    "endereco": "Ricardo De Albuquerque, Rio de Janeiro",
    "lat": -22.832775,
    "lon": -43.376768,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625601",
    "nome": "Creche SME Pavuna · 625601",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.812409,
    "lon": -43.344044,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625602",
    "nome": "Creche SME Pavuna · 625602",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.822051,
    "lon": -43.35957,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625603",
    "nome": "Creche SME Costa Barros · 625603",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.829398,
    "lon": -43.370787,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625604",
    "nome": "Creche SME Coelho Neto · 625604",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Coelho Neto",
    "endereco": "Coelho Neto, Rio de Janeiro",
    "lat": -22.83664,
    "lon": -43.348239,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 14,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625605",
    "nome": "Creche SME Pavuna · 625605",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.818729,
    "lon": -43.379834,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625606",
    "nome": "Creche SME Costa Barros · 625606",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.820707,
    "lon": -43.365549,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625607",
    "nome": "Creche SME Costa Barros · 625607",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.81981,
    "lon": -43.361921,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625608",
    "nome": "Creche SME Acari · 625608",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Acari",
    "endereco": "Acari, Rio de Janeiro",
    "lat": -22.826122,
    "lon": -43.338803,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625609",
    "nome": "Creche SME Pavuna · 625609",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.813466,
    "lon": -43.353119,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625610",
    "nome": "Creche SME Colégio · 625610",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Colégio",
    "endereco": "Colégio, Rio de Janeiro",
    "lat": -22.838585,
    "lon": -43.343128,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625611",
    "nome": "Creche SME Acari · 625611",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Acari",
    "endereco": "Acari, Rio de Janeiro",
    "lat": -22.824265,
    "lon": -43.345692,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625612",
    "nome": "Creche SME Acari · 625612",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Acari",
    "endereco": "Acari, Rio de Janeiro",
    "lat": -22.826136,
    "lon": -43.34295,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 17,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625614",
    "nome": "Creche SME Costa Barros · 625614",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.814685,
    "lon": -43.367493,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 16,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625615",
    "nome": "Creche SME Acari · 625615",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Acari",
    "endereco": "Acari, Rio de Janeiro",
    "lat": -22.823514,
    "lon": -43.339125,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625616",
    "nome": "Creche SME Coelho Neto · 625616",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Coelho Neto",
    "endereco": "Coelho Neto, Rio de Janeiro",
    "lat": -22.825477,
    "lon": -43.352297,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625801",
    "nome": "Creche SME Barros Filho · 625801",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Barros Filho",
    "endereco": "Barros Filho, Rio de Janeiro",
    "lat": -22.838141,
    "lon": -43.367654,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625802",
    "nome": "Creche SME Costa Barros · 625802",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.820877,
    "lon": -43.368983,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625803",
    "nome": "Creche SME Costa Barros · 625803",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.823882,
    "lon": -43.361693,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625804",
    "nome": "Creche SME Costa Barros · 625804",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.821307,
    "lon": -43.361933,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625807",
    "nome": "Creche SME Costa Barros · 625807",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.823909,
    "lon": -43.373274,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625813",
    "nome": "Creche SME Pavuna · 625813",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.812382,
    "lon": -43.364913,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625814",
    "nome": "Creche SME Barros Filho · 625814",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Barros Filho",
    "endereco": "Barros Filho, Rio de Janeiro",
    "lat": -22.83288,
    "lon": -43.367418,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625815",
    "nome": "Creche SME Costa Barros · 625815",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Costa Barros",
    "endereco": "Costa Barros, Rio de Janeiro",
    "lat": -22.823448,
    "lon": -43.353838,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625816",
    "nome": "Creche SME Pavuna · 625816",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.814742,
    "lon": -43.355257,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 3,
        "inscritos": 16,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625817",
    "nome": "Creche SME Pavuna · 625817",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.820559,
    "lon": -43.35212,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625818",
    "nome": "Creche SME Pavuna · 625818",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.816734,
    "lon": -43.372226,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-625819",
    "nome": "Creche SME Pavuna · 625819",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.81986,
    "lon": -43.377041,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625820",
    "nome": "Creche SME Pavuna · 625820",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Pavuna",
    "endereco": "Pavuna, Rio de Janeiro",
    "lat": -22.81084,
    "lon": -43.36713,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 14,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716601",
    "nome": "Creche SME Anil · 716601",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.974934,
    "lon": -43.331015,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 18,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 19,
        "vagasPrioritarias": 4,
        "inscritos": 29,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716602",
    "nome": "Creche SME Tanque · 716602",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Tanque",
    "endereco": "Tanque, Rio de Janeiro",
    "lat": -22.910162,
    "lon": -43.371421,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716603",
    "nome": "Creche SME Curicica · 716603",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.944254,
    "lon": -43.384456,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716604",
    "nome": "Creche SME Gardênia Azul · 716604",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardênia Azul",
    "endereco": "Gardênia Azul, Rio de Janeiro",
    "lat": -22.960454,
    "lon": -43.352685,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716605",
    "nome": "Creche SME Freguesia (Jacarepaguá) · 716605",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Freguesia (Jacarepaguá)",
    "endereco": "Freguesia (Jacarepaguá), Rio de Janeiro",
    "lat": -22.943136,
    "lon": -43.352063,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716606",
    "nome": "Creche SME Taquara · 716606",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Taquara",
    "endereco": "Taquara, Rio de Janeiro",
    "lat": -22.947959,
    "lon": -43.374412,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716607",
    "nome": "Creche SME Praça Seca · 716607",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praça Seca",
    "endereco": "Praça Seca, Rio de Janeiro",
    "lat": -22.907555,
    "lon": -43.353033,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716608",
    "nome": "Creche SME Tanque · 716608",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Tanque",
    "endereco": "Tanque, Rio de Janeiro",
    "lat": -22.900935,
    "lon": -43.362466,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716609",
    "nome": "Creche SME Anil · 716609",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.972272,
    "lon": -43.334928,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 15,
        "vagasPrioritarias": 4,
        "inscritos": 30,
        "inscritosPrioritarios": 8,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 4,
        "inscritos": 19,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 15,
        "vagasPrioritarias": 4,
        "inscritos": 21,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716610",
    "nome": "Creche SME Taquara · 716610",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Taquara",
    "endereco": "Taquara, Rio de Janeiro",
    "lat": -22.918418,
    "lon": -43.410069,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716611",
    "nome": "Creche SME Vila Valqueire · 716611",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Vila Valqueire",
    "endereco": "Vila Valqueire, Rio de Janeiro",
    "lat": -22.884513,
    "lon": -43.372318,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716612",
    "nome": "Creche SME Jacarepaguá · 716612",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Jacarepaguá",
    "endereco": "Jacarepaguá, Rio de Janeiro",
    "lat": -22.915653,
    "lon": -43.420588,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716613",
    "nome": "Creche SME Jacarepaguá · 716613",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepaguá",
    "endereco": "Jacarepaguá, Rio de Janeiro",
    "lat": -22.968566,
    "lon": -43.389478,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 2,
        "inscritos": 20,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 17,
        "vagasPrioritarias": 3,
        "inscritos": 25,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-716614",
    "nome": "Creche SME Curicica · 716614",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.955267,
    "lon": -43.390377,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716801",
    "nome": "Creche SME Jacarepaguá · 716801",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepaguá",
    "endereco": "Jacarepaguá, Rio de Janeiro",
    "lat": -22.941016,
    "lon": -43.391418,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716802",
    "nome": "Creche SME Jacarepaguá · 716802",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepaguá",
    "endereco": "Jacarepaguá, Rio de Janeiro",
    "lat": -22.93725,
    "lon": -43.390376,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716803",
    "nome": "Creche SME Anil · 716803",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.957616,
    "lon": -43.331432,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 4,
        "inscritos": 15,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716804",
    "nome": "Creche SME Curicica · 716804",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.945659,
    "lon": -43.378626,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716805",
    "nome": "Creche SME Anil · 716805",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.977493,
    "lon": -43.332264,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 3,
        "inscritos": 18,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716806",
    "nome": "Creche SME Taquara · 716806",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Taquara",
    "endereco": "Taquara, Rio de Janeiro",
    "lat": -22.912042,
    "lon": -43.419526,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716807",
    "nome": "Creche SME Curicica · 716807",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.954868,
    "lon": -43.392306,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 4,
        "inscritos": 19,
        "inscritosPrioritarios": 7,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-716808",
    "nome": "Creche SME Gardênia Azul · 716808",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardênia Azul",
    "endereco": "Gardênia Azul, Rio de Janeiro",
    "lat": -22.958906,
    "lon": -43.351378,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716809",
    "nome": "Creche SME Praça Seca · 716809",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praça Seca",
    "endereco": "Praça Seca, Rio de Janeiro",
    "lat": -22.904538,
    "lon": -43.34563,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716812",
    "nome": "Creche SME Anil · 716812",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.976261,
    "lon": -43.325334,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 3,
        "inscritos": 19,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-716813",
    "nome": "Creche SME Jacarepaguá · 716813",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Jacarepaguá",
    "endereco": "Jacarepaguá, Rio de Janeiro",
    "lat": -22.964857,
    "lon": -43.413066,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716814",
    "nome": "Creche SME Anil · 716814",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.974188,
    "lon": -43.331099,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716815",
    "nome": "Creche SME Praça Seca · 716815",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praça Seca",
    "endereco": "Praça Seca, Rio de Janeiro",
    "lat": -22.890918,
    "lon": -43.349861,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716816",
    "nome": "Creche SME Bento Ribeiro · 716816",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Bento Ribeiro",
    "endereco": "Bento Ribeiro, Rio de Janeiro",
    "lat": -22.879869,
    "lon": -43.367359,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 11,
        "inscritosPrioritarios": 6,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716818",
    "nome": "Creche SME Gardênia Azul · 716818",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardênia Azul",
    "endereco": "Gardênia Azul, Rio de Janeiro",
    "lat": -22.95761,
    "lon": -43.35047,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-716819",
    "nome": "Creche SME Anil · 716819",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.96226,
    "lon": -43.343769,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716820",
    "nome": "Creche SME Curicica · 716820",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.954432,
    "lon": -43.382779,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716821",
    "nome": "Creche SME Taquara · 716821",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Taquara",
    "endereco": "Taquara, Rio de Janeiro",
    "lat": -22.933395,
    "lon": -43.384692,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 3,
        "inscritos": 12,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716822",
    "nome": "Creche SME Anil · 716822",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Anil",
    "endereco": "Anil, Rio de Janeiro",
    "lat": -22.966022,
    "lon": -43.343186,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716824",
    "nome": "Creche SME Curicica · 716824",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.953416,
    "lon": -43.393608,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724601",
    "nome": "Creche SME Recreio Dos Bandeirantes · 724601",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio Dos Bandeirantes",
    "endereco": "Recreio Dos Bandeirantes, Rio de Janeiro",
    "lat": -23.027024,
    "lon": -43.485789,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724602",
    "nome": "Creche SME Itanhangá · 724602",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Itanhangá",
    "endereco": "Itanhangá, Rio de Janeiro",
    "lat": -22.989203,
    "lon": -43.297275,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-724603",
    "nome": "Creche SME Itanhangá · 724603",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Itanhangá",
    "endereco": "Itanhangá, Rio de Janeiro",
    "lat": -22.98716,
    "lon": -43.307461,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-724604",
    "nome": "Creche SME Itanhangá · 724604",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Itanhangá",
    "endereco": "Itanhangá, Rio de Janeiro",
    "lat": -22.989005,
    "lon": -43.297241,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724605",
    "nome": "Creche SME Camorim · 724605",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Camorim",
    "endereco": "Camorim, Rio de Janeiro",
    "lat": -22.991385,
    "lon": -43.432685,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724606",
    "nome": "Creche SME Camorim · 724606",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Camorim",
    "endereco": "Camorim, Rio de Janeiro",
    "lat": -22.991854,
    "lon": -43.432396,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-724801",
    "nome": "Creche SME Recreio Dos Bandeirantes · 724801",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio Dos Bandeirantes",
    "endereco": "Recreio Dos Bandeirantes, Rio de Janeiro",
    "lat": -23.023984,
    "lon": -43.489959,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-724802",
    "nome": "Creche SME Vargem Grande · 724802",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Grande",
    "endereco": "Vargem Grande, Rio de Janeiro",
    "lat": -22.975934,
    "lon": -43.484274,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724803",
    "nome": "Creche SME Recreio Dos Bandeirantes · 724803",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio Dos Bandeirantes",
    "endereco": "Recreio Dos Bandeirantes, Rio de Janeiro",
    "lat": -23.020023,
    "lon": -43.48266,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-724804",
    "nome": "Creche SME Itanhangá · 724804",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Itanhangá",
    "endereco": "Itanhangá, Rio de Janeiro",
    "lat": -22.988367,
    "lon": -43.322451,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 12,
        "vagasPrioritarias": 3,
        "inscritos": 18,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-724805",
    "nome": "Creche SME Barra Da Tijuca · 724805",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Barra Da Tijuca",
    "endereco": "Barra Da Tijuca, Rio de Janeiro",
    "lat": -23.002962,
    "lon": -43.375805,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724806",
    "nome": "Creche SME Recreio Dos Bandeirantes · 724806",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio Dos Bandeirantes",
    "endereco": "Recreio Dos Bandeirantes, Rio de Janeiro",
    "lat": -23.01423,
    "lon": -43.472804,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724807",
    "nome": "Creche SME Barra Da Tijuca · 724807",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Barra Da Tijuca",
    "endereco": "Barra Da Tijuca, Rio de Janeiro",
    "lat": -22.997104,
    "lon": -43.335633,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724808",
    "nome": "Creche SME Recreio Dos Bandeirantes · 724808",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio Dos Bandeirantes",
    "endereco": "Recreio Dos Bandeirantes, Rio de Janeiro",
    "lat": -23.024193,
    "lon": -43.478971,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724809",
    "nome": "Creche SME Vargem Pequena · 724809",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Pequena",
    "endereco": "Vargem Pequena, Rio de Janeiro",
    "lat": -22.979894,
    "lon": -43.462745,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-734601",
    "nome": "Creche SME Cidade De Deus · 734601",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.952939,
    "lon": -43.364891,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-734602",
    "nome": "Creche SME Cidade De Deus · 734602",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.950792,
    "lon": -43.355759,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-734603",
    "nome": "Creche SME Cidade De Deus · 734603",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.942892,
    "lon": -43.363848,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-734801",
    "nome": "Creche SME Cidade De Deus · 734801",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.949404,
    "lon": -43.370431,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-734802",
    "nome": "Creche SME Cidade De Deus · 734802",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.94965,
    "lon": -43.356636,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 4,
        "inscritos": 22,
        "inscritosPrioritarios": 8,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-734803",
    "nome": "Creche SME Cidade De Deus · 734803",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.947426,
    "lon": -43.365557,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-734804",
    "nome": "Creche SME Cidade De Deus · 734804",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.94897,
    "lon": -43.360433,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-734805",
    "nome": "Creche SME Cidade De Deus · 734805",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Cidade De Deus",
    "endereco": "Cidade De Deus, Rio de Janeiro",
    "lat": -22.95123,
    "lon": -43.361925,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817202",
    "nome": "Creche SME Bangu · 817202",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.894122,
    "lon": -43.472616,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817504",
    "nome": "Creche SME Senador Camará · 817504",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.881793,
    "lon": -43.487326,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817505",
    "nome": "Creche SME Bangu · 817505",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.883931,
    "lon": -43.479045,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817601",
    "nome": "Creche SME Senador Camará · 817601",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.874814,
    "lon": -43.503815,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 16,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817602",
    "nome": "Creche SME Bangu · 817602",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.860475,
    "lon": -43.494277,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817603",
    "nome": "Creche SME Bangu · 817603",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.849922,
    "lon": -43.460718,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 3,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817604",
    "nome": "Creche SME Bangu · 817604",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.843664,
    "lon": -43.467732,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817605",
    "nome": "Creche SME Bangu · 817605",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.878109,
    "lon": -43.480675,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817606",
    "nome": "Creche SME Realengo · 817606",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.863292,
    "lon": -43.445078,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817607",
    "nome": "Creche SME Bangu · 817607",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.849653,
    "lon": -43.487379,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 9,
        "vagasPrioritarias": 4,
        "inscritos": 17,
        "inscritosPrioritarios": 7,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 10,
        "vagasPrioritarias": 4,
        "inscritos": 15,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817608",
    "nome": "Creche SME Bangu · 817608",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.872318,
    "lon": -43.481571,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817609",
    "nome": "Creche SME Bangu · 817609",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.86933,
    "lon": -43.458291,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817610",
    "nome": "Creche SME Senador Camará · 817610",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.869579,
    "lon": -43.502876,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817611",
    "nome": "Creche SME Bangu · 817611",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.868855,
    "lon": -43.455452,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817612",
    "nome": "Creche SME Bangu · 817612",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.856744,
    "lon": -43.485291,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817613",
    "nome": "Creche SME Realengo · 817613",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.875707,
    "lon": -43.441092,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817614",
    "nome": "Creche SME Senador Camará · 817614",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.869391,
    "lon": -43.495536,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817615",
    "nome": "Creche SME Bangu · 817615",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.862988,
    "lon": -43.45751,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817616",
    "nome": "Creche SME Bangu · 817616",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.864759,
    "lon": -43.468277,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817617",
    "nome": "Creche SME Bangu · 817617",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.84761,
    "lon": -43.472659,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817618",
    "nome": "Creche SME Santíssimo · 817618",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Santíssimo",
    "endereco": "Santíssimo, Rio de Janeiro",
    "lat": -22.877426,
    "lon": -43.499731,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817619",
    "nome": "Creche SME Bangu · 817619",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.868027,
    "lon": -43.474576,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817801",
    "nome": "Creche SME Bangu · 817801",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.888872,
    "lon": -43.470733,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817802",
    "nome": "Creche SME Bangu · 817802",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.849625,
    "lon": -43.464005,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817803",
    "nome": "Creche SME Bangu · 817803",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.869048,
    "lon": -43.485836,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817804",
    "nome": "Creche SME Bangu · 817804",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.868071,
    "lon": -43.45675,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817805",
    "nome": "Creche SME Bangu · 817805",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.857179,
    "lon": -43.453549,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817806",
    "nome": "Creche SME Bangu · 817806",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.846973,
    "lon": -43.465672,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817807",
    "nome": "Creche SME Bangu · 817807",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.863767,
    "lon": -43.471723,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 12,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817808",
    "nome": "Creche SME Senador Camará · 817808",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.879882,
    "lon": -43.490044,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 4,
        "inscritos": 11,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817809",
    "nome": "Creche SME Bangu · 817809",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.875856,
    "lon": -43.468583,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817810",
    "nome": "Creche SME Padre Miguel · 817810",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.87125,
    "lon": -43.449299,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817814",
    "nome": "Creche SME Senador Camará · 817814",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camará",
    "endereco": "Senador Camará, Rio de Janeiro",
    "lat": -22.895049,
    "lon": -43.490355,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-817815",
    "nome": "Creche SME Bangu · 817815",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.869535,
    "lon": -43.478332,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-833505",
    "nome": "Creche SME Jardim Sulacap · 833505",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jardim Sulacap",
    "endereco": "Jardim Sulacap, Rio de Janeiro",
    "lat": -22.889417,
    "lon": -43.384375,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833601",
    "nome": "Creche SME Realengo · 833601",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.880628,
    "lon": -43.430644,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833602",
    "nome": "Creche SME Realengo · 833602",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.883527,
    "lon": -43.417187,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833603",
    "nome": "Creche SME Deodoro · 833603",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Deodoro",
    "endereco": "Deodoro, Rio de Janeiro",
    "lat": -22.853024,
    "lon": -43.396094,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 21,
        "vagasPrioritarias": 8,
        "inscritos": 28,
        "inscritosPrioritarios": 10,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833801",
    "nome": "Creche SME Realengo · 833801",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.88766,
    "lon": -43.410707,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-833802",
    "nome": "Creche SME Realengo · 833802",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.863934,
    "lon": -43.445244,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-833803",
    "nome": "Creche SME Marechal Hermes · 833803",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Marechal Hermes",
    "endereco": "Marechal Hermes, Rio de Janeiro",
    "lat": -22.859927,
    "lon": -43.390942,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833805",
    "nome": "Creche SME Deodoro · 833805",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Deodoro",
    "endereco": "Deodoro, Rio de Janeiro",
    "lat": -22.855758,
    "lon": -43.389857,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833806",
    "nome": "Creche SME Realengo · 833806",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.895022,
    "lon": -43.447946,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 4,
        "inscritos": 10,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-833807",
    "nome": "Creche SME Realengo · 833807",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.893768,
    "lon": -43.419503,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833808",
    "nome": "Creche SME Realengo · 833808",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.860859,
    "lon": -43.446539,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-833809",
    "nome": "Creche SME Realengo · 833809",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.859369,
    "lon": -43.44396,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-833810",
    "nome": "Creche SME Realengo · 833810",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.859013,
    "lon": -43.430526,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-833811",
    "nome": "Creche SME Magalhães Bastos · 833811",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Magalhães Bastos",
    "endereco": "Magalhães Bastos, Rio de Janeiro",
    "lat": -22.868937,
    "lon": -43.414361,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 5,
        "inscritos": 13,
        "inscritosPrioritarios": 7,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-918601",
    "nome": "Creche SME Inhoaíba · 918601",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.903147,
    "lon": -43.590627,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918602",
    "nome": "Creche SME Inhoaíba · 918602",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.919706,
    "lon": -43.601994,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918603",
    "nome": "Creche SME Paciência · 918603",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.918605,
    "lon": -43.621346,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918604",
    "nome": "Creche SME Campo Grande · 918604",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.914584,
    "lon": -43.58532,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918605",
    "nome": "Creche SME Inhoaíba · 918605",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.896822,
    "lon": -43.592565,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918606",
    "nome": "Creche SME Campo Grande · 918606",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.891834,
    "lon": -43.561631,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918607",
    "nome": "Creche SME Campo Grande · 918607",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.854592,
    "lon": -43.528906,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918608",
    "nome": "Creche SME Campo Grande · 918608",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.912352,
    "lon": -43.532948,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918609",
    "nome": "Creche SME Campo Grande · 918609",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.888013,
    "lon": -43.587225,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918610",
    "nome": "Creche SME Cosmos · 918610",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.903307,
    "lon": -43.618239,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918611",
    "nome": "Creche SME Campo Grande · 918611",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.88353,
    "lon": -43.604592,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918613",
    "nome": "Creche SME Santíssimo · 918613",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santíssimo",
    "endereco": "Santíssimo, Rio de Janeiro",
    "lat": -22.877835,
    "lon": -43.5237,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 0,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918614",
    "nome": "Creche SME Campo Grande · 918614",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.913544,
    "lon": -43.530911,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918615",
    "nome": "Creche SME Cosmos · 918615",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.907751,
    "lon": -43.603988,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918616",
    "nome": "Creche SME Campo Grande · 918616",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.877052,
    "lon": -43.58049,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 4,
        "inscritos": 10,
        "inscritosPrioritarios": 5,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918617",
    "nome": "Creche SME Inhoaíba · 918617",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.911154,
    "lon": -43.590203,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918618",
    "nome": "Creche SME Inhoaíba · 918618",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.914253,
    "lon": -43.606667,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918619",
    "nome": "Creche SME Senador Vasconcelos · 918619",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Senador Vasconcelos",
    "endereco": "Senador Vasconcelos, Rio de Janeiro",
    "lat": -22.899666,
    "lon": -43.534143,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 4,
        "inscritos": 17,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918620",
    "nome": "Creche SME Campo Grande · 918620",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.919907,
    "lon": -43.555444,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918621",
    "nome": "Creche SME Campo Grande · 918621",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.884107,
    "lon": -43.531443,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918801",
    "nome": "Creche SME Cosmos · 918801",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.917448,
    "lon": -43.618065,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918802",
    "nome": "Creche SME Campo Grande · 918802",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.881274,
    "lon": -43.613359,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918803",
    "nome": "Creche SME Campo Grande · 918803",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.912636,
    "lon": -43.578547,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918804",
    "nome": "Creche SME Campo Grande · 918804",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.879399,
    "lon": -43.614001,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918805",
    "nome": "Creche SME Inhoaíba · 918805",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.900123,
    "lon": -43.585876,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918806",
    "nome": "Creche SME Cosmos · 918806",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.909561,
    "lon": -43.618801,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918807",
    "nome": "Creche SME Campo Grande · 918807",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.893198,
    "lon": -43.567798,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918808",
    "nome": "Creche SME Campo Grande · 918808",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.929639,
    "lon": -43.566393,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918810",
    "nome": "Creche SME Campo Grande · 918810",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.889064,
    "lon": -43.579067,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918811",
    "nome": "Creche SME Inhoaíba · 918811",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.910324,
    "lon": -43.585815,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918812",
    "nome": "Creche SME Cosmos · 918812",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.90191,
    "lon": -43.600159,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918813",
    "nome": "Creche SME Campo Grande · 918813",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.847942,
    "lon": -43.527432,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918814",
    "nome": "Creche SME Campo Grande · 918814",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.922822,
    "lon": -43.54117,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918815",
    "nome": "Creche SME Campo Grande · 918815",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.869529,
    "lon": -43.552115,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918816",
    "nome": "Creche SME Campo Grande · 918816",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.894133,
    "lon": -43.557582,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918817",
    "nome": "Creche SME Campo Grande · 918817",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.873566,
    "lon": -43.573069,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918818",
    "nome": "Creche SME Campo Grande · 918818",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.884711,
    "lon": -43.621103,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918819",
    "nome": "Creche SME Campo Grande · 918819",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.91385,
    "lon": -43.552316,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918820",
    "nome": "Creche SME Campo Grande · 918820",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.916753,
    "lon": -43.580605,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918821",
    "nome": "Creche SME Campo Grande · 918821",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.859155,
    "lon": -43.536614,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918822",
    "nome": "Creche SME Campo Grande · 918822",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.916866,
    "lon": -43.559949,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918823",
    "nome": "Creche SME Campo Grande · 918823",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.882641,
    "lon": -43.538851,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918824",
    "nome": "Creche SME Campo Grande · 918824",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.933228,
    "lon": -43.560292,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918825",
    "nome": "Creche SME Campo Grande · 918825",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.875422,
    "lon": -43.536818,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918826",
    "nome": "Creche SME Cosmos · 918826",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.895337,
    "lon": -43.603717,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918827",
    "nome": "Creche SME Cosmos · 918827",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.894072,
    "lon": -43.611071,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918828",
    "nome": "Creche SME Campo Grande · 918828",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.893649,
    "lon": -43.588409,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918829",
    "nome": "Creche SME Inhoaíba · 918829",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.89705,
    "lon": -43.5925,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918830",
    "nome": "Creche SME Campo Grande · 918830",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.904029,
    "lon": -43.554265,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918831",
    "nome": "Creche SME Inhoaíba · 918831",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.903285,
    "lon": -43.591003,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918832",
    "nome": "Creche SME Cosmos · 918832",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.922708,
    "lon": -43.620744,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 13,
        "vagasPrioritarias": 4,
        "inscritos": 27,
        "inscritosPrioritarios": 8,
        "demanda": "alta"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918833",
    "nome": "Creche SME Cosmos · 918833",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.906845,
    "lon": -43.618746,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918834",
    "nome": "Creche SME Campo Grande · 918834",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.887011,
    "lon": -43.597355,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918835",
    "nome": "Creche SME Inhoaíba · 918835",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaíba",
    "endereco": "Inhoaíba, Rio de Janeiro",
    "lat": -22.90624,
    "lon": -43.588702,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918836",
    "nome": "Creche SME Santíssimo · 918836",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santíssimo",
    "endereco": "Santíssimo, Rio de Janeiro",
    "lat": -22.875386,
    "lon": -43.533794,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918837",
    "nome": "Creche SME Santíssimo · 918837",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santíssimo",
    "endereco": "Santíssimo, Rio de Janeiro",
    "lat": -22.870428,
    "lon": -43.51129,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 11,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918838",
    "nome": "Creche SME Senador Vasconcelos · 918838",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Senador Vasconcelos",
    "endereco": "Senador Vasconcelos, Rio de Janeiro",
    "lat": -22.894484,
    "lon": -43.552539,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-918839",
    "nome": "Creche SME Campo Grande · 918839",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.89154,
    "lon": -43.57146,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019601",
    "nome": "Creche SME Santa Cruz · 1019601",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.903021,
    "lon": -43.705841,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019602",
    "nome": "Creche SME Santa Cruz · 1019602",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92138,
    "lon": -43.662102,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 3,
        "inscritos": 14,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019603",
    "nome": "Creche SME Paciência · 1019603",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.924192,
    "lon": -43.628443,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019604",
    "nome": "Creche SME Santa Cruz · 1019604",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.902828,
    "lon": -43.705531,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019605",
    "nome": "Creche SME Santa Cruz · 1019605",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.932954,
    "lon": -43.658363,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019606",
    "nome": "Creche SME Paciência · 1019606",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.917668,
    "lon": -43.637215,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019607",
    "nome": "Creche SME Paciência · 1019607",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.927505,
    "lon": -43.634912,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 13,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019609",
    "nome": "Creche SME Santa Cruz · 1019609",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.888959,
    "lon": -43.715865,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019610",
    "nome": "Creche SME Sepetiba · 1019610",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.979983,
    "lon": -43.681585,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019611",
    "nome": "Creche SME Santa Cruz · 1019611",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.918625,
    "lon": -43.672089,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019612",
    "nome": "Creche SME Paciência · 1019612",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.924633,
    "lon": -43.644761,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 10,
        "vagasPrioritarias": 2,
        "inscritos": 19,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019613",
    "nome": "Creche SME Paciência · 1019613",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.926768,
    "lon": -43.641091,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019614",
    "nome": "Creche SME Paciência · 1019614",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.874263,
    "lon": -43.631461,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 15,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019615",
    "nome": "Creche SME Santa Cruz · 1019615",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.929635,
    "lon": -43.662555,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019616",
    "nome": "Creche SME Santa Cruz · 1019616",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.93332,
    "lon": -43.650062,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019618",
    "nome": "Creche SME Santa Cruz · 1019618",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.904981,
    "lon": -43.701708,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019619",
    "nome": "Creche SME Santa Cruz · 1019619",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.900768,
    "lon": -43.723326,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019620",
    "nome": "Creche SME Santa Cruz · 1019620",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.920081,
    "lon": -43.672904,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019621",
    "nome": "Creche SME Sepetiba · 1019621",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.974872,
    "lon": -43.693244,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019623",
    "nome": "Creche SME Paciência · 1019623",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.921142,
    "lon": -43.630065,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019624",
    "nome": "Creche SME Santa Cruz · 1019624",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.903753,
    "lon": -43.714566,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019625",
    "nome": "Creche SME Sepetiba · 1019625",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.961619,
    "lon": -43.689819,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019626",
    "nome": "Creche SME Sepetiba · 1019626",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.958718,
    "lon": -43.68282,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019627",
    "nome": "Creche SME Sepetiba · 1019627",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.956258,
    "lon": -43.691301,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019628",
    "nome": "Creche SME Santa Cruz · 1019628",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.926998,
    "lon": -43.673065,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019630",
    "nome": "Creche SME Santa Cruz · 1019630",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.911519,
    "lon": -43.667708,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019631",
    "nome": "Creche SME Santa Cruz · 1019631",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.911349,
    "lon": -43.654573,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019632",
    "nome": "Creche SME Paciência · 1019632",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.888021,
    "lon": -43.635612,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 11,
        "vagasPrioritarias": 4,
        "inscritos": 15,
        "inscritosPrioritarios": 6,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019801",
    "nome": "Creche SME Paciência · 1019801",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.913409,
    "lon": -43.656075,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019802",
    "nome": "Creche SME Paciência · 1019802",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.921659,
    "lon": -43.645341,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019803",
    "nome": "Creche SME Santa Cruz · 1019803",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.907539,
    "lon": -43.701722,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019804",
    "nome": "Creche SME Sepetiba · 1019804",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.97679,
    "lon": -43.694065,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019806",
    "nome": "Creche SME Santa Cruz · 1019806",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.886309,
    "lon": -43.66621,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019807",
    "nome": "Creche SME Santa Cruz · 1019807",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.883481,
    "lon": -43.661004,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019808",
    "nome": "Creche SME Paciência · 1019808",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.894294,
    "lon": -43.6386,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019809",
    "nome": "Creche SME Santa Cruz · 1019809",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.940353,
    "lon": -43.68028,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019810",
    "nome": "Creche SME Santa Cruz · 1019810",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.914425,
    "lon": -43.671305,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019811",
    "nome": "Creche SME Paciência · 1019811",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.87566,
    "lon": -43.634503,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019815",
    "nome": "Creche SME Paciência · 1019815",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.916108,
    "lon": -43.651918,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019818",
    "nome": "Creche SME Paciência · 1019818",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciência",
    "endereco": "Paciência, Rio de Janeiro",
    "lat": -22.919608,
    "lon": -43.624282,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019820",
    "nome": "Creche SME Sepetiba · 1019820",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.962886,
    "lon": -43.70679,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019821",
    "nome": "Creche SME Santa Cruz · 1019821",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.903523,
    "lon": -43.707845,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019822",
    "nome": "Creche SME Sepetiba · 1019822",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.956389,
    "lon": -43.687368,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019824",
    "nome": "Creche SME Sepetiba · 1019824",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.956647,
    "lon": -43.68821,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019826",
    "nome": "Creche SME Sepetiba · 1019826",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.976463,
    "lon": -43.694707,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019827",
    "nome": "Creche SME Santa Cruz · 1019827",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.933612,
    "lon": -43.65972,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019828",
    "nome": "Creche SME Santa Cruz · 1019828",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.934045,
    "lon": -43.659561,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019829",
    "nome": "Creche SME Santa Cruz · 1019829",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92303,
    "lon": -43.673296,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019830",
    "nome": "Creche SME Santa Cruz · 1019830",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.92303,
    "lon": -43.673296,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019831",
    "nome": "Creche SME Santa Cruz · 1019831",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.882892,
    "lon": -43.660717,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 13,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1026601",
    "nome": "Creche SME Guaratiba · 1026601",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.972751,
    "lon": -43.590149,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1026602",
    "nome": "Creche SME Guaratiba · 1026602",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.999508,
    "lon": -43.612145,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 7,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1026603",
    "nome": "Creche SME Pedra De Guaratiba · 1026603",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Pedra De Guaratiba",
    "endereco": "Pedra De Guaratiba, Rio de Janeiro",
    "lat": -23.00073,
    "lon": -43.637411,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1026604",
    "nome": "Creche SME Guaratiba · 1026604",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.954726,
    "lon": -43.582599,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 7,
        "vagasPrioritarias": 2,
        "inscritos": 14,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Parcial",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 5,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1026801",
    "nome": "Creche SME Guaratiba · 1026801",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.984621,
    "lon": -43.659773,
    "ofertas": [
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1026802",
    "nome": "Creche SME Guaratiba · 1026802",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.981152,
    "lon": -43.644506,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1026803",
    "nome": "Creche SME Guaratiba · 1026803",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.963643,
    "lon": -43.610407,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1026805",
    "nome": "Creche SME Guaratiba · 1026805",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.942744,
    "lon": -43.582757,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 9,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1026806",
    "nome": "Creche SME Guaratiba · 1026806",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.983841,
    "lon": -43.645917,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 3,
        "inscritos": 9,
        "inscritosPrioritarios": 5,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1026807",
    "nome": "Creche SME Guaratiba · 1026807",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.958121,
    "lon": -43.608041,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 7,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-1026809",
    "nome": "Creche SME Guaratiba · 1026809",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.964108,
    "lon": -43.610268,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 4,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1026810",
    "nome": "Creche SME Guaratiba · 1026810",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.974412,
    "lon": -43.648574,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 6,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 10,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      }
    ]
  },
  {
    "id": "SME-1120201",
    "nome": "Creche SME Cacuia · 1120201",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Cacuia",
    "endereco": "Cacuia, Rio de Janeiro",
    "lat": -22.814275,
    "lon": -43.182585,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1120601",
    "nome": "Creche SME Galeão · 1120601",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Galeão",
    "endereco": "Galeão, Rio de Janeiro",
    "lat": -22.80497,
    "lon": -43.239865,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 9,
        "vagasPrioritarias": 2,
        "inscritos": 12,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1120602",
    "nome": "Creche SME Tauá · 1120602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Tauá",
    "endereco": "Tauá, Rio de Janeiro",
    "lat": -22.796641,
    "lon": -43.190965,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 1,
        "inscritos": 8,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1120603",
    "nome": "Creche SME Portuguesa · 1120603",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Portuguesa",
    "endereco": "Portuguesa, Rio de Janeiro",
    "lat": -22.795669,
    "lon": -43.209615,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 11,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 8,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1120604",
    "nome": "Creche SME Bancários · 1120604",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bancários",
    "endereco": "Bancários, Rio de Janeiro",
    "lat": -22.786565,
    "lon": -43.186716,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1120605",
    "nome": "Creche SME Galeão · 1120605",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Galeão",
    "endereco": "Galeão, Rio de Janeiro",
    "lat": -22.814814,
    "lon": -43.225622,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 5,
        "vagasPrioritarias": 2,
        "inscritos": 9,
        "inscritosPrioritarios": 3,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1120606",
    "nome": "Creche SME Tauá · 1120606",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Tauá",
    "endereco": "Tauá, Rio de Janeiro",
    "lat": -22.796875,
    "lon": -43.1796,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 8,
        "vagasPrioritarias": 2,
        "inscritos": 16,
        "inscritosPrioritarios": 2,
        "demanda": "alta"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 6,
        "inscritosPrioritarios": 4,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1120801",
    "nome": "Creche SME Jardim Carioca · 1120801",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Jardim Carioca",
    "endereco": "Jardim Carioca, Rio de Janeiro",
    "lat": -22.805503,
    "lon": -43.1932,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1120802",
    "nome": "Creche SME Bancários · 1120802",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bancários",
    "endereco": "Bancários, Rio de Janeiro",
    "lat": -22.788537,
    "lon": -43.185002,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1120804",
    "nome": "Creche SME Freguesia (Ilha Do Governador) · 1120804",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Freguesia (Ilha Do Governador)",
    "endereco": "Freguesia (Ilha Do Governador), Rio de Janeiro",
    "lat": -22.787578,
    "lon": -43.175142,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      },
      {
        "grupamento": "Maternal I",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  }
];
