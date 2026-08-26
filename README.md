# Pulso da Rede

Central modular e auditável para apoiar a gestão da rede municipal de educação nos níveis SME, CRE e escola. O produto combinará métricas determinísticas, FastAPI, React e agentes com ferramentas limitadas, evidências citáveis e revisão humana.

> Estado atual: **Etapa 0 — bootstrap e governança**. Ainda não há backend, frontend, dados de demonstração ou integração com modelos. O repositório remoto foi verificado sem referências, branches ou tags; portanto, está vazio. O repositório local também não possui commits. Nenhum commit é automático ou está autorizado por esta documentação.

## Princípios

- números e regras de negócio são calculados por código determinístico, não por LLM;
- toda informação apresenta fonte, cobertura, data de referência e limitações;
- dados sintéticos nunca são apresentados como reais;
- módulos são registrados explicitamente e descobertos pelo frontend via capabilities;
- agentes não acessam bancos diretamente nem executam SQL arbitrário;
- decisões administrativas e comunicações externas exigem aprovação humana;
- privacidade, minimização e agregação são requisitos de arquitetura.

## Documentação

- [Visão de produto](docs/product/vision.md)
- [Premissas](docs/product/premissas.md)
- [Matriz de capacidades](docs/product/capabilities.md)
- [Personas e jornadas](docs/product/personas-e-jornadas.md)
- [Regras de negócio](docs/product/regras-de-negocio.md)
- [Roteiro da demonstração](docs/product/roteiro-demo.md)
- [Visão de arquitetura](docs/architecture/overview.md)
- [Contrato de módulos](docs/architecture/module-contract.md)
- [Runtime dos agentes](docs/architecture/agent-runtime.md)
- [Proveniência](docs/architecture/data-provenance.md)
- [Privacidade e segurança](docs/architecture/privacy-and-safety.md)
- [ADR-001](docs/architecture/decisions/ADR-001-modular-monolith.md)
- [Contrato backend–frontend](docs/api/frontend-handoff.md)
- [Política de dados](data/README.md)

## Execução futura (PowerShell)

A Etapa 0 não cria aplicações executáveis. Depois dos scaffolds das etapas seguintes, os comandos-alvo serão:

```powershell
# Backend (futuro)
Set-Location C:\Users\lucas\documents\claude-educacao\backend
uv sync
uv run pytest -q
uv run ruff check .
uv run uvicorn app.main:app --reload --port 8000

# Frontend (futuro, em outro terminal)
Set-Location C:\Users\lucas\documents\claude-educacao\frontend
npm ci
npm run test
npm run dev
```

Neste momento, `backend` e `frontend` deliberadamente não existem. Não execute os comandos acima até que seus respectivos scaffolds sejam implementados.

## Verificações da Etapa 0

Com GNU Make disponível:

```powershell
Set-Location C:\Users\lucas\documents\claude-educacao
make help
make docs-check
make safety-check
```

Alternativamente, consulte os comandos portáveis exibidos por `make help`. O `safety-check` é preventivo; antes do primeiro commit, a equipe deve também revisar manualmente o conjunto de arquivos staged com `git diff --cached --name-only` e nunca versionar dados pessoais, segredos, uploads ou payloads de modelos.

## Configuração

Copie `.env.example` para `.env` somente quando houver aplicação. `.env` é ignorado pelo Git. Integração real com Anthropic permanece desativada por padrão e deverá requerer `AGENT_MODEL_MODE=anthropic` e credencial local explícita.

## Política Git

Não há commit, push ou `git add` automático. O remoto `origin` está configurado, mas vazio na verificação inicial. A decisão de criar o primeiro commit pertence ao mantenedor e deve ser explícita. Os artefatos baseline de pesquisa e o plano em `.hermes/plans/` são preservados sem alterações nesta etapa.
