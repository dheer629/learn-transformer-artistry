
import React, { memo } from "react";
import LayerVisualizer from "../LayerVisualizer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LayerData } from "../../types/neuralNetworkTypes";

interface LayerViewProps {
  selectedLayer: LayerData;
  currentStep: number;
  inputTokens: string[];
  outputTokens: string[];
  attentionWeights: number[][];
}

const LayerView: React.FC<LayerViewProps> = memo(({
  selectedLayer,
  currentStep,
  inputTokens,
  outputTokens,
  attentionWeights
}) => {
  if (!selectedLayer) {
    return (
      <Card className="p-6">
        <Skeleton className="h-[400px] w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Layer Details</h3>
        <LayerVisualizer
          layer={selectedLayer}
          currentStep={currentStep}
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          attentionWeights={attentionWeights}
        />
      </div>
    </Card>
  );
});

LayerView.displayName = 'LayerView';

export default LayerView;
