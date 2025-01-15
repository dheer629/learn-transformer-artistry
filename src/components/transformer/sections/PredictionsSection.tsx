import React from "react";
import { motion } from "framer-motion";

interface PredictionsSectionProps {
  predictions: { word: string; probability: number }[];
}

const PredictionsSection: React.FC<PredictionsSectionProps> = ({ predictions }) => {
  if (!predictions.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Next Word Predictions</h3>
      <div className="grid gap-2">
        {predictions.slice(0, 5).map((pred, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium">{pred.word}</span>
            <span className="text-sm text-gray-600">
              {(pred.probability * 100).toFixed(1)}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PredictionsSection;