
import React, { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { LayerData } from "../types/neuralNetworkTypes";

interface LayerVisualizerProps {
  layer: LayerData;
  currentStep: number;
  inputTokens: string[];
  outputTokens: string[];
  attentionWeights: number[][];
}

const LayerVisualizer: React.FC<LayerVisualizerProps> = memo(({
  layer,
  currentStep,
  inputTokens,
  outputTokens,
  attentionWeights,
}) => {
  if (!layer) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Card className="p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{layer.name}</h3>
          <span className="text-sm text-gray-500">
            Neurons: {layer.neurons}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg"
          >
            <h4 className="font-medium mb-2">Input Processing</h4>
            <div className="space-y-1.5">
              {inputTokens.slice(0, 5).map((token, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
                >
                  <span className="font-mono text-sm">{token}</span>
                  <span className="text-xs text-gray-600">
                    Weight: {attentionWeights[currentStep]?.[idx]?.toFixed(3) || 0}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-green-50 to-blue-50 p-3 rounded-lg"
          >
            <h4 className="font-medium mb-2">Output Generation</h4>
            <div className="space-y-1.5">
              {outputTokens.slice(0, 5).map((token, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
                >
                  <span className="font-mono text-sm">{token}</span>
                  <span className="text-xs text-gray-600">
                    Step: {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {layer.weights && (
          <motion.div
            variants={itemVariants}
            className="mt-3 p-3 bg-gray-50 rounded-lg"
          >
            <h4 className="font-medium mb-2">Weight Matrix</h4>
            <div className="overflow-x-auto max-h-40">
              <table className="min-w-full">
                <tbody>
                  {layer.weights.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {row.slice(0, 5).map((weight, j) => (
                        <td
                          key={j}
                          className="p-1.5 text-center text-sm"
                          style={{
                            backgroundColor: `rgba(59, 130, 246, ${weight})`,
                            color: weight > 0.5 ? 'white' : 'black'
                          }}
                        >
                          {weight.toFixed(3)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
});

LayerVisualizer.displayName = 'LayerVisualizer';

export default LayerVisualizer;
