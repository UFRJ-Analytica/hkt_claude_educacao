# Vaga Certa

Inteligência na fila da creche do Rio. Mostra onde a fila e a vaga ociosa se
encontram no território, substitui a classificação por opção por **alocação por
criança** e conduz a convocação com contato vivo, relógio e alternativa.

Claude Impact Lab Rio #2 · desafio da Secretaria Municipal de Educação do Rio de
Janeiro · 30/08/2026.

> **Comece por [`docs/ESTADO-DO-PROJETO.md`](docs/ESTADO-DO-PROJETO.md).** É o
> documento de entrada: como o processo funciona de verdade, o que o dado
> sustenta, o que não propor e o plano do dia.

## O problema

A SME-Rio tem vagas ociosas em creche e fila de espera expressiva ao mesmo tempo,
às vezes no mesmo território. Creche atende 0 a 3 anos e 11 meses e é o único
segmento racionado da educação infantil carioca: ~89 mil alunos, ~900 unidades,
mais de 45 mil inscrições por processo.

Três números medidos hoje sobre os dados reais de 2021–2025:

| achado | valor |
|---|---|
| filas com vaga equivalente (mesmo grupamento e turno) a menos de 2 km | **74,7%**, mediana de 1,1 km |
| inflação da fila publicada — posições contra crianças reais, 2025 | **2,08×** (16.345 posições, 7.851 crianças) |
| inscrições sem confirmação registrada dos critérios declarados, 2025 | **63,0%** — ver ressalva em §5.4 do documento de estado |

A causa mecânica está na própria descrição da SME: a classificação é **por
opção**, não por criança. Uma inscrição por CPF vira até cinco registros, uma
criança pode receber até cinco ofertas, e as quatro recusadas ficam congeladas
três dias cada — cascateando. *"Às vezes podemos levar mais de uma semana para
conseguir colocar uma criança em uma vaga (…) enquanto isso existe uma vaga
ociosa e nenhuma criança sendo atendida nela."*

## A proposta

1. **Mapa do descompasso** — por unidade × grupamento × turno, onde a fila está
   represada e onde a vaga equivalente está livre, com a distância entre as duas.
2. **Alocação por criança** — aceitação diferida sobre a preferência já declarada
   e a pontuação já vigente. Preserva a ordem de prioridade por construção (a
   fila é acompanhada por órgãos reguladores), elimina as vagas congeladas e
   remove o incentivo de recusar uma vaga inviável.
3. **Convocação com contato vivo** — painel de chamadas por tempo em status,
   risco de contato frio, atualização de contato rastreada e a alternativa
   próxima oferecida na hora da ligação.

## Princípios

- números e regras de negócio são calculados por código determinístico, nunca por LLM;
- toda informação apresenta fonte, cobertura, data de referência e limitações;
- ausência de dado não é zero; cobertura abaixo do limiar bloqueia a leitura;
- dado anonimizado nunca é apresentado como estatística oficial;
- módulos são registrados explicitamente e descobertos pelo frontend via capabilities;
- agentes não acessam bancos diretamente nem executam SQL arbitrário;
- decisões administrativas e comunicações externas exigem aprovação humana nomeada;
- privacidade, minimização e agregação são requisitos de arquitetura.

## Dados

Fonte única: [`CIT-SME-RJ/dadoscreche`](https://github.com/CIT-SME-RJ/dadoscreche/) —
inscrições por opção, respostas socioeconômicas, catálogo de perguntas com a
régua de pontuação, cadastro de unidades, planilhas de matriculados, microáreas
SME/IPP e nascidos vivos. Cobre os processos de 2021 a 2025.

Os dados passaram por anonimização (códigos artificiais, generalização temporal e
geográfica, supressão de identificadores diretos). **Indicadores gerados a partir
deles não representam a realidade** — o que está preservado é a estrutura do
processo, a lógica da pontuação e a dinâmica de transição de estados. O
entregável é o motor que a SME roda sobre o dado dela, demonstrado sobre o
extrato.

Clonar **fora** deste repositório:

```powershell
git clone https://github.com/CIT-SME-RJ/dadoscreche
```

Nunca versione dado pessoal, upload, banco local, segredo ou payload de modelo.
Ver [política de dados](data/README.md).

## Executar

**Backend** (DuckDB já instalado; o venv não tem pandas nem numpy):

```powershell
Set-Location C:\Users\lucas\documents\claude-educacao\backend
uv sync
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

- [Estado do projeto](docs/ESTADO-DO-PROJETO.md) — leia primeiro; tudo o mais é
  histórico ou detalhe

**Arquitetura** — válida em princípio, desatualizada em conteúdo

- [Visão de arquitetura](docs/architecture/overview.md) · [ADR-001](docs/architecture/decisions/ADR-001-modular-monolith.md)
- [Contrato de módulos](docs/architecture/module-contract.md) · [Runtime dos agentes](docs/architecture/agent-runtime.md)
- [Proveniência](docs/architecture/data-provenance.md) · [Privacidade e segurança](docs/architecture/privacy-and-safety.md)

A documentação do domínio anterior (gestão pedagógica) e os relatórios de
pesquisa da véspera foram removidos na limpeza de 30/08. Estão no histórico do
Git, em `4fe3df2` e anteriores.

## Política Git

Não há commit, push ou `git add` automático — a decisão é do mantenedor. Antes do
commit, revise o conjunto staged com `git diff --cached --name-only` e confirme
que nenhum arquivo do `dadoscreche` entrou.

> **Pendência aberta:** a regra 1 do evento exige primeiro commit após as 09h de
> 30/08 e este repositório tem histórico anterior. Ver §2 do documento de estado
> antes de qualquer entrega.
