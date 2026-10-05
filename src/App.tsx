import { useMemo, useState } from "react";
import {
  AREAS,
  AreaId,
  CARREIRAS,
  Career,
  CH_OBRIGATORIAS,
  CH_OPTATIVAS,
  DISCIPLINAS,
  META,
  OPTATIVAS,
} from "./data";

import CharacterSheet from "./components/CharacterSheet";
import MapView from "./components/MapView";
import PeriodsView from "./components/PeriodsView";
import AreasView from "./components/AreasView";
import CareersView from "./components/CareersView";
import GraphView from "./components/GraphView";
import Drawer from "./components/Drawer";
import PixelAvatar from "./components/PixelAvatar";
import { SoundProvider, useSound } from "./sound";

type View = "graph" | "map" | "periods" | "areas" | "careers";

function Shell() {
  const { enabled, toggle, play } = useSound();
  const [view, setView] = useState<View>("graph");
  const [careerIdx, setCareerIdx] = useState(0);
  const [highlight, setHighlight] = useState(true);
  const [showCareers, setShowCareers] = useState(true);
  const [area, setArea] = useState<AreaId | null>(null);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const career = CARREIRAS[careerIdx];
  const filtersActive = !!area || !!search.trim() || period !== "all";

  const matches = (d: (typeof DISCIPLINAS)[number]) => {
    if (area && d.area !== area) return false;
    if (period !== "all" && String(d.periodo === 0 ? "optativa" : d.periodo) !== period) return false;
    if (search.trim() && !d.nome.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  };
  const weightOf = (d: (typeof DISCIPLINAS)[number]) => career.overrides?.[d.id] || (d.carreiras.includes(career.id) ? (career.foco.includes(d.area) ? 4 : 3) : 0);
  const isDimmed = (d: (typeof DISCIPLINAS)[number]) => !matches(d) || (highlight && weightOf(d) === 0);

  const viewProps = { isDimmed, weight: weightOf, highlight, selectedId, onSelect: setSelectedId };

  const pickCareer = (id: string) => {
    const i = CARREIRAS.findIndex((c) => c.id === id);
    if (i >= 0 && i !== careerIdx) {
      play("levelup");
      setCareerIdx(i);
    }
  };

  const reset = () => {
    play("back");
    setArea(null);
    setSearch("");
    setPeriod("all");
  };

  const counts = useMemo(
    () => ({
      disc: DISCIPLINAS.filter((d) => d.tipo === "obrigatoria").length,
      opt: OPTATIVAS.length,
    }),
    []
  );

  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-zelda-green selection:text-black">
      <header className="sticky top-0 z-40 w-full game-hud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-pixel text-[8px] text-zelda-green-light bg-zelda-green-dark/40 border-2 border-zelda-green-dark px-2 py-1">
              IFMG CAMPUS OURO BRANCO
            </span>
            <h1 className="font-pixel text-[11px] sm:text-[13px] text-parchment leading-relaxed mt-2">
              SISTEMAS DE INFORMAÇÃO <span className="text-zelda-gold">BSI</span> — MAPA DO CURSO
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="map-controls flex items-center">
              {([
                ["graph", "GRAFO"],
                ["map", "MAPA"],
                ["periods", "PERÍODOS"],
                ["areas", "ÁREAS"],
                ["careers", "CARREIRAS"],
              ] as [View, string][]).map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => {
                    play("click");
                    setView(v);
                  }}
                  className={`pixel-btn text-[8px] ${view === v ? "active" : ""}`}
                  style={{ border: "none" }}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={toggle}
              title={enabled ? "Desativar som" : "Ativar som"}
              aria-pressed={enabled}
              className={`pixel-btn text-[8px] px-3 py-2 ${enabled ? "active" : ""}`}
            >
              {enabled ? "🔊 SOM ON" : "🔇 SOM OFF"}
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex flex-wrap items-center gap-2">
          <Stat label="CARGA MÍNIMA" value={`${META.cargaHorariaTotalMinima}H`} color="text-zelda-red-light" />
          <Stat label="OBRIGATÓRIAS" value={`${counts.disc} · ${CH_OBRIGATORIAS}H`} color="text-zelda-green" />
          <Stat label="OPTATIVAS" value={String(counts.opt)} color="text-zelda-cyan" />
          <Stat label="ÁREAS" value={String(AREAS.length)} color="text-zelda-blue-light" />
          <Stat label="CARREIRAS" value={String(CARREIRAS.length)} color="text-zelda-purple-light" />
          <Stat label="TURNO" value="NOTURNO" color="text-zelda-gold" />
          {filtersActive && (
            <div className="hud-stat ml-auto">
              <span className="font-pixel text-[6px] text-zelda-gold blink">FILTRO ATIVO</span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        <section className="rpg-dialog">
          <h2 className="font-pixel text-[11px] sm:text-[13px] text-parchment leading-[2]">
            ESCOLHA SUA CLASSE: CADA CARREIRA É UM PERSONAGEM
          </h2>
          <p className="text-xl text-scroll/90 max-w-3xl mt-2">
            O BSI forma profissionais para desenvolver sistemas e gerir a tecnologia das empresas. Abaixo, as disciplinas do
            ementário aparecem como <b className="text-zelda-gold">skills</b> na ficha de cada personagem, com o bônus que cada
            uma dá àquela carreira. No <b className="text-zelda-blue-light">GRAFO</b> você vê as conexões de pré-requisito; no{" "}
            <b className="text-zelda-blue-light">MAPA</b>, a sequência por período; em{" "}
            <b className="text-zelda-blue-light">ÁREAS</b>, o peso de cada região do conhecimento; e em{" "}
            <b className="text-zelda-blue-light">CARREIRAS</b>, todas as classes lado a lado.
          </p>
        </section>

        <section className="inventory-panel rpg-panel rpg-panel-green">
          <h3 className="font-pixel text-[8px] text-zelda-gold mb-3">SELECIONE O PERSONAGEM</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3">
            {CARREIRAS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => pickCareer(c.id)}
                className={`inventory-slot ${i === careerIdx ? "active" : ""}`}
                style={i === careerIdx ? { borderColor: c.cor, color: c.cor } : undefined}
              >
                <CareerThumb career={c} />
                {c.nome}
              </button>
            ))}
          </div>

          <CharacterSheet index={careerIdx} onChange={(i) => { setCareerIdx(i); }} onOpenSubject={setSelectedId} selectedId={selectedId} />

          <div className="flex sm:hidden justify-center gap-4 mt-4">
            <button className="pixel-btn text-[12px]" onClick={() => { play("back"); setCareerIdx((careerIdx - 1 + CARREIRAS.length) % CARREIRAS.length); }}>◀</button>
            <button className="pixel-btn text-[12px]" onClick={() => { play("click"); setCareerIdx((careerIdx + 1) % CARREIRAS.length); }}>▶</button>
          </div>
        </section>

        <section className="rpg-panel p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="font-pixel text-[7px] text-zelda-brown-light mb-2">ÁREAS DO CURSO:</div>
            <div className="flex flex-wrap items-center gap-1.5">
              {AREAS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    play("click");
                    setArea(area === a.id ? null : a.id);
                  }}
                  className={`region-tag ${area === a.id ? "active" : ""}`}
                  style={{ color: a.cor, borderColor: a.cor }}
                  title={a.nome}
                >
                  {a.icon} {a.abbr}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto justify-end">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar disciplina..."
              className="quest-log-input w-full sm:w-52 px-3 py-2 text-lg"
            />
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="quest-select px-3 py-2 text-lg">
              <option value="all">Todos os períodos</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                <option key={p} value={p}>{p}º período</option>
              ))}
              <option value="optativa">Optativas</option>
            </select>
            <button onClick={() => { play("toggle"); setHighlight(!highlight); }} className={`pixel-btn text-[7px] ${highlight ? "active" : ""}`} title="Só acende o que serve para a carreira escolhida">
              TRILHA: {highlight ? "SIM" : "NÃO"}
            </button>
            {view === "graph" && (
              <button onClick={() => { play("toggle"); setShowCareers(!showCareers); }} className={`pixel-btn text-[7px] ${showCareers ? "active" : ""}`}>
                CARREIRAS NO GRAFO: {showCareers ? "SIM" : "NÃO"}
              </button>
            )}
            <button onClick={reset} className="pixel-btn text-[8px] px-3">LIMPAR</button>
          </div>
        </section>

        {highlight && (
          <div className="pl-4 py-2 flex items-center gap-3 border-l-[6px]" style={{ borderColor: career.cor, background: `linear-gradient(90deg, ${career.cor}18, transparent 60%)` }}>
            <span className="w-12 h-12 border-2 flex items-center justify-center shrink-0 bg-black/30" style={{ borderColor: career.cor }}>
              <CareerThumb career={career} big />
            </span>
            <div>
              <div className="font-pixel text-[8px]" style={{ color: career.cor }}>TRILHA ATIVA: {career.nome.toUpperCase()}</div>
              <div className="text-xl text-scroll/90">{career.tagline} As disciplinas com bônus acendem; as demais ficam apagadas.</div>
            </div>
          </div>
        )}

        {view === "graph" && <GraphView {...viewProps} career={career} onSelectCareer={pickCareer} showCareers={showCareers} />}
        {view === "map" && <MapView {...viewProps} />}
        {view === "periods" && <PeriodsView {...viewProps} />}
        {view === "areas" && <AreasView {...viewProps} onPickCareer={pickCareer} />}
        {view === "careers" && <CareersView careerId={career.id} onPick={pickCareer} onOpenSubject={setSelectedId} />}

        <section className="rpg-panel p-5">
          <h3 className="font-pixel text-[8px] text-zelda-gold mb-3">FICHA DO CURSO</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="CURSO" value="Bacharelado em Sistemas de Informação" />
            <Fact label="INSTITUIÇÃO" value="IFMG — Campus Ouro Branco" />
            <Fact label="TURNO" value={META.turno} />
            <Fact label="DURAÇÃO" value={META.duracao} />
            <Fact label="VAGAS" value={META.vagas} />
            <Fact label="CARGA MÍNIMA" value={`${META.cargaHorariaTotalMinima}h`} />
            <Fact label="OBRIGATÓRIAS LISTADAS" value={`${META.cargaObrigatoriasListadas}h`} />
            <Fact label="OPTATIVAS ESPECÍFICAS" value={`${OPTATIVAS.length} disciplinas · ${CH_OPTATIVAS}h`} />
          </div>
        </section>

        <section className="rpg-panel p-5">
          <h3 className="font-pixel text-[8px] text-zelda-gold mb-2">SOBRE OS DADOS</h3>
          <p className="text-xl text-scroll/80">
            Disciplinas, códigos, cargas horárias (teoria/prática) e ementas vêm do <b>ementário oficial do BSI</b> — {META.turno},{" "}
            {META.duracao}, {META.vagas}. As <b className="text-zelda-cyan">optativas</b> listadas são as do ementário até Inglês
            para Negócios I, mais Redes II (PPC 2017); confirme o restante no PPC.
          </p>
          <p className="text-xl text-scroll/70 mt-2">
            Observações: os pré-requisitos exibidos são dependências sugeridas, porque o ementário não os lista; a relação entre
            disciplinas e carreiras é orientativa e serve como trilha de estudo, não como regra.
          </p>
          <p className="text-xl mt-2">
            <a href={META.fonte} target="_blank" rel="noopener noreferrer" className="text-zelda-blue-light underline">Ementário BSI (PDF oficial)</a>
            {" • "}
            <a href={META.fonteCurso} target="_blank" rel="noopener noreferrer" className="text-zelda-blue-light underline">Página do curso no IFMG</a>
            {" • "}
            <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="text-zelda-blue-light underline">roadmap.sh (referência de carreiras)</a>
          </p>
        </section>
      </main>

      <footer className="mt-auto border-t-4 border-zelda-gold-dim/30 bg-hyrule-dark py-4 text-center">
        <p className="font-pixel text-[6px] text-zelda-brown">MAPA DO BSI — IFMG CAMPUS OURO BRANCO — PROJETO ACADÊMICO</p>
      </footer>

      <Drawer
        subjectId={selectedId}
        onClose={() => setSelectedId(null)}
        onOpen={setSelectedId}
      />
    </div>
  );
}

function CareerThumb({ career, big }: { career: Career; big?: boolean }) {
  const size = big ? "w-12 h-12" : "w-7 h-7";
  if (career.img) return <img src={career.img} alt="" className={`${size} object-cover border-2`} style={{ borderColor: career.cor, filter: career.imgFilter }} />;
  return (
    <span className={`${size} inline-block border-2 overflow-hidden bg-[#d8d0bd]`} style={{ borderColor: career.cor }}>
      <PixelAvatar spec={career.avatar!} />
    </span>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-[#2a3a4a] bg-black/25 px-3 py-2">
      <div className="font-pixel text-[6px] text-zelda-brown-light">{label}</div>
      <div className="font-pixel text-[8px] text-parchment leading-[1.8] mt-1">{value}</div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="hud-stat">
      <div>
        <div className="hud-stat-label">{label}</div>
        <div className={`hud-stat-value ${color}`}>{value}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <Shell />
    </SoundProvider>
  );
}
