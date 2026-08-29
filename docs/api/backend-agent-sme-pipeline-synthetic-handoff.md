# Instruções para o Hermes — sintéticos nos schemas da SME e endpoints de decisão

Escrito pelo agente de frontend em 29/08/2026, véspera do evento.

## 1. A aposta

O briefing provavelmente entrega recortes nas formas do pipeline deles. Se
gerarmos sintético **nos schemas reais**, amanhã a troca é de origem, não de
código: o mesmo mapeamento canônico, os mesmos endpoints, as mesmas telas.

Os schemas foram verificados em `github.com/prefeitura-rio/pipelines_rj_sme` e
estão descritos nos adendos 1 e 2 de
`docs/api/backend-agent-turma-grain-handoff.md`. Este documento diz o que gerar
e o que expor.

**Princípio que não se negocia:** geramos no **grão que o produto consome**, que
é turma para cima. Nada de linha de aluno nos assets analíticos.

## 2. O que gerar

Um cenário novo, `sme_pipeline_v1`, publicando release própria — sem mexer no
ponteiro default. Sugestão de nome de asset entre parênteses.

### 2.1 `coc` — Conselho de Classe (`sme_coc.parquet`)

Grão: **turma × ano × COC**.

| coluna | origem no schema deles |
|---|---|
| `id_escola`, `id_cre` | `coc` |
| `id_turma`, `id_turma_escola` | `coc` |
| `ano`, `id_coc` | `coc` |
| `grupamento` | ano de escolaridade — 1º ao 9º, Carioca I/II |
| `turno` | Manhã · Tarde · Noite · Integral |
| `alunos`, `vagas`, `capacidade` | `coc` |

Não gere `masculino`, `feminino` nem `deficiente`: são recortes sensíveis que só
entram com autorização do briefing.

### 2.2 `avaliacao` — notas do COC (`sme_avaliacao.parquet`)

Grão: **turma × COC × disciplina**, já agregado. Nunca por aluno.

| coluna | nota |
|---|---|
| `id_turma`, `id_coc`, `ano`, `grupamento` | chave |
| `disciplina` | matematica, portugues, ciencias, geografia, historia, ingles, educacao_fisica |
| `nota_media` | 0,0 a 10,0 |
| `avaliados`, `elegiveis` | para cobertura e supressão |

### 2.3 `frequencia` — carga e faltas (`sme_frequencia.parquet`)

Grão: **turma × disciplina × período**.

`dias_letivos`, `tempos_letivos`, `carga_horaria_semanal`, `faltas_disciplina`,
`faltas_global`, `alunos_matriculados`.

### 2.4 `frq_frequencia` — o estado da aula (`sme_aula_situacao.parquet`)

**Este é o asset mais importante do lote.** Grão: **turma × disciplina ×
período**, com contagem por estado.

| coluna | valor |
|---|---|
| `aulas_previstas` | `id_situacao = 1` |
| `aulas_dadas` | `id_situacao = 4` |
| `aulas_canceladas` | `id_situacao = 6` |
| `aulas_excluidas` | `id_situacao = 3` |
| `aulas_sem_lancamento` | previstas sem par em dadas |
| `diario_lancado`, `plano_lancado` | contagem de registros preenchidos |
| `faltas_nas_dadas` | faltas dentro das aulas efetivamente dadas |

Correlação narrativa sugerida, nunca causalidade: escolas com frequência pior
acumulam mais cancelamento e menos lançamento. Registre isso no cenário.

### 2.5 `movimentacao` — fluxo (`sme_movimentacao.parquet`)

Grão: **escola × período × tipo de movimentação**, agregado.

| coluna | nota |
|---|---|
| `id_escola`, `ano`, `mes`, `grupamento` | chave |
| `tipo` | ENTRADA · SAIDA |
| `destino` | INTERNO_REDE · EXTERNO · NAO_INFORMADO |
| `movimentacao` | descrição do motivo, vocabulário deles |
| `quantidade` | contagem agregada |
| `trajetorias_interrompidas` | estudantes com 3+ movimentações no ano, **contagem apenas** |

`trajetorias_interrompidas` é contagem, jamais lista. É o sinal que antecipa
abandono, e é justamente o que não pode virar rótulo de indivíduo.

### 2.6 `disciplinas_sem_professor` (`sme_carencia.parquet`)

Grão: **escola × turma × disciplina × período**.

`horas_previstas`, `horas_sem_professor`, `situacao` (SEM_PROFESSOR ·
COBERTURA_PARCIAL · COBERTO). Nenhum identificador de profissional, em nenhuma
hipótese.

### 2.7 `dependencia` — infraestrutura (`sme_dependencia.parquet`)

