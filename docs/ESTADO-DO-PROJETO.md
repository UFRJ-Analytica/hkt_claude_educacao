# Pulso da Rede — estado do projeto

**Última atualização:** 29/08/2026, véspera do Claude Impact Lab Rio #2.

Este é o documento de entrada. Se você é um agente que perdeu o contexto, ou uma
pessoa entrando agora, leia este arquivo inteiro antes de tocar em código. Ele
descreve o que existe, o que é real, o que é sintético, por que cada decisão foi
tomada e o que falta.

---

## 1. O evento e o que decide a avaliação

**Claude Impact Lab Rio #2** — domingo, 30/08/2026, 08h–20h, VTEX Botafogo.
Parceria Prefeitura do Rio + Secretaria Municipal de Educação + Secretaria de
Desenvolvimento Econômico. Times de 4 pessoas. Desafio único.

**O fato que organiza tudo:** o briefing, os datasets e os critérios só são
revelados no domingo de manhã, e quem fornece é a própria SME. Não dá para
pré-construir o produto certo. Dá para pré-construir três coisas:

1. contexto de domínio, para entender o briefing às 9h05 e não às 10h;
2. um caminho de ingestão que engole arquivo desconhecido em minutos;
3. uma casca que aceita qualquer conteúdo e já mostra IA governada.

Pitches a partir das ~17h30; tempo real de construção ≈ 7h. As melhores soluções
são doadas para a cidade — o que eleva o peso de auditabilidade e licença.

### A tese do produto

> O Pulso da Rede não substitui os sistemas da SME nem decide por gestores. Ele
> conecta os dados do briefing a uma camada verificável de prontidão, indicadores
> e evidências por escola e CRE, permitindo que gestores e Claude expliquem o que
> os dados sustentam — e **bloqueiem o que não sustentam**.

O diferencial não é "usamos IA". A SME já usa IA: formou 82 professores em maio
de 2026 com a Recode, e a cidade ganhou o Bloomberg Mayors Challenge com IA para
busca ativa. O diferencial é **IA governada sobre o dado deles**, com evidência
citável e recusa explícita quando a cobertura não sustenta leitura.

### O que NÃO propor

**Preditor de evasão.** A SME já tem, construído com o IMDS, premiado
internacionalmente. Abandono caiu para 0,1% em 2025. Propor isso é entregar ao
cliente um projeto que ele já possui.

---

## 2. Estado atual em uma página

| camada | origem | situação |
|---|---|---|
| Contorno do município | IBGE malhas v3, município 3304557 | **real**, embutido no bundle |
| Cadastro de escolas | Data.Rio/SME ArcGIS, CC-BY 4.0 | **real**, 1.588 unidades com coordenada |
| CRE, tipo de equipamento, designação SME | mesma release | **real** |
| Código INEP | — | **ausente**: a release Data.Rio não traz CO_ENTIDADE |
| Frequência, desempenho, ocupação, carência | gerado localmente | **sintético**, rotulado por métrica |
| Turmas, habilidades, aula entregue | fixture do contrato | **sintético**, tela declara |

A API declara `school-identity` como `AVAILABLE / REAL_PUBLIC`. Todas as
capacidades de indicador (`network`, `learning`, `attendance`, `capacity`,
`staffing`) estão em `SCHEMA_ONLY`. A interface mostra uma faixa fixa avisando
disso, e o selo do topo lê `REDE REAL · IND. SINTÉTICOS`.

**Isso é intencional e é o argumento.** Geografia real, indicadores rotulados,
nenhuma confusão entre os dois.

---

## 3. Os dados — três camadas

### 3.1 O que temos de verdade, hoje

**Limite do município.** IBGE, API de malhas v3, `3304557`, qualidade máxima.
33 anéis, 1.043 pontos, 23 KB em `frontend/src/domain/rio-geometry.ts`.
Continente, Ilha do Governador, Marambaia, Paquetá. Sem tiles externos — o mapa
funciona offline, o que importa com wifi de evento.

