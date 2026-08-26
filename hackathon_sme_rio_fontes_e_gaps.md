# Hackathon Claude × SME-RJ — Fontes de dados e gaps de contexto

> Documento consolidado para cruzamento com pesquisa de mídia recente (notícias, redes sociais, press releases da Prefeitura e da SME). Foco: mapear tudo que já se sabe da infraestrutura de dados e dos sistemas educacionais do município do Rio, com nível de certeza explícito em cada seção. Fontes verificadas: `docs.dados.rio`, `github.com/prefeitura-rio`, `docs.dados.rio/llms.txt`, `queries-datario/metadata.json`, dados abertos federais (INEP/MEC), documentação técnica pública da IplanRio.

---

## 1. Infraestrutura da IplanRio (alta certeza — documentação oficial pública)

### 1.1 Componentes centrais

- **Escritório de Dados / IplanRio** — mantém a infraestrutura de integração municipal que conecta SMS, SME, SMTR, SMSURB, SMF, SEOP e demais órgãos.
- **Data Lake municipal** — Google Cloud Storage + BigQuery, projeto principal `rj-iplanrio` + datasets específicos por secretaria.
- **Camadas** — Bronze (raw) → Silver (limpo) → Gold (agregado). Governança LGPD nas transformações.
- **Orquestração** — Prefect 3 (repositórios centrais `prefect_rj_iplanrio`, `pipelines`).
- **Transformação** — dbt (repositório `queries-datario` público + repositórios privados por secretaria).
- **Catálogo** — `data-catalog.iplan.dados.rio` (Data Catalog interativo com schemas e links BigQuery).
- **Portal** — `dados.rio/datalake`.

### 1.2 Barramento de APIs (`docs.dados.rio/barramento`)

- Plataforma centralizada de exposição de APIs municipais.
- **Gateway** — Istio + GKE + Cloud Armor.
- **Autenticação** — JWT via **Identidade Carioca** + OAuth2.
- **Base URL de produção** — `services.app.dados.rio`.
- **Base URL staging** — `services.staging.app.dados.rio`.

### 1.3 APIs municipais publicamente documentadas

Extraídas de `docs.dados.rio/llms.txt` (índice oficial):

| API / Módulo | Função | Relevância para educação |
|---|---|---|
| **Busca / Search v1/v2** | Busca unificada de serviços, cursos, vagas, MEI. Estratégias: keyword, semantic, hybrid, AI (agente). Coleção `"sme"` já configurada. | Alta — a coleção "sme" é ponto de entrada para dados educacionais via busca semântica. |
| **eAI Gateway** | Handle Chat, Get User History, Delete/Bulk history, config de agentes, versionamento de system prompts. | Alta — infraestrutura de chatbot já existe e é multi-agente. |
| **Agent Config / System Prompt** | Gerencia configs e prompts dos agentes com histórico versionado (rollback, unified reset). | Alta — sinaliza maturidade de operação de agentes conversacionais. |
| **RMI (Registro Municipal Integrado)** | Dados unificados de pessoas físicas e jurídicas, whitelist agrupada. Modelos: pessoa física, telefone, interações com prefeitura, chatbot. | Média-alta — pode ligar aluno/família a dados municipais (cuidado LGPD). |
| **Catálogo público de serviços** | CRUD de serviços, categorias, subcategorias, journey do cidadão, recomendações. Consumido pelo carioca.rio. | Média — porta pra "matrícula" e serviços educacionais do cidadão. |
| **Empregabilidade** | Vagas, candidaturas, currículo, cursos, categorias, MEI. Pipeline completa candidato-vaga com etapas, aprovação, PCD. | Média — sinergia com egressos, EJA, ensino técnico. |
| **Citizen** | CPF-based: escolaridade, deficiência, etnia, renda familiar, endereço, telefone, opt-in/out, pets, chamados 1746, entidades jurídicas, carteira do cidadão. | Alta — perfil demográfico do cidadão via CPF. |
| **Cursos / Categorias / Inscrições** | Sistema de gestão de cursos com inscrições (CSV/XLSX), aprovação em lote, certificados, trocas de turma. | Alta — infraestrutura de cursos municipais pronta. |
| **Notification categories / Notification preferences** | Sistema de notificações granular por CPF ou telefone, com opt-in por categoria. | Média — canal para engajamento educacional. |
| **Beta groups / Beta whitelist** | Whitelist de telefones para grupos beta do chatbot. | Média — sinaliza rollout controlado de features de agente. |
| **Phone** | Gestão de telefones (opt-in, quarentena, vincular a CPF, validação). | Baixa-média — infra WhatsApp. |
| **Disparos WhatsApp** | Padrões documentados para queries de disparo via WhatsApp Business API. | Média — canal ativo para chegar em famílias. |
| **Memory** | CRUD de memórias associadas a telefone (para agentes conversacionais). | Média — persistência de contexto entre conversas. |
| **Phoenix Experiments** | Arize Phoenix — datasets e experimentos com LLMs. | Alta — sinaliza maturidade em avaliação de agentes. |
| **Migration API** | Migração versionada de schemas Typesense (busca). | Baixa — infra. |
| **URLs / QR Code** | Encurtador e gerador de QR code municipal. | Baixa — utilitário. |
| **subpav-osa-openapi** | API mencionada em `docs.dados.rio/api-specs/`; nome sugere subprefeitura/OSA. | Desconhecido — não documentado publicamente na navegação principal. |

