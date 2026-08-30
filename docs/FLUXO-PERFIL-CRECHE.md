# Perfil Creche — fluxo da tela do diretor

Role `creche`. Uma tela, duas abas. Especificação de implementação: cada
controle, cada ação, cada botão, cada dado.

Design herda o que já está feito na role de inscrição (`styles.css`: rampa de
atenção `--a1 → --a3` só para dado, acento petróleo `--accent` só para ação e
foco).

**Sem IA nesta tela.** As mensagens saem de modelos prontos e editáveis,
preenchidos com os dados daquela criança. Nada é gerado por modelo.

---

## Quem usa

O diretor da creche. É o usuário mais sobrecarregado do processo — a própria SME
diz que ele cuida de todos os processos administrativos e pedagógicos da unidade
*e ainda* precisa conduzir a convocação. A tela existe para tirar trabalho dele,
não para dar um painel a mais.

Ele tem dois trabalhos, e são os únicos dois que a tela faz:

1. **Validar** o que a família declarou na inscrição.
2. **Falar** com a família antes do prazo acabar.

Sem drill-down, sem mapa, sem panorama gerencial. Ele entra direto na unidade
dele.

---

## Entrada

`/creche` → carrega a unidade do diretor.

No dia do evento, sem login: um seletor de unidade no topo, com busca por nome ou
designação. Fora do evento, a unidade vem do usuário autenticado.

---

## Cabeçalho — fixo nas duas abas

**Linha 1 — identificação**
Nome da creche · designação · CRE · endereço.

**Linha 2 — três números**

| número | cálculo | fonte |
|---|---|---|
| Na fila | crianças distintas com `situacao = 'Lista de espera'` na unidade | Query A |
| Aguardando validação | inscrições com pelo menos um critério declarado e não confirmado | `pontos` |
| Vagas abertas | vagas do par menos confirmados | `par_oferta` |

> Contar **criança distinta**, nunca linha. Uma criança ocupa até cinco filas.

**Linha 3 — filtros**

| controle | opções | efeito |
|---|---|---|
| Processo | 2021 · 2022 · 2023 · 2024 · **2025** | refiltra as duas abas |
| Grupamento | **Todos** · Berçário · Maternal I · Maternal II | refiltra as duas abas |
| Turno | **Todos** · Integral · Parcial | refiltra as duas abas |

**Abas:** `Validação` · `Convocação`. Validação abre por padrão.

---

# Aba 1 — Validação

**Job:** conferir critério por critério, criança por criança.

## Regra central

**O diretor confirma tudo.** Todo critério declarado por toda família aparece na
lista e exige a ação dele. O sistema não confirma nada sozinho e não sugere
confirmação em lote.

O que o sistema faz é **entregar a evidência pronta** para a decisão ser rápida:
diz de onde vem a informação, ou avisa que não tem nenhuma e o documento é
necessário.

Isso é decisão de produto, não limitação: a validação é ato administrativo com
efeito na posição da fila, e a fila é acompanhada por órgão regulador. Quem
responde por ela é a direção da unidade.

## Lista de inscritos

Ordenada por pontuação declarada, decrescente. Uma linha por criança.

| coluna | conteúdo | fonte |
|---|---|---|
| Posição | ordem na fila do par | derivada |
| Criança | `aluno_anon` · idade em meses · sexo | Query A |
| Grupamento · turno | Berçário · Integral | Query A |
| Opção | 1ª a 5ª — qual posição esta unidade ocupa na preferência | Query A `opcao` |
| Declarada | soma dos pontos das respostas `Sim` | Query B × Query C |
| Confirmada | soma dos pontos já confirmados | `validacao` |
| Critérios | `2 de 5 confirmados` + barra de progresso | derivada |
| Ação | `Abrir` | — |

**Filtro rápido acima da lista**, três chips:
`Todos` · `Com pendência` · `Tudo confirmado`.

Ordenação alternativa por clique no cabeçalho: posição, pontuação, opção.

> A coluna **Opção** existe por um motivo: uma criança que colocou esta creche
> como 5ª opção tem probabilidade muito menor de comparecer do que quem a colocou
> como 1ª. Em 2025, 72% das confirmações da rede saíram da 1ª opção. O diretor
> merece essa informação antes de gastar três dias de convocação.

