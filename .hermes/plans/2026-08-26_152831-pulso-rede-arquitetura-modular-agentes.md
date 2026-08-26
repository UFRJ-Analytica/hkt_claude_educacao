# Pulso da Rede — Plano de Implementação Modular

> **Para Hermes:** quando a execução for autorizada, usar a skill `subagent-driven-development` tarefa por tarefa, com revisão de aderência à especificação antes da revisão de qualidade. Não criar commits ou fazer push sem autorização explícita do usuário.

**Objetivo:** construir um mock funcional de uma central de gestão da rede municipal de educação, com backend Python/FastAPI, frontend React, mapa interativo e agentes Claude auditáveis, capaz de ativar ou remover módulos conforme os datasets e o briefing revelados no hackathon.

**Arquitetura:** monólito modular com composição explícita. O núcleo oferece contratos, proveniência, métricas determinísticas, capacidades, auditoria e execução limitada de agentes; aprendizagem, frequência, capacidade, alocação e demais domínios entram como módulos independentes. O frontend descobre capacidades pelo backend e ativa rotas/telas sem acoplamento a módulos indisponíveis.

**Stack proposta:** Python 3.11+, FastAPI, Pydantic v2, DuckDB + Parquet para analytics, SQLite para estado operacional/auditoria, Anthropic Python SDK atrás de uma porta, React 18+, TypeScript, Vite, TanStack Query, React Router, Recharts, MapLibre GL JS, pytest, Ruff, MyPy/Pyright, Vitest, Testing Library e Playwright.

**Raiz de execução:** `C:\Users\lucas\documents\claude-educacao`

**Status do plano:** DRAFT aprovado conceitualmente; implementação ainda não iniciada.

**Última atualização:** 26/08/2026, 15:28 BRT.

---

## 1. Regras de manutenção deste plano

Este documento é uma fonte de verdade viva, não uma especificação congelada.

Quando uma premissa, regra de negócio, prioridade ou dataset mudar:

1. registrar a mudança em `docs/product/premissas.md`;
2. registrar decisão estrutural em `docs/architecture/decisions/ADR-NNN-*.md` quando afetar contratos, dependências ou responsabilidades;
3. atualizar a matriz de capacidades em `docs/product/capabilities.md`;
4. atualizar as fases e critérios de aceite deste plano;
5. atualizar contratos e testes afetados antes da implementação correspondente;
6. acrescentar uma entrada ao “Log de revisões” no final deste plano;
7. nunca apagar silenciosamente a decisão anterior: marcar como substituída e referenciar a nova decisão.

Estados permitidos para premissas:

- `CONFIRMADA`: evidência oficial ou dataset efetivamente recebido;
- `METADADO_CONFIRMADO`: schema/campo conhecido, mas sem acesso às linhas;
- `INFERIDA`: hipótese apoiada por sinais, ainda não confirmada;
- `ABERTA`: depende do briefing;
- `INVALIDADA`: evidência posterior contradisse a premissa.

Estados permitidos para capacidades:

- `AVAILABLE`: fonte e módulo operacionais;
- `MOCK_ONLY`: funcional com dados sintéticos fiéis ao schema;
- `SCHEMA_ONLY`: estrutura conhecida, sem linhas;
- `UNAVAILABLE`: fonte ausente ou bloqueada;
- `DISABLED`: capacidade removida por configuração;
- `DEGRADED`: funciona parcialmente, com limitações declaradas.

---

## 2. Contexto verificado

### 2.1 Estado do repositório de trabalho

- Git inicializado localmente.
- Branch local: `main`.
- Remoto: `https://github.com/UFRJ-Analytica/hkt_claude_educacao.git`.
- Remoto sem referências/commits no momento da verificação.
- Nenhum commit deve ser criado sem autorização explícita.
- Arquivos de pesquisa atuais e não rastreados:
  - `grok_report.pdf`;
  - `hackathon_sme_rio_fontes_e_gaps.md`;
  - `pesquisa_agenda_recente_sme_rio_e_hipoteses_hackathon.md`.

### 2.2 Restrições do evento

- hackathon de um dia;
- aproximadamente 100 participantes em times de quatro;
- problema, dataset e critérios revelados apenas no evento;
- solução precisa usar Claude de maneira central e demonstrável;
- solução deve ser compreensível por perfis técnicos e não técnicos;
- soluções promissoras serão doadas à cidade;
- implantação real não é exigida no primeiro dia, mas continuidade precisa parecer viável.

### 2.3 Evidência de dados conhecida

Núcleo curado confirmado por modelos públicos da SME:

- escola;
- aluno;
- histórico do aluno;
- aluno–turma;
- avaliação;
- frequência;
- movimentação;
- COC;
- dependências.

Domínios adicionais confirmados:

- frequência diária e acumulada;
- aula, plano de aula e falta por aluno;
- Prova Rio e avaliações bimestrais;
- disciplinas sem professor e tempos de carência;
- salas, capacidade, utilização e vagas;
- atributos agregáveis de vulnerabilidade e inclusão.

Fontes prováveis, mas não contratualmente confirmadas para o evento:

