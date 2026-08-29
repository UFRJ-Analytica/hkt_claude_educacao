/**
 * Papel professor — PREVIEW DE CONCEITO, deliberadamente não funcional.
 *
 * A tela existe para mostrar onde a IA entraria e sob quais limites, sem
 * simular um resultado que não temos como sustentar. Nenhum plano é gerado,
 * nenhum material é indexado e nenhum dado de aluno é lido: as fontes abaixo
 * aparecem com o estado real delas, que hoje é "não conectada".
 */

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
        <section className="panel">
          <h4>Plano de aula com recuperação sobre material autorizado</h4>
          <p className="sub">
            RAG restrito ao material que a rede já aprovou. O modelo não inventa currículo: ele recupera,
            cita a origem e propõe — o professor edita e decide.
          </p>

          <div className="srcrow">
            <span className="ico">1</span>
            <span className="gr">Material didático adotado pela rede</span>
            <span className="mt">não conectado</span>
          </div>
          <div className="srcrow">
            <span className="ico">2</span>
            <span className="gr">Matriz curricular e BNCC da etapa</span>
            <span className="mt">não conectado</span>
          </div>
          <div className="srcrow">
            <span className="ico">3</span>
            <span className="gr">Desempenho agregado da turma</span>
            <span className="mt">não conectado</span>
          </div>
          <div className="srcrow">
            <span className="ico">4</span>
            <span className="gr">Devolutiva da Prova Rio</span>
            <span className="mt">não conectado</span>
          </div>

          <p className="sub" style={{ marginTop: 16, marginBottom: 0 }}>
            Saída esperada: objetivo da aula, sequência, atividade diferenciada por faixa de desempenho e
            os trechos do material que sustentam cada escolha — todos citáveis.
          </p>
        </section>

        <section className="panel">
          <h4>Os limites, que são a parte difícil</h4>
          <p className="sub">
            Este é o papel com maior risco de a ferramenta virar avaliação de pessoa. As regras abaixo não
            são preferência de design; saem direto das regras de negócio e da política de privacidade.
          </p>

          <div className="srcrow">
            <span className="ico">✕</span>
            <span className="gr">Nenhum score individual de aluno é exibido ou enviado ao modelo</span>
          </div>
          <div className="srcrow">
            <span className="ico">✕</span>
            <span className="gr">Nenhuma avaliação de desempenho do professor, direta ou derivada</span>
          </div>
          <div className="srcrow">
            <span className="ico">✕</span>
            <span className="gr">Grupos pequenos são suprimidos — turma com poucos alunos não é segmentada</span>
          </div>
          <div className="srcrow">
            <span className="ico">✕</span>
            <span className="gr">Nada de diagnóstico clínico, social ou familiar</span>
          </div>
          <div className="srcrow">
            <span className="ico">✓</span>
            <span className="gr">Toda sugestão cita o trecho do material que a sustenta</span>
          </div>
          <div className="srcrow">
            <span className="ico">✓</span>
            <span className="gr">O plano é rascunho: o professor edita, aprova ou descarta</span>
          </div>

          <p className="sub" style={{ marginTop: 16, marginBottom: 0 }}>
            <b>Família</b> fica fora do escopo até o evento: exigiria base legal, canal de comunicação e
            consentimento que não temos, e comunicação externa automática é proibida no MVP.
          </p>
        </section>
      </div>
    </div>
  );
}
