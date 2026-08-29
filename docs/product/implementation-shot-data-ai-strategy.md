# Tiro de implementação — Produto adaptável de inteligência gerencial da rede

Status: implementado no backend como contrato inicial em `/api/v1/strategy/data-plan`.
Data: 2026-08-29.

## 1. Decisão crítica

A direção correta não é apostar em um produto fechado para um único programa. A evidência pública e os docs locais apontam para um produto adaptável: uma camada de inteligência gerencial para SME/CRE que consegue receber o dataset do desafio, perfilar, mapear chaves, calcular KPIs determinísticos, expor qualidade/cobertura e então deixar Claude explicar evidências e próximos passos.

A hipótese mais forte continua:

> aprendizagem + frequência + escola/CRE + evidência/qualidade, com possibilidade de descer para gestor escolar e professor quando a granularidade permitir.

O nível família/pai é explicitamente posterior e mais restrito, porque envolve comunicação externa, finalidade, consentimento/base legal e risco de exposição indevida.

## 2. Correção sobre dados reais e INEP

Sim: os documentos apontam que dá para cruzar dados reais do INEP. Isso aparece principalmente no relatório de pesquisa e fontes/gaps:

- Censo Escolar INEP: cadastro de escolas, infraestrutura, turma, matrícula, movimento e rendimento escolar;
- Catálogo de Escolas INEP: identidade e geolocalização de escolas;
- IDEB/SAEB: resultado externo por escola/rede/etapa/ano;
- `co_entidade`/INEP como chave de junção com `inep_id`/cadastro SME;
- possibilidade de usar INEP como baseline público quando os dados internos da SME vierem incompletos.

Mas isso ainda não significa que o app esteja ingerindo INEP hoje. A situação real do runtime é:

- INEP é fonte real candidata e cruzável;
- SME/IplanRio `educacao_basica` é metadado confirmado/candidato;
- nenhum arquivo real do INEP ou SME está conectado aos endpoints analíticos atuais;
- os endpoints atuais usam release sintética governada em Parquet.

Portanto, a formulação honesta é:

> Temos base documental forte para cruzar com INEP, mas o produto hoje ainda roda em mock/sintético. O próximo passo é criar o adapter/ingestão da dimensão oficial de escolas com INEP/SME.

## 3. O que estamos ingerindo hoje

Runtime operacional:

```text
data/generated/current.json
  -> data/generated/releases/<release_id>/
```

O backend usa `DuckDBDataAccess` para resolver o ponteiro `current.json`, validar `manifest.json`, checar hashes/schema/source_kind e consultar Parquet via DuckDB.

Arquivos da release atual:

```text
schools.parquet
attendance_facts.parquet
assessment_facts.parquet
capacity_facts.parquet
teacher_shortage_facts.parquet
quality_observations.parquet
manifest.json
```

Os arquivos soltos em `data/generated/*.parquet` existem por compatibilidade/legado e não devem ser tratados como fonte operacional quando há `current.json`.

## 4. O que estamos sintetizando

### 4.1 Escolas

`schools.parquet` sintetiza 30 escolas fictícias.

Campos:

```text
school_id, school_name, inep_id, sme_designation, cre, neighborhood,
latitude, longitude, dependency, location_source, match_method, location_quality
```

O que representa:

- dimensão mínima para mapa, CRE, drill-down e join com fatos;
- CREs de 1 a 11;
- bairros sintéticos;
- coordenadas sintéticas na região aproximada do Rio;
- campos INEP/designação presentes, mas nulos/sintéticos conforme a geração.

Tipo de fonte: `SYNTHETIC_SCHEMA_FAITHFUL`.

Interpretação: schema útil para ensaiar produto, não cadastro real.

### 4.2 Frequência

`attendance_facts.parquet` sintetiza frequência agregada mensal por escola.

Campos:

```text
school_id, period, present_count, expected_count
```

Fórmula:

```text
attendance_rate = sum(present_count) / sum(expected_count)
```

Tipo de fonte: `SYNTHETIC_SCHEMA_FAITHFUL`.

O que falta no real:

- frequência diária ou por aula;
- falta justificada/não justificada;
- aula não lançada;
- turma, série, turno;
- movimentações e vínculo longitudinal.

### 4.3 Aprendizagem/avaliação

`assessment_facts.parquet` sintetiza avaliação mensal por escola e disciplina.

Campos:

