import { useCallback, useState } from "react";

export const useLocalGame = () => {
  const [board, setBoard] = useState<Array<Array<1 | 2 | null>>>(
    Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<"playing" | "finished">(
    "playing"
  );

  const findLowestRow = (col: number) => {
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

  const makeMove = useCallback(
    (col: number) => {
      if (winner || gameStatus === "finished") return;

      const row = findLowestRow(col);
      if (row === -1) return;

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      const hasWinner = checkWinner(newBoard, row, col, currentPlayer);
      const isDraw = newBoard.every((r) => r.every((cell) => cell !== null));

      if (hasWinner) {
        setWinner(currentPlayer);
        setScores((prev) => ({
          ...prev,
          [currentPlayer]: prev[currentPlayer] + 1,
        }));
        setGameStatus("finished");
      } else if (isDraw) {
        setWinner(null);
        setGameStatus("finished");
      } else {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    },
    [board, currentPlayer, winner, gameStatus]
  );

  const resetGame = useCallback(() => {
    setBoard(
      Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null))
    );
    setCurrentPlayer(1);
    setWinner(null);
    setGameStatus("playing");
    setHoveredCol(null);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    scores,
    hoveredCol,
    gameStatus,
    makeMove,
    resetGame,
    setHoveredCol,
    findLowestRow,
  };
};
