
import React from "react";
import { motion } from "framer-motion";
import { MathJax } from "better-react-mathjax";
import { EmbeddingVector } from "./types";
import { Card } from "@/components/ui/card";
import { Info, Lightbulb } from "lucide-react";

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

  const getProcessExplanation = (step: number) => {
    if (step === 0) return "Initial tokenization: Words are being converted to numerical vectors";
    if (step === 1) return "Positional encoding: Adding position information to each token";
    if (step === 2) return "Self-attention: Computing relationships between all tokens";
    if (step > 2) return "Contextual processing: Tokens now have information from other tokens";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Token Processing Explained</h3>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex space-x-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-blue-700 mb-2">Current Processing Stage:</h4>
              <p className="font-medium text-blue-800">
                {getProcessExplanation(currentStep)}
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Original Input: <span className="font-mono bg-white px-2 py-0.5 rounded">{tokens.map(t => t.word).join(" ")}</span>
              </p>
            </div>
          </div>
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
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-blue-700 mb-1">Base Vector:</p>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                      Step 1: Embedding
                    </span>
                  </div>
                  <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                    [{token.vector.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                  <div className="flex items-start mt-2 space-x-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-600">
                      This is the numeric representation of "{token.word}" - similar words have similar vectors
                    </p>
                  </div>
                </div>

                {/* Positional Encoding */}
                {token.positionalVector && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-green-700 mb-1">Positional Encoding:</p>
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                        Step 2: Position Info
                      </span>
                    </div>
                    <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                      [{token.positionalVector.map(v => v.toFixed(3)).join(", ")}]
                    </div>
                    <MathJax className="text-xs mt-1">
                      <div className="text-green-600">
                        {`PE_{(${index},2i)} = \\sin(\\frac{${index}}{10000^{2i/d}})`}
                      </div>
                    </MathJax>
                    <div className="flex items-start mt-2 space-x-2">
                      <Lightbulb className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-green-600">
                        These values tell the model where this word is in the sentence (position {index})
                      </p>
                    </div>
                  </div>
                )}

                {/* Contextual Vector */}
                {token.contextualVector && (
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-purple-700 mb-1">Contextual Vector:</p>
                      <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full">
                        Step {currentStep}: With Context
                      </span>
                    </div>
                    <div className="font-mono text-xs overflow-x-auto whitespace-nowrap">
                      [{token.contextualVector.map(v => v.toFixed(3)).join(", ")}]
                    </div>
                    <div className="flex items-start mt-2 space-x-2">
                      <Lightbulb className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-purple-600">
                        This vector now includes information from other related words through attention
                      </p>
                    </div>
                  </div>
                )}

                {/* Processing Details */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">What's happening with this token:</p>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li>• Vector Dimension: {token.vector.length} (how much information each word contains)</li>
                    <li>• Current Processing Step: {currentStep} of multiple transformer layers</li>
                    <li>• Position in Sequence: {index + 1} of {tokens.length} tokens</li>
                    <li>• Attention Applied: {currentStep > 0 ? 
                      "Yes - this token now knows about other tokens" : 
                      "Not yet - tokens don't see each other yet"}
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend with enhanced explanations */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">What You're Seeing:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-200 rounded"></div>
              <span>Base Embedding - Initial word representation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Position Encoding - Where each word is located</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-200 rounded"></div>
              <span>Context Vector - Word with attention applied</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-100">
            <p className="text-xs text-blue-700">
              <strong>Why does this matter?</strong> Transformers need to convert words to numbers (vectors) 
              to process them. As tokens move through the model, they gain information from other tokens through 
              the attention mechanism, allowing the model to understand relationships between words.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TokenVisualization;
