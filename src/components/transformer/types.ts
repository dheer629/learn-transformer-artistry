export interface EmbeddingVector {
  word: string;
  vector: number[];
  positionalVector?: number[];
  contextualVector?: number[];
}

export interface LayerOutput {
  inputEmbeddings: EmbeddingVector[];
  outputEmbeddings: EmbeddingVector[];
  attentionWeights: number[][];
  intermediateOutputs?: {
    queryVectors: number[][];
    keyVectors: number[][];
    valueVectors: number[][];
    weightedSum: number[][];
  };
}

export interface LayerStep {
  title: string;
  description: string;
  formula: string;
  details: string[];
  explanation: {
    title: string;
    simpleExplanation: string;
    vectorExplanation: string;
    example: string;
  };
}