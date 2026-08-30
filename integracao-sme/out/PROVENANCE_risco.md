# Proveniência — risco.generated.ts

- Gerado em: 2026-08-30T17:32:59+00:00
- Modelo: `rio-sme.sme_creche.modelo_risco_alocacao_xgb` (BOOSTED_TREE_CLASSIFIER/XGBoost, label `confirmado`)
- Consulta: ML.PREDICT sobre `rio-sme.sme_creche.inscricoes_completa` (todas as inscrições com unidade)
- Unidades com risco: 859 (piso de 5 inscrições)
- Nível alto (risco ≥ 0.5): 160 unidades · baixo: 699
- Métricas de treino: AUC 0.7411 · acurácia 0.6781 · F1 0.7218

## Classificação
- risco/nível: **DERIVADO DE SINTÉTICO** — modelo treinado sobre o extrato
  anonimizado/sintético (`_synthetic=true`); demonstra o mecanismo, não a realidade.
- contagem de inscrições por unidade: REAL sobre o extrato.

> Risco DERIVADO DE dados SINTÉTICOS via modelo XGBoost demonstrativo; não é estatística oficial da SME.
