import {
  AREA_BY_ID,
  CARREIRAS,
  Career,
  careerSkills,
  careerStats,
  optativasRecomendadas,
  periodLabel,
  topArea,
  trilha,
} from "../data";
import PixelAvatar from "./PixelAvatar";
import { useSound } from "../sound";

interface Props {
  index: number;
  onChange: (i: number) => void;
  onOpenSubject: (id: string) => void;
  selectedId: string | null;
}

const fmt = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

export default function CharacterSheet({ index, onChange, onOpenSubject, selectedId }: Props) {
  const { play } = useSound();
  const career: Career = CARREIRAS[index];
  const stats = careerStats(career);
  const skills = careerSkills(career);
  const core = skills.filter((s) => s.weight >= 4);
  const coreHours = core.reduce((a, s) => a + s.disc.ch, 0);
  const totalHours = skills.reduce((a, s) => a + s.disc.ch, 0);
  const t = trilha(career);
  const firstCore = t.inicioChave;
  const lastCore = t.fimChave;
  const opts = optativasRecomendadas(career);
  const dominante = topArea(career);
  const prev = () => {
    play("back");
    onChange((index - 1 + CARREIRAS.length) % CARREIRAS.length);
  };
  const next = () => {
    play("click");
    onChange((index + 1) % CARREIRAS.length);
  };

  return (
    <div className="flex items-start justify-center gap-2 sm:gap-4">
      <button onClick={prev} className="pixel-btn text-[14px] px-3 py-3 mt-40 hidden sm:block" aria-label="Personagem anterior">◀</button>

      <div key={career.id} className="sheet pop-in w-full max-w-[820px]" aria-live="polite">
        <div className="sheet-box px-3 py-2 sheet-head grid grid-cols-[1fr_auto] gap-x-3">
          <div>
            <div><b>Nome</b><span className="v">{career.nome}</span></div>
            <div className="flex flex-wrap gap-x-4">
              <span><b>Classe</b><span className="v">{career.cls}</span></span>
              <span><b>Área</b><span className="v">{career.raca}</span></span>
            </div>
            <div className="flex flex-wrap gap-x-4 text-[19px]">
              <span><b>Curso</b><span className="v">BSI · IFMG OB</span></span>
              <span><b>Trilha</b><span className="v">{firstCore}º ao {lastCore}º per.</span></span>
            </div>
          </div>
          <div className="font-pixel text-[10px] self-start pt-1 text-right">
            <div>Nv. {skills.length}</div>
            <div className="text-[7px] mt-2" style={{ color: career.cor === "#f8d830" ? "#8a6a18" : career.cor }}>
              {career.tagline}
            </div>
          </div>
        </div>

        <div className="grid gap-3 mt-3 md:grid-cols-[1.05fr_1fr]">
          <div className="space-y-3 min-w-0">
            <div className="flex justify-between gap-2">
              <Shield abbr="HABIL" mod={String(skills.length)} score="total" />
              <Shield abbr="CHAVE" mod={String(core.length)} score="+4/+5" />
              <Shield abbr="HORAS" mod={String(coreHours)} score="chave" small />
            </div>

            <div className="grid grid-cols-3 gap-2 justify-items-center">
              {stats.map(({ area, score, mod }) => (
                <Shield key={area.id} abbr={area.abbr} mod={fmt(mod)} score={String(score)} color={area.cor} />
              ))}
            </div>

            <div>
              <div className="sheet-label">Skills (disciplinas)</div>
              <div className="sheet-box mt-2 py-1">
                <div className="sheet-scroll max-h-[298px] overflow-y-auto">
                  {skills.map(({ disc, weight }) => (
                    <button
                      key={disc.id}
                      className={`skill-row ${selectedId === disc.id ? "focused" : ""}`}
                      onClick={() => {
                        play("open");
                        onOpenSubject(disc.id);
                      }}
                      onMouseEnter={() => play("hover")}
                      title={`${disc.nome} — ${periodLabel(disc.periodo)} • ${disc.ch}h (${disc.chT}h teoria / ${disc.chP}h prática)`}
                    >
                      <span className={`dot ${weight >= 4 ? "core" : ""}`} />
                      <span className="bonus">{fmt(weight)}</span>
                      <span className="sname">{disc.nome}</span>
                      <span className="area-chip" style={{ background: AREA_BY_ID[disc.area].cor }} />
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[16px] mt-1 text-[#4a4236]">● disciplinas-chave (+4/+5) · ○ apoio. Clique para abrir a ficha.</p>
            </div>
          </div>

          <div className="space-y-3 min-w-0">
            <div className="sprite-stage aspect-[4/4.2]">
              {career.img ? (
                <img src={career.img} alt={`${career.nome} — ${career.cls}`} className="sprite-bob" style={{ filter: career.imgFilter }} />
              ) : (
                <div className="w-full h-full flex items-end justify-center p-2" style={{ background: "#d8d0bd" }}>
                  <div className="w-[86%] h-full">
                    <PixelAvatar spec={career.avatar!} />
                  </div>
                </div>
              )}
            </div>

            <div className="sheet-box px-3 py-2 text-[21px] leading-tight space-y-1">
              <div className="flex justify-between"><span className="font-bold">+{core.length}</span><span className="flex-1 ml-2">Disciplinas-chave</span></div>
              <div className="flex justify-between"><span className="font-bold">{firstCore}º</span><span className="flex-1 ml-2">Iniciativa (per.)</span></div>
              <div className="flex justify-between"><span className="font-bold">{totalHours}h</span><span className="flex-1 ml-2">Carga da trilha</span></div>
              <div className="flex justify-between"><span className="font-bold">{t.chChave}h</span><span className="flex-1 ml-2">Carga das chave</span></div>
            </div>

            <div>
              <div className="sheet-label">Atributo dominante</div>
              <div className="sheet-box mt-2 px-3 py-2 flex items-center gap-3">
                <span className="inline-block w-4 h-4 border-2 border-[#4a4236]" style={{ background: dominante.cor }} />
                <span className="text-[21px] leading-tight flex-1">{dominante.nome}</span>
              </div>
            </div>

            {opts.length > 0 && (
              <div>
                <div className="sheet-label">Optativas recomendadas</div>
                <div className="sheet-box mt-2 py-1">
                  {opts.slice(0, 6).map(({ disc, weight }) => (
                    <button
                      key={disc.id}
                      className={`skill-row ${selectedId === disc.id ? "focused" : ""}`}
                      onClick={() => {
                        play("open");
                        onOpenSubject(disc.id);
                      }}
                      title={`${disc.nome} — optativa • ${disc.ch}h`}
                    >
                      <span className="dot core" style={{ background: "#2f9a9a", borderColor: "#1f6f6f" }} />
                      <span className="bonus">{fmt(weight)}</span>
                      <span className="sname">{disc.nome}</span>
                      <span className="area-chip" style={{ background: "#38b8b8" }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="sheet-label">Antecedente</div>
              <div className="sheet-box mt-2 px-3 py-2 text-[23px] leading-tight">{career.antecedente}</div>
              <p className="text-[19px] leading-tight mt-2">{career.descricao}</p>
            </div>

            <div>
              <div className="sheet-label">Equipamento</div>
              <div className="sheet-box mt-2 py-1">
                {career.tools.map((t) => (
                  <div key={t.nome} className="equip-row">
                    <span className="equip-icon">{t.icon}</span>
                    <span>{t.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={next} className="pixel-btn text-[14px] px-3 py-3 mt-40 hidden sm:block" aria-label="Próximo personagem">▶</button>
    </div>
  );
}

function Shield({ abbr, mod, score, color, small }: { abbr: string; mod: string; score: string; color?: string; small?: boolean }) {
  return (
    <div className="shield-stat" style={color ? { boxShadow: `inset 0 -5px 0 ${color}66, inset 2px 2px 0 #efe9da, inset -2px -2px 0 #a59c86` } : undefined}>
      <div className="abbr">{abbr}</div>
      <div className="mod" style={small ? { fontSize: 20 } : undefined}>{mod}</div>
      <div className="score" style={{ fontSize: 15 }}>{score}</div>
    </div>
  );
}
