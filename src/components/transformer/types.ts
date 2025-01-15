export interface EmbeddingVector {
  word: string;
  vector: number[];
  positionalVector?: number[];
  contextualVector?: number[];
}

export interface StepExplanation {
  title: string;
  simpleExplanation: string;
  vectorExplanation: string;
  example: string;
}

export interface LayerStep {
  title: string;
  description: string;
  formula: string;
  details: string[];
  explanation: StepExplanation;
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
