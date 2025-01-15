import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmbeddingsVisualization from "../EmbeddingsVisualization";
import AttentionVisualization from "../AttentionVisualization";
import type { EmbeddingVector } from "../types";

interface VisualizationContentProps {
  currentStep: number;
  embeddings: EmbeddingVector[];
  attentionWeights: number[][];
}

const VisualizationContent: React.FC<VisualizationContentProps> = ({
  currentStep,
  embeddings,
  attentionWeights
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
      </motion.div>
    </AnimatePresence>
  );
};

export default VisualizationContent;