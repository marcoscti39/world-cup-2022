import create from "zustand";
import { QuarterFinalTeamType } from "../components/Key1";

interface FinalistType {
  team: string;
  championshipState: string;
  teamFlag: string;
  group: number;
  quarterFinalsGroup: string;
}

interface FinalistsStoreType {
  finalistFromKey1: FinalistType;
  finalistFromKey2: FinalistType;
  winner: FinalistType;
  setWinner: (team: FinalistType) => void;
  setFinalistFromKey1: (team: QuarterFinalTeamType) => void;
  setFinalistFromKey2: (team: QuarterFinalTeamType) => void;
}

export const useFinalistsStore = create<FinalistsStoreType>()((set) => ({
  finalistFromKey1: {} as FinalistType,
  finalistFromKey2: {} as FinalistType,
  winner: {} as FinalistType,
  setFinalistFromKey1: (team) =>
    set((state) => ({
      ...state,
      finalistFromKey1: team,
    })),
  setFinalistFromKey2: (team) =>
    set((state) => ({ ...state, finalistFromKey2: team })),
  setWinner: (team) => set((state) => ({ ...state, winner: team })),
}));
