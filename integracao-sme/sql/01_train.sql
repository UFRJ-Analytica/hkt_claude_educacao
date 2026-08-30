-- 01_train.sql — retreina o modelo de risco de alocação COM frequência por unidade.
--
-- Motivação: a taxa de confirmação cai monotonicamente com a frequência de
-- inscrições da unidade (medido no extrato: <20 inscr. → 75,9% confirmam;
-- 200+ → 33,6%). Quanto maior a frequência (demanda), mais difícil a vaga;
-- quanto menor, maior a chance. A feature freq_unidade dá ao XGBoost essa
-- informação diretamente.
--
-- Executar: bq query --use_legacy_sql=false < 01_train.sql  (leva minutos;
-- se o CLI der timeout o job CONTINUA no servidor — ver skill bigquery-ml)

CREATE OR REPLACE MODEL `rio-sme.sme_creche.modelo_risco_alocacao_xgb`
OPTIONS(
  model_type='BOOSTED_TREE_CLASSIFIER',
  input_label_cols=['confirmado'],
  booster_type='GBTREE', tree_method='HIST',
  max_iterations=50, learn_rate=0.1, max_tree_depth=6, subsample=0.85,
  early_stop=TRUE, min_rel_progress=0.001,
  enable_global_explain=TRUE,
  data_split_method='RANDOM', data_split_eval_fraction=0.15
) AS
WITH freq AS (
  SELECT unidade_codigo, COUNT(*) AS freq_unidade
  FROM `rio-sme.sme_creche.inscricoes_completa`
  WHERE unidade_codigo IS NOT NULL
  GROUP BY unidade_codigo
)
SELECT
  t.ano,
  t.mes_inscricao,
  t.idade_meses,
  t.sexo,
  t.grupamento,
  t.horario_integral,
  t.n_opcoes,
  t.n_respostas_sim,
  t.score_socioeconomico,
  t.zona,
  t.latitude,
  t.longitude,
  t.indice_perigo_synthetic,
  f.freq_unidade,
  t.confirmado
FROM `rio-sme.sme_creche.inscricoes_completa` t
JOIN freq f USING (unidade_codigo)
WHERE t.confirmado IS NOT NULL;
