# Plano — app de inscrição em creche (mobile first)

Hackathon Claude · 30/08/2026 · Desafio "Inteligência na Inscrição de Creche" (SME-Rio)

Fontes: `briefing.md`, `fluxo_tela_app.md`, `fluxo_atual_matricula_rio.png`,
`relatorio-claude-impact-lab-rio-educacao-2026-08-30.md`, `hkt_claude_educacao/` (frontend "Pulso da Rede").
A wikitica está vazia (0 páginas) — nada a reaproveitar dela hoje.

---

## 1. Fluxo atual do matricula.rio (o que a captura mostra + o que o briefing conta)

**Tela capturada (passo 1, "Inscrição"):** 7 campos obrigatórios, nesta ordem —
Origem do candidato (select "Nunca estudou") · Deficiência/TGD/altas habilidades (S/N) ·
Data de nascimento · **Escolaridade pretendida para 2026** (select "Maternal I") ·
Pais/responsáveis ≥ 60 anos (S/N) · Pais/responsáveis com deficiência (S/N) ·
Mãe adolescente < 18 (S/N) · botão **Continuar**.

**Passos seguintes (não capturados, reconstruídos do briefing):** CPF do responsável validado na
Receita (1 inscrição ativa por CPF) → dados do responsável e da criança → telefone/email →
endereço **residencial apenas** → bairro → lista de unidades ofertadas para a idade → escolha de
**5 opções** (podem ser em regiões diferentes) → questionário socioeconômico (perguntas S/N com
peso por ano, `perg_pontuacao`) → comprovação **presencial no dia seguinte** na unidade →
validação manual (creche + diretor) → cruzamento SME/data lake → pré-classificação diária →
convocação manual → 3 dias + 1 útil para matricular.

**Problemas visíveis na tela atual:**

| # | Problema | Evidência |
|---|---|---|
| 1 | Pergunta critérios de prioridade **antes** de saber quem é a criança e sem explicar para que servem | ordem dos campos |
| 2 | Pede "Escolaridade pretendida" ao usuário, quando ela é **derivada** da data de nascimento (Berçário / Maternal I / Maternal II) — abre erro de preenchimento | select manual |
| 3 | Jargão institucional ("Origem do candidato", "transtornos globais do desenvolvimento", "candidato") | labels |
| 4 | Layout desktop: formulário de 840 px, selects estilizados, rádios de 13 px — inutilizável com polegar, e o briefing diz que "muitos acessos são pelo celular" | captura |
| 5 | Sem indicador de progresso, sem salvar rascunho, sem estimativa de tempo | captura |
| 6 | Sem critério de distância/território na escolha (o briefing: "o fluxo quebra no passo 1") | Eixo 2 |
| 7 | Comprovação presencial obrigatória no dia seguinte → gargalo humano e barreira para quem trabalha | Eixo 2 |
| 8 | Convocação "não chega no usuário final"; sem canal ativo; prazos curtos geram vaga ociosa | Eixo 3 |
| 9 | Nada de acompanhamento pós-inscrição além de consultar o site | Eixo 3 |

---

## 2. Crítica ao fluxo proposto em `fluxo_tela_app.md`

O que está certo e deve ficar: mobile first · ponta a ponta · mapa com localização · demanda por
unidade visível na escolha · pré-triagem de documento com Claude · código de inscrição · endereço de
trabalho como segundo ponto de busca.

O que eu mudaria:

**(a) Modal de prioridade — manter, como checklist "tenha em mãos".** O modal aparece antes da
escolha e lista, por critério (deficiência da criança, responsável ≥60 ou com deficiência, mãe <18,
Bolsa Família/CadÚnico, violência doméstica, familiar encarcerado), **qual documento será pedido**.
A escolha "Tenho um desses casos / Não tenho" só define se a etapa de documentos entra no wizard.
Proteção: as perguntas S/N do passo 4 continuam para todos; se alguém escolheu "normal" e responde
"sim" a um critério, o app avisa e oferece a etapa de documentos na hora — ninguém perde prioridade
por escolher errado no início.

