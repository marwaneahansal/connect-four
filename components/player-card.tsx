"use client";

import { motion } from "motion/react";

interface PlayerCardProps {
  player: 1 | 2;
  score: number;
  isActive: boolean;
}

export const PlayerCard = ({ player, score, isActive }: PlayerCardProps) => {
  const colors = {
    1: "red",
    2: "yellow",
  };

  return (
    <motion.div
      animate={{
        scale: isActive ? 1.1 : 1,
        opacity: isActive ? 1 : 0.8,
        borderColor: isActive
          ? `var(--color-${colors[player]})`
          : "var(--color-border)",
        boxShadow: isActive
          ? `0 0 15px rgba(var(--color-${colors[player]}), 0.4)`
          : "none",
      }}
      className="rounded-xl border-2 bg-card text-card-foreground shadow-sm"
    >
      <div className="flex flex-col space-y-1.5 p-6 items-center pb-2">
        <h3 className="font-semibold leading-none tracking-tight text-xl uppercase">
          Player {player}
        </h3>
      </div>
      <div className="p-6 flex flex-col items-center gap-4">
        <span className="text-6xl font-bold">{score}</span>
        <div
          className={`w-10 h-10 rounded-full shadow-inner mt-2 bg-${colors[player]}`}
        />
      </div>
    </motion.div>
  );
};
