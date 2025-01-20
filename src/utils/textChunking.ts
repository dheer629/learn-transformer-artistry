export const CHUNK_SIZE = 4096; // Deepseek's recommended chunk size
export const MAX_TOKENS = 65536;
export const COMPLETION_TOKENS = 8000;

export interface ChunkConfig {
  maxTokens: number;
  completionTokens: number;
  chunkSize: number;
}

export const calculateTokenCount = (text: string): number => {
  // Simple approximation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
};

export const splitIntoChunks = (text: string, chunkSize: number = CHUNK_SIZE): string[] => {
  const words = text.split(' ');
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    const wordLength = calculateTokenCount(word);
    
    if (currentLength + wordLength > chunkSize) {
      chunks.push(currentChunk.join(' '));
      currentChunk = [word];
      currentLength = wordLength;
    } else {
      currentChunk.push(word);
      currentLength += wordLength;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
};

export const validateTokenLimit = (text: string, config: ChunkConfig): { 
  isValid: boolean; 
  tokenCount: number; 
  totalTokens: number;
} => {
  const tokenCount = calculateTokenCount(text);
  const totalTokens = tokenCount + config.completionTokens;

  return {
    isValid: totalTokens <= config.maxTokens,
    tokenCount,
    totalTokens
  };
};