- ADR 2026;
- Trilhas/DiáRio;
- intervenções e planos de recomposição;
- comunicações com famílias;
- saúde escolar;
- transporte, alimentação e integrações intersetoriais.

---

## 3. Decisões de produto

### 3.1 Persona e jornada

Persona primária:

- gestor central da SME e gestor de CRE.

Persona secundária:

- direção escolar no drill-down.

Jornada principal:

```text
SME → CRE → escola → indicador → evidências → investigação → reunião → ação → acompanhamento
```

Não fazem parte do primeiro MVP:

- tutoria direta irrestrita ao estudante;
- avaliação automática de professor;
- decisão automática sobre matrícula, transferência ou intervenção;
- mensagens a famílias sem aprovação;
- diagnóstico clínico, social ou familiar;
- ingestão direta dos sistemas internos da Prefeitura pelo backend do mock.

### 3.2 Proposta de valor

> Uma equipe digital auditável que acompanha a rede, verifica a qualidade dos dados, identifica situações que merecem atenção, conduz investigações baseadas em evidências e prepara o ciclo de decisão e acompanhamento da SME.

### 3.3 Telas-alvo

Núcleo permanente:

1. Visão Geral da Rede.
2. Prioridades/caixa de entrada gerencial.
3. Escola 360.
4. Mapa multicamada.
5. Investigações.
6. Reuniões e planos de ação.
7. Dados e qualidade.
8. Execuções dos agentes/auditoria.

Telas modulares:

- Aprendizagem;
- Frequência e fluxo;
- Capacidade e infraestrutura;
- Carência/alocação docente;
- Equidade e inclusão;
- Programas e intervenções.

### 3.4 Ordem de probabilidade das features

**P0 — plataforma e adaptação ao briefing**

- catálogo/capabilities;
- proveniência;
- ingestão local de dataset;
- perfil de schema;
- visão geral configurável;
- qualidade dos dados;
- shell dos agentes.

**P1 — maior probabilidade temática**

1. aprendizagem, avaliação e recomposição;
2. frequência, abandono e fluxo.

**P2 — dados confirmados e alto valor operacional**

3. capacidade, vagas e infraestrutura;
4. carência e alocação docente;
5. mapa multicamada.

**P3 — extensões condicionais**

6. equidade e inclusão;
7. intervenções/Trilhas;
8. saúde, transporte, alimentação e comunicação.

---

## 4. Princípios arquiteturais

### 4.1 Monólito modular, não microserviços

O MVP terá um backend e um frontend implantáveis separadamente, mas não dividirá cada domínio em serviço remoto.

Razões:

- hackathon de um dia;
- execução local prioritária;
- menor custo operacional;
- contratos internos ainda podem mudar;
- módulos podem ser extraídos depois, se necessário.

### 4.2 Dependências apontam para o núcleo

```text
React screens
    ↓
API HTTP / OpenAPI
    ↓
Application use cases
    ↓
Domain contracts and deterministic policies
    ↑
Adapters: DuckDB, SQLite, Anthropic, files, map data
```

Regras:

- domínio não importa FastAPI, DuckDB, SQLite ou Anthropic;
- agentes não acessam banco diretamente;
- agentes usam ferramentas estreitas da camada de aplicação;
- routers não calculam regra de negócio;
- frontend não reproduz fórmula do backend;
- transformação pesada de dados fica nos adaptadores/marts, não nos routers;
- integração futura com BigQuery/MCP entra por novas implementações de portas.

### 4.3 Composição explícita

Evitar descoberta mágica de plugins. Módulos serão registrados explicitamente em um composition root.

Cada módulo de backend oferece:

- identificador estável;
- routers;
- use cases;
- requisitos de dados;
- indicadores;
- ferramentas permitidas aos agentes;
- health/capability status.

Cada módulo de frontend oferece:

- identificador correspondente;
- rota;
- navegação;
- componente de página;
- capacidades exigidas;
- fallback quando indisponível.

Remover um módulo significa retirá-lo do registry/configuração, sem editar o núcleo.

### 4.4 Capability API como contrato de modularidade

Endpoint obrigatório:

`GET /api/v1/capabilities`

Para cada capacidade:

```json
{
  "id": "attendance",
  "status": "MOCK_ONLY",
  "source_status": "METADATA_CONFIRMED",
  "screens": ["attendance", "school_360", "map"],
  "agents": ["network_pulse", "investigator"],
  "limitations": ["synthetic facts"],
  "updated_at": "2026-08-26T00:00:00-03:00"
}
```

O frontend usa essa resposta para:

- habilitar/desabilitar navegação;
- mostrar badges de disponibilidade;
- impedir telas vazias sem explicação;
- preservar a aplicação quando um módulo for removido.

### 4.5 Métricas determinísticas, IA orquestradora

Código determinístico calcula:

- frequência;
- notas/proficiência;
- tendências;
- cobertura;
- distâncias;
- vagas/capacidade;
- comparação estatística;
- grupos de pares;
- regras de prioridade;
- supressão LGPD;
- cenários de otimização.

Claude pode:

- escolher ferramentas autorizadas;
- interpretar schema e metadados;
- consolidar sinais;
- produzir hipóteses;
- declarar limitações;
- preparar dossiês, pautas e sínteses;
- pedir dados/revisão humana.

