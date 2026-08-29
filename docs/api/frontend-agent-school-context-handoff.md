# Instruções para agente de frontend — painel real de escola e plano de ação

## Contexto

O backend agora expõe a rede oficial da SME/Data.Rio com 1.588 unidades reais,
CREs 1–11 e coordenadas. O mapa já deve continuar usando
`GET /api/v1/schools/official` para renderizar os pontos reais.

O problema de UX a resolver: ao clicar em escola real que não existe no snapshot
de métricas sintéticas, o front não deve mais mostrar erro como "Escola não
encontrada neste snapshot". A escola existe na rede real; o que está ausente são
indicadores educacionais carregados para aquele identificador.

## Objetivo frontend

Implementar painel lateral/modal de contexto escolar que sempre abre para uma
unidade real do mapa, com:

1. identidade real da escola;
2. links de Google Maps/rotas;
3. estado explícito de cobertura de métricas;
4. comparações escola vs CRE vs rede quando o backend retornar;
5. botão para gerar plano de ação IA governado;
6. renderização clara de limitações e dados faltantes.

## Backend já pronto

### 1. Lista de escolas oficiais

Endpoint existente:

```http
GET /api/v1/schools/official?cre=<1-11>&limit=2000&offset=0
```

Campos importantes:

- `records[].identity.school_id`
- `records[].identity.nome`
- `records[].identity.sme_designation`
- `records[].identity.inep_id` — atualmente `null` para a release Data.Rio
- `records[].identity.cre`
- `records[].identity.school_type`
- `records[].identity.source_kind` — `REAL_PUBLIC`
- `records[].coordinates.latitude`
- `records[].coordinates.longitude`
- `coverage.total`
- `coverage.with_coordinates`
- `coverage.returned`
- `available_cres`
- `snapshot_id`
- `provenance`
- `limitations`

Uso:

- renderizar pontos do mapa;
- aplicar filtro por CRE;
- usar `identity.school_id` como chave de clique.

### 2. Novo endpoint de contexto escolar

Endpoint novo:

```http
GET /api/v1/schools/{school_id}/context
```

Exemplo:

```http
GET /api/v1/schools/SME-RIO-0515062/context
```

Esse é o endpoint que deve ser chamado quando o usuário clicar num ponto do mapa.

#### Contrato de resposta

Campos principais:

```ts
type SchoolContext = {
  api_contract_version: '1.0.0'
  official_record: {
    identity: {
      school_id: string
      nome: string
      inep_id: string | null
      sme_designation: string | null
      cre: number
      bairro: string | null
      dependency: string
      school_type: string | null
      source_kind: 'REAL_PUBLIC' | string
      limitations: string[]
    }
    coordinates: {
      latitude: number
      longitude: number
    } | null
  }
  map_links: {
    google_maps_url: string
    directions_url: string
  }
  metric_coverage: {
    status: 'IDENTITY_ONLY' | 'SYNTHETIC_SNAPSHOT_MATCHED'
    message: string
    snapshot_id: string | null
  }
  synthetic_profile: SchoolProfile | null
  comparisons: Array<{
    indicator_id:
      | 'attendance_rate'
      | 'assessment_score'
      | 'capacity_utilization'
      | 'teacher_shortage_rate'
    school_value: number
    cre_average: number | null
    network_average: number | null
    delta_vs_cre: number | null
    delta_vs_network: number | null
    period: string | null
    evidence_id: string | null
    source_kind: string
  }>
  provenance: unknown
  limitations: string[]
}
```

#### Estado `IDENTITY_ONLY`

Significado:

- identidade/localização/CRE/tipo são reais;
- indicadores educacionais ainda não estão carregados para essa unidade;
- não há `synthetic_profile`;
- não há `comparisons`.

UI obrigatória nesse estado:

- abrir o painel normalmente;
- NÃO mostrar erro vermelho;
- NÃO dizer que a escola não existe;
- mostrar card de cobertura: `metric_coverage.message`;
- mostrar identidade real: nome, CRE, tipo, designação SME;
- mostrar botões:
  - "Abrir no Google Maps" usando `map_links.google_maps_url`;
  - "Rotas" usando `map_links.directions_url`;
- mostrar seção "Dados ainda não carregados" com `limitations[]`;
- esconder gráficos de nota/evasão/histórico ou mostrá-los como indisponíveis;
- não inventar métricas.

Copy sugerida:

> Identidade e localização reais SME/Data.Rio. Indicadores educacionais ainda não
> foram carregados para esta unidade.

#### Estado `SYNTHETIC_SNAPSHOT_MATCHED`

Significado:

- existe perfil de métricas compatível no snapshot atual;
- no MVP, essas métricas podem ser sintéticas/demo;
- deve haver badge/watermark de dados sintéticos quando `source_kind` não for real.

UI nesse estado:

