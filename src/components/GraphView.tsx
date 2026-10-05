import { useMemo, useRef, useState } from "react";
import { AREAS, AreaId, CARREIRAS, Career, DISCIPLINAS, DISC_BY_ID, weightsOf } from "../data";
import type { ViewProps } from "./types";

interface Props extends ViewProps {
  career: Career;
  onSelectCareer: (id: string) => void;
  showCareers: boolean;
}

const W = 1500;
const H = 1000;
const NODE_W = 148;
const NODE_H = 46;

interface N {
  id: string;
  kind: "disc" | "area" | "career";
  x: number;
  y: number;
  vx: number;
  vy: number;
  fixed?: boolean;
}

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildLayout(showCareers: boolean, careerId: string) {
  const rand = rng(20191107);
  const nodes: N[] = [];

  AREAS.forEach((a, i) => {
    const ang = (i / AREAS.length) * Math.PI * 2 - Math.PI / 2;
    nodes.push({ id: `area:${a.id}`, kind: "area", x: Math.cos(ang) * 330, y: Math.sin(ang) * 230, vx: 0, vy: 0, fixed: true });
  });

  const areaPos = new Map<AreaId, { x: number; y: number }>();
  nodes.forEach((n) => {
    if (n.kind === "area") areaPos.set(n.id.slice(5) as AreaId, { x: n.x, y: n.y });
  });

  DISCIPLINAS.forEach((d, i) => {
    const c = areaPos.get(d.area)!;
    nodes.push({
      id: d.id,
      kind: "disc",
      x: c.x + (rand() - 0.5) * 260 + (i % 5) * 12,
      y: c.y + (rand() - 0.5) * 200 + Math.floor(i / 5) * 8,
      vx: 0,
      vy: 0,
    });
  });

  if (showCareers) {
    CARREIRAS.forEach((c, i) => {
      const ang = (i / CARREIRAS.length) * Math.PI * 2 - Math.PI / 2;
      nodes.push({ id: `career:${c.id}`, kind: "career", x: Math.cos(ang) * 660, y: Math.sin(ang) * 430, vx: 0, vy: 0, fixed: true });
    });
  }

  const links: { a: N; b: N; rest: number; k: number }[] = [];
  DISCIPLINAS.forEach((d) => {
    const a = nodes.find((n) => n.id === d.id)!;
    d.pre.forEach((p) => {
      const b = nodes.find((n) => n.id === p);
      if (b) links.push({ a, b, rest: 150, k: 0.05 });
    });
  });
  if (showCareers) {
    nodes.forEach((n) => {
      if (n.kind !== "career") return;
      const car = CARREIRAS.find((c) => `career:${c.id}` === n.id)!;
      const w = weightsOf(car);
      Object.entries(w)
        .filter(([, v]) => v >= 4)
        .forEach(([id]) => {
          const b = nodes.find((x) => x.id === id);
          if (b) links.push({ a: n, b, rest: 230, k: 0.02 });
        });
    });
  }

  // simulação de forças
  for (let it = 0; it < 320; it++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) {
          dx = (rand() - 0.5) * 4;
          dy = (rand() - 0.5) * 4;
          d2 = dx * dx + dy * dy;
        }
        const rep = (a.kind === "career" || b.kind === "career" ? 9000 : 15000) / d2;
        const d = Math.sqrt(d2);
        const fx = (dx / d) * rep;
        const fy = (dy / d) * rep;
        if (!a.fixed) {
          a.vx -= fx;
          a.vy -= fy;
        }
        if (!b.fixed) {
          b.vx += fx;
          b.vy += fy;
        }
      }
    }
    links.forEach(({ a, b, rest, k }) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = (d - rest) * k;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      if (!a.fixed) {
        a.vx += fx;
        a.vy += fy;
      }
      if (!b.fixed) {
        b.vx -= fx;
        b.vy -= fy;
      }
    });
    nodes.forEach((n) => {
      if (n.fixed) return;
      if (n.kind === "disc") {
        const c = areaPos.get(DISC_BY_ID[n.id].area)!;
        n.vx += (c.x - n.x) * 0.012;
        n.vy += (c.y - n.y) * 0.016;
      }
      n.vx += -n.x * 0.0015;
      n.vy += -n.y * 0.0015;
      n.vx *= 0.82;
      n.vy *= 0.82;
      n.x += Math.max(-24, Math.min(24, n.vx));
      n.y += Math.max(-24, Math.min(24, n.vy));
      n.x = Math.max(-W / 2 + 90, Math.min(W / 2 - 90, n.x));
      n.y = Math.max(-H / 2 + 50, Math.min(H / 2 - 50, n.y));
    });
  }

  const pos: Record<string, { x: number; y: number }> = {};
  nodes.forEach((n) => (pos[n.id] = { x: n.x, y: n.y }));
  void careerId;
  return pos;
}