### 1.4 Servidores MCP oficiais (`docs.dados.rio/barramento/mcp`)

A IplanRio disponibiliza servidores MCP para conectar LLMs aos sistemas municipais:

| Servidor MCP | Sistema conectado | Uso |
|---|---|---|
| `mcp-bigquery` | BigQuery municipal | Consultas analíticas via linguagem natural |
| `mcp-prefect` | Prefect | Monitorar e disparar pipelines |
| `mcp-rmi` | RMI API | Consultar dados de pessoas físicas |
| `mcp-busca` | API de Busca (coleção `"sme"` incluída) | Pesquisar serviços e dados municipais |

- **Modelo padrão configurado nos exemplos** — `anthropic/claude-sonnet-4-6` via **Bifrost IplanRio** (gateway proprietário em `bifrost.iplan.dados.rio/anthropic/v1`).
- **Acesso** — solicitação via Discord canal `#peça-permissão`.
- Componentes MCP disponíveis: **Resources** (dados como recursos), **Tools** (ações), **Prompts** (templates), **Sampling** (LLM req).
- Repositório do servidor MCP oficial: `github.com/prefeitura-rio/app-mcp-server` (público, Python, ativo).

### 1.5 Ferramentas de desenvolvimento com IA (importante — corrige o PDF)

- **OpenCode** é a ferramenta oficial mencionada na documentação para "assistência em desenvolvimento e documentação técnica da infraestrutura municipal". O PDF de análise anterior menciona "Claude Code" mas a documentação atual referencia OpenCode. Ambos são hosts MCP compatíveis; a diferença pode ser de versão do documento.
- **Pi Agent** — outro agente da IplanRio com pacotes de capacidades.
- **dev-vpop v1** — pacote Pi de desenvolvimento com skills, agentes, política de custo, MCP e diagnósticos.

---

## 2. Dados educacionais no Data Lake (média-alta certeza)

### 2.1 Dataset público `educacao_basica` no BigQuery (`rj-iplanrio.educacao_basica.*`)

Descoberto via `queries-datario/metadata.json` — tabelas com modelo dbt público, publisher recorrente **Nuno Caminada Silva**:

