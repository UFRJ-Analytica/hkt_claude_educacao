# Matrícula Carioca · Creche — protótipo mobile-first

App para o responsável inscrever a criança na creche pública do Rio pelo celular,
de ponta a ponta: dados → prioridade → documentos (pré-análise por IA) → escolha
de até 5 creches no mapa com demanda visível → código → acompanhamento e
convocação (aceitar/recusar) com aviso por Pix, WhatsApp e e-mail.

Hackathon Claude · 30/08/2026 · desafio "Inteligência na Inscrição de Creche" (SME-Rio).
Plano, crítica do fluxo atual e decisões: [`docs/plano_app_creche.md`](../../docs/plano_app_creche.md).

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173 (abra no celular pela rede: `--host` já está no script)
                   # `/` = portal no estilo matricula.rio · `/app` = início do app · `/creche` = painel da unidade (esboço)
npm run build      # tsc + vite build → dist/
npm run lint       # oxlint
```

`.env` controla a origem dos dados:

| `VITE_API_MODE` | Comportamento |
| --- | --- |
| `fixture` (padrão, também sem `.env`) | Não chama backend; unidades sintéticas, verificação e pré-análise simuladas |
| `auto` | Tenta `GET {VITE_API_BASE}/health`; se responder, usa o backend, senão cai para fixture |
| `live` | Só backend |

## Estrutura

```
src/
├── api/          contratos (types.ts) e cliente (client.ts) — cada função já sabe o endpoint do backend
├── domain/       regras puras: grupamento por idade, CPF/CEP, critérios e pontuação, demanda, passos e validação
├── mocks/        unidades sintéticas (semente fixa, dentro do limite IBGE do município), bairros, serviços simulados,
│                 repositório local de inscrições (localStorage) e inscrições de exemplo
├── store/        rascunho da inscrição (context + reducer), espelhado no localStorage a cada mudança
├── components/   ui/ = coss ui (vendorizado) · shell/ = casca mobile · comuns/ = campos, escolhas, avisos, notificação
└── screens/      Início, passos 1–8 do wizard, Confirmação, Acompanhar
```

Stack: React 19 · TypeScript · Vite 8 · Tailwind v4 (tokens em `styles/theme.css`, marca `#13335a`) ·
coss ui (Base UI) · react-router 7 · Leaflet/OSM · zod-free (validação em `domain/passos.ts`).

## Contratos que o backend (BigQuery) precisa servir

```
GET  /api/v1/unidades?lat&lon&grupamento&horario&bairro   → UnidadeProxima[]
GET  /api/v1/unidades/{id}                                 → Unidade
GET  /api/v1/cep/{cep}                                     → Partial<Endereco>
POST /api/v1/otp · /otp/verificar                          → { ok }
POST /api/v1/pix/verificar · /pix/confirmar                → { enviado } · { ok }
POST /api/v1/documentos/pre-analise (multipart)            → DocumentoAnalise   (Claude lê; nunca pontua)
POST /api/v1/inscricoes                                    → Inscricao
GET  /api/v1/inscricoes/{codigo}?cpf=                      → Inscricao (status, timeline, posição por opção)
POST /api/v1/inscricoes/{codigo}/convocacao {aceite}       → Inscricao
```

Tipos em `src/api/types.ts`. As tabelas do briefing (inscrições por opção, respostas
socioeconômicas, perguntas por processo, unidades escolares) alimentam exatamente esses campos.

## Guardrails que o protótipo já respeita

- **Pontuação determinística**: soma de pesos por critério (`domain/prioridade.ts`), versionada por
  processo. A IA só faz pré-análise de documento (legibilidade, tipo, consistência) — a validação
  final é da unidade, e a tela diz isso.
- **Classificação auditável**: "Por que esta posição?" mostra critérios, pesos e data da inscrição.
- **Ninguém perde prioridade por escolher errado** no modal inicial: as perguntas aparecem para
  todos e a etapa de documentos entra sozinha.
- **Rascunho nunca se perde**: cada passo é salvo no aparelho.
- **Pix como canal durável**: chave verificada por micro-Pix com código; convocação chega como
  notificação do banco mesmo se o telefone mudar. Consentimento explícito com finalidade (LGPD).

## Demonstração

- Fluxo completo: Início → "Inscrever criança". Os códigos de OTP e de Pix aparecem na
  "notificação simulada" da própria tela.
- Acompanhamento: `DEMO-2027-FILA` (na fila) e `DEMO-2027-VAGA` (convocada, com aceitar/recusar);
  botões "Simular convocação" / "Voltar para a fila" existem só na demo.
- As creches são **fictícias** (nomes e posições geradas); o servidor Data.Rio/SME estava fora
  durante o evento. Trocar `mocks/unidades.ts` pelo endpoint real não muda nenhuma tela.

## Parâmetros a confirmar com a SME

Data de corte etária (31/03) e tabela idade→grupamento; texto e pesos das perguntas do processo
vigente; regra de desempate e de processamento das 5 opções; operação de Pix de saída em escala.
