"use client";
import { AnimatePresence, motion } from "motion/react";

import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Users, Globe, Bot, User, Shuffle, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

type GameMode = "local" | "online" | "ai";
type Starter = "p1" | "p2" | "random";

export const OnboardingCard = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [gameMode, setGameMode] = useState<GameMode>("local");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [starter, setStarter] = useState<Starter>("random");

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (step === 2) {
      if (!player1.trim()) return;
      if (gameMode === "local" && !player2.trim()) return;
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleNextWithDirection = () => {
    if (step === 2) {
      if (!player1.trim()) return;
      if (gameMode === "local" && !player2.trim()) return;
    }
    setDirection(1);
    handleNext();
  };

  const handleBackWithDirection = () => {
    setDirection(-1);
    handleBack();
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const SelectionCard = ({
    active,
    onClick,
    icon: Icon,
    title,
    description,
  }: {
    active: boolean;
    onClick: () => void;
    icon?: any;
    title: string;
    description?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 w-full h-full",
        active
          ? "border-red bg-red/10 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)]"
          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:border-white/20"
      )}
    >
      {Icon && <Icon className={cn("w-8 h-8 mb-3", active ? "text-red" : "text-white/60")} />}
      <div className="font-bold text-lg">{title}</div>
      {description && <div className="text-xs text-white/40 mt-1">{description}</div>}
    </button>
  );

  return (
    <Card className="game-card-glow border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden w-full max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-red -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
          
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="relative">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 z-10",
                  index + 1 <= step
                    ? "bg-red border-red text-white shadow-lg"
                    : "bg-black border-white/20 text-white/40"
                )}
                animate={{
                  scale: index + 1 === step ? 1.2 : 1,
                }}
              >
                {index + 1 < step ? (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <motion.path d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 whitespace-nowrap font-medium">
                {index === 0 && "Mode"}
                {index === 1 && "Players"}
                {index === 2 && "Start"}
              </div>
            </div>
          ))}
        </div>

        <div className="min-h-[300px] relative flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex-1"
            >
              {step === 1 && (
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
                    />
                    <SelectionCard
                      active={gameMode === "ai"}
                      onClick={() => setGameMode("ai")}
                      icon={Bot}
                      title="Vs AI"
                      description="Single player"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-white">Player Names</h2>
                    <p className="text-white/40">Enter the names of the players</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white/80">Player 1 (You)</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input
                          value={player1}
                          onChange={(e) => setPlayer1(e.target.value)}
                          placeholder="Enter your name"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-red focus-visible:border-red"
                        />
                      </div>
                    </div>
                    {gameMode === "local" && (
                      <div className="space-y-2">
                        <Label className="text-white/80">Player 2</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                          <Input
                            value={player2}
                            onChange={(e) => setPlayer2(e.target.value)}
                            placeholder="Enter player 2 name"
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-red focus-visible:border-red"
                          />
                        </div>
                      </div>
                    )}
                    {gameMode === "ai" && (
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3 text-white/60">
                        <Bot className="w-5 h-5" />
                        <span>Opponent: <strong>AI Bot</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
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
                      {gameMode === 'local' ? `${player1} vs ${player2}` : 
                       gameMode === 'ai' ? `${player1} vs AI` : 
                       `${player1} vs Online`}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex justify-between pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleBackWithDirection}
              variant="outline"
              disabled={step === 1}
              className="h-12 px-8 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-30"
            >
              Back
            </Button>
            <Button
              onClick={handleNextWithDirection}
              disabled={
                (step === 2 && (!player1 || (gameMode === "local" && !player2)))
              }
              className="h-12 px-8 text-base font-bold bg-red hover:bg-red/90 text-white shadow-lg shadow-red/20"
            >
              {step === totalSteps ? "Start Game" : "Next"}
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
