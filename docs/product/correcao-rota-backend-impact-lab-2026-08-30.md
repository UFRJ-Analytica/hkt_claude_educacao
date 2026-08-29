# Correção de rota backend após o relatório Claude Impact Lab Rio #2

Data da avaliação: 26/08/2026  
Artefato avaliado: `relatorio-claude-impact-lab-rio-educacao-2026-08-30.md`  
Escopo desta decisão: backend e dados locais do hackathon; frontend explicitamente adiado  
Status: decisão de execução, sem commit

## 1. Conclusão executiva

O relatório melhora materialmente o preparo e exige uma correção de ordem, não uma reescrita da arquitetura.

A decisão é preservar o monólito modular, FastAPI, contratos Pydantic, DuckDB/Parquet, SQLite, métricas determinísticas, proveniência e capabilities. O custo dessas decisões já foi pago e elas protegem pontos que o próprio relatório considera essenciais: honestidade sobre dados, fallback determinístico, ferramentas limitadas e evidência citável.

A correção principal é substituir a sequência “fundação horizontal completa → todos os módulos temáticos → agentes” por:

1. estabilizar a Etapa 2;
2. receber e perfilar dataset desconhecido com segurança;
3. mapear escola/CRE e normalizar observações em contrato genérico;
4. entregar quatro APIs gerenciais reutilizáveis;
5. ligar fake Claude e provider real opcional sobre essas mesmas APIs;
6. só então aprofundar o módulo temático confirmado no briefing.

A tese técnica passa a ser:

> Um backend adaptativo de inteligência gerencial por escola e CRE, que recebe dados desconhecidos, mede sua prontidão, produz indicadores determinísticos e oferece evidências governadas ao frontend e ao Claude.

Não será codificada antecipadamente uma aposta única em violência, aprendizagem, frequência, creche ou staffing.

## 2. Evidência confirmada e limites do relatório

### 2.1 Confirmado por fonte oficial

A página da Prefeitura publicada em 21/08/2026 confirma que:

- o desafio será proposto pela SME;
- problema, dados reais e critérios serão apresentados no evento;
- a solução deve ter aplicação prática;
- as equipes recomendadas têm quatro integrantes;
- participantes receberão créditos Claude;
- o projeto vencedor será doado à cidade.

Fonte: <https://prefeitura.rio/cidade/cidade-do-rio-recebe-segunda-edicao-brasileira-do-claude-impact-lab/>

Isso sustenta a prioridade de intake genérico, primeira fatia vertical e integração Claude demonstrável.

### 2.2 Evidência forte do relatório, ainda condicionada

Devem orientar o desenho, mas não ser tratadas como contratos de dados confirmados:

- `co_entidade`/INEP como provável chave canônica de escola;
- `designacao_sme` como provável chave de integração com data.rio;
- CRE 1–11 como recorte gerencial prioritário;
- modelo longo `escola × indicador × tempo` para cadências heterogêneas;
- BigQuery `datario.educacao_basica` como acesso possível, mas não testado;
- cruzamento de violência, creche, orçamento e clima como adapters opcionais.

### 2.3 Não adotar como “probabilidade” estatística

Os percentuais de hipóteses do relatório são pesos heurísticos. Eles ajudam a ordenar preparo, mas não justificam hardcode de produto. A arquitetura continuará orientada ao briefing.

### 2.4 Recomendações do relatório que não serão copiadas literalmente

1. **Remover portas/adapters:** rejeitado. A camada atual é pequena, já existe e impede SQL arbitrário. Não será ampliada de forma cerimonial, mas também não será removida.
2. **Mostrar amostras no perfilador:** rejeitado por padrão. Antes da classificação de PII, o perfilador nunca devolve valores brutos. Deve produzir apenas metadados, estatísticas e alertas.
3. **Cada módulo se auto-registrar por import:** rejeitado. Descoberta implícita reduz auditabilidade. Haverá um único owner do composition root durante o evento.
4. **Pré-construir o eixo violência como produto principal:** rejeitado. É adapter opcional e politicamente sensível; só entra se o briefing e a autorização de uso de fonte externa sustentarem.
5. **Ingestão externa ampla no backend:** rejeitado antes do briefing. O backend poderá ingerir arquivos fornecidos/autorizados no evento, mas não ganhará crawlers de múltiplos portais como dependência do MVP.

