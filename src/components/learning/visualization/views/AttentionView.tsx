
import React, { memo } from "react";
import AttentionPatternView from "../AttentionPatternView";

interface AttentionViewProps {
  inputTokens: string[];
  outputTokens: string[];
  attentionWeights: number[][];
  currentStep: number;
}

const AttentionView: React.FC<AttentionViewProps> = memo(({
  inputTokens,
  outputTokens,
  attentionWeights,
  currentStep
}) => {
  return (
    <AttentionPatternView
      inputTokens={inputTokens}
      outputTokens={outputTokens}
      attentionWeights={attentionWeights}
      currentStep={currentStep}
    />
  );
});

AttentionView.displayName = 'AttentionView';

export default AttentionView;
