# Instruções para o Hermes — grão de turma, habilidade e aula entregue

Escrito pelo agente de frontend em 29/08/2026, véspera do Claude Impact Lab Rio #2.
Não é pedido de refatoração: é a menor mudança de contrato que faz o produto
aceitar o dataset que a SME provavelmente vai entregar.

## 1. Por que agora — a evidência

**Circular E/SUBE/CAV nº 08/2026, de 24/08/2026** (cinco dias antes do evento)
orienta a **Atividade Diagnóstica em Rede do 3º bimestre**: 1º ao 9º ano mais
Carioca I e II, Língua Portuguesa, Matemática e Ciências, cartões-resposta com
leitura ótica, resultados publicados no Rioeduca em Ação e no GPÁgil, devolutiva
**por aluno e por turma** aos professores, uso em encontros pedagógicos, e
relatórios de níveis de aprendizagem.

O pipeline público da SME (`prefeitura-rio/pipelines_rj_sme`) tem 9 tabelas
centrais — `aluno`, `aluno_historico_2025`, **`aluno_turma`**, `avaliacao`,
`coc`, `dependencia`, `escola`, `frequencia`, `movimentacao` — e 21 modelos SQL,
incluindo `disciplinas_sem_professor`, `prova_rio`, avaliações bimestrais de 2012
a 2024, e **oito modelos de frequência**: carga, dias de COC, frequência, número
de aulas, turma e visões acumuladas.

O Trilhas de Recomposição (05/2025, IplanRio + SME, integrado ao DiáRio) é
precedente institucional relevante, **não** prioridade comprovada em 2026 — não
há menção pública a ele neste ano.

**A conclusão:** o instrumento vivo da rede opera em **turma** e em
**habilidade**. Nosso modelo inteiro para na escola. Uma ferramenta gerencial que
não desce até a turma não consegue agir sobre a ADR.

## 2. O que muda, em ordem

1. escopo `TURMA` no analytics;
2. dimensões de observação (disciplina, ano, habilidade, nível);
3. indicadores de aula prevista versus aula lançada;
4. supressão recalibrada para o novo grão;
5. campos canônicos e aliases no intake/mapping;
6. endpoints.

Tudo aditivo. Nada do que o frontend já consome deve mudar de forma.

## 3. Escopo de turma

### 3.1 `ScopeType`

```python
class ScopeType(StrEnum):
    NETWORK = "NETWORK"
    CRE = "CRE"
    SCHOOL = "SCHOOL"
    TURMA = "TURMA"        # novo
```

`AnalyticsScope.coherent_id` ganha o ramo de turma. Proposta de formato de id,
que já passa no `pattern` atual (`^[A-Za-z0-9][A-Za-z0-9._-]*$`):

```text
<school_id>.<codigo_turma>
SME-RIO-0515062.1901
```

O id da turma deve ser opaco e estável. Se o dataset trouxer código próprio,
use-o; não derive de nome de turma.

### 3.2 Risco concreto: caixa alta nos ids de evidência

`observation_id` e `evidence_id` validam contra `^(obs1|ev1):[a-z0-9:._-]+$` —
**apenas minúsculas**. Os ids de escola da release oficial são maiúsculos
(`SME-RIO-0515062`). Hoje isso não quebra porque nenhum escopo `SCHOOL` é
emitido; no instante em que `SCHOOL` ou `TURMA` for emitido, a validação falha.

Correção sugerida: normalizar para minúsculas **apenas dentro do id composto**,
preservando `scope.id` no caso original.

```text
ev1:<snapshot>:turma:sme-rio-0515062.1901:skill_mastery_rate:2026-08-01
scope = { "type": "TURMA", "id": "SME-RIO-0515062.1901" }
```

Vale um teste de contrato para escopo `SCHOOL` e `TURMA` com id maiúsculo.

## 4. Dimensões da observação

Não exploda `AnalyticsIndicatorId`. Adicione um bloco opcional de dimensões — é
aditivo e não quebra nenhum consumidor atual.

