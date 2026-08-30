import { Card, ListRow } from '../components';

/**
 * Papel professor — PREVIEW DE CONCEITO, deliberadamente não funcional.
 *
 * A tela existe para mostrar onde a IA entraria e sob quais limites, sem
 * simular um resultado que não temos como sustentar. Nenhum plano é gerado,
 * nenhum material é indexado e nenhum dado de aluno é lido: as fontes abaixo
 * aparecem com o estado real delas, que hoje é "não conectada".
 */

/** As quatro fontes que o RAG usaria. Ordinal é conteúdo: é a ordem de consulta. */
const SOURCES = [
  'Material didático adotado pela rede',
  'Matriz curricular e BNCC da etapa',
  'Desempenho agregado da turma',
  'Devolutiva da Prova Rio',
];

/**
 * Os limites. `✕` é recusa, `✓` é garantia — o glifo carrega a distinção
 * junto com a posição na lista, porque a leitura aqui é de contrato.
 */
const LIMITS: { mark: string; text: string }[] = [
  { mark: '✕', text: 'Nenhum score individual de aluno é exibido ou enviado ao modelo' },
  { mark: '✕', text: 'Nenhuma avaliação de desempenho do professor, direta ou derivada' },
  { mark: '✕', text: 'Grupos pequenos são suprimidos — turma com poucos alunos não é segmentada' },
  { mark: '✕', text: 'Nada de diagnóstico clínico, social ou familiar' },
  { mark: '✓', text: 'Toda sugestão cita o trecho do material que a sustenta' },
  { mark: '✓', text: 'O plano é rascunho: o professor edita, aprova ou descarta' },
];

/**
 * `.srcrow` é grade de três colunas (`.ico`, `.gr`, `.mt`), então o layout é
 * `cells`: em `stacked` o rótulo ganharia um invólucro e sairia da coluna que
 * `flex: 1` governa.
 */
const SRCROW_SLOTS = { leading: 'ico', label: 'gr', meta: 'mt' } as const;

export default function Professor() {
  return (
    <div>
      <div className="previewbar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5M12 16.5v.01" />
        </svg>
        <span>
          <b>Preview de conceito.</b> Nada nesta tela está implementado. Ela documenta onde a IA entraria
          para o professor e quais limites teria — última prioridade da escada de papéis.
        </span>
      </div>

      <div className="twocol">
        <Card
          variant="panel"
          title="Plano de aula com recuperação sobre material autorizado"
          subtitle="RAG restrito ao material que a rede já aprovou. O modelo não inventa currículo: ele recupera, cita a origem e propõe — o professor edita e decide."
        >
          {SOURCES.map((source, i) => (
            <ListRow
              className="srcrow"
              key={source}
              label={source}
              layout="cells"
              leading={i + 1}
              meta="não conectado"
              slots={SRCROW_SLOTS}
            />
          ))}

          {/* `mb-0!` porque `.panel .sub { margin-bottom: 14px }` está fora de
              camada e venceria qualquer utilitária sem `!`. */}
          <p className="sub mt-4 mb-0!">
            Saída esperada: objetivo da aula, sequência, atividade diferenciada por faixa de desempenho e
            os trechos do material que sustentam cada escolha — todos citáveis.
          </p>
        </Card>

        <Card
          variant="panel"
          title="Os limites, que são a parte difícil"
          subtitle="Este é o papel com maior risco de a ferramenta virar avaliação de pessoa. As regras abaixo não são preferência de design; saem direto das regras de negócio e da política de privacidade."
        >
          {LIMITS.map((limit) => (
            <ListRow
              className="srcrow"
              key={limit.text}
              label={limit.text}
              layout="cells"
              leading={limit.mark}
              slots={SRCROW_SLOTS}
            />
          ))}

          <p className="sub mt-4 mb-0!">
            <b>Família</b> fica fora do escopo até o evento: exigiria base legal, canal de comunicação e
            consentimento que não temos, e comunicação externa automática é proibida no MVP.
          </p>
        </Card>
      </div>
    </div>
  );
}