Claude não pode:

- inventar KPI;
- executar SQL arbitrário;
- modificar dados de origem;
- afirmar causalidade sem desenho válido;
- aprovar ação administrativa;
- expor PII;
- disparar comunicação externa no MVP.

---

## 5. Estrutura-alvo do repositório

Como o remoto está vazio, estes são caminhos propostos e devem ser confirmados no bootstrap:

```text
claude-educacao/
├── README.md
├── .gitignore
├── .env.example
├── Makefile
├── docker-compose.yml                 # opcional; não obrigatório para demo local
├── docs/
│   ├── product/
│   │   ├── vision.md
│   │   ├── premissas.md
│   │   ├── capabilities.md
│   │   ├── personas-e-jornadas.md
│   │   ├── regras-de-negocio.md
│   │   └── roteiro-demo.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── module-contract.md
│   │   ├── agent-runtime.md
│   │   ├── data-provenance.md
│   │   ├── privacy-and-safety.md
│   │   └── decisions/
│   └── api/
│       └── frontend-handoff.md
├── data/
│   ├── README.md
│   ├── catalog/
│   │   ├── official_metadata.yml
│   │   └── source_registry.yml
│   ├── reference/                     # somente dados públicos aprovados
│   ├── scenarios/
│   │   ├── network_improving.yml
│   │   ├── attendance_decline.yml
│   │   ├── assessment_decline.yml
│   │   ├── capacity_pressure.yml
│   │   ├── teacher_shortage.yml
│   │   └── data_quality_gap.yml
│   └── generated/                     # gitignored; Parquet/DuckDB gerados
├── backend/
│   ├── pyproject.toml
│   ├── uv.lock
│   ├── app/
│   │   ├── main.py
│   │   ├── composition.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── errors.py
│   │   │   ├── logging.py
│   │   │   ├── time.py
│   │   │   └── ids.py
│   │   ├── contracts/
│   │   │   ├── capabilities.py
│   │   │   ├── provenance.py
│   │   │   ├── indicators.py
│   │   │   ├── agents.py
│   │   │   └── pagination.py
│   │   ├── platform/
│   │   │   ├── module_registry.py
│   │   │   ├── capability_service.py
│   │   │   ├── metrics_catalog.py
│   │   │   └── privacy.py
│   │   ├── data_access/
│   │   │   ├── ports.py
│   │   │   ├── duckdb_repository.py
│   │   │   ├── sqlite_control_repository.py
│   │   │   ├── file_intake.py
│   │   │   └── schema_profiler.py
│   │   ├── agents/
│   │   │   ├── contracts.py
│   │   │   ├── registry.py
│   │   │   ├── orchestrator.py
│   │   │   ├── policies.py
│   │   │   ├── audit.py
│   │   │   ├── tools/
│   │   │   └── workflows/
│   │   │       ├── data_readiness.py
│   │   │       ├── quality_guardian.py
│   │   │       ├── network_pulse.py
│   │   │       ├── investigator.py
│   │   │       ├── meeting_preparer.py
│   │   │       └── action_monitor.py
│   │   ├── modules/
│   │   │   ├── network/
│   │   │   ├── schools/
│   │   │   ├── learning/
│   │   │   ├── attendance/
│   │   │   ├── capacity/
│   │   │   ├── staffing/
│   │   │   ├── equity/
│   │   │   └── interventions/
│   │   └── api/v1/
│   │       ├── router.py
│   │       ├── health.py
│   │       ├── capabilities.py
│   │       ├── agents.py
│   │       ├── investigations.py
│   │       ├── meetings.py
│   │       └── actions.py
│   ├── scripts/
│   │   ├── generate_mock.py
│   │   ├── import_dataset.py
│   │   └── validate_scenarios.py
│   └── tests/
│       ├── unit/
│       ├── contract/
│       ├── integration/
│       ├── e2e/
│       └── fixtures/
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── playwright.config.ts
    ├── src/
    │   ├── app/
    │   │   ├── App.tsx
    │   │   ├── router.tsx
    │   │   ├── queryClient.ts
    │   │   └── featureRegistry.ts
    │   ├── api/
    │   │   ├── client.ts
    │   │   └── generated/
    │   ├── core/
    │   │   ├── capabilities/
    │   │   ├── provenance/
    │   │   ├── formatting/
    │   │   └── layout/
    │   ├── components/
    │   ├── features/
    │   │   ├── overview/
    │   │   ├── priorities/
    │   │   ├── schools/
    │   │   ├── map/
    │   │   ├── learning/
    │   │   ├── attendance/
    │   │   ├── capacity/
    │   │   ├── staffing/
    │   │   ├── investigations/
    │   │   ├── meetings/
    │   │   ├── data-quality/
    │   │   └── agent-runs/
    │   └── test/
    └── e2e/
```

---

## 6. Modelo de dados do mock

### 6.1 Separar referência real de fatos sintéticos

Categorias obrigatórias de proveniência:

- `REAL_PUBLIC`;
- `SYNTHETIC_SCHEMA_FAITHFUL`;
- `SYNTHETIC_INFERRED`;
- `KNOWN_UNAVAILABLE`.

