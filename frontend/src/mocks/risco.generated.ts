// GERADO por integracao-sme/build_risco.py — NÃO editar à mão.
// Modelo: rio-sme.sme_creche.modelo_risco_alocacao_xgb (ML.PREDICT via bq CLI)
// Fonte: rio-sme.sme_creche.inscricoes_completa · gerado em 2026-08-30T18:41:19+00:00
// risco = 1 - média P(confirmado) por unidade · alto se >= 0.5 · piso 5 inscrições
// DERIVADO DE SINTÉTICO — nunca apresentar como estatística oficial.

export type NivelRisco = 'alto' | 'baixo';

export interface RiscoUnidade {
  /** 1 − média de P(alocação) prevista pelo modelo para a unidade. */
  risco: number;
  nivel: NivelRisco;
  /** Inscrições que sustentam a média. */
  inscricoes: number;
}

export const RISCO_META = {
  "generated_at": "2026-08-30T18:41:19+00:00",
  "model": "rio-sme.sme_creche.modelo_risco_alocacao_xgb",
  "model_type": "BOOSTED_TREE_CLASSIFIER (XGBoost) · label: confirmado",
  "source": "rio-sme.sme_creche.inscricoes_completa",
  "unidades": 859,
  "corte_alto": 0.5,
  "min_inscricoes": 5,
  "treino_metricas": {
    "rocAuc": 0.7368,
    "accuracy": 0.6769,
    "f1": 0.7393
  },
  "derivado_de_sintetico": true,
  "aviso": "Risco DERIVADO DE dados SINTÉTICOS via modelo XGBoost demonstrativo; não é estatística oficial da SME."
} as const;