| Tabela | Descrição (verbatim do metadata) | Cobertura temporal |
|---|---|---|
| `escola` | Cadastro das unidades escolares municipais (código INEP, CRE, endereço, modalidades). | — |
| `aluno_turma` | Matrícula individual por turma. "Turma de alunos, atuais ou passadas, em unidades escolares pertencentes à prefeitura". | Confirmado desde 2012, com dados anteriores parciais. |
| `notas` | Desempenho por bimestre/componente/aluno. | — |
| `movimentacoes` | "Movimentações feitas de alunos de interesse da prefeitura ( algumas informações desde 1973, são mais completas a partir de 2012 ). Movimentação é a saída do aluno de uma turma, potencialmente para entrada em outra turma da mesma unidade escolar ou para outra unidade escolar, do município ou não." | 1973 (parcial) → hoje; completo desde 2012. |
| `frequencia_alunos` (inferido do snippet metadata) | "Frequência dos alunos matriculados ou que já tenham sido matriculados em uma escola da prefeitura do Rio de Janeiro desde 2012." | Desde 2012. |

### 2.2 Colunas e conceitos identificados no schema

Extraídos verbatim de descrições do metadata.json de campos relevantes:

- **CRE (Coordenadoria Regional de Educação)** — "Uma CRE reúne unidades escolares da prefeitura em uma determinada região." O município tem **11 CREs**.
- **COC** — "Número do conselho de classe. É único por período letivo."
- **`aluno_mais_educacao`** — booleano: aluno inscrito no programa Mais Educação do MEC. "Programa do MEC que dá atividades específicas e acompanhamento ao aluno. Específico para alunos com histórico de evasão ou reprovação."
- **`aluno_territorio_social`** — booleano: aluno mora em "território social", classificação da prefeitura para "região geográfica do município classificada como de extrema vulnerabilidade social".
- **`nucleo_arte`** — "Um núcleo de artes pertence a prefeitura e faz parte de uma escola da prefeitura do Rio de Janeiro."
- **Avaliação EJA** — campo específico para "tipo de avaliação usada para o aluno no ensino de jovens e adultos. Ex: UP 1 ou aval 2."

### 2.3 Pipelines públicos (inferido do repositório `pipelines`)

- **Prova Rio 2009-2016** — dados históricos mencionados em pull request do repositório central `pipelines`. Prova Rio é a avaliação municipal externa da SME.
- **Censo Escolar** (SME) — citado explicitamente em `docs.dados.rio/introduction` como pipeline ETL da SME.
- Pipelines Prefect da SME usam label `rj-sme` no repositório central `pipelines` (colaborativo).

### 2.4 Gap organizacional confirmado: SMS vs SME

- **SMS (Saúde)** tem repositórios dedicados públicos, com maturidade alta:
  - `pipelines_rj_sms` — pipelines Prefect da SMS.
  - `pipelines_v3_rj_sms` — versão Prefect v3 da SMS.
  - `queries-rj-sms` — modelos dbt da SMS.
- **SME (Educação) não tem repositório dedicado público equivalente**. Os pipelines da SME estão diluídos no repositório central `pipelines` sob label `rj-sme`, sem README nem documentação equivalente à da SMS.
- Verificação em 25/08/2026 na página `github.com/prefeitura-rio`: repositórios visíveis incluem `prefect_rj_iplanrio`, `prefect_rj_civitas` (Segurança), `pipelines_rj_civitas`, mas **nenhum `pipelines_rj_sme` ou `queries-rj-sme` público**.

---

## 3. Sistemas de origem da SME (média certeza — nomes citados oficialmente)

Sistemas mencionados em documentação oficial da IplanRio ou material relacionado. **Cobertura no Data Lake é incerta** — o relatório interno indica "cobertura incompleta e não documentada":

