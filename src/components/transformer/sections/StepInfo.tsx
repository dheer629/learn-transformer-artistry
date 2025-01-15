import React from "react";
import { toast } from "@/components/ui/use-toast";
import MathDisplay from "./MathDisplay";
import { EmbeddingVector, LayerOutput } from "../types";

interface StepInfoProps {
  currentStep: number;
  stepInfo: {
    title: string;
    formula: string;
    explanation: {
      vectorExplanation: string;
    };
  };
  embeddings: EmbeddingVector[];
  output: LayerOutput;
}

const StepInfo: React.FC<StepInfoProps> = ({
  currentStep,
  stepInfo,
  embeddings,
  output
}) => {
  const tokenValues = embeddings.map(embed => ({
    word: embed.word,
    vector: embed.vector,
    positionalEncoding: embed.positionalVector,
    contextualVector: embed.contextualVector
  }));

  const formulaExplanation = `
    ${stepInfo.explanation.vectorExplanation}
    
    Token Values:
    ${tokenValues.map(token => `
      Word: "${token.word}"
      Base Vector: [${token.vector.map(v => v.toFixed(3)).join(", ")}]
      Position Encoding: [${token.positionalEncoding?.map(v => v.toFixed(3)).join(", ") || ''}]
      Context Vector: [${token.contextualVector?.map(v => v.toFixed(3)).join(", ") || ''}]
    `).join('\n')}
    
    Calculations:
    ${output.intermediateOutputs?.queryVectors ? 
      `Query vectors (Q = W_q * X):
       [${output.intermediateOutputs.queryVectors[0].map(v => v.toFixed(3)).join(", ")}]` : 
      ''}
    ${output.intermediateOutputs?.keyVectors ? 
      `Key vectors (K = W_k * X):
       [${output.intermediateOutputs.keyVectors[0].map(v => v.toFixed(3)).join(", ")}]` : 
      ''}
    ${output.intermediateOutputs?.valueVectors ? 
      `Value vectors (V = W_v * X):
       [${output.intermediateOutputs.valueVectors[0].map(v => v.toFixed(3)).join(", ")}]` : 
      ''}
  `;

  React.useEffect(() => {
    toast({
      title: `Step ${currentStep + 1}: ${stepInfo.title}`,
      description: <MathDisplay formula={stepInfo.formula} explanation={formulaExplanation} />,
      duration: 8000,
    });
  }, [currentStep, stepInfo, formulaExplanation]);

  return null;
};

export default StepInfo;