export const RISCO_POR_UNIDADE: Record<string, RiscoUnidade> = {
  "SME-1004": {
    "risco": 0.3032,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1005": {
    "risco": 0.2717,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-1006": {
    "risco": 0.2627,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-1007": {
    "risco": 0.3111,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-1009": {
    "risco": 0.2788,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-1010": {
    "risco": 0.3632,
    "nivel": "baixo",
    "inscricoes": 88
  },
  "SME-2001": {
    "risco": 0.2452,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-2002": {
    "risco": 0.3347,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-2003": {
    "risco": 0.2315,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-2004": {
    "risco": 0.3674,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-2005": {
    "risco": 0.2672,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2006": {
    "risco": 0.2603,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2009": {
    "risco": 0.2849,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-2010": {
    "risco": 0.2987,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-2012": {
    "risco": 0.2765,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2013": {
    "risco": 0.2325,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2014": {
    "risco": 0.2784,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2015": {
    "risco": 0.2968,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2016": {
    "risco": 0.2989,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2018": {
    "risco": 0.2856,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2019": {
    "risco": 0.2304,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-2020": {
    "risco": 0.2659,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-2022": {
    "risco": 0.2897,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2025": {
    "risco": 0.3066,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-2026": {
    "risco": 0.256,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2028": {
    "risco": 0.284,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-2029": {
    "risco": 0.3302,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-2031": {
    "risco": 0.2635,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2032": {
    "risco": 0.253,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-2034": {
    "risco": 0.2565,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-2035": {
    "risco": 0.2899,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-2036": {
    "risco": 0.2695,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-2037": {
    "risco": 0.2875,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-2038": {
    "risco": 0.24,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2039": {
    "risco": 0.355,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-2040": {
    "risco": 0.2613,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2041": {
    "risco": 0.2537,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2042": {
    "risco": 0.3017,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2043": {
    "risco": 0.2566,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-2044": {
    "risco": 0.2567,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-2045": {
    "risco": 0.2846,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2046": {
    "risco": 0.3192,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-2047": {
    "risco": 0.269,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2048": {
    "risco": 0.317,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-2049": {
    "risco": 0.3031,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-2052": {
    "risco": 0.2699,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-2053": {
    "risco": 0.3028,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-2054": {
    "risco": 0.2633,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2055": {
    "risco": 0.3086,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-2056": {
    "risco": 0.2737,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-2057": {
    "risco": 0.2609,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2058": {
    "risco": 0.2604,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2060": {
    "risco": 0.2696,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-2061": {
    "risco": 0.2488,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-2063": {
    "risco": 0.2844,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-3001": {
    "risco": 0.2884,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-3002": {
    "risco": 0.3599,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-3003": {
    "risco": 0.2717,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-3004": {
    "risco": 0.2568,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-3005": {
    "risco": 0.1981,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-3006": {
    "risco": 0.3785,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-3007": {
    "risco": 0.2627,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-3008": {
    "risco": 0.2838,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-3009": {
    "risco": 0.2702,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-3010": {
    "risco": 0.2689,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-3011": {
    "risco": 0.2185,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-3012": {
    "risco": 0.3463,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-3013": {
    "risco": 0.287,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-3014": {
    "risco": 0.4419,
    "nivel": "baixo",
    "inscricoes": 108
  },
  "SME-3015": {
    "risco": 0.2704,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-3016": {
    "risco": 0.2893,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-3017": {
    "risco": 0.2206,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-3018": {
    "risco": 0.2113,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-3019": {
    "risco": 0.29,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-3020": {
    "risco": 0.269,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-3021": {
    "risco": 0.2852,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-3022": {
    "risco": 0.3383,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-3023": {
    "risco": 0.2591,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-3024": {
    "risco": 0.2802,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-3025": {
    "risco": 0.4159,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-3026": {
    "risco": 0.477,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-3027": {
    "risco": 0.2736,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-3028": {
    "risco": 0.3383,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-3029": {
    "risco": 0.2736,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-3030": {
    "risco": 0.2712,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-3031": {
    "risco": 0.2631,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-3032": {
    "risco": 0.284,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-3033": {
    "risco": 0.2674,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-3034": {
    "risco": 0.3115,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-3035": {
    "risco": 0.2528,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-3036": {
    "risco": 0.3072,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-3037": {
    "risco": 0.3926,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-3038": {
    "risco": 0.333,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-3039": {
    "risco": 0.2892,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-3040": {
    "risco": 0.2633,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-3041": {
    "risco": 0.2332,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-4001": {
    "risco": 0.274,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-4002": {
    "risco": 0.277,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4003": {
    "risco": 0.2405,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-4004": {
    "risco": 0.2325,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4005": {
    "risco": 0.2411,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-4006": {
    "risco": 0.2946,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-4007": {
    "risco": 0.2937,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4008": {
    "risco": 0.2435,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-4009": {
    "risco": 0.3856,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-4010": {
    "risco": 0.2812,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-4011": {
    "risco": 0.208,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4012": {
    "risco": 0.286,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-4013": {
    "risco": 0.2893,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4014": {
    "risco": 0.2375,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-4015": {
    "risco": 0.411,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-4016": {
    "risco": 0.321,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-4017": {
    "risco": 0.2282,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-4018": {
    "risco": 0.2887,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-4020": {
    "risco": 0.2941,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4021": {
    "risco": 0.2646,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-4022": {
    "risco": 0.3821,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-4023": {
    "risco": 0.2828,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-4024": {
    "risco": 0.3864,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-4025": {
    "risco": 0.2385,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-4026": {
    "risco": 0.2557,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-4027": {
    "risco": 0.3394,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-4028": {
    "risco": 0.315,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-4029": {
    "risco": 0.2911,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-4030": {
    "risco": 0.4058,
    "nivel": "baixo",
    "inscricoes": 78
  },
  "SME-4032": {
    "risco": 0.5165,
    "nivel": "alto",
    "inscricoes": 56
  },
  "SME-4034": {
    "risco": 0.3879,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-4035": {
    "risco": 0.3085,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-4036": {
    "risco": 0.2487,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-4037": {
    "risco": 0.2632,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4038": {
    "risco": 0.3148,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-4039": {
    "risco": 0.234,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-4040": {
    "risco": 0.3498,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-4041": {
    "risco": 0.2748,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4042": {
    "risco": 0.2806,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-4043": {
    "risco": 0.2786,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-4044": {
    "risco": 0.2984,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-4045": {
    "risco": 0.2407,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4046": {
    "risco": 0.3253,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-4047": {
    "risco": 0.3575,
    "nivel": "baixo",
    "inscricoes": 49
  },
  "SME-4048": {
    "risco": 0.3104,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-4049": {
    "risco": 0.2864,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4050": {
    "risco": 0.2878,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-5001": {
    "risco": 0.3782,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-5002": {
    "risco": 0.2803,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-5003": {
    "risco": 0.334,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-5004": {
    "risco": 0.2372,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-5005": {
    "risco": 0.3282,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-5006": {
    "risco": 0.4857,
    "nivel": "baixo",
    "inscricoes": 115
  },
  "SME-5007": {
    "risco": 0.2108,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-5008": {
    "risco": 0.3768,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-5009": {
    "risco": 0.3421,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-5010": {
    "risco": 0.3654,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-5012": {
    "risco": 0.4248,
    "nivel": "baixo",
    "inscricoes": 68
  },
  "SME-5013": {
    "risco": 0.3336,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-5014": {
    "risco": 0.4023,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-5015": {
    "risco": 0.4568,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-5016": {
    "risco": 0.4125,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-6001": {
    "risco": 0.3166,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-6002": {
    "risco": 0.2672,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-6003": {
    "risco": 0.3207,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-6004": {
    "risco": 0.2127,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-6005": {
    "risco": 0.2081,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-6006": {
    "risco": 0.286,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-6007": {
    "risco": 0.219,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-6009": {
    "risco": 0.2958,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-6012": {
    "risco": 0.3621,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-6013": {
    "risco": 0.3441,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-6015": {
    "risco": 0.3432,
    "nivel": "baixo",
    "inscricoes": 87
  },
  "SME-6016": {
    "risco": 0.3228,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-6017": {
    "risco": 0.3696,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-6018": {
    "risco": 0.2939,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-7001": {
    "risco": 0.3232,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-7002": {
    "risco": 0.2733,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-7003": {
    "risco": 0.4627,
    "nivel": "baixo",
    "inscricoes": 132
  },
  "SME-7004": {
    "risco": 0.2862,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-7007": {
    "risco": 0.2919,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-7008": {
    "risco": 0.2293,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-7010": {
    "risco": 0.2917,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-7011": {
    "risco": 0.2808,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-7013": {
    "risco": 0.3876,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-7014": {
    "risco": 0.3554,
    "nivel": "baixo",
    "inscricoes": 50
  },
  "SME-7015": {
    "risco": 0.3377,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-7017": {
    "risco": 0.248,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-7018": {
    "risco": 0.2577,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-7019": {
    "risco": 0.2758,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-7020": {
    "risco": 0.3117,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-7025": {
    "risco": 0.2638,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-7027": {
    "risco": 0.2994,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-7034": {
    "risco": 0.282,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-7035": {
    "risco": 0.3207,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-7036": {
    "risco": 0.3598,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-7037": {
    "risco": 0.3767,
    "nivel": "baixo",
    "inscricoes": 93
  },
  "SME-7038": {
    "risco": 0.5043,
    "nivel": "alto",
    "inscricoes": 104
  },
  "SME-7039": {
    "risco": 0.3162,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-7040": {
    "risco": 0.5035,
    "nivel": "alto",
    "inscricoes": 175
  },
  "SME-7041": {
    "risco": 0.3909,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-7042": {
    "risco": 0.3817,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-7043": {
    "risco": 0.2805,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-7044": {
    "risco": 0.3481,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-7045": {
    "risco": 0.2122,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-7046": {
    "risco": 0.2077,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-8002": {
    "risco": 0.1971,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-8003": {
    "risco": 0.2847,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-8004": {
    "risco": 0.3401,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-8005": {
    "risco": 0.2775,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-8006": {
    "risco": 0.2456,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-8007": {
    "risco": 0.3233,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-8008": {
    "risco": 0.2351,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-8009": {
    "risco": 0.3293,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-8010": {
    "risco": 0.3672,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-8011": {
    "risco": 0.3913,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-8013": {
    "risco": 0.2954,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-8014": {
    "risco": 0.2949,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-8015": {
    "risco": 0.257,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-8016": {
    "risco": 0.3853,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-8017": {
    "risco": 0.2566,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-8018": {
    "risco": 0.2503,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-8019": {
    "risco": 0.2356,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-8021": {
    "risco": 0.2977,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-8022": {
    "risco": 0.3088,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-8023": {
    "risco": 0.2518,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-8024": {
    "risco": 0.2527,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-8025": {
    "risco": 0.2743,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-9001": {
    "risco": 0.2804,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-9002": {
    "risco": 0.2142,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-9003": {
    "risco": 0.2331,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-9004": {
    "risco": 0.3064,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-9008": {
    "risco": 0.264,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-9009": {
    "risco": 0.3339,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-9010": {
    "risco": 0.288,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-9011": {
    "risco": 0.2956,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-9012": {
    "risco": 0.3236,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-9013": {
    "risco": 0.3518,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-9014": {
    "risco": 0.3361,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-9017": {
    "risco": 0.3351,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-9018": {
    "risco": 0.287,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-9019": {
    "risco": 0.2957,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-9020": {
    "risco": 0.2243,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-9021": {
    "risco": 0.3089,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-9022": {
    "risco": 0.331,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-9023": {
    "risco": 0.299,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-9024": {
    "risco": 0.3157,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-9025": {
    "risco": 0.2319,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-9026": {
    "risco": 0.3054,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-9027": {
    "risco": 0.2898,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-9028": {
    "risco": 0.3065,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-9029": {
    "risco": 0.3372,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-9030": {
    "risco": 0.2927,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-9031": {
    "risco": 0.2913,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-9032": {
    "risco": 0.2843,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-9033": {
    "risco": 0.2746,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-9034": {
    "risco": 0.2867,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-9035": {
    "risco": 0.2806,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-9036": {
    "risco": 0.3791,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-9037": {
    "risco": 0.2379,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-9038": {
    "risco": 0.3698,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-9039": {
    "risco": 0.2822,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-9040": {
    "risco": 0.319,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-9041": {
    "risco": 0.3115,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-9042": {
    "risco": 0.2144,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-9043": {
    "risco": 0.2914,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-9044": {
    "risco": 0.2829,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-9045": {
    "risco": 0.3084,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-9046": {
    "risco": 0.3924,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-10001": {
    "risco": 0.1866,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-10004": {
    "risco": 0.1808,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-10005": {
    "risco": 0.2261,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-10006": {
    "risco": 0.1834,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-10008": {
    "risco": 0.2582,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-10009": {
    "risco": 0.1718,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-10010": {
    "risco": 0.1879,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-10011": {
    "risco": 0.1578,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-10013": {
    "risco": 0.1848,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10014": {
    "risco": 0.1651,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-10018": {
    "risco": 0.2456,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-10019": {
    "risco": 0.226,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-10020": {
    "risco": 0.1711,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-10022": {
    "risco": 0.2617,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-10023": {
    "risco": 0.1541,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-10024": {
    "risco": 0.2405,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-10026": {
    "risco": 0.336,
    "nivel": "baixo",
    "inscricoes": 50
  },
  "SME-10027": {
    "risco": 0.2148,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-10028": {
    "risco": 0.2518,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-10029": {
    "risco": 0.1764,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-10030": {
    "risco": 0.1497,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-10032": {
    "risco": 0.2206,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-10033": {
    "risco": 0.1843,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-10034": {
    "risco": 0.1841,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-10035": {
    "risco": 0.1592,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-10036": {
    "risco": 0.1802,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-10037": {
    "risco": 0.1638,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-10039": {
    "risco": 0.232,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-10040": {
    "risco": 0.2875,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-10041": {
    "risco": 0.207,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-10042": {
    "risco": 0.2351,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-10043": {
    "risco": 0.2365,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-10044": {
    "risco": 0.1892,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-10045": {
    "risco": 0.1796,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-10046": {
    "risco": 0.3381,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-10047": {
    "risco": 0.2617,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-10051": {
    "risco": 0.3417,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-10052": {
    "risco": 0.3823,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-10053": {
    "risco": 0.2962,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-10054": {
    "risco": 0.1692,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-10055": {
    "risco": 0.1948,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-10056": {
    "risco": 0.178,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-10057": {
    "risco": 0.3326,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-10058": {
    "risco": 0.2829,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-10059": {
    "risco": 0.1714,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10060": {
    "risco": 0.1604,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-10061": {
    "risco": 0.1776,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-10062": {
    "risco": 0.2022,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10063": {
    "risco": 0.2351,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-10064": {
    "risco": 0.3014,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-10065": {
    "risco": 0.1991,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-10066": {
    "risco": 0.2211,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-10067": {
    "risco": 0.2011,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-10068": {
    "risco": 0.1837,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-10069": {
    "risco": 0.3242,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-10070": {
    "risco": 0.2002,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-10071": {
    "risco": 0.2146,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-10072": {
    "risco": 0.3061,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-10073": {
    "risco": 0.2986,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-10074": {
    "risco": 0.2667,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-10075": {
    "risco": 0.2152,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-10076": {
    "risco": 0.1818,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10077": {
    "risco": 0.1869,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-10078": {
    "risco": 0.2126,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-10079": {
    "risco": 0.3055,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-10080": {
    "risco": 0.1959,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-10081": {
    "risco": 0.4093,
    "nivel": "baixo",
    "inscricoes": 68
  },
  "SME-10082": {
    "risco": 0.1691,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-10083": {
    "risco": 0.2831,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-10084": {
    "risco": 0.2919,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-10085": {
    "risco": 0.2426,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-11001": {
    "risco": 0.2823,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-11003": {
    "risco": 0.2861,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-11004": {
    "risco": 0.2395,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-11006": {
    "risco": 0.3007,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-11007": {
    "risco": 0.2412,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-11008": {
    "risco": 0.2248,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-11009": {
    "risco": 0.2377,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-11010": {
    "risco": 0.302,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-101601": {
    "risco": 0.2974,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-101602": {
    "risco": 0.2281,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-101603": {
    "risco": 0.4013,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-101604": {
    "risco": 0.2048,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-101605": {
    "risco": 0.2892,
    "nivel": "baixo",
    "inscricoes": 49
  },
  "SME-101606": {
    "risco": 0.28,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-101607": {
    "risco": 0.5212,
    "nivel": "alto",
    "inscricoes": 121
  },
  "SME-101801": {
    "risco": 0.4076,
    "nivel": "baixo",
    "inscricoes": 125
  },
  "SME-101802": {
    "risco": 0.343,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-101803": {
    "risco": 0.3798,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-102601": {
    "risco": 0.3586,
    "nivel": "baixo",
    "inscricoes": 78
  },
  "SME-102602": {
    "risco": 0.4014,
    "nivel": "baixo",
    "inscricoes": 109
  },
  "SME-102604": {
    "risco": 0.5431,
    "nivel": "alto",
    "inscricoes": 120
  },
  "SME-102605": {
    "risco": 0.5345,
    "nivel": "alto",
    "inscricoes": 124
  },
  "SME-102606": {
    "risco": 0.5308,
    "nivel": "alto",
    "inscricoes": 124
  },
  "SME-102802": {
    "risco": 0.3701,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-102803": {
    "risco": 0.3964,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-103601": {
    "risco": 0.2513,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-103602": {
    "risco": 0.3285,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-103604": {
    "risco": 0.3142,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-103605": {
    "risco": 0.3178,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-103606": {
    "risco": 0.3702,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-103607": {
    "risco": 0.3183,
    "nivel": "baixo",
    "inscricoes": 89
  },
  "SME-103801": {
    "risco": 0.3971,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-103802": {
    "risco": 0.317,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-103804": {
    "risco": 0.3212,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-103805": {
    "risco": 0.3037,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-103806": {
    "risco": 0.2328,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-103807": {
    "risco": 0.3903,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-107601": {
    "risco": 0.3024,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-107602": {
    "risco": 0.3559,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-107603": {
    "risco": 0.2863,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-107604": {
    "risco": 0.4008,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-107605": {
    "risco": 0.3045,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-107606": {
    "risco": 0.2766,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-107607": {
    "risco": 0.3932,
    "nivel": "baixo",
    "inscricoes": 90
  },
  "SME-107608": {
    "risco": 0.4279,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-107609": {
    "risco": 0.3634,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-107610": {
    "risco": 0.6061,
    "nivel": "alto",
    "inscricoes": 201
  },
  "SME-107801": {
    "risco": 0.3036,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-107802": {
    "risco": 0.2698,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-107803": {
    "risco": 0.2156,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-121001": {
    "risco": 0.2758,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-123601": {
    "risco": 0.3628,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-123603": {
    "risco": 0.3519,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-204601": {
    "risco": 0.2931,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-204602": {
    "risco": 0.7018,
    "nivel": "alto",
    "inscricoes": 327
  },
  "SME-204803": {
    "risco": 0.4442,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-204804": {
    "risco": 0.3537,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-204805": {
    "risco": 0.4669,
    "nivel": "baixo",
    "inscricoes": 102
  },
  "SME-204806": {
    "risco": 0.3305,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-205601": {
    "risco": 0.561,
    "nivel": "alto",
    "inscricoes": 169
  },
  "SME-205602": {
    "risco": 0.3978,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-205801": {
    "risco": 0.3184,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-206601": {
    "risco": 0.3497,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-206602": {
    "risco": 0.3925,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-206603": {
    "risco": 0.454,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-206605": {
    "risco": 0.3984,
    "nivel": "baixo",
    "inscricoes": 53
  },
  "SME-206606": {
    "risco": 0.437,
    "nivel": "baixo",
    "inscricoes": 83
  },
  "SME-208601": {
    "risco": 0.3009,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-208603": {
    "risco": 0.2784,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-208604": {
    "risco": 0.2945,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-208605": {
    "risco": 0.2411,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-208606": {
    "risco": 0.2941,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-208607": {
    "risco": 0.3176,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-208608": {
    "risco": 0.5665,
    "nivel": "alto",
    "inscricoes": 124
  },
  "SME-208801": {
    "risco": 0.4244,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-208803": {
    "risco": 0.2815,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-208806": {
    "risco": 0.3858,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-209601": {
    "risco": 0.4125,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-209602": {
    "risco": 0.4019,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-209603": {
    "risco": 0.2821,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-209604": {
    "risco": 0.3205,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-209605": {
    "risco": 0.2927,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-209606": {
    "risco": 0.3374,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-209607": {
    "risco": 0.3101,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-209608": {
    "risco": 0.3846,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-209609": {
    "risco": 0.4167,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-209610": {
    "risco": 0.4116,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-209801": {
    "risco": 0.4303,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-209802": {
    "risco": 0.4294,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-209803": {
    "risco": 0.3566,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-209804": {
    "risco": 0.388,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-227601": {
    "risco": 0.4516,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-227602": {
    "risco": 0.3426,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-227801": {
    "risco": 0.5837,
    "nivel": "alto",
    "inscricoes": 150
  },
  "SME-312010": {
    "risco": 0.3756,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-312017": {
    "risco": 0.2795,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-312502": {
    "risco": 0.4661,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-312601": {
    "risco": 0.4621,
    "nivel": "baixo",
    "inscricoes": 91
  },
  "SME-312602": {
    "risco": 0.5254,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-312603": {
    "risco": 0.4522,
    "nivel": "baixo",
    "inscricoes": 77
  },
  "SME-312801": {
    "risco": 0.3522,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-312802": {
    "risco": 0.3631,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-312803": {
    "risco": 0.3042,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-312804": {
    "risco": 0.4871,
    "nivel": "baixo",
    "inscricoes": 89
  },
  "SME-312805": {
    "risco": 0.4998,
    "nivel": "baixo",
    "inscricoes": 118
  },
  "SME-312806": {
    "risco": 0.4111,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-312809": {
    "risco": 0.4131,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-312810": {
    "risco": 0.4043,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-312811": {
    "risco": 0.3625,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-312812": {
    "risco": 0.4298,
    "nivel": "baixo",
    "inscricoes": 49
  },
  "SME-312813": {
    "risco": 0.3887,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-313012": {
    "risco": 0.3244,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-313025": {
    "risco": 0.3739,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-313601": {
    "risco": 0.401,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-313602": {
    "risco": 0.3521,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-313603": {
    "risco": 0.4337,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-313604": {
    "risco": 0.4073,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-313606": {
    "risco": 0.3409,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-313607": {
    "risco": 0.5039,
    "nivel": "alto",
    "inscricoes": 110
  },
  "SME-313608": {
    "risco": 0.6233,
    "nivel": "alto",
    "inscricoes": 173
  },
  "SME-313609": {
    "risco": 0.3259,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-313610": {
    "risco": 0.3776,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-313611": {
    "risco": 0.4265,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-313612": {
    "risco": 0.4322,
    "nivel": "baixo",
    "inscricoes": 90
  },
  "SME-313801": {
    "risco": 0.4566,
    "nivel": "baixo",
    "inscricoes": 86
  },
  "SME-313802": {
    "risco": 0.5833,
    "nivel": "alto",
    "inscricoes": 150
  },
  "SME-313804": {
    "risco": 0.4109,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-313805": {
    "risco": 0.559,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-313806": {
    "risco": 0.4102,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-313809": {
    "risco": 0.4636,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-313830": {
    "risco": 0.4119,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-328601": {
    "risco": 0.3745,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-328602": {
    "risco": 0.4141,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-328604": {
    "risco": 0.4493,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-328801": {
    "risco": 0.5938,
    "nivel": "alto",
    "inscricoes": 143
  },
  "SME-329801": {
    "risco": 0.558,
    "nivel": "alto",
    "inscricoes": 133
  },
  "SME-330601": {
    "risco": 0.4468,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-330602": {
    "risco": 0.5826,
    "nivel": "alto",
    "inscricoes": 129
  },
  "SME-410601": {
    "risco": 0.2898,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-410602": {
    "risco": 0.452,
    "nivel": "baixo",
    "inscricoes": 64
  },
  "SME-410603": {
    "risco": 0.5058,
    "nivel": "alto",
    "inscricoes": 127
  },
  "SME-410801": {
    "risco": 0.6172,
    "nivel": "alto",
    "inscricoes": 216
  },
  "SME-410802": {
    "risco": 0.4328,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-410803": {
    "risco": 0.2776,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-410804": {
    "risco": 0.3053,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-410805": {
    "risco": 0.4365,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-410806": {
    "risco": 0.3155,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-410807": {
    "risco": 0.5546,
    "nivel": "alto",
    "inscricoes": 98
  },
  "SME-410808": {
    "risco": 0.5042,
    "nivel": "alto",
    "inscricoes": 105
  },
  "SME-410810": {
    "risco": 0.4239,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-410811": {
    "risco": 0.2998,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-411601": {
    "risco": 0.4984,
    "nivel": "baixo",
    "inscricoes": 93
  },
  "SME-411602": {
    "risco": 0.3714,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-411603": {
    "risco": 0.3926,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-411604": {
    "risco": 0.3425,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-411605": {
    "risco": 0.2836,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-411607": {
    "risco": 0.3991,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-411609": {
    "risco": 0.4523,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-411610": {
    "risco": 0.3021,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-411801": {
    "risco": 0.6706,
    "nivel": "alto",
    "inscricoes": 242
  },
  "SME-411802": {
    "risco": 0.3374,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-411803": {
    "risco": 0.364,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-411804": {
    "risco": 0.3807,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-411805": {
    "risco": 0.1631,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-411806": {
    "risco": 0.3023,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-430601": {
    "risco": 0.3923,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-430602": {
    "risco": 0.4115,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-430603": {
    "risco": 0.5583,
    "nivel": "alto",
    "inscricoes": 154
  },
  "SME-430604": {
    "risco": 0.3468,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-430605": {
    "risco": 0.3406,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-430607": {
    "risco": 0.3168,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-430801": {
    "risco": 0.3502,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-430802": {
    "risco": 0.4479,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-430803": {
    "risco": 0.3242,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-430805": {
    "risco": 0.3585,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-430806": {
    "risco": 0.4646,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-430807": {
    "risco": 0.434,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-430808": {
    "risco": 0.2942,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-430809": {
    "risco": 0.354,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-430810": {
    "risco": 0.421,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-430811": {
    "risco": 0.4367,
    "nivel": "baixo",
    "inscricoes": 72
  },
  "SME-430812": {
    "risco": 0.3635,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-430813": {
    "risco": 0.285,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-430815": {
    "risco": 0.2905,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-431601": {
    "risco": 0.358,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-431602": {
    "risco": 0.4783,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-431603": {
    "risco": 0.4322,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-431604": {
    "risco": 0.371,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-431605": {
    "risco": 0.4256,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-431606": {
    "risco": 0.4073,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-431607": {
    "risco": 0.272,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-431608": {
    "risco": 0.411,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-431801": {
    "risco": 0.2983,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-431802": {
    "risco": 0.4676,
    "nivel": "baixo",
    "inscricoes": 84
  },
  "SME-431803": {
    "risco": 0.3327,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-431804": {
    "risco": 0.4378,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-514009": {
    "risco": 0.4004,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-514028": {
    "risco": 0.3706,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-514501": {
    "risco": 0.3692,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-514601": {
    "risco": 0.4903,
    "nivel": "baixo",
    "inscricoes": 67
  },
  "SME-514602": {
    "risco": 0.6846,
    "nivel": "alto",
    "inscricoes": 274
  },
  "SME-514603": {
    "risco": 0.4286,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-514604": {
    "risco": 0.3824,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-514605": {
    "risco": 0.4995,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-514606": {
    "risco": 0.4937,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-514607": {
    "risco": 0.5088,
    "nivel": "alto",
    "inscricoes": 71
  },
  "SME-514608": {
    "risco": 0.4843,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-514609": {
    "risco": 0.6122,
    "nivel": "alto",
    "inscricoes": 122
  },
  "SME-514801": {
    "risco": 0.592,
    "nivel": "alto",
    "inscricoes": 101
  },
  "SME-514802": {
    "risco": 0.3522,
    "nivel": "baixo",
    "inscricoes": 49
  },
  "SME-514803": {
    "risco": 0.319,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-514804": {
    "risco": 0.4122,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-515015": {
    "risco": 0.4049,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-515021": {
    "risco": 0.3418,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-515046": {
    "risco": 0.3806,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-515053": {
    "risco": 0.4059,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-515064": {
    "risco": 0.2015,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-515501": {
    "risco": 0.3921,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-515503": {
    "risco": 0.4008,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-515601": {
    "risco": 0.4393,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-515602": {
    "risco": 0.6246,
    "nivel": "alto",
    "inscricoes": 174
  },
  "SME-515604": {
    "risco": 0.582,
    "nivel": "alto",
    "inscricoes": 117
  },
  "SME-515605": {
    "risco": 0.5228,
    "nivel": "alto",
    "inscricoes": 107
  },
  "SME-515606": {
    "risco": 0.6027,
    "nivel": "alto",
    "inscricoes": 111
  },
  "SME-515607": {
    "risco": 0.6585,
    "nivel": "alto",
    "inscricoes": 173
  },
  "SME-515608": {
    "risco": 0.4156,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-515610": {
    "risco": 0.375,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-515611": {
    "risco": 0.4064,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-515612": {
    "risco": 0.3377,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-515613": {
    "risco": 0.5021,
    "nivel": "alto",
    "inscricoes": 108
  },
  "SME-515801": {
    "risco": 0.755,
    "nivel": "alto",
    "inscricoes": 293
  },
  "SME-515802": {
    "risco": 0.2603,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-515803": {
    "risco": 0.4793,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-515804": {
    "risco": 0.4792,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-515805": {
    "risco": 0.4205,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-515807": {
    "risco": 0.3619,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-515808": {
    "risco": 0.3499,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-515809": {
    "risco": 0.6865,
    "nivel": "alto",
    "inscricoes": 208
  },
  "SME-515810": {
    "risco": 0.5799,
    "nivel": "alto",
    "inscricoes": 113
  },
  "SME-622023": {
    "risco": 0.3797,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-622202": {
    "risco": 0.4263,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-622601": {
    "risco": 0.5222,
    "nivel": "alto",
    "inscricoes": 97
  },
  "SME-622602": {
    "risco": 0.4548,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-622603": {
    "risco": 0.4665,
    "nivel": "baixo",
    "inscricoes": 129
  },
  "SME-622801": {
    "risco": 0.617,
    "nivel": "alto",
    "inscricoes": 187
  },
  "SME-622802": {
    "risco": 0.4456,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-622804": {
    "risco": 0.5883,
    "nivel": "alto",
    "inscricoes": 173
  },
  "SME-622805": {
    "risco": 0.4764,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-622809": {
    "risco": 0.4214,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-622810": {
    "risco": 0.2529,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-625601": {
    "risco": 0.4912,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-625602": {
    "risco": 0.3069,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-625603": {
    "risco": 0.4603,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-625604": {
    "risco": 0.6416,
    "nivel": "alto",
    "inscricoes": 223
  },
  "SME-625605": {
    "risco": 0.4026,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-625606": {
    "risco": 0.3408,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-625607": {
    "risco": 0.4952,
    "nivel": "baixo",
    "inscricoes": 67
  },
  "SME-625608": {
    "risco": 0.4834,
    "nivel": "baixo",
    "inscricoes": 68
  },
  "SME-625609": {
    "risco": 0.4734,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-625610": {
    "risco": 0.4556,
    "nivel": "baixo",
    "inscricoes": 53
  },
  "SME-625611": {
    "risco": 0.543,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-625612": {
    "risco": 0.543,
    "nivel": "alto",
    "inscricoes": 122
  },
  "SME-625614": {
    "risco": 0.5271,
    "nivel": "alto",
    "inscricoes": 135
  },
  "SME-625615": {
    "risco": 0.5357,
    "nivel": "alto",
    "inscricoes": 115
  },
  "SME-625616": {
    "risco": 0.4418,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-625801": {
    "risco": 0.4607,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-625802": {
    "risco": 0.4589,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-625803": {
    "risco": 0.4629,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-625804": {
    "risco": 0.4442,
    "nivel": "baixo",
    "inscricoes": 87
  },
  "SME-625806": {
    "risco": 0.3938,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-625807": {
    "risco": 0.3675,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-625813": {
    "risco": 0.4175,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-625814": {
    "risco": 0.4739,
    "nivel": "baixo",
    "inscricoes": 77
  },
  "SME-625815": {
    "risco": 0.4562,
    "nivel": "baixo",
    "inscricoes": 77
  },
  "SME-625816": {
    "risco": 0.5415,
    "nivel": "alto",
    "inscricoes": 126
  },
  "SME-625817": {
    "risco": 0.4573,
    "nivel": "baixo",
    "inscricoes": 83
  },
  "SME-625818": {
    "risco": 0.4303,
    "nivel": "baixo",
    "inscricoes": 86
  },
  "SME-625819": {
    "risco": 0.5324,
    "nivel": "alto",
    "inscricoes": 121
  },
  "SME-625820": {
    "risco": 0.3828,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-716601": {
    "risco": 0.6998,
    "nivel": "alto",
    "inscricoes": 332
  },
  "SME-716602": {
    "risco": 0.4045,
    "nivel": "baixo",
    "inscricoes": 80
  },
  "SME-716603": {
    "risco": 0.6219,
    "nivel": "alto",
    "inscricoes": 206
  },
  "SME-716604": {
    "risco": 0.4719,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-716605": {
    "risco": 0.5871,
    "nivel": "alto",
    "inscricoes": 140
  },
  "SME-716606": {
    "risco": 0.5861,
    "nivel": "alto",
    "inscricoes": 134
  },
  "SME-716607": {
    "risco": 0.62,
    "nivel": "alto",
    "inscricoes": 138
  },
  "SME-716608": {
    "risco": 0.6366,
    "nivel": "alto",
    "inscricoes": 165
  },
  "SME-716609": {
    "risco": 0.7091,
    "nivel": "alto",
    "inscricoes": 462
  },
  "SME-716610": {
    "risco": 0.4663,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-716611": {
    "risco": 0.664,
    "nivel": "alto",
    "inscricoes": 151
  },
  "SME-716612": {
    "risco": 0.4153,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-716613": {
    "risco": 0.7053,
    "nivel": "alto",
    "inscricoes": 316
  },
  "SME-716614": {
    "risco": 0.4986,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-716801": {
    "risco": 0.4532,
    "nivel": "baixo",
    "inscricoes": 88
  },
  "SME-716802": {
    "risco": 0.4209,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-716803": {
    "risco": 0.6134,
    "nivel": "alto",
    "inscricoes": 177
  },
  "SME-716804": {
    "risco": 0.411,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-716805": {
    "risco": 0.5524,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-716806": {
    "risco": 0.5705,
    "nivel": "alto",
    "inscricoes": 122
  },
  "SME-716807": {
    "risco": 0.4975,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-716808": {
    "risco": 0.5474,
    "nivel": "alto",
    "inscricoes": 97
  },
  "SME-716809": {
    "risco": 0.5088,
    "nivel": "alto",
    "inscricoes": 77
  },
  "SME-716812": {
    "risco": 0.3466,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-716813": {
    "risco": 0.5452,
    "nivel": "alto",
    "inscricoes": 105
  },
  "SME-716814": {
    "risco": 0.4646,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-716815": {
    "risco": 0.5295,
    "nivel": "alto",
    "inscricoes": 110
  },
  "SME-716816": {
    "risco": 0.6675,
    "nivel": "alto",
    "inscricoes": 124
  },
  "SME-716818": {
    "risco": 0.649,
    "nivel": "alto",
    "inscricoes": 213
  },
  "SME-716819": {
    "risco": 0.5948,
    "nivel": "alto",
    "inscricoes": 134
  },
  "SME-716820": {
    "risco": 0.5823,
    "nivel": "alto",
    "inscricoes": 121
  },
  "SME-716821": {
    "risco": 0.6099,
    "nivel": "alto",
    "inscricoes": 237
  },
  "SME-716822": {
    "risco": 0.5615,
    "nivel": "alto",
    "inscricoes": 114
  },
  "SME-716823": {
    "risco": 0.5329,
    "nivel": "alto",
    "inscricoes": 110
  },
  "SME-716824": {
    "risco": 0.2434,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-724601": {
    "risco": 0.4636,
    "nivel": "baixo",
    "inscricoes": 105
  },
  "SME-724602": {
    "risco": 0.5416,
    "nivel": "alto",
    "inscricoes": 112
  },
  "SME-724603": {
    "risco": 0.4865,
    "nivel": "baixo",
    "inscricoes": 117
  },
  "SME-724604": {
    "risco": 0.4462,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-724605": {
    "risco": 0.4251,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-724606": {
    "risco": 0.5475,
    "nivel": "alto",
    "inscricoes": 161
  },
  "SME-724801": {
    "risco": 0.5517,
    "nivel": "alto",
    "inscricoes": 175
  },
  "SME-724802": {
    "risco": 0.3714,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-724803": {
    "risco": 0.4134,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-724804": {
    "risco": 0.4788,
    "nivel": "baixo",
    "inscricoes": 135
  },
  "SME-724805": {
    "risco": 0.4175,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-724806": {
    "risco": 0.382,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-724807": {
    "risco": 0.4967,
    "nivel": "baixo",
    "inscricoes": 92
  },
  "SME-724808": {
    "risco": 0.4239,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-724809": {
    "risco": 0.3703,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-734601": {
    "risco": 0.3966,
    "nivel": "baixo",
    "inscricoes": 50
  },
  "SME-734602": {
    "risco": 0.4266,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-734603": {
    "risco": 0.381,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-734801": {
    "risco": 0.4792,
    "nivel": "baixo",
    "inscricoes": 67
  },
  "SME-734802": {
    "risco": 0.6513,
    "nivel": "alto",
    "inscricoes": 180
  },
  "SME-734803": {
    "risco": 0.3741,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-734804": {
    "risco": 0.3731,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-734805": {
    "risco": 0.3302,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-817202": {
    "risco": 0.3761,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-817504": {
    "risco": 0.3428,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-817505": {
    "risco": 0.3116,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-817507": {
    "risco": 0.3003,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-817601": {
    "risco": 0.4144,
    "nivel": "baixo",
    "inscricoes": 159
  },
  "SME-817602": {
    "risco": 0.391,
    "nivel": "baixo",
    "inscricoes": 106
  },
  "SME-817603": {
    "risco": 0.4552,
    "nivel": "baixo",
    "inscricoes": 137
  },
  "SME-817604": {
    "risco": 0.3661,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-817605": {
    "risco": 0.3818,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-817606": {
    "risco": 0.3118,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-817607": {
    "risco": 0.4316,
    "nivel": "baixo",
    "inscricoes": 198
  },
  "SME-817608": {
    "risco": 0.3201,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-817609": {
    "risco": 0.4628,
    "nivel": "baixo",
    "inscricoes": 159
  },
  "SME-817610": {
    "risco": 0.2454,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-817611": {
    "risco": 0.2947,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-817612": {
    "risco": 0.4157,
    "nivel": "baixo",
    "inscricoes": 127
  },
  "SME-817613": {
    "risco": 0.4424,
    "nivel": "baixo",
    "inscricoes": 84
  },
  "SME-817614": {
    "risco": 0.3174,
    "nivel": "baixo",
    "inscricoes": 92
  },
  "SME-817615": {
    "risco": 0.3504,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-817616": {
    "risco": 0.2221,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-817617": {
    "risco": 0.4034,
    "nivel": "baixo",
    "inscricoes": 123
  },
  "SME-817618": {
    "risco": 0.4155,
    "nivel": "baixo",
    "inscricoes": 89
  },
  "SME-817619": {
    "risco": 0.229,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-817801": {
    "risco": 0.4232,
    "nivel": "baixo",
    "inscricoes": 150
  },
  "SME-817802": {
    "risco": 0.3606,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-817803": {
    "risco": 0.2896,
    "nivel": "baixo",
    "inscricoes": 88
  },
  "SME-817804": {
    "risco": 0.4526,
    "nivel": "baixo",
    "inscricoes": 115
  },
  "SME-817805": {
    "risco": 0.3607,
    "nivel": "baixo",
    "inscricoes": 53
  },
  "SME-817806": {
    "risco": 0.3553,
    "nivel": "baixo",
    "inscricoes": 90
  },
  "SME-817807": {
    "risco": 0.3154,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-817808": {
    "risco": 0.4429,
    "nivel": "baixo",
    "inscricoes": 192
  },
  "SME-817809": {
    "risco": 0.2445,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-817810": {
    "risco": 0.3466,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-817814": {
    "risco": 0.5302,
    "nivel": "alto",
    "inscricoes": 207
  },
  "SME-817815": {
    "risco": 0.3799,
    "nivel": "baixo",
    "inscricoes": 108
  },
  "SME-833032": {
    "risco": 0.3948,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-833505": {
    "risco": 0.4584,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-833601": {
    "risco": 0.4064,
    "nivel": "baixo",
    "inscricoes": 111
  },
  "SME-833602": {
    "risco": 0.4388,
    "nivel": "baixo",
    "inscricoes": 117
  },
  "SME-833603": {
    "risco": 0.6344,
    "nivel": "alto",
    "inscricoes": 245
  },
  "SME-833801": {
    "risco": 0.3185,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-833802": {
    "risco": 0.2777,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-833803": {
    "risco": 0.6523,
    "nivel": "alto",
    "inscricoes": 172
  },
  "SME-833805": {
    "risco": 0.5403,
    "nivel": "alto",
    "inscricoes": 66
  },
  "SME-833806": {
    "risco": 0.5102,
    "nivel": "alto",
    "inscricoes": 226
  },
  "SME-833807": {
    "risco": 0.4587,
    "nivel": "baixo",
    "inscricoes": 127
  },
  "SME-833808": {
    "risco": 0.325,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-833809": {
    "risco": 0.4171,
    "nivel": "baixo",
    "inscricoes": 81
  },
  "SME-833810": {
    "risco": 0.4766,
    "nivel": "baixo",
    "inscricoes": 77
  },
  "SME-833811": {
    "risco": 0.5448,
    "nivel": "alto",
    "inscricoes": 206
  },
  "SME-918601": {
    "risco": 0.3965,
    "nivel": "baixo",
    "inscricoes": 105
  },
  "SME-918602": {
    "risco": 0.4387,
    "nivel": "baixo",
    "inscricoes": 112
  },
  "SME-918603": {
    "risco": 0.289,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-918604": {
    "risco": 0.347,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-918605": {
    "risco": 0.3546,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-918606": {
    "risco": 0.4592,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-918607": {
    "risco": 0.5259,
    "nivel": "alto",
    "inscricoes": 154
  },
  "SME-918608": {
    "risco": 0.4929,
    "nivel": "baixo",
    "inscricoes": 116
  },
  "SME-918609": {
    "risco": 0.3733,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-918610": {
    "risco": 0.3648,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-918611": {
    "risco": 0.3317,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-918613": {
    "risco": 0.5444,
    "nivel": "alto",
    "inscricoes": 116
  },
  "SME-918614": {
    "risco": 0.351,
    "nivel": "baixo",
    "inscricoes": 94
  },
  "SME-918615": {
    "risco": 0.3928,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-918616": {
    "risco": 0.4985,
    "nivel": "baixo",
    "inscricoes": 132
  },
  "SME-918617": {
    "risco": 0.4683,
    "nivel": "baixo",
    "inscricoes": 120
  },
  "SME-918618": {
    "risco": 0.448,
    "nivel": "baixo",
    "inscricoes": 112
  },
  "SME-918619": {
    "risco": 0.5794,
    "nivel": "alto",
    "inscricoes": 229
  },
  "SME-918620": {
    "risco": 0.6574,
    "nivel": "alto",
    "inscricoes": 196
  },
  "SME-918621": {
    "risco": 0.4473,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-918801": {
    "risco": 0.3228,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-918802": {
    "risco": 0.3504,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-918803": {
    "risco": 0.4306,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-918804": {
    "risco": 0.2915,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-918805": {
    "risco": 0.404,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-918806": {
    "risco": 0.419,
    "nivel": "baixo",
    "inscricoes": 108
  },
  "SME-918807": {
    "risco": 0.5954,
    "nivel": "alto",
    "inscricoes": 157
  },
  "SME-918808": {
    "risco": 0.5996,
    "nivel": "alto",
    "inscricoes": 153
  },
  "SME-918809": {
    "risco": 0.3928,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-918810": {
    "risco": 0.388,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-918811": {
    "risco": 0.2188,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-918812": {
    "risco": 0.4028,
    "nivel": "baixo",
    "inscricoes": 81
  },
  "SME-918813": {
    "risco": 0.4735,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-918814": {
    "risco": 0.4699,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-918815": {
    "risco": 0.5698,
    "nivel": "alto",
    "inscricoes": 157
  },
  "SME-918816": {
    "risco": 0.3218,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-918817": {
    "risco": 0.505,
    "nivel": "alto",
    "inscricoes": 164
  },
  "SME-918818": {
    "risco": 0.2979,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-918819": {
    "risco": 0.366,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-918820": {
    "risco": 0.3299,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-918821": {
    "risco": 0.4639,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-918822": {
    "risco": 0.5095,
    "nivel": "alto",
    "inscricoes": 107
  },
  "SME-918823": {
    "risco": 0.4222,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-918824": {
    "risco": 0.6025,
    "nivel": "alto",
    "inscricoes": 120
  },
  "SME-918825": {
    "risco": 0.4894,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-918826": {
    "risco": 0.4588,
    "nivel": "baixo",
    "inscricoes": 113
  },
  "SME-918827": {
    "risco": 0.4142,
    "nivel": "baixo",
    "inscricoes": 106
  },
  "SME-918828": {
    "risco": 0.514,
    "nivel": "alto",
    "inscricoes": 140
  },
  "SME-918829": {
    "risco": 0.3521,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-918830": {
    "risco": 0.3715,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-918831": {
    "risco": 0.4137,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-918832": {
    "risco": 0.6078,
    "nivel": "alto",
    "inscricoes": 204
  },
  "SME-918833": {
    "risco": 0.3825,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-918834": {
    "risco": 0.4055,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-918835": {
    "risco": 0.4667,
    "nivel": "baixo",
    "inscricoes": 110
  },
  "SME-918836": {
    "risco": 0.5269,
    "nivel": "alto",
    "inscricoes": 106
  },
  "SME-918837": {
    "risco": 0.5955,
    "nivel": "alto",
    "inscricoes": 194
  },
  "SME-918838": {
    "risco": 0.3693,
    "nivel": "baixo",
    "inscricoes": 64
  },
  "SME-918839": {
    "risco": 0.357,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-1019601": {
    "risco": 0.2151,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-1019602": {
    "risco": 0.4578,
    "nivel": "baixo",
    "inscricoes": 125
  },
  "SME-1019603": {
    "risco": 0.3112,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-1019604": {
    "risco": 0.2135,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-1019605": {
    "risco": 0.2288,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-1019606": {
    "risco": 0.2175,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-1019607": {
    "risco": 0.323,
    "nivel": "baixo",
    "inscricoes": 86
  },
  "SME-1019609": {
    "risco": 0.2767,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-1019610": {
    "risco": 0.2797,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-1019611": {
    "risco": 0.2319,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-1019612": {
    "risco": 0.38,
    "nivel": "baixo",
    "inscricoes": 172
  },
  "SME-1019613": {
    "risco": 0.2074,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-1019614": {
    "risco": 0.4281,
    "nivel": "baixo",
    "inscricoes": 160
  },
  "SME-1019615": {
    "risco": 0.1868,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-1019616": {
    "risco": 0.2206,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-1019618": {
    "risco": 0.2255,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1019619": {
    "risco": 0.223,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-1019620": {
    "risco": 0.2358,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-1019621": {
    "risco": 0.2569,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-1019622": {
    "risco": 0.2648,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-1019623": {
    "risco": 0.3794,
    "nivel": "baixo",
    "inscricoes": 110
  },
  "SME-1019624": {
    "risco": 0.2231,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-1019625": {
    "risco": 0.1649,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-1019626": {
    "risco": 0.1998,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-1019627": {
    "risco": 0.2067,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-1019628": {
    "risco": 0.3372,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-1019630": {
    "risco": 0.242,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-1019631": {
    "risco": 0.2863,
    "nivel": "baixo",
    "inscricoes": 72
  },
  "SME-1019632": {
    "risco": 0.4881,
    "nivel": "baixo",
    "inscricoes": 184
  },
  "SME-1019633": {
    "risco": 0.2615,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-1019801": {
    "risco": 0.3166,
    "nivel": "baixo",
    "inscricoes": 104
  },
  "SME-1019802": {
    "risco": 0.2573,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-1019803": {
    "risco": 0.3237,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-1019804": {
    "risco": 0.2374,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1019805": {
    "risco": 0.2546,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-1019806": {
    "risco": 0.2175,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-1019807": {
    "risco": 0.2317,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-1019808": {
    "risco": 0.2547,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-1019809": {
    "risco": 0.2876,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-1019810": {
    "risco": 0.2258,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-1019811": {
    "risco": 0.268,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1019815": {
    "risco": 0.2315,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-1019818": {
    "risco": 0.3653,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-1019820": {
    "risco": 0.3324,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-1019821": {
    "risco": 0.3407,
    "nivel": "baixo",
    "inscricoes": 80
  },
  "SME-1019822": {
    "risco": 0.2637,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-1019823": {
    "risco": 0.3041,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-1019824": {
    "risco": 0.2684,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-1019826": {
    "risco": 0.3514,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-1019827": {
    "risco": 0.3146,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-1019828": {
    "risco": 0.2638,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-1019829": {
    "risco": 0.1732,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-1019830": {
    "risco": 0.1784,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-1019831": {
    "risco": 0.4908,
    "nivel": "baixo",
    "inscricoes": 150
  },
  "SME-1026601": {
    "risco": 0.3041,
    "nivel": "baixo",
    "inscricoes": 89
  },
  "SME-1026602": {
    "risco": 0.3389,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-1026603": {
    "risco": 0.2406,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-1026604": {
    "risco": 0.442,
    "nivel": "baixo",
    "inscricoes": 161
  },
  "SME-1026801": {
    "risco": 0.2574,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-1026802": {
    "risco": 0.3588,
    "nivel": "baixo",
    "inscricoes": 115
  },
  "SME-1026803": {
    "risco": 0.3218,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-1026805": {
    "risco": 0.6213,
    "nivel": "alto",
    "inscricoes": 198
  },
  "SME-1026806": {
    "risco": 0.2719,
    "nivel": "baixo",
    "inscricoes": 83
  },
  "SME-1026807": {
    "risco": 0.4817,
    "nivel": "baixo",
    "inscricoes": 173
  },
  "SME-1026809": {
    "risco": 0.3586,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-1026810": {
    "risco": 0.5791,
    "nivel": "alto",
    "inscricoes": 266
  },
  "SME-1026811": {
    "risco": 0.2814,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-1120201": {
    "risco": 0.3554,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-1120601": {
    "risco": 0.5759,
    "nivel": "alto",
    "inscricoes": 137
  },
  "SME-1120602": {
    "risco": 0.4095,
    "nivel": "baixo",
    "inscricoes": 104
  },
  "SME-1120603": {
    "risco": 0.4651,
    "nivel": "baixo",
    "inscricoes": 152
  },
  "SME-1120604": {
    "risco": 0.3426,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-1120605": {
    "risco": 0.5567,
    "nivel": "alto",
    "inscricoes": 124
  },
  "SME-1120606": {
    "risco": 0.4749,
    "nivel": "baixo",
    "inscricoes": 127
  },
  "SME-1120801": {
    "risco": 0.3671,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-1120802": {
    "risco": 0.3434,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-1120804": {
    "risco": 0.316,
    "nivel": "baixo",
    "inscricoes": 63
  }
};
