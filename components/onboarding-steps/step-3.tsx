import { Bot, Shuffle, Swords, User } from "lucide-react";
import { SelectionCard } from "./selection-card";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";

export const OnboardingStep3 = () => {
  const { gameMode, player1, player2, starter, setStarter } =
    useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Who Starts?</h2>
        <p className="text-white/40">Choose who makes the first move</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <SelectionCard
          active={starter === "p1"}
          onClick={() => setStarter("p1")}
          icon={User}
          title={player1 || "Player 1"}
        />
        <SelectionCard
          active={starter === "p2"}
          onClick={() => setStarter("p2")}
          icon={gameMode === "ai" ? Bot : User}
          title={
            gameMode === "local"
              ? player2 || "Player 2"
              : gameMode === "ai"
              ? "AI"
              : "Opponent"
          }
        />
        <SelectionCard
          active={starter === "random"}
          onClick={() => setStarter("random")}
          icon={Shuffle}
          title="Random"
        />
      </div>

      <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 text-white/80 mb-2">
          <Swords className="w-5 h-5 text-red" />
          <span className="font-bold">Ready to Battle?</span>
        </div>
        <p className="text-sm text-white/40">
          {gameMode === "local"
            ? `${player1} vs ${player2}`
            : gameMode === "ai"
            ? `${player1} vs AI`
            : `${player1} vs Online`}
        </p>
      </div>
    </div>
  );
};
