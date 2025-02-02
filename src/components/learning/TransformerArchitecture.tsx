import React from "react";
import { motion } from "framer-motion";

const TransformerArchitecture: React.FC = () => {
  return (
    <motion.div 
      className="space-y-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }}
    >
      <div className="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto">
        <h3 className="font-semibold text-xl text-blue-800 mb-4">Transformer Architecture Overview</h3>
        <div className="space-y-4">
          <p className="text-blue-700">
            The Transformer architecture represents a breakthrough in machine learning, particularly in natural language processing.
            It introduced the self-attention mechanism, allowing models to weigh the importance of different parts of the input
            sequence dynamically.
          </p>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-800 mb-2">Key Features</h4>
            <ul className="space-y-2 text-blue-700">
              <li>• Parallel processing of input sequences</li>
              <li>• Attention-based context understanding</li>
              <li>• Position-aware sequence processing</li>
              <li>• Multi-head attention for diverse feature capture</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransformerArchitecture;