import React from "react";
import { motion } from "framer-motion";
import { MathJax } from "better-react-mathjax";

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
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <h4 className="text-lg sm:text-xl font-bold text-primary">{title}</h4>
        <p className="text-gray-600">{description}</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-4">{detailedExplanation}</p>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Mathematical Formula:</h5>
          <MathJax className="text-center">{formula}</MathJax>
          <p className="text-sm text-gray-600 mt-2">{formulaDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default TransformerStep;