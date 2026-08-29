# Frontend — Pulso da Rede

React 18 + TypeScript + Vite. Consome `/api/v1` do backend FastAPI e cai para
fixtures locais quando ele não responde.

## Executar

```powershell
Set-Location C:\Users\lucas\documents\claude-educacao\frontend
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build
```

O backend precisa das origens CORS já configuradas em `Settings.cors_origins`
(`http://localhost:5173` está no default). Para subir a API com dados sintéticos:

```powershell
Set-Location ..\backend
$env:PULSO_MOCK_DATA_ENABLED = "true"
uv run uvicorn app.composition:create_app --factory --port 8077
```

## Origem dos dados

`VITE_API_MODE` controla a resolução, e a origem escolhida aparece na tela
(selo do topo e rodapé de Hoje):

| valor | comportamento |
|---|---|
| `auto` (padrão) | testa `GET /health`; usa a API se responder, senão fixture |
| `live` | força API; se ela cair, ainda assim degrada para fixture com aviso |
| `fixture` | ignora a API |

`VITE_API_BASE` aponta a base da API (padrão `http://127.0.0.1:8000`).

## Rede real

Com a release oficial publicada (`uv run python -m scripts.import_official_school_identity`), o
mapa consome `GET /api/v1/schools/official` e passa a mostrar as **1.588 unidades reais** da rede
municipal — identidade, designação SME, CRE, tipo de equipamento e coordenada, fonte Data.Rio/SME
sob CC-BY 4.0.

Os **indicadores continuam sintéticos**, gerados por escola a partir de uma semente estável do
`school_id`. Cada métrica declara a própria proveniência `SYNTHETIC_*`, o selo do topo mostra
`REDE REAL · IND. SINTÉTICOS`, e uma faixa fixa avisa que `network`, `learning`, `attendance`,
`capacity` e `staffing` estão em `SCHEMA_ONLY` na API.

O contorno do município é o limite oficial do IBGE (malhas v3, município 3304557), embutido em
`src/domain/rio-geometry.ts`. Sem tiles externos: o mapa funciona offline.

O dataset governado atual tem 30 unidades sintéticas — insuficiente para a
leitura de rede. Quando a API responde com menos de 200 unidades, o cliente usa
a fixture e **declara isso** nas limitações, em vez de fingir cobertura.

## Painel de contexto da escola

`GET /api/v1/schools/{id}/context` — chamado ao abrir qualquer unidade real.

Regra central: **uma unidade real sempre abre.** Quando não há métrica carregada para o
identificador, o backend devolve `metric_coverage.status = IDENTITY_ONLY` com identidade, CRE, tipo
e coordenada reais. A tela mostra os indicadores como *não carregados* (hachura), explica que falta
o cruzamento por `CO_ENTIDADE`/INEP, e oferece links de Google Maps e rotas. Nunca "escola não
encontrada".

Com `SYNTHETIC_SNAPSHOT_MATCHED`, a tela também renderiza métricas e a comparação escola · CRE ·
rede vinda de `comparisons[]`, sempre rotulada como demonstração.

Educação infantil (`Creche`, `EDI`, `CDEI`) não exibe Desempenho: não há IDEB aplicável, e omitir é
mais honesto do que mostrar vazio.

`POST /api/v1/ai/school-action-plans` gera o plano em cinco seções — sinais, hipóteses, curto prazo,
médio prazo e dados faltantes — com guardrails e a política (`raw_rows_access`,
`decision_automation`) no rodapé. Erros 503 e 422 viram mensagem na tela, sem derrubar o painel.

## Estrutura

```
src/
  api/         types.ts espelha os contratos Pydantic; client.ts resolve a origem;
               fixtures.ts gera o conjunto determinístico (semente 20260830)
  domain/      indicators.ts (limiares VISUAIS, publicados na legenda)
               network.ts   (agregação por CRE — provisória, ver abaixo)
               geo.ts       (projeção e casco convexo, sem tiles externos)
  screens/     Hoje · Comparar · Mapa · Escola · Dados
  components.tsx, styles.css
```

## Regras que o código respeita

- **O front não calcula indicador.** Os valores vêm do backend. `domain/indicators.ts`
  contém apenas limiares de cor, e todos aparecem na legenda da tela.
- **`domain/network.ts` é temporário.** Agrega por CRE porque
  `GET /api/v1/network/snapshot` (fase B3) ainda não existe. A tela Comparar
  declara isso em uma faixa fixa. Quando o endpoint entrar, o módulo é apagado.
- **Valor ausente nunca vira zero.** Célula bloqueada é hachura, sem número.
- **A navegação deriva de `/api/v1/capabilities`.** `DISABLED` some do menu;
  `SCHEMA_ONLY` e `UNAVAILABLE` mantêm a rota e explicam o pré-requisito.
- **Sem tiles externos.** O mapa é desenhado das próprias coordenadas — funciona
  offline. As regiões são o casco convexo dos pontos de cada CRE, e a legenda diz
  que não são a fronteira oficial.
- **Séries temporais não estão no contrato do backend.** Em modo live a coluna
  de 12 meses mostra hachura, não uma linha inventada.

## Pendências conhecidas

1. `POST /api/v1/data/profile` ainda não está ligado à tela Dados (o painel usa
   um perfil de exemplo, rotulado).
2. Situações em Hoje são fixture do contrato antecipado de `/network/snapshot`;
   não há agente ligado.
3. Sem testes ainda — Vitest + Testing Library são o próximo passo.
