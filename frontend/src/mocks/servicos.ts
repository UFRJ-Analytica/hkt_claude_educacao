import type { CriterioId, DocumentoAnalise, Endereco } from '../api/types';
import { CRITERIOS_POR_ID } from '../domain/prioridade';
import { RIO_CENTRO } from '../domain/geo';
import { acharBairro } from './bairros';

const espera = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* ---------- OTP por WhatsApp/SMS ---------- */
export interface OtpEnvio {
  enviado: boolean;
  /** Só existe no mock: é a "notificação" que o app do celular mostraria. */
  codigoSimulado: string;
}
export async function mockEnviarOtp(telefone: string): Promise<OtpEnvio> {
  await espera(700);
  const c = String(100000 + (hash(telefone + 'otp') % 900000));
  return { enviado: true, codigoSimulado: c };
}
export async function mockVerificarOtp(telefone: string, codigo: string): Promise<boolean> {
  await espera(500);
  return codigo === String(100000 + (hash(telefone + 'otp') % 900000));
}

/* ---------- Pix como canal durável ---------- */
export interface PixEnvio {
  enviado: boolean;
  /** Mensagem que apareceria na notificação do banco. Só no mock. */
  notificacao: { valor: string; remetente: string; mensagem: string };
  codigoSimulado: string;
}
export async function mockEnviarPixVerificacao(chave: string): Promise<PixEnvio> {
  await espera(900);
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const h = hash(chave + 'pix');
  let c = '';
  for (let i = 0; i < 4; i += 1) c += alfabeto[(h >>> (i * 5)) % alfabeto.length];
  return {
    enviado: true,
    codigoSimulado: c,
    notificacao: {
      valor: 'R$ 0,01',
      remetente: 'PREFEITURA DO RIO – EDUCAÇÃO',
      mensagem: `Matrícula Carioca: seu código de confirmação é ${c}. Digite no app para ativar este contato.`,
    },
  };
}
export async function mockConfirmarPix(chave: string, codigo: string): Promise<boolean> {
  await espera(400);
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const h = hash(chave + 'pix');
  let c = '';
  for (let i = 0; i < 4; i += 1) c += alfabeto[(h >>> (i * 5)) % alfabeto.length];
  return codigo.trim().toUpperCase() === c;
}

/* ---------- Pré-análise de documento (Claude no backend) ---------- */
/**
 * O modelo lê o documento e devolve campos + consistência. Nunca pontua.
 * No mock, o resultado é determinístico a partir do nome/tamanho do arquivo
 * para que a demonstração seja reproduzível.
 */
