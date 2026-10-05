import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Sfx = "click" | "hover" | "select" | "open" | "close" | "toggle" | "levelup" | "back";

const STORAGE_KEY = "bsi-map-som";

type Ctx = { enabled: boolean; toggle: () => void; play: (s: Sfx) => void };
const SoundCtx = createContext<Ctx>({ enabled: true, toggle: () => {}, play: () => {} });

let audio: AudioContext | null = null;
function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    audio = new AC();
  }
  if (audio.state === "suspended") void audio.resume();
  return audio;
}

interface Tone {
  f: number;
  to?: number;
  t: number; // início (s)
  d: number; // duração (s)
  type?: OscillatorType;
  g?: number;
}

const BANK: Record<Sfx, Tone[]> = {
  click: [{ f: 520, to: 760, t: 0, d: 0.07 }],
  hover: [{ f: 880, t: 0, d: 0.03, g: 0.05 }],
  select: [
    { f: 523, t: 0, d: 0.08 },
    { f: 659, t: 0.07, d: 0.08 },
    { f: 784, t: 0.14, d: 0.14 },
  ],
  open: [
    { f: 392, t: 0, d: 0.06 },
    { f: 587, t: 0.06, d: 0.1 },
  ],
  close: [
    { f: 587, t: 0, d: 0.06 },
    { f: 330, t: 0.06, d: 0.12 },
  ],
  toggle: [
    { f: 988, t: 0, d: 0.05 },
    { f: 1319, t: 0.05, d: 0.07 },
  ],
  levelup: [
    { f: 523, t: 0, d: 0.09 },
    { f: 659, t: 0.09, d: 0.09 },
    { f: 784, t: 0.18, d: 0.09 },
    { f: 1047, t: 0.27, d: 0.2, g: 0.12 },
  ],
  back: [{ f: 300, to: 180, t: 0, d: 0.1 }],
};

function run(tones: Tone[]) {
  const ac = ctx();
  if (!ac) return;
  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = 0.16;
  master.connect(ac.destination);
  tones.forEach(({ f, to, t, d, type = "square", g = 0.9 }) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f, now + t);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, now + t + d);
    gain.gain.setValueAtTime(0.0001, now + t);
    gain.gain.exponentialRampToValueAtTime(g, now + t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now + t);
    osc.stop(now + t + d + 0.02);
  });
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof localStorage === "undefined") return true;
    return localStorage.getItem(STORAGE_KEY) !== "off";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  }, [enabled]);

  const play = useCallback(
    (s: Sfx) => {
      if (!enabled) return;
      run(BANK[s]);
    },
    [enabled]
  );

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      if (next) setTimeout(() => run(BANK.toggle), 0);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);
  return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>;
}

export const useSound = () => useContext(SoundCtx);
