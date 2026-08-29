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

`VITE_API_BASE` aponta a base da API (padrão `http://127.0.0.1:8077`).

O dataset governado atual tem 30 unidades sintéticas — insuficiente para a
leitura de rede. Quando a API responde com menos de 200 unidades, o cliente usa
a fixture e **declara isso** nas limitações, em vez de fingir cobertura.

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