**Cadastro oficial de escolas.** Data.Rio / ArcGIS / SME, layer
`Educacao/SME/MapServer/1`, licença CC-BY 4.0. Publicado como release governada
por `backend/scripts/import_official_school_identity.py` em
`data/official/school_identity/`. 1.588 registros, 100% com coordenada, CREs 1–11.

Tipos reais na rede: Escola Municipal 911 · EDI 286 · Creche Municipal 247 ·
CIEP 101 · Biblioteca Escolar 13 · Escola Especial 10 · Núcleo de Arte 9 ·
Clube Escolar 6 · CEJA 2 · CDEI 1 · Escola Cívico-Militar 1.

Campo `neighborhood` vem **nulo** em todos os 1.588. Não rotule CRE por bairro:
a fonte não sustenta. `inep_id` também vem nulo nos 1.588 — mas isso deixou de
ser um beco sem saída (ver 3.1b).

### 3.1b A ponte INEP — resolvida, por chave exata

**O Censo Escolar do INEP está carregado, com dado real por escola.**

A ponte parecia impossível porque o Data.Rio não publica `CO_ENTIDADE` e o
projeto proíbe match por nome. Mas o INEP grava o nome da escola municipal do
Rio como `<designação de 7 dígitos> <nome>`:

```
0102002 EM TIRADENTES
0101501 CIEP HENFIL
0101803 EDI ANTONIO RAPOSO TAVARES
```

A designação é exatamente a chave que o Data.Rio publica em `sme_designation`.
**Isso é junção por chave, não similaridade textual** — a distinção que separa
esta ponte da que o projeto proíbe. A chave casa ou não casa, e a cobertura é
medida.

Publicado por `backend/scripts/import_inep_census.py` em
`data/official/inep_census/`, mesmo padrão content-addressed do cadastro.
Censo 2024, 1.556 escolas, release `baf77242…`.

**Cobertura: 1.546 de 1.588 (97,4%).**

| tipo | unidades | com INEP | matrícula real | turmas reais |
|---|---:|---:|---:|---:|
| Escola Municipal | 911 | 902 | 435.227 | 14.585 |
| EDI | 286 | 284 | 67.688 | 3.028 |
| Creche Municipal | 247 | 246 | 33.364 | 1.527 |
| CIEP | 101 | 101 | 60.769 | 2.280 |
| Escola Especial | 10 | 10 | 994 | 113 |
| CEJA | 2 | 2 | 614 | 59 |
| Cívico-Militar | 1 | 1 | 554 | 16 |
| Biblioteca, Núcleo de Arte, Clube, CDEI, Polo | 30 | 0 | — | — |
| **total** | **1.588** | **1.546** | **599.210** | **21.608** |

Os 30 com zero não são lacuna: **não são escolas no Censo**. É o mesmo
`NÃO SE APLICA` da seção 6 — o dado não deveria existir para eles.

**O que passa a ser real por escola:** matrícula total, por etapa e **por ano de
escolaridade** (1º ao 9º, separadamente); turmas por etapa; docentes por etapa;
salas utilizadas, climatizadas e acessíveis; computadores, portáteis e tablets
para aluno; e 19 indicadores de infraestrutura — internet, internet para aluno,
biblioteca, sala de leitura, quadra, laboratórios, refeitório, alimentação,
banheiro PNE, rampas, elevador, água potável, esgoto e energia de rede.

**Isto derruba parte do sintético, e derrubou errado antes.** A Escola Municipal
Tiradentes tinha 334 matrículas e 12 turmas do 1º ao 6º ano no sintético. O real
é 195 matrículas, 8 turmas, 12 docentes e **zero no 6º ano** — é uma escola só
de anos iniciais. O sintético inventava um segmento que a escola não tem.

**O que continua sem fonte real:** frequência, desempenho por descritor, carência
docente, movimentação de matrícula e aula entregue. Nenhum deles está no Censo —
são do pipeline da SME (3.2) ou do briefing (3.3).

### 3.2 O pipeline da SME — verificado, sem acesso ao dado

Repositório **público**: `github.com/prefeitura-rio/pipelines_rj_sme`, diretório
`queries/models`. O que é público são as **definições dbt**; as tabelas vivem no
BigQuery municipal e exigem credencial (acesso pedido no Discord `#peça-permissão`).