## 3. Diagnóstico do backend atual

### 3.1 Dívidas do relatório que já ficaram obsoletas

O relatório foi produzido sobre dois commits e não vê toda a Etapa 2 local. Hoje já existem:

- perfilador para CSV, JSON, JSONL e Parquet;
- catálogo YAML e cenários;
- mock determinístico em Parquet;
- adapter DuckDB allowlisted;
- repositório SQLite de controle;
- contratos de proveniência, observação e qualidade;
- métricas determinísticas e testes de integração.

Logo, “não existe perfilador” e “não existe dado sintético” já não descrevem o worktree atual.

### 3.2 Dívidas do relatório que continuam válidas

1. `.env.example` usa nomes sem `PULSO_`, mas `Settings` exige prefixo `PULSO_`.
2. README ainda afirma que não há backend, dados ou commits.
3. A matriz documentada e `composition.py` não têm paridade completa.
4. `network` e `schools` ficam `MOCK_ONLY` mesmo quando `mock_data_enabled=false`.
5. Não existe integração Claude, provider fake ou tool registry executável.
6. Supressão de grupos pequenos está documentada, mas não implementada.
7. O perfilador não suporta XLSX, detecção explícita de encoding/delimitador, abas, chaves candidatas ou classificação de risco.
8. Não há API de intake/readiness, snapshot da rede, perfil de escola ou evidência.
9. Não existe contrato canônico de identidade escolar com INEP, designação SME e CRE.

### 3.3 Bloqueador atual não capturado pelo relatório

A Etapa 2 está temporariamente inconsistente após uma execução interrompida de hardening:

- `IndicatorDefinition` passou a exigir `formula_version`;
- `backend/app/metrics/catalog.py` ainda não fornece esse campo;
- a suíte falha durante collection antes de executar testes.

Resultado observado em 26/08/2026: dois erros de collection em `test_data_stage.py` e `test_stage2_contract_hardening.py`.

Nenhuma nova feature deve ser iniciada antes de restaurar todos os gates.

## 4. Nova ordem de execução backend-first

## Fase B0 — estabilizar a Etapa 2

Objetivo: recuperar um baseline executável e auditável.

Ações:

1. concluir a migração de contratos de métricas e proveniência;
2. ajustar catálogo de métricas, service e testes em conjunto;
3. concluir ou reverter mudanças parciais dos três hardenings;
4. executar `pytest`, Ruff, MyPy, `uv lock --check` e gerador real;
5. revisar o delta completo contra a Etapa 2;
6. não iniciar endpoints até todos os gates estarem verdes.

Critério de saída:

- zero erro de collection;
- suíte completa verde;
- manifesto mock reproduzível;
- nenhuma capability declara dado que a configuração não habilitou.

## Fase B1 — intake e readiness de dataset desconhecido

Esta passa a ser a primeira feature backend do evento.

### Contratos

Criar contratos como:

- `DatasetIntakeRequest`;
- `DatasetDescriptor`;
- `DatasetProfile`;
- `ColumnProfile` ampliado;
- `PrivacyFinding`;
- `MappingProposal`;
- `DataReadinessReport`.

### Formatos

Suportar:

- CSV com UTF-8, UTF-8 BOM e latin-1;
- delimitadores `,`, `;` e tab;
- XLSX com inventário de abas;
- JSON/JSONL;
- Parquet.

### Saída segura do perfilador

Permitir somente:

- nome da coluna;
- tipo inferido;
- taxa de nulos;
- cardinalidade aproximada;
- unicidade aproximada;
- mínimo/máximo apenas para datas e números quando seguro;
- encoding, delimitador e aba;
- chaves candidatas por estatística;
- possíveis campos de PII por nome/tipo/padrão, sem ecoar o valor;
- warnings de truncamento e confiança.

Proibido por padrão:

- amostras de linhas;
- valores frequentes de campos textuais;
- nomes, endereços, identificadores pessoais ou payload bruto em logs;
- envio de arquivo ou amostra ao Claude.

### APIs prioritárias

- `POST /api/v1/data/profile`;
- `GET /api/v1/data/datasets`;
- `GET /api/v1/data/readiness/{dataset_id}`.

