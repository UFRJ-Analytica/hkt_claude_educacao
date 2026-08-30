# Vaga Certa — estado do projeto

**Última atualização:** 30/08/2026, 10h45 — briefing + transcrição integrados.

Este é o documento de entrada. Se você é um agente que perdeu o contexto, ou uma
pessoa entrando agora, leia este arquivo inteiro antes de tocar em código.

> **O contexto do projeto mudou hoje às 8h30.** O desafio revelado não é gestão
> pedagógica da rede — é **inteligência no processo de Inscrição Creche**. Tudo
> que este documento dizia antes sobre frequência, desempenho, turmas,
> recomposição e Censo INEP está **obsoleto**. O que sobrevive é infraestrutura:
> o mapa, a casca, o contrato de proveniência. Ver §9.

---

## 1. O desafio, em uma frase

A SME-Rio tem **vagas ociosas em creche e fila de espera expressiva ao mesmo
tempo — às vezes no mesmo território**. A fila não é escassez global: é
descompasso entre oferta e demanda por território e turno, agravado por uma
mecânica de classificação que congela vagas. Três eixos:

1. **quantas vagas abrir e onde** (Eixo 1 — Planejamento);
2. **em que ordem chamar a fila** (Eixo 2 — Inscrição e Classificação);
3. **como garantir que a família chegue à vaga dentro do prazo** (Eixo 3 —
   Convocação).

Creche atende **0 a 3 anos e 11 meses** e **não é ensino obrigatório**. A partir
dos 4 anos a SME oferece vaga imediata. **Creche é o único segmento racionado da
educação infantil carioca** — por isso todo o aparato de pontuação e fila existe
só aqui. Rede: **~89 mil alunos, ~900 unidades**.