**Temos o schema. Não temos as linhas.** Suficiente para modelar os formatos
certos antes do briefing; não autoriza afirmar cobertura.

#### `educacao_basica` — 9 modelos centrais

| modelo | o que é |
|---|---|
| `escola` | unidade escolar — **tem `id_inep` E `id_designacao`**, mais `cre`, `micro_area`, `polo`, contagem de salas |
| `aluno` | matriculados no ano corrente; tem `cpf`, `nome`, `raca_cor`, `bolsa_familia`, `cartao_familia_carioca` |
| `aluno_historico_2025` | histórico e dados pessoais; `nome`, `endereco`, `cep`, `filiacao_1/2`, `cpf`, `nis_aluno`, `nis_resp`, `religiao` |
| `aluno_turma` | ponte aluno ↔ turma |
| `coc` | **COC = Conselho de Classe**; alunos, vagas, capacidade, turno, grupamento. Desde 2014 |
| `avaliacao` | **notas do COC por disciplina, 0 a 10**, mais conceito e frequência |
| `frequencia` | faltas por disciplina, `dias_letivos`, `tempos_letivos`, `carga_horaria_semanal`. Desde 2012 |
| `movimentacao` | entradas e saídas de aluno. Desde 1973 |
| `dependencia` | salas e espaços, com capacidade e área |

#### `educacao_basica_frequencia` — 8 modelos

O achado mais importante do projeto está em `frq_frequencia`, descrita como
*"frequência diária dos alunos no ano letivo corrente"*, atualizada diariamente:

```text
id_situacao: 1 – Aula prevista · 3 – Excluído · 4 – Aula dada · 6 – Aula cancelada
```

Mais `plano_aula`, `diario_classe`, `efetivado`, `numero_aula`, `data_aula`.

Isso resolve de forma **exata** a distinção que nenhum sistema da rede publica:

| estado | origem |
|---|---|
| aula dada, estudante presente | `id_situacao = 4`, sem falta |
| aula dada, estudante ausente | `id_situacao = 4` + `faltas_disciplina_dia` |
| aula cancelada — oferta interrompida | `id_situacao = 6` |
| prevista sem lançamento — registro faltando | `id_situacao = 1` sem par em 4 |

`vw_alunos_frequencia_acumulada` documenta a fórmula da rede:
`100 - (total_faltas / total_aulas) * 100`. Use a deles, não invente outra.

#### `educacao_basica_avaliacao` — 3 modelos

`prova_rio` traz o que sustenta a matriz de habilidades: `cd_habilidade`,
`dc_habilidade_acerto`, `dc_habilidade_total`, `nu_acerto`, `tx_acerto`,
`vl_proficiencia`, `vl_proficiencia_erro`, e `dc_padrao` com os quatro níveis
oficiais — **Abaixo do Básico · Básico · Adequado · Avançado**. Grão: aluno ×
disciplina, com `esc_id` e `tur_id`.

Mais `avaliacao_bimestral_2012_a_2019` e `avaliacao_bimestral_2021_a_2024`.

#### Não verificados

`educacao_basica_alocacao` (`disciplinas_sem_professor`), `brutos_core_sso` e
`brutos_gestao_escolar`. O último é o nome mais promissor da lista.

### 3.2b Sintéticos nos schemas deles

`frontend/src/api/pipeline.ts` gera dados **nas formas do pipeline da SME**, no
grão que o produto consome — turma para cima, nunca linha de aluno:

- `movimentacao` → entradas, saída interna, saída externa, trajetórias
  interrompidas (contagem, jamais lista);
- `disciplinas_sem_professor` × `id_situacao` → carência por disciplina cruzada
  com aula cancelada;
- `grupamento` → corte do 1º ao 9º ano, com a transição do 5º para o 6º.

`raca_cor`, `bolsa_familia` e `cartao_familia_carioca` **não são gerados** — são
sensíveis pela LGPD e só entram com autorização explícita do briefing.

A spec para o backend produzir a release governada equivalente está em
`docs/api/backend-agent-sme-pipeline-synthetic-handoff.md`.

