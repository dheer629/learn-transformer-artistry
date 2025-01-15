import React from "react";
import { motion } from "framer-motion";
import { EmbeddingVector } from "./types";

interface EmbeddingsVisualizationProps {
  embeddings: EmbeddingVector[];
  currentStep: number;
}

const EmbeddingsVisualization: React.FC<EmbeddingsVisualizationProps> = ({ 
  embeddings,
  currentStep
}) => {
  if (embeddings.length === 0) return null;

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
      className="bg-muted p-4 rounded-lg space-y-4"
    >
      <h3 className="font-semibold mb-2">Word Embeddings:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {embeddings.map((embed, i) => (
          <motion.div 
            key={`${embed.word}-${i}`}
            className="bg-white p-3 rounded shadow-sm space-y-2 hover:shadow-md transition-shadow"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="font-medium text-primary">{embed.word}</div>
            <div className="space-y-1">
              <motion.div 
                className="text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-muted-foreground">Base Vector: </span>
                <span className="font-mono text-xs">
                  [{embed.vector.map(v => v.toFixed(3)).join(", ")}]
                </span>
              </motion.div>
              {embed.positionalVector && (
                <motion.div 
                  className="text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <span className="text-muted-foreground">Position Encoding: </span>
                  <span className="font-mono text-xs">
                    [{embed.positionalVector.map(v => v.toFixed(3)).join(", ")}]
                  </span>
                </motion.div>
              )}
              {embed.contextualVector && (
                <motion.div 
                  className="text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <span className="text-muted-foreground">Contextual Vector: </span>
                  <span className="font-mono text-xs">
                    [{embed.contextualVector.map(v => v.toFixed(3)).join(", ")}]
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmbeddingsVisualization;