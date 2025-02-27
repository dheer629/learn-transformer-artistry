
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TokenDisplayProps {
  inputTokens: string[];
  outputTokens: string[];
  currentStep: number;
  attentionWeights?: number[][];
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({
  inputTokens,
  outputTokens,
  currentStep
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

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Input Tokens</h3>
          <div className="flex flex-wrap gap-2">
            {inputTokens.map((token, index) => (
              <TooltipProvider key={`input-${index}`}>
                <Tooltip>
                  <TooltipTrigger>
                    <motion.div
                      variants={tokenVariants}
                      className={`px-3 py-1 rounded-full text-sm ${
                        currentStep > 0 ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      {token}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Position: {index + 1}</p>
                    <p>Processing Step: {currentStep}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {outputTokens.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Output Tokens</h3>
            <div className="flex flex-wrap gap-2">
              {outputTokens.map((token, index) => (
                <TooltipProvider key={`output-${index}`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <motion.div
                        variants={tokenVariants}
                        className="px-3 py-1 rounded-full text-sm bg-green-100"
                      >
                        {token}
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generated at step: {currentStep}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TokenDisplay;
