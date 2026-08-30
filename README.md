# Matrícula Carioca

A inscrição em creche do Rio, refeita de ponta a ponta: a família se inscreve
pelo celular vendo a fila de cada creche, a direção da unidade valida e convoca
com um clique, e a Secretaria enxerga a rede inteira em um mapa. Construído em um
dia sobre os dados reais dos processos de 2021 a 2025.

Claude Impact Lab Rio #2 · desafio da Secretaria Municipal de Educação do Rio de
Janeiro · 30/08/2026.

## O problema que atacamos

A creche é o único segmento racionado da educação infantil carioca: ~89 mil
alunos, ~900 unidades, mais de 45 mil inscrições por processo — e vaga ociosa
convivendo com fila de espera, às vezes no mesmo bairro. Medimos isso nos dados:

| o que encontramos | valor |
|---|---|
| filas com vaga equivalente (mesmo grupamento e turno) a menos de 2 km | **74,7%**, mediana de 1,1 km |
| inflação da fila publicada — posições contra crianças reais, 2025 | **2,08×** (16.345 posições, 7.851 crianças) |
| inscrições sem confirmação registrada dos critérios declarados, 2025 | **63,0%** |

Por trás dos números há um processo que depende de telefonema: a classificação
roda em janeiro, a convocação sai em março, e o telefone cadastrado já mudou.
A vaga espera três dias por uma família que nunca soube que foi chamada.

## O que fizemos de diferente

**A convocação chega — porque usamos a chave Pix como contato.** Número de
celular troca; a chave Pix fica, porque é onde a família recebe o Bolsa Família.
No cadastro, o app confirma a chave com um Pix de R$ 0,01 e, quando a vaga sai, o
aviso aparece como notificação do banco, além do WhatsApp e do e-mail. É o canal
de contato mais resiliente que uma política pública pode ter hoje, e custa um
centavo por mensagem.

**A demanda sai do balcão da SME e vai para quem está na ponta.** Hoje validação
e convocação são manuais e centralizadas. Aqui, a família responde à convocação
no próprio app — recusar libera a vaga na mesma hora para a próxima criança — e a
direção da creche valida critérios e conduz as chamadas com autor, horário e
motivo registrados. A Secretaria passa a acompanhar o processo em vez de
carregá-lo.

**A família vê a fila e continua dona da própria inscrição.** Na escolha das
creches, cada unidade mostra quantas crianças disputam a turma, a previsão de
posição e o risco de a alocação não se confirmar (modelo XGBoost treinado no
BigQuery). A ordem de preferência se ajusta arrastando, e a lista pode ser
alterada até o fechamento da matrícula — a posição é recalculada na hora, sem
nova inscrição, sem ir ao balcão.

**O gestor ganha um painel para validar e decidir.** A direção confere cada
critério declarado com a evidência pronta — retorno do CadÚnico, foto do
documento enviada pelo app e pré-analisada por IA (que lê e confere, mas nunca
pontua) — e recusa só com motivo, auditável pela CRE. A Secretaria vê a rede por
pressão (inscritos por vaga) e, para cada creche cheia, as vizinhas com vaga
equivalente a menos de 2 km: exatamente a informação que faltava para decidir
alocação.

## O produto, em quatro telas

| rota | quem usa | o quê |
|---|---|---|
| `/` | todos | portal no estilo matricula.rio |
| `/app` | responsável | inscrição mobile first em 6–8 passos, código de acompanhamento, resposta à convocação |
| `/creche` | direção da unidade | validação critério a critério e convocação com desfecho obrigatório |
| `/secretaria` | SME | panorama da rede: números do recorte, mapa por pressão, vizinhas com vaga |

## No que não abrimos mão

- números e regras de negócio saem de código determinístico, nunca de LLM;
- toda informação carrega fonte, cobertura, data de referência e limitações;
- ausência de dado não é zero; cobertura baixa bloqueia a leitura;
- dado anonimizado nunca vira estatística oficial;
- o frontend descobre o backend por capacidades declaradas — sem promessa vazia;
- decisões administrativas e comunicação externa exigem humano nomeado;
- privacidade, minimização e agregação são arquitetura, não recomendação.

## Dados

Fonte única: [`CIT-SME-RJ/dadoscreche`](https://github.com/CIT-SME-RJ/dadoscreche/),
espelhada no BigQuery (`rio-sme.sme_creche.inscricoes_completa`). O pipeline
[`integracao-sme/`](integracao-sme/README.md) agrega **dentro do BigQuery** — sem
baixar uma linha de criança sequer — a rede de 808 unidades, a fila por oferta e
o risco por unidade, e alimenta o frontend.

Os dados são anonimizados (códigos artificiais, generalização, supressão).
**Indicadores calculados sobre eles não representam a realidade** — o que se
preserva é a estrutura do processo, a régua de pontuação e a dinâmica dos
estados. O entregável é o motor, demonstrado sobre o extrato; a SME o roda sobre
o dado dela.

Nunca versione dado pessoal, upload, banco local ou segredo. Ver
[política de dados](data/README.md).

## Executar

Backend (FastAPI) e frontend (React + Vite), em dois terminais:

```bash
cd backend && uv sync && uv run uvicorn app.main:app --host 127.0.0.1 --port 8000
cd frontend && npm install && npm run dev
```

Abre em <http://localhost:5173> (ou na porta que o Vite indicar). `VITE_API_MODE`
aceita `auto`, `live` ou `fixture`; em `auto`, o app usa o backend apenas nas
capacidades que ele declarar `AVAILABLE` e diz na tela de onde cada dado vem.

Para atualizar os dados do BigQuery (requer `gcloud auth login` no projeto
`rio-sme`; dispensa o `bq`):

```bash
python3 integracao-sme/build_unidades.py --bigquery
python3 integracao-sme/build_inscritos.py
python3 integracao-sme/build_risco.py
```

## Gates

```bash
cd backend && uv run ruff check app tests scripts && uv run mypy app scripts && uv run python -m pytest -q
cd frontend && npx tsc -b && npm run build && npm run lint
```

## Demonstração

Dois vídeos (gravados em modo mock, dados sintéticos/anonimizados) mostram as
duas superfícies alteradas pela integração com o BigQuery:

### 1. Tela de unidades — 352 creches reais do BigQuery, classificadas por risco
<video src="docs/media/01-unidades-risco.webm" width="720" controls></video>
- 352 unidades servidas a partir da integração (antes: 40 por teto; agora: toda a
  rede do BigQuery)
- tag **risco alto / risco baixo** no card de cada creche, calculada pelo modelo
  `modelo_risco_alocacao_xgb` (XGBoost) treinado com a feature *frequência de
  inscrições por unidade*
- risco sobe com mais demanda, desce com menos (alta frequência → mais difícil
  alocar; baixa frequência → maior chance de vaga)

### 2. Tela Acompanhar — aviso de risco na 1ª opção da inscrição
<video src="docs/media/02-acompanhar-risco.webm" width="720" controls></video>
- aviso binário (sem nota na UI) sobre a escola da primeira opção
- risco baixo → "Boa perspectiva" / risco alto → "Aviso de risco"
- fonte, data e limitações listadas na legenda; dados derivados de sintético

> Os vídeos foram capturados sem PII. Veja [política de dados](data/README.md).

## Documentação

- [Estado do projeto](docs/ESTADO-DO-PROJETO.md) — o processo real e o que o dado sustenta
- Specs das telas: [família](docs/plano_app_creche.md) · [perfil da creche](docs/FLUXO-PERFIL-CRECHE.md) · [Secretaria](docs/FLUXO-SECRETARIA.md)
- Arquitetura: [visão](docs/architecture/overview.md) · [ADR-001](docs/architecture/decisions/ADR-001-modular-monolith.md) · [módulos](docs/architecture/module-contract.md) · [agentes](docs/architecture/agent-runtime.md) · [proveniência](docs/architecture/data-provenance.md) · [privacidade](docs/architecture/privacy-and-safety.md)

## Política Git

Sem commit ou push automático — a decisão é do mantenedor. Antes de commitar,
revise o staged (`git diff --cached --name-only`) e confirme que nada do
`dadoscreche` entrou.
