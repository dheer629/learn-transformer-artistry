
import React from "react";
import { Card } from "@/components/ui/card";
import { Info, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessingExplanationProps {
  currentStep: number;
  activeProcessingStep: string | null;
  inputTokens: string[];
  outputTokens: string[];
  isProcessingComplete: boolean;
}

export const ProcessingExplanation: React.FC<ProcessingExplanationProps> = ({
  currentStep,
  activeProcessingStep,
  inputTokens,
  outputTokens,
  isProcessingComplete
}) => {
  const getStepExplanation = () => {
    if (!activeProcessingStep) return null;
    
    switch (activeProcessingStep) {
      case "tokenization":
        return {
          title: "Tokenization",
          description: "Converting your input text into smaller units (tokens) that the model can process.",
          detail: `Your input has been split into ${inputTokens.length} tokens.`,
          example: "For example, 'Hello world' becomes ['Hello', 'world']"
        };
      case "embedding":
        return {
          title: "Word Embedding",
          description: "Each token is converted into a vector (list of numbers) that represents its meaning.",
          detail: "These vectors capture semantic relationships between words.",
          example: "Similar words will have similar vector representations in this multi-dimensional space."
        };
      case "positional":
        return {
          title: "Positional Encoding",
          description: "Adding position information to each token's embedding vector.",
          detail: "This helps the model understand word order since transformers process all tokens simultaneously.",
          example: "The formula uses sine and cosine functions to create unique position patterns."
        };
      case "attention":
        return {
          title: "Self-Attention Mechanism",
          description: "Calculating how each token should attend to all other tokens in the sequence.",
          detail: "The colored heatmap shows attention weights - darker colors indicate stronger attention.",
          example: "This allows the model to capture relationships and dependencies between words."
        };
      case "feedforward":
        return {
          title: "Feed-Forward Neural Networks",
          description: "Processing each token's representation through a neural network.",
          detail: "This transforms the representations further to capture complex patterns.",
          example: "Each token is processed independently at this stage."
        };
      case "decoding":
        return {
          title: "Decoding Process",
          description: "The decoder is now generating output tokens based on encoder representations.",
          detail: `Generated ${outputTokens.length} tokens so far: "${outputTokens.join(' ')}"`,
          example: "Each output token attends to all input tokens and previously generated output tokens."
        };
      default:
        return {
          title: activeProcessingStep,
          description: "Processing your input through the transformer architecture.",
          detail: "Watch how the model processes information step by step.",
          example: "Notice how information flows through different parts of the network."
        };
    }
  };

  const explanation = getStepExplanation();
  
  if (!explanation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={activeProcessingStep}
      className="mb-4"
    >
      <Card className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-blue-500">
        <div className="flex space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-900">{explanation.title}</h3>
            <p className="text-sm text-gray-700">{explanation.description}</p>
            <p className="text-sm text-gray-600">{explanation.detail}</p>
            <div className="flex items-start mt-2 space-x-2 bg-white bg-opacity-60 p-2 rounded">
              <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">{explanation.example}</p>
            </div>
            {isProcessingComplete && (
              <div className="text-sm font-medium text-green-600 mt-2">
                Processing complete! Examine the outputs and attention patterns to understand the model's behavior.
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
