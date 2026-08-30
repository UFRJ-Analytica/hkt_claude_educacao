# Proveniência — unidades.generated.json

- Gerado em: 2026-08-30T17:22:49+00:00
- Fonte: `rio-sme.sme_creche.inscricoes_completa`
- Query: `SELECT * FROM `rio-sme.sme_creche.inscricoes_completa` LIMIT 1000`
- Unidades: 352  ·  inscrições agregadas: 999

## Classificação por campo

### REAL (contagem/atributo verdadeiro sobre o extrato)
- id (unidade_codigo)
- lat/lon (cadastro Unidades_Unificadas)
- bairro (bairro_final)
- ofertas.grupamento
- ofertas.horario
- ofertas.inscritos
- ofertas.inscritosPrioritarios

### DERIVADO (calculado por código determinístico)
- cre (bairro-centroide mais próximo)
- ofertas.vagas (determinístico; a fonte não traz oferta)
- ofertas.vagasPrioritarias
- ofertas.demanda

### SINTÉTICO
- extrato inteiro é sintético (_synthetic=true)
- nome/tipo da unidade são rótulos (não há nome oficial na fonte)

> Estrutura fiel ao processo da SME; indivíduos e ofertas de vaga não representam a rede real. Dado sintético jamais apresentado como oficial.
