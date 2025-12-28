"use client";

import { useGameStore } from "@/hooks/use-game-store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export const GameBoard = () => {
  const {
    board,
    currentPlayer,
    winner,
    hoveredCol,
    setHoveredCol,
    makeMove,
    findLowestRow,
  } = useGameStore();

  return (
    <div
      className="grid grid-cols-7 gap-2 md:gap-3 bg-secondary/30 p-4 rounded-xl"
      onMouseLeave={() => setHoveredCol(null)}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-background border-2 border-border/40 relative cursor-pointer flex items-center justify-center shadow-inner overflow-hidden"
            onClick={() => makeMove(colIndex)}
            onMouseEnter={() => setHoveredCol(colIndex)}
          >
            <AnimatePresence>
              {cell && (
                <motion.div
                  initial={{ y: -300, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "w-full h-full rounded-full shadow-md absolute inset-0",
                    cell === 1 ? "bg-red" : "bg-yellow"
                  )}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!cell &&
                hoveredCol === colIndex &&
                rowIndex === findLowestRow(colIndex) &&
                !winner && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className={cn(
                      "w-full h-full rounded-full absolute inset-0",
                      currentPlayer === 1 ? "bg-red" : "bg-yellow"
                    )}
                  />
                )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  );
};
