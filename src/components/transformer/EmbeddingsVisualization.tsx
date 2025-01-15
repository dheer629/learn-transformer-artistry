import React from "react";
import { motion } from "framer-motion";
import { EmbeddingVector } from "./types";

interface EmbeddingsVisualizationProps {
  embeddings: EmbeddingVector[];
}

const EmbeddingsVisualization: React.FC<EmbeddingsVisualizationProps> = ({ embeddings }) => {
  if (embeddings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-muted p-4 rounded-lg"
    >
      <h3 className="font-semibold mb-2">Word Embeddings:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {embeddings.map((embed, i) => (
          <div key={i} className="bg-white p-3 rounded shadow-sm">
            <span className="font-medium">{embed.word}:</span>
            <div className="text-sm text-muted-foreground">
              [{embed.vector.join(", ")}]
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmbeddingsVisualization;