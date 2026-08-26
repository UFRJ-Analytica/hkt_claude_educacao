# Hackathon Claude × SME-Rio — agenda recente, universo de dados e hipóteses priorizadas

> Pesquisa realizada em 25/08/2026 para complementar `hackathon_sme_rio_fontes_e_gaps.md` e `grok_report.pdf`. Este documento separa evidência oficial, inferência e lacunas. As probabilidades são **pesos heurísticos de priorização**, não estimativas estatísticas.

## 1. Conclusão executiva

A leitura mais robusta não é apostar desde já em um único programa ou dataset. O conjunto de evidências aponta primeiro para uma **camada gerencial de inteligência da rede**, capaz de integrar indicadores por escola, território e tempo, localizar onde a SME precisa olhar e permitir aprofundamento no domínio que o dataset do desafio privilegiar. Avaliação/frequência e o projeto Trilhas são a evidência pública mais concreta dessa necessidade, mas devem ser tratados como um módulo provável — não como o produto inteiro.

A formulação mais provável do problema é:

> Como dar à SME uma visão territorial, comparável e explicável da rede, permitindo identificar escolas e grupos que exigem atenção, entender os fatores associados e aprofundar rapidamente o módulo correspondente aos dados disponibilizados — com LGPD, rastreabilidade e decisão humana?

Ranking de hipóteses:

| Prioridade | Hipótese | Peso heurístico | Por que é provável |
|---|---|---:|---|
| 1 | **Inteligência gerencial territorial da rede, com módulos plugáveis** | 40% | O universo de dados e a agenda da SME são amplos; a necessidade comum é comparar escolas/CREs, priorizar atenção e aprofundar causas sem depender de um único dataset. |
| 2 | **Gestão de resultados de aprendizagem e recomposição** | 22% | O Trilhas é um precedente concreto de 2025; em 2026, a evidência mais atual é a operação em rede de atividades diagnósticas, resultados por aluno/turma e reuniões de gestão para resultados. |
| 3 | **Frequência, abandono e exclusão escolar** | 18% | Há dados detalhados, programa estruturante e KPI público, mas os resultados recentes já são muito positivos. |
| 4 | **Infraestrutura, capacidade, pessoal ou expansão dos GETs** | 12% | A expansão física/tecnológica é muito visível na comunicação recente e datasets internos podem deslocar o desafio para gestão operacional. |
| 5 | **Integração intersetorial, inclusão ou saúde escolar** | 8% | Tem alto valor e respaldo institucional, porém exige dados mais sensíveis e governança mais complexa. |

**Aposta recomendada para preparar o repositório:** um “radar gerencial da rede” com priorização contextualizada, comparação temporal e drill-down por escola. O mapa deve ser um componente opcional, ativado se o dataset e a decisão tiverem dimensão territorial relevante — não a interface obrigatória do produto. A arquitetura deve aceitar módulos de aprendizagem, frequência, matrícula/capacidade, infraestrutura, pessoal e inclusão. No evento, escolhe-se um módulo principal conforme o briefing/dataset; os demais permanecem como estrutura demonstrável, não como funcionalidades superficiais. IA deve explicar evidências, ajudar a investigar e preparar sínteses, nunca fabricar KPI, causalidade ou decisão automática.

### 1.1 Restrições confirmadas pelo anúncio do Claude Impact Lab Rio #2

O texto oficial do evento, fornecido pelo participante, muda a estratégia de preparação:

- trata-se de um **hackathon de um único dia**, não de uma contratação com escopo previamente conhecido;
- o problema é concreto e vem da SME, mas **briefing, datasets e critérios de avaliação só serão apresentados no dia**;
- haverá aproximadamente 100 participantes, em times de quatro — cerca de 25 propostas concorrentes;
- o evento aceita perfis não técnicos e recomenda times multidisciplinares;
- cada participante receberá créditos de API do Claude;
- as melhores soluções serão doadas à cidade e podem ter próximos passos após o evento;
- a parceria inclui SME e Secretaria de Desenvolvimento Econômico, além da Prefeitura e Anthropic.

Implicações práticas:

1. **Não pré-construir uma solução fechada para o Trilhas.** Preparar uma base adaptável a diferentes tabelas e problemas da SME.
2. **O uso do Claude precisa ser central e demonstrável.** Um dashboard convencional com chatbot decorativo tende a ter menor aderência ao formato do evento.
3. **O MVP precisa produzir valor em poucas horas.** Importação rápida, perfil automático do dataset, KPIs determinísticos, investigação assistida e narrativa de demonstração devem funcionar mesmo com dados desconhecidos.
4. **A interface deve ser compreensível por gestores e jurados não técnicos.** O fluxo decisório importa mais do que uma arquitetura excessivamente sofisticada.
5. **Doação exige continuidade mínima.** Código legível, configuração simples, rastreabilidade das respostas e ausência de dependência de dados pessoais no protótipo aumentam a chance de aproveitamento posterior.
6. **O mapa não deve ser pressuposto.** A visualização principal deve surgir da pergunta e da granularidade do dataset revelado no briefing.

A preparação mais defensável é, portanto, uma **plataforma fina de adaptação ao desafio**, e não um produto quase final baseado em uma previsão específica. Seu núcleo deve ser: contrato flexível de dados, camada determinística de métricas, componentes de visualização intercambiáveis e Claude operando como copiloto de investigação e síntese sobre evidências rastreáveis.

## 2. O que os documentos locais já diziam — e o que mudou

### 2.1 Pontos confirmados

Os dois documentos locais convergem em:

- infraestrutura municipal sólida: GCS, BigQuery, Prefect, dbt, catálogo, APIs e MCP;
- dados de matrícula, turma, avaliação, frequência e movimentação já disponíveis em alguma camada;
- forte lacuna entre armazenamento/processamento e produtos de dados consumíveis;
- oportunidade em risco de abandono, recomposição, equidade territorial e apoio à gestão;
- necessidade de sandbox agregado/anonimizado e governança LGPD;
- baixa probabilidade de uma proposta de tutoria direta irrestrita a crianças.

O `grok_report.pdf` conclui que o problema principal é “opacidade, desigualdade de maturidade e ausência de camada de produtos/agentes”, e propõe marts de abandono, recomposição e equidade, MCP especializado e ambiente controlado. Essa leitura continua útil.

### 2.2 Correção importante: agora há repositório dedicado da SME

O documento local afirma que a SME não tinha repositório dedicado público equivalente aos da Saúde. A pesquisa atual encontrou:

- `https://github.com/prefeitura-rio/pipelines_rj_sme`

Portanto, a assimetria SMS × SME não deve mais ser descrita como “zero repositório dedicado”. A formulação correta é:

- a SME **já possui pipeline dedicado público**;
- ainda há sinais de maturidade/catalogação incompletas: metadados defasados, modelos sem descrição e divergências entre legado e estrutura atual;
- a lacuna mais forte migra de “ausência de pipeline” para **descoberta, qualidade, semântica, produtos analíticos e consumo por usuários educacionais**.

## 3. Tamanho real do universo de dados educacionais

O Data Catalog ao vivo não pôde ser enumerado: o endpoint `https://data-catalog.iplan.dados.rio/` falhou durante a auditoria. Assim, a contagem abaixo usa os artefatos oficiais dbt/SQL como evidência técnica e não afirma que todos estejam publicados para qualquer usuário.

### 3.1 Núcleo conservador: 9 tabelas/modelos de Educação Básica

No pipeline atual da SME:

1. `educacao_basica__aluno`
2. `educacao_basica__aluno_historico_2025`
3. `educacao_basica__aluno_turma`
4. `educacao_basica__avaliacao`
5. `educacao_basica__coc`
6. `educacao_basica__dependencia`
7. `educacao_basica__escola`
8. `educacao_basica__frequencia`
9. `educacao_basica__movimentacao`

**Resposta curta à pergunta “quantas há além das quatro?”:** no núcleo atual verificável, são **9 no total, portanto 5 além de quatro**.

Fonte: `https://github.com/prefeitura-rio/pipelines_rj_sme/tree/main/queries/models/educacao_basica`

### 3.2 Universo técnico ampliado: 21 modelos SQL educacionais

Além dos 9 centrais:

- **Alocação (1):** `disciplinas_sem_professor`.
- **Avaliação (3):** `avaliacao_bimestral_2012_a_2019`, `avaliacao_bimestral_2021_a_2024`, `prova_rio`.
- **Frequência (8):** carga, dias de COC, frequência, número de aulas, turma e visões acumuladas de aluno/aula/frequência.

Total técnico: **21 modelos SQL**, ou até **17 além das quatro**, sujeito a publicação, materialização e permissões.

Não se deve somar o legado de `queries-datario`: ele contém 10 modelos sobrepostos, com renomeações e diferenças como `turma` e `aluno_historico`.