- renderizar `synthetic_profile` em cards de métricas;
- renderizar `comparisons[]` como escola vs média CRE vs média rede;
- exibir badge "Métricas de demonstração" enquanto a fonte não for oficial;
- usar `evidence_id` para linkar com evidência se já houver UI disso.

## 3. Novo endpoint de plano de ação IA

Endpoint novo:

```http
POST /api/v1/ai/school-action-plans
```

Request:

```json
{
  "school_id": "SME-RIO-0515062",
  "role": "school_manager",
  "focus": "frequência e aprendizagem"
}
```

Roles aceitas:

- `central_manager`
- `school_manager`
- `teacher`
- `guardian`

Focos sugeridos para selector no front:

- `frequência e aprendizagem`
- `evasão e abandono`
- `infraestrutura`
- `demanda e lotação`
- `apoio da CRE`

Resposta:

```ts
type AISchoolActionPlanResponse = {
  api_contract_version: '1.0.0'
  provider: 'fake' | 'anthropic'
  model: string
  role: string
  school_context: SchoolContext
  plan: {
    title: string
    observed_signals: string[]
    hypotheses_to_validate: string[]
    short_term_actions: string[]
    medium_term_actions: string[]
    data_gaps: string[]
  }
  guardrails: string[]
  policy: {
    raw_rows_access: 'denied'
    decision_automation: 'denied'
    allowed_tools: string[]
    max_evidence_ids: number
  }
}
```

UI recomendada:

- botão no painel: "Gerar plano de ação";
- enquanto carrega: skeleton/spinner dentro do painel, sem bloquear mapa;
- renderizar seções:
  - sinais observados;
  - hipóteses a validar;
  - ações de curto prazo;
  - ações de médio prazo;
  - dados faltantes;
  - guardrails;
- exibir badge: "Rascunho IA — requer validação humana";
- mostrar `policy.raw_rows_access` e `policy.decision_automation` em texto pequeno
  ou tooltip de governança;
- se erro 503, mostrar: "IA indisponível/configuração pendente";
- se erro 422, mostrar: "Pedido fora da governança".

## Regras de produto importantes

1. Creches/EDI

Se `school_type` contiver `Creche` ou `EDI`, não exibir IDEB como métrica
aplicável até existir fonte própria. Para educação infantil, priorizar linguagem
de atendimento, demanda, frequência, infraestrutura e território.

2. INEP/IDEB/evasão

O backend ainda não tem release oficial cruzada por `CO_ENTIDADE`. Portanto:

- não chamar valores de nota/evasão de "reais" se vierem do snapshot sintético;
- não inferir INEP por nome/endereço no frontend;
- usar `inep_id === null` como sinal de que o cruzamento oficial ainda falta.

3. Google Maps/imagens

O backend entrega links oficiais de busca/rota por coordenada. Não fazer scraping
de imagens do Google Maps. Se quiser imagem/Street View depois, usar API oficial
com chave, atribuição e revisão de termos.

4. Estados vazios

A UI deve diferenciar:

- escola real sem métricas: painel abre com `IDENTITY_ONLY`;
- capability indisponível: mostrar tela explicativa;
- erro de rede: mostrar retry;
- indicador suprimido: preservar mensagem de privacidade.

## Sequência de implementação sugerida

1. Trocar handler de clique no mapa:
   - antes: buscar snapshot/perfil direto e mostrar erro quando não encontra;
   - agora: chamar `GET /api/v1/schools/{school_id}/context`.

2. Criar componente `SchoolContextPanel`:
   - props: `schoolId`, `onClose`;
   - fetch interno do endpoint de contexto;
   - estados: loading, loaded, error/retry.

3. Criar subcomponentes:
   - `SchoolIdentityHeader`;
   - `SchoolMapLinks`;
   - `MetricCoverageCard`;
   - `SchoolComparisons`;
   - `SchoolLimitations`;
   - `SchoolActionPlanCard`.

4. Implementar plano IA:
   - botão chama `POST /api/v1/ai/school-action-plans`;
   - enviar `school_id`, `role='school_manager'`, `focus` selecionado;
   - renderizar seções do `plan`;
   - manter badge de governança.

5. Testar casos mínimos:
   - clicar em escola real com `IDENTITY_ONLY` abre painel sem erro;
   - links Google Maps/Rotas existem;
   - botão de plano gera resposta e renderiza seções;
   - filtro CRE continua funcionando;
   - creche não mostra IDEB real inexistente;
   - erro 503 da IA não derruba painel.

## Comandos úteis

Backend local:

```powershell
cd C:\Users\lucas\documents\claude-educacao\backend
$env:PULSO_MOCK_DATA_ENABLED='false'
uv run uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Endpoints para testar:

```text
GET  http://127.0.0.1:8000/api/v1/schools/official?limit=10
GET  http://127.0.0.1:8000/api/v1/schools/SME-RIO-0515062/context
POST http://127.0.0.1:8000/api/v1/ai/school-action-plans
```
