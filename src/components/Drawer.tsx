import { useEffect } from "react";
import { AREA_BY_ID, CARREIRAS, DISC_BY_ID, DISCIPLINAS, periodLabel, UNLOCKS } from "../data";
import { useSound } from "../sound";

interface Props {
  subjectId: string | null;
  onClose: () => void;
  onOpen: (id: string) => void;
}

export default function Drawer({ subjectId, onClose, onOpen }: Props) {
  const { play } = useSound();
  const s = subjectId ? DISC_BY_ID[subjectId] : null;
  const area = s ? AREA_BY_ID[s.area] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && subjectId) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [subjectId, onClose]);

  const go = (id: string) => {
    play("click");
    onOpen(id);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/85 z-50 transition-opacity ${s ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-hyrule-panel border-l-4 border-zelda-gold-dim z-50 transition-transform duration-200 flex flex-col ${s ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b-4 border-zelda-gold-dim/50 bg-hyrule-dark flex items-center justify-between">
          <span className="font-pixel text-[9px] text-parchment">FICHA DA DISCIPLINA</span>
          <button
            onClick={() => {
              play("close");
              onClose();
            }}
            className="pixel-btn text-[10px] px-2 py-1"
          >
            FECHAR ✕
          </button>
        </div>
        {s && area && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="pixel-badge" style={{ color: area.cor, borderColor: area.cor }}>{area.icon} {area.abbr}</span>
                <span className="pixel-badge text-zelda-gold border-zelda-gold-dim">{periodLabel(s.periodo)}</span>
                <span
                  className="pixel-badge"
                  style={{ color: s.tipo === "obrigatoria" ? "#68d868" : "#38b8b8", borderColor: s.tipo === "obrigatoria" ? "#2d7a2d" : "#38b8b8" }}
                >
                  {s.tipo === "obrigatoria" ? "OBRIGATÓRIA" : "OPTATIVA"}
                </span>
                <span className="pixel-badge text-scroll border-[#3a4a5a]">{s.ch}h</span>
              </div>
              <h2 className="font-pixel text-[13px] leading-[1.8] text-parchment">{s.nome}</h2>
              <p className="font-pixel text-[6px] text-zelda-brown-light mt-2">
                CÓD. {s.codigo} • {s.chT}H TEORIA / {s.chP}H PRÁTICA
              </p>
              <p className="font-pixel text-[6px] text-scroll/60 mt-2 leading-[1.8]">ÁREA: {area.nome}</p>
              <div className="h-3 mt-2 border-2 border-[#2a3a4a] bg-black/40">
                <div className="h-full" style={{ width: `${(s.chP / s.ch) * 100}%`, background: area.cor }} title={`${s.chP}h de prática`} />
              </div>
              <p className="font-pixel text-[6px] text-scroll/50 mt-1">PRÁTICA {Math.round((s.chP / s.ch) * 100)}% · TEORIA {Math.round((s.chT / s.ch) * 100)}%</p>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title text-zelda-gold">EMENTA</div>
              <p className="text-[21px] text-scroll leading-snug">{s.ementa}</p>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title text-zelda-blue-light">PRECISA VIR ANTES</div>
              {s.pre.length === 0 ? (
                <p className="text-scroll/70">Nenhum pré-requisito — pode cursar desde o início.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {s.pre.map((id) => (
                    <button key={id} onClick={() => go(id)} className="inventory-slot" style={{ fontSize: 7 }}>◀ {DISC_BY_ID[id].nome}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title text-zelda-green-light">ABRE CAMINHO PARA</div>
              {!UNLOCKS[s.id] ? (
                <p className="text-scroll/70">Nenhuma disciplina depende diretamente desta.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {UNLOCKS[s.id].map((id) => (
                    <button key={id} onClick={() => go(id)} className="inventory-slot" style={{ fontSize: 7 }}>{DISC_BY_ID[id].nome} ▶</button>
                  ))}
                </div>
              )}
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title text-zelda-purple-light">BÔNUS PARA CADA CARREIRA</div>
              <div className="space-y-3">
                {CARREIRAS.map((c) => {
                  const w = c.overrides?.[s.id] || (s.carreiras.includes(c.id) ? (c.foco.includes(s.area) ? 4 : 3) : 0);
                  return (
                    <div key={c.id} className="flex items-center gap-3">
                      {c.img ? (
                        <img src={c.img} alt="" className="w-9 h-9 object-cover border-2 shrink-0" style={{ borderColor: c.cor, opacity: w ? 1 : 0.4, filter: c.imgFilter }} />
                      ) : (
                        <span className="w-9 h-9 border-2 flex items-center justify-center font-pixel text-[7px]" style={{ borderColor: c.cor, color: c.cor, opacity: w ? 1 : 0.45 }}>
                          {c.cls.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <div className="flex-1">
                        <div className="text-[19px]" style={{ color: w ? c.cor : "#888068" }}>{c.nome}</div>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span key={n} className="h-2 flex-1" style={{ background: n <= w ? c.cor : "#243040" }} />
                          ))}
                        </div>
                      </div>
                      <span className="font-pixel text-[9px] w-8 text-right" style={{ color: w ? c.cor : "#888068" }}>+{w}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title text-zelda-cyan">CONEXÕES NO GRAFO</div>
              <p className="text-[19px] text-scroll/80">
                {DISCIPLINAS.filter((d) => d.pre.includes(s.id)).length} disciplinas usam esta como pré-requisito.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