### 3.3 O que provavelmente virá no briefing

**Alta probabilidade:** recorte anonimizado de avaliação, turma e frequência;
resultados de simulados de Português e Matemática; identificadores de escola,
CRE, ano e período; contexto do DiáRio; pedido de protótipo com Claude.

**Média:** movimentação e histórico; Prova Rio e bimestrais; dados territoriais;
sinais de professor e turma, incluindo disciplinas sem professor.

**Baixa:** CPF, laudos, comunicação familiar, acesso irrestrito ao Lake, decisão
automática sobre aluno ou professor.

### 3.4 Evidência da agenda atual da SME

**Circular E/SUBE/CAV nº 08/2026, de 24/08/2026** — cinco dias antes do evento —
orienta a **Atividade Diagnóstica em Rede do 3º bimestre**: 1º ao 9º ano mais
Carioca I e II, Português, Matemática e Ciências, cartões-resposta com leitura
ótica, resultados no Rioeduca em Ação e no GPÁgil, devolutiva **por aluno e por
turma**, uso em encontros pedagógicos, relatórios de níveis de aprendizagem.

O **Trilhas de Recomposição** (05/2025, IplanRio + SME, integrado ao DiáRio) é
precedente institucional relevante, mas **não há menção pública a ele em 2026**.
Trate como antecedente, não como prioridade comprovada.

Vocabulário da casa: GET, CRE, EDI, Bora pra Escola, Rio Alfabetiza, PPPS, Prova
Rio, Rioeduca em Ação. Marcas aposentadas que não devem ser citadas: "Escolas do
Amanhã", "Ginásio Carioca".

---

## 4. Arquitetura

Monólito modular. Backend FastAPI, frontend React, implantáveis separadamente.

```text
React / registro de features
        ↓ HTTP + OpenAPI
FastAPI routers
        ↓
use cases
        ↓
contratos de domínio + políticas determinísticas
        ↑
adapters: arquivos, DuckDB, SQLite, provider de modelo, mapa
```

**Dois planos de dados.** Analytics: DuckDB read-only sobre Parquet, release
content-addressed promovida por ponteiro atômico (`data/generated/current.json`).
Controle: SQLite sem PII — `agent_runs`, `investigations`, `meetings`,
`action_items`, `audit_events`, mais `dataset_descriptors`, `mapping_proposals`,
`join_registrations`, `join_audits`.

**Regras de dependência:** domínio não importa FastAPI, DuckDB nem SDK; routers
coordenam e não calculam regra; frontend não replica fórmula; agentes usam
ferramentas estreitas, nunca banco direto; composição registra módulos
explicitamente, sem descoberta mágica.

---

## 5. O que está construído

### 5.1 Backend — endpoints

```text
GET   /health
GET   /api/v1/capabilities

GET   /api/v1/schools/official?cre=&limit=      cadastro real, 1.588 unidades
GET   /api/v1/schools/resolve                   por school_id, INEP ou designação
GET   /api/v1/schools/{id}/context               painel da escola, sempre abre
GET   /api/v1/schools/{id}/profile
GET   /api/v1/schools/{id}/turmas                grão de turma
GET   /api/v1/schools/{id}/skills?period=        matriz de habilidades
GET   /api/v1/map/schools                        GeoJSON governado

GET   /api/v1/network/snapshot?cre=&school_id=&turma_id=
GET   /api/v1/data/quality?cre=
GET   /api/v1/evidence/{evidence_id}

POST  /api/v1/data/profile                       intake de arquivo desconhecido
GET   /api/v1/data/datasets
GET   /api/v1/data/readiness/{dataset_id}
GET   /api/v1/data/mappings/{dataset_id}/proposal
POST  /api/v1/data/joins  ·  /joins/{id}/approve  ·  /joins/{id}/audits

POST  /api/v1/ai/briefings                       IA governada sobre evidências
POST  /api/v1/ai/school-action-plans             plano de ação por escola
GET   /api/v1/strategy/data-plan                 plano de adaptação ao briefing
```

