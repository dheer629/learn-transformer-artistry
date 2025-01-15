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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-muted p-4 rounded-lg"
    >
      <h3 className="font-semibold mb-2">Attention Weights:</h3>
      <div className="grid grid-cols-1 gap-2">
        {attentionWeights.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((weight, j) => (
              <div
                key={j}
                className="w-12 h-12 flex items-center justify-center rounded"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${weight})`,
                  color: weight > 0.5 ? "white" : "black",
                }}
              >
                {weight}
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AttentionVisualization;