Todo payload de indicador deve carregar:

- `source_id`;
- `source_kind`;
- `generated`;
- `as_of`;
- `coverage`;
- `quality_status`;
- `limitations`.

### 6.2 Entidades canônicas

- `cre`;
- `school`;
- `class_group`;
- `student_pseudonymous`;
- `subject`;
- `period`;
- `data_asset`;
- `indicator_definition`;
- `indicator_observation`;
- `quality_finding`;
- `priority_signal`;
- `investigation`;
- `evidence`;
- `meeting`;
- `action_item`;
- `agent_run`.

### 6.3 Fatos de domínio

- `assessment_fact`;
- `attendance_fact`;
- `movement_fact`;
- `class_capacity_fact`;
- `school_dependency_fact`;
- `teacher_shortage_fact`;
- `intervention_fact` apenas como `SYNTHETIC_INFERRED` até confirmação.

### 6.4 Cenários sintéticos obrigatórios

1. rede melhorando com bolsões persistentes;
2. queda de aprendizagem com frequência estável;
3. deterioração de frequência antes de movimentação;
4. escola superlotada próxima de escola com vagas;
5. carência de Matemática coexistindo com piora de resultado;
6. falso alerta provocado por baixa cobertura;
7. intervenção seguida de melhora, sem inferência causal;
8. escola vulnerável superando pares;
9. CRE com média positiva e desigualdade interna;
10. ausência justificada diferente de ausência não justificada.

Todos os geradores devem:

- aceitar seed;
- produzir o mesmo resultado para a mesma versão/seed;
- validar chaves e domínios;
- nunca produzir nome, CPF ou endereço de aluno;
- manter correlações narrativas declaradas no cenário;
- não rotular o dado como real.

---

## 7. Contratos de API-alvo

### Plataforma

- `GET /health`;
- `GET /api/v1/capabilities`;
- `GET /api/v1/data-assets`;
- `GET /api/v1/data-quality/summary`;
- `POST /api/v1/datasets/profile`;
- `POST /api/v1/datasets/mappings/validate`.

### Gestão da rede

- `GET /api/v1/network/overview`;
- `GET /api/v1/priorities`;
- `GET /api/v1/schools`;
- `GET /api/v1/schools/{school_id}`;
- `GET /api/v1/schools/{school_id}/timeline`;
- `GET /api/v1/schools/{school_id}/peers`.

### Mapa

- `GET /api/v1/map/layers`;
- `GET /api/v1/map/schools?layer=...`;
- `GET /api/v1/map/schools/{school_id}/nearby`;
- `POST /api/v1/map/capacity-scenarios`.

### Domínios

- `GET /api/v1/learning/summary`;
- `GET /api/v1/learning/breakdown`;
- `GET /api/v1/attendance/summary`;
- `GET /api/v1/attendance/breakdown`;
- `GET /api/v1/capacity/summary`;
- `GET /api/v1/staffing/shortages`.

### Agentes e gestão

- `POST /api/v1/agent-runs`;
- `GET /api/v1/agent-runs/{run_id}`;
- `POST /api/v1/agent-runs/{run_id}/review`;
- `GET /api/v1/investigations`;
- `POST /api/v1/investigations`;
- `GET /api/v1/investigations/{id}`;
- `POST /api/v1/meetings/prepare`;
- `POST /api/v1/actions/draft`;
- `POST /api/v1/actions/{id}/approve`;
- `GET /api/v1/actions/{id}/progress`.

Todo endpoint deve responder estados honestos:

- sucesso com fonte/cobertura;
- degradado;
- capability indisponível;
- dados insuficientes;
- aguardando revisão;
- falha tipada e sanitizada.

---

## 8. Runtime dos agentes

### 8.1 Agentes iniciais

1. `data_readiness` — perfil, mapeamento e relatório de prontidão;
2. `quality_guardian` — cobertura, freshness, schema drift e inconsistências;
3. `network_pulse` — consolidação de sinais relevantes;
4. `investigator` — dossiê com evidências, hipóteses e limites;
5. `meeting_preparer` — pauta e briefing;
6. `action_monitor` — acompanhamento de ação aprovada.

### 8.2 Estados

- `SCHEDULED`;
- `RUNNING`;
- `WAITING_FOR_DATA`;
- `WAITING_FOR_REVIEW`;
- `APPROVED`;
- `DISMISSED`;
- `MONITORING`;
- `COMPLETED`;
- `FAILED`.

### 8.3 Contrato de ferramenta

Cada ferramenta deve declarar:

- nome e versão;
- schema de entrada;
- schema de saída;
- capacidade exigida;
- nível de granularidade permitido;
- política de privacidade;
- timeout;
- código de erro tipado.

Ferramentas iniciais:

- `get_network_snapshot`;
- `get_school_profile`;
- `get_indicator_series`;
- `compare_peer_schools`;
- `get_assessment_breakdown`;
- `get_attendance_breakdown`;
- `get_teacher_shortages`;
- `get_capacity_nearby`;
- `check_data_quality`;
- `search_data_catalog`;
- `attach_evidence`;
- `prepare_meeting_draft`;
- `create_action_draft`;
- `export_dossier`.

