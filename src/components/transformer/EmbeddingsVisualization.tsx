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
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const vectorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
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
      <motion.h3 
        className="font-semibold mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Word Embeddings:
      </motion.h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {embeddings.map((embed, i) => (
          <motion.div 
            key={`${embed.word}-${i}`}
            className="bg-white p-4 rounded-lg shadow-sm space-y-3 hover:shadow-md transition-shadow"
            variants={itemVariants}
            custom={i}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="font-medium text-primary text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {embed.word}
            </motion.div>
            <div className="space-y-2">
              <motion.div 
                className="text-sm"
                variants={vectorVariants}
              >
                <span className="text-muted-foreground font-medium">Base Vector: </span>
                <span className="font-mono text-xs bg-gray-50 p-1 rounded">
                  [{embed.vector.map(v => v.toFixed(3)).join(", ")}]
                </span>
              </motion.div>
              {embed.positionalVector && (
                <motion.div 
                  className="text-sm"
                  variants={vectorVariants}
                >
                  <span className="text-muted-foreground font-medium">Position Encoding: </span>
                  <span className="font-mono text-xs bg-gray-50 p-1 rounded">
                    [{embed.positionalVector.map(v => v.toFixed(3)).join(", ")}]
                  </span>
                </motion.div>
              )}
              {embed.contextualVector && (
                <motion.div 
                  className="text-sm"
                  variants={vectorVariants}
                >
                  <span className="text-muted-foreground font-medium">Contextual Vector: </span>
                  <span className="font-mono text-xs bg-gray-50 p-1 rounded">
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