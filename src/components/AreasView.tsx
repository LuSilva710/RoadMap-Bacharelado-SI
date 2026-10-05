import { AreaStats, areaShare, areaStats, AREAS, periodLabel } from "../data";
import type { ViewProps } from "./types";

interface Props extends ViewProps {
  onPickCareer: (id: string) => void;
}

export default function AreasView({ isDimmed, weight, highlight, selectedId, onSelect, onPickCareer }: Props) {
  return (
    <div className="space-y-5">
      <div className="rpg-panel p-4">
        <div className="font-pixel text-[8px] text-zelda-gold mb-3">PESO DE CADA ÁREA NA MATRIZ OBRIGATÓRIA</div>
        <div className="flex h-6 w-full border-2 border-[#2a3a4a] overflow-hidden bg-black/40">
          {AREAS.map((a) => {
            const p = areaShare(a);
            return (
              <div
                key={a.id}
                title={`${a.nome}: ${p}%`}
                style={{ width: `${p}%`, background: a.cor }}
                className="flex items-center justify-center font-pixel text-[7px] text-black/80"
              >
                {p >= 8 ? `${p}%` : ""}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {AREAS.map((a) => (
            <span key={a.id} className="flex items-center gap-1 text-[18px]">
              <span className="inline-block w-2 h-2" style={{ background: a.cor }} />
              {a.nome}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {AREAS.map((a) => (
          <AreaCard key={a.id} stats={areaStats(a)} {...{ isDimmed, weight, highlight, selectedId, onSelect, onPickCareer }} />
        ))}
      </div>
    </div>
  );
}

function AreaCard({
  stats,
  isDimmed,
  weight,
  highlight,
  selectedId,
  onSelect,
  onPickCareer,
}: { stats: AreaStats } & Props) {
  const a = stats.area;
  const share = areaShare(a);
  return (
    <section className="rpg-panel p-5" style={{ borderColor: a.cor }}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-pixel text-[10px] leading-[1.9]" style={{ color: a.cor }}>
          {a.icon} {a.abbr}
        </h3>
        <span className="font-pixel text-[7px] text-scroll/70 text-right">
          {stats.todas.length} DISC • {stats.ch}H
          <br />
          {stats.obrigatorias.length} OBR • {stats.optativas.length} OPT
        </span>
      </div>

      <div className="font-pixel text-[7px] text-parchment leading-[1.9]">{a.nome}</div>
      <p className="text-xl text-scroll/85 mt-1">{a.descricao}</p>

      <div className="mt-3 space-y-2">
        <Bar label="CARGA OBRIGATÓRIA" value={`${stats.chObrigatoria}H`} pct={share} color={a.cor} />
        {stats.chOptativa > 0 && (
          <Bar label="CARGA OPTATIVA" value={`${stats.chOptativa}H`} pct={Math.min(100, Math.round((stats.chOptativa / stats.ch) * 100))} color="#38b8b8" />
        )}
      </div>

      {stats.periodos.length > 0 && (
        <p className="font-pixel text-[6px] text-zelda-brown-light mt-3">
          APARECE NOS PERÍODOS: {stats.periodos.map((p) => `${p}º`).join(" · ")}
          {stats.optativas.length > 0 && " · OPTATIVAS"}
        </p>
      )}

      <div className="mt-3">
        <div className="font-pixel text-[6px] text-zelda-brown-light mb-1">ÁREA ESSENCIAL PARA:</div>
        <div className="flex flex-wrap gap-1.5">
          {stats.topCarreiras.map(({ career, soma }) => (
            <button
              key={career.id}
              onClick={() => onPickCareer(career.id)}
              className="pixel-badge"
              style={{ color: career.cor, borderColor: career.cor }}
              title={`${soma} pontos de bônus nesta área`}
            >
              {career.cls} ▸
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-3 space-y-1">
        {stats.todas.map((s) => {
          const w = weight(s);
          const opt = s.tipo !== "obrigatoria";
          return (
            <li key={s.id}>
              <button
                onClick={() => onSelect(s.id)}
                className={`w-full text-left flex items-center gap-2 px-2 py-1 border-2 border-transparent hover:border-zelda-gold ${isDimmed(s) ? "opacity-25" : ""} ${selectedId === s.id ? "border-zelda-gold-light" : ""}`}
              >
                <span className="inline-block w-2 h-2 shrink-0" style={{ background: a.cor }} />
                <span className="flex-1 text-parchment leading-tight">{s.nome}</span>
                <span className="font-pixel text-[6px]" style={{ color: opt ? "#38b8b8" : "#888068" }}>
                  {opt ? "OPT" : `${s.periodo}º`}
                </span>
                <span className="font-pixel text-[6px] text-scroll/60">{s.ch}H</span>
                {highlight && w > 0 && <span className="font-pixel text-[7px] text-zelda-gold-light">+{w}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="font-pixel text-[6px] text-scroll/40 mt-2">
        {stats.obrigatorias.length} OBRIGATÓRIAS • {stats.optativas.length} OPTATIVAS • {periodLabel(0).toUpperCase()} = ESCOLHA LIVRE
      </p>
    </section>
  );
}

function Bar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between font-pixel text-[6px] text-scroll/70 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-3 border-2 border-[#2a3a4a] bg-black/40">
        <div className="h-full" style={{ width: `${Math.max(2, pct)}%`, background: color }} />
      </div>
    </div>
  );
}
