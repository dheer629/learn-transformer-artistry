export interface LayerData {
  name: string;
  neurons: number;
  weights?: number[][];
}

export const generateLayerWeights = (inputSize: number, outputSize: number): number[][] => {
  return Array(inputSize).fill(0).map(() => 
    Array(outputSize).fill(0).map(() => 
      Number((Math.random() * 2 - 1).toFixed(3))
    )
  );
};

export const getTransformerLayers = (inputLength: number): LayerData[] => {
  const embeddingDim = 8;
  
  return [
    {
      name: "Input Embedding",
      neurons: inputLength,
      weights: generateLayerWeights(inputLength, embeddingDim)
    },
    {
      name: "Self-Attention",
      neurons: embeddingDim,
      weights: generateLayerWeights(embeddingDim, embeddingDim)
    },
    {
      name: "Feed Forward",
      neurons: embeddingDim,
      weights: generateLayerWeights(embeddingDim, embeddingDim * 4)
    },
    {
      name: "Output",
      neurons: embeddingDim * 4
    }
  ];
};