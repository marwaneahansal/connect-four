import { create } from "zustand";

export type GameMode = "local" | "online" | "ai";
export type Starter = "p1" | "p2" | "random";

interface OnboardingState {
  step: number;
  gameMode: GameMode;
  player1: string;
  player2: string;
  starter: Starter;

  setStep: (step: number) => void;
  setGameMode: (mode: GameMode) => void;
  setPlayer1: (name: string) => void;
  setPlayer2: (name: string) => void;
  setStarter: (starter: Starter) => void;
  reset: () => void;
  canProceed: () => boolean;
}

const initialState = {
  step: 1,
  gameMode: "local" as GameMode,
  player1: "",
  player2: "",
  starter: "random" as Starter,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setGameMode: (mode) => set({ gameMode: mode }),

  setPlayer1: (name) => set({ player1: name }),

  setPlayer2: (name) => set({ player2: name }),

  setStarter: (starter) => set({ starter }),

  reset: () => set(initialState),

  canProceed: () => {
    const state = get();
    if (state.step === 2) {
      if (!state.player1.trim()) return false;
      if (state.gameMode === "local" && !state.player2.trim()) return false;
    }
    return true;
  },
}));