## Painel de detalhe — abre ao clicar `Abrir`

Painel lateral direito, sem trocar de página. Fecha com `Esc` ou `×`.

**Topo:** `aluno_anon` · nascimento (ano-mês) · idade em meses · sexo ·
bairro e CEP do responsável · data da inscrição · posição na fila.

**Corpo: uma linha por critério declarado.**

Cada critério mostra:

| campo | conteúdo |
|---|---|
| Pergunta | texto integral, na redação **daquele ano** (Query C) |
| Pontos | quanto vale na régua do processo |
| Resposta | `Sim` declarado pela família |
| Evidência | ver tabela abaixo |
| Estado | `pendente` · `confirmado` · `recusado` |
| Ações | `Confirmar` · `Recusar` |

## Tipos de evidência

O sistema classifica cada critério em um dos três, e mostra o texto da evidência
junto:

| tipo | pílula | o que o sistema mostra | o diretor ainda precisa |
|---|---|---|---|
| Base municipal | `RMI` | *"CadÚnico ativo, retorno do Data Lake em 12/01/2026"* | confirmar |
| Base da inscrição | `comprovável` | *"esteve em Lista de espera na EDI Clarice Lispector em 2024 e não foi atendida"* | confirmar |
| Sem evidência | `documento` | *"nenhum registro na base — exige comprovação física"* | ver o documento e confirmar |

> **CadÚnico, Bolsa Família e Pequenos Cariocas** já são validados
> automaticamente pelo Data Lake da Prefeitura via Registro Municipal Integrado.
> Eles aparecem com a pílula `RMI` e a data do retorno — **e ainda assim passam
> pela confirmação do diretor**, porque é ele quem responde pela pontuação.

### Critérios comprováveis pela própria base da inscrição

| critério | como o sistema verifica | volume 2025 |
|---|---|---|
| Aguardou na fila no ano anterior (`perg_id 27`) | `aluno_anon` com `Lista de espera` no processo anterior e sem `Confirmado` | 5.605 declararam e não foram confirmadas · 2.255 responderam "não" tendo direito |
| Irmão matriculado na rede (`perg_id 29`) | `responsavel_anon` com outra criança `Confirmado` | a apurar |

## Ação `Confirmar` — passo a passo

1. Clique em `Confirmar` na linha do critério.
2. Modal curto: pergunta, pontos, evidência, e campo opcional de observação.
3. Botões: `Confirmar critério` · `Cancelar`.
4. Grava em `validacao`: inscrição, critério, `confirmado`, autor, horário,
   observação.
5. A linha vira `confirmado`, a pontuação confirmada sobe, a posição na fila é
   recalculada e a barra de progresso do cabeçalho avança.
6. Toast: `Critério confirmado. Posição recalculada.`

## Ação `Recusar` — passo a passo

1. Clique em `Recusar`.
2. Modal **exige motivo**, escolhido de uma lista: `documento não apresentado` ·
   `documento inválido` · `não compareceu no prazo` · `outro` (abre campo livre).
3. Botões: `Recusar critério` · `Cancelar`.
4. Grava em `validacao` com `recusado`, motivo, autor, horário.
5. A linha vira `recusado` e o critério não entra na pontuação.

> Recusa sem motivo registrado não existe. É o que permite a família contestar e
> a CRE auditar.

## Ação `Desfazer`

Disponível por 15 minutos após confirmar ou recusar, no próprio painel.
Grava um novo registro em `validacao` com o estado anterior — nunca apaga o
anterior. O histórico é append-only.

## Ação `Cobrar documento`

Disponível quando o critério é do tipo `documento` e está pendente.
Leva direto ao painel de mensagem (aba 2) com o modelo **M4 — Pendência de
documento** já selecionado para aquela criança.

## Rodapé da aba

Contador: `38 de 765 inscritos com pendência` · botão `Exportar CSV`.

## Dados da aba 1

`inscricao`, `pontos`, `evidencia`, `validacao`.

---

# Aba 2 — Convocação

**Job:** falar com a família antes do prazo acabar. Sem kanban, sem funil.
**Uma lista.**

## Faixa de situação

