# Contrato de módulo

## Objetivo

Permitir inclusão e remoção de domínios sem acoplamento do núcleo ou falhas no shell. O contrato é conceitual nesta etapa e será convertido em tipos/testes na Etapa 1.

## Backend

Cada módulo registrado explicitamente declara:

- `id` estável e versão;
- routers e prefixos sem conflito;
- use cases expostos;
- requisitos e granularidade de dados;
- indicadores e versões de fórmula;
- capabilities produzidas/consumidas;
- ferramentas que pode oferecer aos agentes;
- health/status e limitações;
- owner e política de privacidade.

Módulo não pode importar outro domínio concreto. Dependência compartilhada passa por contrato do núcleo ou use case explicitamente publicado. IDs duplicados, rotas conflitantes ou requisito ausente devem falhar na composição.

## Frontend

Cada feature declara:

- o mesmo `id` de domínio;
- rota e item de navegação;
- componente/página carregável;
- capabilities e estados aceitos;
- fallback para indisponível/degradado;
- eventos analíticos sem PII.

Rotas não são habilitadas por build-time assumptions: o frontend consulta `GET /api/v1/capabilities`. Deep link para capacidade indisponível exibe explicação e alternativas, não erro genérico.

## Lifecycle de status

Estados são os definidos em [capacidades](../product/capabilities.md). Transição requer reavaliação de fonte, schema, cobertura, configuração e health. `AVAILABLE` não é inferido apenas porque o router responde.

## Remoção segura

Gate futuro obrigatório: desregistrar um módulo remove routers, capabilities, telas e tools correspondentes, enquanto `/health`, visão geral e outros módulos continuam operacionais. Dados e migrações do módulo têm estratégia explícita; nenhuma exclusão automática.

## Compatibilidade

- APIs públicas versionadas sob `/api/v1`;
- mudanças aditivas preferidas;
- mudança incompatível exige versão/migração e handoff atualizado;
- OpenAPI será fonte dos tipos frontend;
- testes de parity verificam backend capability ↔ frontend feature ↔ tool permitida.

Veja [handoff de API](../api/frontend-handoff.md) e [ADR-001](decisions/ADR-001-modular-monolith.md).
