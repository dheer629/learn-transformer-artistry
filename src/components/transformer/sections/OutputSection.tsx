import React from "react";
import { motion } from "framer-motion";

interface OutputSectionProps {
  outputText: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ outputText }) => {
  const dataFlowAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={dataFlowAnimation}
      initial="initial"
      animate="animate"
    >
      <label className="block text-sm font-medium mb-2">Output</label>
      <div className="h-10 flex items-center border rounded-md px-3 bg-muted animate-fade-in">
        {outputText || "Translation will appear here"}
      </div>
    </motion.div>
  );
};

export default OutputSection;