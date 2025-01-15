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

const TransformerIntro = () => {
  return (
    <motion.div variants={itemAnimation}>
      <h2 className="text-3xl font-bold text-primary mb-4">
        Understanding Transformers
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Transformers are powerful neural networks that can understand and process language by looking at how words relate to each other in a sentence.
      </p>
    </motion.div>
  );
};

export default TransformerIntro;