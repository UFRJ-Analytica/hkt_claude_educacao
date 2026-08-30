# Proveniência — risco.generated.ts

- Gerado em: 2026-08-30T18:41:19+00:00
- Modelo: `rio-sme.sme_creche.modelo_risco_alocacao_xgb` (BOOSTED_TREE_CLASSIFIER/XGBoost, label `confirmado`)
- Consulta: ML.PREDICT sobre `rio-sme.sme_creche.inscricoes_completa` (todas as inscrições com unidade)
- Unidades com risco: 859 (piso de 5 inscrições)
- Nível alto (risco ≥ 0.5): 100 unidades · baixo: 759
- Métricas de treino (modelo com freq_unidade): AUC 0.7368 · acurácia 0.6769 · F1 0.7393

## Classificação
- risco/nível: **DERIVADO DE SINTÉTICO** — modelo treinado sobre o extrato
  anonimizado/sintético (`_synthetic=true`); demonstra o mecanismo, não a realidade.
- contagem de inscrições por unidade: REAL sobre o extrato.

> Risco DERIVADO DE dados SINTÉTICOS via modelo XGBoost demonstrativo; não é estatística oficial da SME.
