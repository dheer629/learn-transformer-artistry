import React from "react";
import { motion } from "framer-motion";
import TransformerStep from "../TransformerStep";

interface TransformerStepsListProps {
  steps: Array<{
    title: string;
    description: string;
    detailedExplanation: string;
    formula: string;
    formulaDescription: string;
    category: string;
  }>;
  getImageUrl: (category: string) => string | null;
  isLoading: boolean;
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const TransformerStepsList: React.FC<TransformerStepsListProps> = ({ 
  steps, 
  getImageUrl, 
  isLoading 
}) => {
  return (
    <motion.div variants={listItemVariants}>
      <motion.h3 
        className="text-xl sm:text-2xl font-semibold text-primary"
        variants={listItemVariants}
      >
        Step-by-Step Transformer Process:
      </motion.h3>
      <motion.ol className="space-y-8">
        {steps.map((step, index) => (
          <motion.li
            key={index}
            variants={listItemVariants}
            custom={index}
          >
            <TransformerStep
              {...step}
              imageUrl={getImageUrl(step.category)}
              isLoading={isLoading}
            />
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
};

export default TransformerStepsList;