# ADR-001 — Monólito modular com composição explícita

- Status: Aceita
- Data: 2026-08-26
- Decisores: equipe Pulso da Rede
- Escopo: arquitetura inicial do MVP/hackathon

## Contexto

O produto precisa adaptar domínios ao briefing e datasets revelados em um evento de um dia, executar localmente, permanecer auditável e permitir continuidade. Contratos ainda evoluirão. Microserviços acrescentariam rede, deploy, observabilidade e consistência distribuída sem benefício proporcional.

## Decisão

Adotar um monorepo com backend FastAPI e frontend React implantáveis separadamente. O backend é um monólito modular: núcleo, módulos de domínio, portas e adapters no mesmo processo, registrados em composition root explícito. O frontend possui feature registry correspondente e usa a API de capabilities para navegação e fallbacks.

Analytics local será abstraído por portas, inicialmente com DuckDB/Parquet; estado operacional/auditoria, com SQLite. Integração de modelo fica atrás de porta e tools da aplicação. Estas tecnologias serão implementadas em etapas futuras; a Etapa 0 apenas fixa a decisão.

## Regras

- dependências apontam para contratos/núcleo;
- domínio não depende de frameworks ou adapters;
- nenhum plugin loader/discovery mágico;
- IDs de módulos são estáveis e únicos;
- módulos declaram requisitos, routers, indicators, tools e capabilities;
- remoção por registry/configuração não quebra núcleo;
- fronteira HTTP é versionada e OpenAPI orienta tipos frontend.

## Consequências positivas

Entrega e execução local simples; transações e debugging diretos; menor custo operacional; modularidade testável; adapters substituíveis; extração futura possível onde houver necessidade comprovada.

## Consequências negativas

Isolamento depende de disciplina e testes; deploy escala o backend como unidade; falha pode afetar vários módulos; SQLite/DuckDB não são destino multiusuário de produção. Mitigar com contracts, imports controlados, parity tests, observabilidade por módulo e portas de persistência.

## Alternativas rejeitadas

- **Microserviços por domínio:** complexidade desproporcional ao prazo e contratos instáveis.
- **Aplicação monolítica sem módulos:** adaptação/removal e testes ficariam acoplados.
- **Plugins dinâmicos:** descoberta e segurança desnecessárias; composição explícita é mais auditável.
- **LLM acessando banco diretamente:** viola determinismo, menor privilégio e auditoria.

## Critérios de revisão

Reavaliar quando houver equipes/deploys independentes, necessidades de escala/isolamento incompatíveis, limites transacionais claros ou integração institucional que exija separação. Uma substituição deve criar novo ADR e marcar este como substituído, nunca editar a decisão histórica silenciosamente.

Relacionado: [visão de arquitetura](../overview.md) e [contrato de módulo](../module-contract.md).
