# Proveniência de dados

## Categorias

- `REAL_PUBLIC`: fonte pública real, com URL/origem, licença/condições e data registradas.
- `SYNTHETIC_SCHEMA_FAITHFUL`: fatos sintéticos que respeitam schema confirmado.
- `SYNTHETIC_INFERRED`: estrutura ou narrativa sintética baseada em hipótese não confirmada.
- `KNOWN_UNAVAILABLE`: fonte conhecida, mas ausente/bloqueada.

A classificação é por asset e observação; combinar fontes não elimina a obrigação de preservar a linhagem. Dados sintéticos recebem badge/watermark e nunca são descritos como resultados reais da rede.

## Envelope mínimo de indicador

Todo payload futuro contém:

- `source_id` e `source_kind`;
- `generated` e versão/seed quando sintético;
- `as_of` e janela temporal;
- `coverage` com numerador/denominador quando aplicável;
- `quality_status`;
- `limitations`;
- versão da definição/fórmula;
- granularidade e filtros relevantes.

Evidências recebem ID imutável e referência ao asset/query/versão que as produziu. Auditoria do agente guarda IDs, não cópias de dados pessoais.

## Registro de fonte

Antes de usar uma fonte, registrar owner/custodiante, finalidade, origem, condições/licença, classificação de privacidade, schema, granularidade, periodicidade, período coberto, freshness esperada, controles de acesso, transformações e política de retenção/exclusão.

## Qualidade

Completude, unicidade, integridade referencial, domínios, freshness, cobertura e schema drift são calculados deterministicamente. Finding severo pode mudar capability para `DEGRADED`/`UNAVAILABLE` e bloquear interpretação. “Sem linha” não vira zero.

## Mudanças

Carga ou schema novo não substitui silenciosamente a versão anterior. Registrar hash, timestamp, mapeamento aprovado, validações e impacto. Fórmulas versionadas preservam reprodutibilidade. Geradores sintéticos devem aceitar seed e versão e nunca gerar identificadores diretamente atribuíveis.

Veja [política de dados](../../data/README.md), [capacidades](../product/capabilities.md) e [privacidade](privacy-and-safety.md).
