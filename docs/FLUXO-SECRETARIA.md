# Secretaria — fluxo da tela

Role `secretaria`. **Uma tela só**, para acompanhar como vão as inscrições e as
convocações na rede. Não decide nada, não edita nada: é tela de acompanhamento.

Design herda a role de inscrição (`styles.css`).

---

## A tela tem três estados, no mesmo lugar

| estado | como chega | o que muda |
|---|---|---|
| **Cidade** | entrada | mapa com as 11 CREs |
| **CRE** | filtro de CRE | zoom no território, creches coloridas por pressão |
| **Creche** | clique numa creche | painel lateral + creches vizinhas com vaga |

Não há tela de CRE. CRE é filtro.

---

## Topo — quatro números

Valem para o recorte atual (processo + CRE, se houver).

| número | cálculo |
|---|---|
| Inscritos | crianças distintas no processo |
| Em espera | crianças distintas com `situacao = 'Lista de espera'` |
| Convocações em aberto | chamadas ativas, dentro do prazo |
| Sem resposta | chamadas com prazo vencido e nenhum contato |

> Contar **criança distinta**, nunca linha de fila. Uma criança ocupa até cinco
> filas: a de 2025 tem 16.345 posições para 7.851 crianças.

---

## Filtros

| controle | opções |
|---|---|
| Processo | 2021 · 2022 · 2023 · 2024 · **2025** |
| CRE | **Todas** · 1 a 11 |
| Grupamento | **Todos** · Berçário · Maternal I · Maternal II |
| Turno | **Todos** · Integral · Parcial |

Trocar qualquer um refiltra os números, o mapa e a lista.

---

## Mapa

**Sem CRE selecionada:** as 11 CREs, cada uma com o número de crianças em espera.
Clicar numa CRE aplica o filtro.

**Com CRE selecionada:** zoom no território, cada creche vira um ponto.

- **Cor = pressão** (inscritos por vaga)
- **Tamanho = inscritos**

| pressão | cor |
|---|---|
| < 1 | `--ok` |
| 1 a 3 | `--a1` |
| > 3 | `--a3` |
| sem dado | `--void` |

```
pressao = criancas_distintas_1a_opcao / vagas_do_par
```

> **Vaga não existe explícita na base.** Usar `Confirmado` do par como proxy, e
> declarar isso na legenda: "crianças por vaga preenchida".

---

## Lista lateral

Creches do recorte, ordenadas por pressão decrescente.
Cada linha: nome · barra de pressão · inscritos · em espera.
Clique → estado Creche.

---

## Painel da creche

Abre à direita, sem trocar de página. Fecha com `Esc`.

**Conteúdo**

- Nome, designação, CRE, bairro
- Inscritos · em espera · vagas · pressão
- Tabela grupamento × turno: inscritos / espera / confirmados
- **Creches vizinhas com vaga** — nome, distância, vagas livres

**No mapa, ao abrir o painel**

1. A creche fica destacada.
2. Círculo tracejado de 2 km ao redor.
3. Linhas até cada creche vizinha com vaga, rotuladas `0,8 km · 24 vagas`.

> Só entra na lista a creche com **mesmo grupamento e mesmo turno**. Vaga de
> Berçário Integral não substitui Maternal I Parcial.

**Ação única:** `Ver perfil da creche` → abre a role `creche` em nova aba.

---

## Dados

| tabela | origem |
|---|---|
| `unidade` | xlsx de localização + Query D · join por `ltrim(unidade,'0')`, casa 852/872 |
| `par_oferta` | Query A — inscritos, espera, confirmados, vagas por unidade × grupamento × turno |
| `alternativa` | `par_oferta` + lat/long — vizinhas com folga no raio de 2 km |
| `chamada` | estado próprio da aplicação — alimenta os dois números de convocação |

## Endpoints

| método | rota |
|---|---|
| `GET` | `/api/v1/panorama?ano&cre&grupamento&turno` |
| `GET` | `/api/v1/unidades/{cod}` |
| `GET` | `/api/v1/unidades/{cod}/alternativas?grupamento&turno` |

---

## Aberto

1. **Definição de vaga** — proxy pela Query A hoje; cruzar
   `totalalunoscreche20NN.xlsx` se sobrar tempo.
2. **Microárea** — o shapefile do IPP está no repositório e é o recorte que a CRE
   usa de verdade. Fica de fora da primeira versão; entra como camada do mapa se
   houver tempo.

---

# Implementação (30/08/2026) — versão simples

Rota `/secretaria` (`frontend/src/screens/Secretaria.tsx`). Uma tela, sem edição:
quatro números do recorte (inscritos, em espera, convocações em aberto, sem resposta com
prazo vencido), filtros CRE / grupamento / turno, mapa com as creches coloridas por
**pressão** (inscritos ÷ matrículas confirmadas do par — proxy declarado), lista por pressão
e painel da creche (tabela grupamento × turno e **vizinhas com vaga** no mesmo par, 2 km).
"Ver perfil da creche" abre `/creche` já na unidade.

Dados: `mockPanorama` / `mockAlternativas` (`frontend/src/mocks/creche.ts`) sobre as contagens
reais do extrato (`unidades.generated.ts` / `inscritos.generated.ts`), risco do modelo e as
chamadas do perfil da creche. Backend: `GET /api/v1/panorama?cre&grupamento&turno` sob a
capacidade `fila` (fallback para o mock enquanto não existir). Sem filtro de processo/ano,
sem microárea, sem círculo/linhas no mapa — de propósito.