```python
class ObservationDimensions(StrictModel):
    subject: str | None = None            # lingua_portuguesa, matematica, ciencias
    grade: str | None = None              # "5", "9", "carioca_i"
    skill_id: str | None = None           # descritor da matriz de referência
    skill_label: str | None = None        # rótulo legível, sem PII
    proficiency_level: str | None = None  # nível declarado pela rede
    period_label: str | None = None       # "3º bimestre"
```

```python
class ObservationRecordV1(StrictModel):
    ...
    dimensions: ObservationDimensions | None = None
```

Regra: `skill_label` é rótulo da matriz, nunca texto livre do dataset. Se o
dataset trouxer enunciado de item, **não** repassar — é conteúdo de prova.

## 5. Indicadores novos

```python
AnalyticsIndicatorId = Literal[
    "attendance_rate",
    "assessment_score",
    "capacity_utilization",
    "teacher_shortage_rate",
    # novos
    "assessment_participation",   # participantes / elegíveis
    "skill_mastery_rate",         # acertos / itens, por descritor
    "lessons_delivered_rate",     # aulas lançadas / aulas previstas
]
```

Fórmulas sugeridas para `_FORMULAS`:

```python
"assessment_participation": frozenset({"ratio-of-sums-v1"}),
"skill_mastery_rate":       frozenset({"ratio-of-sums-v1"}),
"lessons_delivered_rate":   frozenset({"ratio-of-sums-v1"}),
```

### 5.1 `lessons_delivered_rate` é o diferencial

Este é o indicador que ninguém publica e que separa três coisas que hoje viram
uma só:

- **aluno ausente** — `attendance_rate` baixo com aula lançada;
- **aula não lançada** — registro faltando;
- **aula não ofertada** — `lessons_delivered_rate` baixo.

Os insumos existem no pipeline deles: `numero_de_aulas`, `carga`, `dias_de_coc`.

**Correção necessária no produto:** hoje declaramos na interface que *"não há
dado de aula ofertada versus aula lançada"*. Se o briefing trouxer esses campos,
essa frase fica errada. Ela deve virar condicional à presença do indicador.

## 6. Supressão no novo grão

Esta é a parte que mais exige cuidado, porque o grão desce e a unidade suprimida
muda de escola para **aluno**.

- `privacy_min_school_count` fica com nome enganoso em escopo de turma. Proponho
  generalizar para `privacy_min_unit_count`, mantendo o campo antigo como alias
  deprecado para não quebrar o contrato publicado;
- turma com menos de N alunos avaliados é **suprimida**, não agregada;
- a supressão vale **por célula**: turma × habilidade pode cair abaixo do limiar
  mesmo quando a turma inteira passa;
- nunca emitir observação com escopo de aluno, em nenhuma circunstância;
- `disciplinas_sem_professor` é sinal de **disciplina × turma**, nunca de pessoa.
  Não emitir nada que permita inferir professor individual.

O contrato já bloqueia valor em observação suprimida — mantenha essa invariante e
estenda os testes para o grão de turma.

## 7. Intake e mapping

Os aliases são o que decide a velocidade às 9h30. Sugestão de campos canônicos
novos em `CanonicalField`:

```python
TURMA_ID = "turma_id"
TURMA_LABEL = "turma_label"
GRADE = "grade"
SUBJECT = "subject"
SKILL_ID = "skill_id"
PROFICIENCY_LEVEL = "proficiency_level"
LESSONS_PLANNED = "lessons_planned"
LESSONS_DELIVERED = "lessons_delivered"
PERIOD_LABEL = "period_label"
```

Aliases prováveis, a partir do vocabulário do pipeline e das circulares:

| canônico | aliases esperados |
|---|---|
| `turma_id` | `id_turma`, `turma`, `cod_turma`, `codigo_turma` |
| `turma_label` | `nome_turma`, `descricao_turma` |
| `grade` | `serie`, `ano_escolar`, `ano`, `etapa` |
| `subject` | `componente`, `componente_curricular`, `disciplina`, `materia` |
| `skill_id` | `descritor`, `habilidade`, `cod_habilidade`, `codigo_descritor` |
| `proficiency_level` | `nivel`, `nivel_aprendizagem`, `nivel_proficiencia` |
| `lessons_planned` | `aulas_previstas`, `carga`, `carga_horaria`, `numero_de_aulas` |
| `lessons_delivered` | `aulas_dadas`, `aulas_lancadas`, `aulas_ministradas` |
| `period_label` | `bimestre`, `periodo`, `bim` |