### 3.3 Sinais de lacuna de governança

- `metadata.json` ainda referencia nomes legados;
- há entrada `coc_test` sem modelo SQL correspondente;
- um modelo de frequência existe sem entrada no schema YAML;
- dois modelos de avaliação bimestral não têm descrição detalhada;
- “21 modelos” não significa 21 produtos independentes nem 21 tabelas públicas acessíveis.

Isso fortalece uma possível trilha de hackathon focada em **catálogo semântico, qualidade e consumo inteligente**, mas essa hipótese é menos aderente à comunicação pedagógica recente do que recomposição/frequência.

## 4. Atuações recentes da SME e da Prefeitura (maio–agosto de 2026)

### 4.1 IA, tecnologia e formação docente

**Futuro IA Lab / formação de professores**

- Em 22/05/2026, SME e ONG Recode divulgaram a formação de **82 professores** da rede em Inteligência Artificial.
- Os participantes eram ligados aos Ginásios Educacionais Tecnológicos e apresentaram projetos pedagógicos produzidos na formação.
- Evidência: IA já é vocabulário e ação concreta da SME, não apenas tema externo.
- Fonte: `https://educacao.prefeitura.rio/noticias/ong-recode-e-sme-formam-82-professores-da-rede-publica-em-inteligencia-artificial/`

**Expansão dos GETs**

- 22/05: dois GETs na Pavuna; rede chega a 310 GETs.
- 27/05: GET em Bangu; 311 unidades e mais de 131 mil estudantes em ensino inovador de tempo integral.
- 06/06 (publicado em 08/06): GET em Madureira; 312 unidades.
- 02/08 (publicado em 04/08): GET em Inhoaíba; capacidade para 720 crianças; rede passa a declarar 1.560 escolas.
- Comunicação recorrente: STEAM, programação, aprendizagem prática, tecnologia, inovação e preparação para IA.

Fontes:

- `https://educacao.prefeitura.rio/noticias/prefeitura-do-rio-inaugura-mais-dois-ginasios-educacionais-tecnologicos-na-pavuna-na-zona-norte/`
- `https://educacao.prefeitura.rio/noticias/prefeitura-do-rio-entrega-novo-get-na-zona-oeste-e-chega-a-311-unidades-na-rede-municipal/`
- `https://educacao.prefeitura.rio/noticias/prefeitura-do-rio-entrega-novo-ginasio-educacional-tecnologico-na-zona-norte-e-chega-a-312-unidades-na-rede-municipal/`
- `https://educacao.prefeitura.rio/noticias/prefeitura-do-rio-inaugura-novo-get-e-passa-a-ter-1-560-escolas-na-rede-municipal-de-ensino/`

### 4.2 Avaliação e recomposição

**Trilhas de Recomposição da Aprendizagem — precedente importante, não prioridade atual comprovada**

Embora lançado em 20/05/2025, é o antecedente institucional mais diretamente conectado a um hackathon de dados/IA:

- sistema IplanRio + SME integrado ao DiáRio;
- classificado como “urgente e prioritário” pela SME no início de 2025;
- desenvolvido em 45 dias;
- foco em Matemática e Língua Portuguesa;
- usa dados de erros/acertos por aluno em quatro simulados;
- promete intervenção direcionada, monitoramento contínuo e informação estratégica agregada.

Fonte: `https://iplanrio.prefeitura.rio/noticias/iplanrio-e-sme-lancam-o-projeto-trilhas-de-recomposicao-da-aprendizagem/`

A expressão “urgente e prioritário” aparece na notícia da **IplanRio**, referindo-se à classificação do módulo pela SME **no início de 2025**. A notícia da própria SME, publicada no mesmo dia, descreve a importância e as funcionalidades, mas não usa essa expressão. A busca pública realizada em agosto de 2026 não encontrou nova menção nominal ao Trilhas em notícias ou circulares de 2026. Portanto, não há base pública para afirmar que “Trilhas é prioridade hoje”; há base para tratá-lo como precedente relevante da estratégia de avaliação e recomposição.

**Evidência mais atual — Atividade Diagnóstica em Rede (ADR), agosto de 2026**