Grão: **escola × tipo de espaço**. `tipo`, `quantidade`, `aloca_turma`,
`capacidade_total`, `area_total_m2`.

### 2.8 `prova_rio` — habilidades (`sme_prova_rio.parquet`)

Grão: **turma × disciplina × habilidade**, agregado.

`cd_habilidade`, `dc_habilidade` (rótulo da matriz, **nunca enunciado de item**),
`acertos`, `total_itens`, `tx_acerto`, `vl_proficiencia`,
`vl_proficiencia_erro`, `dc_padrao` ∈ {ABAIXO_DO_BASICO, BASICO, ADEQUADO,
AVANCADO}, `avaliados`.

### 2.9 Opcional — o arquivo que deve ser bloqueado

Um CSV **fora da release analítica**, em `data/scenarios/samples/`, imitando
`aluno_historico_2025` com colunas `nome`, `cpf`, `nis_aluno`, `filiacao_1`,
`endereco`, `cep`, `raca_cor`, `data_nascimento` — valores obviamente falsos.

Serve para a demo do perfilador: arrasta na tela Dados, o intake detecta PII e
**bloqueia antes de qualquer persistência**. Prova o guardrail funcionando em vez
de afirmá-lo. Nunca deve ser carregado pelo DuckDB analítico.

## 3. Regra de PII na geração

Nenhum asset analítico tem linha de aluno. Onde o grão real é por aluno,
geramos já agregado por turma. `raca_cor`, `bolsa_familia` e
`cartao_familia_carioca` **não entram** — são sensíveis pela LGPD e só com
autorização explícita do briefing, agregados e com supressão.

## 4. Indicadores e dimensões novos

```python
AnalyticsIndicatorId = Literal[
    # existentes
    "attendance_rate", "assessment_score", "capacity_utilization",
    "teacher_shortage_rate", "assessment_participation",
    "skill_mastery_rate", "lessons_delivered_rate",
    # novos
    "lessons_cancelled_rate",         # canceladas / previstas
    "lessons_unlogged_rate",          # sem lançamento / previstas
    "subject_grade_mean",             # nota do COC, escala 0–10
    "class_occupancy_rate",           # alunos / capacidade, grão turma
    "enrolment_balance",              # (entradas − saídas) / matrícula
    "external_exit_rate",             # saídas externas / matrícula
    "interrupted_trajectory_rate",    # trajetórias interrompidas / matrícula
    "discipline_without_teacher_rate",# horas sem professor / horas previstas
    "space_per_student",              # m² por estudante
]
```

`subject_grade_mean` precisa de fórmula própria (`weighted-mean-score-v1`,
unidade `points`, escala 0–10) — não é razão e não pode ser espremido em
`skill_mastery_rate`.

Em `ObservationDimensions`, acrescentar:

```python
turno: str | None = None          # Manhã · Tarde · Noite · Integral
movement_type: str | None = None  # ENTRADA · SAIDA
movement_target: str | None = None# INTERNO_REDE · EXTERNO · NAO_INFORMADO
```

## 5. Endpoints

### 5.1 Fluxo de matrícula

```http
GET /api/v1/network/flow?cre=&school_id=&grade=&period=
```

Por escopo: `entradas`, `saidas_internas`, `saidas_externas`, `saldo`,
`trajetorias_interrompidas`, `matricula_base`, mais os motivos agregados com
contagem. Cobertura e `evidence_id` como em qualquer observação.

**Responde:** "estou perdendo aluno para onde?" — que o abandono de 0,1%, sendo
medida de estoque, não responde.

### 5.2 Carência virando aula perdida

```http
GET /api/v1/network/staffing-gap?cre=&school_id=&period=
```

Por disciplina: `turmas_sem_professor`, `horas_sem_professor`,
`aulas_canceladas`, `aulas_previstas`, `taxa_cancelamento`.

**Regra de texto obrigatória na resposta:** as duas séries **coincidem**; a
resposta não afirma que a carência causou o cancelamento. Coloque isso em
`limitations`, para a interface não ter que inventar a ressalva.

### 5.3 Corte por ano de escolaridade

```http
GET /api/v1/network/by-grade?cre=&indicator=
```

Série do 1º ao 9º ano mais Carioca I/II, para o indicador pedido.

**Responde:** "por que os anos finais não andam?" — a dor pedagógica que a
própria SME expõe, com IDEB de anos iniciais subindo e anos finais parado. A
transição do 5º para o 6º é onde a curva quebra, e ninguém desenha isso.

### 5.4 Ocupação por turma

Estender `GET /api/v1/schools/{id}/turmas` com `alunos`, `vagas`, `capacidade`,
`turno` e `class_occupancy_rate`. Turma suprimida continua listada com motivo.

