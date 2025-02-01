import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface InputOutputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  learningRate: number;
  setLearningRate: (rate: number) => void;
  handleProcess: () => void;
  isProcessing: boolean;
}

const InputOutputSection: React.FC<InputOutputSectionProps> = ({
  inputText,
  setInputText,
  learningRate,
  setLearningRate,
  handleProcess,
  isProcessing
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input Text</label>
        <div className="flex gap-4">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to process..."
            className="flex-1"
          />
          <Button 
            onClick={handleProcess}
            disabled={isProcessing || !inputText}
          >
            Process
          </Button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Learning Rate: {learningRate}</label>
        <Slider
          value={[learningRate]}
          onValueChange={(value) => setLearningRate(value[0])}
          min={0.01}
          max={1}
          step={0.01}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default InputOutputSection;