Uma linha acima da lista:
`3 vagas abertas · 2 famílias sem resposta há 2 dias · 1 prazo vence hoje`.

## Lista de chamadas

Uma linha por criança convocada, ordenada por **tempo restante crescente**.
Quem está prestes a perder a vaga fica no topo. Sempre.

| coluna | conteúdo |
|---|---|
| Prazo | `1d 4h` · tarja lateral: neutra no dia 1, `--a2` no dia 2, `--a3` no dia 3 |
| Criança | `aluno_anon` · grupamento · turno · qual opção esta unidade era |
| Contato | telefone mascarado · idade do dado (`214d desde a inscrição`) |
| Situação | `a chamar` · `tentando` · `falei` · `sem contato` · `agendado` |
| Tentativas | `2 de 3` · ícones dos canais já usados |
| Ação | `Mensagem` |

**Filtro rápido:** `Todas` · `Sem resposta` · `Vence hoje`.

> **Contato frio.** A SME descreve a causa raiz: a classificação roda em janeiro
> e a convocação acontece em fevereiro ou março, quando o telefone já mudou. A
> coluna de idade do dado deixa isso visível antes de o diretor gastar os três
> dias descobrindo.

## Ação `Mensagem` — passo a passo

1. Clique em `Mensagem` → abre painel lateral direito.
2. **Seletor de modelo** no topo: lista dos modelos aplicáveis àquele caso, com o
   recomendado já selecionado. A recomendação vem da situação da linha, por regra
   fixa — não é inferência.
3. **Seletor de canal:** `WhatsApp` · `SMS` · `Ligação`. Cada canal tem sua
   própria versão do texto.
4. O texto aparece **já preenchido** com os dados daquela criança. As variáveis
   substituídas ficam destacadas, para o diretor conferir de relance.
5. O texto é **editável** ali mesmo. Botão `Restaurar modelo` desfaz a edição.
6. Botão `Disparar`.
7. Grava tentativa em `chamada`: modelo usado, canal, texto final, horário, autor.
8. O painel troca para **registro de desfecho** (abaixo).

## O que `Disparar` faz, por canal

| canal | comportamento | limite |
|---|---|---|
| SMS | envio direto pelo backend | precisa de provedor configurado |
| E-mail | envio direto pelo backend | precisa de SMTP configurado |
| WhatsApp | abre `wa.me/<numero>?text=<texto>` em nova aba | o envio acontece no aplicativo — sem a WhatsApp Business API não há envio direto |
| Ligação | não dispara nada: mostra o roteiro para o diretor ler ao telefone | — |

> Isso é limitação de plataforma, não escolha de design. Não prometer envio
> automático de WhatsApp na demo.

## Registro de desfecho — obrigatório

Depois de disparar, a linha fica marcada como `aguardando desfecho` e o painel
mostra três botões:

| botão | efeito |
|---|---|
| `Falei com a família` | abre campo de data prevista de comparecimento → situação `agendado`, para o alarme |
| `Não atendeu` | incrementa tentativa, mantém o relógio, sugere outro canal na próxima |
| `Número errado` | abre campo de **novo telefone**, grava, marca `sem contato` |

**Sem desfecho registrado, a tentativa não conta** e a linha continua sinalizada.
Contar disparo mede esforço; contar desfecho mede contato.

### Por que `Número errado` é o botão mais importante da tela

A SME nomeia o problema: *"o diretor tem no caderninho um contato novo dele (…)
como não conseguimos editar esses dados adequadamente, perdemos algumas vagas
dessa forma."* Este botão é o caderninho virando sistema.

Ele também é o dado que sobe para a Secretaria: microárea com muito `número
errado` tem problema de cadastro, não demanda reprimida — e as duas pedem
decisões opostas.

## Ação `Estender prazo`

Disponível apenas no dia 3.

1. Modal **exige justificativa** — a resolução da SME permite a extensão só
   mediante justificativa apresentada dentro do prazo original.
2. Adiciona **1 dia útil**, uma única vez.
3. Grava autor, horário e justificativa.
4. A tarja da linha volta para `--a2`.

## Ação `Registrar comparecimento`

