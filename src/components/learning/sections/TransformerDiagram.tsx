import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        <div className="max-w-sm mx-auto">
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">Transformer Architecture Diagram</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center italic">
          The transformer architecture showing how information flows through the model
        </p>
      </div>
    </motion.div>
  );
};

export default TransformerDiagram;