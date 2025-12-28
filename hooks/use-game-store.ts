import { create } from "zustand";
import { useOnboardingStore } from "./use-onboarding-store";

type Board = (1 | 2 | null)[][];

interface GameState {
  board: Board;
  currentPlayer: 1 | 2;
  winner: 1 | 2 | null;
  scores: { 1: number; 2: number };
  hoveredCol: number | null;
  gameStatus: "playing" | "finished";

  initGame: () => void;
  makeMove: (col: number) => void;
  resetGame: () => void;
  setHoveredCol: (col: number | null) => void;
  findLowestRow: (col: number) => number;
}

const createEmptyBoard = () => {
  return Array.from({ length: 6 }, () => Array(7).fill(null));
}

const getStartingPlayer = (): 1 | 2 => {
  const { starter } = useOnboardingStore.getState();
  if (starter === "p1") return 1;
  if (starter === "p2") return 2;
  return Math.random() < 0.5 ? 1 : 2;
};

const checkWinner = (
  board: Board,
  row: number,
  col: number,
  player: 1 | 2
): boolean => {
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

export const useGameStore = create<GameState>((set, get) => ({
  board: createEmptyBoard(),
  currentPlayer: 1,
  winner: null,
  scores: { 1: 0, 2: 0 },
  hoveredCol: null,
  gameStatus: "playing",

  initGame: () => {
    set({
      board: createEmptyBoard(),
      currentPlayer: getStartingPlayer(),
      winner: null,
      gameStatus: "playing",
      hoveredCol: null,
    });
  },

  findLowestRow: (col: number) => {
    const { board } = get();
    for (let r = 5; r >= 0; r--) {
      if (!board[r][col]) return r;
    }
    return -1;
  },

  makeMove: (col: number) => {
    const { board, currentPlayer, winner, gameStatus, findLowestRow } = get();

    if (winner || gameStatus === "finished") return;

    const row = findLowestRow(col);
    if (row === -1) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;

    const hasWinner = checkWinner(newBoard, row, col, currentPlayer);
    const isDraw = newBoard.every((r) => r.every((cell) => cell !== null));

    if (hasWinner) {
      set((state) => ({
        board: newBoard,
        winner: currentPlayer,
        scores: {
          ...state.scores,
          [currentPlayer]: state.scores[currentPlayer] + 1,
        },
        gameStatus: "finished",
      }));
    } else if (isDraw) {
      set({
        board: newBoard,
        winner: null,
        gameStatus: "finished",
      });
    } else {
      set({
        board: newBoard,
        currentPlayer: currentPlayer === 1 ? 2 : 1,
      });
    }
  },

  resetGame: () => {
    set({
      board: createEmptyBoard(),
      currentPlayer: getStartingPlayer(),
      winner: null,
      gameStatus: "playing",
      hoveredCol: null,
    });
  },

  setHoveredCol: (col: number | null) => {
    set({ hoveredCol: col });
  },
}));
