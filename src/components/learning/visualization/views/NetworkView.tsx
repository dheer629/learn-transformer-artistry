
import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TokenDisplay from "../TokenDisplay";
import NeuralNetworkDisplay from "../NeuralNetworkDisplay";
import type { LayerData } from "../../types/neuralNetworkTypes";

interface NetworkViewProps {
  layers: LayerData[];
  currentStep: number;
  onLayerSelect: (layerIndex: number) => void;
  inputTokens: string[];
  outputTokens: string[];
  attentionWeights: number[][];
}

const NetworkView: React.FC<NetworkViewProps> = memo(({
  layers,
  currentStep,
  onLayerSelect,
  inputTokens,
  outputTokens,
  attentionWeights
}) => {
  if (!layers.length) {
    return (
      <Card className="p-6">
        <Skeleton className="h-[400px] w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Neural Network Architecture</h3>
        <TokenDisplay
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          currentStep={currentStep}
          attentionWeights={attentionWeights}
        />
        <div className="mt-4">
          <NeuralNetworkDisplay
            layers={layers}
            currentStep={currentStep}
            onLayerSelect={onLayerSelect}
            inputTokens={inputTokens}
            outputTokens={outputTokens}
            attentionWeights={attentionWeights}
          />
        </div>
      </div>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.currentStep === nextProps.currentStep &&
    prevProps.layers.length === nextProps.layers.length &&
    prevProps.inputTokens.length === nextProps.inputTokens.length &&
    prevProps.outputTokens.length === nextProps.outputTokens.length &&
    prevProps.attentionWeights.length === nextProps.attentionWeights.length
  );
});

NetworkView.displayName = 'NetworkView';

export default NetworkView;
