# Handoff backend–frontend

Contrato de integração da Etapa 1. O endpoint de capabilities está implementado; o cliente frontend ainda não.

## Fonte de verdade

OpenAPI versionado do FastAPI será a fonte dos DTOs. O frontend gera cliente/tipos e não duplica manualmente contratos. APIs ficam sob `/api/v1`; `/health` é operacional.

## Capabilities primeiro

Na inicialização, o frontend consulta `GET /api/v1/capabilities`. Cada item contém, no mínimo:

```json
{
  "id": "attendance",
  "status": "SCHEMA_ONLY",
  "source_status": "KNOWN_UNAVAILABLE",
  "screens": ["attendance"],
  "agents": [],
  "limitations": ["Schema conhecido; nenhuma linha de dados está disponível."],
  "updated_at": "2026-08-26T00:00:00Z"
}
```

`source_status` usa os tipos de fonte (`REAL_PUBLIC`, `SYNTHETIC_SCHEMA_FAITHFUL`, `SYNTHETIC_INFERRED`, `KNOWN_UNAVAILABLE`); `status`, os estados de capacidade (`AVAILABLE`, `MOCK_ONLY`, `SCHEMA_ONLY`, `UNAVAILABLE`, `DISABLED`, `DEGRADED`).

## Comportamento da interface

- `AVAILABLE`: rota habilitada e fonte visível;
- `MOCK_ONLY`: rota habilitada com badge/watermark sintético permanente;
- `DEGRADED`: rota habilitada apenas se útil, com limitações e cobertura;
- `SCHEMA_ONLY`: tela explicativa, sem gráficos ou valores inventados;
- `UNAVAILABLE`: rota oculta na navegação; deep link explica pré-requisito;
- `DISABLED`: feature ausente por configuração, sem chamadas ao endpoint do domínio.

A home usa cards genéricos e tolera remoção de qualquer domínio.

## Envelope e erros

Payload de indicador inclui proveniência conforme [data-provenance](../architecture/data-provenance.md). Falhas são tipadas e sanitizadas, com `code`, mensagem segura, `request_id`, detalhes não sensíveis e estado recuperável quando aplicável. HTTP não deve transformar indisponibilidade conhecida em `500` genérico.

Estados de UI obrigatórios: carregando, vazio legítimo, dados insuficientes, degradado, capability indisponível, aguardando revisão e erro com retry apropriado.

## Evolução e gates

- mudanças aditivas preferidas dentro de v1;
- remoção/renome incompatível exige nova versão ou migração coordenada;
- CI/local futuro falha se cliente gerado estiver defasado;
- contract tests cobrem endpoint usado por tela;
- parity audit verifica módulo backend ↔ capability ↔ feature/rota ↔ agent tools;
- timestamps são ISO 8601 com offset; IDs são opacos; paginação e filtros são explícitos.

## Endpoint estratégico de dados e IA

`GET /api/v1/strategy/data-plan` expõe o plano versionado de adaptação ao dataset do briefing. A interface e o provedor Claude devem usá-lo para não confundir dados sintéticos atuais com fontes reais candidatas.

Uso esperado:

- mostrar que o runtime atual é `DuckDB over governed Parquet release` quando estiver em mock;
- listar fontes reais ainda não ingeridas, como SME/IplanRio Educação Básica e INEP;
- orientar quais módulos devem ser ativados conforme o dataset recebido;
- explicitar fronteiras de IA por papel: SME/CRE, gestor escolar, professor e família;
- bloquear copy enganosa como se INEP/SME já estivessem alimentando os gráficos.

Campos centrais:

- `current_runtime`: release sintética, assets e limitações;
- `real_source_candidates`: fontes reais candidatas, chaves de junção e cautelas;
- `adaptation_domains`: domínios prováveis, status runtime e lacunas;
- `ai_usage_ladder`: uso permitido/proibido de IA por role;
- `critical_gaps`: dados que precisam ser puxados antes de prometer decisão real.

## Escolas oficiais / mapa real

`GET /api/v1/schools/official` expõe uma lista governada de escolas/equipamentos
oficiais da SME/Data.Rio para o front montar mapa real, filtros por CRE e busca
institucional sem depender de dados sintéticos.

Fonte atual publicada localmente:

- Data.Rio / ArcGIS Hub / SME: `Educacao/SME/MapServer/1` (`Escolas Municipais`);
- licença declarada no item: CC-BY 4.0;
- campos reais consumidos: designação SME, denominação, CRE, tipo, latitude e longitude;
- release local: `data/official/school_identity/current.json`;
- comando de atualização: `uv run python -m scripts.import_official_school_identity`.

Contrato principal:

- `records[].identity.school_id`: namespace canônico interno `SME-RIO-<designacao>`;
- `records[].identity.sme_designation`: designação SME com 7 dígitos;
- `records[].identity.inep_id`: `null` enquanto a fonte SME não trouxer código INEP;
- `records[].identity.cre`: CRE 1–11;
- `records[].coordinates`: latitude/longitude reais do layer oficial;
- `coverage.total`, `coverage.with_coordinates`, `coverage.returned`;
- `available_cres`, `snapshot_id`, `provenance`, `limitations`.

A release real atual possui 1.588 registros válidos com coordenadas e CREs 1–11.
Dois registros do layer público foram filtrados por governança: um com CRE 12 e
um com designação fora do padrão de 7 dígitos.

Indicadores INEP/notas/evasão:

- esta release de identidade não publica notas, evasão ou rendimento, porque a
  fonte SME de localização não traz `CO_ENTIDADE`/INEP;
- o backend deixa `inep_id=null` em vez de inferir por nome/bairro;
- próximo release oficial deve cruzar Censo Escolar/INEP/IDEB por `CO_ENTIDADE`
  quando houver fonte governada com chave institucional, evitando match fuzzy.

