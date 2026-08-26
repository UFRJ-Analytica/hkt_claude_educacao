# Personas e jornadas

## Persona primária: gestor SME/CRE

Necessita acompanhar uma rede ampla, distinguir ruído de situações relevantes, comparar contextos e preparar coordenação com responsáveis. Precisa confiar em fonte, cobertura, atualidade e limites antes de agir.

### Jornada principal

```text
SME → CRE → escola → indicador → evidências → investigação
→ reunião → rascunho de ação → aprovação humana → acompanhamento
```

Critérios: visão agregada sem ranking simplista; filtros persistentes; drill-down explicável; registro da decisão humana.

## Persona secundária: direção escolar

Acessa o contexto de sua escola, entende por que um sinal foi criado, contesta ou complementa evidências e participa da construção/acompanhamento de ações. Não deve receber inferências individuais indevidas.

## Persona de suporte: analista de dados/governança

Perfila datasets, valida mapeamentos, monitora cobertura, freshness e schema drift, classifica proveniência e decide se uma capacidade pode ser habilitada.

## Jornada de briefing e ingestão

```text
arquivo recebido → classificação de privacidade → perfil de schema
→ mapeamento proposto → validação humana → qualidade calculada
→ capabilities reavaliadas → módulos explicitamente ativados
```

## Jornada do agente

```text
gatilho autorizado → escopo e capability checks → ferramentas estreitas
→ evidências anexadas → saída estruturada com limitações
→ revisão humana → aprovação, descarte ou pedido de dados
```

## Necessidades transversais

- linguagem compreensível para perfis técnicos e não técnicos;
- acessibilidade e estados vazios/degradados explicativos;
- rastreabilidade de números e recomendações;
- nenhuma exposição de raciocínio privado do modelo; mostrar ferramentas, evidências, políticas, limitações e transições;
- menor privilégio e separação de escopo entre SME, CRE e escola.

Veja [visão](vision.md), [regras](regras-de-negocio.md) e [privacidade](../architecture/privacy-and-safety.md).
