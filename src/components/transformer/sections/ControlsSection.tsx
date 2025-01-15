import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ControlsSectionProps {
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  handleContinue: () => void;
  isProcessing: boolean;
  waitForUser: boolean;
}

const ControlsSection: React.FC<ControlsSectionProps> = ({
  isPaused,
  setIsPaused,
  handleContinue,
  isProcessing,
  waitForUser,
}) => {
  const flowAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="flex justify-center gap-4 my-4"
      variants={flowAnimation}
      initial="hidden"
      animate="visible"
    >
      <Button
        variant="outline"
        onClick={() => setIsPaused(!isPaused)}
        disabled={!isProcessing}
        className="transition-all duration-300 hover:scale-105"
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
      <Button
        onClick={handleContinue}
        disabled={!waitForUser || !isProcessing}
        className="transition-all duration-300 hover:scale-105"
      >
        Continue to Next Step
      </Button>
    </motion.div>
  );
};

export default ControlsSection;