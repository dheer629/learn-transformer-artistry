export interface EmbeddingVector {
  word: string;
  vector: number[];
  positionalVector?: number[];
  contextualVector?: number[];
}

export interface LayerStep {
  title: string;
  description: string;
  formula: string;
  details: string[];
  outputVector?: number[];
  attentionWeights?: number[][];
}

export interface LayerOutput {
  inputEmbeddings: EmbeddingVector[];
  outputEmbeddings: EmbeddingVector[];
  attentionWeights: number[][];
  intermediateOutputs?: {
    queryVectors?: number[][];
    keyVectors?: number[][];
    valueVectors?: number[][];
    weightedSum?: number[][];
  };
}