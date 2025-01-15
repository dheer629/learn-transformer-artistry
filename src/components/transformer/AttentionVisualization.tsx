import React from "react";
import { motion } from "framer-motion";

interface AttentionVisualizationProps {
  attentionWeights: number[][];
  currentStep: number;
}

const AttentionVisualization: React.FC<AttentionVisualizationProps> = ({ 
  attentionWeights, 
  currentStep 
}) => {
  if (attentionWeights.length === 0 || currentStep < 1) return null;

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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-muted p-4 rounded-lg"
    >
      <h3 className="font-semibold mb-2">Attention Weights:</h3>
      <div className="grid grid-cols-1 gap-2">
        {attentionWeights.map((row, i) => (
          <motion.div 
            key={i} 
            className="flex gap-2"
            variants={containerVariants}
          >
            {row.map((weight, j) => (
              <motion.div
                key={j}
                variants={itemVariants}
                className="w-12 h-12 flex items-center justify-center rounded transition-colors duration-300"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${weight})`,
                  color: weight > 0.5 ? "white" : "black",
                }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {weight}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AttentionVisualization;