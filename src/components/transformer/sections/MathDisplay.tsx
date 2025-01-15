import React from "react";
import { MathJax } from "better-react-mathjax";

interface MathDisplayProps {
  formula: string;
  explanation: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ formula, explanation }) => {
  return (
    <div className="space-y-2">
      <MathJax>
        <p className="font-medium">Formula: {formula}</p>
      </MathJax>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
        {explanation}
      </p>
    </div>
  );
};

export default MathDisplay;