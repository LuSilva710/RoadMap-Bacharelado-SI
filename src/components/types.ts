import { Disciplina } from "../data";

export interface ViewProps {
  isDimmed: (d: Disciplina) => boolean;
  weight: (d: Disciplina) => number;
  highlight: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}