## Painel de contexto da escola real

`GET /api/v1/schools/{school_id}/context` é o endpoint que o front deve chamar ao
clicar em qualquer ponto real do mapa. Ele substitui a UX antiga de "Escola não
encontrada neste snapshot".

Comportamento obrigatório:

- se a escola existe na release oficial, o endpoint retorna `200` mesmo quando não
  há métricas no snapshot sintético;
- nesse caso, `metric_coverage.status = IDENTITY_ONLY`, `synthetic_profile = null`
  e `comparisons = []`;
- o painel deve mostrar que identidade, CRE, tipo e coordenadas são reais, mas que
  indicadores educacionais ainda não foram carregados para aquela unidade;
- se houver perfil de métricas compatível no runtime, o endpoint retorna
  `metric_coverage.status = SYNTHETIC_SNAPSHOT_MATCHED`, `synthetic_profile` e
  `comparisons`; enquanto a fonte for sintética, a UI deve exibir badge/watermark.

Campos principais:

- `official_record.identity`: `school_id`, `nome`, `sme_designation`, `inep_id`,
  `cre`, `school_type`, `source_kind`;
- `official_record.coordinates`: latitude/longitude reais quando disponíveis;
- `map_links.google_maps_url`: link seguro para abrir no Google Maps;
- `map_links.directions_url`: link seguro para rota no Google Maps;
- `metric_coverage.status`: `IDENTITY_ONLY` ou `SYNTHETIC_SNAPSHOT_MATCHED`;
- `metric_coverage.message`: copy pronta para explicar cobertura;
- `comparisons[]`: escola vs média da CRE vs média da rede, quando houver métrica;
- `limitations[]`: deve ser exibido em seção "limitações / cobertura dos dados".

Exemplo de chamada:

```http
GET /api/v1/schools/SME-RIO-0515062/context
```

Exemplo de tratamento UI para `IDENTITY_ONLY`:

- título: nome da unidade;
- subtítulo: `CRE <n> · <school_type> · Identidade real SME/Data.Rio`;
- botões: "Abrir no Google Maps" e "Rotas";
- card de cobertura: "Indicadores educacionais ainda não carregados para esta
  unidade";
- não mostrar erro vermelho, não esconder a escola, não dizer que ela não existe;
- não renderizar notas/evasão/histórico como se fossem reais.

## Plano de ação IA por escola

`POST /api/v1/ai/school-action-plans` gera um plano estruturado para a escola com
base no contexto governado retornado pelo backend. No MVP, o provider `fake` é
determinístico e seguro; `anthropic` continua falhando fechado até configuração
explícita.

Request:

```json
{
  "school_id": "SME-RIO-0515062",
  "role": "school_manager",
  "focus": "frequência e aprendizagem"
}
```

Response principal:

- `provider`, `model`, `role`;
- `school_context`: mesmo contrato de `/schools/{school_id}/context`;
- `plan.title`;
- `plan.observed_signals[]`;
- `plan.hypotheses_to_validate[]`;
- `plan.short_term_actions[]`;
- `plan.medium_term_actions[]`;
- `plan.data_gaps[]`;
- `guardrails[]`;
- `policy.raw_rows_access = denied`;
- `policy.decision_automation = denied`.

UX recomendada:

- botão "Gerar plano de ação" dentro do painel da escola;
- selector simples de foco: frequência, aprendizagem, evasão, infraestrutura,
  demanda/lotação;
- mostrar plano como rascunho, nunca como decisão automática;
- destacar `data_gaps` quando o contexto estiver `IDENTITY_ONLY`;
- se `school_type` contiver "Creche" ou "EDI", não apresentar IDEB como métrica
  aplicável até haver indicador próprio de educação infantil.

## IA governada

`POST /api/v1/ai/briefings` cria uma explicação curta a partir de evidências já emitidas pelo
backend. No MVP, `PULSO_AI_PROVIDER=fake` é determinístico e não chama rede externa; serve para
desenvolver UX, papéis e guardrails. `PULSO_AI_PROVIDER=anthropic` existe como provider opcional,
mas falha fechado enquanto `PULSO_ANTHROPIC_API_KEY`/execução externa não forem configurados e
aprovados.

Request:

```json
{
  "question": "Explique o principal sinal para a gestão central.",
  "role": "central_manager",
  "evidence_ids": ["<evidence_id vindo de /network/snapshot>"]
}
```

Regras:

- exige pelo menos um `evidence_id` governado;
- usa apenas `GET evidence` internamente; não há tool para SQL, linhas brutas ou upload;
- resposta carrega `snapshot_id`, `used_evidence_ids`, `policy.raw_rows_access=denied` e
  `policy.decision_automation=denied`;
- se evidência estiver suprimida por privacidade, a explicação preserva a supressão;
- roles versionadas agora: `central_manager`, `school_manager`, `teacher`, `guardian`.

## Privacidade nos agregados

- `GET /api/v1/network/snapshot?cre=<id>` aplica supressão de grupo pequeno;
- se o escopo tiver menos de 3 escolas, cada observação volta com `suppressed=true`, `suppression_reason=SMALL_GROUP`, `privacy_min_school_count=3`, `value=null`, `numerator=null`, `denominator=null`, `quality=BLOCKED` e `interpretable=false`;
- `GET /api/v1/evidence/{evidence_id}` preserva a mesma supressão no round-trip de evidência;
- frontend/Claude não devem reconstituir valor suprimido a partir de fontes auxiliares nem apresentar ranking decisório nesses escopos.

Veja [contrato de módulo](../architecture/module-contract.md), [capacidades](../product/capabilities.md) e [tiro de implementação de dados/IA](../product/implementation-shot-data-ai-strategy.md).
