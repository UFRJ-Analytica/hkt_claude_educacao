# integracao-sme — BigQuery → app da creche

Integra a tabela **`rio-sme.sme_creche.inscricoes_completa`** (projeto GCP
`rio-sme`) à rede de unidades exibida pelo app da creche (frontend), sem
alterar nenhuma tela, contrato ou componente.

```
SELECT * FROM `rio-sme.sme_creche.inscricoes_completa` LIMIT 1000
```

## Fluxo

```
BigQuery ──(1) extract.py──▶ data/inscricoes_completa.parquet   [gitignored]
                 │
                 └─(2) build_unidades.py──▶ frontend/src/mocks/unidades.generated.ts
                                        └─▶ out/PROVENANCE_unidades.md
```

1. **`extract.py`** — roda a query acima via `bq` CLI (autenticação de usuário;
   ADC não configurado nesta máquina) e converte para Parquet com DuckDB.
   O dado bruto fica **só em `data/`** (gitignored): mesmo sintético, é registro
   com formato de dado de criança e não entra no Git.
2. **`build_unidades.py`** — agrega o extrato por unidade × grupamento × turno
   (DuckDB, código determinístico, nunca LLM) e emite o módulo TypeScript que o
   mock de unidades do frontend serve. PII do responsável (nome, CPF, telefone,
   endereço) é **ignorada**: a rede de unidades não precisa dela.
3. **`build_risco.py`** — roda `ML.PREDICT` com o modelo BQML
   **`rio-sme.sme_creche.modelo_risco_alocacao_xgb`** (XGBoost, label
   `confirmado`; AUC 0,741) sobre toda a `inscricoes_completa`, agrega por
   unidade (`risco = 1 − média P(confirmado)`, piso de 5 inscrições) e emite
   `frontend/src/mocks/risco.generated.ts`. Nível **alto** se risco ≥ 0,50,
   senão **baixo**. A tela Acompanhar exibe o aviso para a 1ª opção da
   inscrição, sempre com a nota DERIVADO DE SINTÉTICO.

O `frontend/src/mocks/unidades.ts` exporta as mesmas funções de sempre
(`todasUnidades`, `unidadePorId`) — por isso nenhuma tela muda. O gerador
sintético de unidades foi removido: sem o arquivo gerado, o módulo falha
explicitamente pedindo o pipeline, em vez de inventar uma rede.

## Sem `bq`: agregação direto no BigQuery (API REST)

`build_unidades.py --bigquery` e `build_inscritos.py` rodam as agregações **dentro do
BigQuery** pela API REST, com o token de `gcloud auth login` (`gcloud auth print-access-token`).
Não precisam do `bq` CLI nem do parquet local, não usam `LIMIT` e nenhuma linha de criança
sai do BigQuery. Pré-requisitos: `gcloud` instalado, `gcloud auth login`,
`gcloud config set project rio-sme`, papéis BigQuery Job User + Data Viewer no dataset.

```bash
python3 integracao-sme/build_unidades.py --bigquery   # rede completa (808 unidades, processo mais recente)
python3 integracao-sme/build_inscritos.py             # fila por oferta (inscritos, prioritários, confirmados)
```

## Fila completa por oferta (perfil da creche)

`build_inscritos.py` agrega **no BigQuery** (GROUP BY unidade × grupamento × turno, sem
`LIMIT`) e emite `frontend/src/mocks/inscritos.generated.ts`: inscritos, prioritários,
confirmados e, se a view tiver `opcao`, a distribuição por 1ª–5ª opção. Nada por criança
sai do BigQuery. O perfil da creche (`/creche`) usa esses números quando o arquivo está
gerado; sem ele, usa as contagens (amostrais) de `unidades.generated.ts` e avisa no rodapé.

```bash
python3 integracao-sme/build_inscritos.py     # requer `bq` autenticado
```

## Executar

```bash
cd hkt_claude_educacao
uv run --project backend python integracao-sme/extract.py
uv run --project backend python integracao-sme/build_unidades.py
cd frontend && npm run dev
```

## Proveniência (resumo; detalhe em out/PROVENANCE_unidades.md)

| classe | campos |
|---|---|
| **REAL** (contagem/atributo verdadeiro sobre o extrato) | `id` (unidade_codigo), `lat/lon` (cadastro Unidades_Unificadas), `bairro`, `ofertas.grupamento`, `ofertas.horario`, `ofertas.inscritos`, `ofertas.inscritosPrioritarios` |
| **DERIVADO** (código determinístico) | `cre` (centroide de bairro mais próximo), `ofertas.vagas` e `vagasPrioritarias` (a tabela de inscrições não traz oferta de vagas), `ofertas.demanda` |
| **SINTÉTICO** | o extrato inteiro (`_synthetic=true` em 100% das linhas); nome/tipo de unidade são rótulos — a fonte não traz nome oficial |

> Estrutura fiel ao processo da SME; indivíduos e ofertas de vaga não
> representam a rede real. Dado sintético jamais é apresentado como oficial —
> o próprio app mantém o aviso de dados de demonstração.

## Decisões

- **Por que alimentar o mock e não criar endpoint no backend?** O frontend novo
  é mock-driven e o `client.ts` só usa o backend quando as capacidades
  `unidades` **e** `inscricao` declaram `AVAILABLE` — o que exigiria mudar o
  gate no front (proibido pelo escopo) e prometer uma capacidade de inscrição
  que a tabela de inscrições passadas não sustenta. O cabeçalho original de
  `unidades.ts` já previa exatamente esta substituição de fonte de dados.
- **Por que `bq` CLI e não `google-cloud-bigquery`?** A máquina autentica por
  conta de usuário (`gcloud auth`), sem Application Default Credentials; a lib
  Python falha, o CLI funciona.
- **Vagas derivadas racionadas** (45–75% dos inscritos, determinístico por
  unidade×oferta): coerente com o problema real (fila > vaga) e estável entre
  execuções.
