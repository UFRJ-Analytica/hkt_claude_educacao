# Handoff backend–frontend

Contrato de integração futuro; não há endpoint ou cliente implementado na Etapa 0.

## Fonte de verdade

OpenAPI versionado do FastAPI será a fonte dos DTOs. O frontend gera cliente/tipos e não duplica manualmente contratos. APIs ficam sob `/api/v1`; `/health` é operacional.

## Capabilities primeiro

Na inicialização, o frontend consulta `GET /api/v1/capabilities`. Cada item contém, no mínimo:

```json
{
  "id": "attendance",
  "status": "MOCK_ONLY",
  "source_status": "METADADO_CONFIRMADO",
  "screens": ["attendance", "school_360", "map"],
  "agents": ["network_pulse", "investigator"],
  "limitations": ["fatos sintéticos"],
  "updated_at": "2026-08-26T00:00:00-03:00"
}
```

`source_status` usa os estados de premissas (`CONFIRMADA`, `METADADO_CONFIRMADO`, `INFERIDA`, `ABERTA`, `INVALIDADA`); `status`, os estados de capacidade (`AVAILABLE`, `MOCK_ONLY`, `SCHEMA_ONLY`, `UNAVAILABLE`, `DISABLED`, `DEGRADED`).

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

Veja [contrato de módulo](../architecture/module-contract.md) e [capacidades](../product/capabilities.md).
