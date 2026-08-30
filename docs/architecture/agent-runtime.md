# Runtime dos agentes

Este documento define limites futuros; nenhum agente é implementado na Etapa 0.

## Agentes candidatos

`data_readiness`, `quality_guardian`, `network_pulse`, `investigator`, `meeting_preparer` e `action_monitor`. Cada um possui objetivo estreito, versão, capabilities exigidas, tools allowlisted, schema de saída e política de revisão.

## Estados do run

`SCHEDULED`, `RUNNING`, `WAITING_FOR_DATA`, `WAITING_FOR_REVIEW`, `APPROVED`, `DISMISSED`, `MONITORING`, `COMPLETED` e `FAILED`. Transições inválidas falham de forma tipada e são auditadas.

## Contrato de ferramenta

Toda tool declara nome/versão, schemas de entrada/saída, capability exigida, granularidade permitida, política de privacidade, timeout e erros tipados. Tools chamam use cases; não expõem SQL, filesystem irrestrito, banco ou credenciais.

## Ciclo controlado

1. autenticar ator, gatilho, objetivo e escopo;
2. validar capabilities e política de dados;
3. executar no máximo N passos e dentro do timeout;
4. validar toda entrada/saída estruturada;
5. anexar IDs de evidência existentes;
6. separar fatos de hipóteses e declarar limitações;
7. aguardar revisão antes de qualquer ação administrativa;
8. persistir resultado e auditoria sanitizada.

Retry é limitado a falhas transitórias. Não há recursão livre entre agentes, tool não registrada, alteração de origem ou ação externa no MVP. O provider real é opt-in; testes e contingência usam fake determinístico claramente rotulado.

## Auditoria

Persistir sem PII: run id, agente/versão, gatilho, objetivo, escopo, versões de prompt/policy, modelo, tools e parâmetros sanitizados, evidências, transições, limitações, decisão humana, timestamps e erro sanitizado. Não exibir ou persistir raciocínio interno privado; a explicabilidade vem de fatos, ferramentas, políticas e evidências.

## Fail-safe

Capability ausente → `WAITING_FOR_DATA` ou falha tipada. Qualidade insuficiente → saída degradada ou bloqueada. Provider indisponível → fallback explícito, nunca resposta fabricada. Violação de privacidade → bloquear antes do envio e registrar apenas evento sanitizado.

Veja regras de negócio, [proveniência](data-provenance.md) e [privacidade](privacy-and-safety.md).