| Sistema | Função inferida | Fonte da menção |
|---|---|---|
| **Escola 3.0** | Sistema principal de gestão escolar (frequência, notas, boletins). | Relatório interno; padrão de rede municipal. |
| **DiáRio** | Diário de classe digital (registro diário de aula/frequência). | Relatório interno. |
| **Matrícula Carioca** | Sistema de alocação e inscrição em vagas. | Relatório interno; portal `educacao.prefeitura.rio`. |
| **Trilhas Cariocas** | Programa de reforço/aceleração, descrito como "sistema de aplicação". | Relatório interno; menção oficial. |
| **Sistema Educacenso / CADMEC** | Cadastro de alunos e docentes para o Censo Escolar do INEP. | Padrão nacional obrigatório. |

**Programas federais confirmados no schema local:**

- **Mais Educação** — sinalizado no campo `aluno_mais_educacao`.
- **Censo Escolar (INEP)** — sinalizado explicitamente como pipeline.
- **EJA (Educação de Jovens e Adultos)** — campo específico no schema.

---

## 4. Dados abertos federais aplicáveis (alta certeza)

Fontes públicas do MEC/INEP que podem ser cruzadas com os dados municipais:

| Fonte | Conteúdo | Granularidade |
|---|---|---|
| **Censo Escolar (INEP)** — [dados.gov.br](https://dados.gov.br/dados/conjuntos-dados/inep-microdados-do-censo-escolar-da-educacao-basica) | Microdados anuais: escola (infraestrutura, corpo docente), turma, matrícula, movimento e rendimento escolar. | Individual (aluno, docente), aberto e anonimizado. |
| **Catálogo de Escolas INEP** | Cadastro nacional oficial de todas as escolas com geolocalização. | Escola. |
| **IDEB** (INEP, bienal) | Nota por escola, município, rede; meta pactuada vs realizada; componentes SAEB + fluxo. | Escola / município. |
| **SAEB** | Proficiência em Língua Portuguesa e Matemática. | Aluno / turma / escola. |
| **Consulta Matrícula** (INEP) | Ferramenta interativa com dados individuais anonimizados. | Individual. |
| **Painel Educacional** (INEP) | Indicadores agregados por unidade da federação e município. | Município. |
| **Base dos Dados** — datasets `c320e0ad-*` e `dae21af4-*` | INEP tratado em BigQuery público, já compatível tecnicamente com a stack da IplanRio. | Escola / aluno. |
| **geobr** (IPEA) — `read_schools()` | Shapefiles de escolas georreferenciadas. | Escola (ponto geográfico). |
| **data.rio / ArcGIS** | Dados geoespaciais municipais (limites de CRE, bairros, setores censitários). | Espacial. |
| **Portal MEC dados abertos** | Programas federais (Mais Educação, PDDE, PNAE, FUNDEB), execução orçamentária. | Município / escola. |
| **Portal SME (educacao.prefeitura.rio)** | Sistemas da SME, LGPD, resoluções, legislação municipal. | Institucional. |

---

## 5. Datasets prováveis a serem disponibilizados no hackathon (baixa-média certeza)

Dados que **existem** nos sistemas de origem mas **não estão públicos** no Data Lake e podem ser abertos em ambiente controlado durante o hackathon:

- Frequência diária individual por aluno (DiáRio) — parcialmente coberta segundo o schema.
- Comunicações escola-família registradas.
- Ocorrências disciplinares.
- Cadastro Único / Bolsa Família cruzado com matrícula.
- Alimentação escolar: PNAE, cardápios, aceitação.
- Transporte escolar (rotas, alocação).
- Saúde escolar (cruzamento SMS × SME já citado como caso de uso oficial em `docs.dados.rio/introduction`).
- EJA — perfil dos estudantes, evasão.
- Educação Especial — AEE, laudos, atendimentos (alta sensibilidade LGPD).
- Dados de professores — afastamento, formação continuada, atribuição, concurso, remoção, gratificação.
- Infraestrutura patrimonial da escola — reforma, obras, equipamentos.
- Registros do programa Trilhas Cariocas — quem entra, permanência, resultados.
- Resultados históricos da Prova Rio.

---

## 6. Sinais e menções institucionais sobre agentes de IA e educação (média-alta certeza)

Extraídos de documentação oficial da IplanRio, em ordem de força do sinal:

1. **`docs.dados.rio/introduction`** cita explicitamente como caso de uso oficial: "**SMS + SME: Dados de saúde escolar para planejamento de políticas públicas**".
2. **Pipeline ETL "Censo escolar (SME)"** é citada explicitamente como caso de uso do processamento municipal.
3. **Coleção `"sme"` já configurada na API Busca** — ponto de entrada semântico existe.
4. **eAI Agent** — infraestrutura conversacional completa (Handle Chat, histórico, config, prompts versionados, experimentos com Phoenix).
5. **Sistema de Cursos, Inscrições, Categorias** já existe como módulo do carioca.rio / Empregabilidade — não é claro se atende à SME diretamente ou só à Trabalho.
6. **MCP** citado como caso de uso: "Análise de Dados de Saúde (SMS)" no exemplo oficial — a SME **não tem um caso de uso equivalente citado**.
7. **Nenhum "MCP server especializado em educação"** existe no catálogo público de MCP servers.

---

## 7. Dores e oportunidades prováveis (baixa-média certeza — não categórico)

Ordenadas por sinergia entre infraestrutura disponível e evidência declarada. **Cada item precisa ser cruzado com pesquisa de mídia recente para confirmar prioridade real da SME.**

### 7.1 Alto casamento infra-evidência

- **Cegueira analítica em tempo hábil.** Levantar indicador consolidado exige semanas de trabalho manual. Casa com `mcp-bigquery` + tabelas `educacao_basica.*` + eAI Agent.
- **Cruzamento SME × SMS (saúde escolar).** Citado explicitamente como caso de uso oficial. Casa com maturidade da SMS e infra de barramento.
- **Descoberta e uso de dados existentes.** Data Catalog parcial, linhagem incompleta, dependência de conhecimento tácito (Nuno Caminada como publisher recorrente).
- **Assimetria organizacional SMS × SME.** SMS tem 3 repositórios dedicados, SME tem zero. Fechamento desse gap é hipótese forte para o hackathon.
- **Trilhas Cariocas** — programa de aplicação, sem visão consolidada de efeito e priorização.

### 7.2 Casamento médio

- **Recomposição de aprendizagem pós-pandemia** — agenda nacional, casa com tabela `notas`.
- **Equidade territorial entre 11 CREs** — casa com geobr, `data.rio`, campo `aluno_territorio_social`.
- **Otimização da Matrícula Carioca** — sistema citado, alocação é problema clássico.
- **Risco de abandono / evasão** — campos `movimentacoes` e `aluno_mais_educacao` mapeiam explicitamente população-alvo.
- **Prestação de contas a MEC, INEP, TCM, MP, Câmara** — dor recorrente de qualquer secretaria.

### 7.3 Casamento baixo (mas alto valor operacional)

- **Copiloto do diretor de escola** — infra existe (Cursos + eAI), mas requer escopo por escola e resolve problema mais operacional que estratégico.
- **Comunicação com famílias** — infra WhatsApp existe (disparos, opt-in, quarentena, categorias de notificação), mas fora da agenda "dados".
- **Apoio pedagógico ao professor** — não usa Data Lake, baixa diferenciação.
- **Tutoria direta ao aluno** — pesadelo LGPD, improvável em hackathon institucional.

---

## 8. Gaps de contexto que precisam de pesquisa complementar

Os itens abaixo **não foram cobertos** por documentação técnica pública e requerem cruzamento com notícias, press releases, redes sociais da Prefeitura/SME e declarações de gestores nos últimos 3-6 meses:

1. **Prioridades declaradas pela atual gestão da SME** — quem é a secretária atual, quais os 3-5 focos de gestão declarados, quais programas foram lançados/relançados em 2025-2026.
2. **Resultados do IDEB 2023 do município do Rio** — se caiu em alguma etapa, qual foi a resposta institucional; se subiu, qual o argumento de sustentação.
3. **Menções institucionais a "IA", "dados", "inteligência", "monitoramento", "avaliação"** em falas oficiais da SME ou da Prefeitura relacionadas a educação.
4. **Editais, concursos ou vagas abertas** na SME/IplanRio para área de dados/tecnologia — perfil das vagas indica onde eles querem investir.
5. **Programas educacionais recém-lançados ou expandidos** — Trilhas Cariocas, Alfabetiza Brasil, Compromisso Nacional Criança Alfabetizada, Ensino em Tempo Integral, etc.
6. **Crises ou pautas de imprensa recentes** envolvendo educação municipal (evasão, violência escolar, greves, infraestrutura, alimentação).
7. **Iniciativas do Impact Lab / Escritório de Dados** ligadas à SME em 2025-2026.
8. **Menções a integrações SME × outras secretarias** (SMAS, SMS, SMTR, Habitação) em comunicações oficiais.
9. **Uso declarado de Claude, Anthropic, ou outros LLMs** pela Prefeitura em documentos, entrevistas ou postagens.
10. **Formato exato do hackathon** — briefing, tema, critérios de avaliação, datasets prometidos, mentores.

---

## 9. Confiança e limitações

- **Alta confiança** — infraestrutura da IplanRio, componentes do Data Lake, servidores MCP oficiais, APIs do barramento, existência do dataset `educacao_basica` público.
- **Média confiança** — cobertura real dos sistemas de origem no Data Lake, maturidade dos pipelines SME, sistemas Escola 3.0 / DiáRio / Matrícula Carioca (nomes corretos e função geral, mas cobertura no Lake não verificável publicamente).
- **Baixa confiança** — datasets que serão liberados no hackathon, prioridades específicas da SME em 2026, agenda política atual.
- **Não coberto** — políticas internas, planejamento estratégico, matrículas por escola em 2026, resultados recentes de avaliações municipais, uso interno de LLMs na SME.

---

## Anexo: repositórios e endpoints úteis

**Documentação oficial**
- `https://docs.dados.rio/` — hub central
- `https://docs.dados.rio/llms.txt` — índice completo
- `https://docs.dados.rio/data-lake/overview` — Data Lake
- `https://docs.dados.rio/barramento/mcp` — MCP oficial
- `https://docs.dados.rio/api-reference/overview` — APIs

**Repositórios GitHub (`github.com/prefeitura-rio`)**
- `queries-datario` — modelos dbt públicos, inclui `educacao_basica`
- `pipelines` — pipelines Prefect central (SME via label `rj-sme`)
- `prefect_rj_iplanrio` — pipelines Prefect da IplanRio
- `app-mcp-server` — servidor MCP oficial (público)
- `docs` — repositório da documentação
- `api-dados-rio` — API de dados abertos
- `pipelines_rj_sms` / `pipelines_v3_rj_sms` / `queries-rj-sms` — SMS (referência de maturidade)
- `data-catalog` — código do Data Catalog (Astro + GCS)

**Portais e catálogos**
- `https://data-catalog.iplan.dados.rio/` — catálogo interativo
- `https://www.dados.rio/datalake` — portal do Datalake
- `https://educacao.prefeitura.rio/` — SME
- `https://services.app.dados.rio/` — APIs de produção
- `https://raw.githubusercontent.com/prefeitura-rio/queries-datario/master/metadata.json` — metadata bruto

**Metadados federais**
- `https://dadosabertos.mec.gov.br/`
- `https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/censo-escolar`
- `https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb/resultados`
- `https://basedosdados.org/dataset/dae21af4-4b6a-42f4-b94a-4c2061ea9de5` — Censo Escolar tratado
- `https://ipeagit.github.io/geobr/reference/read_schools.html` — geolocalização de escolas
