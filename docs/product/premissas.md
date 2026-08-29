# Premissas

Documento vivo. Toda premissa deve possuir estado, fonte e consequência. Mudanças não apagam o histórico: marque a linha anterior como `INVALIDADA` ou substituída e registre a nova decisão/ADR.

## Estados permitidos

- `CONFIRMADA`: evidência oficial ou dataset efetivamente recebido.
- `METADADO_CONFIRMADO`: schema ou campo conhecido, sem acesso às linhas.
- `INFERIDA`: hipótese apoiada por sinais, ainda não confirmada.
- `ABERTA`: depende do briefing ou de evidência futura.
- `INVALIDADA`: evidência posterior contradisse a premissa.

## Registro inicial

| ID | Premissa | Estado | Fonte | Consequência / validação pendente |
|---|---|---|---|---|
| P-001 | O repositório local está na branch `main` e ainda não possui commits. | `INVALIDADA` | `git log`, 26/08/2026 | O repositório local possui commits; manter a regra de não criar novos commits sem autorização explícita. |
| P-002 | O remoto `origin` não possui heads ou tags. | `INVALIDADA` | `git status --branch`, 26/08/2026 | `main` acompanha `origin/main`; não presumir mais remoto vazio. |
| P-003 | A persona primária é o gestor SME/CRE. | `INFERIDA` | plano de arquitetura e pesquisa baseline | Confirmar no briefing. |
| P-004 | Direção escolar participa como persona secundária no drill-down. | `INFERIDA` | plano de arquitetura | Confirmar papéis e permissões. |
| P-005 | Modelos públicos indicam schemas de escola, aluno, histórico, turma, avaliação, frequência, movimentação, COC e dependências. | `METADADO_CONFIRMADO` | pesquisa baseline; plano §2.3 | Não afirmar disponibilidade de linhas. |
| P-006 | Aprendizagem e frequência são os módulos de maior probabilidade temática. | `INFERIDA` | priorização do plano | Reordenar conforme problema e dataset do evento. |
| P-007 | O MVP usa FastAPI, React/TypeScript, DuckDB/Parquet e SQLite. | `CONFIRMADA` | decisão arquitetural [ADR-001](../architecture/decisions/ADR-001-modular-monolith.md) | Implementar apenas nas etapas futuras. |
| P-008 | Claude será central como orquestrador, sem calcular KPIs. | `CONFIRMADA` | [regras de negócio](regras-de-negocio.md) | Métricas devem permanecer determinísticas. |
| P-009 | A integração real com Anthropic estará disponível durante a demo. | `ABERTA` | depende de credencial, crédito e rede | Manter modo fake/fixtureado e rotulado. |
| P-010 | Dados do evento poderão conter atributos pessoais ou sensíveis. | `ABERTA` | dataset ainda não recebido | Classificar antes de ingerir; minimizar e agregar. |
| P-011 | Intervenções, comunicação, saúde, transporte e alimentação estarão disponíveis. | `ABERTA` | fontes apenas prováveis | Manter módulos indisponíveis/desabilitados até confirmação. |
| P-012 | Geolocalização confiável de escolas estará presente. | `ABERTA` | briefing futuro | Mapa é modular e não pode ser dependência do núcleo. |
| P-013 | Problema, dados reais e critérios serão apresentados pela SME no dia do evento. | `CONFIRMADA` | Prefeitura do Rio, 21/08/2026 | Intake e prontidão de dataset desconhecido precedem módulos temáticos completos. |
| P-014 | A unidade gerencial prioritária é SME/CRE, com drill-down até escola. | `INFERIDA` | relatório Impact Lab; estrutura territorial da SME | Implementar filtro CRE no contrato, confirmando a granularidade no briefing. |
| P-015 | `co_entidade`/INEP e `designacao_sme` formarão a ponte canônica de escolas. | `METADADO_CONFIRMADO` | relatório Impact Lab, §5.3; sem dataset do briefing | Modelar ambas como opcionais e auditar taxa de match; não rejeitar fonte com outra chave. |
| P-016 | O BigQuery `datario.educacao_basica` estará acessível no evento. | `ABERTA` | relatório Impact Lab não executou query | Não torná-lo dependência; testar acesso e manter plano por arquivos recebidos. |
| P-017 | A próxima vertical deve disponibilizar uma síntese Claude governada sobre APIs determinísticas. | `CONFIRMADA` | formato oficial do evento; correção de rota backend | Implementar fake provider padrão, provider real opcional e fallback determinístico antes de multiplicar módulos. |
| P-018 | Violência territorial será o tema do desafio. | `ABERTA` | hipótese forte, mas não briefing | Preparar adapter opcional; não codificar como tese obrigatória nem inferir causalidade. |

## Processo de mudança

1. acrescente ou atualize uma linha, sem ocultar o estado anterior;
2. inclua fonte, data e impacto;
3. atualize [capabilities](capabilities.md) quando disponibilidade mudar;
4. crie ADR se contratos, dependências ou responsabilidades forem alterados;
5. atualize testes e documentação antes da implementação correspondente.
