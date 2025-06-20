
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Info, Zap, Brain, Target } from "lucide-react";
import type { TokenizationResult, PredictionResult } from "@/services/tokenizerService";

interface EnhancedTokenDisplayProps {
  tokenizationResult: TokenizationResult | null;
  predictions: PredictionResult | null;
  currentStep: string;
  model: string;
}

export const EnhancedTokenDisplay: React.FC<EnhancedTokenDisplayProps> = ({
  tokenizationResult,
  predictions,
  currentStep,
  model
}) => {
  if (!tokenizationResult) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No tokenization data available. Process some text to see real token analysis.</p>
        </div>
      </Card>
    );
  }

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
    <Card className="p-6 space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Real Tokenization Analysis</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{model}</Badge>
            <Badge variant="secondary">{tokenizationResult.tokens.length} tokens</Badge>
          </div>
        </div>

        {/* Current Step Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-blue-700 mb-2">Current Processing Stage:</h4>
              <p className="font-medium text-blue-800 capitalize">{currentStep.replace('_', ' ')}</p>
              <p className="text-sm text-blue-700 mt-2">
                Original Input: <span className="font-mono bg-white px-2 py-0.5 rounded">{tokenizationResult.originalText}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Token Details */}
        <div className="space-y-4">
          <h4 className="font-medium mb-3">Token Breakdown</h4>
          <div className="grid gap-4">
            {tokenizationResult.tokens.map((token, index) => (
              <motion.div
                key={index}
                variants={tokenVariants}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-lg">{token.token}</span>
                    <Badge variant="outline" className="text-xs">
                      ID: {token.id}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Pos: {index}
                    </span>
                    {token.rank && (
                      <Badge variant="secondary" className="text-xs">
                        Rank: {token.rank}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Token Statistics */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-blue-700">Token Statistics</p>
                      <Zap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Token ID:</span>
                        <span className="font-mono">{token.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Start Offset:</span>
                        <span className="font-mono">{token.startOffset}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Offset:</span>
                        <span className="font-mono">{token.endOffset}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Length:</span>
                        <span className="font-mono">{token.endOffset - token.startOffset}</span>
                      </div>
                    </div>
                  </div>

                  {/* Probability Information */}
                  {token.logProb && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-green-700">Probability Data</p>
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Log Probability:</span>
                          <span className="font-mono">{token.logProb.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Probability:</span>
                          <span className="font-mono">{Math.exp(token.logProb).toFixed(6)}</span>
                        </div>
                        {token.rank && (
                          <div className="flex justify-between">
                            <span>Vocabulary Rank:</span>
                            <span className="font-mono">{token.rank}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual representation of the token in the original text */}
                <div className="mt-3 p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600 mb-1">Position in original text:</p>
                  <div className="font-mono text-sm">
                    <span className="text-gray-400">
                      {tokenizationResult.originalText.substring(0, token.startOffset)}
                    </span>
                    <span className="bg-yellow-200 px-1 rounded">
                      {tokenizationResult.originalText.substring(token.startOffset, token.endOffset)}
                    </span>
                    <span className="text-gray-400">
                      {tokenizationResult.originalText.substring(token.endOffset)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Next Token Predictions */}
        {predictions && (
          <motion.div
            variants={containerVariants}
            className="mt-8 p-4 bg-purple-50 rounded-lg"
          >
            <h4 className="font-medium mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-600" />
              Next Token Predictions
            </h4>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Model Confidence</span>
                <span>{(predictions.confidence * 100).toFixed(1)}%</span>
              </div>
              <Progress value={predictions.confidence * 100} className="h-2" />
            </div>
            <div className="grid gap-2">
              {predictions.nextTokens.slice(0, 8).map((prediction, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      #{prediction.rank}
                    </Badge>
                    <span className="font-mono">{prediction.token}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span>{(prediction.probability * 100).toFixed(2)}%</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3 w-3 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Log Probability: {prediction.logProb.toFixed(4)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Technical Details */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Technical Details</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="font-medium">Model:</span>
              <p className="font-mono">{tokenizationResult.model}</p>
            </div>
            <div>
              <span className="font-medium">Token Count:</span>
              <p className="font-mono">{tokenizationResult.tokens.length}</p>
            </div>
            <div>
              <span className="font-medium">Sequence Length:</span>
              <p className="font-mono">{tokenizationResult.ids.length}</p>
            </div>
            <div>
              <span className="font-medium">Attention Mask:</span>
              <p className="font-mono">[{tokenizationResult.attentionMask.join(', ')}]</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};
