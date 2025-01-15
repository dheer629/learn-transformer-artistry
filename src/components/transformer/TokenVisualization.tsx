import React from "react";
import { motion } from "framer-motion";
import { MathJax } from "better-react-mathjax";
import { EmbeddingVector } from "./types";
import { Card } from "@/components/ui/card";

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
      className="space-y-6"
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Token Breakdown & Processing</h3>
        
        {/* Input Text Visualization */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Original Input:</h4>
          <p className="font-mono text-sm">
            {tokens.map(t => t.word).join(" ")}
          </p>
        </div>

        {/* Token Processing Steps */}
        <div className="space-y-6">
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              variants={tokenVariants}
              className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-lg">{token.word}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Position: {index}
                </span>
              </div>

              <div className="grid gap-4">
                {/* Base Vector */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-700 mb-1">Base Vector:</p>
                  <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                    [{token.vector.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Generated using word embedding lookup
                  </p>
                </div>

                {/* Positional Encoding */}
                {token.positionalVector && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-700 mb-1">Positional Encoding:</p>
                    <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                      [{token.positionalVector.map(v => v.toFixed(3)).join(", ")}]
                    </div>
                    <MathJax className="text-xs mt-1">
                      <div className="text-green-600">
                        {`PE_{(${index},2i)} = \\sin(\\frac{${index}}{10000^{2i/d}})`}
                      </div>
                    </MathJax>
                  </div>
                )}

                {/* Contextual Vector */}
                {token.contextualVector && (
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-700 mb-1">Contextual Vector:</p>
                    <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                      [{token.contextualVector.map(v => v.toFixed(3)).join(", ")}]
                    </div>
                    <p className="text-xs text-purple-600 mt-1">
                      Combined with attention mechanism (step {currentStep})
                    </p>
                  </div>
                )}

                {/* Processing Details */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Processing Details:</p>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li>• Vector Dimension: {token.vector.length}</li>
                    <li>• Current Processing Step: {currentStep}</li>
                    <li>• Position in Sequence: {index + 1}/{tokens.length}</li>
                    <li>• Attention Context: {currentStep > 0 ? "Applied" : "Not Yet Applied"}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Processing Steps Legend:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-200 rounded"></div>
              <span>Base Embedding</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Position Encoding</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-200 rounded"></div>
              <span>Context Vector</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TokenVisualization;