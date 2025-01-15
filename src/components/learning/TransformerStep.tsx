import React from "react";
import { motion } from "framer-motion";
import { MathJax } from "better-react-mathjax";
import { cn } from "@/lib/utils";

interface TransformerStepProps {
  title: string;
  description: string;
  detailedExplanation: string;
  formula: string;
  formulaDescription: string;
  isLoading: boolean;
}

const TransformerStep: React.FC<TransformerStepProps> = ({
  title,
  description,
  detailedExplanation,
  formula,
  formulaDescription,
  isLoading,
}) => {
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow",
        "border border-gray-100"
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-4">
        <h4 className="text-lg sm:text-xl font-bold text-primary">{title}</h4>
        <p className="text-gray-600">{description}</p>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-4">{detailedExplanation}</p>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">Mathematical Formula:</h5>
            <div className="my-4 overflow-x-auto">
              <MathJax>{formula}</MathJax>
            </div>
            <p className="text-sm text-gray-600 mt-2 italic">{formulaDescription}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransformerStep;