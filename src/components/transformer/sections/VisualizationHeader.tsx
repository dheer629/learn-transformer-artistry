import React from "react";
import { motion } from "framer-motion";

interface VisualizationHeaderProps {
  title: string;
}

const VisualizationHeader: React.FC<VisualizationHeaderProps> = ({ title }) => {
  return (
    <motion.h2 
      className="text-2xl font-bold text-primary mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
  );
};

export default VisualizationHeader;