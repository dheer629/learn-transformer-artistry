import { LayerData } from "../types/neuralNetworkTypes";

const EMBEDDING_DIM = 512;  // Standard transformer embedding dimension
const FFN_DIM = 2048;      // Feed-forward network dimension (4x embedding_dim)
const NUM_HEADS = 8;       // Number of attention heads
const HEAD_DIM = EMBEDDING_DIM / NUM_HEADS;
const DROPOUT_RATE = 0.1;  // Standard dropout rate

// Cache for storing computed weights and intermediate values
const computationCache = new Map<string, {
  weights: number[][],
  timestamp: number
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

// Xavier/Glorot initialization for better gradient flow
export const generateLayerWeights = (inputSize: number, outputSize: number, seed?: string): number[][] => {
  const cacheKey = `weights_${inputSize}_${outputSize}_${seed || ''}`;
  const cached = computationCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.weights;
  }

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
  return [
    {
      name: "Input Embedding",
      neurons: inputLength * EMBEDDING_DIM,
      weights: generateLayerWeights(inputLength, EMBEDDING_DIM),
      dropout_rate: DROPOUT_RATE
    },
    {
      name: "Positional Encoding",
      neurons: EMBEDDING_DIM,
      weights: generateLayerWeights(EMBEDDING_DIM, EMBEDDING_DIM)
    },
    {
      name: "Multi-Head Self-Attention",
      neurons: EMBEDDING_DIM,
      attention_heads: NUM_HEADS,
      weights: generateLayerWeights(EMBEDDING_DIM, EMBEDDING_DIM * 3), // Q, K, V projections
      dropout_rate: DROPOUT_RATE
    },
    {
      name: "Layer Normalization 1",
      neurons: EMBEDDING_DIM,
      weights: generateLayerWeights(EMBEDDING_DIM, 2) // Scale and bias
    },
    {
      name: "Feed Forward Network",
      neurons: FFN_DIM,
      weights: generateLayerWeights(EMBEDDING_DIM, FFN_DIM),
      dropout_rate: DROPOUT_RATE
    },
    {
      name: "Layer Normalization 2",
      neurons: EMBEDDING_DIM,
      weights: generateLayerWeights(FFN_DIM, EMBEDDING_DIM)
    },
    {
      name: "Decoder Self-Attention",
      neurons: EMBEDDING_DIM,
      attention_heads: NUM_HEADS,
      weights: generateLayerWeights(EMBEDDING_DIM, EMBEDDING_DIM * 3),
      dropout_rate: DROPOUT_RATE
    },
    {
      name: "Decoder Cross-Attention",
      neurons: EMBEDDING_DIM,
      attention_heads: NUM_HEADS,
      weights: generateLayerWeights(EMBEDDING_DIM, EMBEDDING_DIM * 3),
      dropout_rate: DROPOUT_RATE
    },
    {
      name: "Decoder Feed Forward",
      neurons: FFN_DIM,
      weights: generateLayerWeights(EMBEDDING_DIM, FFN_DIM),
      dropout_rate: DROPOUT_RATE
    },
    {
      name: "Output Projection",
      neurons: EMBEDDING_DIM,
      weights: generateLayerWeights(FFN_DIM, EMBEDDING_DIM)
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

  const scores: number[][] = [];
  for (let i = 0; i < queries.length; i++) {
    scores[i] = [];
    const logits = keys.map(k => 
      queries[i].reduce((sum, qi, idx) => sum + qi * k[idx], 0) / Math.sqrt(k.length)
    );
    
    // Apply mask if provided
    if (mask) {
      logits.forEach((_, j) => {
        if (mask[i][j]) logits[j] = -Infinity;
      });
    }
    
    // Softmax
    const maxLogit = Math.max(...logits);
    const expScores = logits.map(x => Math.exp(x - maxLogit));
    const sumExp = expScores.reduce((a, b) => a + b, 0);
    scores[i] = expScores.map(exp => exp / sumExp);
  }

  computationCache.set(cacheKey, {
    weights: scores,
    timestamp: Date.now()
  });

  return scores;
};