```text
school_id, period, subject, score, participants, eligible
```

Fórmula:

```text
assessment_score = sum(score * participants) / sum(participants)
```

Tipo de fonte: `SYNTHETIC_SCHEMA_FAITHFUL`.

O que falta no real:

- instrumento de avaliação: ADR, Prova Rio, avaliação bimestral, simulado etc.;
- ano/série;
- turma;
- descritor/habilidade;
- participantes/elegíveis reais;
- janela e regra de comparabilidade.

### 4.4 Capacidade

`capacity_facts.parquet` sintetiza matrícula/capacidade mensal por escola.

Campos:

```text
school_id, period, enrolled, capacity
```

Fórmula:

```text
capacity_utilization = sum(enrolled) / sum(capacity)
```

Tipo de fonte: `SYNTHETIC_INFERRED`.

Interpretação: útil para simular destinação de recursos/vagas, mas mais especulativo que frequência/avaliação.

### 4.5 Pessoal/carência docente

`teacher_shortage_facts.parquet` sintetiza carência docente por escola, mês e disciplina.

Campos:

```text
school_id, period, subject, shortage_hours, required_hours
```

Fórmula:

```text
teacher_shortage_rate = sum(shortage_hours) / sum(required_hours)
```

Tipo de fonte: `SYNTHETIC_INFERRED`.

Interpretação: módulo candidato para recursos/pessoal, mas não deve ser tese principal sem briefing.

### 4.6 Qualidade/cobertura

`quality_observations.parquet` sintetiza checks de cobertura por escola.

Campos:

```text
school_id, check_id, coverage, status
```

Uso:

- bloquear interpretação quando qualidade é baixa;
- mostrar se problema é educacional ou de dado;
- alimentar `/api/v1/data/quality`.

Tipo de fonte: `SYNTHETIC_INFERRED`.

## 5. Novo endpoint implementado

```text
GET /api/v1/strategy/data-plan
```

Ele retorna, em contrato versionado:

- tese de produto;
- runtime atual e release sintética;
- fontes reais candidatas: SME/IplanRio, INEP Censo Escolar, INEP IDEB/SAEB;
- domínios de adaptação: aprendizagem, frequência, capacidade/pessoal, intervenções, aluno/família;
- escada de uso de IA por role;
- gaps críticos que bloqueiam a evolução para dados reais;
- próximo tiro de implementação.

Esse endpoint não calcula KPI novo. Ele governa a narrativa e impede que frontend/Claude finjam que dados reais já estão ingeridos.

## 6. Como isso fortalece o produto

Para SME/CRE:

- priorização territorial e por escola;
- comparação com cobertura e limitações;
- foco em destinação de recurso/programa sem ranking cego.

Para gestor escolar:

- briefing da escola;
- tendências e evidências;
- perguntas para reunião pedagógica;
- sem avaliação automática de professor.

Para professor:

- só deve entrar quando houver dado de turma/habilidade;
- IA pode apoiar foco pedagógico, mas não julgar professor/aluno.

Para família:

- fase posterior;
- sem PII no MVP;
- sem mensagem automática.

## 7. Próximo tiro recomendado

1. Implementar supressão de grupos pequenos e gates de privacidade antes de qualquer recorte por turma/grupo.
   - Feito no backend para `network/snapshot`: escopos com menos de 3 escolas retornam observações suprimidas (`value`, `numerator` e `denominator` nulos) e evidência preserva a supressão.
   - Próxima camada: role/permission para mapa/perfil escolar e, quando turma/aluno existir, limiar por estudantes participantes/elegíveis.
2. Criar adapter de identidade escolar oficial: SME escola + INEP Censo Escolar/Catálogo de Escolas.
3. Criar `Dataset Readiness` específico para o briefing: dado recebido -> perfil -> mapping -> gaps -> módulos ativáveis.
4. Implementar fake provider de Claude governado por `evidence_id`, `snapshot_id` e `data-plan`, proibindo acesso a linhas brutas.
   - Feito para briefing IA via `POST /api/v1/ai/briefings`: provider `fake` determinístico, policy nega linhas brutas e decisão automática, e `anthropic` falha fechado se não configurado.
   - Próxima camada: prompts/tool schemas por role (`central_manager` -> `school_manager` -> `teacher` -> `guardian`) e autorização explícita para provider externo.

Prioridade técnica imediata: privacidade antes de aprofundar roles para professor/família.