Disponível quando a situação é `agendado` ou `falei`.
Dois botões no painel: `Compareceu e matriculou` · `Não compareceu`.
Fecha a chamada e libera a vaga para o próximo, se `não compareceu`.

## Dados da aba 2

`chamada` (estado próprio), `inscricao`, `par_oferta`, `contato`.

---

# Modelos de mensagem

Ficam em `data/modelos-mensagem.yml`, versionado. Editáveis sem deploy.

## Variáveis disponíveis

| variável | origem |
|---|---|
| `{{crianca}}` | `aluno_anon` ou nome, quando houver |
| `{{unidade}}` | nome da creche |
| `{{endereco}}` | logradouro e número da unidade |
| `{{grupamento}}` | Berçário · Maternal I · Maternal II |
| `{{turno}}` | Integral · Parcial |
| `{{prazo}}` | data e hora limite, por extenso |
| `{{dias_restantes}}` | inteiro |
| `{{documentos}}` | lista de documentos da matrícula |
| `{{documento_pendente}}` | nome do documento do critério em aberto |
| `{{telefone_unidade}}` | contato da creche |

## Variáveis proibidas

**Nenhuma mensagem carrega pontuação, posição na fila ou critério de
vulnerabilidade.** O canal é aberto e o telefone pode não ser o da mãe. Critério
de vulnerabilidade é dado sensível sobre uma criança.

A mensagem fala de **vaga, prazo, endereço e documento**. O critério fica no
sistema, onde há controle de acesso.

## Catálogo

### M1 — Convocação inicial
*Quando:* vaga aberta, primeira tentativa. **Recomendado por padrão em `a chamar`.**

**WhatsApp**
> Olá! Aqui é a {{unidade}}. Surgiu uma vaga de {{grupamento}} em turno
> {{turno}} para {{crianca}}. Para garantir a vaga, compareça até {{prazo}} na
> {{endereco}}, levando {{documentos}}. Se não puder vir nesse prazo, responda
> esta mensagem. Dúvidas: {{telefone_unidade}}.

**SMS** *(160 caracteres)*
> {{unidade}}: vaga de {{grupamento}} {{turno}} disponivel. Compareca ate
> {{prazo}} na {{endereco}} com documentos. Info: {{telefone_unidade}}

**Ligação** *(roteiro)*
> Bom dia, falo com o responsável por {{crianca}}? Aqui é da {{unidade}}. Abriu
> uma vaga de {{grupamento}} no turno {{turno}}. O senhor precisa comparecer até
> {{prazo}}, no endereço {{endereco}}, trazendo {{documentos}}. Consegue vir
> nesse prazo? *(anotar a resposta e registrar o desfecho na tela)*

---

### M2 — Lembrete de prazo
*Quando:* dia 2, sem resposta. **Recomendado por padrão em `tentando`.**

**WhatsApp**
> Olá! A {{unidade}} tentou contato sobre a vaga de {{grupamento}} {{turno}}
> para {{crianca}}. Faltam {{dias_restantes}} dia(s): o prazo termina em
> {{prazo}}. Se você ainda tem interesse, responda ou ligue para
> {{telefone_unidade}}.

**SMS**
> {{unidade}}: faltam {{dias_restantes}} dia(s) para garantir a vaga de
> {{crianca}}. Prazo {{prazo}}. Ligue {{telefone_unidade}}

---

### M3 — Última chamada
*Quando:* dia 3. **Recomendado por padrão quando restam menos de 24 h.**

**WhatsApp**
> {{unidade}}: hoje é o último dia para confirmar a vaga de {{grupamento}}
> {{turno}} de {{crianca}}. O prazo termina em {{prazo}}. Se não houver
> comparecimento, a vaga será oferecida à próxima família da lista. Se houver um
> impedimento, entre em contato agora: {{telefone_unidade}}.

---

### M4 — Pendência de documento
*Quando:* critério declarado sem comprovação, antes da classificação.
Acionado pelo botão `Cobrar documento` da aba 1.

**WhatsApp**
> Olá! Aqui é a {{unidade}}. Na inscrição de {{crianca}} consta uma informação
> que precisa de comprovação. Para não perder pontuação na classificação,
> compareça na {{endereco}} levando {{documento_pendente}}. Dúvidas:
> {{telefone_unidade}}.