Uploads devem ficar em diretório confinado, ignorado pelo Git, com limite de tamanho e lifecycle explícito.

## Fase B2 — identidade escolar e modelo analítico adaptativo

### Chave e recortes

Criar `SchoolIdentity` com campos opcionais e proveniência por mapeamento:

- `school_id` interno estável;
- `co_entidade`/INEP;
- `designacao_sme` com sete dígitos;
- nome de exibição;
- CRE 1–11;
- tipo SME;
- bairro oficial;
- latitude/longitude da escola;
- estado do match e confiança;
- limitações.

`co_entidade` será preferido quando existir, mas não obrigatório para aceitar o dataset do briefing. O backend não deve descartar dados apenas porque a chave esperada não veio.

### Modelo longo

Adicionar um contrato/tabela lógica de observação:

- escola ou território;
- indicador;
- período/janela;
- etapa/modalidade;
- valor e unidade;
- numerador/denominador;
- cobertura e qualidade;
- proveniência e evidence ID.

As tabelas temáticas atuais podem alimentar esse modelo; não precisam ser apagadas.

### Registry de joins

Toda ponte de identidade deve registrar:

- campos de origem e destino;
- transformação aplicada;
- taxa de match;
- unmatched de ambos os lados;
- versão/hash dos arquivos;
- validação humana quando aplicável.

Nunca fazer join final por nome de escola ou bairro sem declarar degradação.

## Fase B3 — quatro APIs gerenciais antes dos módulos completos

Implementar nesta ordem:

1. `GET /api/v1/network/snapshot?cre=`;
2. `GET /api/v1/schools/{school_id}/profile`;
3. `GET /api/v1/data/quality`;
4. `GET /api/v1/evidence/{evidence_id}`.

Regras:

- filtros por CRE desde o primeiro contrato;
- `api_contract_version` em metadata;
- fonte, período, cobertura, limitações e synthetic/real em toda resposta;
- valores e ranking sempre determinísticos;
- totais calculados no conjunto completo, mesmo quando detalhes forem paginados;
- grupos com contagem abaixo do threshold configurado devem ser suprimidos;
- nenhuma causalidade automática.

Esses quatro endpoints serão simultaneamente o contrato do frontend e as tools do Claude.

## Fase B4 — Claude aditivo e demonstrável

Antecipar uma fatia de agentes, sem antecipar automações administrativas.

Implementar:

- `ModelProvider` port;
- `FakeModelProvider` determinístico e padrão;
- `AnthropicModelProvider` opcional, habilitado somente por configuração explícita;
- tool registry com apenas os quatro endpoints governados;
- resposta estruturada em fatos, hipóteses, contra-hipóteses, perguntas e limitações;
- citação obrigatória de `evidence_id`;
- timeout, limite de passos e fallback determinístico;
- nenhum SQL, arquivo bruto ou PII enviado ao modelo;
- trilha de execução em SQLite.

Primeira fatia vertical backend:

`network snapshot determinístico → tool governada → síntese fake/Claude → mesma resposta válida se provider falhar`.

## Fase B5 — adapter temático escolhido no briefing

Somente depois do briefing, escolher um módulo profundo.

Prioridade condicional:

- aprendizagem: IDEB/avaliação, participação, pares comparáveis e TDI;
- frequência: frequência efetiva, distinguindo ausência do aluno de aula não ofertada;
- territorial: eventos autorizados próximos a escolas e dias letivos potencialmente afetados;
- capacidade/creche: oferta, ocupação e fila apenas se o dado da fila for recebido;
- staffing: carência agregada, sem cadastro nominal de profissional;
- inclusão/equidade: somente com base legal, agregação e supressão verificadas.

Cada adapter deve produzir o contrato longo de observação e usar as mesmas quatro APIs, em vez de criar um produto paralelo.

## 5. Mudança na fila das etapas existentes

### Etapa 2

Permanece em andamento até estabilização completa. Não deve crescer com novos temas.

### Etapa 3 — nova definição

Antes: APIs gerenciais + aprendizagem + frequência + capacidade + staffing em paralelo.

Depois:

1. intake/readiness;
2. identidade escolar/CRE e modelo longo;
3. quatro APIs genéricas;
4. uma única vertical temática sustentada pelo mock;
5. fake Claude e provider opcional sobre as APIs.

