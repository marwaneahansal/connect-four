"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<Array<Array<1 | 2 | null>>>(
    Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  const isValidMove = (row: number, col: number) => {
    if (board[row][col]) return false;

    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || !isValidMove(row, col)) return;

    // Find the lowest empty row in the selected column
    for (let r = 5; r >= 0; r--) {
      if (!board[r][col]) {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[r][col] = currentPlayer;
          return newBoard;
        });
        setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
        break;
      }
    }
  };

  const restart = () => {
    setBoard(Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null)));
    setCurrentPlayer(1);
  };
  
  return (
    <div className="mt-10">
      <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
        <Button size={"sm"}>Menu</Button>
        <div className="grid grid-cols-2 gap-2 group">
          <div className="w-4 h-4 bg-red rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
          <div className="w-4 h-4 bg-yellow rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
          <div className="w-4 h-4 bg-yellow rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
          <div className="w-4 h-4 bg-red rounded-full outline-2 outline-foreground group-hover:-translate-y-0.5 transition ease-out duration-75" />
        </div>
        <Button size={"sm"} onClick={restart}>Restart</Button>
      </div>

      <div className="max-w-6xl grid grid-cols-[auto_1fr_auto] gap-8 mx-auto">
        <div className="gap-y-3 text-red flex flex-col items-center self-center py-12 px-8 border-2 border-red rounded-2xl">
          <p className="text-xl uppercase font-bold tracking-wide">Player 1</p>
          <p className="text-4xl font-bold">0</p>
        </div>
        <div className="px-4 py-6 mx-auto aspect-[7/6] bg-card rounded-lg shadow-md outline-2 outline-offset-2 outline-foreground mt-8">
          <div className="grid grid-rows-6 gap-1 gap-y-5">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-7 gap-1">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`border-2 border-foreground mx-auto w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
                      cell === 1 ? "bg-red" : cell === 2 ? "bg-yellow" : "bg-transparent"
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="gap-y-3 text-yellow flex flex-col items-center self-center py-12 px-8 border-2 border-yellow rounded-2xl">
          <p className="text-xl uppercase font-bold tracking-wide">Player 2</p>
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
