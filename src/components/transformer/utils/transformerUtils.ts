import { EmbeddingVector, LayerOutput } from "../types";

export const generatePositionalEncoding = (position: number, dim: number): number[] => {
  return Array.from({ length: dim }, (_, i) => {
    const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / dim);
    return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  });
};

export const generateEmbeddings = (text: string): EmbeddingVector[] => {
  return text.split(" ").map((word, position) => {
    const baseVector = Array.from(
      { length: 4 }, 
      () => Number((Math.random() * 2 - 1).toFixed(3))
    );
    const positionalVector = generatePositionalEncoding(position, 4);
    
    const contextualVector = baseVector.map(
      (v, i) => Number((v + positionalVector[i]).toFixed(3))
    );
    
    return {
      word,
      vector: baseVector,
      positionalVector,
      contextualVector
    };
  });
};

export const generateLayerOutput = (
  inputEmbeddings: EmbeddingVector[],
  step: number
): LayerOutput => {
  const dim = inputEmbeddings.length;
  const vectorDim = 4;

  const generateRandomVectors = () => 
    Array(dim).fill(0).map(() => 
      Array(vectorDim).fill(0).map(() => 
        Number((Math.random() * 2 - 1).toFixed(3))
      )
    );

  const queryVectors = generateRandomVectors();
  const keyVectors = generateRandomVectors();
  const valueVectors = generateRandomVectors();

  const weights = Array(dim).fill(0).map(() => 
    Array(dim).fill(0).map(() => 
      Number((Math.random()).toFixed(2))
    )
  );

  const weightedSum = queryVectors.map(vec => 
    vec.map(v => Number((v * Math.random()).toFixed(3)))
  );

  const outputEmbeddings = inputEmbeddings.map(embed => ({
    ...embed,
    contextualVector: weightedSum[0]
  }));

  return {
    inputEmbeddings,
    outputEmbeddings,
    attentionWeights: weights,
    intermediateOutputs: {
      queryVectors,
      keyVectors,
      valueVectors,
      weightedSum
    }
  };
};