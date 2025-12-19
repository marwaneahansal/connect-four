import { Label } from "@radix-ui/react-label";
import { Bot, User } from "lucide-react";
import { Input } from "../ui/input";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";

export const OnboardingStep2 = () => {
  const { gameMode, player1, player2, setPlayer1, setPlayer2 } =
    useOnboardingStore();

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Player Names</h2>
        <p className="text-white/40">Enter the names of the players</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 bg-red rounded-full" />
            <Label className="text-white/80">Player 1</Label>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              placeholder="Enter your name"
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-red/20 focus-visible:border-red/20"
            />
          </div>
        </div>
        {gameMode === "local" && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-yellow-500 rounded-full" />
              <Label className="text-white/80">Player 2</Label>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                placeholder="Enter player 2 name"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-yellow/20 focus-visible:border-yellow/20"
              />
            </div>
          </div>
        )}
        {gameMode === "ai" && (
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3 text-white/60">
            <Bot className="w-5 h-5" />
            <span>
              Opponent: <strong>AI Bot</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