### 8.4 Auditoria obrigatória

Persistir sem PII:

- run id;
- agente e versão;
- gatilho e objetivo;
- escopo autorizado;
- prompt/policy version;
- modelo;
- ferramentas chamadas;
- ids das evidências;
- transições de estado;
- limitações;
- decisão humana;
- timestamps;
- erro sanitizado.

### 8.5 Limites operacionais

- número máximo de passos por run;
- timeout total;
- retry limitado apenas para falhas transitórias;
- nenhuma recursão livre entre agentes;
- nenhuma ferramenta não registrada;
- nenhuma ação externa no MVP;
- revisão humana antes de criar plano de ação definitivo;
- fake model por padrão em testes;
- execução Anthropic real apenas por flag explícita.

---

## 9. Fases de execução e gates

## Fase 0 — Bootstrap e governança

**Objetivo:** criar uma base reproduzível antes de qualquer feature.

### Tarefa 0.1 — Confirmar ambiente e raiz

**Arquivos:** nenhum.

**Passos:**

1. verificar `git status`, remote e branch;
2. verificar Python, `uv`, Node e npm;
3. confirmar que os três documentos de pesquisa permanecem intactos;
4. registrar versões em `docs/architecture/overview.md`.

**Gate:** nenhuma escrita fora da raiz e nenhum commit automático.

### Tarefa 0.2 — Criar documentação viva

**Criar:**

- `README.md`;
- `docs/product/vision.md`;
- `docs/product/premissas.md`;
- `docs/product/capabilities.md`;
- `docs/product/regras-de-negocio.md`;
- `docs/architecture/overview.md`;
- `docs/architecture/decisions/ADR-001-modular-monolith.md`.

**Teste:** validador de links/caminhos documentais simples.

**Gate:** cada premissa possui estado e fonte.

### Tarefa 0.3 — Criar higiene do repositório

**Criar:** `.gitignore`, `.env.example`, `data/README.md`.

Ignorar:

- `.env`;
- `data/generated/`;
- bancos locais;
- uploads;
- logs;
- caches;
- artefatos de testes;
- payloads de modelo;
- qualquer dado pessoal.

**Gate:** teste automático garante que fixtures proibidas/segredos não estão rastreáveis.

---

## Fase 1 — Contratos e composição da plataforma

**Objetivo:** permitir adicionar/remover módulos antes de desenvolver telas de domínio.

### Tarefa 1.1 — Scaffold backend com saúde

**Criar:**

- `backend/pyproject.toml`;
- `backend/app/main.py`;
- `backend/app/core/config.py`;
- `backend/app/api/v1/health.py`;
- `backend/tests/contract/test_health.py`.

**TDD:** teste RED para `/health`; implementação mínima; teste GREEN.

**Verificação:**

```powershell
cd backend
uv run pytest tests/contract/test_health.py -v
uv run ruff check .
```

### Tarefa 1.2 — Definir contratos de proveniência e capability

**Criar:**

- `backend/app/contracts/provenance.py`;
- `backend/app/contracts/capabilities.py`;
- testes unitários de estados válidos/inválidos.

**Gate:** nenhum indicador pode existir sem proveniência.

### Tarefa 1.3 — Criar registrador de módulos

**Criar:**

- `backend/app/platform/module_registry.py`;
- `backend/app/composition.py`;
- testes para adicionar, desabilitar e detectar ids duplicados.

**Gate:** desabilitar módulo de teste remove seus routers/capabilities sem quebrar `/health`.

### Tarefa 1.4 — Expor capability API

**Criar:**

- `backend/app/platform/capability_service.py`;
- `backend/app/api/v1/capabilities.py`;
- teste contratual da resposta.

**Gate:** response OpenAPI estável e discriminado por status.

---

## Fase 2 — Fundação de dados e mock fiel

**Objetivo:** produzir uma base demonstrável e substituível sem fingir que fatos sintéticos são reais.

### Tarefa 2.1 — Catálogo oficial conhecido

**Criar:**

- `data/catalog/official_metadata.yml`;
- `data/catalog/source_registry.yml`;
- `backend/app/data_access/schema_profiler.py`;
- testes de validação do catálogo.

Incluir inicialmente os schemas confirmados de escola, avaliação, frequência, movimentação, dependência, capacidade e carência docente.

### Tarefa 2.2 — Dimensões de referência

**Criar:** gerador de CRE, escola, período, turma e disciplina.

Usar dados públicos reais de escola somente após registrar licença, fonte e data. Na ausência, usar escolas inequivocamente sintéticas.

**Gate:** coordenadas de aluno nunca são geradas; mapa usa localização de escola.

### Tarefa 2.3 — Gerador determinístico de cenários

**Criar:**

- arquivos `data/scenarios/*.yml`;
- `backend/scripts/generate_mock.py`;
- testes de reprodutibilidade e integridade.

**TDD:** mesma seed/versão produz hashes iguais; seed diferente altera fatos, não contratos.

### Tarefa 2.4 — Repositório analítico DuckDB/Parquet

**Criar:** portas e adapter DuckDB.

**Gate:** serviços só dependem da porta; teste usa adapter em memória e fixture Parquet real.

