
import React, { memo } from "react";
import LayerVisualizer from "../LayerVisualizer";
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
  return (
    <LayerVisualizer
      layer={selectedLayer}
      currentStep={currentStep}
      inputTokens={inputTokens}
      outputTokens={outputTokens}
      attentionWeights={attentionWeights}
    />
  );
});

LayerView.displayName = 'LayerView';

export default LayerView;
