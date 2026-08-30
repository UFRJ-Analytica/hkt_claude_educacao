import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import type { UnidadeProxima } from '@/api/types';
import { DEMANDA_PIN } from '@/domain/demanda';

function Recentrar({ centro, zoom }: { centro: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(centro, zoom, { duration: 0.6 });
  }, [map, centro, zoom]);
  return null;
}

function Redimensionar() {
  const map = useMap();
  useEffect(() => {
    const el = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [map]);
  return null;
}

const ICONES = new Map<string, L.DivIcon>();
function icone(classe: string, texto: string): L.DivIcon {
  const k = `${classe}|${texto}`;
  let i = ICONES.get(k);
  if (!i) {
    i = L.divIcon({ className: '', html: `<div class="unit-pin ${classe}">${texto}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] });
    ICONES.set(k, i);
  }
  return i;
}
const EU = L.divIcon({ className: '', html: '<div class="me-pin"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });

/**
 * Mapa com ruas (OpenStreetMap) e um marcador por creche, colorido pela
 * demanda. Não é primitivo de biblioteca de UI: é a leitura espacial que
 * faltava ao fluxo atual ("sem critério de distância ou território").
 */
export function MapaUnidades({
  centro,
  unidades,
  selecionadas,
  focoId,
  onFoco,
  className,
}: {
  centro: [number, number];
  unidades: UnidadeProxima[];
  selecionadas: string[];
  focoId: string | null;
  onFoco: (id: string) => void;
  className?: string;
}) {
  const zoom = 13;
  const marcadores = useMemo(
    () =>
      unidades.map((u) => {
        const ordem = selecionadas.indexOf(u.id);
        const escolhida = ordem >= 0;
        const classe = `${escolhida ? 'picked' : DEMANDA_PIN[u.oferta?.demanda ?? 'media']}${focoId === u.id ? ' sel' : ''}`;
        return { u, icon: icone(classe, escolhida ? String(ordem + 1) : '') };
      }),
    [unidades, selecionadas, focoId],
  );

  return (
    <div className={className}>
      <MapContainer center={centro} zoom={zoom} scrollWheelZoom className="h-full w-full" attributionControl>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
        <Recentrar centro={centro} zoom={zoom} />
        <Redimensionar />
        <Marker position={centro} icon={EU} zIndexOffset={500} interactive={false} />
        {marcadores.map(({ u, icon }) => (
          <Marker key={u.id} position={[u.lat, u.lon]} icon={icon} zIndexOffset={selecionadas.includes(u.id) ? 400 : focoId === u.id ? 300 : 0} eventHandlers={{ click: () => onFoco(u.id) }} />
        ))}
      </MapContainer>
    </div>
  );
}
