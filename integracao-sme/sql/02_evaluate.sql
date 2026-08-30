-- 02_evaluate.sql — métricas do modelo retreinado (split interno de avaliação).
SELECT * FROM ML.EVALUATE(MODEL `rio-sme.sme_creche.modelo_risco_alocacao_xgb`);