---

### M5 — Confirmação de agendamento
*Quando:* a família confirmou que vem. Disparo opcional após `Falei com a família`.

**WhatsApp**
> Combinado! Esperamos {{crianca}} na {{unidade}}, {{endereco}}, até {{prazo}}.
> Lembre de trazer {{documentos}}.

---

### M6 — Encerramento por prazo
*Quando:* prazo esgotado sem comparecimento. **Disparo manual, nunca automático.**

**WhatsApp**
> {{unidade}}: o prazo para confirmar a vaga de {{crianca}} terminou em
> {{prazo}} e a vaga foi oferecida à próxima família. A inscrição continua ativa
> nas demais unidades escolhidas. Dúvidas: {{telefone_unidade}}.

> Este modelo nunca dispara sozinho. Perder a vaga é o momento mais sensível do
> processo e exige decisão humana explícita.

---

# Tabelas

| tabela | grão | origem | observação |
|---|---|---|---|
| `inscricao` | `(prm_id, plm_id, ipl_id)` | Query A | uma por criança por processo |
| `pontos` | inscrição × critério | Query B × Query C | régua muda todo ano — juntar por `ich_perg_id` |
| `evidencia` | inscrição × critério | Query A histórica + retorno RMI | texto pronto para o painel |
| `validacao` | inscrição × critério × evento | **estado próprio** | append-only: autor, horário, estado, motivo |
| `chamada` | inscrição × tentativa | **estado próprio** | modelo, canal, texto, desfecho, autor, horário |
| `contato` | inscrição | **estado próprio** | telefone atual e histórico de correções |
| `par_oferta` | unidade × grupamento × turno | Query A | inscritos, espera, confirmados, vagas |

`validacao`, `chamada` e `contato` não existem no extrato da SME porque não
existem no processo deles. São o produto.

---

# Endpoints

| método | rota | usado por |
|---|---|---|
| `GET` | `/api/v1/unidades/{cod}` | cabeçalho |
| `GET` | `/api/v1/unidades/{cod}/inscritos?ano&grupamento&turno&pendencia` | aba 1, lista |
| `GET` | `/api/v1/inscricoes/{id}/criterios` | aba 1, painel de detalhe |
| `POST` | `/api/v1/validacao` | `Confirmar` · `Recusar` · `Desfazer` |
| `GET` | `/api/v1/unidades/{cod}/chamadas?ano&grupamento&turno` | aba 2, lista |
| `GET` | `/api/v1/modelos?caso&canal` | seletor de modelo |
| `POST` | `/api/v1/chamadas/{id}/mensagem` | preenche o modelo e registra o disparo |
| `POST` | `/api/v1/chamadas/{id}/desfecho` | falei · não atendeu · número errado |
| `POST` | `/api/v1/chamadas/{id}/prazo` | estender 1 dia útil |
| `PATCH` | `/api/v1/inscricoes/{id}/contato` | novo telefone |

Toda resposta carrega `provenance` e `limitations`, pelo contrato de
`app/contracts/`.

---

# Regras transversais

**Nenhuma IA nesta tela.** Modelo com variável, preenchido por código. O que
parece automático é substituição de string, e isso é uma vantagem: é auditável,
reproduzível e o diretor entende exatamente o que vai sair.

**Todo ato administrativo tem autor e horário.** Confirmar, recusar, disparar,
estender prazo, corrigir telefone. Nada é anônimo, nada é apagado — `validacao` e
`chamada` são append-only.

**Números são determinísticos.** Pontuação, posição na fila e contagem de vaga
saem de SQL. Nenhum número da tela vem de modelo.

**Ausência de dado não é zero.** Sem leitura, `--void`. Cobertura abaixo do
limiar bloqueia o número em vez de mostrar um fraco.

---

# Aberto

1. **A base anonimizada não tem telefone nem nome.** Toda a aba 2 depende de
   contato semeado. Recomendação: `aluno_anon` como identificador e telefone
   mascarado, declarado na própria tela — reforça a história de privacidade em
   vez de esconder o buraco.