Aprendizagem, frequência, capacidade e staffing deixam de ser quatro entregas obrigatórias simultâneas. Permanecem adapters candidatos.

### Etapa 4 e seguintes

Frontend continua adiado conforme orientação do usuário. Quando começar, deverá consumir fixtures derivadas dos contratos reais da Fase B3, sem esperar a conclusão de todos os módulos.

Mapa só vira interface principal quando o briefing tiver decisão territorial e geolocalização confiável. Caso contrário, será visualização secundária.

## 6. Arquivos backend provavelmente afetados

### Estabilização

- `backend/app/contracts/data.py`
- `backend/app/contracts/provenance.py`
- `backend/app/metrics/catalog.py`
- `backend/app/metrics/service.py`
- `backend/app/quality/service.py`
- `backend/tests/integration/test_stage2_*`

### Intake/readiness

- `backend/app/intake/contracts.py`
- `backend/app/intake/service.py`
- `backend/app/intake/file_policy.py`
- `backend/app/profiling/schema_profiler.py`
- `backend/app/api/v1/data.py`

### Identidade e analytics

- `backend/app/schools/contracts.py`
- `backend/app/schools/identity_service.py`
- `backend/app/data_access/ports.py`
- `backend/app/data_access/duckdb_adapter.py`
- `backend/app/observations/contracts.py`
- `backend/app/observations/repository.py`

### APIs e Claude

- `backend/app/api/v1/network.py`
- `backend/app/api/v1/schools.py`
- `backend/app/api/v1/quality.py`
- `backend/app/api/v1/evidence.py`
- `backend/app/agents/providers.py`
- `backend/app/agents/tools.py`
- `backend/app/agents/service.py`
- `backend/app/control/sqlite_repository.py`
- `backend/app/composition.py`

Os nomes são propostos; a implementação deve preservar módulos pequenos e evitar camadas sem comportamento.

## 7. Gates antes do frontend

1. arquivo desconhecido suportado é perfilado sem expor valores;
2. CSV latin-1 com `;` e XLSX passam em testes reais;
3. PII provável é sinalizada antes de qualquer persistência analítica ou chamada ao modelo;
4. escola pode ser resolvida por INEP, designação SME ou ID interno, com match auditável;
5. CRE inválida é rejeitada;
6. observações de cadência diferente não são artificialmente interpoladas;
7. snapshot, school profile, quality e evidence possuem contrato versionado;
8. small-group suppression é executável e testada;
9. fake provider produz demo reproduzível;
10. falha/ausência do provider real preserva resposta determinística;
11. Claude não recebe SQL, arquivo bruto nem valores pessoais;
12. suíte completa, Ruff, MyPy e lock passam em uma máquina limpa.

## 8. Correção de narrativa do produto

Não vender “mais um preditor de evasão”. O relatório apresenta evidência forte de que a SME já opera busca ativa e IA nesse espaço.

A narrativa backend deve ser:

> O Pulso da Rede não substitui sistemas existentes nem decide por gestores. Ele conecta dados do briefing a uma camada verificável de prontidão, indicadores e evidências por escola/CRE, permitindo que gestores e Claude expliquem o que os dados sustentam — e bloqueiem o que não sustentam.

Se o tema for frequência, distinguir:

- aluno ausente;
- dado de frequência ausente;
- aula não lançada;
- aula não ofertada/interrompida;
- abandono formal.

Esse recorte é mais defensável do que outro score de risco individual.

## 9. Decisão final

A rota anterior era tecnicamente coerente, mas larga demais para o formato do evento. A nova rota reduz trabalho especulativo sem sacrificar segurança e auditabilidade.

Decisões aprovadas nesta avaliação:

- backend-first mantido;
- frontend adiado;
- Etapa 2 deve ser estabilizada antes de crescer;
- intake/readiness sobe para a primeira prioridade funcional;
- escola + CRE formam a espinha do domínio;
- modelo de observação longo complementa os fatos temáticos;
- quatro APIs genéricas precedem quatro módulos completos;
- Claude sobe na ordem, mas permanece aditivo e governado;
- eixo territorial é preparado, não presumido;
- nenhuma amostra bruta será exibida pelo perfilador antes da classificação;
- nenhum commit será criado por esta decisão.
