import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { SelectionCard } from "./selection-card";
import { Globe, Users, Bot } from "lucide-react";

export const OnboardingStep1 = () => {
  const { gameMode, setGameMode } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Choose Game Mode</h2>
        <p className="text-white/40">Select how you want to play</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectionCard
          active={gameMode === "local"}
          onClick={() => setGameMode("local")}
          icon={Users}
          title="Local"
          description="Same device"
        />
        <SelectionCard
          active={gameMode === "online"}
          onClick={() => setGameMode("online")}
          icon={Globe}
          title="Online"
          description="Multiplayer"
          disabled
        />
        <SelectionCard
          active={gameMode === "ai"}
          onClick={() => setGameMode("ai")}
          icon={Bot}
          title="Vs AI"
          description="Single player"
          disabled
        />
      </div>
    </div>
  );
};