**Contratos-chave.** `ScopeType` = NETWORK · CRE · SCHOOL · TURMA.
`AnalyticsIndicatorId` = attendance_rate, assessment_score, capacity_utilization,
teacher_shortage_rate, assessment_participation, skill_mastery_rate,
lessons_delivered_rate. `ObservationDimensions` = subject, grade, skill_id,
skill_label, proficiency_level, period_label.

**Intake.** Formatos `.csv .json .jsonl .ndjson .parquet .xlsx`. Detecta encoding
(UTF-8, BOM, latin-1) e delimitador (`,` `;` tab). XLSX com preflight anti-zip-bomb.
Limite 10 MB. Área confinada `.intake/`. **Nunca devolve valor de célula** — só
metadados, estatísticas e flags de PII. Veredito `READY / REVIEW / BLOCKED`.

**IA.** O modelo **não consulta nada**: o chamador resolve os `evidence_ids` no
snapshot e o modelo narra o que já passou pela governança. Provider `fake`
determinístico por padrão; `anthropic` opt-in e fail-closed. Resposta traz
`guardrails` e `policy` com `raw_rows_access: denied` e
`decision_automation: denied`.

### 5.2 Frontend — telas

Todas as telas de recorte aceitam escopo de **escola**, não só de rede e CRE.
Clicar numa unidade no mapa e não conseguir ver nada dela era o buraco mais
visível do produto: o ponto estava pintado por um indicador que o painel se
recusava a mostrar. `IDENTITY_ONLY` do backend significa que **o snapshot do
backend** não tem métrica para aquele identificador — não que nada possa ser
exibido. A camada de demonstração local tem os números, são os mesmos que
pintam o ponto, e a Escola 360 os mostra dizendo de onde vieram.

`frontend/src/screens/`

| tela | rota | o que faz |
|---|---|---|
| **Hoje** | `/hoje` | folha de abertura: linha de estado, 4 situações ranqueadas, decomposição da aula entregue no nível da rede, trilha de agentes |
| **Comparar** | `/comparar` | matriz CRE × indicador, expansível até escola; troca entre `/network/snapshot` e agregação local, declarando qual |
| **Recomposição** | `/recomposicao` | matriz habilidades × (CRE / escola / turma), com supressão por célula |
| **Fluxo** | `/fluxo` | três blocos: saldo de matrícula com saída interna vs externa, carência × aula cancelada, e o corte por ano com a quebra do 6º |
| **Mapa** | `/mapa` | 1.588 unidades reais, Mercator com pan/zoom, filtro por tipo, busca, card com contexto |
| **Escola 360** | `/escola/:id` | painel que sempre abre; identidade real, links de mapa, cobertura, comparação, aula entregue, plano de ação |
| **Unidade** | `/unidade` | visão de dores consolidadas, serve ao diretor e à SME |
| **Professor** | `/professor` | preview de conceito, nada implementado, limites explícitos |
| **Dados** | `/dados` | prontidão, perfil de colunas, portões, capacidades declaradas |

**Copiloto** (`⌘K`) — resolve evidências no snapshot, chama `/ai/briefings`,
mostra resposta, guardrails e `provider · model · role · políticas`. Cai para
resposta determinística local quando a IA não pode responder, **declarando o
motivo**.

**Papéis** (`src/roles.tsx`): Secretaria (completo) · Escola (parcial) ·
Professor (preview) · Família (fora de escopo, desabilitado com motivo).
Mapeiam para as roles do backend: `central_manager`, `school_manager`, `teacher`,
`guardian`.

### 5.3 Sistema visual

**Cor de dado significa uma coisa só: atenção.** Não há cor de marca, gradiente
nem azul de link. Botão é tinta, link é sublinhado. O acento petróleo
(`#16505f`) é reservado para IA, ação e foco — nunca para dado.

**Rampa de atenção**, matiz único com claridade monotônica, validada nos dois
modos: `#cb8f6c` → `#b25c31` → `#8e2c1b`. Verde-amarelo-vermelho foi rejeitado:
o par âmbar↔vermelho reprova no piso de separação até para visão normal, e
verde↔vermelho desaba sob deuteranopia.