export async function mockPreAnalisarDocumento(
  criterio: CriterioId,
  file: File,
  contexto: { nomeCrianca: string; nomeResponsavel: string },
): Promise<DocumentoAnalise> {
  await espera(1800 + (hash(file.name) % 900));
  const agora = new Date().toISOString();
  const c = CRITERIOS_POR_ID[criterio];
  if (file.size < 15_000 || /ilegivel|blur|escuro/i.test(file.name)) {
    return {
      status: 'ilegivel',
      motivo: 'A foto ficou escura ou tremida. Tente de novo com mais luz e o documento inteiro na tela.',
      camposLidos: {},
      analisadoEm: agora,
    };
  }
  const h = hash(file.name + file.size);
  const revisar = h % 10 < 3 || /revisar|vencido|outro/i.test(file.name);
  const campos: Record<string, string> = {};
  switch (criterio) {
    case 'deficiencia_crianca':
      campos['Tipo'] = 'Laudo médico';
      campos['Nome no documento'] = contexto.nomeCrianca || '—';
      campos['CID'] = revisar ? 'não localizado' : 'F84.0';
      campos['Data de emissão'] = revisar ? '02/2024' : '05/2026';
      break;
    case 'bolsa_familia':
      campos['Tipo'] = 'Folha resumo CadÚnico';
      campos['Responsável familiar'] = contexto.nomeResponsavel || '—';
      campos['NIS'] = `***.${String(1000 + (h % 9000))}.**-*`;
      campos['Situação'] = revisar ? 'cadastro desatualizado' : 'atualizado';
      break;
    case 'violencia_domestica':
      campos['Tipo'] = 'Medida protetiva';
      campos['Nome'] = contexto.nomeResponsavel || '—';
      campos['Validade'] = revisar ? 'não encontrada' : 'vigente';
      break;
    case 'mae_adolescente':
    case 'responsavel_idoso':
      campos['Tipo'] = 'Documento de identidade';
      campos['Nome'] = contexto.nomeResponsavel || '—';
      campos['Data de nascimento'] = revisar ? 'parcialmente legível' : 'legível';
      break;
    case 'responsavel_deficiente':
      campos['Tipo'] = 'Laudo médico';
      campos['Nome'] = contexto.nomeResponsavel || '—';
      campos['CID'] = revisar ? 'não localizado' : 'H54.0';
      break;
    case 'familiar_encarcerado':
      campos['Tipo'] = 'Declaração do sistema prisional';
      campos['Unidade'] = revisar ? 'ilegível' : 'SEAP-RJ';
      break;
    case 'responsavel_trabalha':
      campos['Tipo'] = 'Comprovante de trabalho';
      campos['Nome'] = contexto.nomeResponsavel || '—';
      campos['Empregador'] = revisar ? 'não identificado' : 'identificado';
      break;
    default:
      campos['Tipo'] = c?.documento ?? 'Documento';
  }
  if (revisar) {
    return {
      status: 'revisar',
      motivo: 'Documento reconhecido, mas um dado importante não bateu ou está vencido. A unidade vai conferir o original — leve-o no dia da matrícula.',
      camposLidos: campos,
      analisadoEm: agora,
    };
  }
  return {
    status: 'pre_aprovado',
    motivo: `Documento legível e compatível com "${c?.titulo ?? criterio}". Pré-aprovado — a validação final é da unidade.`,
    camposLidos: campos,
    analisadoEm: agora,
  };
}

/* ---------- CEP e geocodificação ---------- */
export async function buscarCepViaCep(cep: string): Promise<Partial<Endereco> | null> {
  const d = cep.replace(/\D/g, '');
  if (d.length !== 8) return null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(`https://viacep.com.br/ws/${d}/json/`, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const j = (await res.json()) as { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string; uf?: string };
    if (j.erro) return null;
    return { cep: `${d.slice(0, 5)}-${d.slice(5)}`, logradouro: j.logradouro ?? '', bairro: j.bairro ?? '', cidade: j.localidade ?? '', uf: j.uf ?? '' };
  } catch {
    return null;
  }
}

/**
 * Coordenada aproximada do endereço: Nominatim (OSM) quando responde; senão
 * o centroide do bairro; senão o centro do município. A precisão é declarada
 * na tela ("posição aproximada pelo bairro").
 */
export async function geocodificar(e: Pick<Endereco, 'logradouro' | 'numero' | 'bairro' | 'cidade'>): Promise<{ lat: number; lon: number; precisao: 'endereco' | 'bairro' | 'cidade' }> {
  const q = [e.logradouro && `${e.logradouro}${e.numero ? `, ${e.numero}` : ''}`, e.bairro, e.cidade || 'Rio de Janeiro', 'RJ', 'Brasil']
    .filter(Boolean)
    .join(', ');
  if (e.logradouro) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 4500);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(q)}`, {
        signal: ctrl.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(t);
      if (res.ok) {
        const j = (await res.json()) as Array<{ lat: string; lon: string }>;
        if (j[0]) return { lat: Number(j[0].lat), lon: Number(j[0].lon), precisao: 'endereco' };
      }
    } catch {
      /* segue para o bairro */
    }
  }
  const b = acharBairro(e.bairro);
  if (b) return { lat: b.lat, lon: b.lon, precisao: 'bairro' };
  return { ...RIO_CENTRO, precisao: 'cidade' };
}
