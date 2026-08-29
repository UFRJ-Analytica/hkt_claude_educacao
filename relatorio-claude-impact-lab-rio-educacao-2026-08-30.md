---
titulo: "Claude Impact Lab Rio #2 — Educação Municipal: diagnóstico, dados e plano de ataque"
evento: Claude Impact Lab Rio #2
data_evento: 2026-08-30
elaborado_em: 2026-08-26
equipe: Analytica UFRJ
status: draft
---

# Claude Impact Lab Rio #2 — Educação Municipal do Rio

**Relatório de preparação — Analytica UFRJ**

Elaborado em 26/08/2026, quatro dias antes do evento.

> **Como este documento foi produzido.** Cinco frentes de pesquisa paralelas em 26/08/2026: imprensa e órgãos de controle sobre a SME-Rio; comunicação oficial da Prefeitura e contra-discurso; mapeamento de dados abertos com verificação HTTP real; leitura do repositório `UFRJ-Analytica/hkt_claude_educacao`; e a página oficial do evento. Toda afirmação factual carrega fonte. As lacunas estão declaradas como lacunas — a seção 12 lista o que **não** foi encontrado.
>
> **Precedente reaproveitado:** `D:\Programming\claude_hackaton_24052026\RESEARCH.md`, o deep research do Claude Impact Lab Rio #1 (24/05/2026, projeto CIVITAS / CompStat). O formato e várias lições vêm de lá.

---

## Sumário executivo

**O fato que reorganiza todo o preparo:** o briefing, os datasets e os critérios de avaliação **só são revelados no domingo de manhã**, e quem os fornece é a própria Secretaria Municipal de Educação. Não dá para pré-construir o produto. Dá para pré-construir três coisas, e é nelas que os quatro dias devem ir:

1. **Contexto de domínio** — chegar sabendo o que dói na rede antes de o slide subir. Quem entende o briefing às 9h05 tem uma hora de vantagem sobre quem entende às 10h.
2. **Um caminho de ingestão que engole CSV/XLSX desconhecido em minutos**, com perfilagem automática de schema. Hoje esse caminho não existe no repositório.
3. **Um esqueleto vertical que já mostra tela e já chama Claude** — não uma fundação horizontal perfeita cuja camada visível fica para depois.

**As cinco frentes críticas da SME-Rio**, em ordem de gravidade e de densidade de dados disponíveis:

| # | Frente | Por que é crítica | Dado público existe? |
|---|---|---|---|
| 1 | **Violência armada interrompendo aula** | 583 unidades fecharam ao menos uma vez em 2025 (440 em 2023); 377 dias letivos comprometidos; 323 mil alunos (25,8%) em escolas de risco moderado a muito alto | Parcial — dá para **construir** o cruzamento; ninguém publicou pronto |
| 2 | **Estagnação dos anos finais** | IDEB anos iniciais 5,4→6,2 (2021-2025), anos finais 5,0→5,2 — 4% em quatro anos; 20,9% de distorção idade-série | Sim, completo (INEP) |
| 3 | **Fila de creche e passivo judicial** | ~10-13 mil crianças sem vaga; multa de R$ 2 bi já fixada; recurso negado; Defensoria pede elevação a R$ 25,9 bi | Capacidade sim, **fila não** (só Power BI) |
| 4 | **Força de trabalho docente** | MPRJ deu 90 dias em jan/2026 para plano de concurso; rede sustentada por editais temporários; 27,22% de perda salarial desde 2019 | Parcial (Censo Escolar tem docentes) |
| 5 | **Inclusão sem estrutura** | Cargo previsto para ~3 mil AAEE operando com ~1,1 mil efetivos + ~1,9 mil estagiários; 1.016 pedidos de mediador na Defensoria em 12 meses | Fraco |

**A aposta mais provável para o desafio:** inteligência gerencial territorial — um painel que ajuda SME/CRE a priorizar escolas. É o que a estrutura da Secretaria consegue absorver, é onde os dados dela são fortes, e é a hipótese que o próprio repositório já classificou como 40% de probabilidade.

**A recomendação de arquitetura, em uma frase:** DuckDB num arquivo + FastAPI fino + React/Vite, com Claude ligado desde a primeira hora — não a fundação hexagonal de dez fases que o repositório tem hoje.

---

## 1. O evento

### 1.1 Confirmado

| Item | Valor |
|---|---|
| Nome | **Claude Impact Lab Rio #2** (título no Luma: "Rio de Janeiro \| Claude Impact Lab") |
| Data e horário | **Domingo, 30/08/2026, 08h–20h** (12h de janela total) |
| Local | Escritório da **VTEX, Praia de Botafogo** — endereço exato liberado só após aprovação |
| Organização | Claude Community Events / **Anthropic**; hosts João Lisboa, Luiz Guilherme Gama, Hannah Rabe |
| Apoio | VTEX, Afya, PRIO |
| Parceria pública | **Prefeitura do Rio + Secretaria Municipal de Educação + Secretaria de Desenvolvimento Econômico** |
| Capacidade | ~100 participantes; **esgotado**, lista de espera ativa |
| Times | **4 pessoas**, multidisciplinares (organização recomenda devs + não-devs) |
| Tema | **Educação** — "um problema concreto da Secretaria Municipal de Educação" |
| Trilhas | **Desafio único**, sem trilhas |
| Briefing, datasets e critérios | **Revelados no dia** |
| Créditos | Cada participante recebe créditos Claude no dia (**valor não informado**) |
| Entregável | Apresentação dos **finalistas** para banca de jurados |
| Destino da solução | **"As melhores soluções serão doadas para a cidade"** |

