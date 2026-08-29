# Contrato da release de identidade escolar oficial

Status: contrato implementado; feed operacional ainda não conectado.

## Responsabilidade e boundary

O time/pipeline de dados é responsável por obter, licenciar, normalizar, validar e publicar o cadastro oficial. O backend é somente leitor da release curada. Ele não contém crawler, cliente de API externa, download, geocodificação ou transformação de fonte bruta.

A release fica localmente em `data/official/school_identity/` e não deve ser versionada. Somente este contrato, catálogo e testes sintéticos pertencem ao Git.

## Layout

```text
data/official/school_identity/
├── current.json
└── releases/
    └── <snapshot_id SHA-256>/
        ├── manifest.json
        └── school_identity.parquet
```

`current.json`:

```json
{"pointer_version":"1.0.0","release":"releases/<snapshot_id>"}
```

A release deve conter exatamente os dois arquivos governados acima. Symlinks, arquivos adicionais e caminhos fora de `releases/<snapshot_id>` são rejeitados.

## Schema Parquet exato

| Campo | DuckDB | Nulo | Regra |
|---|---|---:|---|
| `school_id` | `VARCHAR` | não | ID canônico estável; `[A-Za-z0-9][A-Za-z0-9._-]*`; máximo 128 caracteres; prefixo `SYNTHETIC-` proibido |
| `school_name` | `VARCHAR` | não | designação legível não vazia; nunca usada para resolver identidade |
| `inep_id` | `VARCHAR` | sim | exatamente 8 dígitos, preservando zeros à esquerda |
| `sme_designation` | `VARCHAR` | sim | exatamente 7 dígitos, preservando zeros à esquerda |
| `cre` | `INTEGER` | não | inteiro entre 1 e 11 |
| `neighborhood` | `VARCHAR` | sim | contexto descritivo; nunca usado para resolver identidade |
| `dependency` | `VARCHAR` | não | texto não vazio |
| `school_type` | `VARCHAR` | sim | tipo/designação institucional SME |
| `latitude` | `DOUBLE` | sim | `[-90, 90]`; deve coexistir com longitude |
| `longitude` | `DOUBLE` | sim | `[-180, 180]`; deve coexistir com latitude |

Cada linha precisa de ao menos um identificador institucional entre `inep_id` e `sme_designation`. `school_id`, INEP não nulo e designação SME não nula devem ser únicos em toda a release.

## Manifesto

Campos obrigatórios:

```json
{
  "manifest_version": "1.0.0",
  "snapshot_id": "<sha256>",
  "source_id": "official_school_registry",
  "source_kind": "REAL_PUBLIC",
  "as_of": "2026-08-30T00:00:00Z",
  "limitations": ["Cobertura operacional deve ser confirmada pela SME."],
  "files": {
    "school_identity.parquet": {
      "sha256": "<sha256 dos bytes do parquet>",
      "row_count": 1549,
      "schema": [{"name": "school_id", "type": "VARCHAR"}],
      "source_kind": "REAL_PUBLIC"
    }
  }
}
```

A lista `schema` deve conter todos os dez campos, na ordem da tabela deste documento. O exemplo foi abreviado apenas para leitura.

`snapshot_id` é o SHA-256 do JSON canônico do manifesto sem o próprio campo `snapshot_id`: UTF-8, chaves ordenadas, sem espaços e preservando caracteres Unicode. O diretório da release e o ponteiro devem usar exatamente o mesmo ID.

## Promoção

1. Publicar Parquet e manifesto em staging privado.
2. Validar schema, domínio, unicidade, row count e hashes.
3. Calcular `snapshot_id` e mover o staging para `releases/<snapshot_id>`.
4. Substituir `current.json` atomicamente somente após a release completa existir.
5. Preservar a release anterior durante a troca para leitores concorrentes.
6. Remover permissão de escrita do usuário do backend sobre releases promovidas; publicação ocorre por rename atômico no mesmo filesystem.
7. Registrar owner, licença, cobertura, período e limitações no catálogo.

O adapter lê os bytes por file descriptor, confirma SHA-256 e carrega uma tabela DuckDB privada em memória. Consultas usam apenas esse cache verificado; o pathname governado é revalidado antes e depois de cada lookup para detectar alteração operacional.

## Resolução no backend

A API aceita somente correspondência exata por:

1. `school_id`;
2. `inep_id`;
3. `sme_designation`.

Quando mais de uma chave é informada, todas devem apontar para a mesma escola. Chaves divergentes ou parcialmente incompatíveis retornam conflito. Ausência de correspondência não aciona busca aproximada. Nome, bairro, endereço e coordenadas são proibidos como fallback de identidade.

Endpoint: `GET /api/v1/schools/resolve`.

Sem release válida, a capability `school-identity` permanece `SCHEMA_ONLY` e o endpoint responde 503. O snapshot sintético do mapa não ativa nem preenche a identidade oficial.
