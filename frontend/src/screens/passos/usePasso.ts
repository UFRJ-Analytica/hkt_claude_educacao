import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { indicePasso, passoAnterior, passosVisiveis, proximoPasso, validarPasso } from '@/domain/passos';
import { useRascunho } from '@/store/rascunho';

/**
 * Tudo que um passo do wizard precisa: rascunho, erros do passo (só depois
 * da primeira tentativa de avançar), navegação e posição no progresso.
 */
export function usePasso(id: string) {
  const ctx = useRascunho();
  const nav = useNavigate();
  const [tentou, setTentou] = useState(false);
  const erros = useMemo(() => validarPasso(ctx.r, id), [ctx.r, id]);
  const visiveis = passosVisiveis(ctx.r);
  const indice = indicePasso(ctx.r, id);
  const anterior = passoAnterior(ctx.r, id);
  const proximo = proximoPasso(ctx.r, id);

  const avancar = useCallback(() => {
    setTentou(true);
    if (Object.keys(erros).length > 0) {
      const primeiro = document.querySelector('[aria-invalid="true"], [role="alert"]');
      primeiro?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (proximo) {
      ctx.set('passoMaisAlto', Math.max(ctx.r.passoMaisAlto, indice + 1));
      nav(proximo.rota);
    }
    return true;
  }, [erros, proximo, nav, ctx, indice]);

  return {
    ...ctx,
    erros,
    mostrarErro: (campo: string) => (tentou ? (erros[campo] ?? null) : null),
    tentou,
    avancar,
    voltarPara: anterior?.rota ?? '/app',
    indice: indice + 1,
    total: visiveis.length,
    proximo,
  };
}
