# Visão de arquitetura

## Estado e ambiente verificados

Verificação local de 26/08/2026:

| Componente | Resultado |
|---|---|
| SO de trabalho | Windows 10; comandos locais via Git Bash/MSYS e execução futura documentada em PowerShell |
| Python | 3.11.13 |
| uv | 0.8.8 |
| Node.js | v22.18.0 |
| npm | 10.9.3 |
| Git | 2.49.0.windows.1 |
| branch | `main`, sem commits |
| origin | `https://github.com/UFRJ-Analytica/hkt_claude_educacao.git`, sem heads/tags na verificação |

Essas versões registram o ambiente, não fixam ainda constraints de aplicação. Backend e frontend não existem na Etapa 0.

## Estilo

[ADR-001](decisions/ADR-001-modular-monolith.md) adota monólito modular: um backend FastAPI e um frontend React implantáveis separadamente, com domínios internos desacoplados por contratos e composição explícita. DuckDB/Parquet sustentará analytics local; SQLite, estado operacional e auditoria. São escolhas futuras, não componentes implementados nesta etapa.

```text
React / feature registry
        ↓ HTTP + OpenAPI
FastAPI routers
        ↓
application use cases
        ↓
domain contracts + deterministic policies
        ↑
adapters: files, DuckDB, SQLite, model provider, map
```

## Regras de dependência

- domínio não importa FastAPI, DuckDB, SQLite ou SDK Anthropic;
- routers coordenam; não calculam regra de negócio;
- frontend não replica fórmulas;
- agentes usam ferramentas estreitas da aplicação, nunca banco direto;
- adapters dependem de portas do núcleo;
- composição registra módulos explicitamente, sem descoberta mágica;
- integrações futuras BigQuery/MCP entram como adapters.

## Planos de controle e dados

- **analytics:** fontes aprovadas, marts, métricas e evidências; leitura controlada;
- **controle:** runs, investigações, reuniões, ações e auditoria sem PII;
- **modelo:** recebe apenas contexto mínimo autorizado e outputs de ferramentas sanitizados.

## Núcleo e módulos

Núcleo: saúde, capabilities, proveniência, catálogo, qualidade, privacidade, auditoria e contratos. Domínios: rede, escolas, aprendizagem, frequência, capacidade, staffing, equidade e intervenções. Remover um módulo significa removê-lo do registry/configuração, sem editar o núcleo.

Consulte [contrato de módulos](module-contract.md), [runtime de agentes](agent-runtime.md), [proveniência](data-provenance.md) e [handoff frontend](../api/frontend-handoff.md).
