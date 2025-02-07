
import React, { memo } from "react";
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
        <AttentionPatternView
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          attentionWeights={attentionWeights}
          currentStep={currentStep}
        />
      </div>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.currentStep === nextProps.currentStep &&
    prevProps.inputTokens.length === nextProps.inputTokens.length &&
    prevProps.outputTokens.length === nextProps.outputTokens.length &&
    prevProps.attentionWeights.length === nextProps.attentionWeights.length
  );
});

AttentionView.displayName = 'AttentionView';

export default AttentionView;