### Tarefa 2.5 — Estado operacional SQLite

Persistir apenas investigações, runs, reuniões, ações e auditoria sem PII.

**Gate:** testes de transição e rollback; analytics e control plane permanecem separados.

---

## Fase 3 — Métricas, qualidade e priorização

**Objetivo:** ter inteligência determinística antes do Claude.

### Tarefa 3.1 — Catálogo de indicadores

Definir para cada indicador:

- fórmula;
- unidade;
- granularidade;
- janela;
- denominador;
- fonte;
- regra de cobertura;
- grupos permitidos;
- limitações.

### Tarefa 3.2 — Serviço de qualidade

Implementar freshness, completude, duplicidade, chaves órfãs, cobertura e schema drift.

**Gate:** cenário de baixa cobertura bloqueia interpretação do indicador.

### Tarefa 3.3 — Comparação entre pares

Começar simples e explicável:

- mesma etapa/modalidade;
- porte semelhante;
- CRE opcional;
- contexto disponível;
- cobertura comparável.

Não usar clustering opaco no primeiro MVP.

### Tarefa 3.4 — Sinais de prioridade

Regras explícitas por domínio:

- gravidade;
- tendência;
- persistência;
- estudantes potencialmente afetados;
- confiança/cobertura.

**Gate:** não produzir score único de “qualidade da escola”.

---

## Fase 4 — Shell de API e frontend

**Objetivo:** criar a infraestrutura visual superior antes dos módulos especializados.

### Tarefa 4.1 — Scaffold React/TypeScript

Criar Vite, React Router, TanStack Query, layout, tratamento de erro e testes.

**Gate:** build e teste executam sem backend real usando MSW/fakes.

### Tarefa 4.2 — Cliente OpenAPI

Gerar tipos a partir do backend; proibir DTOs duplicados manualmente quando já existirem no contrato.

### Tarefa 4.3 — Feature registry frontend

Testar:

- rota habilitada quando capability disponível;
- rota ocultada/desabilitada quando ausente;
- badge `MOCK_ONLY`/`DEGRADED` visível;
- deep link indisponível mostra estado explicativo.

### Tarefa 4.4 — Design system mínimo

Componentes:

- KPI com proveniência;
- signal card;
- coverage badge;
- source badge;
- empty/degraded state;
- filter bar;
- evidence panel;
- agent run timeline.

### Tarefa 4.5 — Visão Geral

Consumir apenas contratos genéricos:

- situação por domínio;
- o que mudou;
- escolas a investigar;
- qualidade/cobertura;
- atividade dos agentes.

**Gate:** remover um domínio não quebra a home.

### Tarefa 4.6 — Escola 360

Construir shell com abas registradas por capacidade.

**Gate:** escola sem módulo de aprendizagem continua exibindo frequência/capacidade disponíveis.

---

## Fase 5 — Módulos P1

### Tarefa 5.1 — Aprendizagem backend

Implementar contratos e queries para:

- evolução por período;
- cobertura da avaliação;
- disciplina;
- nível/padrão de desempenho;
- turma/habilidade quando disponível.

**Testes:** sem informação não vira zero; baixa cobertura não vira queda.

### Tarefa 5.2 — Aprendizagem frontend

Telas com:

- distribuição;
- série temporal;
- comparação entre pares;
- drill-down;
- fontes e limitações.

### Tarefa 5.3 — Frequência backend

Separar:

- frequência real;
- aula não lançada;
- cobertura incompleta;
- falta justificada/abonada;
- frequência diária versus acumulada.

### Tarefa 5.4 — Frequência frontend

Telas com tendência, persistência, segmentos, turnos e qualidade.

### Gate P1

Fluxo funcional:

```text
Rede → prioridade → escola → aprendizagem/frequência → evidências
```

Sem Claude, todo número já precisa ser correto, explicável e testado.

---

## Fase 6 — Mapa, capacidade e carência

### Tarefa 6.1 — API geográfica

Retornar GeoJSON/DTO compacto por viewport/layer, não a tabela inteira sem filtro.

### Tarefa 6.2 — Mapa interativo real

MapLibre com:

- pan/zoom;
- clusters;
- hover;
- clique;
- filtros;
- legenda;
- troca de camada;
- deep link Escola 360.

**Playwright:** provar pan/zoom, troca de layer e abertura de escola.

### Tarefa 6.3 — Capacidade e infraestrutura

Implementar ocupação, vagas, salas/dependências e alternativas próximas.

### Tarefa 6.4 — Carência docente

Implementar disciplinas, tempos em carência, persistência e recorte CRE/escola.

### Gate P2

Demonstrar:

- escola sob pressão;
- escola próxima compatível com vagas;
- cálculo determinístico de distância;
- cenário explicado sem efetivar transferência;
- camada de carência no mapa.

---

## Fase 7 — Plataforma de agentes

**Objetivo:** agentes usam serviços já testados; nunca substituem a fundação analítica.

### Tarefa 7.1 — Porta de modelo e fake adapter

Criar interface neutra, Anthropic adapter e fake determinístico.

**Gate:** suíte padrão não chama API externa.

### Tarefa 7.2 — Registro de ferramentas

Registrar tools com schemas estreitos e capability checks.

