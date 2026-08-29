# Regras de negócio

## Indicadores e evidências

1. KPI é calculado deterministicamente, com fórmula versionada; LLM não calcula nem corrige números.
2. Todo indicador carrega fonte, tipo de fonte, data de referência, cobertura, qualidade e limitações.
3. Ausência de dado não equivale a zero; baixa cobertura não equivale a piora.
4. Comparações exigem período, granularidade, denominador e cobertura compatíveis.
5. Grupos de pares devem ser simples e explicáveis; não produzir score único de “qualidade da escola”.
6. Correlação, sequência temporal ou coexistência não autorizam afirmação causal.

## Priorização

Sinais podem considerar gravidade, tendência, persistência, população potencialmente afetada e confiança/cobertura. Os componentes devem permanecer visíveis; um score não pode esconder qualidade insuficiente. Findings críticos de qualidade bloqueiam ou degradam o sinal.

## Frequência e aprendizagem

- distinguir frequência diária, por aula e acumulada;
- separar ausência justificada, não justificada e aula não lançada;
- informar cobertura de avaliações e não converter “não avaliado” em desempenho zero;
- segmentações com grupos pequenos são suprimidas;
- comparações longitudinais respeitam mudanças de instrumento, schema e população.

## Capacidade, mapa e alocação

- distância e disponibilidade são calculadas por código e possuem data de referência;
- cenários de vaga/transferência são simulações, nunca decisões efetivadas;
- o mapa usa localização de escola, nunca coordenada residencial de aluno;
- carência docente não implica automaticamente causa de resultado educacional.

## Agentes

- somente ferramentas registradas, versionadas e autorizadas por capability;
- sem SQL arbitrário, acesso direto ao banco, alteração da fonte ou ação externa no MVP;
- saída deve separar fatos, hipóteses, contra-hipóteses, perguntas e limitações;
- evidências citadas precisam existir e estar no escopo;
- dados insuficientes devem produzir resposta explícita, não preenchimento imaginado;
- ações definitivas e comunicações exigem aprovação humana registrada.

## Disponibilidade

Capacidades seguem exclusivamente os estados definidos em [capabilities](capabilities.md). A interface deve explicar indisponibilidade, degradação e origem sintética, sem tela vazia ou fallback enganoso.

## Privacidade

Aplicam-se minimização, finalidade, menor privilégio, pseudonimização quando indispensável e agregação por padrão. É proibido persistir ou enviar ao modelo nome, CPF, NIS, filiação, endereço ou coordenada de aluno. Veja [privacidade e segurança](../architecture/privacy-and-safety.md).

## Governança de mudanças

Nova regra requer identificador/fórmula, fonte, owner, versão, testes e data de vigência. Alteração incompatível exige migração ou ADR. Exceções temporárias devem ter justificativa, responsável e expiração.
# Regras de dados da Etapa 2

- missing não é zero;
- cobertura abaixo de 100% exige limitação; abaixo de 80% degrada e abaixo de 50% bloqueia;
- observação degradada/bloqueada não pode ser interpretada;
- sinais de cenários sintéticos são correlações para demonstração, nunca causalidade;
- nenhum artefato sintético ou de controle contém PII de aluno ou profissional.
