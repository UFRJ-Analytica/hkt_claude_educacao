# Política do diretório de dados

A Etapa 2 inclui catálogos e cenários YAML versionados. Os fatos Parquet continuam locais,
regeneráveis e ignorados pelo Git.

## Zonas futuras

- `catalog/`: metadados e registro de fontes revisados, sem linhas pessoais;
- `reference/`: somente referências públicas aprovadas, com licença/origem;
- `scenarios/`: definições versionáveis de cenários sintéticos, sem PII;
- `generated/`: Parquet, DuckDB e resultados regeneráveis; ignorado pelo Git;
- `official/`: releases locais curadas e content-addressed publicadas pelo time de dados; ignoradas pelo Git e consumidas pelo backend somente em leitura;
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

`uv run python -m scripts.generate_mock` (em `backend/`) gera seis Parquets agregados em
uma release imutável sob `data/generated/releases/`. `data/generated/current.json` é o único
ponto de promoção: ele é substituído atomicamente somente depois da validação da release
completa. Leitores internos resolvem esse ponteiro uma vez por instância e, durante uma nova
geração, continuam vendo integralmente a release anterior ou passam a ver integralmente a nova;
não dependem de symlink e nunca combinam arquivos de releases diferentes. Releases antigas são
mantidas para leitores concorrentes já ativos e podem ser removidas apenas com política explícita
de retenção. Seed + versão do cenário determinam linhas, bytes e SHA256; cada release contém seu
`manifest.json`.
Escolas usam IDs, nomes e coordenadas sintéticos plausíveis do município; não há nome, CPF,
endereço ou coordenada de aluno. Cenários codificam correlações narrativas, nunca causalidade.

## Remoção e incidente

A exclusão segue owner, finalidade e prazo registrados. Em vazamento, interromper processamento e seguir [privacidade e segurança](../docs/architecture/privacy-and-safety.md). Proveniência completa está em [data-provenance](../docs/architecture/data-provenance.md).