**(b) Chave Pix — manter, como canal durável de contato e convocação.** O problema do Eixo 3 é que
telefone e email mudam e a convocação "não chega". A chave Pix CPF é o identificador mais estável que
o cidadão tem (Bolsa Família e Caixa Tem já operam por ela). Usos:
1. **Verificação da chave**: a prefeitura envia Pix de R$ 0,01 com código na descrição; o usuário
   digita o código no app (mesma mecânica de micro-depósito).
2. **Convocação por Pix**: Pix de R$ 0,01 com mensagem de até 140 caracteres ("Vaga liberada na
   Creche X. Responda até 03/09 em matricula.rio/c/ABC123") — chega como notificação do app do banco
   mesmo que o número tenha mudado.
3. Segundo canal (WhatsApp/email) continua existindo; Pix é o que sobrevive à troca de contato.
Cuidados a declarar no pitch: consentimento explícito com finalidade (LGPD), custo marginal por
mensagem, e fallback para quem não tem chave (raro no público-alvo, mas existe).

**(c) Seleção "1 primeira + 2 prioritárias + ..." — simplificar.** A regra vigente é 5 opções
ordenadas. O modelo mental mais simples: **lista ordenada de até 5, arrastável**, com a 1ª destacada
como "preferida", e um único consentimento: "Aceito vaga em qualquer uma das 5 se a preferida não
tiver vaga". Isso preserva a regra atual (não precisa de mudança normativa) e ataca a ociosidade do
Eixo 3.

**(d) Faltam no fluxo proposto (todos de alto impacto):**
1. **Derivar grupamento e horário** da data de nascimento — mostrar "Berçário / Maternal I / II" já
   calculado e só listar unidades que ofertam esse grupamento ("aparecer unidades ofertadas de acordo
   com a idade" está no briefing). ⚠️ data de corte não está em nenhum arquivo — mockar por ano de
   nascimento e marcar como parâmetro do backend.
2. **Entrada "já tenho inscrição"** com CPF + código → tela de **acompanhamento** (a regra de 1
   inscrição ativa por CPF exige isso; hoje o usuário só descobre o status voltando ao site).
3. **Convocação dentro do app**: timeline (inscrito → documentos pré-analisados → pré-classificação
   diária → convocado → matriculado), aviso por WhatsApp, botões **Aceitar / Recusar vaga** com
   contagem regressiva de 3 dias (+1 útil com justificativa). Recusa imediata libera a vaga para o
   próximo — é o ganho mais direto contra vaga ociosa (40 % da nota é "impacto real").
4. **CEP como caminho principal de localização**, GPS como atalho. Muita gente nega permissão de
   localização; CEP → ViaCEP resolve bairro e coordenada aproximada.
5. **Rascunho salvo** (localStorage) — formulário no celular é interrompido o tempo todo.
6. **Pré-análise de documento com guardrail explícito**: Claude extrai campos e checa consistência
   (nome bate? data válida? tipo de documento certo?) e devolve "pré-aprovado / pendente / ilegível";
   a **pontuação é determinística** (soma de `perg_pontuacao`), nunca do modelo. Isso é o que a
   pesquisa prévia já registra como guardrail e o que torna a classificação "auditável".

**(e) Escopo para o hackathon:** cortar do protótipo o "exibir unidades próximas caso nenhuma esteja
disponível" como lógica separada — ele já é o comportamento natural da lista ordenada por distância
com etiqueta de demanda.

---

## 3. Reaproveitamento do frontend existente (`hkt_claude_educacao/frontend`)

Stack: React 19 · TypeScript 6 · Vite 8 · Tailwind v4 (CSS-first, sem `tailwind.config`) · coss ui
(shadcn-compatível sobre Base UI, 55 primitivos em `src/components/ui/`) · TanStack Query 5 ·
react-router 7 · lucide · oxlint. Sem lib de formulário/validação instalada.

| Reaproveitar tal qual | Por quê |
|---|---|
| `components/ui/*` (field, fieldset, input, input-group, otp-field, radio-group, select, combobox, checkbox, calendar, drawer, sheet, progress, toast, skeleton, badge, alert, dialog, button) | tudo que um wizard mobile precisa já está vendorizado; `drawer` e `sheet` (não usados hoje) servem de bottom-sheet para o mapa |
| `styles/base.css`, `styles/coss.css`, `styles/theme.css` | tokens + reset; só trocar a paleta (seção 4) |
| `lib/utils.ts` (`cn`), `hooks/use-media-query.ts` (`useIsMobile`, `pointer: coarse`) | prontos |
| `domain/projection.ts`, `domain/rio-geometry.ts`, `domain/geo.ts`, `domain/format.ts` | Mercator + contorno IBGE do município embutido → mapa offline sem tile |
| `screens/mapa/MapCanvas.tsx` (+ `scale.ts`, `MapLegend`) | SVG com pan/zoom e círculo por unidade; precisa ganhar pinch (touch) e `touch-action: none` |
| `api/client.ts` (padrão `auto | live | fixture` com probe em `/health`) | é exatamente o que "backend mockado agora, BigQuery depois" pede; fixtures determinísticas (seed 20260830) |
| fontes `Schibsted Grotesk` + `IBM Plex Mono` no `index.html` | identidade tipográfica já definida |

| Não levar | Por quê |
|---|---|
| `screens/*` (Hoje, Comparar, Escola, Recomposição, Fluxo, Dados, Professor), `Copiloto.tsx`, `roles.tsx`, `DemoBar` | produto gerencial ("Pulso da Rede"), outro usuário |
| `styles/legacy.css` (627 linhas) | CSS desktop-first de tabelas/matriz; carrega os tons quentes hard-coded |
| `api/analytics.ts`, `pipeline.ts`, `turmas.ts` | domínios de aula/turma/ADR |

**Decisão de mapa:** para o cidadão achar "a creche perto de casa", um mapa sem ruas ajuda pouco.
Recomendação: **Leaflet + tiles OSM** (`react-leaflet`, gratuito, ~40 kB) como camada principal, e
manter `MapCanvas` como fallback offline / render no pitch se a rede falhar. Se o tempo apertar,
lançar só com o `MapCanvas` — já funciona com as 1.588 unidades reais.

**Backend hoje:** FastAPI + DuckDB sobre Parquet; **não há BigQuery nem modelo de inscrição/vaga**.
Existe `SchoolIdentity` (1.588 unidades reais com lat/lon, `school_type` com `Creche`/`EDI`/`CDEI`,
CRE, bairro) e `SchoolCensus.enrolment_infant`. Isso basta para mockar a lista de unidades com dados
reais de localização. Demanda/vagas/inscrições serão mock até o BigQuery entrar.

---

## 4. Cor: `#13335a` no lugar do laranja/terracota

Não existem tokens `amber/orange/yellow` — o tom quente é a **rampa de atenção** `--a1/--a2/--a3`
usada como marca (wordmark, selo, foco) *e* como escala de dados. Separar os dois papéis:

**No app novo (`theme.css` copiado):**
```css
--brand:        #13335a;   /* azul Prefeitura do Rio — primária, wordmark, botões, foco */
--brand-2:      #1f4f86;   /* hover / links */
--brand-soft:   #e8eef6;   /* fundo de destaque, chips, passo ativo */
--brand-ink:    #ffffff;   /* texto sobre --brand (contraste 11.9:1, AAA) */
--primary: var(--brand); --ring: var(--brand); --accent: var(--brand-2); --accent-soft: var(--brand-soft);
/* demanda por unidade — semáforo próprio, não a marca */
--demand-low:  #2f7d5f;  --demand-mid: #b7791f;  --demand-high: #a32d2d;
```
`@theme inline`: `--color-brand`, `--color-brand-soft`, `--color-demand-*` → `bg-brand`, `text-brand`.

**No frontend existente (a "outra parte da entrega") — lista exata de troca:**
- `src/styles/theme.css:32-34` (`--a1/--a2/--a3`), `:37-40` (accent petróleo → `#13335a`/`#1f4f86`/`#e8eef6`), `:89` `--destructive`, `:94` `--warning`, `:175-177` utilitários `attn-*`.
- `src/styles/legacy.css` tons quentes hard-coded: linhas 32-34 (wordmark `rgba(178,92,49,.16)`), 58, 146, 161, 322, 329, 390, 400, 420, 458, 483, 485, 501, 571, 589 (`#fbf6f2`, `#e6d8cd`, `#e3cbbb`, `#f6e9e0`, `#8a5535`, `#fbf1ed`, `#e6cec4`) → `#e8eef6` / `#c9d6e6` / `#13335a`.
- `src/components/shell/DemoBar.tsx:23` (`border-b-[#e6d8cd] bg-[#fbf6f2]`).
- `src/screens/mapa/scale.ts:8-15` — rampa de atenção do mapa: manter uma rampa ordinal, mas em azul (`#c9d6e6` → `#1f4f86` → `#13335a`) ou trocar por `--demand-*`; decidir pelo contraste no mapa.
- `src/screens/Recomposicao.tsx:196` (comentário com hex).

Checar contraste: `#13335a` sobre branco = 11.9:1; `#1f4f86` sobre branco = 7.6:1; ambos AAA.

---

## 5. App standalone — plano

### 5.1 Onde e como
O protótipo foi criado inicialmente como app standalone e depois consolidado na raiz
**`frontend/`** (Vite + React + TS, mesma stack). Reaproveitar `components/ui/`,
`components.json`, `styles/{base,coss,theme}.css`,
`lib/`, `hooks/`, `domain/{projection,rio-geometry,geo,format}.ts`, `api/client.ts` (adaptado),
`index.html` (fontes), `vite.config.ts`, `tsconfig*`, `.oxlintrc.json`. Não copiar `legacy.css`.
Adicionar: `react-leaflet` + `leaflet` (opcional), `zod` (validação de CPF/CEP/datas).

### 5.2 Rotas e telas (mobile first, largura de referência 390 px)

| Rota | Tela | Conteúdo |
|---|---|---|
| `/` | Início | logo Prefeitura/Educação, "Inscrever criança na creche" (CTA) → **modal de prioridade** (checklist de critérios e documentos, "li e entendi", escolha "Tenho um desses casos / Não tenho"), "Já tenho inscrição", prazos do processo |
| `/inscricao/crianca` | Passo 1 · Criança | nome, data de nascimento (→ chip calculado "Berçário", "Maternal I"...), sexo (opcional), "já estudou em creche?" |
| `/inscricao/responsavel` | Passo 2 · Responsável | nome, CPF (máscara + dígito verificador; mock da Receita), telefone (WhatsApp) + **OTP** (`otp-field`), email opcional, "sou a mãe / pai / outro" |
| `/inscricao/pix` | Passo 3 · Contato que não muda | explicação em 2 linhas do porquê; chave Pix CPF (pré-preenchida com o CPF, confirmar) + chave adicional opcional; botão "Verificar" → mock de Pix de R$ 0,01 recebido, digitar código da descrição; consentimento de uso para convocação |
| `/inscricao/endereco` | Passo 4 · Endereço | CEP → auto-preenche (ViaCEP ou mock), número, complemento; toggle "adicionar endereço de trabalho" (segundo ponto para busca) |
| `/inscricao/prioridade` | Passo 5 · Situação da família | perguntas S/N com explicação de uma linha (deficiência da criança, responsável ≥60, responsável com deficiência, mãe <18, Bolsa Família/CadÚnico, violência doméstica, familiar encarcerado…); no fim: "Sua inscrição tem N critérios — documentos: …" |
| `/inscricao/documentos` | Passo 6 · Documentos (condicional) | um card por documento exigido: foto/câmera → "Analisando…" → **pré-aprovado / pendente / ilegível** com motivo; aviso "a validação final é da unidade" |
| `/inscricao/unidades` | Passo 7 · Escolha das creches | **mapa (bottom-sheet com lista)**; chips de origem (Casa / Trabalho / Minha localização / Bairro…); filtro implícito pelo grupamento; cada unidade: nome, distância, horário (integral/parcial), **demanda alta/média/baixa** e "vagas prioritárias / gerais"; adicionar até 5; lista ordenada arrastável; consentimento de realocação |
| `/inscricao/revisao` | Passo 8 · Revisão | resumo editável por bloco; "Enviar inscrição" |
| `/inscricao/confirmacao` | Confirmação | **código da inscrição** grande, botão "Salvar no WhatsApp", "Adicionar ao calendário" (prazos), o que acontece agora |
| `/acompanhar` | Acompanhamento | entrada CPF + código (ou OTP) → timeline: inscrição → documentos → pré-classificação (posição por opção, atualizada 1×/dia) → **convocação** (mock da notificação Pix/WhatsApp recebida; Aceitar / Recusar, contagem regressiva 3 d + 1 útil) → matrícula |

Shell mobile: barra de topo fina (logo + passo "3 de 8"), `Progress` linear, botão primário fixo no
rodapé (`position: sticky; bottom`), sem menu lateral. Desktop (fase 2): conteúdo centralizado
a 560 px e, na tela de unidades, mapa à esquerda + lista à direita (`useIsMobile` decide).

Regras de UX: alvos ≥ 44 px · uma pergunta por bloco visual · linguagem de 1ª pessoa e sem jargão ·
`inputmode` numérico onde couber · rascunho em localStorage a cada passo · voltar nunca perde dado ·
erros ao lado do campo, nunca só no topo.

### 5.3 Contratos de dados (mock agora, BigQuery depois)
Frontend fala só com estes endpoints; `api/client.ts` mantém `auto | live | fixture`:

```
GET  /api/v1/unidades?grupamento=&lat=&lon=&bairro=&raio_km=     → Unidade[]
GET  /api/v1/unidades/{id}                                        → Unidade + demanda por grupamento/horário
GET  /api/v1/cep/{cep}                                            → {logradouro, bairro, lat, lon}
POST /api/v1/otp  /  POST /api/v1/otp/verificar
POST /api/v1/pix/verificar  {chave}  →  {enviado: true}   /  POST /api/v1/pix/confirmar  {chave, codigo}
POST /api/v1/documentos/pre-analise  (multipart)                  → {status, campos_extraidos, motivo}
POST /api/v1/inscricoes                                           → {codigo, criterios, documentos_pendentes}
GET  /api/v1/inscricoes/{codigo}?cpf=                             → status + timeline + posicao por opcao
POST /api/v1/inscricoes/{codigo}/convocacao  {aceite: bool}
```
```ts
type Unidade = { id: string; nome: string; tipo: 'Creche'|'EDI'|'CDEI'|'Conveniada'; cre: number;
  bairro: string; endereco: string; lat: number; lon: number;
  oferta: { grupamento: 'Berçário'|'Maternal I'|'Maternal II'; horario: 'Integral'|'Parcial';
            vagas: number; vagas_prioritarias: number; inscritos: number;
            demanda: 'baixa'|'media'|'alta' }[] }
```
Fixtures: unidades = 1.588 reais do cadastro (`/api/v1/schools/official` filtrado por tipo) com
`oferta` sintética determinística (seed 20260830); `demanda` = inscritos/vagas em faixas. Quando o
BigQuery entrar, as tabelas do briefing (Inscrições por opção, Respostas socioeconômicas,
Perguntas por processo, Unidades) alimentam exatamente esses campos.

### 5.4 Onde o Claude entra (e onde não entra)
- **Entra:** pré-análise de documento (extração + consistência + classificação de legibilidade);
  texto de ajuda contextual ("o que é laudo?"); geração da mensagem de convocação em linguagem simples.
- **Não entra:** cálculo de pontuação, ordenação da fila, decisão de vaga. Tudo isso é SQL/regra
  determinística, versionada por processo/ano — e a tela de acompanhamento mostra "por que esta
  posição" (critérios + pesos), que é a "classificação auditável" do briefing.

### 5.5 Ordem de execução (hackathon)
1. **Setup (1 h)** — `creche-app/` com cópia dos artefatos da seção 5.1; paleta azul; shell mobile + `Progress`; rascunho em localStorage.
2. **Início + modal de prioridade + wizard passos 1–5 + 8 + confirmação (3,5 h)** — formulários com `zod`, CPF, OTP mock, **verificação Pix mock**, grupamento derivado. Já demonstrável.
3. **Escolha de unidades (3 h)** — fixtures de unidades reais + oferta sintética; lista ordenada por distância com demanda; mapa (`MapCanvas` primeiro, Leaflet se sobrar tempo); seleção/ordenação de 5.
4. **Acompanhamento + convocação (2 h)** — timeline mock, tela simulando a notificação Pix recebida, aceitar/recusar com contagem.
5. **Documentos com Claude (2 h)** — upload de foto → chamada ao backend → status; se o backend não existir a tempo, resposta mock com 3 cenários fixos.
6. **Recolorir o frontend existente (45 min)** — lista da seção 4.
7. **Desktop (se sobrar)** — layout duas colunas na tela de unidades; centralização do wizard.

### 5.6 Riscos / lacunas a fechar com a organização
- Data de corte etária e tabela idade → grupamento (nenhum arquivo tem).
- Texto das perguntas socioeconômicas e pesos do processo vigente (só temos ids/pesos 2021-2025).
- Regra de desempate e de processamento das 5 opções (ordem estrita? realocação?).
- Consulta à Receita e OTP/WhatsApp: mock no hackathon; em produção via gov.br / Matrícula Carioca.
- Base histórica registra até 6 opções (regra diz 5) — tratar como dado, não replicar.

---

## 6. Estado da entrega (30/08/2026, fim da tarde)

**Construído em `hkt_claude_educacao/frontend/`** (React 19 · Vite 8 · Tailwind v4 · coss ui · Leaflet/OSM), `npm run dev` para rodar:

| Tela | Rota | Estado |
|---|---|---|
| Início + modal de prioridade (checklist de documentos, "Tenho um desses casos / Não tenho") | `/` | ✅ |
| 1 · Criança (grupamento derivado da data de nascimento, horário) | `/inscricao/crianca` | ✅ |
| 2 · Responsável (CPF validado, WhatsApp com OTP simulado) | `/inscricao/responsavel` | ✅ |
| 3 · Pix como contato durável (micro-Pix de confirmação simulado, consentimento LGPD, "não tenho Pix") | `/inscricao/pix` | ✅ |
| 4 · Endereço (ViaCEP real, GPS, geocodificação Nominatim → bairro → cidade, endereço do trabalho opcional) | `/inscricao/endereco` | ✅ |
| 5 · Situação da família (8 critérios S/N, pontuação determinística, entra etapa de documentos sozinha) | `/inscricao/prioridade` | ✅ |
| 6 · Documentos (foto → pré-análise simulada: pré-aprovado / conferir / ilegível + campos lidos) | `/inscricao/documentos` | ✅ |
| 7 · Creches (mapa OSM com demanda por cor, casa/trabalho/GPS/bairro, lista por distância, até 5 ordenáveis, consentimento de realocação; desktop em 2 colunas) | `/inscricao/unidades` | ✅ |
| 8 · Revisão e envio (edição por bloco, declaração) | `/inscricao/revisao` | ✅ |
| Confirmação (código, copiar, WhatsApp, lembrete .ics) | `/inscricao/confirmacao/:codigo` | ✅ |
| Acompanhar (posição por creche, "por que esta posição?", histórico, convocação com Pix/WhatsApp/e-mail, aceitar/recusar com prazo; exemplos `DEMO-2027-FILA` e `DEMO-2027-VAGA`) | `/acompanhar[/:codigo]` | ✅ |

Verificado por script (Playwright + Chromium) percorrendo o fluxo inteiro em 390×844 e as telas-chave em 1366×860: sem erros de console, sem transbordo horizontal. Rascunho persiste no `localStorage`; inscrições enviadas ficam num repositório local até o backend existir.

**Recoloração do Pulso da Rede** (`hkt_claude_educacao/frontend`): rampa terracota → rampa azul (`#8aa6c8 / #13335a / #0a1e37`), acento petróleo → `#13335a`, lavagens quentes → azuis, `--destructive` e `--warning` com cores semânticas próprias. 30 substituições em `theme.css`, `legacy.css`, `DemoBar.tsx`, `Recomposicao.tsx`; build ok. Não commitado.

**Fora do escopo desta rodada**: backend/BigQuery (contratos listados no README do app), dados reais de unidades (servidor Data.Rio respondeu 502 durante todo o evento — gerador sintético dentro do limite IBGE no lugar), Pix real e OTP real.