**Gate:** tentativa de tool não registrada falha de forma tipada e auditada.

### Tarefa 7.3 — Orquestrador limitado

Implementar:

- estados;
- limite de passos;
- timeout;
- validação estruturada;
- refusal/incomplete;
- retry limitado;
- auditoria.

### Tarefa 7.4 — Interface de runs

Frontend mostra progresso, ferramentas, evidências, limitações e revisão humana — não raciocínio interno privado.

---

## Fase 8 — Workflows agentic P0/P1

### Tarefa 8.1 — Agente de Prontidão

Entrada: dataset + objetivo.

Saída estruturada:

- perfil;
- mapeamentos propostos;
- ambiguidades;
- validações;
- módulos ativáveis;
- limitações;
- aprovação pendente.

### Tarefa 8.2 — Guardião da Qualidade

Executar após carga e gerar findings; bloquear sinais sem confiança mínima.

### Tarefa 8.3 — Pulso da Rede

Consolidar sinais determinísticos em situações não redundantes.

### Tarefa 8.4 — Investigador

Produzir dossiê com:

- fatos;
- contexto;
- comparação;
- hipóteses;
- contra-hipóteses;
- limites;
- perguntas;
- evidências citadas.

**Gate:** coexistência nunca é descrita como causalidade.

### Tarefa 8.5 — Preparador de Reunião

Converter investigações revisadas em pauta e briefing.

### Tarefa 8.6 — Acompanhamento

Monitorar apenas ações aprovadas; nunca criar ação definitiva sem revisão.

### Gate de agentes

Fluxo completo:

```text
nova carga
→ qualidade validada
→ situação detectada
→ investigação solicitada
→ dossiê revisado
→ pauta gerada
→ ação aprovada
→ acompanhamento
```

---

## Fase 9 — Módulos condicionais

### Equidade

- agregações apenas;
- supressão de grupos pequenos;
- cobertura comparável;
- nenhuma classificação individual de vulnerabilidade.

### Intervenções/Trilhas

- ativar somente quando contrato/dado for confirmado;
- modelar sinal → intervenção → responsável → janela → acompanhamento;
- antes disso, capability `SCHEMA_ONLY` ou `MOCK_ONLY` explicitamente inferida.

### Saúde/comunicação/transporte

- criar módulos somente com briefing/dataset;
- revisar LGPD e escopo antes de ingerir;
- não aproveitar PII apenas porque existe no arquivo.

---

## Fase 10 — Preparação para o dia do hackathon

### Tarefa 10.1 — Playbook de briefing

Nos primeiros 30 minutos:

1. registrar problema e persona;
2. registrar critérios da banca;
3. inventariar arquivos e granularidade;
4. classificar PII;
5. executar Agente de Prontidão;
6. validar mapeamento humano;
7. escolher um módulo profundo;
8. desabilitar módulos irrelevantes;
9. adaptar roteiro da demonstração;
10. atualizar premissas e plano.

### Tarefa 10.2 — Modo sem API Claude

A aplicação deve continuar demonstrável com outputs fixtureados, claramente rotulados, se crédito/rede/provider falhar.

### Tarefa 10.3 — Roteiro de demo de cinco minutos

1. Pulso detecta situação;
2. Guardião comprova qualidade;
3. Investigador produz dossiê;
4. mapa contextualiza quando relevante;
5. gestor adiciona à reunião;
6. agente prepara decisão e acompanhamento.

### Tarefa 10.4 — Pacote de doação

- README de execução;
- `.env.example`;
- geração de mock;
- contrato de dados;
- arquitetura;
- limitações;
- privacidade;
- testes;
- próximos adaptadores BigQuery/MCP.

---

## 10. Estratégia de testes

### Backend

- unitários: regras, fórmulas, policies e estados;
- contrato: OpenAPI e payloads;
- integração: DuckDB, Parquet e SQLite reais locais;
- agentes: fake model, tools, timeout, refusal e auditoria;
- privacidade: payloads/logs sem PII;
- E2E opcional Anthropic por variável explícita.

Comandos-alvo:

```powershell
cd backend
uv sync
uv run pytest -q
uv run ruff check .
uv run ruff format --check .
uv run mypy app
```

### Frontend

- Vitest: components, registry e capability states;
- Testing Library: jornadas e acessibilidade;
- Playwright: overview, Escola 360, mapa e agent run;
- build obrigatório após mudança de contrato.

Comandos-alvo:

```powershell
cd frontend
npm ci
npm test
npm run build
npm run test:e2e
```

### Contrato entre aplicações

- gerar cliente do OpenAPI;
- falhar CI/local check se o cliente estiver defasado;
- teste de cada endpoint usado por cada tela;
- capability parity audit: backend module ↔ frontend route.

### Critérios mínimos de aceite

- nenhum número sintético rotulado como real;
- nenhum KPI calculado por LLM;
- módulo pode ser desabilitado sem quebrar shell;
- tela indisponível explica por quê;
- mapa possui interação real;
- agente cita evidências e limitações;
- baixa qualidade bloqueia interpretação;
- ação administrativa exige aprovação humana;
- execução local documentada e reproduzível.

---

## 11. Segurança, LGPD e ética