`TURMA_ID` deve entrar em `JoinTargetField` — mas só como alvo composto com
`SCHOOL_ID`. Código de turma isolado não é chave estável entre escolas.

Mantenha a regra: nada de match fuzzy por nome de turma.

## 8. Endpoints

### 8.1 Escopo no snapshot

Estenda o existente, preservando `cre` para compatibilidade. O mais específico
vence:

```http
GET /api/v1/network/snapshot?cre=5
GET /api/v1/network/snapshot?school_id=SME-RIO-0515062
GET /api/v1/network/snapshot?school_id=SME-RIO-0515062&turma_id=1901
```

### 8.2 Turmas de uma escola

```http
GET /api/v1/schools/{school_id}/turmas
```

Resposta, por turma: `turma_id`, `turma_label`, `grade`, contagem de alunos
avaliados (ou `suppressed: true`), cobertura por indicador, e `limitations`.

Regra de UX que depende do backend: **turma suprimida aparece na lista**, com o
motivo, em vez de sumir. Mesma disciplina do `IDENTITY_ONLY` que você já
implementou em `/schools/{id}/context` — e que funcionou muito bem.

**Por que turmas não pode entrar dentro de `/context`:** depois da sua última
entrega, `/schools/{id}/context` passou a ser chamado a cada clique no mapa.
Ele está no caminho quente e precisa continuar leve. Embutir a lista de turmas
ali faria toda seleção de escola pagar o custo de uma agregação que a maioria
dos cliques não usa. Endpoint separado, carregado sob demanda quando o painel
da escola abrir.

### 8.3 Matriz de habilidades

O maior retorno por hora, se o briefing for avaliação:

```http
GET /api/v1/schools/{school_id}/skills?period=2026-3
```

Resposta: turmas nas linhas, habilidades nas colunas, cada célula com `value`,
`quality`, `suppressed`, `evidence_id`. É literalmente a devolutiva da ADR
virando decisão de gestão.

Se faltar tempo, esta é a única do documento que pode esperar — a matriz pode ser
montada no frontend a partir de observações com `dimensions.skill_id`. Mas o
endpoint é melhor, porque mantém a agregação no backend determinístico.

## 9. O que NÃO fazer

- nenhuma observação em escopo de aluno, nem agregada "de um aluno só";
- nenhum ranking de turma, escola ou professor;
- nenhum enunciado de item ou conteúdo de prova na resposta;
- nenhuma inferência de habilidade a partir de texto livre;
- não trocar `IDENTITY_ONLY` por erro quando a turma existir sem métrica.

## 10. Critérios de aceite

1. escopo `TURMA` válido, com id composto e validador próprio;
2. `SCHOOL` e `TURMA` com id em caixa alta produzem `evidence_id` válido;
3. observação com `dimensions.skill_id` sobrevive ao round-trip do contrato;
4. turma abaixo do limiar sai `suppressed=true`, sem valor, e com motivo;
5. célula turma × habilidade abaixo do limiar é suprimida mesmo com turma acima;
6. `lessons_delivered_rate` presente quando o dataset trouxer previstas e dadas;
7. `/schools/{id}/turmas` lista turmas suprimidas em vez de escondê-las;
8. nenhum campo novo vaza identificador de aluno ou professor;
9. suíte, Ruff, MyPy e lock verdes.

## 11. O que eu faço no frontend em paralelo

Começo agora contra fixture, com estas formas. Se algum nome mudar, é troca de
tipo — me avise e ajusto.

- **Escola → Turmas**: lista com cobertura, turma suprimida visível com motivo;
- **Matriz de recomposição**: turmas × habilidades, célula com nível, hachura
  para suprimido e para sem leitura, limiares publicados na legenda;
- **Aula entregue**: separação visual entre aluno ausente, aula não lançada e
  aula não ofertada — a distinção que a Secretaria hoje não consegue fazer;
- **Plano de ação por turma**, reusando `POST /api/v1/ai/school-action-plans` com
  escopo de turma quando existir.

### Detalhe de integração que virou load-bearing

