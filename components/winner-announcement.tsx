"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGame } from "@/hooks/game-context";
import { AnimatePresence, motion } from "motion/react";

export const WinnerAnnouncement = () => {
  const { resetGame, winner } = useGame();

  return (
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
                  onClick={resetGame}
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
  );
};
