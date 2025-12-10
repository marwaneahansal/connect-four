"use client";

import { PlayerCard } from "@/components/player-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<Array<Array<1 | 2 | null>>>(
    Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const getLowestEmptyRow = (col: number) => {
    for (let r = 5; r >= 0; r--) {
      if (!board[r][col]) return r;
    }
    return -1;
  };

  const checkWinner = (
    board: (1 | 2 | null)[][],
    row: number,
    col: number,
    player: 1 | 2
  ) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (const [dr, dc] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r < 0 || r >= 6 || c < 0 || c >= 7 || board[r][c] !== player) break;
        count++;
      }
      for (let i = 1; i < 4; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (r < 0 || r >= 6 || c < 0 || c >= 7 || board[r][c] !== player) break;
        count++;
      }
      if (count >= 4) return true;
    }
    return false;
  };

  const handleCellClick = (col: number) => {
    setHoveredCol(null);
    if (winner) return;

    // Find the lowest empty row in the selected column
    for (let r = 5; r >= 0; r--) {
      if (!board[r][col]) {
        const newBoard = board.map((row) => [...row]);
        newBoard[r][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWinner(newBoard, r, col, currentPlayer)) {
          setWinner(currentPlayer);
          setScores((prev) => ({
            ...prev,
            [currentPlayer]: prev[currentPlayer] + 1,
          }));
        } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        break;
      }
    }
  };

  const restart = () => {
    setBoard(
      Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null))
    );
    setCurrentPlayer(winner || 1);
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-4 flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
      <div className="w-full max-w-4xl flex items-center justify-between">
        <Button variant="outline">Menu</Button>
        <div className="grid grid-cols-2 gap-2 hover:scale-105 transition-transform">
          <div className="w-6 h-6 rounded-full bg-red" />
          <div className="w-6 h-6 rounded-full bg-yellow" />
          <div className="w-6 h-6 rounded-full bg-yellow" />
          <div className="w-6 h-6 rounded-full bg-red" />
        </div>
        <Button variant="outline" onClick={restart}>
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
          <div
            className="grid grid-cols-7 gap-2 md:gap-3 bg-secondary/30 p-4 rounded-xl"
            onMouseLeave={() => setHoveredCol(null)}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-background border-2 border-border/40 relative cursor-pointer flex items-center justify-center shadow-inner overflow-hidden"
                  onClick={() => handleCellClick(colIndex)}
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
                      rowIndex === getLowestEmptyRow(colIndex) &&
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

          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <Card className="w-72 border-2 border-primary shadow-2xl">
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-2xl">
                        {winner === 1 ? (
                          <span className="text-red">Player 1</span>
                        ) : (
                          <span className="text-yellow">Player 2</span>
                        )}{" "}
                        Wins!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center pt-4 pb-6">
                      <Button
                        size="lg"
                        onClick={restart}
                        className="w-full font-bold"
                      >
                        Play Again
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
