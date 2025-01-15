export interface EmbeddingVector {
  word: string;
  vector: number[];
}

export interface LayerStep {
  title: string;
  description: string;
  formula: string;
  details: string[];
}