A Circular E/SUBE/CAV nº 08/2026, de 24/08/2026, orienta a ADR do 3º bimestre para estudantes do Ensino Fundamental. Ela cobre do 1º ao 9º ano e Carioca I/II, com Língua Portuguesa, Matemática e, conforme o ano, Ciências da Natureza e Ciências Humanas. A circular determina fluxo operacional de aplicação, cartões-resposta, leitura ótica/digitação, disponibilização em Rioeduca em Ação e GPÁgil, divulgação dos resultados por aluno e turma aos professores e uso em encontros pedagógicos. Também anuncia relatórios detalhados de níveis de aprendizagem. Isso comprova prioridade atual para **avaliação diagnóstica e gestão de resultados**, mas não prova que o módulo usado seja o Trilhas.

Fonte: `https://educacao.prefeitura.rio/wp-content/uploads/sites/42/2026/08/Circular-CAV-no-08-ADR3-2026.pdf`

**Avaliação como instrumento de gestão**

O portal da SME descreve avaliações e atividades diagnósticas como insumos para formular/monitorar políticas e redirecionar práticas pedagógicas. Aparecem o programa Ponto de Partida e atividade diagnóstica em rede no 3º bimestre de 2026.

Fontes de descoberta:

- `https://educacao.prefeitura.rio/?s=avalia%C3%A7%C3%A3o`
- `https://educacao.prefeitura.rio/?s=recomposi%C3%A7%C3%A3o`

### 4.3 Frequência e abandono

- Em 06/07/2026, a SME divulgou a menor taxa de abandono da série informada: **0,1% no Ensino Fundamental em 2025**.
- Anos Iniciais: 0,2% → 0,1%.
- Anos Finais: 0,5% → 0,2%.
- O Bora pra Escola permanece como política de enfrentamento da exclusão; em março de 2026 a SME declarou ter trazido **24 mil alunos** de volta desde 2023.

Fontes:

- `https://educacao.prefeitura.rio/noticias/rio-de-janeiro-registra-menor-taxa-de-abandono-escolar-da-historia/`
- `https://educacao.prefeitura.rio/?s=frequ%C3%AAncia`

Leitura: como o indicador melhorou muito, o desafio provável não é apenas “prever evasão”, mas **manter o resultado, encontrar os bolsões restantes e explicar quais intervenções funcionam para quais perfis/territórios**.

### 4.4 Inclusão, saúde e vulnerabilidade

- Projeto Visão Esperança: 73 estudantes atendidos com triagem, avaliação e óculos; relação explícita com desempenho escolar.
- GET IV Centenário, na Maré: finalista mundial em superação de adversidades, com maker, robótica, realidade virtual, STEAM, família e acompanhamento emocional.
- SME + UNESCO: cultura de paz, escuta e Justiça Restaurativa.
- EJA aparece em ações de inclusão e protagonismo.

Fontes:

- `https://educacao.prefeitura.rio/noticias/sme-amplia-doacao-de-oculos-para-alunos-da-rede-de-ensino-do-rio/`
- `https://educacao.prefeitura.rio/noticias/get-da-mare-e-finalista-do-premio-melhores-escolas-do-mundo-2026/`
- `https://educacao.prefeitura.rio/noticias/sme-rio-e-unesco-promovem-dialogo-sobre-cultura-de-paz-e-justica-restaurativa-nas-escolas/`

### 4.5 Alfabetização

- Em 24/04/2026, imediatamente antes da janela principal, o Rio recebeu pela segunda vez certificação Ouro no Selo Nacional Compromisso com a Alfabetização.
- Na janela maio–agosto, a alfabetização aparece mais como resultado/continuidade do que como novo lançamento isolado.

Fonte de descoberta: `https://educacao.prefeitura.rio/?s=alfabetiza%C3%A7%C3%A3o`

## 5. IDEB: resposta à pergunta original e atualização da agenda

### 5.1 IDEB 2023

Rede municipal do Rio:

- **Anos Iniciais: 6,0** em 2023, contra 5,4 em 2021.
- **Anos Finais: 5,2** em 2023, contra 5,0 em 2021.
- A SME apresentou ambos como maiores resultados da série histórica até então.
- A narrativa institucional atribuiu o avanço a combate à evasão, reforço escolar, olimpíadas de matemática, viagens educacionais, mais de R$ 500 milhões transferidos às direções e expansão das escolas tecnológicas/STEAM.
- As antigas projeções para 2021 eram aproximadamente 6,1 e 5,5; devem ser tratadas como referência histórica, não como “meta IDEB 2023”.

Fonte: `https://educacao.prefeitura.rio/noticias/cidade-do-rio-conquista-o-maior-crescimento-na-nota-do-ideb-no-pais/`

### 5.2 Atualização em 2026

