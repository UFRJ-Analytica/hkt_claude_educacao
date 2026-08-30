-- 03_global_explain.sql — importância global das features (confere se
-- freq_unidade entrou com peso relevante).
SELECT * FROM ML.GLOBAL_EXPLAIN(MODEL `rio-sme.sme_creche.modelo_risco_alocacao_xgb`)
ORDER BY attribution DESC;