### 5.5 Infraestrutura

```http
GET /api/v1/schools/{id}/infrastructure
```

Espaços por tipo, `aloca_turma`, capacidade, área, e `space_per_student`.

### 5.6 Sinais cruzados — a peça central

```http
GET /api/v1/network/signals?cre=&limit=20
```

Substitui as situações hardcoded da tela Hoje. Por unidade ou CRE:

```jsonc
{
  "signal_id": "sig-...",
  "scope": { "type": "SCHOOL", "id": "..." },
  "title": "…",                    // linguagem de gestão
  "level": "critical|attention|low|degraded|unreadable",
  "components": {                  // sempre visíveis, nunca colapsados
    "severity": 0.0,
    "trend": 0.0,
    "persistence": 0.0,
    "population": 0.0,
    "confidence": 0.0
  },
  "contributing_indicators": ["lessons_cancelled_rate", "external_exit_rate"],
  "evidence_ids": ["ev1:…"],
  "blocked": false,
  "blocked_reason": null,
  "limitations": ["…"]
}
```

Três regras:

1. **Os componentes ficam visíveis.** Um score único que esconde cobertura é
   proibido pelas regras de negócio.
2. **Sinal bloqueado é sinal de primeira classe.** Se a cobertura não sustenta,
   `blocked: true` com motivo, sem número. Ele aparece na lista, não some.
3. **Coincidência não é causa.** Vários indicadores contribuindo significa que
   coincidem no escopo — a resposta não pode implicar mecanismo.

## 6. Preparado para o dado real de amanhã

O ganho só existe se o caminho for o mesmo. Três exigências:

**Mesmos campos canônicos.** O gerador emite as colunas com os nomes do
pipeline deles, e o intake mapeia por alias. Um arquivo real do briefing
percorre exatamente o mesmo caminho do sintético.

**Aliases completos.** Além dos já adicionados, garanta: `id_situacao`,
`aulas_previstas`, `aulas_dadas`, `aula_cancelada`, `diario_classe`,
`plano_aula`, `dias_letivos`, `tempos_letivos`, `carga_horaria_semanal`,
`faltas_disciplina`, `faltas_global`, `id_coc`, `grupamento`, `turno`,
`id_turma_escola`, `cd_habilidade`, `dc_padrao`, `vl_proficiencia`,
`tur_id`, `esc_id`, `alu_id`, `id_movimentacao`, `data_movimentacao`,
`id_inep`, `id_designacao`.

**Bloqueio de PII por padrão.** Tokens: `cpf`, `nis`, `filiacao`, `endereco`,
`cep`, `religiao`, `raca_cor`, `bolsa_familia`, `cartao_familia_carioca`,
`data_nascimento`, `naturalidade`, `tempo_deslocamento`, `regressa_sozinho`,
`nome_responsavel`. Detectado, o dataset vai a `BLOCKED` antes de qualquer
persistência analítica ou envio ao modelo.

**Cenário separado.** Publique em release própria
(`--release-namespace scenario`), sem tocar no ponteiro default. Amanhã o dado
real entra como outra release e a troca é de ponteiro.

## 7. Critérios de aceite

1. release `sme_pipeline_v1` publicada, com manifesto, seed e SHA256 por arquivo;
2. nenhum asset analítico contém linha de aluno;
3. `raca_cor`, `bolsa_familia` e `cartao_familia_carioca` ausentes dos assets;
4. `/network/flow` separa saída interna de externa e devolve trajetórias
   interrompidas como contagem;
5. `/network/staffing-gap` traz a ressalva de não causalidade em `limitations`;
6. `/network/by-grade` cobre 1º ao 9º mais Carioca I/II;
7. `/network/signals` devolve componentes visíveis e ao menos um sinal bloqueado
   no cenário;
8. turma abaixo do limiar continua listada, suprimida e com motivo;
9. o CSV de amostra com PII falsa é bloqueado pelo intake e não é carregado pelo
   DuckDB analítico;
10. suíte, Ruff, MyPy e lock verdes.

## 8. O que eu faço no front

Ao comando do Lucas, e nesta ordem:

1. **Hoje deixa de ser fixture** — as situações passam a vir de
   `/network/signals`, com os cinco componentes visíveis por card;
2. **Fluxo de matrícula** — saldo por escola, saída interna versus externa,
   trajetórias interrompidas;
3. **Carência × aula perdida** — o cruzamento, com a ressalva de coincidência;
4. **Corte por ano** — a quebra do 5º para o 6º;
5. **Ocupação por turma e infraestrutura** — na Escola 360.

Se algum nome de campo mudar, é troca de tipo no adaptador — me avise.
