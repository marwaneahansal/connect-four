"use client";

import { PlayerCard } from "@/components/player-card";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { RefreshCw } from "lucide-react";
import { GameProvider, useGame } from "@/hooks/game-context";
import { GameBoard } from "@/components/game-board";
import { Logo } from "@/components/logo";
import { WinnerAnnouncement } from "@/components/winner-announcement";

export default function Home() {
  return (
    <GameProvider>
      <PageContent />
    </GameProvider>
  );
}

function PageContent() {
  const { currentPlayer, winner, scores, resetGame } = useGame();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
      <div className="w-full max-w-4xl flex items-center justify-between">
        <Button variant="outline">Menu</Button>
        <Logo />
        <Button variant="outline" onClick={resetGame}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Restart
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-8 items-center w-full max-w-6xl">
        <PlayerCard
          player={1}
          score={scores[1]}
          isActive={currentPlayer === 1}
        />

        <div className="relative bg-card p-4 rounded-2xl shadow-2xl border border-border">
          <GameBoard />

          <WinnerAnnouncement />
        </div>

        <PlayerCard
          player={2}
          score={scores[2]}
          isActive={currentPlayer === 2}
        />
      </div>

      <motion.div
        animate={{
          x: currentPlayer === 1 ? -10 : 10,
          backgroundColor:
            currentPlayer === 1 ? "var(--color-red)" : "var(--color-yellow)",
          opacity: winner ? 0 : 1,
          scale: winner ? 0.9 : 1,
        }}
        className="px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg"
      >
        {currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn"}
      </motion.div>
    </div>
  );
}