**Sem leitura** não tem matiz: hachura a 45° sobre cinza. Lê como "fora da
medição" em impressão, em daltonismo e em alto contraste. É o estado mais
importante do produto.

Tipografia: **Schibsted Grotesk** (interface e display) + **IBM Plex Mono**
(códigos, coberturas, hashes). Mono marca visualmente tudo que é rastreável.

---

## 6. Regras invioláveis

Vêm de `docs/product/regras-de-negocio.md` e
`docs/architecture/privacy-and-safety.md`. Não são preferência de design.

1. **Número vem de código determinístico.** O LLM interpreta, prioriza e escreve;
   nunca calcula nem corrige valor.
2. **Ausência não é zero.** Valor ausente é `BLOCKED`, sem período e sem
   evidência. Nunca exiba 0 no lugar.
3. **Cobertura manda.** Abaixo de 100% exige limitação; abaixo de 80% degrada;
   abaixo de 50% bloqueia a leitura.
4. **Coexistência não é causalidade.** Se dois movimentos coincidem no tempo, o
   texto diz "coincide com", nunca "causou".
5. **Sem ranking de escola, turma ou professor.** Use pares comparáveis com
   critério visível.
6. **Sem score único de qualidade.** Os componentes permanecem visíveis; um score
   não pode esconder cobertura insuficiente.
7. **Supressão de grupo pequeno**, por célula. Turma acima do limiar pode ter
   descritor abaixo.
8. **Nenhum dado de aluno** persiste, aparece em tela ou vai ao modelo: nome,
   CPF, NIS, filiação, endereço, coordenada residencial.
9. **`raca_cor` é sensível pela LGPD** — só agregado, com supressão, e apenas se
   o briefing autorizar recorte de equidade.
10. **Ação administrativa e comunicação externa exigem aprovação humana
    registrada.** Nada é executado automaticamente.
11. **Sem match fuzzy por nome de escola ou bairro.** Medido: 0 de 1.519 acertos.
12. **Dado sintético nunca é descrito como real.** Selo permanente, sem opção de
    fechar.

### Aplicabilidade por tipo de unidade

**Creche, EDI e CDEI não têm IDEB** e não participam da ADR. A matriz de
recomposição cobre apenas Escola Municipal, CIEP e Cívico-Militar — as demais
ficam fora **por inaplicabilidade, não por ausência de dado**, e a tela diz isso.
Atribuir acerto em Português a uma creche é o erro que um avaliador da SME
identifica em dois segundos.

A regra vive em **`frontend/src/domain/units.ts`** — um lugar só. `takesAdr`,
`isFundamental` e `isEarlyChildhood` são consumidos pelo gerador de sintéticos,
pelo mapa, pela Escola 360, pela Recomposição e pelo Fluxo. Duplicá-la foi
exatamente como a proficiência voltou a aparecer em biblioteca.

**`NÃO SE APLICA` e `SEM LEITURA` são estados diferentes e a tela nunca os
soma.** Os dois aparecem vazios; significam o oposto. "Não se aplica" é fato
consumado: o dado não deveria existir. "Sem leitura" é lacuna: deveria ter
chegado e não chegou — e só essa é cobrável de alguém.

O contrato marca a diferença por proveniência: `source_kind =
KNOWN_UNAVAILABLE` para inaplicável, `SYNTHETIC_*` com cobertura baixa para
lacuna. `isNotApplicable()` em `domain/indicators.ts` é a única leitura desse
estado, e a agregação de rede tira as inaplicáveis do denominador.

No mapa, com Desempenho ativo: **598 sem sinal · 247 baixa · 64 atenção · 6
crítico · 98 sem leitura · 575 não se aplica**, somando as 1.588. As 575 são
EDIs, creches, bibliotecas, núcleos de arte, clubes escolares, CEJAs e a escola
especial. Antes desta correção elas recebiam proficiência sintética como
qualquer escola — o mapa inteiro dizia que biblioteca tem nota de ADR.

---

## 7. Decisões tomadas e por quê

