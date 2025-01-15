import React from "react";
import { motion } from "framer-motion";
import KeyFeatures from "./KeyFeatures";

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

const TransformerExplanation = () => {
  return (
    <motion.div variants={itemAnimation} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-primary mb-3">
          How Transformers Work
        </h3>
        <p className="text-gray-600">
          A transformer processes text in three main steps: first, it converts words into numbers (embedding), 
          then adds position information, and finally looks at how words relate to each other (attention).
          This helps it understand the meaning of sentences just like we do!
        </p>
      </div>

      <KeyFeatures />
    </motion.div>
  );
};

export default TransformerExplanation;