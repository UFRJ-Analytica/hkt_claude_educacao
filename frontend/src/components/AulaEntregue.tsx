import type { LessonDelivery } from '../api/types';
import { Card } from '@/components/Card';
import { Legend } from '@/components/Legend';
import { Note } from '@/components/Note';
import { int } from '@/domain/format';

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

  /**
   * A barra continua bespoke e não vira `Meter`. Um dos quatro segmentos é
   * hachura — "não lançada" é ausência de registro, não zero —, e um primitivo
   * de medida achataria justamente a distinção que este componente existe para
   * mostrar.
   */
  const bar = (
    <div aria-label="Decomposição da aula prevista" className="aulabar" role="img">
      <span className="s presentes" style={{ width: seg(presentes) }} title={`Aula dada com presença: ${presentes}`} />
      <span className="s ausentes" style={{ width: seg(d.student_absences) }} title={`Aula dada, estudante ausente: ${d.student_absences}`} />
      <span className="s naolancada" style={{ width: seg(d.lessons_unlogged) }} title={`Aula prevista sem lançamento: ${d.lessons_unlogged}`} />
      <span className="s cancelada" style={{ width: seg(d.lessons_cancelled) }} title={`Aula cancelada: ${d.lessons_cancelled}`} />
    </div>
  );

  const legend = (
    <Legend
      className="aulalegend"
      items={[
        {
          label: 'aula dada, estudante presente',
          swatch: 'square',
          swatchClassName: 'presentes',
          value: int(presentes),
        },
        {
          label: 'aula dada, estudante ausente',
          swatch: 'square',
          swatchClassName: 'ausentes',
          value: int(d.student_absences),
        },
        // Hachura, nunca cor: a rampa é ordinal e ausência de informação não
        // tem posição numa rampa.
        {
          label: 'prevista sem lançamento',
          swatch: 'hatch',
          swatchClassName: 'naolancada',
          value: int(d.lessons_unlogged),
        },
        {
          label: 'aula cancelada',
          swatch: 'square',
          swatchClassName: 'cancelada',
          value: int(d.lessons_cancelled),
        },
      ]}
      strongValue
    />
  );

  if (compact) {
    return (
      <Card variant="flat">
        {bar}
        {legend}
      </Card>
    );
  }

  return (
    <Card
      eyebrow="Aula que chegou ao estudante"
      footer={
        <Note className="aulanote">
          <b>Por que separar.</b> Estudante ausente pede busca ativa. Aula cancelada é oferta
          interrompida e pede resposta de gestão. Prevista sem lançamento não diz se a aula aconteceu —
          é ausência de registro, e por isso aparece hachurada e não colorida. Somar as três num único
          indicador de frequência apaga exatamente a diferença que decide a ação.
        </Note>
      }
      subtitle={
        <>
          de {int(d.lessons_planned)} aulas previstas {d.scope_label}.
          O restante se divide entre aula cancelada, aula sem lançamento e estudante ausente — três
          coisas diferentes, com respostas diferentes.
        </>
      }
      title={
        <div className="bignum">
          {(d.effective_rate * 100).toFixed(1).replace('.', ',')}
          <span>%</span>
        </div>
      }
      variant="lesson"
    >
      {bar}
      {legend}
    </Card>
  );
}
