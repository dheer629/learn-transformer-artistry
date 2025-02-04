export interface LayerData {
  name: string;
  neurons: number;
  weights?: number[][];
  attention_heads?: number;
  dropout_rate?: number;
}

// Cache for storing computed weights and intermediate values
const computationCache = new Map<string, {
  weights: number[][],
  timestamp: number
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

export const generateLayerWeights = (inputSize: number, outputSize: number, seed?: string): number[][] => {
  const cacheKey = `weights_${inputSize}_${outputSize}_${seed || ''}`;
  const cached = computationCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.weights;
  }

  // Xavier/Glorot initialization for better gradient flow
  const limit = Math.sqrt(6 / (inputSize + outputSize));
  const weights = Array(inputSize).fill(0).map(() =>
    Array(outputSize).fill(0).map(() =>
      (Math.random() * 2 * limit) - limit
    )
  );

  computationCache.set(cacheKey, {
    weights,
    timestamp: Date.now()
  });

  return weights;
};

export const getTransformerLayers = (inputLength: number): LayerData[] => {
  // Standard transformer architecture dimensions
  const embeddingDim = 512;  // Standard transformer embedding dimension
  const ffnDim = 2048;       // Feed-forward network dimension (4x embedding_dim)
  const numHeads = 8;        // Number of attention heads
  const headDim = embeddingDim / numHeads;
  const dropoutRate = 0.1;   // Standard dropout rate

  return [
    {
      name: "Input Embedding",
      neurons: inputLength * embeddingDim,
      weights: generateLayerWeights(inputLength, embeddingDim),
      dropout_rate: dropoutRate
    },
    {
      name: "Positional Encoding",
      neurons: embeddingDim,
      weights: generateLayerWeights(embeddingDim, embeddingDim)
    },
    {
      name: "Multi-Head Self-Attention",
      neurons: embeddingDim,
      attention_heads: numHeads,
      weights: generateLayerWeights(embeddingDim, embeddingDim * 3), // Q, K, V projections
      dropout_rate: dropoutRate
    },
    {
      name: "Layer Normalization 1",
      neurons: embeddingDim,
      weights: generateLayerWeights(embeddingDim, 2) // Scale and bias
    },
    {
      name: "Feed Forward Network",
      neurons: ffnDim,
      weights: generateLayerWeights(embeddingDim, ffnDim),
      dropout_rate: dropoutRate
    },
    {
      name: "Layer Normalization 2",
      neurons: embeddingDim,
      weights: generateLayerWeights(ffnDim, embeddingDim)
    },
    {
      name: "Decoder Self-Attention",
      neurons: embeddingDim,
      attention_heads: numHeads,
      weights: generateLayerWeights(embeddingDim, embeddingDim * 3),
      dropout_rate: dropoutRate
    },
    {
      name: "Decoder Cross-Attention",
      neurons: embeddingDim,
      attention_heads: numHeads,
      weights: generateLayerWeights(embeddingDim, embeddingDim * 3),
      dropout_rate: dropoutRate
    },
    {
      name: "Decoder Feed Forward",
      neurons: ffnDim,
      weights: generateLayerWeights(embeddingDim, ffnDim),
      dropout_rate: dropoutRate
    },
    {
      name: "Output Projection",
      neurons: embeddingDim,
      weights: generateLayerWeights(ffnDim, embeddingDim)
    }
  ];
};

// Utility function to compute attention scores with caching
export const computeAttentionScores = (
  queries: number[][],
  keys: number[][],
  values: number[][],
  mask?: boolean[][]
): number[][] => {
  const cacheKey = `attention_${JSON.stringify({queries, keys, values, mask})}`;
  const cached = computationCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.weights;
  }

  const scores = queries.map(q => 
    keys.map(k => 
      q.reduce((sum, qi, i) => sum + qi * k[i], 0) / Math.sqrt(k.length)
    )
  );

  // Apply mask if provided
  if (mask) {
    scores.forEach((row, i) => {
      row.forEach((_, j) => {
        if (mask[i][j]) scores[i][j] = -Infinity;
      });
    });
  }

  // Softmax
  const expScores = scores.map(row => {
    const maxScore = Math.max(...row);
    const exp = row.map(x => Math.exp(x - maxScore));
    const sumExp = exp.reduce((a, b) => a + b, 0);
    return exp.map(x => x / sumExp);
  });

  computationCache.set(cacheKey, {
    weights: expScores,
    timestamp: Date.now()
  });

  return expScores;
};