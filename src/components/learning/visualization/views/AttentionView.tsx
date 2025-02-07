
import React, { memo, useMemo } from "react";
import AttentionPatternView from "../AttentionPatternView";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const isLoading = !inputTokens.length || !attentionWeights.length;

  // Memoize the attention patterns to prevent unnecessary recalculations
  const memoizedAttentionPatterns = useMemo(() => (
    <AttentionPatternView
      inputTokens={inputTokens}
      outputTokens={outputTokens}
      attentionWeights={attentionWeights}
      currentStep={currentStep}
    />
  ), [inputTokens, outputTokens, attentionWeights, currentStep]);

  if (isLoading) {
    return (
      <Card className="p-6 space-y-4">
        <Skeleton className="h-[400px] w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Attention Patterns</h3>
        {memoizedAttentionPatterns}
      </div>
    </Card>
  );
});

AttentionView.displayName = 'AttentionView';

export default AttentionView;
