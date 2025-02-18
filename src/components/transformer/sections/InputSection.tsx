import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  learningRate: number;
  setLearningRate: (rate: number) => void;
  handleProcess: () => void;
  isProcessing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputText,
  setInputText,
  learningRate,
  setLearningRate,
  handleProcess,
  isProcessing,
}) => {
  const dataFlowAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={dataFlowAnimation}
      initial="initial"
      animate="animate"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Input Text</label>
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text (e.g., 'Hello')"
            disabled={isProcessing}
            className="transition-all duration-300 hover:border-primary"
          />
          <Button 
            onClick={handleProcess} 
            disabled={!inputText || isProcessing}
            className="transition-all duration-300 hover:scale-105"
          >
            Process
          </Button>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-medium mb-2">Learning Rate</label>
        <Slider
          value={[learningRate]}
          onValueChange={(value) => setLearningRate(value[0])}
          min={0.01}
          max={1}
          step={0.01}
          disabled={isProcessing}
          className="transition-all duration-300"
        />
        <div className="text-sm text-muted-foreground mt-1 animate-fade-in">
          Current: {learningRate}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InputSection;