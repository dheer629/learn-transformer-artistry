import React from "react";
import { Card } from "@/components/ui/card";
import TokenVisualization from "../TokenVisualization";
import type { EmbeddingVector } from "../types";

interface ProcessingSectionProps {
  embeddings: EmbeddingVector[];
  currentStep: number;
}

const ProcessingSection: React.FC<ProcessingSectionProps> = ({
  embeddings,
  currentStep,
}) => {
  if (embeddings.length === 0) return null;

  return (
    <Card className="p-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-4">Token Processing</h3>
      <TokenVisualization
        tokens={embeddings}
        currentStep={currentStep}
      />
    </Card>
  );
};

export default ProcessingSection;