A query key `['context', school_id]` agora é **compartilhada** entre o card do
mapa e a Escola 360 — o cache do React Query serve as duas telas com uma
requisição só. Se o formato de resposta de `/context` mudar, as duas quebram
juntas. Vale manter aditivo.

Preciso de duas coisas suas, na ordem: o **`ScopeType.TURMA` com o formato de id
decidido**, e a **lista de aliases** do intake. Com essas duas eu integro sem
retrabalho.

## 12. Status de implementação backend — 29/08/2026

Implementado de forma aditiva, sem alterar a forma dos consumidores existentes:

- `ScopeType.TURMA` com `scope.id = <school_id>.<turma_id>`;
- `ObservationDimensions` opcional em `ObservationRecordV1`;
- indicadores novos:
  - `assessment_participation`;
  - `skill_mastery_rate`;
  - `lessons_delivered_rate`;
- `privacy_min_unit_count` em observações, mantendo `privacy_min_school_count`;
- geração de `observation_id`/`evidence_id` com identidade em minúsculas no token
  público, preservando `scope.id` original em caixa alta;
- parser de evidência aceita `network`, `cre`, `school` e `turma`;
- `CanonicalField` recebeu campos de turma/habilidade/aula;
- `JoinTargetField` recebeu `turma_id`;
- aliases de intake/mapping adicionados para turma, ano, disciplina, habilidade,
  nível, aulas previstas/dadas e período;
- `GET /api/v1/network/snapshot` aceita `school_id` e `turma_id` além de `cre`;
- `GET /api/v1/schools/{school_id}/turmas`;
- `GET /api/v1/schools/{school_id}/skills?period=...`;
- stubs seguros no `DuckDBDataAccess` retornam 404 sanitizado quando ainda não há
  asset granular de turma/habilidade no release sintético atual.

Testes adicionados:

- `backend/tests/contract/test_turma_grain_contracts.py`;
- `backend/tests/contract/test_turma_grain_api.py`.

Gates verdes no backend:

```text
uv run ruff check app tests scripts
uv run mypy app scripts
uv run python -m pytest -q
# 268 passed, 3 skipped
```


---

# Adendo — schema real do pipeline da SME (verificado em 29/08/2026)

Escrito depois da implementação do backend. Verifiquei o repositório público e li
o schema dbt. Três coisas mudam.

## A1. O que temos e o que não temos

**Fonte verificada:** `github.com/prefeitura-rio/pipelines_rj_sme`, diretório
`queries/models/educacao_basica`. Repositório público, com os 9 modelos mais
`_educacao_basica__schema.yml` e `_educacao_basica__source.yml`.

**Distinção que importa:** o que é público são as **definições dbt** — o SQL que
constrói as tabelas. As tabelas resultantes vivem no BigQuery municipal e exigem
credencial (acesso via Discord `#peça-permissão`, conforme a pesquisa baseline).

Temos o **schema**. Não temos as **linhas**. É suficiente para modelar os
formatos certos antes do briefing, e não autoriza afirmar cobertura.

## A2. Correção: `avaliacao` não é a ADR

O schema descreve `educacao_basica__avaliacao` como *"Avaliações de alunos dadas
no COC. As notas de disciplinas estão preenchidas (de 0,0 a 10) ou com 'sem
informação'"*. As colunas são `matematica`, `portugues`, `ciencias`, `geografia`,
`historia`, `educacao_fisica`, `ingles`, mais `conceito`, `frequencia` e
`nota_fundamental_1`.

Ou seja: **nota por disciplina em Conselho de Classe, não acerto por descritor.**
E `COC` é Conselho de Classe — confirmado por `id_coc: Class council number` em
`educacao_basica__coc`.

A circular da ADR é real e recente, mas o que está modelado no pipeline hoje é o
COC. **A matriz precisa aceitar as duas formas:**

- `dimensions.skill_id` quando vier descritor da ADR;
- `dimensions.subject` sozinho quando vier nota de disciplina do COC.

Sugestão: um indicador adicional `subject_grade_mean` com fórmula
`weighted-mean-score-v1`, escala 0–10, para o caso COC. Sem isso, nota de
disciplina teria que ser espremida em `skill_mastery_rate`, que é razão e não
nota.