Fontes: [luma.com/claude-bcnp](https://luma.com/claude-bcnp) (via `api.lu.ma/url?url=claude-bcnp`); [Prefeitura do Rio](https://prefeitura.rio/cidade/cidade-do-rio-recebe-segunda-edicao-brasileira-do-claude-impact-lab/); [SMDUE — 1ª edição](https://desenvolvimento.prefeitura.rio/noticias/cidade-do-rio-recebe-primeira-edicao-brasileira-do-claude-impact-lab/).

### 1.2 Não divulgado (e por que importa)

- **Critérios de julgamento.** Reservados para o dia. No Impact Lab #1 o peso de "impacto real" foi de 40% — o `RESEARCH.md` do CIVITAS registra um rerankeamento inteiro em cima disso. Assuma peso alto em "a Prefeitura usaria isso amanhã?" até ouvir o contrário, e **pergunte na abertura**.
- **Tempo de pitch.** Desconhecido. Prepare para 5 min, o padrão do #1.
- **Jurados e mentores.** Nenhum nome anunciado.
- **Prêmios.** Só a menção genérica.
- **Peso de Claude Code / MCP / Agent SDK.** Não exigidos formalmente. Mas o formulário de inscrição pergunta nível de experiência com Claude Code e quais features interessam — sinal forte, não regra publicada.

### 1.3 A consequência estratégica

O evento entrega o problema **e** os dados. Isso torna inútil apostar num produto específico e torna valiosíssimas três capacidades genéricas: ler dados desconhecidos rápido, ter contexto de domínio pré-carregado, e ter uma casca de demo que aceita qualquer conteúdo. É o inverso do Impact Lab #1, onde os dados (ISP-RJ, RELINTs) eram conhecidos com antecedência.

---

## 2. A rede municipal do Rio — retrato de partida

| Indicador | Valor | Fonte |
|---|---|---|
| Unidades escolares | **1.560** (ago/2026); 1.557 no início de 2025 e 2026 | [SME](https://educacao.prefeitura.rio/noticias/prefeitura-do-rio-inaugura-novo-get-e-passa-a-ter-1-560-escolas-na-rede-municipal-de-ensino/), 04/08/2026 |
| Alunos | **mais de 650 mil** | [SME](https://educacao.prefeitura.rio/noticias/prefeitura-do-rio-inicia-ano-letivo-de-2026-para-mais-de-650-mil-alunos-das-1-557-escolas-municipais/), 04/02/2026 |
| Escolas municipais no Censo 2023 | 1.597 (de 4.198 estabelecimentos no município) | Microdados INEP, medido |
| Orçamento 2026 | **> R$ 10 bi** — maior pasta do município (total municipal R$ 52,42 bi) | [Diário Carioca](https://www.diariocarioca.com/rio-de-janeiro/orcamento-de-2026-no-rio-de-janeiro-preve-r-10-bilhoes-para-educacao-e-r-290-milhoes-para-cultura/) |
| — alimentação escolar | R$ 402,3 mi | [Câmara do Rio](https://cmu.camara.rio/comunicacao/noticias/1321-orcamento-educacao-tera-recursos-de-r-8-7-bilhoes-para-o-ano-que-vem) |
| — obras e reformas | R$ 150,2 mi | idem |
| Estrutura territorial | **11 CREs** (Coordenadorias Regionais de Educação) + microáreas | data.rio / SME |
| Autodescrição institucional | "a maior rede municipal de ensino da América Latina" | bio do [@sme_carioca](https://www.instagram.com/sme_carioca/) |

**Guarde as 11 CREs.** São o recorte administrativo real da Secretaria, aparecem em quase todo dataset municipal (inclusive nas unidades orçamentárias 16002–16012 do Rio+Transparente) e são a unidade em que um gestor da SME efetivamente pensa. Um painel organizado por CRE fala a língua do cliente; um organizado por bairro, não.

---

## 3. As frentes críticas, em detalhe

### 3.1 Violência armada interrompendo aula — a maior e a mais mal servida de dados

Esta é a frente com o melhor material independente do período e, ao mesmo tempo, a mais ausente da comunicação oficial de conquistas. É onde há maior chance de um time produzir algo que ninguém tem.

**Escala do fechamento de escolas (dados da própria SME, obtidos por requerimento de vereadora):**

| Ano | Unidades municipais com atividades interrompidas ao menos uma vez |
|---|---|
| 2023 | 440 |
| 2024 | 471 |
| **2025** | **583** |

Quase 1.500 em três anos, em tendência de alta. Recorte parcial: 415 escolas impactadas só entre fevereiro e julho de 2025. [Diário do Rio, 26/11/2025](https://diariodorio.com/escolas-do-rio-de-janeiro-sofrem-com-o-impcato-das-operacoes-policiais).

**Estudo "Percursos Interrompidos"** (UNICEF + Instituto Fogo Cruzado + GENI/UFF), divulgado em 26/03/2026, cobrindo jan/2023–jul/2025 — é o documento mais forte que existe sobre o tema:

- **188.694 crianças e adolescentes** da rede municipal com trajeto casa-escola comprometido
- **2.228 interrupções** de transporte público (786 em 2023; 852 em 2024; 590 até jul/2025)
- **95% das 4.008 unidades escolares ativas** (3.825) registraram ao menos uma interrupção no entorno
- Duração média de **7h por evento**; 25% passaram de 11h; **49% em horário escolar** de dia letivo
- **377 dias letivos comprometidos**; 1.021.054 deslocamentos afetados
- **323.359 estudantes (25,8% das matrículas)** em escolas de risco moderado a muito alto
- **120 escolas (2,9%) em risco alto/muito alto** — 71 na Zona Norte, 48 na Zona Oeste
- Territórios: **Penha 633 eventos (176 dias acumulados sem transporte)**, Bangu 175 (45 dias), Jacarepaguá 161 (128 dias)
- Causas: barricadas 32,4%; **operações policiais 22,7%**; protestos 12,9%; ação criminosa 9,6%; tiroteios 7,2%

[Agência Brasil, 26/03/2026](https://agenciabrasil.ebc.com.br/educacao/noticia/2026-03/violencia-interrompe-transportes-e-afeta-acesso-educacao-no-rio) · [ANDI, 07/04/2026](https://andi.org.br/2026/04/percursos-interrompidos-comprometido-pela-violencia-armada/) · [CNN Brasil](https://www.cnnbrasil.com.br/nacional/sudeste/rj/violencia-armada-no-rio-prejudica-trajeto-para-escola-de-190-mil-estudantes/)

**Complemento:** 3.729 tiroteios perto de escolas entre nov/2022 e nov/2025 (~18/semana), **44% durante operações policiais**. [Brasil de Fato, 04/11/2025](https://www.brasildefato.com.br/2025/11/04/em-4-anos-mais-de-dois-tiroteios-por-dia-aconteceram-perto-de-escolas-no-rj-44-em-operacoes-policiais/).

**Episódios de referência (úteis como estudo de caso numa demo):**

| Data | Evento | Escolas municipais paradas |
|---|---|---|
| 28/10/2025 | Operação Contenção (Penha/Alemão) — 121 mortos, operação mais letal da história do RJ | **48** (31 Alemão + 17 Penha), fechadas por 3 dias |
| 05/05/2026 | Operação Torniquete (Maré) | **41–42** |
| 24/08/2026 | Complexo de Israel + Gardênia Azul | **17** |
| — | Zona Oeste, operação com 6 mortos | **37** |

Fontes: [Agência Brasil, 28/10/2025](https://agenciabrasil.ebc.com.br/geral/noticia/2025-10/aulas-sao-suspensas-no-rio-apos-megaoperacao-policial) · [CNN Brasil](https://www.cnnbrasil.com.br/nacional/sudeste/rj/apos-megaoperacao-escolas-do-alemao-e-da-penha-seguem-fechadas-pelo-3o-dia/) · [Metrópoles](https://www.metropoles.com/brasil/rio-operacao-na-mare-com-uma-morte-fechou-vias-e-suspendeu-aulas) · [Tempo Real, 24/08/2026](https://temporealrj.com/operacao-israel-gardenia-suspendem-aulas-escolas/).

**Resposta institucional existente** (importante para não propor o que já existe):

- **Acesso Mais Seguro** — protocolo com o Comitê Internacional da Cruz Vermelha, adotado desde 2010. Classifica território por cores: amarelo suspende atividades externas, **vermelho fecha a unidade**.
- **PPPS — Protocolo de Prevenção, Proteção e Segurança Escolar**, 2ª edição lançada em ~10/03/2026, com COR, Guarda Municipal, Defesa Civil, Esquadrão Antibombas, UNICEF, Cruz Vermelha e ABIN. [página oficial](https://educacao.prefeitura.rio/ppps/)
- **Escola Segura** (Guarda Municipal): 145 guardas, 54 patrulheiros, 14 viaturas.
- **Resolução CNE/CEB nº 03/2026** — após atuação do MPF, criou diretrizes nacionais para garantir os **200 dias letivos em escolas afetadas por violência armada**. [MPF-RJ](https://www.mpf.mp.br/o-mpf/unidades/pr-rj/noticias/apos-atuacao-do-mpf-e-parceiros-cne-estabelece-diretrizes-nacionais-para-garantir-os-200-dias-letivos-em-escolas-afetadas-pela-violencia-armada)

> **O buraco de dados, que é a oportunidade.** Não existe base pública de "aulas suspensas por tiroteio". A SME comunica por nota à imprensa, caso a caso. O estudo do UNICEF publicou só PDF, sem microdado. **Quem reconstruir esse indicador — Fogo Cruzado + escolas georreferenciadas + calendário letivo — produz um número que ninguém tem publicado.** É o ativo mais valioso desta pesquisa inteira, e é o mesmo tipo de jogada que funcionou no Impact Lab #1.

### 3.2 Anos finais estagnados — o contraste que a própria SME expõe

**IDEB 2025** (divulgado em 05/08/2026, comunicado pela SME em 11/08/2026):

| Etapa | 2019 | 2021 | 2023 | 2025 | Variação 2021→2025 |
|---|---|---|---|---|---|
| Anos iniciais | 5,8 | 5,4 | 6,0 | **6,2** | **+14,8%** |
| Anos finais | — | 5,0 | — | **5,2** | **+4,0%** |

Posição: 4ª entre capitais com mais de 100 mil estudantes, 2ª no Sudeste, 8ª maior taxa de crescimento do país. Escola-vitrine: E.M. Ayrton Senna da Silva, 8,8. [SME, 11/08/2026](https://educacao.prefeitura.rio/noticias/rio-alcanca-maior-ideb-da-historia-nos-anos-iniciais-e-esta-entre-as-capitais-que-mais-avancaram-no-pais/).

**Alfabetização:** o município saiu de 56% → 64% de crianças alfabetizadas na idade certa em um ano (ICA 2024), uma das seis capitais que superaram a meta nacional de 60%. [SME, 04/08/2025](https://educacao.prefeitura.rio/noticias/volta-as-aulas-no-embalo-dos-bons-resultados-na-alfabetizacao/). No **ICA 2025** (divulgado 31/03/2026), o município ficou em **60%, abaixo da própria meta de 61%**, com selo prata. [MEC — ficha RJ](https://www.gov.br/mec/pt-br/crianca-alfabetizada/monitoramento-e-avaliacao/indicador-crianca-alfabetizada-2025/arquivos/rio-de-janeiro-rj).

**Distorção idade-série nos anos finais: 20,9%**, com **~19% de aprendizagem adequada em Matemática**. Fonte secundária citando QEdu/SAEB — [QEdu](https://qedu.org.br/municipio/3304557-rio-de-janeiro).

**A leitura:** a rede resolveu (parcialmente) a alfabetização e não está convertendo isso em aprendizagem no 6º–9º ano. É a história mais limpa que os dados abertos contam sozinhos, e o INEP entrega tudo pronto por escola.

### 3.3 Creche — a fila que virou passivo bilionário

- **ACP do MP**, ajuizada em 2003, acolhida pelo TJ-RJ em 2009: matrícula de todas as crianças de até 6 anos, prazo de 90 dias, **multa diária de R$ 300 por criança**. Defensoria entrou como assistente em 2021.
- **Multa fixada em R$ 2 bilhões** (mai/2024); a DPRJ avalia recorrer para elevá-la a **R$ 25.921.955.259,64**. [Agência Brasil](https://agenciabrasil.ebc.com.br/justica/noticia/2024-05/prefeitura-do-rio-e-multada-por-nao-zerar-fila-de-vagas-em-creches)
- **Recurso da Prefeitura negado** pela 2ª Câmara de Direito Público; ordem de zerar a fila em 90 dias mantida. [DPRJ](https://defensoria.rj.def.br/noticia/detalhes/30136-RJ-Justica-nega-recurso-da-Prefeitura-e-manda-zerar-fila-de-creches)
- **Fila:** ~10 mil (número da própria prefeitura na decisão); 12.394 no integral
  + 2.911 no parcial ao fim de 2023; SEPE fala em 13 mil.
- **Resposta oficial:** 8 mil vagas abertas no ano, 30% das conveniadas priorizadas para a fila; slogan institucional de "25 mil novas vagas".
- **Meta do PME** de atender 50% da demanda de 0-3 anos era para 2021 e só foi atingida ao fim de **2024** — três anos de atraso. [Relatório de Monitoramento PME 2025](https://educacao.prefeitura.rio/wp-content/uploads/sites/42/2025/12/Relatorio-de-Monitoramento-PME-2025.pdf)
- **Crítica estrutural:** vagas são distribuídas por **pontuação de prioridade** (Bolsa Família, deficiência, violência doméstica, familiar encarcerado), não por ordem nem sorteio — racionamento explícito de um direito universal.

> **Nota de dados:** existe portal de [Transparência-Creches](https://educacao.prefeitura.rio/transparenciacreches/) com atualização mensal, mas a **fila** está só num Power BI embarcado. O que é baixável é a **capacidade** por unidade e grupamento etário (XLSX). Ver §5.3 — há uma chave de join verificada que transforma isso em mapa de déficit.

### 3.4 Professores — o conflito permanente

- **Greve de 25/11 a 06/12/2024** contra o **PLC 186/2024** (novo plano de cargos).
- **Conteúdo do PLC 186**, sancionado em dez/2024: hora-aula deixa de ser de 50 min e passa a contagem por minuto efetivo (**"minutagem"**) — de 26 para 32 tempos; **fim da licença-prêmio**; estágio probatório de 2 → 3 anos. [Agência Brasil, 12/2024](https://agenciabrasil.ebc.com.br/politica/noticia/2024-12/rio-aprova-pl-que-extingue-licenca-premio-e-muda-horario-de-professor)
- **Efeito colateral 2025:** centenas de professores ficaram sem lotação na escola de origem e foram realocados via CRE, em processo denunciado como sem critério. [Diário do Rio, 06/02/2025](https://diariodorio.com/aumento-da-carga-horaria-na-rede-municipal-de-educacao-deixa-professores-sem-espaco-em-suas-escolas-de-origem)
- **A "Lei da Minutagem" (LC municipal 276/2024)** reduziu o planejamento extraclasse de **14h para 8h semanais**. O **MPRJ está investigando** desde 27/07/2026; o SEPE coletou mais de mil respostas docentes em menos de uma semana em ago/2026.
- **Perda salarial de 27,22%** de 2019 a maio/2026 (cálculo DIEESE); reajuste concedido de 4,71% em dez/2025, pago em fev/2026; **vale-alimentação congelado há 14 anos em R$ 12,00**. Paralisações de 24h em 12/03/2026 e 09/04/2026. [Boletim SEPE nº 83, 18/08/2026](https://seperj.org.br/wp-content/uploads/2026/08/boletim_83_redemunicipalrj_14h_web.pdf)
- **MPRJ recomendou em 27/01/2026** concurso para professores efetivos, dando 90 dias para plano de ação. Carências apontadas: Educação Infantil, Anos Iniciais, Matemática, Geografia, Educação Física, Inglês e Artes. A resposta da SME um mês depois foi o **Edital SME nº 02/2026 com 616 vagas temporárias**.
- **Contexto histórico:** déficit de 6 mil professores na rede em 2023.
- **Violência contra professores:** professor esfaqueado por aluno na E.M. Orsina da Fonseca (Tijuca) em 10/08/2026.

### 3.5 Inclusão sem estrutura

- SME afirma **6.500 profissionais** de educação especial (recorde), com 950 novos AAEE e 1.300 vagas de estágio, proporção de 1 para cada 4 alunos.
- **O Globo, 25/05/2026:** a lei municipal prevê **3 mil** agentes de apoio, mas há **1.159 efetivos** e **1.934 estagiários**. ⚠️ *Números vindos de resumo indexado do texto de O Globo; confirmar na matéria original.*
- **1.016 pedidos de mediador escolar** na capital entre fev/2025 e fev/2026, segundo a Defensoria. [DPRJ](https://www.defensoria.rj.def.br/noticia/detalhes/27166-dprjformularioeducacaopcd)
- Contexto nacional: alunos com autismo saltaram de ~294 mil (2021) para **mais de 1,2 milhão (2025)** no Censo Escolar.

### 3.6 O que a SME já resolveu bem (não proponha de novo)

- **Abandono escolar: 0,1% em 2025**, o menor da história da rede (0,8% em 2019). Programa **Bora pra Escola** (Decreto 50.862/2022), 10 secretarias + IPP, app DiáRio, mais de 24 mil alunos reconduzidos, **preditor de evasão já construído com o IMDS**. [SME, 06/07/2026](https://educacao.prefeitura.rio/noticias/rio-de-janeiro-registra-menor-taxa-de-abandono-escolar-da-historia/)
- **IA para busca ativa** (IplanRio + SME + Assistência Social + Saúde) — **vencedor do Desafio de Prefeitos 2025-2026 da Bloomberg Philanthropies**. Em teste no 2º semestre de 2025, mais de 20 mil pessoas contatadas por WhatsApp, **+10% de frequência escolar nos bairros mais pobres** entre alunos com faltas recorrentes. [IplanRio](https://iplanrio.prefeitura.rio/noticias/rio-e-reconhecido-globalmente-por-projeto-com-ia-e-reforca-papel-da-iplanrio-na-inovacao-publica/)
- **Proibição de celular** (Decreto 53.918, desde 02/02/2024): estudo com Stanford (Guilherme Lichand, 919 diretores) aponta **+25,7% em Matemática e +13,5% em Português**; inspirou a Lei federal 15.100/2025.
- **ImpactAI Escolas Cariocas** (SME + ONG Recode): formação de até 350 professores em uso crítico de IA; 130 mil estudantes em robótica/programação.

> **Alerta tático.** "Preditor de evasão com IA" é a ideia que mais times vão propor no domingo — e é exatamente a que a SME **já tem, premiada internacionalmente**. Propor isso é entregar um projeto que o cliente já possui. Se o briefing puxar para frequência, o diferencial tem que estar no ângulo que o preditor deles não cobre: por exemplo, faltas **causadas por interrupção territorial** em vez de por vulnerabilidade familiar.

### 3.7 A tensão analítica que vale ouro numa demo

A rede exibe **abandono de 0,1%** ao mesmo tempo em que **583 unidades fecharam ao menos uma vez em 2025** e **25,8% das matrículas** estão em escolas com risco moderado a muito alto de interrupção. As duas coisas são verdadeiras.

Abandono formal baixo **não é** frequência efetiva garantida. O aluno continua matriculado; a aula é que não aconteceu. Um indicador de **"dias letivos efetivamente entregues por escola"** — que hoje ninguém publica — separa essas duas realidades e é a pergunta que a própria Secretaria não consegue responder com o que tem.

---

## 4. Como a SME comunica — e o que isso revela

### 4.1 O vocabulário da casa

Entrar no evento falando a língua da Secretaria vale meia hora de rapport:

- **GET — Ginásio Educacional Tecnológico**: o carro-chefe. 314 unidades e 132 mil alunos em jul/2026; metas de **350 GETs / 150 mil alunos até fim de 2026** e **500 GETs até 2028**. Vocabulário fixo: *STEAM*, *colaboratório*, *mão na massa*, *protagonismo estudantil*.
- **CRE** (1ª a 11ª): a unidade administrativa real.
- **EDI** (Espaço de Desenvolvimento Infantil): 290 unidades, 168 mil alunos na Educação Infantil.
- **Bora pra Escola**: busca ativa.
- **Rio Alfabetiza / Rio Alfabetiza+ em Rede**: meta de 100% alfabetizados até o 2º ano.
- **PPPS**: protocolo de segurança escolar.
- **Prova Rio**: avaliação somativa própria da rede, devolutiva pela plataforma *Rioeduca Em Ação*.
- **Marcas aposentadas:** "Escolas do Amanhã" (2009-2016) e "Ginásio Carioca" sumiram da comunicação. Não as cite como política atual — foram substituídas por GET e "Fábrica de Escolas".

### 4.2 O gap entre o divulgado e o relatado

| Tema | Prefeitura divulga | Dados/atores relatam | Contraponto |
|---|---|---|---|
| Climatização | 15 escolas sem ar (1%); 97,2% climatizadas; R$ 300 mi desde 2021 | **150 escolas** com problemas; aparelhos existem mas a rede elétrica não suporta a carga | SEPE, 25/02/2025 (~700 denúncias) |
| Creche | "25 mil novas vagas" | ~10 mil na fila; R$ 2 bi em multas | DPRJ, 27/09/2024 |
| Professores | Convocação de 600 professores + 1.000 agentes | Rede sustentada por temporários; MPRJ dá 90 dias | MPRJ, 27/01/2026 |
| Alfabetização | "100% até o 2º ano" | ICA 2025: **60%, abaixo da própria meta de 61%** | MEC, ficha RJ |
| IDEB | "Maior da história: 6,2" | Ensino Médio em retrocesso: 4,0 (2021) → 3,2 (2023), meta 5,2 | **Relatório PME 2025 (IPP)** |
| Tempo integral | Meta de 70% | 49% em 2024 — meta batida, mas era a de **2020** | Relatório PME 2025 |
| Valorização docente | "Valorização dos profissionais" | Meta 17 marcada como **"Dados insuficientes"** — literalmente não monitorada | Relatório PME 2025 |
| Formação docente | não divulgado | % com pós-graduação **caiu**: 31,3% (2022) → 30,2% (2024), meta 50% | Relatório PME 2025 |
| Violência | PPPS com UNICEF, ABIN, Cruz Vermelha | 583 escolas fechadas em 2025; 190 mil alunos com rotas interrompidas | Diário do Rio; UNICEF/Fogo Cruzado/UFF |

**Três padrões estruturais:**

1. **O contra-discurso mais forte é produzido pela própria Prefeitura.** O [Relatório de Monitoramento do PME 2025](https://educacao.prefeitura.rio/wp-content/uploads/sites/42/2025/12/Relatorio-de-Monitoramento-PME-2025.pdf) (IPP, out/2025) contradiz os releases em vários pontos e admite que a meta de valorização salarial não é acompanhada por falta de dados. **Citar o documento oficial da própria SME é infinitamente mais forte, num pitch, do que citar o sindicato.**
2. **Comunicação por estoque vs. realidade por fluxo.** A Prefeitura comunica acúmulo (nº de escolas, vagas criadas, GETs). A crítica opera sobre fluxo (dias de aula perdidos, fila que não zera, turma sem professor). 1.560 escolas existirem não responde a 583 delas terem fechado.
3. **A violência armada é o maior buraco da narrativa.** Tema com os melhores dados independentes e sistematicamente ausente da comunicação de conquistas. A resposta oficial é protocolar, não quantitativa.

### 4.3 Contexto político — mudou tudo em março de 2026

| Data | Evento |
|---|---|
| 01/02/2026 | **Eduardo Paes anuncia saída** da Prefeitura para disputar o governo do RJ (PSD) |
| 20/03/2026 | Paes **renuncia**; **Eduardo Cavaliere (PSD)**, vice, toma posse até 2028 |
| 30-31/03/2026 | **13 trocas no secretariado.** Sai **Renan Ferreirinha** (secretário desde 2021, candidato a deputado federal); entra **Hugo Ribeiro Nepomuceno** |
| 04/07/2026 | Início da janela de "defeso eleitoral" (art. 73, VI, "b") |
| 04/10 e 25/10/2026 | 1º e 2º turnos |

**Hugo Ribeiro Nepomuceno é perfil de continuidade, não de ruptura:** pedagogo e historiador, **ex-aluno da rede municipal**, professor há 21 anos, foi diretor de escola, coordenador regional e subsecretário. [SME — conheça a secretaria](https://educacao.prefeitura.rio/conheca-a-secretaria/).

**Duas implicações práticas para domingo:**

- **A comunicação não mudou de roteiro** — mesmos programas, mesmo formato de release, mesmos números-slogan. Mas 2026 tem **duas gestões no mesmo ano**; qualquer série temporal precisa de um corte em 20-31/03/2026.
- **A educação municipal virou plataforma de campanha estadual** (Paes é candidato a governador usando o legado educacional carioca). Isso aumenta o valor de verificação independente dos números — e aumenta a sensibilidade política de qualquer coisa que "exponha" a rede. **Enquadre achados como diagnóstico operacional para gestão, nunca como denúncia.** A banca tem gente da Secretaria.

---

## 5. Dados — o mapa verificado

Tudo abaixo foi testado por HTTP real em 26/08/2026. O que não abriu está marcado.

### 5.1 Top 8 para 8 horas

| # | Fonte | URL | Por quê |
|---|---|---|---|
| **1** | **Censo Escolar (INEP)** | `download.inep.gov.br/dados_abertos/microdados_censo_escolar_2024.zip` (33,8 MB) | Um CSV, **4.198 escolas do Rio**, 187 colunas (infra, `QT_SALAS_UTILIZA_CLIMATIZADAS`, matrículas, dependência). É a **tabela-dimensão de tudo**. Baixa em 1 min |
| **2** | **Escolas Municipais georreferenciadas (data.rio)** | `opendata.arcgis.com/api/v3/datasets/0a220ea7972449e39a28210dd317f636_1/downloads/data?format=csv` (197 KB, 1.590 linhas) | **Única forma de pôr escola no mapa.** Campos: `objectid, cre, designacao, denominacao, latitude, longitude, tipo` |
| **3** | **IDEB por escola 2025** | `download.inep.gov.br/ideb/resultados/divulgacao_anos_iniciais_escolas_2025.zip` (112 MB) | Série 2005–2025 por escola. É **a** variável-resposta |
| **4** | **Taxas de rendimento + INSE + TDI** | `download.inep.gov.br/informacoes_estatisticas/indicadores_educacionais/{ANO}/...` | Abandono (a métrica de evasão que existe), nível socioeconômico, distorção idade-série — todos por `CO_ENTIDADE` |
| **5** | **`limite_bairros` + Censo 2022 por bairro** | `services1.arcgis.com/OlP4dGNtIcnD3RYf/arcgis/rest/services/limite_bairros/FeatureServer/0` (162 bairros) | Fecha a dimensão território. Point-in-polygon resolve o pesadelo de nome de bairro |
| **6** | **Fogo Cruzado API v2** | `pip install crossfire[geodf]` · cadastro em `api.fogocruzado.org.br` | `format='geodf'` entrega GeoDataFrame para buffer de 300 m contra #2. **A narrativa mais forte, e ninguém publicou o cruzamento pronto** |
| **7** | **Rio+Transparente — despesa** | `riotransparente.rio.rj.gov.br/arquivos/Open_Data_Desp_2025.csv` (9,8 MB) | `Orgao=1601` = SME; unidades `16002`–`16012` = **CRE 1 a 11**. Eixo dinheiro × resultado com recorte territorial de graça |
| **8** | **Open-Meteo archive** | `archive-api.open-meteo.com/v1/archive?...&daily=apparent_temperature_max` | Sem chave; ~16 requests cobrem as 1.590 escolas. Eixo calor × escola quase de graça |

### 5.2 ⭐ O curinga: BigQuery público `datario`

Projeto BigQuery **`datario`** (repo dbt público: [prefeitura-rio/queries-datario](https://github.com/prefeitura-rio/queries-datario)). O `dbt_project.yml` traz como post-hook global:

```
GRANT `roles/bigquery.dataViewer` ON TABLE {{ this }} TO "specialGroup:allUsers"
```

**Dataset `datario.educacao_basica`** (fonte `rj-sme`, gestor SME) — 10 tabelas:

| Tabela | Conteúdo | Cobertura |
|---|---|---|
| **`escola`** ⭐ | `id_inep`, `id_designacao`, nome, tipo, endereço, **bairro**, CEP, **CRE**, polo, micro_area, `numero_salas_aula`, `numero_salas_utilizadas`, direção | mensal |
| **`frequencia`** ⭐⭐ | `id_escola, id_turma, id_aluno, data_inicio, data_fim, dias_letivos, tempos_letivos, faltas_global, id_disciplina, faltas_disciplina` | **desde 2012** |
| `movimentacao` | transferências, com deficiência, idade, gênero | desde 1973 (completo 2012+) |
| `avaliacao` | notas 0-10 por disciplina, por COC | anual |
| `dependencia` | espaços físicos por escola, área em m² e capacidade | — |
| `aluno`, `aluno_turma`, `aluno_historico`, `turma`, `coc` | — | — |

Também no mesmo lake: `administracao_servicos_publicos.chamado_1746` (**desde mar/2011, diário**, com `id_bairro`, lat/lon, `tipo`, `subtipo`, `status`) e `dados_mestres.bairro`.

> ⚠️ **Ressalva honesta e crítica.** Nenhuma query foi executada (sem credencial GCP no ambiente de pesquisa). Duas evidências puxam para lados opostos: o dbt concede leitura a `allUsers`, mas **apenas 2 tabelas do lake (ambas de clima) aparecem no catálogo DCAT público do data.rio**, e `educacao_basica` contém dado nominal de aluno sob LGPD.
>
> **Ação:** trate `escola` e `chamado_1746` como prováveis-públicas e **teste no minuto 1 do domingo**. Trate `aluno`/`frequencia` como provavelmente restritas e tenha plano B. Se `frequencia` abrir, o time tem uma tabela que nenhum concorrente tem. Contato SME para acesso: `nuno.silva@rioeduca.net`.
>
> **Não confunda** o projeto público `datario` com o data lake interno (`rj-sms`, `rj-iplanrio`), que exige IAM da Prefeitura.

**Tarefa de pré-evento (30 min, alto retorno):** criar um projeto GCP pessoal com billing e rodar `SELECT * FROM datario.educacao_basica.escola LIMIT 10`. Se funcionar, metade do trabalho de integração já está resolvido antes de o evento começar. Se não funcionar, você descobre isso na quinta, não às 9h de domingo.

### 5.3 🔑 A chave de join — o achado mais reaproveitável

**O problema:** o Censo Escolar tem `CO_ENTIDADE` mas **não tem coordenada** (o INEP removeu lat/lon do microdado público). O data.rio tem coordenada mas **não tem código INEP**. Aparentemente não há ponte.

Match por nome normalizado foi testado: **0 de 1.519 (0,0%)**. Os nomes são irreconciliáveis ("Escola Municipal Benjamin Constant" vs "EM BENJAMIM Constant").

**A ponte:** o INEP embute a designação da SME como prefixo de 7 dígitos no `NO_ENTIDADE`.

```
CO_ENTIDADE  NO_ENTIDADE
33062501     0101001 EM VICENTE LICINIO CARDOSO
33062420     0101004 EM BENJAMIM CONSTANT
33062412     0101803 EDI ANTONIO RAPOSO TAVARES
33062358     0101501 CIEP HENFIL
```

E `designacao` do data.rio é exatamente esse número sem o zero à esquerda.

```sql
regexp_extract(inep.NO_ENTIDADE, '^([0-9]{7})') = lpad(datario.designacao::text, 7, '0')
```

**Resultado medido: 1.545 de 1.555 unidades de ensino casam — 99,4%.** Sobram 10 (8 EM, 1 EDI, 1 Creche). Do lado do INEP, 1.551 dos 1.597 municipais têm o prefixo; os 46 sem prefixo são majoritariamente creches conveniadas.

Estrutura da designação: **`CRE(2) + microárea(2) + sequencial(3)`**, e a faixa do sequencial codifica o tipo (`001–499` ≈ EM, `500–599` ≈ CIEP, `800+` ≈ EDI).

**A mesma chave liga a fila de creche.** O `designacao` do ArcGIS (inteiro, ex. `101601`) casa com o código do XLSX de capacidade de creches (string zero-padded, `0101601`) — par confirmado: `101601` = "Creche Municipal Ladeira dos Funcionários" ↔ `0101601` = "CM LADEIRA DOS FUNCIONÁRIOS". Um `zfill(7)` cruza **geolocalização + capacidade por grupamento etário de toda a rede de creches**, o que dá um mapa de déficit de vagas por bairro em poucas horas. XLSX: `educacao.prefeitura.rio/wp-content/uploads/sites/42/2025/07/Capacidade-total-por-grupamento-11-07.xlsx`

**Se o BigQuery abrir**, `datario.educacao_basica.escola` já traz `id_inep` **e** `id_designacao` **e** `bairro` na mesma linha — use isso. A regex acima é o plano B que funciona só com arquivo aberto.

### 5.4 Armadilhas medidas (leia antes de escrever a primeira linha)

**1. Nunca joine por nome de bairro.** O `NO_BAIRRO` do Censo Escolar é texto livre: **238 valores distintos já normalizados** contra 162 bairros oficiais; **211 escolas (5,0%) não casam**. O mesmo bairro aparece como `ANIL`, `ANIL - JACAREPAGUA`, `ANIL / JACAREPAGUA`, `ANIL JACAREPAGUA`, `ANIL/JACAREPAGUA`. `FREGUESIA` é ambíguo (Ilha **ou** Jacarepaguá). `ILHA DO GOVERNADOR` é RA, não bairro. → **Point-in-polygon com a coordenada do data.rio contra `limite_bairros`.**

**2. Códigos de município divergem por fonte.**

| Fonte | Campo | Valor |
|---|---|---|
| INEP, SICONFI, IBGE, SIGEF | `CO_MUNICIPIO` / `id_ente` | `3304557` |
| **SIOPE OData** | `COD_MUNI` | **`330455`** (6 dígitos) |
| Portal da Transparência federal | código SIAFI | de-para obrigatório |

**3. Código de bairro IBGE ≠ código de bairro da Prefeitura.** `CD_BAIRRO` = `3304557001` (10 díg.) vs `CodBairro` = `13` (inteiro). **Sem relação.** Ponte só por geometria.

**4. Encoding é o inimigo nº 1, e não é uniforme nem dentro do mesmo órgão.**

| Fonte | Encoding | Sep. | Decimal |
|---|---|---|---|
| Censo Escolar, indicadores INEP | latin-1 | `;` | `.` |
| IBGE agregados CSV | latin-1 | `;` | `,` (nulo = `"."`) |
| IBGE malhas (DBF) | **UTF-8** | — | — |
| ISP-RJ | latin-1 **+ mojibake quádruplo** em `regiao` | `;` | `.` |
| Rio+Transparente `Desp` | **UTF-8** | `;` | — |
| Rio+Transparente `Contratos` | latin-1 | `;` | — |
| SIOPE OData | **UTF-8** | `,` | `.` |
| data.rio CSV | **UTF-8 com BOM** | `,` | `.` |
| data.rio ArcGIS `f=json` | **mojibake** — use o CSV | — | — |

> O caso do ISP-RJ merece destaque: `BaseDPEvolucaoMensalCisp.csv` tem "Grande Niterói" em duas formas (220 linhas latin-1 correto vs 2.610 linhas UTF-8 quadruplamente encodado), fazendo `unique()` retornar 5 regiões em vez de 4 e **quebrando `groupby` em silêncio**.

**5. Armadilhas de URL do INEP.** O microdado de 2025 é `microdados_censo_escolar_2025_.zip` — **com underscore final**; sem ele, 404. O INSE 2021 tem **dois underscores**. Não gere URL por template sem testar. Salto de 33 MB (2024) → **537 MB (2025)** sugere mudança estrutural.

**6. Temporal.** IDEB e SAEB são **bienais** (anos ímpares); INSE é irregular (2011-13, 2015, 2019, 2021, 2023); Censo Escolar e taxas de rendimento são anuais. Não monte série contínua sem `LEFT JOIN` a um calendário.

### 5.5 Fontes secundárias úteis

- **Diário Oficial do Município — Elasticsearch exposto, texto integral, sem auth:** `https://doweb.rio.rj.gov.br/busca/busca/buscar/{termo}/{pagina}` e `.../{termo}/{pagina}/di:YYYY-MM-DD/df:YYYY-MM-DD`. Devolve JSON cru com `_source.conteudo` = texto completo da página. Verificado: `SECRETARIA MUNICIPAL DE EDUCACAO` em 2026 = 68.058 hits. **Camada qualitativa barata** — bom insumo para um agente Claude que resume atos normativos.
- **SIOPE via OData (FNDE), sem cadastro:** `fnde.gov.br/olinda-ide/servico/DADOS_ABERTOS_SIOPE/versao/v1/odata/Despesas_Funcao_Educacao_Siope(...)`. `Num_Peri=6` (fechamento anual); `Num_Peri=0` devolve CSV vazio com HTTP 200. Rio 2024, subfunção 361: empenhado R$ 8,34 bi / liquidado 8,17 / pago 7,75; indicador MDE 2024 = **25,39%**.
- **IPP — tabelas históricas por bairro/RA** (`.xls` legado, precisa `xlrd<2.0`): IDEB por AP/RP/RA/Bairro 2007–2023 (item `9fd1a8cc207a48c5bda7131e4e74b1ca`), distorção idade-série 2000–2022, taxas de rendimento, alunos por turma.
- **ISP-RJ:** `ispdados.rj.gov.br/Arquivos/BaseDPEvolucaoMensalCisp.csv` (2003-01 → 2026-07, CISP × mês). CISP ≠ bairro; fronteiras mudam no tempo.
- **Base dos Dados (BigQuery):** `basedosdados.br_inep_ideb.escola`, `br_inep_censo_escolar.escola`. Gratuito, 1 TB/mês. ⚠️ `br_inep_catalogo_escolas` **não existe**; `br_inep_censo_escolar.matricula` tem **>90 GB** — sem `WHERE ano AND sigla_uf` você queima a cota numa query.
- **SIDRA/IBGE:** `apisidra.ibge.gov.br/values/t/9543/n6/3304557/v/all/p/all`. Tabelas úteis: 10058 (6–17 anos frequentando escola), 10057 (creche/pré-escola), 9886 (alfabetização em favelas). Para no município — nada intramunicipal.

### 5.6 Não gaste tempo com

Obras públicas (só Power BI embarcado) · **TCM-RJ** (nenhum dado aberto) · Observatório do PNE (**fora do ar**) · fila de creche (Power BI) · Busca Ativa Escolar (403, e a métrica vem do Censo reembalada) · `apitempo.inmet.gov.br/estacao/...` (204, rota morta — dezenas de tutoriais antigos vão fazer o time debugar à toa) · Catálogo de Escolas do INEP (só BI) · `Open_Data_Favorecidos.csv` (**5,5 GB**) · microdados SAEB (694 MB para pouco retorno — use o IDEB) · APIs `services.app.dados.rio` (**todas exigem JWT do Identidade Carioca**) · `dados.gov.br` API (401, exige chave) · `dadosabertos.mec.gov.br` (403) · QEdu API (**certificado TLS expirado**).

**Negativos confirmados no catálogo do data.rio** (2.054 datasets): "Prova Rio" → 0 · "fila creche" → 0 · "evasão" → 0.

---

## 6. Onde o repositório está e o que precisa mudar

`UFRJ-Analytica/hkt_claude_educacao` — **privado**, criado em 25/08/2026, produto **"Pulso da Rede"**, 2 commits, autor único (`lucasRLP`), zero issues, zero PRs, sem CI.

### 6.1 O que já existe e é bom

- **Fases 0 e 1 completas.** `GET /health`, `GET /api/v1/capabilities`, `ModuleRegistry` com composição explícita, contratos Pydantic congelados (`frozen=True`, `extra="forbid"`), erros sanitizados, CORS restrito, **34 testes**.
- **ADR-001 (modular monolith)** aceito, rejeitando microserviços e "LLM acessando banco diretamente".
- **Regra de honestidade codificada** — uma capability não-`AVAILABLE` é obrigada a declarar limitação. Isso é ótimo e deve sobreviver a qualquer simplificação.
- **Documentação de produto densa e coerente**: visão, 12 premissas com estado, matriz de 13 capacidades, personas, regras de negócio, roteiro de demo de 5 min com timeboxes, contratos de módulo, proveniência, privacidade.
- **Dois documentos de pesquisa próprios** — `hackathon_sme_rio_fontes_e_gaps.md` (infra da IplanRio, BigQuery, MCPs oficiais) e `pesquisa_agenda_recente_sme_rio_e_hipoteses_hackathon.md` (ranking de hipóteses). Este relatório **complementa**, não substitui: aqui está a camada factual com fontes datadas, o mapa de dados testado por HTTP e a chave de join.

### 6.2 Dívidas concretas a pagar antes de domingo

Estas não são hipóteses — são verificáveis no repositório hoje:

| # | Dívida | Custo se não pagar |
|---|---|---|
| 1 | **`.env.example` não é lido por nada.** `config.py` usa `env_prefix="PULSO_"`, mas o `.env.example` define `APP_ENV`, `CORS_ORIGINS`, `ANTHROPIC_API_KEY` **sem prefixo** — com `extra="ignore"`, são descartados em silêncio | 40 minutos às 14h de domingo, com a chave da API "configurada" e nada funcionando |
| 2 | **README contradiz o código** ("ainda não há backend", "repositório sem commits") e `docs/architecture/overview.md` idem | Quem clonar no domingo não sabe o que existe |
| 3 | **Matriz de capabilities divergiu do código.** `capabilities.md` lista `platform.*`, `map`, `agents.*` — nenhum existe em `composition.py`; o código registra `network` e `schools`, que não estão na matriz | O "parity audit" prometido já seria vermelho |
| 4 | **`network`/`schools` marcados `MOCK_ONLY` sem um único dado sintético** (`data/` só tem README) | Viola a própria regra de honestidade do projeto |
| 5 | **README publica caminho pessoal** (`C:\Users\lucas\documents\claude-educacao`) que nem corresponde ao nome do repo | Ninguém consegue seguir o README |
| 6 | **Sem `LICENSE`** | "As melhores soluções serão doadas para a cidade" — doar código sem licença é o único item da doação que **não** dá para resolver às pressas no fim do dia. **Resolva hoje** |
| 7 | **`grok_report.pdf` (3,1 MB) versionado sem proveniência**, enquanto `data/README.md` exige registro de origem/hash para qualquer fonte | Regra aplicada a dados, não a si mesma |
| 8 | **`SMALL_GROUP_SUPPRESSION_THRESHOLD=10` só existe como texto** — nenhuma supressão implementada, e a variável nem é lida (ver #1) | Se vier recorte de equidade com dado real, a proteção LGPD mais citada nos docs não existe |

### 6.3 As três lacunas estruturais

**Lacuna 1 — não há divisão de trabalho para quatro pessoas.** É a maior. O plano tem 10 fases fortemente **sequenciais** (Fase 3 "antes do Claude", Fase 4 antes dos módulos, Fase 7 depois de tudo). Num evento de um dia com time de quatro, isso serializa três pessoas atrás de uma. Não existe atribuição de owner, trilha paralelizável, nem contrato de fixture que permita o frontend começar antes do backend.

**Lacuna 2 — o frontend, que é o que a banca vê, tem 0% feito e é a fase mais longa.** A Fase 4 sozinha (Vite, Router, TanStack Query, cliente OpenAPI gerado, feature registry, design system com 8 componentes, Visão Geral, Escola 360) é provavelmente mais trabalho que tudo que existe hoje. Somada à Fase 6 (MapLibre com clusters, hover, filtros, legenda, deep link + Playwright), é irrealista para um dia partindo do zero.

**Lacuna 3 — "Claude central e demonstrável" é o requisito do evento e está na Fase 7, a penúltima.** Nem a porta de modelo nem o fake adapter existem. Se o dia acabar cedo, sobra um dashboard determinístico sem IA — exatamente o cenário que a pesquisa do próprio repositório alerta ser o pior. A ordem "determinístico primeiro, Claude depois" é tecnicamente correta e **estrategicamente arriscada** para este formato.

**Bônus — merge hotspot.** `composition.py` é o arquivo que **todo** módulo novo precisa editar. Composition root explícito é a decisão arquitetural certa e o pior ponto de conflito possível para quatro pessoas commitando em paralelo no mesmo `main`. Combine agora: **um dono do `composition.py`**, ou cada módulo se auto-registra por import.

**Nota lateral:** a org tem um `template-hackathon` (FastAPI + React/Vite + notebooks, `pip` + `requirements.txt`) que o `hkt_claude_educacao` não usa. A escolha por `uv` + arquitetura hexagonal é tecnicamente superior e descarta o único ativo pré-pronto da liga. Vale saber que o template existe, caso o dia desande e seja preciso um fallback conhecido.

---

## 7. Arquitetura recomendada — banco e backend simples, focados em feature

Esta seção responde diretamente ao pedido: **banco e backend relativamente simples, focados em features, para processar dados que vão para o front-end.**

### 7.1 O princípio

Em hackathon de um dia, a arquitetura não é escolhida pela qualidade em regime permanente — é escolhida por **quanto trabalho ela permite fazer em paralelo por hora de relógio**. Toda camada de indireção que você adiciona é paga quatro vezes: uma por pessoa.

A regra: **fatia vertical, não camada horizontal.** Cada pessoa é dona de um caminho completo (dado → endpoint → tela) e não espera artefato de ninguém.

### 7.2 A pilha

```
┌─ INGESTÃO ────────────────────────────────────────────────────────┐
│  scripts/ingest.py  — lê CSV/XLSX/Parquet desconhecido            │
│  scripts/profile.py — perfila schema, tipos, nulos, cardinalidade │
│                       e IMPRIME um relatório em markdown          │
└────────────────────────┬──────────────────────────────────────────┘
                         ▼
┌─ BANCO ───────────────────────────────────────────────────────────┐
│  DuckDB  — UM arquivo: data/pulso.duckdb                          │
│  INSTALL spatial; LOAD spatial;                                   │
│  read_csv_auto(..., encoding='latin-1', delim=';')                │
│  Sem servidor. Sem migration. Sem docker. Commitável se pequeno.  │
└────────────────────────┬──────────────────────────────────────────┘
                         ▼
┌─ BACKEND ─────────────────────────────────────────────────────────┐
│  FastAPI fino: rota → SQL parametrizado → Pydantic → JSON         │
│  Sem repositório, sem UoW, sem service layer.                     │
│  Views SQL nomeadas = a "camada de métricas".                     │
└──────────┬──────────────────────────────────┬─────────────────────┘
           ▼                                  ▼
┌─ CLAUDE ──────────────────┐   ┌─ FRONTEND ────────────────────────┐
│ Tools = os MESMOS         │   │ React 18 + Vite + TS              │
│ endpoints do backend.     │   │ TanStack Query + Recharts         │
│ Claude NUNCA vê SQL.      │   │ MapLibre GL só se houver mapa     │
│ Fallback determinístico   │   │ MSW com fixtures desde a 1ª hora  │
│ SEMPRE — Claude é aditivo,│   └───────────────────────────────────┘
│ nunca ponto de falha.     │
└───────────────────────────┘
```

### 7.3 Por que DuckDB e não Postgres

| Critério | DuckDB | Postgres |
|---|---|---|
| Setup | `pip install duckdb` | container, porta, senha, migration |
| Ler CSV latin-1 com `;` | `read_csv_auto(..., encoding='latin-1')` | `COPY` + tratamento prévio |
| Ler XLSX / Parquet direto | sim | não |
| Spatial (point-in-polygon, buffer) | `INSTALL spatial` — 1 linha | PostGIS, extensão, mais setup |
| Compartilhar o estado entre 4 pessoas | copiar 1 arquivo | dump/restore ou servidor comum |
| Concorrência de escrita | ruim | boa |
| Adequado ao caso | **analítico, leitura pesada, 1 escritor** | transacional |

O caso do hackathon é **analítico com um escritor** — exatamente o nicho do DuckDB. A premissa `P-007` do repositório já elegeu DuckDB + Parquet; a recomendação aqui é **radicalizar**: não coloque portas e adaptadores em volta dele no domingo. Se algum dia virar produto da Prefeitura, aí sim.

**SQLite** entra só se houver estado operacional a persistir (runs de agente, rascunhos de ação, aprovações). Dois arquivos, papéis distintos, zero conflito.

### 7.4 O modelo de dados

Star schema, grão `escola × indicador × tempo`. **Fato longo, nunca largo** — os indicadores do INEP chegam em cadências diferentes (IDEB bienal, INSE irregular, rendimento anual), e tabela larga vira campo minado de NULL.

```sql
-- ═══ DIMENSÕES ═══
CREATE TABLE dim_escola (
  co_entidade      BIGINT PRIMARY KEY,   -- código INEP — CHAVE CANÔNICA
  designacao_sme   CHAR(7),              -- '0101001' — só caminho de entrada
  nome             TEXT,
  tp_dependencia   SMALLINT,             -- 1 fed 2 est 3 mun 4 priv
  tipo_sme         TEXT,                 -- EM / CIEP / EDI / Creche
  cre              SMALLINT,             -- 1..11
  cod_bairro       INTEGER REFERENCES dim_territorio,  -- via point-in-polygon
  latitude DOUBLE, longitude DOUBLE,     -- do data.rio, NÃO do INEP
  geom             GEOMETRY(Point, 4674)
);

CREATE TABLE dim_territorio (
  cod_bairro INTEGER PRIMARY KEY,        -- CodBairro do data.rio
  bairro TEXT, cod_ra SMALLINT, ra TEXT,
  cod_rp TEXT, rp TEXT, cod_ap SMALLINT,
  cd_bairro_ibge CHAR(10),               -- de-para manual, NÃO derivável
  geom GEOMETRY(MultiPolygon, 4674)
);

CREATE TABLE dim_tempo      (ano SMALLINT PRIMARY KEY, tem_saeb BOOLEAN, tem_inse BOOLEAN);
CREATE TABLE dim_indicador  (id_indicador TEXT PRIMARY KEY, nome TEXT, unidade TEXT,
                             fonte TEXT, direcao SMALLINT);  -- +1 maior=melhor

-- ═══ FATOS ═══
CREATE TABLE fato_indicador_escola (
  co_entidade BIGINT, ano SMALLINT, id_indicador TEXT,
  etapa TEXT,                            -- 'AI' | 'AF' | 'EM' | NULL
  valor DOUBLE,
  PRIMARY KEY (co_entidade, ano, id_indicador, etapa)
);

CREATE TABLE fato_indicador_territorio (
  cod_bairro INTEGER, ano SMALLINT, id_indicador TEXT, valor DOUBLE,
  PRIMARY KEY (cod_bairro, ano, id_indicador)
);

CREATE TABLE fato_evento_geo (           -- Fogo Cruzado, 1746, clima
  id_evento TEXT PRIMARY KEY, fonte TEXT, data_hora TIMESTAMPTZ,
  latitude DOUBLE, longitude DOUBLE, geom GEOMETRY(Point, 4674),
  cod_bairro INTEGER,                    -- via ST_Contains, nunca por nome
  tipo TEXT, subtipo TEXT, atributos JSON
);

CREATE TABLE ponte_escola_evento (       -- materialize o buffer UMA vez
  co_entidade BIGINT, id_evento TEXT, distancia_m DOUBLE,
  PRIMARY KEY (co_entidade, id_evento)
);

CREATE TABLE fato_orcamento (            -- Rio+Transparente
  ano SMALLINT, orgao INTEGER,           -- 1601 = SME
  unidade_orcamentaria INTEGER,          -- 16002..16012 -> CRE 1..11
  cre SMALLINT, natureza_despesa TEXT,
  empenhado NUMERIC, liquidado NUMERIC, pago NUMERIC
);
```

**Cinco decisões que economizam horas:**

1. **`co_entidade` é a chave canônica.** `designacao_sme` é só o caminho de entrada dos dados da Prefeitura — converta na ingestão e nunca joine por ela depois.
2. **`cod_bairro` é sempre derivado de geometria**, nunca de string. Rode o `ST_Contains` uma vez na ingestão e materialize.
3. **`ponte_escola_evento` pré-computa o buffer de 300–500 m.** É a junção mais cara e a mais reusada; calcular na hora do dashboard mata a demo.
4. **`fato_orcamento` não liga a escola, só a CRE.** A SME não publica execução por unidade escolar. Não force — junte por `cre` em `dim_escola`.
5. **Se o briefing trouxer um dataset inesperado**, ele entra como `fato_indicador_escola` (se tiver código de escola) ou como nova dimensão. O schema absorve sem refatoração.

### 7.5 A camada Claude — ligada desde a primeira hora

**Inverta a ordem do plano atual.** Não é "determinístico completo, depois Claude". É "**uma** métrica determinística, **um** endpoint, **uma** tool, **uma** tela — na primeira hora e meia" e depois se replica o padrão.

Regras que devem sobreviver (são boas e estão certas no repositório):

- **Números vêm de SQL, nunca do LLM.** Claude interpreta, prioriza, escreve — não calcula.
- **Claude não vê banco nem SQL arbitrário.** As tools são os mesmos endpoints que o frontend consome. Se um endpoint existe, virar tool custa minutos.
- **Fallback determinístico sempre.** Todo agente calcula uma resposta a partir dos dados brutos **antes** de chamar a API. Se a chamada falhar ou a chave faltar, a aplicação devolve JSON válido. *Claude é aditivo, nunca ponto de falha* — foi assim no CIVITAS e funcionou.
- **Toda afirmação cita evidência**: escola, indicador, período, cobertura. E admite lacuna quando o dado não permite.
- **Coexistência nunca é descrita como causalidade.** Se o painel mostra tiroteio perto de escola com queda de frequência, o texto diz "coincide com", não "causou". Isso não é preciosismo acadêmico: é o que separa uma ferramenta que a Secretaria adota de uma que ela precisa desmentir.

**Conjunto mínimo de tools (4, não 14):**

| Tool | Faz |
|---|---|
| `get_network_snapshot` | Panorama da rede ou de uma CRE, com cobertura de dados |
| `get_school_profile` | Escola 360: indicadores, série, pares comparáveis |
| `check_data_quality` | Cobertura e limitações do que está carregado |
| `attach_evidence` | Devolve as linhas que sustentam uma afirmação |

As 14 do plano são o alvo de produto. Quatro são o alvo de domingo. Se sobrar tempo, `prepare_meeting_draft` é a quinta, porque fecha a demo com uma entrega concreta — foi o que mais impressionou no Impact Lab #1.

---

## 8. Plano de execução no domingo

### 8.1 Cronograma reverso (a partir do prazo, não do início)

Janela do evento: **08h–20h**. Assumindo abertura/briefing ~08h30–09h30 e pitches a partir das ~17h30, o tempo real de construção é de **~7h**, não 12.

| Hora | Marco | Regra |
|---|---|---|
| 09:00 | Briefing recebido | — |
| **09:30** | **Playbook de briefing concluído** | Ver §8.2. Nenhuma linha de código antes disso |
| 10:30 | **Dados brutos carregados no DuckDB + perfil de schema impresso** | Gargalo absoluto. Prioridade máxima |
| 11:00 | **Primeira fatia vertical viva**: 1 métrica → 1 endpoint → 1 tela → 1 tool Claude | Prova que o caminho inteiro funciona |
| 13:00 | Segunda e terceira fatias; mapa se e só se houver dimensão territorial | — |
| 15:00 | **Congelamento de features** | Nada novo entra depois. Só polimento, dado e narrativa |
| 16:00 | Demo ensaiada de ponta a ponta, com API desligada uma vez para testar o fallback | — |
| 16:30 | Pitch ensaiado, cronometrado | — |
| 17:00 | **Congelamento de código.** README, LICENSE, pacote de doação prontos | — |
| 17:30 | Pitch | — |

**Critério de sucesso, acordado por todos antes de codar:** *"ter uma demo de 5 minutos que roda de ponta a ponta com dados reais do briefing, com Claude visível, e que continua rodando com a API desligada."*

### 8.2 Os primeiros 30 minutos (playbook de briefing)

Ordem literal, do plano do repositório e vale a pena manter:

1. Registrar o problema e a persona, por escrito, em uma frase cada.
2. **Perguntar os critérios da banca e o tempo de pitch.** Anotar os pesos.
3. Inventariar os arquivos entregues: nome, tamanho, formato, encoding, nº de linhas.
4. Classificar PII — o que não pode aparecer em tela nem ir para o Claude.
5. Rodar o perfilador de schema (§8.4) e ler o relatório.
6. Validar o mapeamento com uma pessoa humana da organização, se houver mentor.
7. **Escolher UM módulo profundo.** Desabilitar o resto.
8. Adaptar o roteiro de demo de 5 min ao problema real.

Perguntas para a organização na abertura, escritas antes: **critérios e pesos**; **tempo de pitch**; **se pode usar dado externo** (INEP, Fogo Cruzado, data.rio); **se há acesso a BigQuery/MCP da Prefeitura**; **o que pode aparecer em tela** (LGPD); **formato exato da submissão**.

### 8.3 Divisão para quatro pessoas — fatias verticais

Preencha os nomes hoje, não domingo.

| Pessoa | Fatia | O que entrega sozinha, sem esperar ninguém |
|---|---|---|
| **P1 — Dados** | Ingestão + modelo | Perfilador, carga no DuckDB, `dim_escola` + `dim_territorio` + o join do §5.3, views de métrica |
| **P2 — Backend + Claude** | API + agentes | Endpoints sobre as views, as 4 tools, o fallback determinístico, o prompt |
| **P3 — Frontend** | Telas | Casca, navegação, Visão Geral, Escola 360, gráficos. **Começa com MSW e fixtures na hora zero** — não espera o backend |
| **P4 — Produto + pitch** | Narrativa e entrega | Contexto do problema, roteiro de 5 min, slides, README, LICENSE, pacote de doação, **e é o dono da submissão** |

**Regras de sincronização:**

- **Contrato de fixture antes de qualquer código.** P2 e P3 acordam o JSON de cada endpoint na primeira meia hora e escrevem o fixture. P3 desenvolve contra o fixture; a integração é troca de URL.
- **Um dono do `composition.py`** (P2), ou auto-registro por import. É o merge hotspot.
- **Sincronização de 5 minutos a cada 90 minutos.** Em pé. Só: o que travou.
- **P4 é dono da entrega.** É a tarefa que todo mundo assume que outra pessoa está fazendo — e é a que faz o time perder por não submeter a tempo.

### 8.4 O que construir ANTES de domingo

Ordem de prioridade. Nada aqui depende de saber o briefing.

| # | Item | Por quê | Esforço |
|---|---|---|---|
| 1 | **Perfilador de schema** — recebe qualquer CSV/XLSX, imprime colunas, tipos inferidos, % nulo, cardinalidade, amostra, encoding detectado, e **palpita chaves candidatas** | É o primeiro código que roda às 9h30. Ter isso pronto vale uma hora | 2h |
| 2 | **Corrigir a dívida #1** (`env_prefix` vs `.env.example`) e adicionar **LICENSE** | Bug que custa 40 min no pior momento; licença é requisito de doação | 20 min |
| 3 | **Testar `datario.educacao_basica` no BigQuery** com projeto GCP próprio | Se abrir, muda tudo. Descobrir quinta, não domingo | 30 min |
| 4 | **Baixar e cachear localmente** Censo Escolar 2024, escolas do data.rio, `limite_bairros`, IDEB 2025, taxas de rendimento | O wifi do evento vai estar saturado com 100 pessoas | 1h |
| 5 | **Construir `dim_escola` + `dim_territorio` já populadas**, com o join do §5.3 validado (99,4%) | Contexto territorial pronto, seja qual for o briefing | 2h |
| 6 | **Casca do frontend com MSW e fixtures** — navegação, layout, gráfico placeholder, tela de escola | É a lacuna estrutural nº 2. Zero risco de ser trabalho perdido | 3h |
| 7 | **Um agente Claude ponta a ponta** com 1 tool e fallback determinístico | É a lacuna nº 3. Prova o padrão que se replica no dia | 2h |
| 8 | **Cadastro na API do Fogo Cruzado** + `pip install crossfire[geodf]` + um pull de teste | Cadastro leva tempo; token expira em 1h e o backfill precisa de laço | 30 min |
| 9 | **Roteiro de demo de 5 min em branco**, com os slots já definidos | Só trocar o conteúdo no dia | 30 min |
| 10 | **README com instruções reais** e um `make setup` que funciona em máquina limpa | Quatro pessoas clonando às 9h | 40 min |

> Os itens 1, 6 e 7 são os que atacam as três lacunas estruturais do §6.3. Se só houver tempo para três coisas, são essas.

### 8.5 Hipóteses de desafio e o que muda em cada uma

O repositório já ranqueou hipóteses com pesos heurísticos. Cruzando com a pesquisa desta rodada:

| Hipótese | Prob. | O que a torna provável | Se for esta, o diferencial é |
|---|---|---|---|
| **Inteligência gerencial territorial** (priorizar escolas/CREs) | ~40% | É a estrutura de decisão real da SME; dados fortes; casa com o plano existente | Priorização **explicável** por fator, e o eixo violência × dias letivos que ninguém tem |
| **Aprendizagem / recomposição** | ~22% | Anos finais estagnados é a dor pedagógica nº 1 | INEP entrega tudo pronto: IDEB + TDI + INSE por escola. Comparação com **pares de mesmo INSE**, não ranking cru |
| **Frequência / abandono** | ~18% | Tema quente, mas **a SME já tem preditor premiado** | Só vale pelo ângulo territorial: falta causada por interrupção, não por vulnerabilidade familiar |
| **Infraestrutura / capacidade** | ~12% | Climatização e fila de creche são feridas abertas | `QT_SALAS_UTILIZA_CLIMATIZADAS` do Censo × Open-Meteo; e o join creche do §5.3 |
| **Intersetorial / inclusão** | ~8% | Dados fracos | Honestidade sobre a lacuna vale mais que número inventado |

**Em todas elas**, três ativos se aproveitam: `dim_escola` com geolocalização e CRE, a chave de join, e a casca de frontend. É por isso que o §8.4 prioriza esses três.

---

## 9. Riscos e mitigação

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Dataset do briefing sem código de escola, impossível de ligar ao INEP | média | Perfilador detecta na hora; plano B é análise só sobre o dataset entregue, com o contexto territorial como camada separada |
| BigQuery `educacao_basica` fechado | **alta** | Testar na quinta. Plano B são os arquivos abertos do §5.1 |
| Wifi saturado no evento | alta | Cachear tudo antes (item 4 do §8.4) |
| Time serializado atrás do pipeline de dados | alta se seguir o plano atual | Fixtures + MSW desde a hora zero |
| Créditos de API insuficientes ou API instável | média | Fallback determinístico obrigatório. Testar com a API desligada às 16h |
| Demo só com dado sintético | média | Rótulo permanente `DEMONSTRAÇÃO SINTÉTICA` na tela — é o que a regra de honestidade do repo já manda |
| Achado politicamente sensível na banca com gente da SME | média | Enquadrar como diagnóstico operacional, nunca denúncia. Citar o **Relatório PME da própria SME**, não o sindicato |
| Conflito de merge no `composition.py` | alta com 4 pessoas | Um dono, ou auto-registro |
| Não submeter a tempo | baixa mas fatal | P4 é dono nomeado da entrega |

---

## 10. O que fazer hoje (26/08), em ordem

1. **Circular este relatório** para os quatro do time. Cada pessoa lê a §3 (as frentes) e a §5 (dados) inteiras — é o contexto que compra a hora de vantagem.
2. **Fechar o time e os papéis** da tabela §8.3, com nomes.
3. **Abrir `LICENSE` e corrigir o `env_prefix`** — 20 minutos, remove a única dívida que não dá para resolver no domingo.
4. **Testar o BigQuery `datario`** — 30 minutos, informação de altíssimo valor.
5. **Distribuir os itens 1, 6 e 7 do §8.4** entre quinta e sábado. São as três lacunas estruturais.
6. **Registrar a competição na wikitica** (§11) — cinco minutos agora, memória da liga depois.

---

## 11. Plano de integração à wikitica

A wikitica está vazia de conteúdo (scaffold de 25/08/2026, zero páginas). Este é o primeiro material real a entrar, e vale fazê-lo dando o exemplo do padrão.

**Protocolo obrigatório antes de escrever** (`AGENTS.md`): ler `SCHEMA.md` → `index.md` → últimas entradas de `log.md`. Feito nesta sessão.

### 11.1 Ordem de escrita

**Passo 0 — `raw/`.** Copiar este relatório para `raw/2026/relatorio-claude-impact-lab-rio-educacao.md`. `raw/` é imutável: é o original que permite auditar toda a destilação. Nunca editar depois.

**Passo 1 — a competição.** `competitions/2026-08-claude-impact-lab-rio-2.md`, `status: stub`, com os fatos do §1. Preencher antes do evento custa cinco minutos; reconstruir depois custa a memória de todo mundo. `placement` e `award` ficam de fora até haver resultado.

**Passo 2 — as `sources`.** Uma ficha por fonte que sustenta afirmação não-óbvia:

| Arquivo | `source_type` | Cobre |
|---|---|---|
| `sources/unicef-fogocruzado-geni-percursos-interrompidos.md` | `paper` | Os números de violência × escola do §3.1 |
| `sources/sme-rio-relatorio-pme-2025.md` | `docs` | O contra-discurso oficial do §4.2 — a fonte mais forte do relatório |
| `sources/inep-microdados-educacionais.md` | `docs` | Censo Escolar, IDEB, taxas, INSE, TDI |
| `sources/datario-queries-datario.md` | `docs` | BigQuery público, `educacao_basica`, 1746 |
| `sources/fogocruzado-api-v2.md` | `docs` | API, auth, campos, limites |
| `sources/luma-claude-impact-lab-rio-2.md` | `article` | Regras e formato do evento |
| `sources/relatorio-analytica-educacao-rio-2026.md` | `article` | Este documento, com `raw:` apontando para o passo 0 |

**Passo 3 — os `topics`.** Granularidade fina, não uma página gigante. É o que torna a wiki consultável sob pressão.

| Arquivo | `area` | `level` | Núcleo |
|---|---|---|---|
| `topics/data/dados-abertos-educacao-rio.md` | `data` | `intro` | O mapa do §5.1 + o §5.6 (o que não usar) |
| `topics/data/join-escola-inep-designacao-sme.md` | `data` | `intermediate` | A chave do §5.3 — **a página mais reaproveitável de todas** |
| `topics/data/encoding-dados-publicos-br.md` | `data` | `intro` | A tabela do §5.4 |
| `topics/backend/duckdb-como-banco-de-hackathon.md` | `backend` | `intro` | O §7.3, com o comparativo |
| `topics/backend/star-schema-de-indicadores.md` | `backend` | `intermediate` | O §7.4 |
| `topics/backend/claude-como-camada-aditiva.md` | `backend` | `intermediate` | O §7.5: fallback determinístico, tools = endpoints, coexistência ≠ causalidade |

> Atenção ao `SCHEMA`: o campo `area:` de um `topic` aceita apenas `ml | stats | frontend | backend | data | viz` — **`agentic` existe como tag (`area/agentic`) mas não como valor do campo.** A página de agentes vai com `area: backend` e tag `area/agentic`.

**Passo 4 — as `recipes`.** Playbooks reaproveitáveis, com `problem` e `stack`:

- `recipes/perfilar-dataset-desconhecido.md` — o perfilador do §8.4, item 1. Serve a **qualquer** hackathon com dados revelados no dia.
- `recipes/geo-join-escola-evento-buffer.md` — buffer de 300–500 m materializado em `ponte_escola_evento`, com DuckDB spatial.
- `recipes/fatias-verticais-em-time-de-quatro.md` — o §8.3, incluindo o contrato de fixture e o merge hotspot.

**Passo 5 — `agentic-resources`.** `agentic-resources/mcp/prefeitura-rio-mcp.md`, `resource_kind: mcp`, `verdict: trial` — os servidores MCP oficiais da IplanRio mapeados no `hackathon_sme_rio_fontes_e_gaps.md` do repositório. Marcar explicitamente que **não foi testado**.

**Passo 6 — fechar.**

```bash
python tools/build_index.py
python tools/lint.py
```

Resolver todo erro. Depois, entrada no **topo** de `log.md`:

```
2026-08-26 · @carloshnp · research · competitions/2026-08-claude-impact-lab-rio-2, 7 sources, 6 topics, 3 recipes, 1 agentic-resource · relatório de preparação Claude Impact Lab Rio #2
```

**Passo 7 — depois do evento.** Rodar `analytica-wiki-retro` em até 48h. Um `retro` por pessoa, com `what_failed` preenchido de verdade — relatos divergentes sobre o mesmo evento são esperados e não devem ser reconciliados. Atualizar a página da competição com `placement`, `award` e `stack` realmente usada.

### 11.2 Regras que valem para cada página escrita

- **`status: draft`.** Só vira `reviewed` depois de leitura humana. Nenhuma página deste lote nasce revisada.
- **Mínimo 2 `[[wikilinks]]`.** Página sem ligação morre. A competição linka os topics e recipes; cada topic linka suas sources e os topics vizinhos.
- **Nada de tag inventada.** A taxonomia da §4 do `SCHEMA` é fechada. `domain/educacao` já existe; `tech/` e `domain/` aceitam slug novo, `area/`, `phase/` e `event/` não. Se faltar termo, editar o SCHEMA **no mesmo PR** que o usa.
- **Não fabricar.** Toda afirmação técnica não-óbvia aponta para uma `source`. As lacunas da §12 entram nas páginas **como lacunas** — página que admite incerteza vale mais que página que a esconde.
- **Commits convencionais.** `docs(wiki): registra Claude Impact Lab Rio #2 e destila pesquisa de educação municipal`.

---

## 12. Lacunas — o que NÃO foi encontrado

Declaradas para que ninguém refaça o mesmo caminho:

**Educação:**
- ICA 2025 específico do **município** do Rio (só o estado, 60%).
- Resultados publicados da **Prova Rio 2025**.
- Achados de auditoria do **TCM-RJ** sobre escolas municipais em 2025-2026.
- **Obras escolares paradas** nomeadas, com valores, no município.
- Dados de **afastamento por saúde mental** na SME-Rio (só contexto nacional).
- Denúncias sobre o **TEG** (transporte escolar gratuito) carioca em 2025-2026.
- **Merenda na rede municipal em 2025-2026** — esta é a maior lacuna. As fontes datadas de 2025 sobre merenda são da rede **estadual**; o dado que aponta o município como campeão de queixas é da Defensoria, mas de 23/07/2020.
- Existência de "Colégios do Amanhã" ou "Rio+Educação" como programas atuais — **não existem**; "Escolas do Amanhã" é 2009-2016.

**Dados:**
- **Não foi executada nenhuma query no BigQuery `datario`** — evidências conflitantes sobre se `educacao_basica` é público.
- Valores reais de `tipo`/`subtipo` de educação no **1746** (exigem query).
- Formato do arquivo de download do **QEdu** (site bloqueia bots).
- **PDDE/PNAE por escola** — nenhum endpoint aberto.
- **Fila de creche** como dado aberto — não existe, só Power BI.

**Comunicação:**
- **Comentários em redes sociais** — Instagram, X, Facebook, YouTube e Reddit bloqueados por login wall. Todo o contra-discurso deste relatório vem de sindicato, imprensa, Defensoria e Ministério Público, **não de cidadãos**. É um viés conhecido do material.
- Relatórios anuais da **Ouvidoria da SME**.

**Verificações pendentes:**
- Números 3.000/1.159/1.934 de agentes de apoio (§3.5) vêm de resumo indexado de O Globo de 25/05/2026 — confirmar na matéria original.
- A leitura de que a vedação eleitoral de publicidade institucional **não alcança** municípios em 2026 é provável, mas o texto primário (resolução TSE) não pôde ser conferido (tse.jus.br devolveu 403).

---

## 13. Fontes principais

**Evento:** [luma.com/claude-bcnp](https://luma.com/claude-bcnp) · [Prefeitura do Rio](https://prefeitura.rio/cidade/cidade-do-rio-recebe-segunda-edicao-brasileira-do-claude-impact-lab/)

**Violência × escola:** [Percursos Interrompidos (UNICEF/Fogo Cruzado/GENI-UFF) via Agência Brasil](https://agenciabrasil.ebc.com.br/educacao/noticia/2026-03/violencia-interrompe-transportes-e-afeta-acesso-educacao-no-rio) · [Diário do Rio, 26/11/2025](https://diariodorio.com/escolas-do-rio-de-janeiro-sofrem-com-o-impcato-das-operacoes-policiais) · [Brasil de Fato, 04/11/2025](https://www.brasildefato.com.br/2025/11/04/em-4-anos-mais-de-dois-tiroteios-por-dia-aconteceram-perto-de-escolas-no-rj-44-em-operacoes-policiais/) · [MPF-RJ — Resolução CNE/CEB 03/2026](https://www.mpf.mp.br/o-mpf/unidades/pr-rj/noticias/apos-atuacao-do-mpf-e-parceiros-cne-estabelece-diretrizes-nacionais-para-garantir-os-200-dias-letivos-em-escolas-afetadas-pela-violencia-armada)

**Indicadores e gestão:** [SME — IDEB 2025](https://educacao.prefeitura.rio/noticias/rio-alcanca-maior-ideb-da-historia-nos-anos-iniciais-e-esta-entre-as-capitais-que-mais-avancaram-no-pais/) · [Relatório de Monitoramento do PME 2025 (IPP)](https://educacao.prefeitura.rio/wp-content/uploads/sites/42/2025/12/Relatorio-de-Monitoramento-PME-2025.pdf) · [SME — abandono 2025](https://educacao.prefeitura.rio/noticias/rio-de-janeiro-registra-menor-taxa-de-abandono-escolar-da-historia/) · [MEC — ICA 2025, ficha RJ](https://www.gov.br/mec/pt-br/crianca-alfabetizada/monitoramento-e-avaliacao/indicador-crianca-alfabetizada-2025/arquivos/rio-de-janeiro-rj)

**Creche e inclusão:** [DPRJ — multa de R$ 2 bi](https://defensoria.rj.def.br/noticia/detalhes/29788-Vaga-em-creche-Justica-multa-Prefeitura-do-Rio-em-mais-de-R-2bi) · [DPRJ — recurso negado](https://defensoria.rj.def.br/noticia/detalhes/30136-RJ-Justica-nega-recurso-da-Prefeitura-e-manda-zerar-fila-de-creches) · [DPRJ — mediador escolar](https://www.defensoria.rj.def.br/noticia/detalhes/27166-dprjformularioeducacaopcd)

**Professores:** [Boletim SEPE nº 83, 18/08/2026](https://seperj.org.br/wp-content/uploads/2026/08/boletim_83_redemunicipalrj_14h_web.pdf) · [MPRJ recomenda concurso](https://seperj.org.br/ministerio-publico-rj-recomenda-a-prefeitura-do-rio-concurso-para-professores/) · [Agência Brasil — PLC 186/2024](https://agenciabrasil.ebc.com.br/politica/noticia/2024-12/rio-aprova-pl-que-extingue-licenca-premio-e-muda-horario-de-professor)

**Política:** [CartaCapital — renúncia de Paes](https://www.cartacapital.com.br/politica/eduardo-paes-renuncia-a-prefeitura-do-rio-para-disputar-governo-do-estado/) · [Diário do Rio — 13 trocas no secretariado](https://diariodorio.com/prefeitura-do-rio-tem-13-trocas-no-secretariado-apos-saida-de-pre-candidatos/) · [SME — conheça a secretaria](https://educacao.prefeitura.rio/conheca-a-secretaria/)

**Dados:** [INEP dados abertos](https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos) · [prefeitura-rio/queries-datario](https://github.com/prefeitura-rio/queries-datario) · [docs.dados.rio/llms.txt](https://docs.dados.rio/llms.txt) · [API Fogo Cruzado v2](https://api.fogocruzado.org.br/docs) · [ISP Dados RJ](https://www.ispdados.rj.gov.br/) · [Rio+Transparente](https://riotransparente.rio.rj.gov.br/) · [SME Transparência-Creches](https://educacao.prefeitura.rio/transparenciacreches/)

**Precedente interno:** `D:\Programming\claude_hackaton_24052026\RESEARCH.md` (Claude Impact Lab Rio #1) · `UFRJ-Analytica/hkt_claude_educacao` (privado) — `README.md`, `.hermes/plans/2026-08-26_152831-pulso-rede-arquitetura-modular-agentes.md`, `hackathon_sme_rio_fontes_e_gaps.md`, `pesquisa_agenda_recente_sme_rio_e_hipoteses_hackathon.md`

---

*Relatório produzido em 26/08/2026 por pesquisa paralela de cinco agentes, para a Analytica UFRJ. Status: `draft` — não revisado por leitura humana.*
