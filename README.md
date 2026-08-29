# Pulso da Rede

Central modular e auditável para apoiar a gestão da rede municipal de educação
nos níveis SME, CRE e escola. Combina métricas determinísticas, FastAPI, React e
agentes com ferramentas limitadas, evidências citáveis e revisão humana.

> **Comece por [`docs/ESTADO-DO-PROJETO.md`](docs/ESTADO-DO-PROJETO.md).** É o
> documento de entrada: o que existe, o que é real, o que é sintético, por que
> cada decisão foi tomada e o que falta.

## Estado atual

Backend e frontend implementados e executáveis.

| camada | origem | situação |
|---|---|---|
| Limite do município | IBGE, malhas territoriais v3, 3304557 | **real** |
| Cadastro de escolas | Data.Rio/SME, CC-BY 4.0 | **real** — 1.588 unidades com coordenada, CREs 1–11 |
| Código INEP | — | ausente na release Data.Rio |
| Frequência, desempenho, ocupação, carência | gerado localmente | **sintético**, rotulado por métrica |

A API declara `school-identity` como `AVAILABLE / REAL_PUBLIC`; todas as
capacidades de indicador seguem em `SCHEMA_ONLY`. A interface mostra isso em
faixa fixa e no selo do topo. Dado sintético nunca é apresentado como real.

## Princípios

- números e regras de negócio são calculados por código determinístico, não por LLM;
- toda informação apresenta fonte, cobertura, data de referência e limitações;
- ausência de dado não é zero; cobertura abaixo do limiar bloqueia a leitura;
- dados sintéticos nunca são apresentados como reais;
- módulos são registrados explicitamente e descobertos pelo frontend via capabilities;
- agentes não acessam bancos diretamente nem executam SQL arbitrário;
- decisões administrativas e comunicações externas exigem aprovação humana;
- privacidade, minimização e agregação são requisitos de arquitetura.

## Executar

**Backend**, com o cadastro real de escolas:

```powershell
Set-Location C:\Users\lucas\documents\claude-educacao\backend
uv sync
uv run python -m scripts.import_official_school_identity
$env:PULSO_MOCK_DATA_ENABLED = 'false'
uv run uvicorn app.main:app --host 127.0.0.1 --port 8000
```

**Frontend**, em outro terminal:

```powershell
Set-Location C:\Users\lucas\documents\claude-educacao\frontend
npm install
npm run dev
```

Abre em <http://localhost:5173>. `VITE_API_BASE` tem padrão
`http://127.0.0.1:8000`; `VITE_API_MODE` aceita `auto`, `live` ou `fixture`.

## Gates

```powershell
Set-Location backend
uv run ruff check app tests scripts
uv run mypy app scripts
uv run python -m pytest -q

Set-Location ..\frontend
npx tsc -b
npm run build
npm run lint
```

## Documentação

**Entrada**

- [Estado do projeto](docs/ESTADO-DO-PROJETO.md) — leia primeiro

**Produto**

- [Visão](docs/product/vision.md) · [Capacidades](docs/product/capabilities.md)
- [Regras de negócio](docs/product/regras-de-negocio.md) · [Premissas](docs/product/premissas.md)
- [Personas e jornadas](docs/product/personas-e-jornadas.md) · [Roteiro de demo](docs/product/roteiro-demo.md)
- [Correção de rota do backend](docs/product/correcao-rota-backend-impact-lab-2026-08-30.md)

**Arquitetura**

- [Visão de arquitetura](docs/architecture/overview.md) · [ADR-001](docs/architecture/decisions/ADR-001-modular-monolith.md)
- [Contrato de módulos](docs/architecture/module-contract.md) · [Runtime dos agentes](docs/architecture/agent-runtime.md)
- [Proveniência](docs/architecture/data-provenance.md) · [Privacidade e segurança](docs/architecture/privacy-and-safety.md)

**Contratos entre agentes**

- [Handoff backend–frontend](docs/api/frontend-handoff.md)
- [Painel da escola e plano de ação](docs/api/frontend-agent-school-context-handoff.md)
- [Grão de turma, habilidade e aula entregue](docs/api/backend-agent-turma-grain-handoff.md)
- [Sintéticos nos schemas da SME](docs/api/backend-agent-sme-pipeline-synthetic-handoff.md)
- [Release de identidade escolar](docs/data/school-identity-release-contract.md)

**Pesquisa de preparação**

- `relatorio-claude-impact-lab-rio-educacao-2026-08-30.md`
- `pesquisa_agenda_recente_sme_rio_e_hipoteses_hackathon.md`
- `hackathon_sme_rio_fontes_e_gaps.md`

## Dados

`data/generated/` e `data/official/` são regeneráveis e ignorados pelo Git. Ver
[política de dados](data/README.md). Nunca versione dado pessoal, upload, banco
local, segredo ou payload de modelo.

## Política Git

Não há commit, push ou `git add` automático — a decisão é do mantenedor. Antes do
commit, revise o conjunto staged com `git diff --cached --name-only`.
