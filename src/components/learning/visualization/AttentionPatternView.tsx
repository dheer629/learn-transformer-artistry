import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AttentionPatternViewProps {
  inputTokens: string[];
  outputTokens: string[];
  attentionWeights: number[][];
  currentStep: number;
}

const AttentionPatternView: React.FC<AttentionPatternViewProps> = ({
  inputTokens,
  outputTokens,
  attentionWeights,
  currentStep,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const cellVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Card className="p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold">Attention Patterns</h3>
        
        <div className="relative overflow-x-auto">
          <div className="flex items-center space-x-4">
            <div className="w-24">
              <h4 className="text-sm font-medium mb-2">Input</h4>
              <div className="space-y-2">
                {inputTokens.map((token, idx) => (
                  <motion.div
                    key={idx}
                    variants={cellVariants}
                    className="p-2 bg-blue-100 rounded text-center font-mono"
                  >
                    {token}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-grow">
              <h4 className="text-sm font-medium mb-2">Attention Weights</h4>
              <div className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${inputTokens.length}, minmax(60px, 1fr))`
                }}
              >
                {attentionWeights.map((row, i) => (
                  <React.Fragment key={i}>
                    {row.map((weight, j) => (
                      <motion.div
                        key={`${i}-${j}`}
                        variants={cellVariants}
                        className="p-2 rounded text-center text-sm"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${weight})`,
                          color: weight > 0.5 ? 'white' : 'black'
                        }}
                      >
                        {weight.toFixed(2)}
                      </motion.div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="w-24">
              <h4 className="text-sm font-medium mb-2">Output</h4>
              <div className="space-y-2">
                {outputTokens.map((token, idx) => (
                  <motion.div
                    key={idx}
                    variants={cellVariants}
                    className="p-2 bg-green-100 rounded text-center font-mono"
                  >
                    {token}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Current Step Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Processing Step: {currentStep + 1}
              </p>
              <p className="text-sm text-gray-600">
                Input Tokens: {inputTokens.length}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Output Tokens: {outputTokens.length}
              </p>
              <p className="text-sm text-gray-600">
                Attention Heads: {attentionWeights.length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default AttentionPatternView;