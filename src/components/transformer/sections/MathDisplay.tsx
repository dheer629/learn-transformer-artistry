import React from "react";
import { MathJax } from "better-react-mathjax";

interface MathDisplayProps {
  formula: string;
  explanation: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ formula, explanation }) => {
  return (
    <div className="space-y-3">
      <div className="bg-white/80 p-3 rounded-lg">
        <p className="text-sm font-medium text-purple-700 mb-2">The Formula:</p>
        <MathJax>
          <div className="text-center">{formula}</div>
        </MathJax>
      </div>
      
      <div className="bg-white/80 p-3 rounded-lg">
        <p className="text-sm font-medium text-purple-700 mb-2">In Simple Terms:</p>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">
          {explanation}
        </p>
      </div>
      
      <div className="text-xs text-gray-500 italic">
        Don't worry if the math looks complicated! Focus on understanding the main idea 😊
      </div>
    </div>
  );
};

export default MathDisplay;