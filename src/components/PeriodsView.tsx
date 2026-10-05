import { AREA_BY_ID, DISCIPLINAS, PERIODOS } from "../data";
import type { ViewProps } from "./types";

export default function PeriodsView({ isDimmed, weight, highlight, selectedId, onSelect }: ViewProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 items-start">
      {PERIODOS.map((p) => {
        const list = DISCIPLINAS.filter((s) => s.periodo === p);
        const total = list.reduce((a, s) => a + s.ch, 0);
        return (
          <div key={p} className="min-w-[268px] max-w-[300px] flex-1 space-y-3">
            <div className={`dungeon-header ${p === 0 ? "optional" : p === 8 ? "final" : ""}`}>
              <div className="font-pixel text-[9px] text-parchment">{p === 0 ? "OPTATIVAS" : `${p}º PERÍODO`}</div>
              <div className="font-pixel text-[6px] text-scroll/70 mt-2">{list.length} DISCIPLINAS • {total}H</div>
            </div>
            {list.map((s) => {
              const area = AREA_BY_ID[s.area];
              const w = weight(s);
              return (
                <button
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  className={`pixel-card ${isDimmed(s) ? "dimmed" : ""} ${highlight && w >= 4 ? "highlighted" : ""} ${selectedId === s.id ? "highlighted" : ""}`}
                >
                  <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: area.cor }} />
                  <div className="text-parchment text-[20px] leading-tight">{s.nome}</div>
                  <div className="flex items-center justify-between gap-2 mt-2 font-pixel text-[6px]">
                    <span style={{ color: area.cor }}>{area.abbr}</span>
                    <span style={{ color: s.tipo === "obrigatoria" ? "#888068" : "#38b8b8" }}>
                      {s.tipo === "obrigatoria" ? "OBR" : "OPT"}
                    </span>
                    <span className="text-scroll/60">{s.ch}H</span>
                    {highlight && w > 0 && <span className="text-zelda-gold-light">+{w}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
