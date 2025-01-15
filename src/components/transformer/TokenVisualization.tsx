import React from "react";
import { motion } from "framer-motion";
import { MathJax } from "better-react-mathjax";
import { EmbeddingVector } from "./types";

interface TokenVisualizationProps {
  tokens: EmbeddingVector[];
  currentStep: number;
}

const TokenVisualization: React.FC<TokenVisualizationProps> = ({ tokens, currentStep }) => {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-lg shadow-sm space-y-6"
    >
      <h3 className="text-lg font-semibold">Token Representation</h3>
      
      <div className="space-y-6">
        {tokens.map((token, index) => (
          <motion.div
            key={index}
            variants={tokenVariants}
            className="border border-gray-100 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">{token.word}</span>
              <span className="text-sm text-gray-500">Position: {index}</span>
            </div>

            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm font-medium text-blue-700">Base Vector:</p>
                <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                  [{token.vector.map(v => v.toFixed(3)).join(", ")}]
                </div>
              </div>

              {token.positionalVector && (
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm font-medium text-green-700">Positional Encoding:</p>
                  <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                    [{token.positionalVector.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                  <MathJax className="text-xs mt-1">
                    {`PE_{(${index},2i)} = \\sin(\\frac{${index}}{10000^{2i/d}})`}
                  </MathJax>
                </div>
              )}

              {token.contextualVector && (
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm font-medium text-purple-700">Contextual Vector:</p>
                  <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                    [{token.contextualVector.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 mt-2">
                <p>Vector Dimension: {token.vector.length}</p>
                <p>Processing Step: {currentStep}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TokenVisualization;