export default function GraphView({ isDimmed, weight, highlight, selectedId, onSelect, career, onSelectCareer, showCareers }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const [k, setK] = useState(0.62);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const pos = useMemo(() => buildLayout(showCareers, career.id), [showCareers]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeDisc = hover && !hover.includes(":") ? hover : null;
  const hoverCareer = hover?.startsWith("career:") ? hover.slice(7) : null;
  const neighbours = useMemo(() => {
    const s = new Set<string>();
    if (activeDisc) {
      s.add(activeDisc);
      DISC_BY_ID[activeDisc].pre.forEach((p) => s.add(p));
      DISCIPLINAS.forEach((d) => d.pre.includes(activeDisc) && s.add(d.id));
    }
    if (hoverCareer) {
      const c = CARREIRAS.find((x) => x.id === hoverCareer);
      if (c) Object.entries(weightsOf(c)).forEach(([id, v]) => v >= 3 && s.add(id));
    }
    return s;
  }, [activeDisc, hoverCareer]);

  const zoom = (d: number) => setK((v) => Math.min(1.6, Math.max(0.28, +(v + d).toFixed(2))));

  return (
    <div className="map-screen w-full h-[660px] overflow-hidden scanlines select-none">
      <div className="map-screen-label">GRAFO DO CURSO — PRÉ-REQUISITOS, ÁREAS E CARREIRAS</div>

      <svg
        className="absolute inset-0 w-full h-full z-0"
        style={{ cursor: drag.current ? "grabbing" : "grab" }}
        onWheel={(e) => {
          e.preventDefault();
          zoom(e.deltaY < 0 ? 0.08 : -0.08);
        }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPan({ x: drag.current.px + (e.clientX - drag.current.x), y: drag.current.py + (e.clientY - drag.current.y) });
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
      >
        <g transform={`translate(${W / 2 + pan.x} ${H / 2 + pan.y}) scale(${k})`}>
          {/* arestas de pré-requisito */}
          {DISCIPLINAS.map((d) =>
            d.pre.map((p) => {
              const a = pos[p];
              const b = pos[d.id];
              if (!a || !b) return null;
              const isActive = activeDisc === p || activeDisc === d.id;
              const dim = isDimmed(d) || isDimmed(DISC_BY_ID[p]);
              return (
                <line
                  key={`${p}-${d.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={isActive ? "#f8d830" : AREAS.find((ar) => ar.id === DISC_BY_ID[d.id].area)?.cor}
                  strokeWidth={isActive ? 3 : 1.6}
                  opacity={isActive ? 1 : highlight && dim ? 0.05 : 0.3}
                />
              );
            })
          )}

          {/* arestas carreira → disciplinas-chave */}
          {showCareers &&
            CARREIRAS.map((c) => {
              const a = pos[`career:${c.id}`];
              if (!a) return null;
              const w = weightsOf(c);
              const isActive = career.id === c.id;
              return Object.entries(w)
                .filter(([, v]) => v >= 4)
                .map(([id]) => {
                  const b = pos[id];
                  if (!b) return null;
                  return (
                    <line
                      key={`c-${c.id}-${id}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={c.cor}
                      strokeWidth={isActive || hoverCareer === c.id ? 2.4 : 1.2}
                      strokeDasharray="7 6"
                      opacity={isActive || hoverCareer === c.id ? 0.8 : 0.12}
                    />
                  );
                });
            })}

          {/* hubs de área */}
          {AREAS.map((a) => {
            const p = pos[`area:${a.id}`];
            if (!p) return null;
            return (
              <g key={a.id} pointerEvents="none">
                <circle cx={p.x} cy={p.y} r={46} fill="#0c1117" stroke={a.cor} strokeWidth={3} />
                <text x={p.x} y={p.y - 2} textAnchor="middle" fontSize={22} fill={a.cor} fontFamily="Press Start 2P, monospace">
                  {a.abbr}
                </text>
                <text x={p.x} y={p.y + 18} textAnchor="middle" fontSize={16} fill="#e8d8a8" opacity={0.7}>
                  {DISCIPLINAS.filter((d) => d.area === a.id).length} disc.
                </text>
              </g>
            );
          })}

          {/* nós de carreira */}
          {showCareers &&
            CARREIRAS.map((c) => {
              const p = pos[`career:${c.id}`];
              if (!p) return null;
              const isActive = career.id === c.id;
              return (
                <g
                  key={c.id}
                  transform={`translate(${p.x - 74},${p.y - 22})`}
                  onClick={() => onSelectCareer(c.id)}
                  onMouseEnter={() => setHover(`career:${c.id}`)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer" }}
                >
                  <rect width={148} height={44} fill="#141e2a" stroke={c.cor} strokeWidth={isActive ? 4 : 2.5} />
                  <rect width={148} height={44} fill={c.cor} opacity={isActive ? 0.22 : 0.08} />
                  <text x={74} y={19} textAnchor="middle" fontSize={15} fill={c.cor} fontFamily="Press Start 2P, monospace">
                    {c.cls.slice(0, 18)}
                  </text>
                  <text x={74} y={35} textAnchor="middle" fontSize={15} fill="#e8d8a8">
                    {c.nome.length > 22 ? c.nome.slice(0, 21) + "…" : c.nome}
                  </text>
                </g>
              );
            })}

          {/* nós de disciplina */}
          {DISCIPLINAS.map((d) => {
            const p = pos[d.id];
            if (!p) return null;
            const area = AREAS.find((a) => a.id === d.area)!;
            const w = weight(d);
            const dimmed = isDimmed(d);
            const isSel = selectedId === d.id;
            const active = activeDisc && neighbours.has(d.id);
            return (
              <g
                key={d.id}
                transform={`translate(${p.x - NODE_W / 2},${p.y - NODE_H / 2})`}
                onClick={() => onSelect(d.id)}
                onMouseEnter={() => setHover(d.id)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
                opacity={activeDisc && !active ? 0.28 : dimmed && highlight ? 0.3 : 1}
              >
                <rect width={NODE_W} height={NODE_H} fill="#1a2836" stroke={isSel ? "#f8d830" : "#2a3a4a"} strokeWidth={isSel ? 3 : 2} rx={2} />
                <rect width={6} height={NODE_H} fill={area.cor} />
                <title>{`${d.nome} (${d.codigo})\n${d.tipo === "obrigatoria" ? "Obrigatória" : "Optativa"} - ${d.periodo === 0 ? "Optativa" : `${d.periodo}º período`}\nCarga: ${d.ch}h (${d.chT}h teoria / ${d.chP}h prática)\n${d.ementa}`}</title>
                <text x={12} y={19} fontSize={16} fill="#f0e8d0">
                  {d.nome.length > 18 ? d.nome.slice(0, 17) + "…" : d.nome}
                </text>
                <text x={12} y={36} fontSize={12} fill={area.cor} fontFamily="Press Start 2P, monospace">
                  {d.periodo === 0 ? "OPT" : `${d.periodo}º`}·{d.ch}h
                </text>
                <text x={NODE_W - 8} y={36} textAnchor="end" fontSize={10} fill="#888068" fontFamily="VT323, monospace">
                  {d.codigo.replace("OBBGSIN.", "")}
                </text>
                {highlight && w > 0 && (
                  <text x={NODE_W - 8} y={19} textAnchor="end" fontSize={14} fill={w >= 4 ? "#f8d830" : "#b09060"} fontFamily="Press Start 2P, monospace">
                    +{w}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 map-controls">
        <button className="pixel-btn text-[10px] px-2 py-1" onClick={() => zoom(0.1)}>＋</button>
        <button className="pixel-btn text-[10px] px-2 py-1" onClick={() => zoom(-0.1)}>−</button>
        <button className="pixel-btn text-[8px] px-2 py-1" onClick={() => { setK(0.62); setPan({ x: 0, y: 0 }); }}>AJUSTAR</button>
      </div>
      <div className="absolute top-3 left-3 z-10 map-controls px-3 py-2 font-pixel text-[6px] text-scroll/80 max-w-[240px] leading-[1.8]">
        ARRASTE PARA MOVER · RODA = ZOOM
        <br />
        <span style={{ color: career.cor }}>■ TRILHA: {career.nome.toUpperCase()}</span>
        <br />
        LINHA CHEIA = PRÉ-REQUISITO
        <br />
        LINHA PONTILHADA = CARREIRA
      </div>
    </div>
  );
}


