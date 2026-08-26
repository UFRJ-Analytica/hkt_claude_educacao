# Privacidade e segurança

Diretrizes de alto nível para o MVP; não substituem avaliação jurídica, política institucional, RIPD ou acordo de tratamento quando exigidos.

## Princípios

Finalidade, necessidade/minimização, transparência, qualidade, segurança, prevenção, não discriminação, responsabilização e menor privilégio. Receber um campo não autoriza seu uso.

## Proibições do MVP

- persistir ou enviar ao provider nome, CPF, NIS, filiação, endereço ou coordenada residencial de aluno;
- gerar diagnóstico clínico/social/familiar ou risco individual opaco;
- usar SQL livre/modelo com acesso direto a bancos;
- registrar prompts/payloads brutos com dados pessoais;
- comunicar famílias ou efetivar decisão administrativa automaticamente;
- versionar arquivos pessoais, uploads, bancos locais, segredos ou payloads de modelo.

## Controles

- classificação de dados antes da ingestão;
- agregação por escola/turma e supressão de grupos pequenos (limiar configurável e documentado);
- pseudônimos somente quando indispensáveis, com chave separada e acesso restrito;
- autorização por papel e escopo SME/CRE/escola;
- segredos em ambiente local/secret manager, nunca no repositório;
- logs estruturados com redaction e erros sanitizados;
- criptografia e política de retenção/exclusão definidas antes de dados reais;
- revisão humana e trilha de justificativa;
- testes de vazamento em API, exportações, logs e contexto do modelo.

## Agentes

Contexto mínimo, tools allowlisted, limites de granularidade, output validado e evidências autorizadas. O sistema bloqueia envio ao modelo diante de possível PII. Auditoria não inclui raciocínio interno nem payload bruto; registra metadados, tool calls sanitizadas e decisões.

## Resposta a incidentes

Interromper processamento, preservar evidências técnicas sem ampliar exposição, notificar responsável institucional, revogar acesso/segredo, avaliar impacto e remover dados conforme política. Não registrar o próprio dado exposto no ticket ou log.

## Gate para dados do evento

Antes da carga: confirmar finalidade e condições de uso; inventariar campos; classificar sensibilidade; remover campos desnecessários; definir acesso/retenção; validar agregação e exportação; atualizar [premissas](../product/premissas.md) e [registro de proveniência](data-provenance.md).
