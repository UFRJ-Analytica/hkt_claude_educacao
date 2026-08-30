// GERADO por integracao-sme/build_unidades.py — NÃO editar à mão.
// Fonte: rio-sme.sme_creche.inscricoes_completa
// Query: SELECT * FROM `rio-sme.sme_creche.inscricoes_completa` LIMIT 1000
// Gerado em: 2026-08-30T17:22:49+00:00
// Unidades: 352 · inscrições agregadas: 999
// Proveniência por campo em integracao-sme/out/PROVENANCE_unidades.md
//   REAL: id, lat/lon, bairro, grupamento, horário, inscritos, inscritosPrioritarios
//   DERIVADO: cre, vagas, vagasPrioritarias, demanda
//   SINTÉTICO: o extrato inteiro (_synthetic=true); nome/tipo são rótulos
import type { Unidade } from '../api/types';

export const META = {
  "generated_at": "2026-08-30T17:22:49+00:00",
  "source_id": "rio-sme.sme_creche.inscricoes_completa",
  "query": "SELECT * FROM `rio-sme.sme_creche.inscricoes_completa` LIMIT 1000",
  "rows_read": 999,
  "unidades": 352,
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
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "inscritosPrioritarios": 2,
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
        "inscritos": 2,
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
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
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
    "nome": "Creche SME Praca Onze · 102803",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Praca Onze",
    "endereco": "Praca Onze, Rio de Janeiro",
    "lat": -22.907017,
    "lon": -43.194719,
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
      }
    ]
  },
  {
    "id": "SME-103607",
    "nome": "Creche SME Estacio · 103607",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Estacio",
    "endereco": "Estacio, Rio de Janeiro",
    "lat": -22.913974,
    "lon": -43.203886,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107601",
    "nome": "Creche SME Sao Cristovao · 107601",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Sao Cristovao",
    "endereco": "Sao Cristovao, Rio de Janeiro",
    "lat": -22.906374,
    "lon": -43.232485,
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
    "id": "SME-107602",
    "nome": "Creche SME Sao Cristovao - Tuiuti · 107602",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Sao Cristovao - Tuiuti",
    "endereco": "Sao Cristovao - Tuiuti, Rio de Janeiro",
    "lat": -22.898459,
    "lon": -43.235698,
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
    "id": "SME-107603",
    "nome": "Creche SME Mangueira · 107603",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Mangueira",
    "endereco": "Mangueira, Rio de Janeiro",
    "lat": -22.902712,
    "lon": -43.240861,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-107605",
    "nome": "Creche SME Mangueira - Morro Dos Telegrafos · 107605",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Mangueira - Morro Dos Telegrafos",
    "endereco": "Mangueira - Morro Dos Telegrafos, Rio de Janeiro",
    "lat": -22.902679,
    "lon": -43.235857,
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
    "id": "SME-107606",
    "nome": "Creche SME Vasco Da Gama · 107606",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Vasco Da Gama",
    "endereco": "Vasco Da Gama, Rio de Janeiro",
    "lat": -22.889746,
    "lon": -43.23006,
    "ofertas": [
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
    "id": "SME-107609",
    "nome": "Creche SME Sao Cristovao · 107609",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Sao Cristovao",
    "endereco": "Sao Cristovao, Rio de Janeiro",
    "lat": -22.886432,
    "lon": -43.227433,
    "ofertas": [
      {
        "grupamento": "Berçário",
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
    "id": "SME-107802",
    "nome": "Creche SME Sao Cristovao · 107802",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Sao Cristovao",
    "endereco": "Sao Cristovao, Rio de Janeiro",
    "lat": -22.900287,
    "lon": -43.236696,
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
    "id": "SME-121001",
    "nome": "Creche SME Paqueta · 121001",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Paqueta",
    "endereco": "Paqueta, Rio de Janeiro",
    "lat": -22.753151,
    "lon": -43.109534,
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
      }
    ]
  },
  {
    "id": "SME-204803",
    "nome": "Creche SME Praia Vermelha · 204803",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Praia Vermelha",
    "endereco": "Praia Vermelha, Rio de Janeiro",
    "lat": -22.95425,
    "lon": -43.1645,
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
    "id": "SME-205602",
    "nome": "Creche SME Copacabana - Morro Dos Cabritos · 205602",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Copacabana - Morro Dos Cabritos",
    "endereco": "Copacabana - Morro Dos Cabritos, Rio de Janeiro",
    "lat": -22.96286,
    "lon": -43.1939,
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
    "id": "SME-206603",
    "nome": "Creche SME Sao Conrado · 206603",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Sao Conrado",
    "endereco": "Sao Conrado, Rio de Janeiro",
    "lat": -22.994354,
    "lon": -43.270922,
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
    "id": "SME-206605",
    "nome": "Creche SME Gavea · 206605",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Gavea",
    "endereco": "Gavea, Rio de Janeiro",
    "lat": -22.981455,
    "lon": -43.240524,
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
    "id": "SME-206606",
    "nome": "Creche SME Ipanema · 206606",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Ipanema",
    "endereco": "Ipanema, Rio de Janeiro",
    "lat": -22.981527,
    "lon": -43.196355,
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
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-209605",
    "nome": "Creche SME Andarai · 209605",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Andarai",
    "endereco": "Andarai, Rio de Janeiro",
    "lat": -22.936518,
    "lon": -43.261847,
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
    "id": "SME-209606",
    "nome": "Creche SME Andarai - Morro Do Andarai · 209606",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Andarai - Morro Do Andarai",
    "endereco": "Andarai - Morro Do Andarai, Rio de Janeiro",
    "lat": -22.932545,
    "lon": -43.257283,
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
    "id": "SME-209801",
    "nome": "Creche SME Maracana · 209801",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Maracana",
    "endereco": "Maracana, Rio de Janeiro",
    "lat": -22.910609,
    "lon": -43.219745,
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
    "id": "SME-209802",
    "nome": "Creche SME Andarai · 209802",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Andarai",
    "endereco": "Andarai, Rio de Janeiro",
    "lat": -22.929606,
    "lon": -43.25082,
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
      }
    ]
  },
  {
    "id": "SME-209804",
    "nome": "Creche SME Grajau · 209804",
    "tipo": "Creche Municipal",
    "cre": 2,
    "bairro": "Grajau",
    "endereco": "Grajau, Rio de Janeiro",
    "lat": -22.928467,
    "lon": -43.26525,
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
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312010",
    "nome": "Creche SME Higienopolis · 312010",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Higienopolis",
    "endereco": "Higienopolis, Rio de Janeiro",
    "lat": -22.88046,
    "lon": -43.258306,
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
    "id": "SME-312601",
    "nome": "Creche SME Inhauma · 312601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Inhauma",
    "endereco": "Inhauma, Rio de Janeiro",
    "lat": -22.880691,
    "lon": -43.281352,
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
        "inscritos": 3,
        "inscritosPrioritarios": 1,
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
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
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
      }
    ]
  },
  {
    "id": "SME-312803",
    "nome": "Creche SME Inhauma · 312803",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Inhauma",
    "endereco": "Inhauma, Rio de Janeiro",
    "lat": -22.865266,
    "lon": -43.275281,
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
    "id": "SME-312804",
    "nome": "Creche SME Tomas Coelho · 312804",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Tomas Coelho",
    "endereco": "Tomas Coelho, Rio de Janeiro",
    "lat": -22.87358,
    "lon": -43.308096,
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
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312805",
    "nome": "Creche SME Bonsucesso - Complexo Do Alemao · 312805",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso - Complexo Do Alemao",
    "endereco": "Bonsucesso - Complexo Do Alemao, Rio de Janeiro",
    "lat": -22.860823,
    "lon": -43.28566,
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
    "id": "SME-312810",
    "nome": "Creche SME Tomas Coelho · 312810",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Tomas Coelho",
    "endereco": "Tomas Coelho, Rio de Janeiro",
    "lat": -22.862818,
    "lon": -43.306177,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-312811",
    "nome": "Creche SME Jacare · 312811",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacare",
    "endereco": "Jacare, Rio de Janeiro",
    "lat": -22.884593,
    "lon": -43.250968,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      },
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 3,
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
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
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
      }
    ]
  },
  {
    "id": "SME-313801",
    "nome": "Creche SME Triagem · 313801",
    "tipo": "Creche Municipal",
    "cre": 1,
    "bairro": "Triagem",
    "endereco": "Triagem, Rio de Janeiro",
    "lat": -22.895035,
    "lon": -43.246193,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
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
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
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
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
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
    "id": "SME-328601",
    "nome": "Creche SME Jacarezinho · 328601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacarezinho",
    "endereco": "Jacarezinho, Rio de Janeiro",
    "lat": -22.885812,
    "lon": -43.254144,
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
    "id": "SME-328602",
    "nome": "Creche SME Jacarezinho · 328602",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacarezinho",
    "endereco": "Jacarezinho, Rio de Janeiro",
    "lat": -22.89037,
    "lon": -43.259111,
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
    "id": "SME-328604",
    "nome": "Creche SME Jacarezinho · 328604",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacarezinho",
    "endereco": "Jacarezinho, Rio de Janeiro",
    "lat": -22.888592,
    "lon": -43.263362,
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
        "grupamento": "Berçário",
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
    "id": "SME-328801",
    "nome": "Creche SME Jacarezinho · 328801",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Jacarezinho",
    "endereco": "Jacarezinho, Rio de Janeiro",
    "lat": -22.883767,
    "lon": -43.254063,
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
    "id": "SME-330601",
    "nome": "Creche SME Complexo Do Alemao - Ramos · 330601",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Complexo Do Alemao - Ramos",
    "endereco": "Complexo Do Alemao - Ramos, Rio de Janeiro",
    "lat": -22.861757,
    "lon": -43.270948,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
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
    "id": "SME-410601",
    "nome": "Creche SME Manguinhos · 410601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Manguinhos",
    "endereco": "Manguinhos, Rio de Janeiro",
    "lat": -22.880445,
    "lon": -43.25004,
    "ofertas": [
      {
        "grupamento": "Berçário",
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
    "id": "SME-410602",
    "nome": "Creche SME Bonsucesso · 410602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.855554,
    "lon": -43.253675,
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
    "id": "SME-410801",
    "nome": "Creche SME Manguinhos · 410801",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Manguinhos",
    "endereco": "Manguinhos, Rio de Janeiro",
    "lat": -22.884679,
    "lon": -43.248251,
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
    "id": "SME-410806",
    "nome": "Creche SME Ramos · 410806",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ramos",
    "endereco": "Ramos, Rio de Janeiro",
    "lat": -22.849984,
    "lon": -43.256373,
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
        "inscritos": 1,
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
    "id": "SME-410808",
    "nome": "Creche SME Olaria · 410808",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.84681,
    "lon": -43.283699,
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
    "id": "SME-410812",
    "nome": "Creche SME Olaria · 410812",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Olaria",
    "endereco": "Olaria, Rio de Janeiro",
    "lat": -22.849388,
    "lon": -43.272627,
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
    "id": "SME-411602",
    "nome": "Creche SME Penha · 411602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha",
    "endereco": "Penha, Rio de Janeiro",
    "lat": -22.840212,
    "lon": -43.288936,
    "ofertas": [
      {
        "grupamento": "Berçário",
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
    "id": "SME-411603",
    "nome": "Creche SME Praca Do Carmo/Penha · 411603",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Praca Do Carmo/Penha",
    "endereco": "Praca Do Carmo/Penha, Rio de Janeiro",
    "lat": -22.843652,
    "lon": -43.29655,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
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
    "id": "SME-411801",
    "nome": "Creche SME Penha Circular · 411801",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.845849,
    "lon": -43.30474,
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
    "id": "SME-411808",
    "nome": "Creche SME Penha Circular · 411808",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Penha Circular",
    "endereco": "Penha Circular, Rio de Janeiro",
    "lat": -22.835846,
    "lon": -43.287873,
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
    "id": "SME-430601",
    "nome": "Creche SME Bonsucesso · 430601",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.871385,
    "lon": -43.238471,
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
    "id": "SME-430801",
    "nome": "Creche SME Bonsucesso · 430801",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.862239,
    "lon": -43.238621,
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
    "id": "SME-430806",
    "nome": "Creche SME Bonsucesso · 430806",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bonsucesso",
    "endereco": "Bonsucesso, Rio de Janeiro",
    "lat": -22.854283,
    "lon": -43.241914,
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
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-430809",
    "nome": "Creche SME Mare · 430809",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Mare",
    "endereco": "Mare, Rio de Janeiro",
    "lat": -22.87059,
    "lon": -43.234365,
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
    "id": "SME-430810",
    "nome": "Creche SME Mare · 430810",
    "tipo": "Creche Municipal",
    "cre": 4,
    "bairro": "Mare",
    "endereco": "Mare, Rio de Janeiro",
    "lat": -22.870255,
    "lon": -43.234242,
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
    "id": "SME-430812",
    "nome": "Creche SME Mare · 430812",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Mare",
    "endereco": "Mare, Rio de Janeiro",
    "lat": -22.869632,
    "lon": -43.23396,
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
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431602",
    "nome": "Creche SME Jardim America · 431602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Jardim America",
    "endereco": "Jardim America, Rio de Janeiro",
    "lat": -22.802662,
    "lon": -43.31926,
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
        "inscritos": 6,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-431605",
    "nome": "Creche SME Jardim America · 431605",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Jardim America",
    "endereco": "Jardim America, Rio de Janeiro",
    "lat": -22.802921,
    "lon": -43.323902,
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
    "id": "SME-431606",
    "nome": "Creche SME Jardim America · 431606",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Jardim America",
    "endereco": "Jardim America, Rio de Janeiro",
    "lat": -22.804345,
    "lon": -43.331531,
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
    "nome": "Creche SME Jardim America · 431802",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Jardim America",
    "endereco": "Jardim America, Rio de Janeiro",
    "lat": -22.807508,
    "lon": -43.321322,
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
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-431804",
    "nome": "Creche SME Vigario Geral · 431804",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Vigario Geral",
    "endereco": "Vigario Geral, Rio de Janeiro",
    "lat": -22.809036,
    "lon": -43.316226,
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
    "id": "SME-514009",
    "nome": "Creche SME Iraja · 514009",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Iraja",
    "endereco": "Iraja, Rio de Janeiro",
    "lat": -22.842919,
    "lon": -43.326192,
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
    "id": "SME-514501",
    "nome": "Creche SME Iraja · 514501",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Iraja",
    "endereco": "Iraja, Rio de Janeiro",
    "lat": -22.834911,
    "lon": -43.330928,
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
    "id": "SME-514602",
    "nome": "Creche SME Iraja · 514602",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Iraja",
    "endereco": "Iraja, Rio de Janeiro",
    "lat": -22.831074,
    "lon": -43.327411,
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
    "id": "SME-514604",
    "nome": "Creche SME Iraja · 514604",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Iraja",
    "endereco": "Iraja, Rio de Janeiro",
    "lat": -22.824322,
    "lon": -43.326431,
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
    "id": "SME-514605",
    "nome": "Creche SME Colegio · 514605",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Colegio",
    "endereco": "Colegio, Rio de Janeiro",
    "lat": -22.85155,
    "lon": -43.336467,
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
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514608",
    "nome": "Creche SME Vicente De Carvalho · 514608",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vicente De Carvalho",
    "endereco": "Vicente De Carvalho, Rio de Janeiro",
    "lat": -22.867977,
    "lon": -43.309801,
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
    "id": "SME-514801",
    "nome": "Creche SME Iraja · 514801",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Iraja",
    "endereco": "Iraja, Rio de Janeiro",
    "lat": -22.823514,
    "lon": -43.320473,
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
        "inscritos": 3,
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-514802",
    "nome": "Creche SME Iraja · 514802",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Iraja",
    "endereco": "Iraja, Rio de Janeiro",
    "lat": -22.822981,
    "lon": -43.316319,
    "ofertas": [
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
    "id": "SME-514804",
    "nome": "Creche SME Vila Kosmos · 514804",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Vila Kosmos",
    "endereco": "Vila Kosmos, Rio de Janeiro",
    "lat": -22.8493,
    "lon": -43.304025,
    "ofertas": [
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
    "id": "SME-515015",
    "nome": "Creche SME Osvaldo Cruz · 515015",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Osvaldo Cruz",
    "endereco": "Osvaldo Cruz, Rio de Janeiro",
    "lat": -22.879152,
    "lon": -43.351898,
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
    "id": "SME-515046",
    "nome": "Creche SME Cavalcante · 515046",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cavalcante",
    "endereco": "Cavalcante, Rio de Janeiro",
    "lat": -22.877798,
    "lon": -43.314848,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515503",
    "nome": "Creche SME Cascadura · 515503",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cascadura",
    "endereco": "Cascadura, Rio de Janeiro",
    "lat": -22.877129,
    "lon": -43.325708,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
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
        "vagasPrioritarias": 1,
        "inscritos": 2,
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
    "id": "SME-515610",
    "nome": "Creche SME Honorio Gurgel · 515610",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Honorio Gurgel",
    "endereco": "Honorio Gurgel, Rio de Janeiro",
    "lat": -22.849063,
    "lon": -43.363966,
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
    "id": "SME-515613",
    "nome": "Creche SME Cavalcante · 515613",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Cavalcante",
    "endereco": "Cavalcante, Rio de Janeiro",
    "lat": -22.868759,
    "lon": -43.316545,
    "ofertas": [
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-515801",
    "nome": "Creche SME Honorio Gurgel · 515801",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Honorio Gurgel",
    "endereco": "Honorio Gurgel, Rio de Janeiro",
    "lat": -22.839458,
    "lon": -43.356108,
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
        "inscritos": 6,
        "inscritosPrioritarios": 2,
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
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 2,
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
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-515805",
    "nome": "Creche SME Quintino Bocaiuva · 515805",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Quintino Bocaiuva",
    "endereco": "Quintino Bocaiuva, Rio de Janeiro",
    "lat": -22.886506,
    "lon": -43.312269,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
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
        "inscritosPrioritarios": 2,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-622602",
    "nome": "Creche SME Jardim Cristina Capri - Anchieta · 622602",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Jardim Cristina Capri - Anchieta",
    "endereco": "Jardim Cristina Capri - Anchieta, Rio de Janeiro",
    "lat": -22.825833,
    "lon": -43.389133,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-622809",
    "nome": "Creche SME Ricardo De Albuquerque · 622809",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Ricardo De Albuquerque",
    "endereco": "Ricardo De Albuquerque, Rio de Janeiro",
    "lat": -22.8356,
    "lon": -43.40338,
    "ofertas": [
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
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
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
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
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
    "id": "SME-625608",
    "nome": "Creche SME Conj. Hab. Amarelinho - Iraja · 625608",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Conj. Hab. Amarelinho - Iraja",
    "endereco": "Conj. Hab. Amarelinho - Iraja, Rio de Janeiro",
    "lat": -22.826122,
    "lon": -43.338803,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625610",
    "nome": "Creche SME Coelho Neto · 625610",
    "tipo": "Creche Municipal",
    "cre": 5,
    "bairro": "Coelho Neto",
    "endereco": "Coelho Neto, Rio de Janeiro",
    "lat": -22.838585,
    "lon": -43.343128,
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
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625616",
    "nome": "Creche SME Acari · 625616",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Acari",
    "endereco": "Acari, Rio de Janeiro",
    "lat": -22.825477,
    "lon": -43.352297,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-625806",
    "nome": "Creche SME Coelho Neto · 625806",
    "tipo": "Creche Municipal",
    "cre": 11,
    "bairro": "Coelho Neto",
    "endereco": "Coelho Neto, Rio de Janeiro",
    "lat": -22.82858,
    "lon": -43.348681,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
    "id": "SME-716601",
    "nome": "Creche SME Jacarepagua · 716601",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.974934,
    "lon": -43.331015,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716602",
    "nome": "Creche SME Taquara · 716602",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Taquara",
    "endereco": "Taquara, Rio de Janeiro",
    "lat": -22.910162,
    "lon": -43.371421,
    "ofertas": [
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
    "id": "SME-716603",
    "nome": "Creche SME Jacarepagua · 716603",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.944254,
    "lon": -43.384456,
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
    "id": "SME-716604",
    "nome": "Creche SME Jacarepagua · 716604",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.960454,
    "lon": -43.352685,
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
    "id": "SME-716605",
    "nome": "Creche SME Jacarepagua · 716605",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.943136,
    "lon": -43.352063,
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
    "id": "SME-716606",
    "nome": "Creche SME Jacarepagua · 716606",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.947959,
    "lon": -43.374412,
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
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716607",
    "nome": "Creche SME Praca Seca · 716607",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praca Seca",
    "endereco": "Praca Seca, Rio de Janeiro",
    "lat": -22.907555,
    "lon": -43.353033,
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
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716608",
    "nome": "Creche SME Praca Seca · 716608",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praca Seca",
    "endereco": "Praca Seca, Rio de Janeiro",
    "lat": -22.900935,
    "lon": -43.362466,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
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
    "id": "SME-716609",
    "nome": "Creche SME Freguesia · 716609",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Freguesia",
    "endereco": "Freguesia, Rio de Janeiro",
    "lat": -22.972272,
    "lon": -43.334928,
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
    "id": "SME-716612",
    "nome": "Creche SME Jacarepagua - Taquara · 716612",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Jacarepagua - Taquara",
    "endereco": "Jacarepagua - Taquara, Rio de Janeiro",
    "lat": -22.915653,
    "lon": -43.420588,
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
    "id": "SME-716613",
    "nome": "Creche SME Jacarepagua · 716613",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.968566,
    "lon": -43.389478,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
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
    "id": "SME-716801",
    "nome": "Creche SME Jacarepagua · 716801",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.941016,
    "lon": -43.391418,
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
    "id": "SME-716802",
    "nome": "Creche SME Curicica · 716802",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.93725,
    "lon": -43.390376,
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
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 0,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-716805",
    "nome": "Creche SME Jacarepagua · 716805",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.977493,
    "lon": -43.332264,
    "ofertas": [
      {
        "grupamento": "Maternal II",
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
    "id": "SME-716808",
    "nome": "Creche SME Gardenia Azul · 716808",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardenia Azul",
    "endereco": "Gardenia Azul, Rio de Janeiro",
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
    "id": "SME-716809",
    "nome": "Creche SME Praca Seca · 716809",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praca Seca",
    "endereco": "Praca Seca, Rio de Janeiro",
    "lat": -22.904538,
    "lon": -43.34563,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716813",
    "nome": "Creche SME Camorim- Jacarepagua · 716813",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Camorim- Jacarepagua",
    "endereco": "Camorim- Jacarepagua, Rio de Janeiro",
    "lat": -22.964857,
    "lon": -43.413066,
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
    "id": "SME-716814",
    "nome": "Creche SME Rio Das Pedras · 716814",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Rio Das Pedras",
    "endereco": "Rio Das Pedras, Rio de Janeiro",
    "lat": -22.974188,
    "lon": -43.331099,
    "ofertas": [
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
    "id": "SME-716815",
    "nome": "Creche SME Praca Seca · 716815",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Praca Seca",
    "endereco": "Praca Seca, Rio de Janeiro",
    "lat": -22.890918,
    "lon": -43.349861,
    "ofertas": [
      {
        "grupamento": "Maternal II",
        "horario": "Integral",
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716816",
    "nome": "Creche SME Vila Valqueire · 716816",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Vila Valqueire",
    "endereco": "Vila Valqueire, Rio de Janeiro",
    "lat": -22.879869,
    "lon": -43.367359,
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
    "id": "SME-716818",
    "nome": "Creche SME Gardenia Azul · 716818",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Gardenia Azul",
    "endereco": "Gardenia Azul, Rio de Janeiro",
    "lat": -22.95761,
    "lon": -43.35047,
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
        "inscritos": 4,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-716823",
    "nome": "Creche SME Curicica · 716823",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Curicica",
    "endereco": "Curicica, Rio de Janeiro",
    "lat": -22.952747,
    "lon": -43.391233,
    "ofertas": [
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
    "id": "SME-724603",
    "nome": "Creche SME Barra Da Tijuca · 724603",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Barra Da Tijuca",
    "endereco": "Barra Da Tijuca, Rio de Janeiro",
    "lat": -22.98716,
    "lon": -43.307461,
    "ofertas": [
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
    "id": "SME-724604",
    "nome": "Creche SME Itanhanga · 724604",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Itanhanga",
    "endereco": "Itanhanga, Rio de Janeiro",
    "lat": -22.989005,
    "lon": -43.297241,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-724605",
    "nome": "Creche SME Vargem Grande · 724605",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Grande",
    "endereco": "Vargem Grande, Rio de Janeiro",
    "lat": -22.991385,
    "lon": -43.432685,
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
    "id": "SME-724606",
    "nome": "Creche SME Vargem Pequena · 724606",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Vargem Pequena",
    "endereco": "Vargem Pequena, Rio de Janeiro",
    "lat": -22.991854,
    "lon": -43.432396,
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
    "id": "SME-724801",
    "nome": "Creche SME Recreio · 724801",
    "tipo": "Creche Municipal",
    "cre": 10,
    "bairro": "Recreio",
    "endereco": "Recreio, Rio de Janeiro",
    "lat": -23.023984,
    "lon": -43.489959,
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
    "id": "SME-724804",
    "nome": "Creche SME Itanhanga · 724804",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Itanhanga",
    "endereco": "Itanhanga, Rio de Janeiro",
    "lat": -22.988367,
    "lon": -43.322451,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
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
    "id": "SME-734802",
    "nome": "Creche SME Jacarepagua · 734802",
    "tipo": "Creche Municipal",
    "cre": 9,
    "bairro": "Jacarepagua",
    "endereco": "Jacarepagua, Rio de Janeiro",
    "lat": -22.94965,
    "lon": -43.356636,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
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
        "inscritos": 1,
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
      }
    ]
  },
  {
    "id": "SME-817504",
    "nome": "Creche SME Senador Camara · 817504",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camara",
    "endereco": "Senador Camara, Rio de Janeiro",
    "lat": -22.881793,
    "lon": -43.487326,
    "ofertas": [
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
    "id": "SME-817601",
    "nome": "Creche SME Senador Camara · 817601",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camara",
    "endereco": "Senador Camara, Rio de Janeiro",
    "lat": -22.874814,
    "lon": -43.503815,
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
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817602",
    "nome": "Creche SME Vila Kennedy · 817602",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Vila Kennedy",
    "endereco": "Vila Kennedy, Rio de Janeiro",
    "lat": -22.860475,
    "lon": -43.494277,
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
        "vagasPrioritarias": 2,
        "inscritos": 4,
        "inscritosPrioritarios": 3,
        "demanda": "media"
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
    "id": "SME-817606",
    "nome": "Creche SME Padre Miguel · 817606",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.863292,
    "lon": -43.445078,
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
        "grupamento": "Berçário",
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
    "id": "SME-817609",
    "nome": "Creche SME Padre Miguel · 817609",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.86933,
    "lon": -43.458291,
    "ofertas": [
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
    "id": "SME-817610",
    "nome": "Creche SME Senador Camara · 817610",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camara",
    "endereco": "Senador Camara, Rio de Janeiro",
    "lat": -22.869579,
    "lon": -43.502876,
    "ofertas": [
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
    "id": "SME-817613",
    "nome": "Creche SME Padre Miguel · 817613",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.875707,
    "lon": -43.441092,
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
    "nome": "Creche SME Senador Camara · 817614",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camara",
    "endereco": "Senador Camara, Rio de Janeiro",
    "lat": -22.869391,
    "lon": -43.495536,
    "ofertas": [
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
    "id": "SME-817618",
    "nome": "Creche SME Santissimo · 817618",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Santissimo",
    "endereco": "Santissimo, Rio de Janeiro",
    "lat": -22.877426,
    "lon": -43.499731,
    "ofertas": [
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
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-817803",
    "nome": "Creche SME Senador Camara · 817803",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camara",
    "endereco": "Senador Camara, Rio de Janeiro",
    "lat": -22.869048,
    "lon": -43.485836,
    "ofertas": [
      {
        "grupamento": "Berçário",
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
    "id": "SME-817804",
    "nome": "Creche SME Padre Miguel · 817804",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Padre Miguel",
    "endereco": "Padre Miguel, Rio de Janeiro",
    "lat": -22.868071,
    "lon": -43.45675,
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
    "id": "SME-817808",
    "nome": "Creche SME Senador Camara · 817808",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Senador Camara",
    "endereco": "Senador Camara, Rio de Janeiro",
    "lat": -22.879882,
    "lon": -43.490044,
    "ofertas": [
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
        "inscritos": 6,
        "inscritosPrioritarios": 5,
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
    "id": "SME-817814",
    "nome": "Creche SME Bangu · 817814",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Bangu",
    "endereco": "Bangu, Rio de Janeiro",
    "lat": -22.895049,
    "lon": -43.490355,
    "ofertas": [
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
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "grupamento": "Maternal II",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 1,
        "inscritos": 6,
        "inscritosPrioritarios": 2,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-833032",
    "nome": "Creche SME Realengo · 833032",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Realengo",
    "endereco": "Realengo, Rio de Janeiro",
    "lat": -22.883368,
    "lon": -43.426646,
    "ofertas": [
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
        "horario": "Parcial",
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
        "horario": "Parcial",
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
    "id": "SME-833803",
    "nome": "Creche SME Vila Militar · 833803",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Vila Militar",
    "endereco": "Vila Militar, Rio de Janeiro",
    "lat": -22.859927,
    "lon": -43.390942,
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
        "inscritos": 4,
        "inscritosPrioritarios": 0,
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
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 5,
        "inscritosPrioritarios": 3,
        "demanda": "media"
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
        "vagas": 7,
        "vagasPrioritarias": 1,
        "inscritos": 10,
        "inscritosPrioritarios": 0,
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
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
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
    "id": "SME-833811",
    "nome": "Creche SME Magalhaes Bastos · 833811",
    "tipo": "Creche Municipal",
    "cre": 6,
    "bairro": "Magalhaes Bastos",
    "endereco": "Magalhaes Bastos, Rio de Janeiro",
    "lat": -22.868937,
    "lon": -43.414361,
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
    "id": "SME-918601",
    "nome": "Creche SME Inhoaiba · 918601",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.903147,
    "lon": -43.590627,
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
    "id": "SME-918602",
    "nome": "Creche SME Inhoaiba · 918602",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.919706,
    "lon": -43.601994,
    "ofertas": [
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
    "id": "SME-918603",
    "nome": "Creche SME Cosmos · 918603",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.918605,
    "lon": -43.621346,
    "ofertas": [
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
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "grupamento": "Berçário",
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
    "id": "SME-918609",
    "nome": "Creche SME Inhoaiba - Campo Grande · 918609",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba - Campo Grande",
    "endereco": "Inhoaiba - Campo Grande, Rio de Janeiro",
    "lat": -22.888013,
    "lon": -43.587225,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918613",
    "nome": "Creche SME Santissimo · 918613",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santissimo",
    "endereco": "Santissimo, Rio de Janeiro",
    "lat": -22.877835,
    "lon": -43.5237,
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
        "grupamento": "Maternal I",
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
    "id": "SME-918615",
    "nome": "Creche SME Inhoaiba · 918615",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.907751,
    "lon": -43.603988,
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
        "inscritos": 1,
        "inscritosPrioritarios": 1,
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
    "id": "SME-918617",
    "nome": "Creche SME Inhoaiba · 918617",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.911154,
    "lon": -43.590203,
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
    "id": "SME-918618",
    "nome": "Creche SME Cosmos · 918618",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Cosmos",
    "endereco": "Cosmos, Rio de Janeiro",
    "lat": -22.914253,
    "lon": -43.606667,
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
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918619",
    "nome": "Creche SME Campo Grande · 918619",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.899666,
    "lon": -43.534143,
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
        "inscritos": 4,
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
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
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
        "horario": "Parcial",
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
    "id": "SME-918805",
    "nome": "Creche SME Campo Grande · 918805",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.900123,
    "lon": -43.585876,
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
        "vagasPrioritarias": 1,
        "inscritos": 1,
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
        "vagasPrioritarias": 1,
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918809",
    "nome": "Creche SME Campo Grande · 918809",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Campo Grande",
    "endereco": "Campo Grande, Rio de Janeiro",
    "lat": -22.909046,
    "lon": -43.559383,
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
    "id": "SME-918812",
    "nome": "Creche SME Inhoaiba · 918812",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.90191,
    "lon": -43.600159,
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
    "id": "SME-918813",
    "nome": "Creche SME Carobinha -Campo Grande · 918813",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Carobinha -Campo Grande",
    "endereco": "Carobinha -Campo Grande, Rio de Janeiro",
    "lat": -22.847942,
    "lon": -43.527432,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
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
      }
    ]
  },
  {
    "id": "SME-918818",
    "nome": "Creche SME Inhoaiba · 918818",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.884711,
    "lon": -43.621103,
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
        "inscritos": 1,
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
        "vagasPrioritarias": 1,
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-918829",
    "nome": "Creche SME Inhoaiba · 918829",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.89705,
    "lon": -43.5925,
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
    "id": "SME-918831",
    "nome": "Creche SME Inhoaiba · 918831",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Inhoaiba",
    "endereco": "Inhoaiba, Rio de Janeiro",
    "lat": -22.903285,
    "lon": -43.591003,
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
    "id": "SME-918836",
    "nome": "Creche SME Santissimo · 918836",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santissimo",
    "endereco": "Santissimo, Rio de Janeiro",
    "lat": -22.875386,
    "lon": -43.533794,
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
    "id": "SME-918837",
    "nome": "Creche SME Santissimo · 918837",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santissimo",
    "endereco": "Santissimo, Rio de Janeiro",
    "lat": -22.870428,
    "lon": -43.51129,
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
        "inscritosPrioritarios": 0,
        "demanda": "media"
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
        "inscritos": 2,
        "inscritosPrioritarios": 0,
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
    "id": "SME-1019607",
    "nome": "Creche SME Paciencia · 1019607",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.927505,
    "lon": -43.634912,
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
    "id": "SME-1019612",
    "nome": "Creche SME Paciencia · 1019612",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.924633,
    "lon": -43.644761,
    "ofertas": [
      {
        "grupamento": "Berçário",
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
    "id": "SME-1019613",
    "nome": "Creche SME Paciencia · 1019613",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.926768,
    "lon": -43.641091,
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
    "id": "SME-1019614",
    "nome": "Creche SME Santa Cruz · 1019614",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.874263,
    "lon": -43.631461,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
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
    "id": "SME-1019623",
    "nome": "Creche SME Paciencia · 1019623",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.921142,
    "lon": -43.630065,
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
        "grupamento": "Maternal I",
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
    "id": "SME-1019632",
    "nome": "Creche SME Paciencia · 1019632",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.888021,
    "lon": -43.635612,
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
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1019801",
    "nome": "Creche SME Paciencia · 1019801",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.913409,
    "lon": -43.656075,
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
    "id": "SME-1019802",
    "nome": "Creche SME Paciencia · 1019802",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.921659,
    "lon": -43.645341,
    "ofertas": [
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
        "inscritosPrioritarios": 2,
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
        "vagasPrioritarias": 1,
        "inscritos": 4,
        "inscritosPrioritarios": 1,
        "demanda": "media"
      }
    ]
  },
  {
    "id": "SME-1019811",
    "nome": "Creche SME Santa Cruz · 1019811",
    "tipo": "Creche Municipal",
    "cre": 7,
    "bairro": "Santa Cruz",
    "endereco": "Santa Cruz, Rio de Janeiro",
    "lat": -22.87566,
    "lon": -43.634503,
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
    "id": "SME-1019815",
    "nome": "Creche SME Paciencia · 1019815",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Paciencia",
    "endereco": "Paciencia, Rio de Janeiro",
    "lat": -22.916108,
    "lon": -43.651918,
    "ofertas": [
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
        "grupamento": "Berçário",
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
    "id": "SME-1019823",
    "nome": "Creche SME Sepetiba · 1019823",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Sepetiba",
    "endereco": "Sepetiba, Rio de Janeiro",
    "lat": -22.956512,
    "lon": -43.687747,
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
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
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
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
    "id": "SME-1026602",
    "nome": "Creche SME Pedra De Guaratiba · 1026602",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Pedra De Guaratiba",
    "endereco": "Pedra De Guaratiba, Rio de Janeiro",
    "lat": -22.999508,
    "lon": -43.612145,
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
    "id": "SME-1026802",
    "nome": "Creche SME Pedra De Guaratiba · 1026802",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Pedra De Guaratiba",
    "endereco": "Pedra De Guaratiba, Rio de Janeiro",
    "lat": -22.981152,
    "lon": -43.644506,
    "ofertas": [
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
        "vagasPrioritarias": 2,
        "inscritos": 1,
        "inscritosPrioritarios": 1,
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
        "inscritos": 1,
        "inscritosPrioritarios": 0,
        "demanda": "baixa"
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
        "inscritos": 4,
        "inscritosPrioritarios": 0,
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
        "inscritos": 1,
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
      }
    ]
  },
  {
    "id": "SME-1026810",
    "nome": "Creche SME Pedra De Guaratiba · 1026810",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Pedra De Guaratiba",
    "endereco": "Pedra De Guaratiba, Rio de Janeiro",
    "lat": -22.974412,
    "lon": -43.648574,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Parcial",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 2,
        "inscritosPrioritarios": 2,
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
    "id": "SME-1026811",
    "nome": "Creche SME Guaratiba · 1026811",
    "tipo": "Creche Municipal",
    "cre": 8,
    "bairro": "Guaratiba",
    "endereco": "Guaratiba, Rio de Janeiro",
    "lat": -22.986274,
    "lon": -43.628916,
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
    "id": "SME-1120201",
    "nome": "Creche SME Cocota · 1120201",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Cocota",
    "endereco": "Cocota, Rio de Janeiro",
    "lat": -22.814275,
    "lon": -43.182585,
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
    "id": "SME-1120601",
    "nome": "Creche SME Ilha Do Governador · 1120601",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ilha Do Governador",
    "endereco": "Ilha Do Governador, Rio de Janeiro",
    "lat": -22.80497,
    "lon": -43.239865,
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
    "id": "SME-1120602",
    "nome": "Creche SME Ilha Do Governador · 1120602",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ilha Do Governador",
    "endereco": "Ilha Do Governador, Rio de Janeiro",
    "lat": -22.796641,
    "lon": -43.190965,
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
    "id": "SME-1120603",
    "nome": "Creche SME Ilha Do Governador · 1120603",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ilha Do Governador",
    "endereco": "Ilha Do Governador, Rio de Janeiro",
    "lat": -22.795669,
    "lon": -43.209615,
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
    "id": "SME-1120604",
    "nome": "Creche SME Ilha Do Governador · 1120604",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ilha Do Governador",
    "endereco": "Ilha Do Governador, Rio de Janeiro",
    "lat": -22.786565,
    "lon": -43.186716,
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
    "id": "SME-1120605",
    "nome": "Creche SME Ilha Do Governador · 1120605",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ilha Do Governador",
    "endereco": "Ilha Do Governador, Rio de Janeiro",
    "lat": -22.814814,
    "lon": -43.225622,
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
        "vagasPrioritarias": 1,
        "inscritos": 3,
        "inscritosPrioritarios": 1,
        "demanda": "baixa"
      }
    ]
  },
  {
    "id": "SME-1120606",
    "nome": "Creche SME Ilha Do Governador · 1120606",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ilha Do Governador",
    "endereco": "Ilha Do Governador, Rio de Janeiro",
    "lat": -22.796875,
    "lon": -43.1796,
    "ofertas": [
      {
        "grupamento": "Berçário",
        "horario": "Integral",
        "vagas": 4,
        "vagasPrioritarias": 2,
        "inscritos": 3,
        "inscritosPrioritarios": 3,
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
    "id": "SME-1120801",
    "nome": "Creche SME Ilha Do Governador · 1120801",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Ilha Do Governador",
    "endereco": "Ilha Do Governador, Rio de Janeiro",
    "lat": -22.805503,
    "lon": -43.1932,
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
    "nome": "Creche SME Bancarios - Ilha Do Governador · 1120802",
    "tipo": "Creche Municipal",
    "cre": 3,
    "bairro": "Bancarios - Ilha Do Governador",
    "endereco": "Bancarios - Ilha Do Governador, Rio de Janeiro",
    "lat": -22.788537,
    "lon": -43.185002,
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
  }
];