2. **"Vagas abertas" precisa de uma definição de vaga.** Não existe explícita na
   base. Proxy recomendado hoje: vaga = `Confirmado` do par no processo. A
   alternativa é cruzar `totalalunoscreche20NN.xlsx`. A tela declara qual está
   em uso.
3. **Provedor de SMS e SMTP.** Sem eles, só o WhatsApp por `wa.me` e o roteiro de
   ligação funcionam na demo.
4. **A recusa de critério muda a posição na fila.** Confirmar se a direção da
   unidade tem essa alçada sozinha ou se precisa de referendo da CRE.

---

# Decisões de implementação (30/08/2026, tarde)

Ajustes acordados após a crítica, que prevalecem sobre o texto acima. Implementado em
`frontend/src/screens/creche/` (mesmo estilo e componentes do app da família: Tailwind v4,
tokens em `styles/theme.css`, coss ui).

1. **Quarta evidência: `pre_analise`.** A família já envia a foto do documento pelo app e a IA
   faz a pré-análise (`DocumentoAnalise`: pré-aprovado / conferir / ilegível + campos lidos). O
   diretor vê a pílula "foto no app", o texto e os campos lidos — e continua confirmando. A IA
   é insumo de evidência, nunca confirma nem pontua.
2. **Um processo de convocação só.** O aviso automático (app + Pix + WhatsApp + e-mail) é a
   tentativa 0. A lista mostra a **resposta no app** (aceitou / recusou / sem resposta) e os
   canais já usados; Pix aparece como canal verificado. M1 vira *reforço* para quem não
   respondeu; a chamada manual entra só nesses casos.
3. **Confirmar em 1 clique** quando a evidência é RMI ou pré-análise aprovada (desfazer por
   15 min cobre o erro); diálogo "Vi o documento original" só para evidência física ou
   pré-análise "conferir". **Recusar sempre exige motivo.** Log append-only com autor e horário.
4. **Ordenação padrão "Decide vaga"**: inscritos na borda do corte (±5 posições das vagas do
   par) primeiro; depois "Com pendência", "Tudo confirmado", "Todos".
5. **`aceitaRealocacao` ao lado da coluna Opção**; vagas abertas separadas em prioritárias e
   gerais.
6. **Contestação pela família**: cada confirmar/recusar/desfazer gera evento no histórico do
   acompanhamento da família, com o motivo; recusa remove os pontos e recalcula a posição.
7. **Sem filtro de processo/ano** no cabeçalho; sem exportar CSV nesta rodada.
8. **Mobile**: < 1024 px = cartões por criança e painéis em *drawer* inferior; ≥ 1024 px =
   tabela e painel lateral (*sheet*). Alvos ≥ 44 px.
9. **Vocabulário do produto**, não do extrato: `{{crianca}}` = primeiro nome; identificadores
   `RIO-XXXX-XXXX`. O extrato anonimizado (`aluno_anon`, `perg_id`) entra só como fonte de
   evidência quando o backend o expuser.
10. **M4 oferece o caminho do app** ("envie a foto pelo app ou traga o original").
11. **Referências visuais**: `styles.css`, acento petróleo e rampa `--a1→--a3` não existem mais;
    tarjas de prazo usam `--warn` / `--danger`; marca `#13335a` só para ação e foco.

## Dados de demonstração

- Inscritos e chamadas por unidade são gerados de forma determinística (semente
  `20260830`) e mesclados com as inscrições feitas no aparelho pelo app da família.
- Registros da direção (validações, tentativas, desfechos, telefones corrigidos,
  prorrogações, comparecimentos) ficam em `localStorage` (`creche-app:validacoes:v1`,
  `creche-app:chamadas:v1`), append-only.
- Vaga aberta = vagas ofertadas do par − matrículas confirmadas (proxy declarado na tela).

## Endpoints previstos em `src/api/client.ts` (fallback para mock enquanto o backend não expõe)

`GET /unidades?busca` · `GET /unidades/{id}/resumo` · `GET /unidades/{id}/inscritos` ·
`POST /validacao` · `GET /unidades/{id}/chamadas` · `GET /modelos` ·
`POST /chamadas/{id}/mensagem` · `POST /chamadas/{id}/desfecho` · `POST /chamadas/{id}/prazo` ·
`POST /chamadas/{id}/comparecimento`.
