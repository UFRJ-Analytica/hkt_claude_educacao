import type { LessonDelivery } from '../api/types';

/**
 * A aula que chegou ao estudante.
 *
 * Separa quatro estados que a rede hoje soma num número só. A ordem da barra é
 * a ordem da perda: do previsto até o que de fato aconteceu com aluno presente.
 *
 * Regra de cor mantida: aula cancelada e aluno ausente pedem atenção e recebem
 * a rampa; aula não lançada é AUSÊNCIA DE INFORMAÇÃO e recebe hachura, nunca
 * cor — não sabemos se aconteceu.
 */
export default function AulaEntregue({ d, compact = false }: { d: LessonDelivery; compact?: boolean }) {
  const p = d.lessons_planned || 1;
  const presentes = Math.max(0, d.lessons_delivered - d.student_absences);
  const seg = (n: number) => `${(n / p) * 100}%`;

  return (
    <div className={`aula${compact ? ' compact' : ''}`}>
      {!compact && (
        <div className="aulahead">
          <div>
            <div className="k">Aula que chegou ao estudante</div>
            <div className="bignum">
              {(d.effective_rate * 100).toFixed(1).replace('.', ',')}
              <span>%</span>
            </div>
          </div>
          <p className="aulasub">
            de {d.lessons_planned.toLocaleString('pt-BR')} aulas previstas {d.scope_label}.
            O restante se divide entre aula cancelada, aula sem lançamento e estudante ausente — três
            coisas diferentes, com respostas diferentes.
          </p>
        </div>
      )}

      <div className="aulabar" role="img" aria-label="Decomposição da aula prevista">
        <span className="s presentes" style={{ width: seg(presentes) }} title={`Aula dada com presença: ${presentes}`} />
        <span className="s ausentes" style={{ width: seg(d.student_absences) }} title={`Aula dada, estudante ausente: ${d.student_absences}`} />
        <span className="s naolancada" style={{ width: seg(d.lessons_unlogged) }} title={`Aula prevista sem lançamento: ${d.lessons_unlogged}`} />
        <span className="s cancelada" style={{ width: seg(d.lessons_cancelled) }} title={`Aula cancelada: ${d.lessons_cancelled}`} />
      </div>

      <div className="aulalegend">
        <span>
          <i className="presentes" />
          aula dada, estudante presente <b>{presentes.toLocaleString('pt-BR')}</b>
        </span>
        <span>
          <i className="ausentes" />
          aula dada, estudante ausente <b>{d.student_absences.toLocaleString('pt-BR')}</b>
        </span>
        <span>
          <i className="naolancada" />
          prevista sem lançamento <b>{d.lessons_unlogged.toLocaleString('pt-BR')}</b>
        </span>
        <span>
          <i className="cancelada" />
          aula cancelada <b>{d.lessons_cancelled.toLocaleString('pt-BR')}</b>
        </span>
      </div>

      {!compact && (
        <p className="aulanote">
          <b>Por que separar.</b> Estudante ausente pede busca ativa. Aula cancelada é oferta
          interrompida e pede resposta de gestão. Prevista sem lançamento não diz se a aula aconteceu —
          é ausência de registro, e por isso aparece hachurada e não colorida. Somar as três num único
          indicador de frequência apaga exatamente a diferença que decide a ação.
        </p>
      )}
    </div>
  );
}
