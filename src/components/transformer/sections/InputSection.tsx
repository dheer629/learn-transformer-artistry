
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { countTokens } from "../utils/tokenUtils";
import { useToast } from "@/hooks/use-toast";

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
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    const updateTokenCount = async () => {
      if (inputText) {
        const count = await countTokens(inputText);
        setTokenCount(count);
      } else {
        setTokenCount(null);
      }
    };

    updateTokenCount();
  }, [inputText]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    
    if (newText.length > 0) {
      const count = await countTokens(newText);
      if (count > 100) {
        toast({
          title: "⚠️ Warning",
          description: "Large token count may affect performance",
          variant: "default",
        });
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
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text (e.g., 'Hello')"
              disabled={isProcessing}
              className="transition-all duration-300 hover:border-primary"
            />
            {tokenCount !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-gray-500"
              >
                Tokens: {tokenCount}
              </motion.div>
            )}
          </div>
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

