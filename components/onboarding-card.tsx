"use client";
import { AnimatePresence, motion } from "motion/react";

import { Card, CardContent, CardHeader } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";

export const OnboardingCard = () => {
  const [step, setStep] = useState(2);
  const totalSteps = 4;

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const [direction, setDirection] = useState(0);

  const handleNextWithDirection = () => {
    setDirection(1);
    handleNext();
  };

  const handleBackWithDirection = () => {
    setDirection(-1);
    handleBack();
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <Card className="game-card-glow border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden">
      <CardContent>
        <div className="flex items-center justify-between mt-4 mb-12">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center flex-1">
              <motion.div
                initial={false}
                animate={{
                  scale: index + 1 === step ? 1.1 : 1,
                }}
                className="relative"
              >
                <motion.div
                  className={`flex items-center justify-center w-14 h-14 rounded-full font-bold text-lg transition-all duration-300 ${
                    index + 1 < step
                      ? "bg-red text-white shadow-lg"
                      : index + 1 === step
                      ? "bg-red text-white shadow-2xl"
                      : "bg-white/10 text-white/40 border-2 border-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {index + 1 < step ? (
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6"
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
                {/* {index + 1 === step && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-red/90 -z-1"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )} */}
              </motion.div>
              {index < totalSteps && (
                <div className="flex-1 h-1 mx-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r bg-red"
                    initial={{ width: 0 }}
                    animate={{ width: index + 1 < step ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="min-h-[100px] relative">
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
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="space-y-8 flex items-center justify-center"
            >
              {step === 1 && <p>Step 1</p>}
              {step === 2 && <p>Step 2</p>}
              {step === 3 && <p>Step 3</p>}
              {step === 4 && <p>Step 4</p>}
            </motion.div>
          </AnimatePresence>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between pt-8 gap-4"
          >
            <Button
              onClick={handleBackWithDirection}
              variant="outline"
              disabled={step === 1}
              className="h-12 px-8 text-lg bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
            >
              Back
            </Button>
            <Button
              onClick={handleNextWithDirection}
              className="h-12 px-8 text-l font-bold shadow-lg text-black"
            >
              {step === totalSteps ? "Start Game!" : "Next"}
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