Em 05/08/2026, a SME divulgou **IDEB 2025 de 6,2 nos Anos Iniciais**, crescimento informado de 14,8% desde 2021 e novo recorde.

Fonte: `https://educacao.prefeitura.rio/noticias/rio-alcanca-maior-ideb-da-historia-nos-anos-iniciais-e-esta-entre-as-capitais-que-mais-avancaram-no-pais/`

Implicação para o hackathon: a gestão tem um resultado positivo a sustentar e explicar. Portanto, ganham força soluções de **monitoramento causalmente humilde**: segmentar evolução, identificar lacunas persistentes, comparar intervenções sem confundir correlação com impacto e produzir evidência auditável.

## 6. Vagas, editais e sinais de capacidade tecnológica

### 6.1 O que foi encontrado

- Consulta Pública 01/2025 da IplanRio sobre requisitos para contratação de soluções de software/fábrica de software.
- Consulta Pública 002/2025 sobre SOC avançado, automação e resposta a incidentes.
- Projeto Trilhas construído internamente pela IplanRio em 45 dias.
- Em junho de 2026, IplanRio divulgou uso institucional de Gemini/Google Workspace, agente de IA no WhatsApp e reconhecimento em iniciativa internacional de IA para serviços públicos.

Fontes:

- `https://iplanrio.prefeitura.rio/consulta-publica-01-2025/`
- `https://iplanrio.prefeitura.rio/consultas-publicas/`
- `https://iplanrio.prefeitura.rio/noticias/iplanrio-vira-case-global-do-google-pela-segunda-vez-em-um-ano/`
- `https://iplanrio.prefeitura.rio/noticias/rio-lanca-agente-de-ia-no-whatsapp-para-conectar-cidadaos-a-servicos-publicos-e-combater-vulnerabilidades/`
- `https://iplanrio.prefeitura.rio/noticias/rio-e-reconhecido-globalmente-por-projeto-com-ia-e-reforca-papel-da-iplanrio-na-inovacao-publica/`

### 6.2 O que não foi encontrado

Não foi localizado, nos portais indexados da SME/IplanRio, concurso ou processo seletivo de 2025–2026 especificamente nomeado para cientista de dados, engenheiro de dados, IA ou desenvolvimento. Isso não prova inexistência no Diário Oficial ou LinkedIn; indica apenas que o sinal público mais forte é **contratação de soluções e execução por IplanRio/parceiros**, não recrutamento nominal.

Também não apareceu anúncio público nos portais contendo “hackathon”, “Claude”, “Anthropic” ou “Impact Lab”. Logo, o tema exato continua não confirmado.

## 7. Redes sociais: o que foi possível verificar

O portal oficial aponta estes canais:

- Instagram SME: `https://www.instagram.com/sme_carioca/`
- Facebook SME: `https://www.facebook.com/smecariocarj/`
- X/Twitter SME: `https://www.twitter.com/sme_carioca/`
- Instagram Prefeitura: `https://www.instagram.com/prefeitura_rio`
- Facebook Prefeitura: `https://www.facebook.com/PrefeituradoRio`
- X/Twitter Prefeitura: `https://twitter.com/Prefeitura_Rio`
- YouTube Prefeitura: `https://www.youtube.com/channel/UCBf3rlo_iHd4kRePPhFXDUQ`

O Instagram confirmou o perfil `@sme_carioca`, mas bloqueou a grade e os textos sem login. Facebook/X também não ofereceram uma varredura pública confiável nesta sessão. Para não fabricar conteúdo, o relatório usa as notícias oficiais — que são frequentemente espelhadas nas redes — e registra essa limitação. Não há alegação aqui de que todas as postagens recentes foram auditadas.

## 8. O que provavelmente será fornecido no hackathon

### Alta probabilidade

- recorte anonimizado/agregado de avaliação, turma e frequência;
- resultados de simulados/avaliações de Português e Matemática;
- identificadores de escola, CRE, ano/série e período;
- algum contexto do DiáRio/Trilhas;
- pedido de protótipo com Claude para interpretação/recomendação.

### Média probabilidade

- movimentações e histórico do aluno;
- Prova Rio e avaliações bimestrais históricas;
- dados territoriais/vulnerabilidade;
- sinais de professor/turma, inclusive disciplinas sem professor;
- integração com MCP BigQuery ou dataset controlado.

### Baixa probabilidade

- CPF, laudos, comunicações familiares ou dados de saúde individual identificáveis;
- acesso irrestrito ao Lake interno;
- decisão automática sobre aluno/professor;
- tutoria aberta sem controle institucional.