**O mapa não é o produto; a comparação é.** Um gestor com 1.560 escolas não tem
problema de localização, tem problema de alocação de atenção. O mapa serve para
achar uma unidade cujo nome não se lembra e recortar uma CRE — depois sai da
frente.

**Recusamos o chat lateral como experiência principal.** Um gestor de rede não
sabe qual pergunta fazer; se soubesse, não precisaria do produto. O Copiloto
existe, mas o produto entrega trabalho pronto para revisão.

**Identidade real convive com indicador sintético.** O contrato separa
`identity.source_kind` de `metric.source_kind`, então as duas origens aparecem no
mesmo objeto sem se confundirem. O selo do topo mostra as duas.

**Unidade real sempre abre.** Quando não há métrica para o identificador, o
backend devolve `IDENTITY_ONLY` com identidade e coordenada reais. Nunca "escola
não encontrada": a escola existe; o que falta é cobertura.

**A cor da matriz é relativa, não absoluta.** A dificuldade varia muito entre
descritores. Se a rede inteira acerta 28% em frações, é lacuna de currículo, não
de escola — e pintar tudo de vermelho esconde a turma que está pior que suas
pares. A cor é a distância para a média da rede no mesmo descritor; a linha
"média do recorte" mostra a fragilidade absoluta.

**Aula sem lançamento recebe hachura, não cor.** É ausência de informação — não
sabemos se aconteceu. Cancelada e ausente pedem atenção e recebem a rampa.

**Coerência de origem.** Quando a tela lê fixture, o Copiloto usa o caminho
determinístico e explica por quê — senão narraria uma população diferente da que
está na tela.

---

## 8. Próximos passos

### P0 — antes do briefing

1. **Hoje deixa de ser fixture.** As quatro situações da abertura são hardcoded.
   Com `/network/signals` — ou derivadas do cruzamento em `pipeline.ts` — a tela
   mais visível da demo deixa de ser maquete. É o maior retorno por hora.
2. **Bloco de turmas na Escola 360.** A camada de dados existe (`getTurmas`, com
   caminho governado e fallback); falta a tela.
3. **Fechar o ciclo.** Salvar plano de ação numa pauta, atribuir responsável e
   prazo, marcar status, mostrar trilha. As tabelas do SQLite já existem.
4. **Ensaiar a demo** de ponta a ponta, incluindo desligar a API para provar o
   fallback determinístico.

### P1 — depende do backend

4. **`subject_grade_mean`** em escala 0–10 para o caso COC. Sem ele, nota de
   disciplina teria que ser espremida em `skill_mastery_rate`, que é razão.
5. **`lessons_cancelled_rate` e `lessons_unlogged_rate`** além do
   `lessons_delivered_rate`. Sem os três, a distinção não sobrevive à agregação.
6. **`proficiency_level` com os quatro padrões oficiais** de `dc_padrao`.
7. **`vl_proficiencia_erro` exposto** — diferença dentro da margem de erro não é
   diferença, e a tela precisa poder suprimir comparação não significativa.
8. **Release INEP por `CO_ENTIDADE`.** Enquanto não existir, todo painel de
   escola fica em `IDENTITY_ONLY`. Se o briefing entregar a tabela `escola` do
   pipeline, o cruzamento vem pronto — ela tem `id_inep` e `id_designacao` na
   mesma linha.

### P2 — só se o briefing puxar

9. Rollup governado de habilidades por rede e por CRE (hoje derivado no cliente).
10. Adapter temático do domínio confirmado no briefing.

### Explicitamente fora

Análise territorial de vazio de creche — a notícia da multa é de 2024 e creche
não aparece na comunicação da SME entre maio e agosto de 2026. Papel Família —
exige base legal, canal e consentimento que não temos.

---

## 9. Perguntas para os primeiros 30 minutos

Anotadas antes, para não improvisar às 9h05:

1. Quais são os critérios de julgamento e seus pesos? Qual o tempo de pitch?
2. O dataset traz itens e habilidades dos simulados, ou apenas nota agregada?
3. A frequência é diária, por aula ou acumulada? Traz `id_situacao`?
4. O alvo primário é professor, direção, CRE ou nível central?
5. Podemos usar dado externo — INEP, data.rio, Fogo Cruzado?
6. Há acesso a BigQuery ou MCP da Prefeitura?
7. O que pode aparecer em tela, do ponto de vista de LGPD?
8. Há identificador longitudinal anonimizado?
9. Quais intervenções já são registradas, permitindo avaliar efeito?
10. Qual o formato exato da submissão?

