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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-muted p-4 rounded-lg space-y-4"
    >
      <h3 className="font-semibold mb-2">Word Embeddings:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {embeddings.map((embed, i) => (
          <motion.div 
            key={`${embed.word}-${i}`}
            className="bg-white p-3 rounded shadow-sm space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="font-medium text-primary">{embed.word}</div>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-muted-foreground">Base Vector: </span>
                <span className="font-mono text-xs">
                  [{embed.vector.map(v => v.toFixed(3)).join(", ")}]
                </span>
              </div>
              {embed.positionalVector && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Position Encoding: </span>
                  <span className="font-mono text-xs">
                    [{embed.positionalVector.map(v => v.toFixed(3)).join(", ")}]
                  </span>
                </div>
              )}
              {embed.contextualVector && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Contextual Vector: </span>
                  <span className="font-mono text-xs">
                    [{embed.contextualVector.map(v => v.toFixed(3)).join(", ")}]
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmbeddingsVisualization;