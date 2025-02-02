import React from "react";
import { motion } from "framer-motion";

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const TransformerDiagram = () => {
  return (
    <motion.div variants={itemAnimation} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-gray-50 p-8 rounded-lg w-full max-w-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Transformer Architecture</h3>
          <p className="text-gray-600">
            The transformer architecture is a neural network design that revolutionized natural language processing. 
            It uses self-attention mechanisms to process sequential data in parallel, making it highly efficient and effective 
            for various language tasks.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TransformerDiagram;