// GERADO por integracao-sme/build_risco.py — NÃO editar à mão.
// Modelo: rio-sme.sme_creche.modelo_risco_alocacao_xgb (ML.PREDICT via bq CLI)
// Fonte: rio-sme.sme_creche.inscricoes_completa · gerado em 2026-08-30T17:32:59+00:00
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
  "generated_at": "2026-08-30T17:32:59+00:00",
  "model": "rio-sme.sme_creche.modelo_risco_alocacao_xgb",
  "model_type": "BOOSTED_TREE_CLASSIFIER (XGBoost) · label: confirmado",
  "source": "rio-sme.sme_creche.inscricoes_completa",
  "unidades": 859,
  "corte_alto": 0.5,
  "min_inscricoes": 5,
  "treino_metricas": {
    "rocAuc": 0.7411,
    "accuracy": 0.6781,
    "f1": 0.7218
  },
  "derivado_de_sintetico": true,
  "aviso": "Risco DERIVADO DE dados SINTÉTICOS via modelo XGBoost demonstrativo; não é estatística oficial da SME."
} as const;

export const RISCO_POR_UNIDADE: Record<string, RiscoUnidade> = {
  "SME-1004": {
    "risco": 0.3899,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1005": {
    "risco": 0.4136,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-1006": {
    "risco": 0.3558,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-1007": {
    "risco": 0.3365,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-1009": {
    "risco": 0.3426,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-1010": {
    "risco": 0.3606,
    "nivel": "baixo",
    "inscricoes": 88
  },
  "SME-2001": {
    "risco": 0.2994,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-2002": {
    "risco": 0.4717,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-2003": {
    "risco": 0.4189,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-2004": {
    "risco": 0.3837,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-2005": {
    "risco": 0.3453,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2006": {
    "risco": 0.398,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2009": {
    "risco": 0.3891,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-2010": {
    "risco": 0.3801,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-2012": {
    "risco": 0.3638,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2013": {
    "risco": 0.3119,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2014": {
    "risco": 0.399,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2015": {
    "risco": 0.3825,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2016": {
    "risco": 0.3975,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2018": {
    "risco": 0.3803,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2019": {
    "risco": 0.3243,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-2020": {
    "risco": 0.4361,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-2022": {
    "risco": 0.4036,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2025": {
    "risco": 0.4028,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-2026": {
    "risco": 0.3888,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2028": {
    "risco": 0.3803,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-2029": {
    "risco": 0.4027,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-2031": {
    "risco": 0.3958,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2032": {
    "risco": 0.3832,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-2034": {
    "risco": 0.3779,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-2035": {
    "risco": 0.3794,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-2036": {
    "risco": 0.3585,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-2037": {
    "risco": 0.3903,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-2038": {
    "risco": 0.3432,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2039": {
    "risco": 0.4103,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-2040": {
    "risco": 0.3851,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2041": {
    "risco": 0.3722,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2042": {
    "risco": 0.3837,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-2043": {
    "risco": 0.3068,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-2044": {
    "risco": 0.3247,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-2045": {
    "risco": 0.3898,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2046": {
    "risco": 0.3667,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-2047": {
    "risco": 0.4058,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2048": {
    "risco": 0.379,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-2049": {
    "risco": 0.3767,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-2052": {
    "risco": 0.3579,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-2053": {
    "risco": 0.4113,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-2054": {
    "risco": 0.4222,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-2055": {
    "risco": 0.3498,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-2056": {
    "risco": 0.3281,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-2057": {
    "risco": 0.4071,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-2058": {
    "risco": 0.415,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-2060": {
    "risco": 0.3891,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-2061": {
    "risco": 0.3349,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-2063": {
    "risco": 0.3535,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-3001": {
    "risco": 0.3947,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-3002": {
    "risco": 0.3772,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-3003": {
    "risco": 0.3283,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-3004": {
    "risco": 0.3284,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-3005": {
    "risco": 0.3576,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-3006": {
    "risco": 0.3791,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-3007": {
    "risco": 0.3406,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-3008": {
    "risco": 0.3862,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-3009": {
    "risco": 0.3712,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-3010": {
    "risco": 0.3579,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-3011": {
    "risco": 0.3276,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-3012": {
    "risco": 0.442,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-3013": {
    "risco": 0.371,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-3014": {
    "risco": 0.3973,
    "nivel": "baixo",
    "inscricoes": 108
  },
  "SME-3015": {
    "risco": 0.3686,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-3016": {
    "risco": 0.3929,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-3017": {
    "risco": 0.3437,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-3018": {
    "risco": 0.3329,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-3019": {
    "risco": 0.3661,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-3020": {
    "risco": 0.351,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-3021": {
    "risco": 0.3646,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-3022": {
    "risco": 0.4566,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-3023": {
    "risco": 0.3343,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-3024": {
    "risco": 0.3643,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-3025": {
    "risco": 0.446,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-3026": {
    "risco": 0.4573,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-3027": {
    "risco": 0.3629,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-3028": {
    "risco": 0.4488,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-3029": {
    "risco": 0.3171,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-3030": {
    "risco": 0.3674,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-3031": {
    "risco": 0.3248,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-3032": {
    "risco": 0.3679,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-3033": {
    "risco": 0.3426,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-3034": {
    "risco": 0.3872,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-3035": {
    "risco": 0.3789,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-3036": {
    "risco": 0.4133,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-3037": {
    "risco": 0.3822,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-3038": {
    "risco": 0.3613,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-3039": {
    "risco": 0.4008,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-3040": {
    "risco": 0.3495,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-3041": {
    "risco": 0.3785,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-4001": {
    "risco": 0.3513,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-4002": {
    "risco": 0.3686,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4003": {
    "risco": 0.3218,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-4004": {
    "risco": 0.3479,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4005": {
    "risco": 0.3873,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-4006": {
    "risco": 0.3952,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-4007": {
    "risco": 0.3347,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4008": {
    "risco": 0.3702,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-4009": {
    "risco": 0.4357,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-4010": {
    "risco": 0.3761,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-4011": {
    "risco": 0.3382,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4012": {
    "risco": 0.3648,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-4013": {
    "risco": 0.3884,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4014": {
    "risco": 0.3841,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-4015": {
    "risco": 0.3896,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-4016": {
    "risco": 0.4153,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-4017": {
    "risco": 0.3621,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-4018": {
    "risco": 0.3812,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-4020": {
    "risco": 0.3982,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4021": {
    "risco": 0.3657,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-4022": {
    "risco": 0.367,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-4023": {
    "risco": 0.3602,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-4024": {
    "risco": 0.3771,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-4025": {
    "risco": 0.3461,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-4026": {
    "risco": 0.3532,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-4027": {
    "risco": 0.3794,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-4028": {
    "risco": 0.3687,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-4029": {
    "risco": 0.3857,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-4030": {
    "risco": 0.3963,
    "nivel": "baixo",
    "inscricoes": 78
  },
  "SME-4032": {
    "risco": 0.4703,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-4034": {
    "risco": 0.4715,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-4035": {
    "risco": 0.4023,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-4036": {
    "risco": 0.3262,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-4037": {
    "risco": 0.3664,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4038": {
    "risco": 0.3805,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-4039": {
    "risco": 0.3751,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-4040": {
    "risco": 0.369,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-4041": {
    "risco": 0.3641,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4042": {
    "risco": 0.3538,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-4043": {
    "risco": 0.3896,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-4044": {
    "risco": 0.3872,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-4045": {
    "risco": 0.3495,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-4046": {
    "risco": 0.3955,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-4047": {
    "risco": 0.3689,
    "nivel": "baixo",
    "inscricoes": 49
  },
  "SME-4048": {
    "risco": 0.3868,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-4049": {
    "risco": 0.3651,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-4050": {
    "risco": 0.3641,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-5001": {
    "risco": 0.5003,
    "nivel": "alto",
    "inscricoes": 51
  },
  "SME-5002": {
    "risco": 0.3573,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-5003": {
    "risco": 0.4314,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-5004": {
    "risco": 0.3734,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-5005": {
    "risco": 0.4297,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-5006": {
    "risco": 0.4911,
    "nivel": "baixo",
    "inscricoes": 115
  },
  "SME-5007": {
    "risco": 0.4482,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-5008": {
    "risco": 0.4213,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-5009": {
    "risco": 0.3618,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-5010": {
    "risco": 0.3946,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-5012": {
    "risco": 0.4565,
    "nivel": "baixo",
    "inscricoes": 68
  },
  "SME-5013": {
    "risco": 0.4297,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-5014": {
    "risco": 0.4835,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-5015": {
    "risco": 0.4676,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-5016": {
    "risco": 0.478,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-6001": {
    "risco": 0.3471,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-6002": {
    "risco": 0.4913,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-6003": {
    "risco": 0.3639,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-6004": {
    "risco": 0.3664,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-6005": {
    "risco": 0.3313,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-6006": {
    "risco": 0.3916,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-6007": {
    "risco": 0.4063,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-6009": {
    "risco": 0.3473,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-6012": {
    "risco": 0.4832,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-6013": {
    "risco": 0.3723,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-6015": {
    "risco": 0.3998,
    "nivel": "baixo",
    "inscricoes": 87
  },
  "SME-6016": {
    "risco": 0.4177,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-6017": {
    "risco": 0.4989,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-6018": {
    "risco": 0.3665,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-7001": {
    "risco": 0.3492,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-7002": {
    "risco": 0.3645,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-7003": {
    "risco": 0.4736,
    "nivel": "baixo",
    "inscricoes": 132
  },
  "SME-7004": {
    "risco": 0.4351,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-7007": {
    "risco": 0.4508,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-7008": {
    "risco": 0.3973,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-7010": {
    "risco": 0.4812,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-7011": {
    "risco": 0.3261,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-7013": {
    "risco": 0.4751,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-7014": {
    "risco": 0.4321,
    "nivel": "baixo",
    "inscricoes": 50
  },
  "SME-7015": {
    "risco": 0.3686,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-7017": {
    "risco": 0.3457,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-7018": {
    "risco": 0.4176,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-7019": {
    "risco": 0.4509,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-7020": {
    "risco": 0.4648,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-7025": {
    "risco": 0.4128,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-7027": {
    "risco": 0.5084,
    "nivel": "alto",
    "inscricoes": 26
  },
  "SME-7034": {
    "risco": 0.4422,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-7035": {
    "risco": 0.4586,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-7036": {
    "risco": 0.486,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-7037": {
    "risco": 0.4439,
    "nivel": "baixo",
    "inscricoes": 93
  },
  "SME-7038": {
    "risco": 0.5106,
    "nivel": "alto",
    "inscricoes": 104
  },
  "SME-7039": {
    "risco": 0.4576,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-7040": {
    "risco": 0.4826,
    "nivel": "baixo",
    "inscricoes": 175
  },
  "SME-7041": {
    "risco": 0.4563,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-7042": {
    "risco": 0.4883,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-7043": {
    "risco": 0.4403,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-7044": {
    "risco": 0.3487,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-7045": {
    "risco": 0.4665,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-7046": {
    "risco": 0.4016,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-8002": {
    "risco": 0.3791,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-8003": {
    "risco": 0.3954,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-8004": {
    "risco": 0.3801,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-8005": {
    "risco": 0.3411,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-8006": {
    "risco": 0.3048,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-8007": {
    "risco": 0.3424,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-8008": {
    "risco": 0.3262,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-8009": {
    "risco": 0.3795,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-8010": {
    "risco": 0.3581,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-8011": {
    "risco": 0.4548,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-8013": {
    "risco": 0.3842,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-8014": {
    "risco": 0.3836,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-8015": {
    "risco": 0.3653,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-8016": {
    "risco": 0.3509,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-8017": {
    "risco": 0.3094,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-8018": {
    "risco": 0.3121,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-8019": {
    "risco": 0.3509,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-8021": {
    "risco": 0.3799,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-8022": {
    "risco": 0.348,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-8023": {
    "risco": 0.3201,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-8024": {
    "risco": 0.3677,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-8025": {
    "risco": 0.4034,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-9001": {
    "risco": 0.4021,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-9002": {
    "risco": 0.3832,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-9003": {
    "risco": 0.4161,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-9004": {
    "risco": 0.3575,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-9008": {
    "risco": 0.4304,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-9009": {
    "risco": 0.4383,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-9010": {
    "risco": 0.418,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-9011": {
    "risco": 0.3931,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-9012": {
    "risco": 0.3582,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-9013": {
    "risco": 0.4086,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-9014": {
    "risco": 0.3719,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-9017": {
    "risco": 0.4119,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-9018": {
    "risco": 0.3083,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-9019": {
    "risco": 0.428,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-9020": {
    "risco": 0.3797,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-9021": {
    "risco": 0.34,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-9022": {
    "risco": 0.3311,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-9023": {
    "risco": 0.3504,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-9024": {
    "risco": 0.3632,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-9025": {
    "risco": 0.4195,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-9026": {
    "risco": 0.3481,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-9027": {
    "risco": 0.3296,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-9028": {
    "risco": 0.425,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-9029": {
    "risco": 0.4162,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-9030": {
    "risco": 0.4098,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-9031": {
    "risco": 0.4329,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-9032": {
    "risco": 0.3818,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-9033": {
    "risco": 0.4084,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-9034": {
    "risco": 0.418,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-9035": {
    "risco": 0.3911,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-9036": {
    "risco": 0.4445,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-9037": {
    "risco": 0.4294,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-9038": {
    "risco": 0.3973,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-9039": {
    "risco": 0.4363,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-9040": {
    "risco": 0.3712,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-9041": {
    "risco": 0.4496,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-9042": {
    "risco": 0.4169,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-9043": {
    "risco": 0.4043,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-9044": {
    "risco": 0.3951,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-9045": {
    "risco": 0.4603,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-9046": {
    "risco": 0.414,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-10001": {
    "risco": 0.2187,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-10004": {
    "risco": 0.2108,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-10005": {
    "risco": 0.3505,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-10006": {
    "risco": 0.2115,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-10008": {
    "risco": 0.3555,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-10009": {
    "risco": 0.2314,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-10010": {
    "risco": 0.214,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-10011": {
    "risco": 0.2199,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-10013": {
    "risco": 0.2415,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10014": {
    "risco": 0.2624,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-10018": {
    "risco": 0.2693,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-10019": {
    "risco": 0.2156,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-10020": {
    "risco": 0.2298,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-10022": {
    "risco": 0.4199,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-10023": {
    "risco": 0.2056,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-10024": {
    "risco": 0.2005,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-10026": {
    "risco": 0.3772,
    "nivel": "baixo",
    "inscricoes": 50
  },
  "SME-10027": {
    "risco": 0.2207,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-10028": {
    "risco": 0.2626,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-10029": {
    "risco": 0.2242,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-10030": {
    "risco": 0.2725,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-10032": {
    "risco": 0.2366,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-10033": {
    "risco": 0.2536,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-10034": {
    "risco": 0.2414,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-10035": {
    "risco": 0.2554,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-10036": {
    "risco": 0.2422,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-10037": {
    "risco": 0.2089,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-10039": {
    "risco": 0.2094,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-10040": {
    "risco": 0.3191,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-10041": {
    "risco": 0.2508,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-10042": {
    "risco": 0.2421,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-10043": {
    "risco": 0.2873,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-10044": {
    "risco": 0.2373,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-10045": {
    "risco": 0.1955,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-10046": {
    "risco": 0.3979,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-10047": {
    "risco": 0.2492,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-10051": {
    "risco": 0.3841,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-10052": {
    "risco": 0.3911,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-10053": {
    "risco": 0.2647,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-10054": {
    "risco": 0.2451,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-10055": {
    "risco": 0.2264,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-10056": {
    "risco": 0.2194,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-10057": {
    "risco": 0.39,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-10058": {
    "risco": 0.2569,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-10059": {
    "risco": 0.2035,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10060": {
    "risco": 0.229,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-10061": {
    "risco": 0.2038,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-10062": {
    "risco": 0.2278,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10063": {
    "risco": 0.2754,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-10064": {
    "risco": 0.3327,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-10065": {
    "risco": 0.2467,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-10066": {
    "risco": 0.2548,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-10067": {
    "risco": 0.239,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-10068": {
    "risco": 0.2618,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-10069": {
    "risco": 0.3875,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-10070": {
    "risco": 0.2672,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-10071": {
    "risco": 0.2981,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-10072": {
    "risco": 0.3863,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-10073": {
    "risco": 0.3189,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-10074": {
    "risco": 0.3475,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-10075": {
    "risco": 0.2611,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-10076": {
    "risco": 0.2616,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-10077": {
    "risco": 0.2528,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-10078": {
    "risco": 0.2916,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-10079": {
    "risco": 0.41,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-10080": {
    "risco": 0.2631,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-10081": {
    "risco": 0.4313,
    "nivel": "baixo",
    "inscricoes": 68
  },
  "SME-10082": {
    "risco": 0.2457,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-10083": {
    "risco": 0.3666,
    "nivel": "baixo",
    "inscricoes": 7
  },
  "SME-10084": {
    "risco": 0.4334,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-10085": {
    "risco": 0.3805,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-11001": {
    "risco": 0.3634,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-11003": {
    "risco": 0.3678,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-11004": {
    "risco": 0.348,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-11006": {
    "risco": 0.3546,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-11007": {
    "risco": 0.3781,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-11008": {
    "risco": 0.3141,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-11009": {
    "risco": 0.3582,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-11010": {
    "risco": 0.4259,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-101601": {
    "risco": 0.3136,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-101602": {
    "risco": 0.4077,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-101603": {
    "risco": 0.3904,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-101604": {
    "risco": 0.2244,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-101605": {
    "risco": 0.3401,
    "nivel": "baixo",
    "inscricoes": 49
  },
  "SME-101606": {
    "risco": 0.3115,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-101607": {
    "risco": 0.4272,
    "nivel": "baixo",
    "inscricoes": 121
  },
  "SME-101801": {
    "risco": 0.3832,
    "nivel": "baixo",
    "inscricoes": 125
  },
  "SME-101802": {
    "risco": 0.4065,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-101803": {
    "risco": 0.4596,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-102601": {
    "risco": 0.3775,
    "nivel": "baixo",
    "inscricoes": 78
  },
  "SME-102602": {
    "risco": 0.3722,
    "nivel": "baixo",
    "inscricoes": 109
  },
  "SME-102604": {
    "risco": 0.5539,
    "nivel": "alto",
    "inscricoes": 120
  },
  "SME-102605": {
    "risco": 0.4527,
    "nivel": "baixo",
    "inscricoes": 124
  },
  "SME-102606": {
    "risco": 0.4556,
    "nivel": "baixo",
    "inscricoes": 124
  },
  "SME-102802": {
    "risco": 0.4947,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-102803": {
    "risco": 0.4633,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-103601": {
    "risco": 0.3224,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-103602": {
    "risco": 0.4011,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-103604": {
    "risco": 0.4553,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-103605": {
    "risco": 0.3518,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-103606": {
    "risco": 0.4184,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-103607": {
    "risco": 0.3097,
    "nivel": "baixo",
    "inscricoes": 89
  },
  "SME-103801": {
    "risco": 0.4477,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-103802": {
    "risco": 0.329,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-103804": {
    "risco": 0.4064,
    "nivel": "baixo",
    "inscricoes": 21
  },
  "SME-103805": {
    "risco": 0.3617,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-103806": {
    "risco": 0.2217,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-103807": {
    "risco": 0.4078,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-107601": {
    "risco": 0.3872,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-107602": {
    "risco": 0.3938,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-107603": {
    "risco": 0.4142,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-107604": {
    "risco": 0.4297,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-107605": {
    "risco": 0.3799,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-107606": {
    "risco": 0.2673,
    "nivel": "baixo",
    "inscricoes": 75
  },
  "SME-107607": {
    "risco": 0.4073,
    "nivel": "baixo",
    "inscricoes": 90
  },
  "SME-107608": {
    "risco": 0.5157,
    "nivel": "alto",
    "inscricoes": 56
  },
  "SME-107609": {
    "risco": 0.3319,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-107610": {
    "risco": 0.4794,
    "nivel": "baixo",
    "inscricoes": 201
  },
  "SME-107801": {
    "risco": 0.3566,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-107802": {
    "risco": 0.4419,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-107803": {
    "risco": 0.2722,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-121001": {
    "risco": 0.3795,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-123601": {
    "risco": 0.3738,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-123603": {
    "risco": 0.428,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-204601": {
    "risco": 0.3808,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-204602": {
    "risco": 0.5718,
    "nivel": "alto",
    "inscricoes": 327
  },
  "SME-204803": {
    "risco": 0.554,
    "nivel": "alto",
    "inscricoes": 27
  },
  "SME-204804": {
    "risco": 0.4368,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-204805": {
    "risco": 0.4685,
    "nivel": "baixo",
    "inscricoes": 102
  },
  "SME-204806": {
    "risco": 0.4205,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-205601": {
    "risco": 0.4862,
    "nivel": "baixo",
    "inscricoes": 169
  },
  "SME-205602": {
    "risco": 0.4451,
    "nivel": "baixo",
    "inscricoes": 59
  },
  "SME-205801": {
    "risco": 0.3853,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-206601": {
    "risco": 0.4045,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-206602": {
    "risco": 0.4212,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-206603": {
    "risco": 0.5152,
    "nivel": "alto",
    "inscricoes": 36
  },
  "SME-206605": {
    "risco": 0.4714,
    "nivel": "baixo",
    "inscricoes": 53
  },
  "SME-206606": {
    "risco": 0.4676,
    "nivel": "baixo",
    "inscricoes": 83
  },
  "SME-208601": {
    "risco": 0.3428,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-208603": {
    "risco": 0.3422,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-208604": {
    "risco": 0.3403,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-208605": {
    "risco": 0.3363,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-208606": {
    "risco": 0.3437,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-208607": {
    "risco": 0.4346,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-208608": {
    "risco": 0.4643,
    "nivel": "baixo",
    "inscricoes": 124
  },
  "SME-208801": {
    "risco": 0.4734,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-208803": {
    "risco": 0.3536,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-208806": {
    "risco": 0.5732,
    "nivel": "alto",
    "inscricoes": 15
  },
  "SME-209601": {
    "risco": 0.4428,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-209602": {
    "risco": 0.395,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-209603": {
    "risco": 0.3861,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-209604": {
    "risco": 0.4444,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-209605": {
    "risco": 0.3823,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-209606": {
    "risco": 0.4154,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-209607": {
    "risco": 0.4341,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-209608": {
    "risco": 0.4437,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-209609": {
    "risco": 0.4379,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-209610": {
    "risco": 0.4454,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-209801": {
    "risco": 0.5513,
    "nivel": "alto",
    "inscricoes": 20
  },
  "SME-209802": {
    "risco": 0.4873,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-209803": {
    "risco": 0.4646,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-209804": {
    "risco": 0.4664,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-227601": {
    "risco": 0.5182,
    "nivel": "alto",
    "inscricoes": 45
  },
  "SME-227602": {
    "risco": 0.4339,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-227801": {
    "risco": 0.458,
    "nivel": "baixo",
    "inscricoes": 150
  },
  "SME-312010": {
    "risco": 0.5023,
    "nivel": "alto",
    "inscricoes": 11
  },
  "SME-312017": {
    "risco": 0.381,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-312502": {
    "risco": 0.4789,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-312601": {
    "risco": 0.4858,
    "nivel": "baixo",
    "inscricoes": 91
  },
  "SME-312602": {
    "risco": 0.5129,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-312603": {
    "risco": 0.4775,
    "nivel": "baixo",
    "inscricoes": 77
  },
  "SME-312801": {
    "risco": 0.4109,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-312802": {
    "risco": 0.4153,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-312803": {
    "risco": 0.3772,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-312804": {
    "risco": 0.5314,
    "nivel": "alto",
    "inscricoes": 89
  },
  "SME-312805": {
    "risco": 0.4448,
    "nivel": "baixo",
    "inscricoes": 118
  },
  "SME-312806": {
    "risco": 0.4245,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-312809": {
    "risco": 0.3968,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-312810": {
    "risco": 0.5249,
    "nivel": "alto",
    "inscricoes": 31
  },
  "SME-312811": {
    "risco": 0.5286,
    "nivel": "alto",
    "inscricoes": 16
  },
  "SME-312812": {
    "risco": 0.5118,
    "nivel": "alto",
    "inscricoes": 49
  },
  "SME-312813": {
    "risco": 0.4279,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-313012": {
    "risco": 0.4981,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-313025": {
    "risco": 0.576,
    "nivel": "alto",
    "inscricoes": 6
  },
  "SME-313601": {
    "risco": 0.5491,
    "nivel": "alto",
    "inscricoes": 37
  },
  "SME-313602": {
    "risco": 0.4036,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-313603": {
    "risco": 0.5301,
    "nivel": "alto",
    "inscricoes": 55
  },
  "SME-313604": {
    "risco": 0.4194,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-313606": {
    "risco": 0.4375,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-313607": {
    "risco": 0.4563,
    "nivel": "baixo",
    "inscricoes": 110
  },
  "SME-313608": {
    "risco": 0.5376,
    "nivel": "alto",
    "inscricoes": 173
  },
  "SME-313609": {
    "risco": 0.3935,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-313610": {
    "risco": 0.42,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-313611": {
    "risco": 0.4615,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-313612": {
    "risco": 0.4628,
    "nivel": "baixo",
    "inscricoes": 90
  },
  "SME-313801": {
    "risco": 0.4874,
    "nivel": "baixo",
    "inscricoes": 86
  },
  "SME-313802": {
    "risco": 0.5037,
    "nivel": "alto",
    "inscricoes": 150
  },
  "SME-313804": {
    "risco": 0.4684,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-313805": {
    "risco": 0.5215,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-313806": {
    "risco": 0.5374,
    "nivel": "alto",
    "inscricoes": 36
  },
  "SME-313809": {
    "risco": 0.5092,
    "nivel": "alto",
    "inscricoes": 75
  },
  "SME-313830": {
    "risco": 0.5431,
    "nivel": "alto",
    "inscricoes": 15
  },
  "SME-328601": {
    "risco": 0.4822,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-328602": {
    "risco": 0.425,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-328604": {
    "risco": 0.4757,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-328801": {
    "risco": 0.5118,
    "nivel": "alto",
    "inscricoes": 143
  },
  "SME-329801": {
    "risco": 0.4708,
    "nivel": "baixo",
    "inscricoes": 133
  },
  "SME-330601": {
    "risco": 0.4457,
    "nivel": "baixo",
    "inscricoes": 79
  },
  "SME-330602": {
    "risco": 0.515,
    "nivel": "alto",
    "inscricoes": 129
  },
  "SME-410601": {
    "risco": 0.4163,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-410602": {
    "risco": 0.4852,
    "nivel": "baixo",
    "inscricoes": 64
  },
  "SME-410603": {
    "risco": 0.4526,
    "nivel": "baixo",
    "inscricoes": 127
  },
  "SME-410801": {
    "risco": 0.5198,
    "nivel": "alto",
    "inscricoes": 216
  },
  "SME-410802": {
    "risco": 0.462,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-410803": {
    "risco": 0.2912,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-410804": {
    "risco": 0.4353,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-410805": {
    "risco": 0.4373,
    "nivel": "baixo",
    "inscricoes": 70
  },
  "SME-410806": {
    "risco": 0.3289,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-410807": {
    "risco": 0.5128,
    "nivel": "alto",
    "inscricoes": 98
  },
  "SME-410808": {
    "risco": 0.4071,
    "nivel": "baixo",
    "inscricoes": 105
  },
  "SME-410810": {
    "risco": 0.4452,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-410811": {
    "risco": 0.4834,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-411601": {
    "risco": 0.4564,
    "nivel": "baixo",
    "inscricoes": 93
  },
  "SME-411602": {
    "risco": 0.4862,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-411603": {
    "risco": 0.4426,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-411604": {
    "risco": 0.4439,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-411605": {
    "risco": 0.4312,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-411607": {
    "risco": 0.5177,
    "nivel": "alto",
    "inscricoes": 28
  },
  "SME-411609": {
    "risco": 0.4468,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-411610": {
    "risco": 0.4804,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-411801": {
    "risco": 0.548,
    "nivel": "alto",
    "inscricoes": 242
  },
  "SME-411802": {
    "risco": 0.4863,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-411803": {
    "risco": 0.4495,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-411804": {
    "risco": 0.4925,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-411805": {
    "risco": 0.2111,
    "nivel": "baixo",
    "inscricoes": 10
  },
  "SME-411806": {
    "risco": 0.3833,
    "nivel": "baixo",
    "inscricoes": 5
  },
  "SME-430601": {
    "risco": 0.4219,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-430602": {
    "risco": 0.4077,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-430603": {
    "risco": 0.4426,
    "nivel": "baixo",
    "inscricoes": 154
  },
  "SME-430604": {
    "risco": 0.4313,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-430605": {
    "risco": 0.4193,
    "nivel": "baixo",
    "inscricoes": 26
  },
  "SME-430607": {
    "risco": 0.4289,
    "nivel": "baixo",
    "inscricoes": 20
  },
  "SME-430801": {
    "risco": 0.418,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-430802": {
    "risco": 0.4464,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-430803": {
    "risco": 0.4149,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-430805": {
    "risco": 0.4541,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-430806": {
    "risco": 0.4533,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-430807": {
    "risco": 0.438,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-430808": {
    "risco": 0.4275,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-430809": {
    "risco": 0.4587,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-430810": {
    "risco": 0.4321,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-430811": {
    "risco": 0.447,
    "nivel": "baixo",
    "inscricoes": 72
  },
  "SME-430812": {
    "risco": 0.4481,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-430813": {
    "risco": 0.2624,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-430815": {
    "risco": 0.343,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-431601": {
    "risco": 0.4751,
    "nivel": "baixo",
    "inscricoes": 32
  },
  "SME-431602": {
    "risco": 0.4803,
    "nivel": "baixo",
    "inscricoes": 98
  },
  "SME-431603": {
    "risco": 0.4504,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-431604": {
    "risco": 0.4742,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-431605": {
    "risco": 0.4595,
    "nivel": "baixo",
    "inscricoes": 82
  },
  "SME-431606": {
    "risco": 0.4608,
    "nivel": "baixo",
    "inscricoes": 58
  },
  "SME-431607": {
    "risco": 0.4003,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-431608": {
    "risco": 0.5202,
    "nivel": "alto",
    "inscricoes": 32
  },
  "SME-431801": {
    "risco": 0.4053,
    "nivel": "baixo",
    "inscricoes": 13
  },
  "SME-431802": {
    "risco": 0.4707,
    "nivel": "baixo",
    "inscricoes": 84
  },
  "SME-431803": {
    "risco": 0.3647,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-431804": {
    "risco": 0.4535,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-514009": {
    "risco": 0.4905,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-514028": {
    "risco": 0.4937,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-514501": {
    "risco": 0.5523,
    "nivel": "alto",
    "inscricoes": 32
  },
  "SME-514601": {
    "risco": 0.489,
    "nivel": "baixo",
    "inscricoes": 67
  },
  "SME-514602": {
    "risco": 0.6084,
    "nivel": "alto",
    "inscricoes": 274
  },
  "SME-514603": {
    "risco": 0.5111,
    "nivel": "alto",
    "inscricoes": 42
  },
  "SME-514604": {
    "risco": 0.5365,
    "nivel": "alto",
    "inscricoes": 32
  },
  "SME-514605": {
    "risco": 0.5656,
    "nivel": "alto",
    "inscricoes": 75
  },
  "SME-514606": {
    "risco": 0.5216,
    "nivel": "alto",
    "inscricoes": 79
  },
  "SME-514607": {
    "risco": 0.5687,
    "nivel": "alto",
    "inscricoes": 71
  },
  "SME-514608": {
    "risco": 0.5124,
    "nivel": "alto",
    "inscricoes": 79
  },
  "SME-514609": {
    "risco": 0.5492,
    "nivel": "alto",
    "inscricoes": 122
  },
  "SME-514801": {
    "risco": 0.569,
    "nivel": "alto",
    "inscricoes": 101
  },
  "SME-514802": {
    "risco": 0.3438,
    "nivel": "baixo",
    "inscricoes": 49
  },
  "SME-514803": {
    "risco": 0.3948,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-514804": {
    "risco": 0.5139,
    "nivel": "alto",
    "inscricoes": 22
  },
  "SME-515015": {
    "risco": 0.5212,
    "nivel": "alto",
    "inscricoes": 39
  },
  "SME-515021": {
    "risco": 0.4459,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-515046": {
    "risco": 0.4623,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-515053": {
    "risco": 0.5432,
    "nivel": "alto",
    "inscricoes": 24
  },
  "SME-515064": {
    "risco": 0.3425,
    "nivel": "baixo",
    "inscricoes": 6
  },
  "SME-515501": {
    "risco": 0.5542,
    "nivel": "alto",
    "inscricoes": 22
  },
  "SME-515503": {
    "risco": 0.5231,
    "nivel": "alto",
    "inscricoes": 30
  },
  "SME-515601": {
    "risco": 0.5661,
    "nivel": "alto",
    "inscricoes": 41
  },
  "SME-515602": {
    "risco": 0.552,
    "nivel": "alto",
    "inscricoes": 174
  },
  "SME-515604": {
    "risco": 0.5936,
    "nivel": "alto",
    "inscricoes": 117
  },
  "SME-515605": {
    "risco": 0.5575,
    "nivel": "alto",
    "inscricoes": 107
  },
  "SME-515606": {
    "risco": 0.62,
    "nivel": "alto",
    "inscricoes": 111
  },
  "SME-515607": {
    "risco": 0.6099,
    "nivel": "alto",
    "inscricoes": 173
  },
  "SME-515608": {
    "risco": 0.5303,
    "nivel": "alto",
    "inscricoes": 51
  },
  "SME-515610": {
    "risco": 0.5646,
    "nivel": "alto",
    "inscricoes": 27
  },
  "SME-515611": {
    "risco": 0.3867,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-515612": {
    "risco": 0.4001,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-515613": {
    "risco": 0.498,
    "nivel": "baixo",
    "inscricoes": 108
  },
  "SME-515801": {
    "risco": 0.6078,
    "nivel": "alto",
    "inscricoes": 293
  },
  "SME-515802": {
    "risco": 0.376,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-515803": {
    "risco": 0.5917,
    "nivel": "alto",
    "inscricoes": 41
  },
  "SME-515804": {
    "risco": 0.584,
    "nivel": "alto",
    "inscricoes": 51
  },
  "SME-515805": {
    "risco": 0.5591,
    "nivel": "alto",
    "inscricoes": 34
  },
  "SME-515807": {
    "risco": 0.4562,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-515808": {
    "risco": 0.4317,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-515809": {
    "risco": 0.6111,
    "nivel": "alto",
    "inscricoes": 208
  },
  "SME-515810": {
    "risco": 0.5831,
    "nivel": "alto",
    "inscricoes": 113
  },
  "SME-622023": {
    "risco": 0.453,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-622202": {
    "risco": 0.4741,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-622601": {
    "risco": 0.5507,
    "nivel": "alto",
    "inscricoes": 97
  },
  "SME-622602": {
    "risco": 0.5454,
    "nivel": "alto",
    "inscricoes": 63
  },
  "SME-622603": {
    "risco": 0.4166,
    "nivel": "baixo",
    "inscricoes": 129
  },
  "SME-622801": {
    "risco": 0.5413,
    "nivel": "alto",
    "inscricoes": 187
  },
  "SME-622802": {
    "risco": 0.5713,
    "nivel": "alto",
    "inscricoes": 39
  },
  "SME-622804": {
    "risco": 0.5526,
    "nivel": "alto",
    "inscricoes": 173
  },
  "SME-622805": {
    "risco": 0.5148,
    "nivel": "alto",
    "inscricoes": 98
  },
  "SME-622809": {
    "risco": 0.4639,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-622810": {
    "risco": 0.3452,
    "nivel": "baixo",
    "inscricoes": 9
  },
  "SME-625601": {
    "risco": 0.5279,
    "nivel": "alto",
    "inscricoes": 79
  },
  "SME-625602": {
    "risco": 0.4584,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-625603": {
    "risco": 0.552,
    "nivel": "alto",
    "inscricoes": 65
  },
  "SME-625604": {
    "risco": 0.5629,
    "nivel": "alto",
    "inscricoes": 223
  },
  "SME-625605": {
    "risco": 0.442,
    "nivel": "baixo",
    "inscricoes": 73
  },
  "SME-625606": {
    "risco": 0.451,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-625607": {
    "risco": 0.5207,
    "nivel": "alto",
    "inscricoes": 67
  },
  "SME-625608": {
    "risco": 0.5268,
    "nivel": "alto",
    "inscricoes": 68
  },
  "SME-625609": {
    "risco": 0.519,
    "nivel": "alto",
    "inscricoes": 65
  },
  "SME-625610": {
    "risco": 0.573,
    "nivel": "alto",
    "inscricoes": 53
  },
  "SME-625611": {
    "risco": 0.5461,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-625612": {
    "risco": 0.5542,
    "nivel": "alto",
    "inscricoes": 122
  },
  "SME-625614": {
    "risco": 0.513,
    "nivel": "alto",
    "inscricoes": 135
  },
  "SME-625615": {
    "risco": 0.5011,
    "nivel": "alto",
    "inscricoes": 115
  },
  "SME-625616": {
    "risco": 0.5405,
    "nivel": "alto",
    "inscricoes": 57
  },
  "SME-625801": {
    "risco": 0.535,
    "nivel": "alto",
    "inscricoes": 82
  },
  "SME-625802": {
    "risco": 0.5071,
    "nivel": "alto",
    "inscricoes": 74
  },
  "SME-625803": {
    "risco": 0.4989,
    "nivel": "baixo",
    "inscricoes": 76
  },
  "SME-625804": {
    "risco": 0.4747,
    "nivel": "baixo",
    "inscricoes": 87
  },
  "SME-625806": {
    "risco": 0.4907,
    "nivel": "baixo",
    "inscricoes": 12
  },
  "SME-625807": {
    "risco": 0.5281,
    "nivel": "alto",
    "inscricoes": 30
  },
  "SME-625813": {
    "risco": 0.4844,
    "nivel": "baixo",
    "inscricoes": 55
  },
  "SME-625814": {
    "risco": 0.5538,
    "nivel": "alto",
    "inscricoes": 77
  },
  "SME-625815": {
    "risco": 0.4948,
    "nivel": "baixo",
    "inscricoes": 77
  },
  "SME-625816": {
    "risco": 0.4867,
    "nivel": "baixo",
    "inscricoes": 126
  },
  "SME-625817": {
    "risco": 0.4886,
    "nivel": "baixo",
    "inscricoes": 83
  },
  "SME-625818": {
    "risco": 0.4734,
    "nivel": "baixo",
    "inscricoes": 86
  },
  "SME-625819": {
    "risco": 0.4697,
    "nivel": "baixo",
    "inscricoes": 121
  },
  "SME-625820": {
    "risco": 0.4555,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-716601": {
    "risco": 0.6213,
    "nivel": "alto",
    "inscricoes": 332
  },
  "SME-716602": {
    "risco": 0.4752,
    "nivel": "baixo",
    "inscricoes": 80
  },
  "SME-716603": {
    "risco": 0.5611,
    "nivel": "alto",
    "inscricoes": 206
  },
  "SME-716604": {
    "risco": 0.5556,
    "nivel": "alto",
    "inscricoes": 69
  },
  "SME-716605": {
    "risco": 0.5667,
    "nivel": "alto",
    "inscricoes": 140
  },
  "SME-716606": {
    "risco": 0.5629,
    "nivel": "alto",
    "inscricoes": 134
  },
  "SME-716607": {
    "risco": 0.5795,
    "nivel": "alto",
    "inscricoes": 138
  },
  "SME-716608": {
    "risco": 0.6015,
    "nivel": "alto",
    "inscricoes": 165
  },
  "SME-716609": {
    "risco": 0.6418,
    "nivel": "alto",
    "inscricoes": 462
  },
  "SME-716610": {
    "risco": 0.5432,
    "nivel": "alto",
    "inscricoes": 82
  },
  "SME-716611": {
    "risco": 0.6268,
    "nivel": "alto",
    "inscricoes": 151
  },
  "SME-716612": {
    "risco": 0.5511,
    "nivel": "alto",
    "inscricoes": 54
  },
  "SME-716613": {
    "risco": 0.6285,
    "nivel": "alto",
    "inscricoes": 316
  },
  "SME-716614": {
    "risco": 0.5387,
    "nivel": "alto",
    "inscricoes": 103
  },
  "SME-716801": {
    "risco": 0.5549,
    "nivel": "alto",
    "inscricoes": 88
  },
  "SME-716802": {
    "risco": 0.5418,
    "nivel": "alto",
    "inscricoes": 54
  },
  "SME-716803": {
    "risco": 0.5789,
    "nivel": "alto",
    "inscricoes": 177
  },
  "SME-716804": {
    "risco": 0.5809,
    "nivel": "alto",
    "inscricoes": 19
  },
  "SME-716805": {
    "risco": 0.6346,
    "nivel": "alto",
    "inscricoes": 100
  },
  "SME-716806": {
    "risco": 0.5685,
    "nivel": "alto",
    "inscricoes": 122
  },
  "SME-716807": {
    "risco": 0.5499,
    "nivel": "alto",
    "inscricoes": 98
  },
  "SME-716808": {
    "risco": 0.5853,
    "nivel": "alto",
    "inscricoes": 97
  },
  "SME-716809": {
    "risco": 0.6021,
    "nivel": "alto",
    "inscricoes": 77
  },
  "SME-716812": {
    "risco": 0.5191,
    "nivel": "alto",
    "inscricoes": 43
  },
  "SME-716813": {
    "risco": 0.5888,
    "nivel": "alto",
    "inscricoes": 105
  },
  "SME-716814": {
    "risco": 0.5907,
    "nivel": "alto",
    "inscricoes": 71
  },
  "SME-716815": {
    "risco": 0.5241,
    "nivel": "alto",
    "inscricoes": 110
  },
  "SME-716816": {
    "risco": 0.6275,
    "nivel": "alto",
    "inscricoes": 124
  },
  "SME-716818": {
    "risco": 0.5882,
    "nivel": "alto",
    "inscricoes": 213
  },
  "SME-716819": {
    "risco": 0.5904,
    "nivel": "alto",
    "inscricoes": 134
  },
  "SME-716820": {
    "risco": 0.578,
    "nivel": "alto",
    "inscricoes": 121
  },
  "SME-716821": {
    "risco": 0.5611,
    "nivel": "alto",
    "inscricoes": 237
  },
  "SME-716822": {
    "risco": 0.609,
    "nivel": "alto",
    "inscricoes": 114
  },
  "SME-716823": {
    "risco": 0.5626,
    "nivel": "alto",
    "inscricoes": 110
  },
  "SME-716824": {
    "risco": 0.4312,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-724601": {
    "risco": 0.4659,
    "nivel": "baixo",
    "inscricoes": 105
  },
  "SME-724602": {
    "risco": 0.5494,
    "nivel": "alto",
    "inscricoes": 112
  },
  "SME-724603": {
    "risco": 0.4976,
    "nivel": "baixo",
    "inscricoes": 117
  },
  "SME-724604": {
    "risco": 0.5418,
    "nivel": "alto",
    "inscricoes": 34
  },
  "SME-724605": {
    "risco": 0.5277,
    "nivel": "alto",
    "inscricoes": 62
  },
  "SME-724606": {
    "risco": 0.5347,
    "nivel": "alto",
    "inscricoes": 161
  },
  "SME-724801": {
    "risco": 0.4822,
    "nivel": "baixo",
    "inscricoes": 175
  },
  "SME-724802": {
    "risco": 0.4634,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-724803": {
    "risco": 0.4515,
    "nivel": "baixo",
    "inscricoes": 57
  },
  "SME-724804": {
    "risco": 0.4953,
    "nivel": "baixo",
    "inscricoes": 135
  },
  "SME-724805": {
    "risco": 0.5411,
    "nivel": "alto",
    "inscricoes": 31
  },
  "SME-724806": {
    "risco": 0.4522,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-724807": {
    "risco": 0.5618,
    "nivel": "alto",
    "inscricoes": 92
  },
  "SME-724808": {
    "risco": 0.4428,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-724809": {
    "risco": 0.4868,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-734601": {
    "risco": 0.5043,
    "nivel": "alto",
    "inscricoes": 50
  },
  "SME-734602": {
    "risco": 0.5326,
    "nivel": "alto",
    "inscricoes": 55
  },
  "SME-734603": {
    "risco": 0.5442,
    "nivel": "alto",
    "inscricoes": 35
  },
  "SME-734801": {
    "risco": 0.5464,
    "nivel": "alto",
    "inscricoes": 67
  },
  "SME-734802": {
    "risco": 0.5872,
    "nivel": "alto",
    "inscricoes": 180
  },
  "SME-734803": {
    "risco": 0.5289,
    "nivel": "alto",
    "inscricoes": 21
  },
  "SME-734804": {
    "risco": 0.5072,
    "nivel": "alto",
    "inscricoes": 47
  },
  "SME-734805": {
    "risco": 0.4411,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-817202": {
    "risco": 0.4283,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-817504": {
    "risco": 0.4236,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-817505": {
    "risco": 0.4074,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-817507": {
    "risco": 0.3901,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-817601": {
    "risco": 0.3958,
    "nivel": "baixo",
    "inscricoes": 159
  },
  "SME-817602": {
    "risco": 0.3978,
    "nivel": "baixo",
    "inscricoes": 106
  },
  "SME-817603": {
    "risco": 0.3914,
    "nivel": "baixo",
    "inscricoes": 137
  },
  "SME-817604": {
    "risco": 0.4021,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-817605": {
    "risco": 0.4209,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-817606": {
    "risco": 0.3781,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-817607": {
    "risco": 0.4002,
    "nivel": "baixo",
    "inscricoes": 198
  },
  "SME-817608": {
    "risco": 0.3647,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-817609": {
    "risco": 0.4358,
    "nivel": "baixo",
    "inscricoes": 159
  },
  "SME-817610": {
    "risco": 0.3831,
    "nivel": "baixo",
    "inscricoes": 47
  },
  "SME-817611": {
    "risco": 0.3469,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-817612": {
    "risco": 0.3866,
    "nivel": "baixo",
    "inscricoes": 127
  },
  "SME-817613": {
    "risco": 0.4436,
    "nivel": "baixo",
    "inscricoes": 84
  },
  "SME-817614": {
    "risco": 0.3842,
    "nivel": "baixo",
    "inscricoes": 92
  },
  "SME-817615": {
    "risco": 0.4338,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-817616": {
    "risco": 0.243,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-817617": {
    "risco": 0.3747,
    "nivel": "baixo",
    "inscricoes": 123
  },
  "SME-817618": {
    "risco": 0.4341,
    "nivel": "baixo",
    "inscricoes": 89
  },
  "SME-817619": {
    "risco": 0.256,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-817801": {
    "risco": 0.3825,
    "nivel": "baixo",
    "inscricoes": 150
  },
  "SME-817802": {
    "risco": 0.3941,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-817803": {
    "risco": 0.3314,
    "nivel": "baixo",
    "inscricoes": 88
  },
  "SME-817804": {
    "risco": 0.4163,
    "nivel": "baixo",
    "inscricoes": 115
  },
  "SME-817805": {
    "risco": 0.4162,
    "nivel": "baixo",
    "inscricoes": 53
  },
  "SME-817806": {
    "risco": 0.3565,
    "nivel": "baixo",
    "inscricoes": 90
  },
  "SME-817807": {
    "risco": 0.2982,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-817808": {
    "risco": 0.4063,
    "nivel": "baixo",
    "inscricoes": 192
  },
  "SME-817809": {
    "risco": 0.2941,
    "nivel": "baixo",
    "inscricoes": 39
  },
  "SME-817810": {
    "risco": 0.405,
    "nivel": "baixo",
    "inscricoes": 61
  },
  "SME-817814": {
    "risco": 0.455,
    "nivel": "baixo",
    "inscricoes": 207
  },
  "SME-817815": {
    "risco": 0.3417,
    "nivel": "baixo",
    "inscricoes": 108
  },
  "SME-833032": {
    "risco": 0.4769,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-833505": {
    "risco": 0.6164,
    "nivel": "alto",
    "inscricoes": 35
  },
  "SME-833601": {
    "risco": 0.3728,
    "nivel": "baixo",
    "inscricoes": 111
  },
  "SME-833602": {
    "risco": 0.3975,
    "nivel": "baixo",
    "inscricoes": 117
  },
  "SME-833603": {
    "risco": 0.5905,
    "nivel": "alto",
    "inscricoes": 245
  },
  "SME-833801": {
    "risco": 0.4557,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-833802": {
    "risco": 0.3084,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-833803": {
    "risco": 0.6058,
    "nivel": "alto",
    "inscricoes": 172
  },
  "SME-833805": {
    "risco": 0.6035,
    "nivel": "alto",
    "inscricoes": 66
  },
  "SME-833806": {
    "risco": 0.4534,
    "nivel": "baixo",
    "inscricoes": 226
  },
  "SME-833807": {
    "risco": 0.4147,
    "nivel": "baixo",
    "inscricoes": 127
  },
  "SME-833808": {
    "risco": 0.3215,
    "nivel": "baixo",
    "inscricoes": 69
  },
  "SME-833809": {
    "risco": 0.3775,
    "nivel": "baixo",
    "inscricoes": 81
  },
  "SME-833810": {
    "risco": 0.4977,
    "nivel": "baixo",
    "inscricoes": 77
  },
  "SME-833811": {
    "risco": 0.4798,
    "nivel": "baixo",
    "inscricoes": 206
  },
  "SME-918601": {
    "risco": 0.4061,
    "nivel": "baixo",
    "inscricoes": 105
  },
  "SME-918602": {
    "risco": 0.4259,
    "nivel": "baixo",
    "inscricoes": 112
  },
  "SME-918603": {
    "risco": 0.3444,
    "nivel": "baixo",
    "inscricoes": 51
  },
  "SME-918604": {
    "risco": 0.4234,
    "nivel": "baixo",
    "inscricoes": 34
  },
  "SME-918605": {
    "risco": 0.3814,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-918606": {
    "risco": 0.5382,
    "nivel": "alto",
    "inscricoes": 63
  },
  "SME-918607": {
    "risco": 0.4933,
    "nivel": "baixo",
    "inscricoes": 154
  },
  "SME-918608": {
    "risco": 0.4925,
    "nivel": "baixo",
    "inscricoes": 116
  },
  "SME-918609": {
    "risco": 0.4171,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-918610": {
    "risco": 0.4692,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-918611": {
    "risco": 0.472,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-918613": {
    "risco": 0.5333,
    "nivel": "alto",
    "inscricoes": 116
  },
  "SME-918614": {
    "risco": 0.4423,
    "nivel": "baixo",
    "inscricoes": 94
  },
  "SME-918615": {
    "risco": 0.4416,
    "nivel": "baixo",
    "inscricoes": 66
  },
  "SME-918616": {
    "risco": 0.4699,
    "nivel": "baixo",
    "inscricoes": 132
  },
  "SME-918617": {
    "risco": 0.4127,
    "nivel": "baixo",
    "inscricoes": 120
  },
  "SME-918618": {
    "risco": 0.4374,
    "nivel": "baixo",
    "inscricoes": 112
  },
  "SME-918619": {
    "risco": 0.5369,
    "nivel": "alto",
    "inscricoes": 229
  },
  "SME-918620": {
    "risco": 0.5754,
    "nivel": "alto",
    "inscricoes": 196
  },
  "SME-918621": {
    "risco": 0.5112,
    "nivel": "alto",
    "inscricoes": 71
  },
  "SME-918801": {
    "risco": 0.3983,
    "nivel": "baixo",
    "inscricoes": 63
  },
  "SME-918802": {
    "risco": 0.3774,
    "nivel": "baixo",
    "inscricoes": 99
  },
  "SME-918803": {
    "risco": 0.5216,
    "nivel": "alto",
    "inscricoes": 71
  },
  "SME-918804": {
    "risco": 0.3752,
    "nivel": "baixo",
    "inscricoes": 30
  },
  "SME-918805": {
    "risco": 0.4111,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-918806": {
    "risco": 0.4524,
    "nivel": "baixo",
    "inscricoes": 108
  },
  "SME-918807": {
    "risco": 0.5637,
    "nivel": "alto",
    "inscricoes": 157
  },
  "SME-918808": {
    "risco": 0.5759,
    "nivel": "alto",
    "inscricoes": 153
  },
  "SME-918809": {
    "risco": 0.5499,
    "nivel": "alto",
    "inscricoes": 19
  },
  "SME-918810": {
    "risco": 0.4622,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-918811": {
    "risco": 0.3442,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-918812": {
    "risco": 0.416,
    "nivel": "baixo",
    "inscricoes": 81
  },
  "SME-918813": {
    "risco": 0.5365,
    "nivel": "alto",
    "inscricoes": 66
  },
  "SME-918814": {
    "risco": 0.5173,
    "nivel": "alto",
    "inscricoes": 99
  },
  "SME-918815": {
    "risco": 0.5344,
    "nivel": "alto",
    "inscricoes": 157
  },
  "SME-918816": {
    "risco": 0.4929,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-918817": {
    "risco": 0.4907,
    "nivel": "baixo",
    "inscricoes": 164
  },
  "SME-918818": {
    "risco": 0.3554,
    "nivel": "baixo",
    "inscricoes": 46
  },
  "SME-918819": {
    "risco": 0.5377,
    "nivel": "alto",
    "inscricoes": 20
  },
  "SME-918820": {
    "risco": 0.5159,
    "nivel": "alto",
    "inscricoes": 23
  },
  "SME-918821": {
    "risco": 0.5156,
    "nivel": "alto",
    "inscricoes": 79
  },
  "SME-918822": {
    "risco": 0.5573,
    "nivel": "alto",
    "inscricoes": 107
  },
  "SME-918823": {
    "risco": 0.5076,
    "nivel": "alto",
    "inscricoes": 61
  },
  "SME-918824": {
    "risco": 0.5739,
    "nivel": "alto",
    "inscricoes": 120
  },
  "SME-918825": {
    "risco": 0.5558,
    "nivel": "alto",
    "inscricoes": 95
  },
  "SME-918826": {
    "risco": 0.4616,
    "nivel": "baixo",
    "inscricoes": 113
  },
  "SME-918827": {
    "risco": 0.454,
    "nivel": "baixo",
    "inscricoes": 106
  },
  "SME-918828": {
    "risco": 0.4658,
    "nivel": "baixo",
    "inscricoes": 140
  },
  "SME-918829": {
    "risco": 0.3984,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-918830": {
    "risco": 0.5285,
    "nivel": "alto",
    "inscricoes": 40
  },
  "SME-918831": {
    "risco": 0.4431,
    "nivel": "baixo",
    "inscricoes": 85
  },
  "SME-918832": {
    "risco": 0.5133,
    "nivel": "alto",
    "inscricoes": 204
  },
  "SME-918833": {
    "risco": 0.4304,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-918834": {
    "risco": 0.4526,
    "nivel": "baixo",
    "inscricoes": 62
  },
  "SME-918835": {
    "risco": 0.4688,
    "nivel": "baixo",
    "inscricoes": 110
  },
  "SME-918836": {
    "risco": 0.5475,
    "nivel": "alto",
    "inscricoes": 106
  },
  "SME-918837": {
    "risco": 0.5427,
    "nivel": "alto",
    "inscricoes": 194
  },
  "SME-918838": {
    "risco": 0.4558,
    "nivel": "baixo",
    "inscricoes": 64
  },
  "SME-918839": {
    "risco": 0.5177,
    "nivel": "alto",
    "inscricoes": 30
  },
  "SME-1019601": {
    "risco": 0.2521,
    "nivel": "baixo",
    "inscricoes": 18
  },
  "SME-1019602": {
    "risco": 0.346,
    "nivel": "baixo",
    "inscricoes": 125
  },
  "SME-1019603": {
    "risco": 0.3958,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-1019604": {
    "risco": 0.245,
    "nivel": "baixo",
    "inscricoes": 31
  },
  "SME-1019605": {
    "risco": 0.2771,
    "nivel": "baixo",
    "inscricoes": 40
  },
  "SME-1019606": {
    "risco": 0.2637,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-1019607": {
    "risco": 0.3633,
    "nivel": "baixo",
    "inscricoes": 86
  },
  "SME-1019609": {
    "risco": 0.2984,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-1019610": {
    "risco": 0.3504,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-1019611": {
    "risco": 0.2827,
    "nivel": "baixo",
    "inscricoes": 27
  },
  "SME-1019612": {
    "risco": 0.332,
    "nivel": "baixo",
    "inscricoes": 172
  },
  "SME-1019613": {
    "risco": 0.2626,
    "nivel": "baixo",
    "inscricoes": 36
  },
  "SME-1019614": {
    "risco": 0.4095,
    "nivel": "baixo",
    "inscricoes": 160
  },
  "SME-1019615": {
    "risco": 0.2342,
    "nivel": "baixo",
    "inscricoes": 15
  },
  "SME-1019616": {
    "risco": 0.284,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-1019618": {
    "risco": 0.2661,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1019619": {
    "risco": 0.2563,
    "nivel": "baixo",
    "inscricoes": 22
  },
  "SME-1019620": {
    "risco": 0.2713,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-1019621": {
    "risco": 0.3124,
    "nivel": "baixo",
    "inscricoes": 28
  },
  "SME-1019622": {
    "risco": 0.3203,
    "nivel": "baixo",
    "inscricoes": 11
  },
  "SME-1019623": {
    "risco": 0.404,
    "nivel": "baixo",
    "inscricoes": 110
  },
  "SME-1019624": {
    "risco": 0.2819,
    "nivel": "baixo",
    "inscricoes": 16
  },
  "SME-1019625": {
    "risco": 0.2627,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-1019626": {
    "risco": 0.2711,
    "nivel": "baixo",
    "inscricoes": 17
  },
  "SME-1019627": {
    "risco": 0.2534,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-1019628": {
    "risco": 0.3509,
    "nivel": "baixo",
    "inscricoes": 56
  },
  "SME-1019630": {
    "risco": 0.2858,
    "nivel": "baixo",
    "inscricoes": 41
  },
  "SME-1019631": {
    "risco": 0.3021,
    "nivel": "baixo",
    "inscricoes": 72
  },
  "SME-1019632": {
    "risco": 0.4231,
    "nivel": "baixo",
    "inscricoes": 184
  },
  "SME-1019633": {
    "risco": 0.3192,
    "nivel": "baixo",
    "inscricoes": 37
  },
  "SME-1019801": {
    "risco": 0.3073,
    "nivel": "baixo",
    "inscricoes": 104
  },
  "SME-1019802": {
    "risco": 0.3539,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-1019803": {
    "risco": 0.2867,
    "nivel": "baixo",
    "inscricoes": 95
  },
  "SME-1019804": {
    "risco": 0.3118,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1019805": {
    "risco": 0.3312,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-1019806": {
    "risco": 0.267,
    "nivel": "baixo",
    "inscricoes": 29
  },
  "SME-1019807": {
    "risco": 0.2771,
    "nivel": "baixo",
    "inscricoes": 38
  },
  "SME-1019808": {
    "risco": 0.3206,
    "nivel": "baixo",
    "inscricoes": 52
  },
  "SME-1019809": {
    "risco": 0.322,
    "nivel": "baixo",
    "inscricoes": 43
  },
  "SME-1019810": {
    "risco": 0.283,
    "nivel": "baixo",
    "inscricoes": 24
  },
  "SME-1019811": {
    "risco": 0.3425,
    "nivel": "baixo",
    "inscricoes": 25
  },
  "SME-1019815": {
    "risco": 0.2919,
    "nivel": "baixo",
    "inscricoes": 48
  },
  "SME-1019818": {
    "risco": 0.5285,
    "nivel": "alto",
    "inscricoes": 30
  },
  "SME-1019820": {
    "risco": 0.3116,
    "nivel": "baixo",
    "inscricoes": 65
  },
  "SME-1019821": {
    "risco": 0.2934,
    "nivel": "baixo",
    "inscricoes": 80
  },
  "SME-1019822": {
    "risco": 0.3022,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-1019823": {
    "risco": 0.3875,
    "nivel": "baixo",
    "inscricoes": 8
  },
  "SME-1019824": {
    "risco": 0.3194,
    "nivel": "baixo",
    "inscricoes": 35
  },
  "SME-1019826": {
    "risco": 0.3631,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-1019827": {
    "risco": 0.2873,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-1019828": {
    "risco": 0.2786,
    "nivel": "baixo",
    "inscricoes": 54
  },
  "SME-1019829": {
    "risco": 0.2271,
    "nivel": "baixo",
    "inscricoes": 14
  },
  "SME-1019830": {
    "risco": 0.2261,
    "nivel": "baixo",
    "inscricoes": 19
  },
  "SME-1019831": {
    "risco": 0.3562,
    "nivel": "baixo",
    "inscricoes": 150
  },
  "SME-1026601": {
    "risco": 0.3047,
    "nivel": "baixo",
    "inscricoes": 89
  },
  "SME-1026602": {
    "risco": 0.3374,
    "nivel": "baixo",
    "inscricoes": 74
  },
  "SME-1026603": {
    "risco": 0.264,
    "nivel": "baixo",
    "inscricoes": 45
  },
  "SME-1026604": {
    "risco": 0.4011,
    "nivel": "baixo",
    "inscricoes": 161
  },
  "SME-1026801": {
    "risco": 0.2961,
    "nivel": "baixo",
    "inscricoes": 33
  },
  "SME-1026802": {
    "risco": 0.3629,
    "nivel": "baixo",
    "inscricoes": 115
  },
  "SME-1026803": {
    "risco": 0.3567,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-1026805": {
    "risco": 0.5166,
    "nivel": "alto",
    "inscricoes": 198
  },
  "SME-1026806": {
    "risco": 0.3198,
    "nivel": "baixo",
    "inscricoes": 83
  },
  "SME-1026807": {
    "risco": 0.4189,
    "nivel": "baixo",
    "inscricoes": 173
  },
  "SME-1026809": {
    "risco": 0.3763,
    "nivel": "baixo",
    "inscricoes": 103
  },
  "SME-1026810": {
    "risco": 0.4406,
    "nivel": "baixo",
    "inscricoes": 266
  },
  "SME-1026811": {
    "risco": 0.2948,
    "nivel": "baixo",
    "inscricoes": 71
  },
  "SME-1120201": {
    "risco": 0.4542,
    "nivel": "baixo",
    "inscricoes": 23
  },
  "SME-1120601": {
    "risco": 0.4903,
    "nivel": "baixo",
    "inscricoes": 137
  },
  "SME-1120602": {
    "risco": 0.4053,
    "nivel": "baixo",
    "inscricoes": 104
  },
  "SME-1120603": {
    "risco": 0.4112,
    "nivel": "baixo",
    "inscricoes": 152
  },
  "SME-1120604": {
    "risco": 0.396,
    "nivel": "baixo",
    "inscricoes": 44
  },
  "SME-1120605": {
    "risco": 0.4848,
    "nivel": "baixo",
    "inscricoes": 124
  },
  "SME-1120606": {
    "risco": 0.4728,
    "nivel": "baixo",
    "inscricoes": 127
  },
  "SME-1120801": {
    "risco": 0.4453,
    "nivel": "baixo",
    "inscricoes": 60
  },
  "SME-1120802": {
    "risco": 0.3907,
    "nivel": "baixo",
    "inscricoes": 42
  },
  "SME-1120804": {
    "risco": 0.3502,
    "nivel": "baixo",
    "inscricoes": 63
  }
};
