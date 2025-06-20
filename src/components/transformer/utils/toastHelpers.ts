
import type { EmbeddingVector, LayerOutput } from "../types";
import type { LayerStep } from "../types";

export const createStepToastDescription = (
  stepInfo: LayerStep,
  embeddings: EmbeddingVector[],
  output: LayerOutput
): string => {
  const tokenValues = embeddings.map(embed => ({
    word: embed.word,
    vector: embed.vector,
    positionalEncoding: embed.positionalVector,
    contextualVector: embed.contextualVector
  }));

  return `
Formula: ${stepInfo.formula}

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
};

export const createPredictionToastDescription = (
  predictions: { word: string; probability: number }[]
): string => {
  return `Top 5 predicted next words:
${predictions.slice(0, 5).map((pred, i) => `${i + 1}. ${pred.word}: ${(pred.probability * 100).toFixed(1)}%`).join('\n')}`;
};

export const createTokenizationToastDescription = (
  embeddings: EmbeddingVector[]
): string => {
  const tokenList = embeddings.map((embed, i) => `Token ${i + 1}: ${embed.word}`).join('\n');
  return `Input text tokenized into ${embeddings.length} tokens:\n\n${tokenList}`;
};