O grão de COC também é real: `id_coc` aparece em `coc`, `frequencia`,
`movimentacao` e `avaliacao`. É o equivalente deles a bimestre fechado, e é
melhor candidato a `period_label` do que uma data solta.

## A3. `lessons_delivered_rate` está confirmado — e é melhor do que eu supunha

`educacao_basica__frequencia` tem, por aluno e disciplina:

- `dias_letivos` — dias letivos do período;
- `tempos_letivos` — número de tempos de aula;
- `carga_horaria_semanal` — carga da disciplina;
- `faltas_global` — faltas somadas entre disciplinas;
- `faltas_disciplina` — **faltas por disciplina**.

Faltas por disciplina permitem separar aluno ausente de disciplina sem aula, que
é exatamente a pergunta. Deixou de ser aposta.

Aliases a acrescentar: `dias_letivos`, `tempos_letivos`, `carga_horaria_semanal`,
`faltas_global`, `faltas_disciplina`.

## A4. A ponte INEP pode vir de graça

`educacao_basica__escola` tem **`id_inep` e `id_designacao` na mesma linha**,
mais `cre`, `micro_area`, `polo`, `numero_salas_aula`, `numero_salas_utilizadas`
e `numero_salas_recurso`.

Se o briefing entregar essa tabela, o cruzamento com INEP vem pronto — sem match
fuzzy e sem depender da release Data.Rio, que não traz CO_ENTIDADE. Vale deixar o
mapeamento preparado para reconhecer `id_inep` e `id_designacao` vindos daí.

As três colunas de salas também dão ocupação real por unidade, hoje sintética.

## A5. PII: os aliases precisam cobrir o que existe de verdade

`educacao_basica__aluno_historico_2025` declara colunas de `nome`, `endereco`,
`cep`, `filiacao_1`, `filiacao_2`, `filiacao_1_profissao`,
`filiacao_1_escolaridade`, `cpf`, `nis_aluno`, `nis_resp`, `religiao`,
`raca_cor`, `data_nascimento`. `educacao_basica__aluno` declara `cpf`, `nome`,
`bolsa_familia`, `cartao_familia_carioca`, `raca_cor`, `bairro`.

O schema diz que vêm anonimizadas ou mascaradas, mas **as colunas existem** e
podem chegar num recorte. O perfilador precisa reconhecer esses nomes por
padrão — se um deles aparecer, o dataset é bloqueado antes de qualquer
persistência analítica ou envio ao modelo.

Tokens a garantir na detecção: `filiacao`, `nis`, `cpf`, `endereco`, `cep`,
`religiao`, `raca_cor`, `bolsa_familia`, `cartao_familia_carioca`,
`data_nascimento`, `naturalidade`, `tempo_deslocamento`, `regressa_sozinho`.

`raca_cor` merece cuidado extra: é dado sensível pela LGPD e só pode ser usado
agregado, com supressão de grupo pequeno, e apenas se o briefing autorizar
recorte de equidade.

## A6. O que isso muda na prioridade

Nada do que você já implementou precisa voltar atrás. O que falta, em ordem:

1. `subject_grade_mean` para o caso COC, escala 0–10;
2. aliases de `frequencia` e de PII acima;
3. reconhecer `id_inep` vindo da tabela `escola` do pipeline.


---

# Adendo 2 — os 12 modelos além dos 9 centrais (verificado em 29/08/2026)

Confirmei no repositório os três diretórios extras: `educacao_basica_alocacao`,
`educacao_basica_avaliacao` e `educacao_basica_frequencia`. Há ainda dois não
documentados na pesquisa: `brutos_core_sso` e `brutos_gestao_escolar`.

Duas descobertas mudam decisões que já tomamos.

## B1. `id_situacao` resolve a aula entregue de forma exata

`educacao_basica_frequencia__frq_frequencia` é descrita como *"Frequência diária
dos alunos no ano letivo corrente"*, com atualização diária. E tem o campo:

```text
id_situacao: 1 – Aula prevista · 3 – Excluído · 4 – Aula dada · 6 – Aula cancelada
```

Isso deixa de ser proxy. `lessons_delivered_rate` passa a ser contagem direta, e
o que eu tratava como decomposição de três estados é na verdade de **quatro**:

