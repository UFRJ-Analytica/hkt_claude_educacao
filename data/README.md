# Política do diretório de dados

**Este diretório não guarda dado.** Ele guarda a regra sobre onde o dado pode
estar.

## Onde o dado da SME fica

O extrato da Inscrição Creche vem de
[`CIT-SME-RJ/dadoscreche`](https://github.com/CIT-SME-RJ/dadoscreche/) e é
clonado **fora deste repositório**:

```powershell
git clone https://github.com/CIT-SME-RJ/dadoscreche
```

O backend o lê somente em leitura, pelo caminho em `PULSO_DADOSCRECHE_ROOT`
(padrão `../dadoscreche`). Nenhum arquivo dele entra no Git — nem
descompactado, nem amostrado, nem convertido para Parquet.

Os dados são anonimizados pela SME (códigos artificiais para criança e
responsável, nascimento só em ano-mês, endereço só em bairro e CEP). Anonimizado
**não é** o mesmo que público: continua sendo dado de criança, e o repositório é
público.

## Nunca versionar

Dado pessoal ou sensível, arquivos recebidos do evento, uploads, bancos locais,
CSV/XLSX/Parquet/GZ de fatos, chaves, tokens, logs, prompts e respostas brutas de
modelo, e qualquer tabela que permita reidentificação.

`.gitignore` é defesa adicional, não substitui a revisão antes do commit. Rode
`make safety-check` e depois confira `git diff --cached --name-only`.

## Zonas, se um dia forem criadas

- `reference/`: apenas referências públicas aprovadas, com licença e origem;
- `private/`, `personal/`, `raw/`: bloqueadas — não devem ser criadas sem
  governança institucional.

Diretório vazio não é criado antecipadamente. Todo diretório versionado precisa
de um README ou de um artefato que se justifique.

## Checklist de entrada, para qualquer fonte nova

1. confirmar finalidade, custodiante e condições de licença;
2. registrar origem, hash, data de recebimento, período e granularidade;
3. inventariar campos e eliminar os desnecessários;
4. separar identificadores e aplicar pseudonimização ou agregação;
5. perfilar schema e qualidade em ambiente autorizado;
6. obter validação humana do mapeamento;
7. classificar a proveniência e atualizar a capability correspondente;
8. guardar os fatos apenas em área local ignorada ou em storage aprovado.