---

## 10. Como rodar

**Backend**, com o cadastro real:

```powershell
cd C:\Users\lucas\documents\claude-educacao\backend
uv run python -m scripts.import_official_school_identity   # publica a release
$env:PULSO_MOCK_DATA_ENABLED='false'
uv run uvicorn app.main:app --host 127.0.0.1 --port 8000
```

**Frontend**, em outro terminal:

```powershell
cd C:\Users\lucas\documents\claude-educacao\frontend
npm install
npm run dev                                                # http://localhost:5173
```

`VITE_API_BASE` padrão `http://127.0.0.1:8000`. `VITE_API_MODE` = `auto`
(padrão), `live` ou `fixture`.

**Gates:**

```powershell
cd backend
uv run ruff check app tests scripts
uv run mypy app scripts
uv run python -m pytest -q

cd ..\frontend
npx tsc -b
npm run build
npm run lint
```

---

## 11. Armadilhas conhecidas

**Porta 8000 presa.** Se `/context` ou `/turmas` derem 404, provavelmente há um
uvicorn antigo segurando a porta e o novo falhou no bind em silêncio. Mate o
processo antes de investigar o código.

**UTF-8 no `curl` do Git Bash.** Acento no corpo de um POST vira 400. Não é bug
do backend — o shell corrompe os bytes. Teste com arquivo gerado em UTF-8.

**Encoding das fontes públicas.** Censo Escolar e INEP são latin-1 com `;`.
data.rio CSV é UTF-8 com BOM. ArcGIS `f=json` vem com mojibake — use o CSV.

**Nunca joine por nome de bairro.** O `NO_BAIRRO` do Censo tem 238 valores
distintos contra 162 bairros oficiais; 5% não casam. Use point-in-polygon.

**Códigos de município divergem.** INEP e IBGE usam `3304557`; SIOPE usa
`330455`.

**Render pesado no mapa.** 1.588 pontos SVG com transição CSS simultânea travam
o navegador ao trocar filtro. As transições por ponto foram removidas por isso.

**N+1 em agregação.** Chamar uma função que faz `getSchoolMap()` dentro de um
laço recompõe 1.588 escolas por iteração. Leia o mapa uma vez e agregue.

---

## 12. Onde está cada coisa

```text
docs/
  ESTADO-DO-PROJETO.md                          ← este arquivo
  api/frontend-handoff.md                       contrato backend↔frontend
  api/frontend-agent-school-context-handoff.md  painel da escola e plano de ação
  api/backend-agent-turma-grain-handoff.md      grão de turma + 2 adendos de schema
  api/backend-agent-sme-pipeline-synthetic-handoff.md  sintéticos nos schemas da SME
  product/vision.md · capabilities.md · regras-de-negocio.md · premissas.md
  product/correcao-rota-backend-impact-lab-2026-08-30.md
  architecture/overview.md · privacy-and-safety.md · agent-runtime.md
  data/school-identity-release-contract.md

relatorio-claude-impact-lab-rio-educacao-2026-08-30.md   pesquisa de preparação
pesquisa_agenda_recente_sme_rio_e_hipoteses_hackathon.md agenda da SME e hipóteses
hackathon_sme_rio_fontes_e_gaps.md                       fontes de dados e gaps

backend/app/   analytics · ai · schools · intake · mapping · data_access · strategy
frontend/src/  screens · api · domain · components
               api/pipeline.ts  sintéticos nos schemas da SME (fluxo, carência, ano)
               api/turmas.ts    grão de turma, habilidades e aula entregue
```

**Política Git:** nenhum commit, push ou `git add` é automático. A decisão é do
mantenedor. Nunca versione dado pessoal, upload, banco local, segredo ou payload
de modelo — e revise `git diff --cached --name-only` antes do primeiro commit.
