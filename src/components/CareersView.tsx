import { CARREIRAS, Career, optativasRecomendadas, topArea, trilha, weightsOf, DISC_BY_ID } from "../data";
import PixelAvatar from "./PixelAvatar";
import { useSound } from "../sound";

export function CareerArt({ career, size }: { career: Career; size: string }) {
  if (career.img)
    return <img src={career.img} alt="" className={`${size} object-cover border-2`} style={{ borderColor: career.cor, filter: career.imgFilter }} />;
  return (
    <span className={`${size} inline-block border-2 overflow-hidden bg-[#d8d0bd] shrink-0`} style={{ borderColor: career.cor }}>
      <PixelAvatar spec={career.avatar!} />
    </span>
  );
}

interface Props {
  careerId: string;
  onPick: (id: string) => void;
  onOpenSubject: (id: string) => void;
}

export default function CareersView({ careerId, onPick, onOpenSubject }: Props) {
  const { play } = useSound();
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {CARREIRAS.map((c) => {
        const t = trilha(c);
        const w = weightsOf(c);
        const top = Object.entries(w)
          .filter(([, v]) => v >= 4)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);
        const opts = optativasRecomendadas(c).slice(0, 3);
        const dominante = topArea(c);
        const ativo = careerId === c.id;
        return (
          <article
            key={c.id}
            className="rpg-panel p-4 flex flex-col gap-3"
            style={{ borderColor: c.cor, opacity: ativo ? 1 : 0.94 }}
          >
            <header className="flex items-start gap-3">
              <CareerArt career={c} size="w-16 h-16" />
              <div className="min-w-0">
                <h3 className="font-pixel text-[9px] leading-[1.8]" style={{ color: c.cor }}>{c.nome}</h3>
                <p className="font-pixel text-[6px] text-scroll/70 mt-1">{c.cls.toUpperCase()} · {c.raca.toUpperCase()}</p>
                <p className="text-[19px] text-parchment leading-tight mt-1">{c.tagline}</p>
              </div>
            </header>

            <p className="text-[19px] text-scroll/85 leading-tight">{c.descricao}</p>

            <div className="grid grid-cols-3 gap-2 text-center">
              <Mini label="SKILLS" value={String(t.qtd)} color={c.cor} />
              <Mini label="CHAVE" value={String(t.qtdChave)} color={c.cor} />
              <Mini label="CARGA" value={`${t.ch}h`} color={c.cor} />
            </div>

            <div>
              <div className="font-pixel text-[6px] text-zelda-brown-light mb-1">ÁREA DOMINANTE · PERÍODOS {t.inicioChave}º–{t.fimChave}º</div>
              <div className="h-3 border-2 border-[#2a3a4a] bg-black/40">
                <div className="h-full" style={{ width: `${Math.min(100, (t.qtdChave / 16) * 100)}%`, background: dominante.cor }} />
              </div>
              <div className="text-[18px] mt-1" style={{ color: dominante.cor }}>{dominante.nome}</div>
            </div>

            <div>
              <div className="font-pixel text-[6px] text-zelda-brown-light mb-1">DISCIPLINAS-CHAVE</div>
              <div className="flex flex-wrap gap-1">
                {top.map(([id, v]) => (
                  <button
                    key={id}
                    onClick={() => {
                      play("open");
                      onOpenSubject(id);
                    }}
                    className="inventory-slot"
                    style={{ fontSize: 6, borderColor: c.cor, color: c.cor }}
                    title={DISC_BY_ID[id].nome}
                  >
                    +{v} {DISC_BY_ID[id].nome.length > 22 ? DISC_BY_ID[id].nome.slice(0, 21) + "…" : DISC_BY_ID[id].nome}
                  </button>
                ))}
              </div>
            </div>

            {opts.length > 0 && (
              <div>
                <div className="font-pixel text-[6px] text-zelda-brown-light mb-1">OPTATIVAS RECOMENDADAS</div>
                <div className="flex flex-wrap gap-1">
                  {opts.map(({ disc, weight }) => (
                    <button
                      key={disc.id}
                      onClick={() => {
                        play("open");
                        onOpenSubject(disc.id);
                      }}
                      className="inventory-slot"
                      style={{ fontSize: 6, borderColor: "#38b8b8", color: "#38b8b8" }}
                    >
                      OPT +{weight} {disc.nome}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => onPick(c.id)}
              className={`pixel-btn text-[8px] mt-auto ${ativo ? "active" : ""}`}
              style={!ativo ? { borderColor: c.cor, color: c.cor } : undefined}
            >
              {ativo ? "★ PERSONAGEM ATUAL" : "SELECIONAR PERSONAGEM"}
            </button>
          </article>
        );
      })}
    </div>
  );
}

function Mini({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="border-2 bg-black/30 py-1" style={{ borderColor: `${color}55` }}>
      <div className="font-pixel text-[6px] text-scroll/60">{label}</div>
      <div className="font-pixel text-[9px]" style={{ color }}>{value}</div>
    </div>
  );
}
