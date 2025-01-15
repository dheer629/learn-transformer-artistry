import React from "react";
import { motion } from "framer-motion";
import { MathJax } from "better-react-mathjax";
import { Skeleton } from "@/components/ui/skeleton";

interface TransformerStepProps {
  title: string;
  description: string;
  detailedExplanation: string;
  formula: string;
  formulaDescription: string;
  imageUrl: string | null;
  isLoading: boolean;
}

const TransformerStep: React.FC<TransformerStepProps> = ({
  title,
  description,
  detailedExplanation,
  formula,
  formulaDescription,
  imageUrl,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        <div className="flex items-center justify-center">
          {isLoading ? (
            <Skeleton className="w-full h-64 rounded-lg" />
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt={`${title} Visualization`}
              className="rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-full h-auto"
            />
          ) : (
            <div className="text-gray-500 text-center">No image available for this step</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransformerStep;