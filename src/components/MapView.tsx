import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AREA_BY_ID, AREAS, DISCIPLINAS, DISC_BY_ID, PERIODOS } from "../data";
import type { ViewProps } from "./types";

const NODE_W = 176;
const NODE_H = 62;
const COL_GAP = 54;
const ROW_GAP = 12;
const PAD_X = 26;
const PAD_TOP = 52;

export default function MapView({ isDimmed, weight, highlight, selectedId, onSelect }: ViewProps) {
  const [hover, setHover] = useState<string | null>(null);
  const [scale, setScale] = useState(0.8);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { pos, width, height } = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    let maxRows = 0;
    PERIODOS.forEach((p, ci) => {
      const list = DISCIPLINAS.filter((s) => s.periodo === p);
      maxRows = Math.max(maxRows, list.length);
      list.forEach((s, ri) => {
        pos[s.id] = { x: PAD_X + ci * (NODE_W + COL_GAP), y: PAD_TOP + ri * (NODE_H + ROW_GAP) };
      });
    });
    return {
      pos,
      width: PAD_X * 2 + PERIODOS.length * NODE_W + (PERIODOS.length - 1) * COL_GAP,
      height: PAD_TOP + maxRows * (NODE_H + ROW_GAP) + 16,
    };
  }, []);

  const fit = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    setScale(Math.min(1, Math.max(0.38, (el.clientWidth - 6) / width)));
    el.scrollTo({ left: 0, top: 0 });
  }, [width]);

  useEffect(() => {
    fit();
  }, [fit]);

  const active = hover ?? selectedId;

  const zoom = (d: number) => setScale((v) => Math.min(1.5, Math.max(0.35, +(v + d).toFixed(2))));

  return (
    <div className="map-screen w-full h-[640px] overflow-hidden scanlines">
      <div className="map-screen-label">GRADE CURRICULAR POR PERÍODO — CLIQUE EM UMA DISCIPLINA</div>

      <div ref={wrapRef} className="absolute inset-0 overflow-auto z-0">
        <div style={{ width: width * scale, height: height * scale, position: "relative" }}>
          <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "0 0", position: "absolute", left: 0, top: 0 }}>
            {PERIODOS.map((p, ci) => (
              <div
                key={p}
                className="font-pixel text-[8px] text-center"
                style={{
                  position: "absolute",
                  left: PAD_X + ci * (NODE_W + COL_GAP),
                  top: 14,
                  width: NODE_W,
                  color: p === 0 ? "#38b8b8" : "#d8a830",
                }}
              >
                {p === 0 ? "OPTATIVAS" : `${p}º PERÍODO`}
              </div>
            ))}

            <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
              {DISCIPLINAS.map((s) =>
                s.pre.map((p) => {
                  const a = pos[p];
                  const b = pos[s.id];
                  if (!a || !b) return null;
                  const isActive = active && (p === active || s.id === active);
                  const x1 = a.x + NODE_W;
                  const y1 = a.y + NODE_H / 2;
                  const x2 = b.x - 2;
                  const y2 = b.y + NODE_H / 2;
                  const dx = Math.max(22, (x2 - x1) / 2);
                  const dim = isDimmed(DISC_BY_ID[p]) || isDimmed(s);
                  return (
                    <path
                      key={`${p}-${s.id}`}
                      d={`M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`}
                      fill="none"
                      stroke={isActive ? "#f8d830" : "#58a0e8"}
                      strokeWidth={isActive ? 3 : 1.8}
                      opacity={isActive ? 1 : active ? 0.08 : dim ? 0.05 : 0.28}
                    />
                  );
                })
              )}
            </svg>

            {DISCIPLINAS.map((s) => {
              const p = pos[s.id];
              const area = AREA_BY_ID[s.area];
              const w = weight(s);
              const dimmed = isDimmed(s);
              const related = active && (s.id === active || s.pre.includes(active) || DISC_BY_ID[active]?.pre.includes(s.id));
              return (
                <button
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  className={`subj-node ${selectedId === s.id ? "selected" : ""} ${dimmed ? "dimmed" : ""} ${highlight && w >= 4 ? "glow" : ""}`}
                  style={{ left: p.x, top: p.y, width: NODE_W, height: NODE_H, opacity: active && !related && !dimmed ? 0.45 : undefined }}
                  title={s.nome}
                >
                  <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: area.cor }} />
                  <span
                    className="block text-parchment"
                    style={{ fontSize: 17, lineHeight: 1.05, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {s.nome}
                  </span>
                  <span className="absolute bottom-1 left-3 right-2 flex items-center justify-between font-pixel text-[6px]" style={{ color: area.cor }}>
                    <span>{area.abbr}</span>
                    <span className="text-scroll/60">{s.ch}h</span>
                    {highlight && w > 0 && (
                      <span className="px-1 border" style={{ borderColor: w >= 4 ? "#f8d830" : "#886840", color: w >= 4 ? "#f8d830" : "#b09060" }}>+{w}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 map-controls">
        <button className="pixel-btn text-[10px] px-2 py-1" onClick={() => zoom(0.1)} aria-label="Aproximar">＋</button>
        <button className="pixel-btn text-[10px] px-2 py-1" onClick={() => zoom(-0.1)} aria-label="Afastar">−</button>
        <button className="pixel-btn text-[8px] px-2 py-1" onClick={fit}>AJUSTAR</button>
      </div>
      <div className="absolute bottom-3 left-3 hidden md:flex items-center gap-3 px-3 py-2 map-legend font-pixel text-[6px] text-scroll/80 z-10">
        {AREAS.map((a) => (
          <span key={a.id} className="flex items-center gap-1">
            <span className="inline-block w-2 h-2" style={{ background: a.cor }} /> {a.abbr}
          </span>
        ))}
      </div>
    </div>
  );
}
