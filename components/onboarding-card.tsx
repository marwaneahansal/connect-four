"use client";
import { AnimatePresence, motion } from "motion/react";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/hooks/use-onboarding-store";
import { OnboardingStep1 } from "./onboarding-steps/step-1";
import { OnboardingStep2 } from "./onboarding-steps/step-2";
import { OnboardingStep3 } from "./onboarding-steps/step-3";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useGameStore } from "@/hooks/use-game-store";

export const OnboardingCard = () => {
  const [direction, setDirection] = useState(0);
  const totalSteps = 3;

  const {
    step,
    gameMode,
    player1,
    player2,
    canProceed,
    setStep,
    setIsOnboarded,
  } = useOnboardingStore();

  const { initGame } = useGameStore();

  const handleNext = () => {
    if (!canProceed()) return;

    if (step === totalSteps) {
      setIsOnboarded(true);
      initGame();
      redirect("/game");
    }

    setDirection(1);
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (step > 1) {
      setStep(step - 1);
    }
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
              {step === 1 && <OnboardingStep1 />}

              {step === 2 && <OnboardingStep2 />}

              {step === 3 && <OnboardingStep3 />}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex justify-between pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={step === 1}
              className="h-12 px-8 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 disabled:opacity-30"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                step === 2 && (!player1 || (gameMode === "local" && !player2))
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
