# Roteiro de demonstração

Roteiro-alvo de cinco minutos; nesta Etapa 0 ele é apenas governança narrativa. Nenhuma tela ou agente está implementado.

## Antes da demo

- confirmar problema, persona, decisão e critérios da banca;
- classificar arquivos, granularidade, PII e licença/condições de uso;
- validar mapeamento e qualidade com responsável humano;
- atualizar [premissas](premissas.md) e [capacidades](capabilities.md);
- ativar um módulo profundo e desabilitar os irrelevantes;
- testar modo real e fallback fake claramente rotulado.

## Narrativa (5 minutos)

1. **0:00–0:40 — Pulso da rede:** visão geral mostra uma mudança relevante e sua cobertura; badge identifica dado real ou sintético.
2. **0:40–1:20 — Qualidade:** Guardião explica por que o sinal é confiável ou degradado; demonstrar que baixa cobertura bloqueia interpretação.
3. **1:20–2:20 — Escola 360:** navegar SME → CRE → escola e abrir séries/pares sem ranking simplista.
4. **2:20–3:30 — Investigação:** agente usa ferramentas registradas e entrega fatos, hipóteses, contra-hipóteses, evidências e limites; nenhuma causalidade inventada.
5. **3:30–4:10 — Contexto modular:** mapa/capacidade/frequência aparece apenas se a capability estiver habilitada.
6. **4:10–5:00 — Decisão humana:** gestor revisa, adiciona à reunião, edita um rascunho de ação e aprova acompanhamento. Mostrar trilha de auditoria.

## Plano de contingência

Se provider, rede ou crédito falhar, usar fake determinístico/outputs fixtureados com rótulo permanente `DEMONSTRAÇÃO SINTÉTICA`; não simular chamada real. Se dados forem insuficientes, demonstrar honestamente `UNAVAILABLE`, `SCHEMA_ONLY` ou `DEGRADED` e explicar o dado necessário.

## Critérios de encerramento

A banca deve compreender: qual decisão é apoiada, de onde vêm os fatos, onde Claude agrega valor, o que exige humano, quais limites permanecem e como um novo dataset ativa/remove módulos.
