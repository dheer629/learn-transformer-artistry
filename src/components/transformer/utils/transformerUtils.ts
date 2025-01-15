import { EmbeddingVector, LayerOutput } from "../types";

// Softmax implementation similar to minGPT
const softmax = (logits: number[]): number[] => {
  const maxLogit = Math.max(...logits);
  const scaled = logits.map(l => Math.exp(l - maxLogit));
  const sum = scaled.reduce((a, b) => a + b, 0);
  return scaled.map(s => s / sum);
};

// Matrix multiplication helper
const matmul = (a: number[][], b: number[][]): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < b.length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

export const generatePositionalEncoding = (position: number, dim: number): number[] => {
  const pe: number[] = [];
  for (let i = 0; i < dim; i += 2) {
    const freq = 1.0 / Math.pow(10000, (i / dim));
    pe[i] = Math.sin(position * freq);
    pe[i + 1] = Math.cos(position * freq);
  }
  return pe;
};

export const generateEmbeddings = (text: string): EmbeddingVector[] => {
  const vocabSize = 1000; // Simplified vocabulary size
  const embeddingDim = 8; // Using 8D embeddings for visualization
  
  return text.split(" ").map((word, position) => {
    // Generate pseudo-random but consistent embeddings for each word
    const hash = word.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const baseVector = Array.from(
      { length: embeddingDim }, 
      (_, i) => Math.sin((hash + i) / vocabSize) * 2 - 1
    );
    
    const positionalVector = generatePositionalEncoding(position, embeddingDim);
    const contextualVector = baseVector.map(
      (v, i) => Number((v + positionalVector[i]).toFixed(3))
    );
    
    return {
      word,
      vector: baseVector.map(v => Number(v.toFixed(3))),
      positionalVector: positionalVector.map(v => Number(v.toFixed(3))),
      contextualVector: contextualVector.map(v => Number(v.toFixed(3)))
    };
  });
};

export const generateLayerOutput = (
  inputEmbeddings: EmbeddingVector[],
  step: number
): LayerOutput => {
  const dim = inputEmbeddings[0].vector.length;
  const seqLen = inputEmbeddings.length;
  
  // Generate attention patterns similar to minGPT
  const generateAttentionWeights = () => {
    const weights: number[][] = [];
    for (let i = 0; i < seqLen; i++) {
      weights[i] = [];
      const logits = Array(seqLen).fill(0).map(() => Math.random() * 2 - 1);
      weights[i] = softmax(logits);
    }
    return weights;
  };

  // Generate Q, K, V matrices
  const generateProjectionMatrix = () => 
    Array(dim).fill(0).map(() => 
      Array(dim).fill(0).map(() => 
        Number((Math.random() * 2 - 1).toFixed(3))
      )
    );

  const Wq = generateProjectionMatrix();
  const Wk = generateProjectionMatrix();
  const Wv = generateProjectionMatrix();

  // Project input embeddings to get Q, K, V
  const inputMatrix = inputEmbeddings.map(e => e.contextualVector);
  const queryVectors = matmul(inputMatrix, Wq);
  const keyVectors = matmul(inputMatrix, Wk);
  const valueVectors = matmul(inputMatrix, Wv);

  // Calculate attention weights
  const attentionWeights = generateAttentionWeights();
  
  // Calculate weighted sum (attention output)
  const weightedSum = matmul(attentionWeights, valueVectors);

  return {
    inputEmbeddings,
    outputEmbeddings: inputEmbeddings.map((embed, i) => ({
      ...embed,
      contextualVector: weightedSum[i].map(v => Number(v.toFixed(3)))
    })),
    attentionWeights,
    intermediateOutputs: {
      queryVectors,
      keyVectors,
      valueVectors,
      weightedSum
    }
  };
};

export const generateNextWordPredictions = (output: LayerOutput) => {
  // Simplified next word prediction using the last token's output
  const lastTokenVector = output.outputEmbeddings[output.outputEmbeddings.length - 1].contextualVector;
  if (!lastTokenVector) return [];

  // Generate mock vocabulary with probabilities
  const mockVocabulary = [
    "the", "is", "are", "was", "were", "will", "would", "could", "should", "may",
    "might", "must", "can", "shall", "have", "has", "had", "been", "being", "do"
  ];

  // Calculate softmax scores for each word based on vector similarity
  const scores = mockVocabulary.map(word => {
    const hash = word.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Generate a probability based on hash and last token vector
    const probability = Math.abs(Math.sin(hash + lastTokenVector.reduce((a, b) => a + b, 0)));
    return { word, probability };
  });

  // Sort by probability
  return scores.sort((a, b) => b.probability - a.probability);
};