| estado | origem |
|---|---|
| aula dada com aluno presente | `id_situacao = 4`, sem falta |
| aula dada com aluno ausente | `id_situacao = 4` + `faltas_disciplina_dia` |
| **aula cancelada** | `id_situacao = 6` |
| **aula prevista que nunca virou dada** | `id_situacao = 1` sem par em 4 |

Os dois últimos são coisas diferentes e hoje viram uma só na rede: cancelamento é
oferta interrompida; prevista-sem-dada é registro faltando.

A tabela ainda traz `plano_aula` e `diario_classe` — sinal direto de aula não
lançada — além de `efetivado`, `numero_aula`, `sequencia_aula`, `data_aula` e
`carga_horaria_semanal`. Grão diário, por disciplina e por aluno.

`vw_alunos_frequencia_acumulada` documenta a fórmula da rede:
`100 - (total_faltas / total_aulas) * 100`. Vale adotá-la como
`formula_version` em vez de inventar a nossa.

**Consequência para o contrato:** além de `lessons_delivered_rate`, sugiro
`lessons_cancelled_rate` e `lessons_unlogged_rate`. Sem os três, a distinção que
é o nosso diferencial não sobrevive à agregação.

## B2. `prova_rio` sustenta a matriz de habilidades

Eu havia corrigido no Adendo 1 que `avaliacao` é nota de COC por disciplina, e
está correto. Mas `educacao_basica_avaliacao__prova_rio` traz exatamente o que
faltava:

- `cd_habilidade` — códigos de habilidade avaliados;
- `dc_habilidade_acerto` — acertos por habilidade;
- `dc_habilidade_total` — total por habilidade;
- `nu_acerto`, `tx_acerto` — acertos e percentual;
- `vl_proficiencia` e `vl_proficiencia_erro` — proficiência com margem de erro;
- `dc_padrao` — **Abaixo do Básico · Básico · Adequado · Avançado**;
- identificadores `alu_id`, `esc_id`, `tur_id`, `cd_disciplina`.

Ou seja: `skill_mastery_rate` por descritor **tem lastro real** — a fonte é
`prova_rio`, não `avaliacao`. A matriz que construí no frontend estava certa; só
a fonte que eu havia atribuído estava errada.

Duas consequências:

**`proficiency_level` deve usar os quatro padrões oficiais.** É o vocabulário que
a rede já usa em devolutiva, e é melhor que percentual solto para conversa de
gestão. Sugiro `Literal["ABAIXO_DO_BASICO", "BASICO", "ADEQUADO", "AVANCADO"]`
com rótulo legível separado.

**`vl_proficiencia_erro` merece respeito na interface.** Se vier margem de erro,
diferença entre duas turmas dentro da margem não é diferença. Vale expor o campo
para a tela poder suprimir comparação não significativa — é a diferença entre
uma ferramenta que a rede confia e mais um ranking.

## B3. Aliases a acrescentar

| canônico | aliases |
|---|---|
| `lessons_planned` | `id_situacao=1`, `numero_aula`, `numeroDeAulas` |
| `lessons_delivered` | `id_situacao=4`, `aula_dada` |
| `lessons_cancelled` | `id_situacao=6`, `aula_cancelada` |
| `lessons_unlogged` | `diario_classe`, `plano_aula`, `efetivado` |
| `skill_id` | `cd_habilidade` |
| `skill_correct` | `dc_habilidade_acerto` |
| `skill_total` | `dc_habilidade_total` |
| `proficiency_level` | `dc_padrao` |
| `proficiency_value` | `vl_proficiencia` |
| `proficiency_error` | `vl_proficiencia_erro` |
| `subject` | `cd_disciplina`, `nome_disciplina`, `id_disciplina` |
| `turma_id` | `tur_id`, `id_turma`, `id_turma_escola` |
| `school_id` | `esc_id`, `id_escola` |

## B4. Não verificado

`educacao_basica_alocacao` (`disciplinas_sem_professor`), `brutos_core_sso` e
`brutos_gestao_escolar` não foram abertos. `brutos_gestao_escolar` é o nome mais
promissor da lista e vale uma olhada quando sobrar tempo.