- não persistir nomes, CPF, NIS, filiação ou endereço de alunos;
- usar identificadores pseudônimos somente quando indispensáveis;
- preferir escola/turma/agregação para UI gerencial;
- suprimir grupos pequenos;
- não enviar dados pessoais ao provider;
- redigir logs e erros;
- registrar apenas ids de evidência na auditoria;
- proibir SQL livre pelo modelo;
- limitar tool scope por agente;
- declarar associação versus causalidade;
- permitir revisão, descarte e justificativa humana;
- usar dados do evento apenas dentro das condições fornecidas.

---

## 12. Riscos e trade-offs

### Risco: modularidade virar framework excessivo

Mitigação: registry explícito e interfaces mínimas; não construir marketplace/plugin loader.

### Risco: tela geral superficial

Mitigação: aprofundar aprendizagem + frequência primeiro; demais cards entram apenas com dados e regras reais.

### Risco: mock parecer real

Mitigação: badges, proveniência em payload, watermarks e catálogo visível.

### Risco: agentes virarem chatbot decorativo

Mitigação: gatilhos, tools, runs, estados, artefatos e aprovação.

### Risco: agentes inventarem explicações

Mitigação: structured output, evidências obrigatórias, validação, ferramentas tipadas e saída `dados insuficientes`.

### Risco: DuckDB/SQLite divergirem de arquitetura futura

Mitigação: portas de repositório; BigQuery/Postgres entram como adapters sem alterar domínio.

### Risco: mapa dominar problema não territorial

Mitigação: mapa como tela independente e capability; home permanece orientada a decisão.

### Risco: um dia não comportar tudo

Mitigação: gates P0/P1/P2; roteiro funciona com overview + um módulo profundo + três agentes.

---

## 13. Ordem mínima recomendada para uma demo vencedora

Se o tempo for curto, executar somente:

1. Fase 0 — documentação e higiene;
2. Fase 1 — contratos/capabilities;
3. Fase 2 — mock determinístico;
4. Fase 3 — qualidade/prioridades;
5. Fase 4 — overview + Escola 360;
6. um módulo P1 conforme briefing;
7. mapa somente se houver dimensão territorial relevante, preservando sua tela-base;
8. Guardião + Pulso + Investigador;
9. reunião como fechamento narrativo.

Não tentar implementar todos os módulos ou todos os agentes com profundidade igual.

---

## 14. Perguntas a resolver no briefing

1. Qual decisão concreta a SME quer melhorar?
2. Quem decide: nível central, CRE, direção ou professor?
3. Qual a granularidade e janela temporal?
4. Há identificador longitudinal pseudônimo?
5. Frequência é diária, por aula ou acumulada?
6. Avaliação contém item/habilidade ou apenas resultado agregado?
7. Existem intervenções registradas?
8. Há geolocalização confiável de escola?
9. Quais atributos sensíveis podem ser usados e agregados?
10. Claude poderá chamar BigQuery/MCP ou apenas arquivos locais?
11. Quais ações podem ser propostas e quais exigem aprovação?
12. Quais critérios da banca têm maior peso?

---

## 15. Arquivos prováveis por fase

| Fase | Principais áreas |
|---|---|
| 0 | `README.md`, `docs/`, `.gitignore`, `.env.example` |
| 1 | `backend/app/core`, `contracts`, `platform`, `composition.py` |
| 2 | `data/`, `backend/app/data_access`, `backend/scripts` |
| 3 | `metrics_catalog`, serviços de qualidade, pares e prioridade |
| 4 | `frontend/src/app`, `core`, `overview`, `schools` |
| 5 | módulos `learning` e `attendance` em backend/frontend |
| 6 | módulos `map`, `capacity`, `staffing` |
| 7 | `backend/app/agents` e UI de runs |
| 8 | workflows, investigações, reuniões e ações |
| 9 | `equity`, `interventions` e adapters condicionais |
| 10 | docs de demo/doação, fixtures de fallback e E2E |

---

## 16. Gate antes de iniciar implementação

Antes da primeira escrita de código:

- [ ] usuário revisou este plano;
- [ ] nome provisório aceito ou mantido neutro;
- [ ] estrutura monorepo aceita;
- [ ] DuckDB + Parquet e SQLite aceitos para o mock;
- [ ] persona primária SME/CRE confirmada;
- [ ] aprendizagem + frequência confirmadas como P1;
- [ ] mapa confirmado como tela modular;
- [ ] agentes P0 confirmados;
- [ ] política de não commit continua vigente ou foi explicitamente alterada;
- [ ] plano atualizado se alguma decisão mudou.

---

## 17. Log de revisões

### 2026-08-26 — versão inicial

- consolidada arquitetura top-down de monólito modular;
- definida capability API para ativar/remover módulos, telas e agentes;
- definidos dados reais, sintéticos fiéis, sintéticos inferidos e indisponíveis;
- priorizados aprendizagem e frequência, seguidos por capacidade, mapa e carência;
- definido ciclo agentic de prontidão → qualidade → pulso → investigação → reunião → acompanhamento;
- estabelecido protocolo de atualização de premissas e regras de negócio;
- implementação e commits não iniciados.
