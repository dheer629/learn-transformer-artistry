import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TokenDisplayProps {
  inputTokens: string[];
  outputTokens: string[];
  currentStep: number;
  attentionWeights: number[][];
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  inputTokens,
  outputTokens,
  currentStep,
  attentionWeights
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const tokenVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  const getAttentionColor = (weight: number) => {
    const intensity = Math.min(Math.max(weight * 255, 0), 255);
    return `rgb(${intensity}, ${intensity}, 255)`;
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Input Processing</h3>
          <div className="flex flex-wrap gap-2">
            {inputTokens.map((token, index) => (
              <TooltipProvider key={`input-${index}`}>
                <Tooltip>
                  <TooltipTrigger>
                    <motion.div
                      variants={tokenVariants}
                      className="relative px-3 py-1 rounded-lg"
                      style={{
                        backgroundColor: getAttentionColor(attentionWeights[currentStep]?.[index] || 0)
                      }}
                    >
                      <span className="font-mono text-sm">{token}</span>
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: attentionWeights[currentStep]?.[index] || 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="p-2 space-y-1">
                      <p>Position: {index + 1}</p>
                      <p>Current Step: {currentStep}</p>
                      <p>Attention: {(attentionWeights[currentStep]?.[index] || 0).toFixed(3)}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {outputTokens.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Generated Output</h3>
            <div className="flex flex-wrap gap-2">
              {outputTokens.map((token, index) => (
                <TooltipProvider key={`output-${index}`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <motion.div
                        variants={tokenVariants}
                        className="px-3 py-1 rounded-lg bg-green-100"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="font-mono text-sm">{token}</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="p-2">
                        <p>Generated at step: {index + currentStep}</p>
                        <p>Position in sequence: {index + 1}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Visualization Guide</h4>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>• Token color intensity shows attention weight</li>
          <li>• Blue bar indicates relative attention strength</li>
          <li>• Hover over tokens for detailed information</li>
          <li>• Green tokens represent generated output</li>
        </ul>
      </div>
    </Card>
  );
};

export default TokenDisplay;