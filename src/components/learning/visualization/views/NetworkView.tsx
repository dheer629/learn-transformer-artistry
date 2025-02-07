
import React, { memo } from "react";
import { Card } from "@/components/ui/card";
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
  return (
    <Card className="p-4">
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
    </Card>
  );
});

NetworkView.displayName = 'NetworkView';

export default NetworkView;
