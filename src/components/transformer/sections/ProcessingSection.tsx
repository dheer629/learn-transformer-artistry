
import React from "react";
import { Card } from "@/components/ui/card";
import TokenVisualization from "../TokenVisualization";
import type { EmbeddingVector } from "../types";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface ProcessingSectionProps {
  embeddings: EmbeddingVector[];
  currentStep: number;
}

const ProcessingSection: React.FC<ProcessingSectionProps> = ({
  embeddings,
  currentStep,
}) => {
  if (embeddings.length === 0) return null;

  const steps = [
    "Tokenization & Embedding",
    "Positional Encoding",
    "Self-Attention",
    "Feed-Forward Network",
    "Layer Normalization",
    "Output Processing"
  ];
  
  const currentStepName = steps[Math.min(currentStep, steps.length - 1)];
  
  const getStepExplanation = () => {
    switch (Math.min(currentStep, steps.length - 1)) {
      case 0:
        return "Words are being converted into numerical vectors (embeddings) that the model can understand.";
      case 1:
        return "Position information is being added to each token so the model knows word order.";
      case 2:
        return "The model is calculating how each word relates to every other word in the input.";
      case 3:
        return "Each token's representation is being processed through a neural network to capture complex patterns.";
      case 4:
        return "Token representations are being normalized to stabilize the learning process.";
      case 5:
        return "Final processing before generating output tokens or predictions.";
      default:
        return "Processing tokens through transformer architecture.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 bg-white shadow-sm">
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Token Processing - Step {currentStep + 1}: {currentStepName}</h3>
          <div className="bg-blue-50 p-3 rounded-lg flex space-x-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700">{getStepExplanation()}</p>
              <div className="mt-2 flex space-x-1">
                {steps.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`h-2 flex-1 rounded-full ${idx <= currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
                    title={step}
                  />
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {Math.round((currentStep / (steps.length - 1)) * 100)}% complete - 
                {currentStep > 0 ? ' tokens have context from other tokens' : ' tokens are being processed individually'}
              </p>
            </div>
          </div>
        </div>
        <TokenVisualization
          tokens={embeddings}
          currentStep={currentStep}
        />
      </Card>
    </motion.div>
  );
};

export default ProcessingSection;
