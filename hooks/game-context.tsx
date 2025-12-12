"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocalGame } from "@/hooks/use-local-game";

type GameContextValue = ReturnType<typeof useLocalGame>;

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const game = useLocalGame();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
}