Fontes: [README do evento](https://github.com/taicor-ai/claude-impact-lab-rio-2),
[briefing](https://docs.google.com/document/d/1jZenYEKR2hJOVrxLXWM0xjxmoiohAqEl/edit),
apresentação e **transcrição do briefing** (Coordenadoria de Inovação e
Tecnologia da SME, gerência de Sistemas e Dados),
[`dadoscreche`](https://github.com/CIT-SME-RJ/dadoscreche/).

### O relógio

| horário | marco |
|---|---|
| 08h30 | briefing (feito) |
| **16h30** | **prazo de entrega no GitHub** — e-mail para eventos@taicor.ai com nº do grupo |
| 17h30 | 5 finalistas, 6 minutos cada, corte duro no tempo |
| 18h30 | premiação |

Restam ~6h de construção. Esse é o orçamento real e ele dita o escopo em §8.

### O que decide a nota

Nota = (Impacto Real × 8) + (Produto × 4) + (Engenharia × 4) + (Ideia × 2) +
(Apresentação × 2), cada critério de 1 a 5.

**Impacto Real vale 40 de 100** e a pergunta é literal: *"a prefeitura usaria isso
hoje?"*. Nota 5 é "pronto para usar como está". Isso empurra o projeto para **uma
ferramenta que um servidor de CRE opera na segunda-feira**, não para um modelo
preditivo bonito. Produto (20) exige que servidor não técnico opere sem treino.
Engenharia (20) premia auditabilidade e robustez a dado sujo.

---

## 2. Regra 1 do evento — risco aberto que precisa de decisão humana

> *"O projeto começa no evento. O primeiro commit deve ser feito após as 09h00 do
> dia 30/08. Projetos com evidências de desenvolvimento anterior serão
> desclassificados. Bibliotecas, frameworks e APIs preexistentes podem ser
> usados; a lógica do projeto deve ser construída no dia."*

Este repositório tem commits em 26/08 e 29/08:

```
b1336d7 2026-08-30 09:36:57  feat: componentiza o frontend sobre Tailwind v4 + coss ui
4fe3df2 2026-08-29 21:21:14  feat: Adiciona dados oficiais do INEP
1617af9 2026-08-29 12:09:41  feat: implementa frontend React e consolida etapa de dados
18fc90b 2026-08-26 16:08:00  docs: establish Pulso da Rede architecture and research baseline
```

**Entregar este repositório como está é risco de desclassificação.** A decisão é
do time, não do agente:

| opção | o que é | risco |
|---|---|---|
| **A — repo novo (recomendada)** | repositório público novo, primeiro commit hoje após 09h; portar só o que se defende como *biblioteca* (kit de UI, casca, adaptador DuckDB); escrever hoje toda a lógica de creche | baixo |
| B — entregar este repo | histórico anterior visível | alto |
| C — repo novo com squash | histórico some, mas o código de 29/08 continua sendo lógica de projeto | médio-alto |

Sob a opção A, a fronteira defensável é: **primitivos genéricos de interface e
scaffolding = biblioteca; qualquer coisa que saiba o que é fila, vaga,
grupamento, pontuação ou CRE = escrita hoje.** O mapa fica no limite — a projeção
e o gesto de pan/zoom são genéricos, o que ele desenha não é. Ver §9.

**Ação pendente:** o time escolhe A, B ou C antes de qualquer commit.

---

## 3. Como o processo funciona de verdade

Da transcrição do briefing. **Esta seção é a mais importante do documento** — ela
descreve a mecânica real, e é dela que sai o produto.

### 3.1 O fluxo

1. Responsável se inscreve no **matricula.rio** (celular, majoritariamente). CPF
   obrigatório, **validado pela Receita Federal**. **Uma inscrição ativa por
   CPF.** Escolhe de **1 a 5 unidades**, pesquisando por bairro; o site só mostra
   unidades compatíveis com a idade da criança.
2. **No dia seguinte**, o responsável leva documentação física a **uma das
   unidades escolhidas** para comprovar vulnerabilidade. **A direção da unidade
   confirma manualmente no sistema.**
3. Em paralelo, a SME roda **validação automática** pelo **Data Lake da
   Prefeitura**, integrando com o **Registro Municipal Integrado** (>12 milhões
   de registros; Assistência Social, Educação, Saúde), pelo CPF, para confirmar
   **CadÚnico, Bolsa Família e Pequenos Cariocas**. Esses dados **voltam para o
   sistema de Inscrição Creche** e validam a pontuação.
4. Classificação roda em **data publicada em Diário Oficial**. Resultado no site.
5. Convocação **durante todo o ano**, conduzida pelo diretor da unidade.
6. Família tem **3 dias** para comparecer com documentos (identidade, CPF,
   caderneta de vacinação), com **no máximo 1 dia de extensão** em situação
   atípica.

### 3.2 O defeito estrutural, nas palavras da SME

> *"No primeiro sistema eu tenho uma inscrição por CPF. Quando essa inscrição vai
> para o módulo Inscrição Creche, ela pode se multiplicar por até cinco. Nossa
> base anual de aproximadamente 45 mil inscritos normalmente se transforma em
> mais de 100 mil registros. Porque fazemos uma classificação por opção. Essa é
> uma informação muito importante: **a lógica atual é classificação por opção,
> considerando até cinco opções para cada CPF**."*

E a consequência, também nas palavras deles:

> *"Podemos chegar a oferecer até cinco vagas para a mesma criança. Mas essa
> criança vai escolher apenas uma. **As outras quatro vagas ficam aguardando
> esses três dias.** Depois, chama-se o próximo da fila. Mas se o próximo estiver
> na mesma condição, temos novamente outro período de três dias. (…) **Às vezes
> podemos levar mais de uma semana para conseguir colocar uma criança em uma
> vaga** (…) enquanto isso **existe uma vaga ociosa e nenhuma criança sendo
> atendida nela**."*

**Medi essa inflação no dado real** (§5.2): a fila de 2025 tem **16.345 posições
publicadas para apenas 7.851 crianças — fator 2,08×**, e **796 crianças ocupam 5
posições cada**. O diretor que olha uma fila de 100 não tem 100 crianças; tem
~48. E gasta 3 dias por chamada para descobrir isso.

### 3.3 A armadilha da recusa

> *"Se oferecemos aquela vaga e ele não aceita, ele pode sair das demais filas de
> espera porque já houve um oferecimento de vaga. Isso pode fazer com que esse
> responsável tenha que voltar a se inscrever."*

Recusar uma vaga inviável custa **todas** as outras posições. A família racional
aceita uma vaga que não vai usar, ou some. Isso alimenta o cancelamento e o
abandono de §5.5.

### 3.4 O gargalo da convocação: o contato morreu

> *"O telefone não se atualiza, o WhatsApp não se atualiza (…) a partir do
> momento em que rodamos uma classificação em janeiro, às vezes em fevereiro ou
> março aquele responsável já trocou de contato (…) essa criança pode perder a
> vaga porque a família não foi localizada."*
>
> *"O diretor precisa se lembrar: 'esse responsável veio aqui, eu tenho no meu
> caderninho um contato novo dele'. **Como não conseguimos editar esses dados
> adequadamente, perdemos algumas vagas dessa forma**."*

O problema nº 1 da convocação **não é o algoritmo, é o número de telefone**. E há
um caderno de papel no meio do fluxo.

### 3.5 A restrição jurídica

> *"Temos órgãos reguladores que acompanham essa fila e as bases de dados. Então
> sempre seguimos a ordem."*

Qualquer proposta que **quebre a ordem de prioridade é inviável**, por mais
eficiente que seja. Isso elimina "otimização global de bem-estar" e favorece
mecanismos que **provadamente respeitam a prioridade** — ver §7.

### 3.6 O planejamento

Três níveis: **nível central** (define métricas e dados, tem site próprio de
Planejamento de Matrícula, começa em setembro para o ano seguinte) → **11
Coordenadorias Regionais** → **microáreas** (clusters de unidades com relação
territorial, base do Instituto Pereira Passos). Âncora atual: **demanda histórica
do ano anterior**, alunos ativos e alunos que saíram. A pergunta deles é literal:
*"Será que conseguimos antecipar algum dado que hoje não estamos olhando?"*

---

## 4. Os dados

Tudo em [`CIT-SME-RJ/dadoscreche`](https://github.com/CIT-SME-RJ/dadoscreche/),
clonável sem autenticação. Separador `;`, UTF-8 **com BOM**.

### 4.1 As quatro bases da inscrição

| arquivo | linhas | grão |
|---|---:|---|
| `01_QueryA_InscricoesPorAno.csv.gz` | 837.179 | uma **opção de creche escolhida** |
| `02_QueryB_RespostasSocioEconomicas.csv.gz` | 4.357.119 | uma **pergunta respondida** |
| `03_QueryC_PerguntasComDescricao.csv` | 65 | uma pergunta por processo/ano |
| `04_UnidadesEscolaresComEndereco.csv` | 2.188 | uma unidade escolar |

Chaves: `(prm_id, plm_id, ipl_id)` liga A↔B. `ich_perg_id` liga B↔C (**muda a cada
ano**); `perg_id` é a chave estável entre anos. `unidade` (A) ↔ coluna 1 de D.
Cobertura: 2021–2025 (processos 179, 181, 184, 194, 195). O processo vigente
(2026) **não** está incluído.

### 4.2 As bases complementares

| arquivo | conteúdo | por que importa |
|---|---|---|
| `OferecimentosEvagas/Unidades_Unificadas_com_Localizacao.xlsx` | 1.941 unidades com **CRE, microárea, bairro, latitude, longitude, tipo** | **é o que faz o mapa existir** |
| `OferecimentosEvagas/totalalunoscreche20NN.xlsx` | alunos e turmas por unidade × grupamento × turno | lado da **oferta/ocupação** |
| `OferecimentosEvagas/Parceiras20NN.xlsx` | monitoramento mensal das conveniadas | oferta da rede parceira |
| `Microáreas_SME_revisãoIPP/*.shp` | shapefile das microáreas SME/IPP | **o recorte territorial que a CRE realmente usa** |
| `NascidosvivosRJ.xlsx` | nascidos vivos no município | demanda potencial futura |

**Verificado:** o código de unidade da Query A casa com `DESIGNACAO` do xlsx de
localização **depois de remover zeros à esquerda** (`ltrim(unidade,'0')`).
Cobertura: **852 de 872 unidades (97,7%) ganham latitude/longitude.** Sem essa
normalização o casamento cai para 150/872 — a primeira armadilha do dia.

### 4.3 Armadilhas confirmadas

- `04_UnidadesEscolaresComEndereco.csv` **não tem cabeçalho**. Ler com
  `header=False`, senão a primeira unidade some.
- O valor gravado é `Cancelado na confirmacao` — **sem cedilha e sem til**.
  Filtrar com acento devolve zero linhas.
- `pergunta_legenda` é **nula em 100%** das linhas em B e C. Usar `pergunta_texto`.
- A Query B tem 4,36 milhões de linhas e **não abre no Excel** (teto de
  1.048.576). Usar DuckDB — `read_csv_auto(..., delim=';')` lê o `.gz` direto,
  sem descompactar e sem carregar tudo em memória.
- `duckdb` já está no venv do backend. **Não há pandas, numpy nem geopandas** —
  `.df()` quebra com `'numpy' is required`. Usar `.fetchall()` ou SQL puro.
- A régua de pontuação **muda todo ano**. Comparar posição entre anos sem
  normalizar produz série temporal falsa (§5.4).
- **Pequenos Cariocas** é critério vigente segundo a transcrição, mas **não
  aparece na Query C de 2025**. Provavelmente entrou em 2026, fora do extrato.

### 4.4 O aviso de anonimização — e o que ele significa para o pitch

O repositório é explícito: *"indicadores gerados a partir dos dados **NÃO**
representam a realidade"*. O que **não** é confiável: números absolutos, endereço
exato, identidade, data exata de nascimento. O que **está preservado**, e a
transcrição confirma: a **sequência do processo**, a **lógica da pontuação**, as
**relações entre as quatro tabelas** e a **dinâmica real de transição de
estados**.

**Consequência estratégica:** o entregável não é um relatório com números. É um
**motor determinístico que a SME roda sobre o dado dela**, demonstrado sobre o
extrato anonimizado. Todo número na tela carrega origem, data de referência e a
faixa de anonimização — a mesma disciplina de proveniência que este projeto já
tinha, agora com motivo muito mais concreto.

---

## 5. O que o dado sustenta — análise feita hoje

Calculado em DuckDB sobre o extrato anonimizado, em 30/08/2026. Consultas
reproduzíveis em §12. **Ler como ordem de grandeza e como estrutura, nunca como
estatística oficial** (§4.4).

### 5.1 O funil, por criança

| ano | crianças | confirmadas | % | só lista de espera |
|---|---:|---:|---:|---:|
| 2021 | 57.690 | 29.113 | 50,5% | 22.565 |
| 2022 | 57.820 | 34.795 | 60,2% | 14.776 |
| 2023 | 45.918 | 28.199 | 61,4% | 12.493 |
| 2024 | 71.757 | 50.954 | 71,0% | 13.163 |
| 2025 | 62.899 | 48.680 | 77,4% | 7.834 |

A rede melhorou muito — **de 50,5% para 77,4% em cinco anos**. Reconhecer isso no
pitch é obrigatório: chegar dizendo "está tudo quebrado" para quem subiu 27
pontos percentuais é a forma mais rápida de perder o júri. O produto ataca o
resíduo, e o resíduo tem nome e endereço.

Em 2025, **72% das confirmações saem da 1ª opção** (35.144 de 48.688). A
preferência declarada é forte e é atendida na maioria dos casos.

### 5.2 A fila publicada é o dobro da fila real

Confirmação quantitativa de §3.2. Linhas em `Lista de espera` contra crianças
distintas:

| ano | posições na fila | crianças reais | inflação |
|---|---:|---:|---:|
| 2021 | 68.392 | 22.770 | **3,00×** |
| 2023 | 29.715 | 12.917 | 2,30× |
| 2024 | 30.941 | 13.838 | 2,24× |
| 2025 | 16.345 | **7.851** | **2,08×** |

Em 2025, **796 crianças ocupam 5 posições cada**; 647 ocupam 4. Só 3.956 das
7.851 estão numa fila única.

> **A fila de espera de creche do Rio, em 2025, tinha 16.345 posições e 7.851
> crianças. Metade da fila é a mesma criança contada de novo.**

Isso distorce o planejamento (que se ancora na "demanda manifesta" da fila do ano
anterior — §3.6), distorce a comunicação com a família e distorce o trabalho do
diretor, que gasta 3 dias por chamada para descobrir que a criança já foi
atendida em outro lugar.

### 5.3 A fila está a 1,1 km da vaga

Recortando 2025 por **unidade × grupamento × turno** (2.138 pares):

- **1.346 pares (63%) terminaram o ano sem nenhuma criança em lista de espera.**
- **359 das 836 unidades (43%) não tiveram fila alguma.**
- 324 pares concentram fila relevante (≥10 crianças), somando **14.543 posições**.
- Para cada par com fila, medi a distância até o par **mais próximo com o mesmo
  grupamento, o mesmo turno e fila zero**:

| métrica | valor |
|---|---:|
| distância mediana até uma vaga livre equivalente | **1,10 km** |
| pares com alternativa a ≤ 2 km | **74,7%** |
| pares com alternativa a ≤ 3 km | **90,7%** |

> **Três em cada quatro filas do Rio têm, a menos de 2 km, uma creche do mesmo
> grupamento e do mesmo turno que ninguém está pedindo.**

Responde à pergunta literal do Eixo 1: *"não ter vagas ociosas ao mesmo tempo em
que existem filas de espera, talvez até no mesmo território"*. **Sim, é no mesmo
território — a mediana é 1,1 km.**

**Onde dói:** a CRE 7 sozinha responde por **8.109 das 14.543 posições em espera
(56%)**, com mediana de 2,04 km até a vaga livre — a maior da cidade. Unidades no
topo (espera / confirmados): CM Rio Novo–Rio das Flores **765/67**, EDI Clarice
Lispector **580/70**, CM Otávio Henrique de Oliveira **560/94**.

### 5.4 A pontuação declarada quase nunca aparece como confirmada

A ordem da fila vem da soma de pontos das respostas. Cada resposta tem uma marca
`confirmado`. Cruzando B com a régua de C:

| ano | inscrições | pontos médios **declarados** | pontos médios **confirmados** | inscrições que perdem pontos |
|---|---:|---:|---:|---:|
| 2021 | 65.159 | 36,19 | 31,88 | 4,8% |
| 2022 | 64.055 | 32,77 | 3,11 | 33,4% |
| 2023 | 51.331 | 55,60 | 3,99 | 50,0% |
| 2024 | 82.688 | 21,21 | 1,73 | 63,5% |
| 2025 | 71.930 | 27,71 | **1,98** | **63,0%** |

Por pergunta em 2025, a taxa de confirmação é uniformemente baixa: **CadÚnico
(51 pontos, o critério de maior peso) tem 35.141 declarações e 6,8%
confirmadas**; público-alvo da educação especial, 13,3%; violência doméstica,
18,2%.

**Ressalva obrigatória.** A transcrição diz que a validação automática por
Data Lake/RMI existe e que *"esses dados voltam para o sistema de Inscrição
Creche para validar a pontuação"*. Se isso escreve em `resp_confirmado`, então
6,8% de confirmação para CadÚnico é um achado grave. Se escreve em outro campo,
o número é artefato de extração. **Não afirmar "63% das famílias perdem pontos"
como fato.** Afirmar: *"a base entregue mostra 63% das inscrições sem confirmação
registrada neste campo; qual campo recebe o retorno do Data Lake?"* — pergunta 1
de §10. Dita no palco, essa ressalva vale mais para Engenharia que o número cru.

### 5.5 Abandono silencioso

Das 13.163 crianças que esperaram em 2024 sem vaga, **apenas 7.512 se
reinscreveram em 2025**. **5.651 famílias (43%) saíram do processo.** Combinado
com §3.3 — recusar uma vaga inviável custa todas as outras posições — isso tem
explicação mecânica, não só desistência.

### 5.6 A fila é contínua, não é um evento

`data_criacao` do processo 2025 vai de **10/12/2024 até 24/08/2026**. Inscrições
entram o ano inteiro. Bate com a transcrição: *"o processo de convocação acontece
durante todo o ano"*. O calendário oficial de 2026 (inscrições 09–12/12/2025,
classificação 13/01, resultado 21/01, confirmação 22–29/01) descreve o pico, não
o regime.

**Consequência:** a ferramenta certa é um **painel de operação contínua**, não um
relatório anual — exatamente o gap que o briefing descreve e que a transcrição
detalha como *"monitoramentos constantes e muitos fluxos manuais (…) olhar a base
de dados, gerar consolidados e enviar relatórios"*.

### 5.7 O que o dado NÃO sustenta — e por que dizer isso ganha pontos

A apresentação afirma (slide 5) que o ponto crítico é *"a escolha das 5 unidades
feita sem qualquer critério de distância"*. **Testei e o dado sustenta apenas em
parte.** Estimando a família pelo centroide do bairro declarado:

| ano | distância mediana família → opção | % das opções acima de 5 km |
|---|---:|---:|
| 2021 | 1,57 km | 6,4% |
| 2025 | **1,36 km** | **6,0%** |

As famílias já escolhem perto. A confirmação cai de 32,3% (<1 km) para 27,1%
(5–10 km) — o efeito existe, mas é modesto. O centroide de bairro é régua
grosseira e a anonimização suprimiu o logradouro, o que achata o sinal.

A conclusão operacional é **mais forte que a hipótese original**:

> O problema não é que a família escolhe longe. É que **a oferta não está onde a
> demanda está**, e a demanda se concentra em poucas unidades muito procuradas
> enquanto vizinhas equivalentes ficam vazias. As 10% de unidades mais procuradas
> concentram **28,4% da 1ª opção de toda a cidade**.

Dizer no palco "testamos a hipótese de vocês, ela é parcial, e o dado aponta para
outro lugar" é o movimento mais forte disponível hoje: verificável, respeitoso, e
prova que o time leu o dado em vez de ilustrar o slide.

---

## 6. O que NÃO propor

A transcrição mata duas ideias que pareciam boas às 9h. Propor qualquer uma é
entregar ao cliente algo que ele já tem — o erro mais caro em Impacto Real.

- **Validação automática de CadÚnico e Bolsa Família via base da Assistência
  Social. Eles já fazem.** Data Lake da Prefeitura + Registro Municipal
  Integrado, >12 milhões de registros, pelo CPF, com retorno para o IC. Citar o
  RMI pelo nome como *base do que já existe* é bom; propor como novidade é fatal.
- **Preditor de demanda.** Com 6h e base anonimizada é indefensável, e o
  planejamento é atacado melhor por contabilidade territorial explícita (§5.3)
  que por regressão.

Também fora: autenticação, multi-tenant, substituir o ICH ou o matricula.rio.

---

## 7. O produto — Vaga Certa

> **Vaga Certa** trata a fila de creche como uma operação de alocação, não como
> uma lista. Ele mostra onde a fila e a vaga ociosa se encontram no território;
> substitui a classificação por opção por **alocação por criança**, liberando as
> vagas congeladas sem alterar a ordem de prioridade; e conduz a convocação com
> contato vivo, relógio e alternativa.

Nome é proposta; alternativa **Match Creche**, ecoando o slide 1 da SME ("Match
Perfeito"). Decidir em 5 minutos e não voltar ao assunto.

### 7.1 Motor de alocação por criança — o coração

**Este é o item de maior valor do dia** e responde à pergunta que a própria SME
fez: *"é possível mudar a lógica de classificação para otimizar o preenchimento
das vagas?"*

Hoje: classificação **por opção**. Uma criança entra em até 5 filas, pode receber
até 5 ofertas, e as 4 recusadas ficam congeladas 3 dias cada — cascateando (§3.2).

Proposta: classificação **por criança**, com **aceitação diferida** (o mecanismo
de Gale–Shapley com capacidades, o mesmo usado em alocação escolar em Boston,
Nova York e Amsterdã):

1. cada criança tem uma preferência ordenada (a `opcao` 1–5 que ela já declara);
2. cada unidade × grupamento × turno tem uma capacidade e uma **prioridade —
   exatamente a pontuação de vulnerabilidade vigente**;
3. cada rodada, a criança "aplica" para a melhor unidade que ainda não a
   rejeitou; a unidade retém provisoriamente as de maior prioridade até a
   capacidade e libera as demais **imediatamente**;
4. repete até estabilizar. **Cada criança sai com no máximo uma oferta.**

Três propriedades que importam para esta secretaria, nesta ordem:

- **A ordem de prioridade é preservada por construção.** Nenhuma criança de menor
  pontuação ocupa vaga que uma de maior pontuação queria. Isso é demonstrável, e
  é a resposta direta à restrição de §3.5 ("órgãos reguladores acompanham essa
  fila"). Sem essa propriedade a proposta seria inviável, por mais eficiente que
  fosse.
- **As 4 vagas congeladas por criança desaparecem** — a liberação é na rodada, não
  em 3 dias.
- **É à prova de estratégia**: a família declara a preferência verdadeira sem
  risco, o que remove o incentivo perverso de §3.3.

**A demonstração:** rodar os dois mecanismos sobre a base real de 2025 e comparar
vagas congeladas, rodadas de convocação e crianças atendidas. Os dados
necessários já existem: preferência (`opcao`), prioridade (B+C) e capacidade
(confirmados por par, ou `totalalunoscreche`). É ~80 linhas de código e é o slide
que ganha o critério Ideia sem abrir mão de Impacto Real.

Honestidade obrigatória no palco: a aceitação diferida **não cria vagas**. Ela
elimina o congelamento e encurta o tempo até a matrícula. O que cria vaga é o
Eixo 1.

### 7.2 Mapa do descompasso — Eixo 1

Cada unidade é um ponto sobre o contorno real do município. A cor mede a pressão
do par unidade × grupamento × turno: fila represada de um lado, ociosidade do
outro. Ao selecionar uma unidade saturada, o mapa **traça as linhas até as
unidades equivalentes com fila zero no raio de 2 km**, com a contagem de crianças
e a distância. Filtros por CRE, **microárea**, grupamento e turno — microárea
porque é o recorte que a CRE usa de fato (§3.6).

Duas saídas, ambas exportáveis: *"abrir turma aqui"* e *"a demanda desta fila cabe
naquela unidade"*. E uma correção de leitura que só este produto oferece: **a
fila mostrada é por criança, não por posição** (§5.2) — o planejamento deixa de
superestimar a demanda em 2×.

### 7.3 Convocação com contato vivo — Eixo 3

A transcrição é inequívoca: o gargalo é o telefone, não o algoritmo (§3.4).

- **Painel de chamadas em aberto** por unidade, ordenado por tempo em
  `Selecionado`, com o prazo de 3 dias, o dia de extensão e o rastro de
  tentativas por canal. Substitui o "caderninho" do diretor e os consolidados
  manuais enviados às CREs.
- **Alcançabilidade antes da convocação:** marcar a fila com o risco de contato
  frio (tempo desde a inscrição, tentativas anteriores falhas) e **pré-aquecer**
  as próximas N famílias antes de a vaga abrir — para que os 3 dias comecem com
  contato válido. Em produção, o contato mais recente vem do próprio RMI, que
  agrega Saúde e Assistência (a família que sumiu da Educação apareceu no posto).
- **Atualização de contato em um clique**, com registro de quem alterou — o buraco
  que a SME nomeou explicitamente.
- **Alternativa na hora da chamada:** se a família não pode aquela vaga, o
  operador vê a vaga livre equivalente a ~1 km e a oferece **antes** de perder o
  contato, em vez de acionar a penalidade de §3.3.

### 7.4 Onde Claude entra, e onde não entra

**Princípio inegociável:** *números e regras de negócio são calculados por código
determinístico, nunca por LLM.* Distância, pontuação, ordem da fila, resultado da
alocação — tudo SQL e código auditável. Claude:

- **explica a posição** à família em linguagem simples ("você está em 14º no
  Berçário integral do EDI X; seu CadÚnico foi confirmado e vale 51 pontos"), a
  partir de números que recebe prontos — respondendo ao gap do briefing sobre
  explicar por que a posição mudou de um ano para o outro;
- **redige a convocação** por canal (WhatsApp, SMS, e-mail, roteiro de ligação),
  com prazo, endereço e documentos corretos, para revisão humana antes do envio —
  o trabalho que hoje consome o diretor;
- **é o copiloto da CRE**: "onde abro turma de Berçário integral na CRE 7?"
  responde com a lista determinística e cita a evidência;
- **lê a norma** (Resolução SME nº 542, de 18/11/2025, Anexo I, Cap. III, arts. 5º
  a 17) para justificar cada recomendação contra a base legal vigente.

Nenhum desses usos produz um número. Todos citam fonte. É isso que o critério
Engenharia chama de auditável, e é o que separa o projeto de um chatbot.

---

## 8. Plano do dia — 10h45 às 16h30

Ordem de prioridade; corta de baixo para cima. **Nada entra sem aparecer na demo.**

### P0 — a demo mínima que já ganha (10h45–13h00)

1. **Decidir a Regra 1** (§2). Bloqueia todo commit. 5 minutos.
2. **Ingestão**: Query A + C + D + xlsx de localização em DuckDB, com
   `ltrim(unidade,'0')` no join e as armadilhas de §4.3 tratadas.
3. **`par_oferta` e `alternativa`** (§12) como serviço.
4. **Mapa do descompasso** com dado real e as linhas de alternativa.
5. **Dois números na tela**: "74,7% da fila tem vaga equivalente a menos de 2 km"
   e "16.345 posições, 7.851 crianças".

### P1 — o que transforma demo em produto (13h00–15h00)

6. **Motor de alocação por criança** (§7.1) rodando sobre 2025, com o
   comparativo lado a lado contra a alocação por opção. **Se só uma coisa do P1
   couber, é esta.**
7. **Painel de convocação** com tempo em status, risco de contato frio e
   alternativa próxima.
8. **Claude** na explicação da posição e no rascunho da convocação, com o
   contrato de "nenhum número vem do modelo".

### P2 — só se sobrar tempo (15h00–15h45)

9. Microáreas SME/IPP como camada e filtro do mapa (shapefile; sem geopandas —
   `ST_Read` do DuckDB spatial ou conversão prévia para GeoJSON).
10. Autoconfirmação do critério "aguardou na fila no ano anterior" pela própria
    base do IC — **7.860 inscrições corrigíveis em 2025**: 5.605 que declararam e
    não foram confirmadas, e 2.255 que declararam "não" tendo direito. Não
    depende de integração nova e não colide com o que o RMI já faz (§6).
11. Nascidos vivos e `totalalunoscreche` como camadas de demanda e ocupação.

### 15h45–16h30 — congelar

12. README com **nome da equipe, membros, resumo, arquitetura, como Claude foi
    usado para construir e como atua dentro da aplicação, links e vídeo de 60s**.
    Conteúdo **obrigatório** pelas regras; README fraco custa nota em duas
    rubricas.
13. Vídeo de 60s (obrigatório se a aplicação não estiver publicamente acessível).
14. Ensaiar os 6 minutos. **O corte é duro.** Roteiro: a dor nas palavras deles —
    *"mais de uma semana para colocar uma criança em uma vaga"* (1 min) → o mapa
    ao vivo, 1,1 km (1,5 min) → a fila 2× e a alocação por criança rodando
    (2 min) → honestidade sobre hoje vs. próximos passos (1 min) → fecho (30 s).
15. Enviar o link para **eventos@taicor.ai** com o número do grupo no assunto e
    no corpo. **Antes das 16h30.**

---

## 9. O que sobrevive do projeto anterior

O projeto anterior ("Pulso da Rede") mirava gestão pedagógica. **Esse domínio
inteiro está morto.**

### Aproveitar

| ativo | onde | por quê |
|---|---|---|
| **Tela do mapa** | `frontend/src/screens/mapa/MapCanvas.tsx`, `domain/projection.ts`, `domain/rio-geometry.ts` | projeção, contorno real do município (IBGE malhas v3, município 3304557), pan/zoom por ponteiro, `<circle>` por unidade. Troca-se o que alimenta os pontos, não o desenho |
| Kit de interface | `frontend/src/components/ui/*`, `components/shell/*` | primitivos genéricos; defensáveis como biblioteca |
| Adaptador DuckDB | `backend/app/data_access/duckdb_adapter.py` | genérico |
| Contratos de capability e proveniência | `backend/app/contracts/*`, `app/platform/*` | declarar origem e bloquear leitura sem cobertura vale **mais** aqui do que antes |
| Disciplina de dados | `data/README.md`, `.gitignore` | o `dadoscreche` tem dado de criança, mesmo anonimizado. Nunca versionar |

O mapa alimentava-se de 1.588 escolas do Data.Rio. Agora se alimenta das **1.941
unidades do xlsx da SME** (852 das 872 com fila, geolocalizadas). Mesma tela,
conteúdo mais forte: a cor deixa de ser indicador sintético e passa a ser **fila e
ociosidade medidas em dado real**.

### Descartar

Censo INEP e a ponte de código INEP. Telas `Escola`, `Professor`, `Recomposicao`,
`Fluxo`, `Comparar`, `Hoje`. Métricas de frequência, desempenho, carência e
movimentação. Todos os geradores de dado sintético. Os módulos `analytics`,
`metrics`, `quality` no formato atual.

### Documentos obsoletos

Ficam como histórico, mas **não descrevem mais o projeto**:
`docs/product/vision.md`, `capabilities.md`, `regras-de-negocio.md`,
`premissas.md`, `personas-e-jornadas.md`, `roteiro-demo.md`,
`correcao-rota-backend-impact-lab-2026-08-30.md`,
`implementation-shot-data-ai-strategy.md`, todos os `docs/api/*handoff*`,
`docs/data/school-identity-release-contract.md`, e os três relatórios de pesquisa
na raiz. `docs/architecture/*` segue válido em princípio, desatualizado em
conteúdo.

---

## 10. Perguntas para a SME, nesta ordem

Os mentores estão na sala. Cada resposta muda o produto.

1. **Qual campo recebe o retorno da validação do Data Lake/RMI?** Se é
   `resp_confirmado`, §5.4 é um achado grave; se é outro, é artefato de extração.
   **É a pergunta mais importante do dia.**
2. **A capacidade por unidade × grupamento × turno existe em algum lugar como
   número?** Sem ela o motor de alocação usa confirmados como proxy — funciona
   para a demo, não para produção.
3. Há base legal para oferecer à família uma unidade equivalente próxima que não
   estava entre as 5 opções — sem acionar a penalidade de perda das demais filas?
4. Existe registro de data/hora da mudança de status da opção? Se existir em
   algum log, o painel de convocação fica muito mais forte.
5. A CRE pode remanejar oferta entre unidades depois da parametrização, ou a
   definição de vagas congela no planejamento?
6. Trocar classificação por opção por classificação por CPF exige mudança
   normativa, ou é decisão de parametrização do sistema?

---

## 11. Como rodar

Backend (DuckDB já instalado; **sem pandas/numpy**):

```powershell
Set-Location C:\Users\lucas\documents\claude-educacao\backend
uv sync
uv run uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Frontend:

```powershell
Set-Location C:\Users\lucas\documents\claude-educacao\frontend
npm install
npm run dev
```

Dados — clonar **fora** do repositório e apontar por variável de ambiente:

```powershell
git clone https://github.com/CIT-SME-RJ/dadoscreche
```

Gates antes de qualquer commit:

```powershell
Set-Location backend
uv run ruff check app tests scripts; uv run mypy app scripts; uv run python -m pytest -q
Set-Location ..\frontend
npx tsc -b; npm run build; npm run lint
```

**Política Git inalterada:** não há commit, push ou `git add` automático. Antes do
commit, revisar `git diff --cached --name-only` e confirmar que nenhum arquivo do
`dadoscreche` entrou.

---

## 12. Consultas de referência

Padrão de leitura:

```python
import duckdb
c = duckdb.connect()
c.execute("""CREATE VIEW a AS SELECT * FROM read_csv_auto(
  '<...>/01_QueryA_InscricoesPorAno.csv.gz', delim=';', header=true)""")
```

**A inflação da fila** (§5.2) — o número mais fácil de mostrar e o mais difícil de
contestar:

```sql
SELECT ano, count(*) AS posicoes, count(DISTINCT aluno_anon) AS criancas,
       round(1.0 * count(*) / count(DISTINCT aluno_anon), 2) AS inflacao
FROM a WHERE situacao = 'Lista de espera' GROUP BY 1 ORDER BY 1;
```

**O par com fila e a alternativa mais próxima** (§5.3) — sustenta a tese do mapa:

```sql
CREATE TABLE ugt AS
SELECT a.unidade, a.grupamento, a.horario,
       sum(CASE WHEN a.situacao = 'Lista de espera' THEN 1 ELSE 0 END) AS espera,
       sum(CASE WHEN a.situacao = 'Confirmado'      THEN 1 ELSE 0 END) AS conf,
       max(l.lat) AS lat, max(l.lon) AS lon, max(l.cre) AS cre
FROM a JOIN loc l ON l.cod = ltrim(a.unidade, '0')
WHERE a.ano = 2025 AND l.lat IS NOT NULL
GROUP BY 1, 2, 3;

WITH com AS (SELECT * FROM ugt WHERE espera >= 10),
     sem AS (SELECT * FROM ugt WHERE espera = 0 AND conf > 0)
SELECT round(median(dmin), 2)                                           AS mediana_km,
       round(100.0 * avg(CASE WHEN dmin <= 2 THEN 1.0 ELSE 0.0 END), 1) AS pct_ate_2km,
       sum(espera)                                                      AS posicoes_em_espera
FROM (
  SELECT com.*, (
    SELECT min(111.19 * sqrt(pow(com.lat - s.lat, 2)
                           + pow((com.lon - s.lon) * cos(radians(com.lat)), 2)))
    FROM sem s
    WHERE s.grupamento = com.grupamento AND s.horario = com.horario
  ) AS dmin
  FROM com
);
```

`loc` vem do xlsx de localização, com `cod = ltrim(DESIGNACAO, '0')`. A distância
é aproximação equirretangular — suficiente para 2 km na latitude do Rio, e
declarada como aproximação na interface.

**Entrada do motor de alocação** (§7.1): preferência por criança, prioridade por
inscrição e capacidade por par.

```sql
-- prioridade: pontos declarados e confirmados, pela régua do ano
CREATE TABLE pontos AS
SELECT b.ano, b.prm_id, b.plm_id, b.ipl_id,
       sum(CASE WHEN b.resposta = 'Sim' THEN qc.perg_pontuacao ELSE 0 END) AS pts_decl,
       sum(CASE WHEN b.resposta = 'Sim' AND b.confirmado = 'Sim'
                THEN qc.perg_pontuacao ELSE 0 END)                          AS pts_conf
FROM b JOIN qc ON qc.ano = b.ano AND qc.ich_perg_id = b.ich_perg_id
GROUP BY 1, 2, 3, 4;
```

Preferência = `(aluno_anon, opcao, unidade, grupamento, horario)` da Query A.
Capacidade = confirmados por par em `ugt`, ou a planilha `totalalunoscreche` do
ano. Desempate: os critérios com `perg_criterio = 'Sim'` (pontuação zero) e, em
seguida, `data_criacao`.

**Autoconfirmação do critério de fila do ano anterior** (P2, item 10):

```sql
CREATE TABLE fato AS
SELECT DISTINCT aluno_anon FROM a
WHERE ano = 2024 AND situacao = 'Lista de espera'
  AND aluno_anon NOT IN (SELECT aluno_anon FROM a WHERE ano = 2024 AND situacao = 'Confirmado');
```

Cruzar `fato` com a resposta de `perg_id = 27` em 2025, juntando B↔C por
`ich_perg_id` e B↔A por `(prm_id, plm_id, ipl_id)`.
