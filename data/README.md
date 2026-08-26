# Política do diretório de dados

A Etapa 0 não inclui datasets, fixtures, catálogos ou dados gerados. Este arquivo sustenta o diretório e define o gate para etapas futuras.

## Zonas futuras

- `catalog/`: metadados e registro de fontes revisados, sem linhas pessoais;
- `reference/`: somente referências públicas aprovadas, com licença/origem;
- `scenarios/`: definições versionáveis de cenários sintéticos, sem PII;
- `generated/`: Parquet, DuckDB e resultados regeneráveis; ignorado pelo Git;
- `private/`, `personal/`, `raw/`: bloqueados para versionamento e não devem ser criados sem governança institucional.

Diretórios vazios não são criados antecipadamente. Cada diretório versionado deverá conter README ou artefato justificável.

## Nunca versionar

Dados pessoais ou sensíveis, arquivos recebidos do evento, uploads, bancos locais, CSV/XLSX/Parquet de fatos, chaves, tokens, logs, prompts/respostas brutas de modelo e tabelas de reidentificação. `.gitignore` é defesa adicional, não substitui revisão antes do commit.

## Checklist de entrada

1. confirmar finalidade, custodiante e condições/licença;
2. registrar origem, hash, recebimento, período, granularidade e retenção;
3. inventariar/classificar campos e eliminar os desnecessários;
4. separar identificadores e aplicar pseudonimização/agregação;
5. perfilar schema e qualidade em ambiente autorizado;
6. obter validação humana do mapeamento;
7. classificar proveniência e atualizar capability;
8. guardar fatos apenas em área local ignorada ou storage aprovado.

## Dados sintéticos

Geradores futuros aceitam seed e versão, são reprodutíveis, validam chaves/domínios, não geram nome/CPF/endereço/coordenada de aluno e rotulam outputs como `SYNTHETIC_SCHEMA_FAITHFUL` ou `SYNTHETIC_INFERRED`. Cenários podem codificar correlações narrativas, nunca alegações sobre a rede real.

## Remoção e incidente

A exclusão segue owner, finalidade e prazo registrados. Em vazamento, interromper processamento e seguir [privacidade e segurança](../docs/architecture/privacy-and-safety.md). Proveniência completa está em [data-provenance](../docs/architecture/data-provenance.md).
