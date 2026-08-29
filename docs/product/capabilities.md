# Capacidades

A capability API será a fonte de verdade em runtime para ativação de módulos. Esta matriz é a fonte de governança antes de sua implementação.

## Estados permitidos

- `AVAILABLE`: fonte e módulo operacionais.
- `MOCK_ONLY`: funcional somente com dados sintéticos, claramente rotulados e fiéis ao schema quando aplicável.
- `SCHEMA_ONLY`: estrutura conhecida, sem linhas disponíveis.
- `UNAVAILABLE`: fonte ausente ou bloqueada.
- `DISABLED`: removida explicitamente por configuração.
- `DEGRADED`: parcialmente operacional, com limitações declaradas.

`DISABLED` expressa decisão de configuração; `UNAVAILABLE`, ausência de pré-requisito; `DEGRADED`, operação parcial. Nenhum desses estados deve ser silenciosamente convertido em `AVAILABLE`.

## Matriz da Etapa 2

Por padrão `mock_data_enabled=false`: learning, attendance, capacity e staffing permanecem
`SCHEMA_ONLY`, mesmo que alguém tenha gerado arquivos localmente. Com configuração explícita
`PULSO_MOCK_DATA_ENABLED=true`, passam a `MOCK_ONLY`; isso não representa dados reais.

| ID | Capacidade | Estado inicial | Base | Condição para evolução |
|---|---|---|---|---|
| `platform.capabilities` | catálogo de capacidades | `SCHEMA_ONLY` | contrato documentado | endpoint e testes contratuais implementados |
| `platform.provenance` | proveniência por indicador/evidência | `SCHEMA_ONLY` | contrato documentado | modelos e persistência implementados |
| `platform.data_quality` | qualidade e cobertura | `SCHEMA_ONLY` | regras documentadas | métricas determinísticas e testes |
| `learning` | aprendizagem e avaliações | `SCHEMA_ONLY` | metadados públicos conhecidos | linhas válidas ou mock fiel aprovado |
| `attendance` | frequência e fluxo | `SCHEMA_ONLY` | metadados públicos conhecidos | linhas válidas ou mock fiel aprovado |
| `capacity` | vagas, salas e ocupação | `SCHEMA_ONLY` | metadados conhecidos | fonte/linhas ou mock fiel aprovado |
| `staffing` | carência e alocação docente | `SCHEMA_ONLY` | metadados conhecidos | fonte/linhas ou mock fiel aprovado |
| `map` | mapa multicamada | `UNAVAILABLE` | geolocalização não confirmada | coordenadas de escola com proveniência |
| `equity` | recortes agregados de equidade | `UNAVAILABLE` | atributos e base legal não confirmados | revisão de privacidade e cobertura |
| `interventions` | programas e intervenções | `UNAVAILABLE` | fonte não confirmada | contrato e dataset confirmados |
| `agents.data_readiness` | prontidão de dados | `SCHEMA_ONLY` | workflow documentado | runtime, tools e auditoria implementados |
| `agents.network_pulse` | consolidação de sinais | `SCHEMA_ONLY` | workflow documentado | indicadores determinísticos disponíveis |
| `agents.investigator` | dossiê auditável | `SCHEMA_ONLY` | workflow documentado | evidências, tools e revisão implementados |

## Contrato mínimo futuro

Cada item de `GET /api/v1/capabilities` deverá conter `id`, `status`, `source_status`, `screens`, `agents`, `limitations` e `updated_at`. O frontend não presume disponibilidade: navegação, rota, badge e fallback derivam do payload.

Mudanças exigem atualização desta matriz, das [premissas](premissas.md) e do [handoff de API](../api/frontend-handoff.md).
