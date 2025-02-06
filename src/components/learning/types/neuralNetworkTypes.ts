export interface LayerData {
  name: string;
  neurons: number;
  weights?: number[][];
  attention_heads?: number;
  dropout_rate?: number;
}

export interface AttentionData {
  scores: number[][];
  context: number[][];
}

export interface LayerOutput {
  values: number[];
  attention?: AttentionData;
  gradients?: number[];
}