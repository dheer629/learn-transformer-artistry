export interface VectorData {
  values: number[];
  attention: number[];
  position: number[];
}

// Generate word embeddings using a simple hash function
export const generateWordEmbedding = (word: string, dim: number = 8): number[] => {
  const hash = word.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  return Array.from({ length: dim }, (_, i) => {
    const value = Math.sin((hash + i) / 100);
    return Number(value.toFixed(4));
  });
};

// Generate positional encodings using the transformer formula
export const generatePositionalEncoding = (position: number, dim: number): number[] => {
  return Array.from({ length: dim }, (_, i) => {
    const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / dim);
    const value = i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
    return Number(value.toFixed(4));
  });
};

// Calculate attention scores using scaled dot-product attention
export const calculateAttention = (queryVector: number[], keyVectors: number[][]): number[] => {
  const scale = Math.sqrt(queryVector.length);
  const scores = keyVectors.map(keyVector => {
    const dotProduct = queryVector.reduce((sum, q, i) => sum + q * keyVector[i], 0);
    return dotProduct / scale;
  });
  
  // Apply softmax
  const expScores = scores.map(score => Math.exp(score));
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  return expScores.map(exp => Number((exp / sumExp).toFixed(4)));
};

// Process through feed-forward network
export const feedForward = (input: number[]): number[] => {
  // Simplified two-layer feed-forward network
  const hidden = input.map(x => Math.max(0, x * 1.5 + 0.1)); // ReLU(Wx + b)
  return hidden.map(h => Number((h * 0.8 + 0.2).toFixed(4))); // Second layer
};

export const processStep = (
  inputText: string,
  step: number
): VectorData => {
  const words = inputText.split(' ');
  const dim = 8;
  
  // Step 1: Generate base embeddings
  const baseEmbeddings = words.map(word => generateWordEmbedding(word, dim));
  
  // Step 2: Add positional encodings
  const posEncodings = words.map((_, pos) => generatePositionalEncoding(pos, dim));
  
  // Step 3: Calculate attention
  const attentionScores = baseEmbeddings.map(query => 
    calculateAttention(query, baseEmbeddings)
  ).flat();
  
  // Step 4: Feed-forward processing
  const processed = baseEmbeddings.map(feedForward);
  
  switch(step) {
    case 0: // Input embeddings
      return {
        values: baseEmbeddings.flat(),
        attention: Array(baseEmbeddings.flat().length).fill(0),
        position: Array(baseEmbeddings.flat().length).fill(0)
      };
    case 1: // Positional encoding
      return {
        values: baseEmbeddings.flat(),
        attention: Array(baseEmbeddings.flat().length).fill(0),
        position: posEncodings.flat()
      };
    case 2: // Self-attention
      return {
        values: baseEmbeddings.flat(),
        attention: attentionScores,
        position: posEncodings.flat()
      };
    case 3: // Feed-forward
      return {
        values: processed.flat(),
        attention: attentionScores,
        position: posEncodings.flat()
      };
    default:
      return {
        values: [],
        attention: [],
        position: []
      };
  }
};