## 9. Proposta de ideia-base para o repositório

### Nome provisório

**Radar SME — inteligência territorial e explicável da rede**

### Fluxo principal

1. Ingesta de dados já fornecidos pelo desafio; não criar pipeline paralelo para sistemas internos.
2. Dimensão canônica de escola, CRE, território e tempo, com adaptadores para cada dataset.
3. Catálogo configurável de KPIs e priorização determinística de escolas/territórios que merecem investigação.
4. Claude transforma os sinais em:
   - resumo explicável;
   - perguntas que o gestor deve investigar;
   - hipóteses de investigação e plano de ação com evidências citadas;
   - comparação com pares adequados e alertas revisáveis;
   - comunicação adequada ao papel do usuário.
5. Painel com evolução, cobertura, incerteza, qualidade e trilha de auditoria.

### Guardrails

- nenhum diagnóstico clínico ou rótulo permanente;
- nunca usar LLM para calcular nota, frequência ou ranking: cálculos devem ser determinísticos;
- recomendações sempre ligadas a evidências e janela temporal;
- diferenciação entre correlação, associação e impacto causal;
- minimização de dados e perfis de acesso por professor/direção/CRE/SME;
- avaliação de equidade entre CREs, territórios e grupos sem expor indivíduos;
- registro do prompt, versão, dados utilizados e justificativa.

### MVP que maximiza aderência

- mapa interativo opcional, com cluster, filtros, hover e seleção de escola, quando a dimensão territorial for decisiva;
- visão temporal e comparação entre pares, evitando ranking bruto;
- um módulo aprofundado conforme o dataset do desafio;
- uma tela gerencial de priorização e uma tela de investigação/explicação;
- drill-down escola → indicador → série temporal → evidências;
- dataset sintético ou anonimizado com contrato substituível;
- métricas: precisão das regras, cobertura, estabilidade, taxa de revisão humana e utilidade percebida.

## 10. Perguntas decisivas quando sair o briefing

1. O dataset inclui itens/habilidades dos simulados ou apenas notas agregadas?
2. Há frequência diária, por aula ou somente acumulada?
3. O objetivo primário é professor, direção, CRE ou nível central?
4. Existe integração prevista com DiáRio/Trilhas ou o protótipo deve ser independente?
5. Claude poderá acessar BigQuery/MCP ou só arquivos locais?
6. Há identificadores longitudinais anonimizados?
7. Quais intervenções já são registradas, permitindo avaliar efeito?
8. Quais grupos sensíveis podem ser usados e em qual granularidade?
9. O critério valoriza impacto pedagógico, inovação com IA, qualidade técnica ou capacidade de implantação?
10. Há baseline obrigatório e avaliação humana por especialistas da SME?

## 11. Fontes técnicas principais

- Pipeline atual SME: `https://github.com/prefeitura-rio/pipelines_rj_sme`
- Modelos centrais: `https://github.com/prefeitura-rio/pipelines_rj_sme/tree/main/queries/models/educacao_basica`
- Avaliação: `https://github.com/prefeitura-rio/pipelines_rj_sme/tree/main/queries/models/educacao_basica_avaliacao`
- Frequência: `https://github.com/prefeitura-rio/pipelines_rj_sme/tree/main/queries/models/educacao_basica_frequencia`
- Legado: `https://github.com/prefeitura-rio/queries-datario/tree/master/models/educacao_basica`
- Catálogo: `https://data-catalog.iplan.dados.rio/`
- Portal SME: `https://educacao.prefeitura.rio/`
- Docs IplanRio: `https://docs.dados.rio/`

## 12. Confiança e limitações

- **Alta confiança:** existência e funções declaradas do Trilhas; resultados oficiais comunicados; expansão dos GETs; formação de 82 professores; existência do pipeline dedicado SME e dos modelos SQL.
- **Média confiança:** contagem de modelos como aproximação do universo interno; hipóteses temáticas e pesos; ausência de vagas específicas.
- **Baixa confiança:** formato exato, critérios e datasets do hackathon; publicação de todos os 21 modelos no catálogo; uso específico de Claude/Anthropic pela SME.
- **Limitações:** Data Catalog indisponível; repositório indicado pelo usuário retorna 404 sem autenticação pública e pode ser privado ou ter URL incorreta; redes sociais limitaram acesso sem login; não houve acesso a sistemas internos nem ao Diário Oficial completo.
