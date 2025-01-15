import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmbeddingsVisualization from "../EmbeddingsVisualization";
import AttentionVisualization from "../AttentionVisualization";
import type { EmbeddingVector } from "../types";

interface VisualizationContentProps {
  currentStep: number;
  embeddings: EmbeddingVector[];
  attentionWeights: number[][];
  nextWordProbabilities: { word: string; probability: number; }[];
}

const VisualizationContent: React.FC<VisualizationContentProps> = ({
  currentStep,
  embeddings,
  attentionWeights,
  nextWordProbabilities
}) => {
  const dataFlowAnimation = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        variants={dataFlowAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-6"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <EmbeddingsVisualization 
            embeddings={embeddings}
            currentStep={currentStep}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <AttentionVisualization 
            attentionWeights={attentionWeights}
            currentStep={currentStep}
          />
        </motion.div>
        {nextWordProbabilities.length > 0 && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-3">Token Probabilities</h3>
            <div className="grid grid-cols-2 gap-3">
              {nextWordProbabilities.slice(0, 6).map((pred, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{pred.word}</span>
                  <span className="text-sm text-gray-600">{(pred.probability * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default VisualizationContent;