
export interface TokenInfo {
  token: string;
  id: number;
  startOffset: number;
  endOffset: number;
  logProb?: number;
  rank?: number;
}

export interface TokenizationResult {
  tokens: TokenInfo[];
  ids: number[];
  attentionMask: number[];
  originalText: string;
  model: string;
}

export interface PredictionResult {
  nextTokens: Array<{
    token: string;
    probability: number;
    logProb: number;
    rank: number;
  }>;
  confidence: number;
  model: string;
}

// Simple BPE-style tokenizer for demonstration
class SimpleTokenizer {
  private vocab: Map<string, number> = new Map();
  private inverseVocab: Map<number, string> = new Map();
  
  constructor() {
    // Initialize with common tokens
    const commonTokens = [
      '<pad>', '<unk>', '<s>', '</s>', 'the', 'and', 'to', 'of', 'a', 'in',
      'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as',
      'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we',
      'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would',
      'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who',
      'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time',
      'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your',
      'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
      'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
      'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
      'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
      'most', 'us', 'is', 'water', 'long', 'find', 'here', 'thing', 'great',
      'little', 'right', 'old', 'tell', 'boy', 'follow', 'came', 'show',
      'large', 'begin', 'life', 'never', 'call', 'before', 'live', 'move',
      'own', 'say', 'man', 'made', 'land', 'year', 'sound', 'take', 'place'
    ];
    
    commonTokens.forEach((token, id) => {
      this.vocab.set(token, id);
      this.inverseVocab.set(id, token);
    });
    
    // Add alphabet and numbers
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(97 + i); // a-z
      const charUpper = String.fromCharCode(65 + i); // A-Z
      this.vocab.set(char, this.vocab.size);
      this.vocab.set(charUpper, this.vocab.size);
      this.inverseVocab.set(this.vocab.get(char)!, char);
      this.inverseVocab.set(this.vocab.get(charUpper)!, charUpper);
    }
    
    for (let i = 0; i < 10; i++) {
      this.vocab.set(i.toString(), this.vocab.size);
      this.inverseVocab.set(this.vocab.get(i.toString())!, i.toString());
    }
    
    // Add common punctuation
    const punctuation = [' ', '.', ',', '!', '?', ';', ':', "'", '"', '-'];
    punctuation.forEach(p => {
      this.vocab.set(p, this.vocab.size);
      this.inverseVocab.set(this.vocab.get(p)!, p);
    });
  }
  
  tokenize(text: string): TokenizationResult {
    const tokens: TokenInfo[] = [];
    const ids: number[] = [];
    const words = text.toLowerCase().split(/(\s+|[.,!?;:'"()-])/);
    let offset = 0;
    
    words.forEach(word => {
      if (word.trim()) {
        const tokenId = this.vocab.get(word) || this.vocab.get('<unk>')!;
        tokens.push({
          token: word,
          id: tokenId,
          startOffset: offset,
          endOffset: offset + word.length,
          logProb: Math.log(Math.random() * 0.5 + 0.1), // Mock log probability
          rank: Math.floor(Math.random() * 1000)
        });
        ids.push(tokenId);
      }
      offset += word.length;
    });
    
    return {
      tokens,
      ids,
      attentionMask: Array(tokens.length).fill(1),
      originalText: text,
      model: 'simple-bpe'
    };
  }
  
  decode(ids: number[]): string {
    return ids.map(id => this.inverseVocab.get(id) || '<unk>').join('');
  }
  
  predictNext(tokenIds: number[], temperature: number = 0.7): PredictionResult {
    // Mock next token prediction
    const candidates = Array.from(this.vocab.entries())
      .slice(0, 50)
      .map(([token, id]) => {
        const score = Math.random();
        const logProb = Math.log(score / temperature);
        return {
          token,
          probability: score,
          logProb,
          rank: 0
        };
      })
      .sort((a, b) => b.probability - a.probability);
    
    // Assign ranks and normalize probabilities
    const total = candidates.reduce((sum, c) => sum + c.probability, 0);
    candidates.forEach((candidate, index) => {
      candidate.rank = index + 1;
      candidate.probability = candidate.probability / total;
    });
    
    return {
      nextTokens: candidates.slice(0, 10),
      confidence: Math.random() * 0.4 + 0.6,
      model: 'simple-bpe'
    };
  }
}

export class TokenizerService {
  private simpleTokenizer = new SimpleTokenizer();
  
  async tokenize(text: string, model: string = 'gpt-4'): Promise<TokenizationResult> {
    console.log(`Tokenizing with model: ${model}`);
    console.log(`Input text: "${text}"`);
    
    try {
      // For now, use our simple tokenizer
      // In a real implementation, you would call the specific model's tokenizer
      const result = this.simpleTokenizer.tokenize(text);
      
      console.log(`Tokenization result:`, {
        tokenCount: result.tokens.length,
        tokens: result.tokens.map(t => t.token),
        ids: result.ids
      });
      
      return {
        ...result,
        model
      };
    } catch (error) {
      console.error('Tokenization error:', error);
      throw new Error(`Failed to tokenize text with ${model}: ${error}`);
    }
  }
  
  async predictNextTokens(
    tokenIds: number[], 
    model: string = 'gpt-4',
    temperature: number = 0.7
  ): Promise<PredictionResult> {
    console.log(`Predicting next tokens with model: ${model}`);
    console.log(`Input token IDs: [${tokenIds.slice(-5).join(', ')}...] (last 5)`);
    
    try {
      const result = this.simpleTokenizer.predictNext(tokenIds, temperature);
      
      console.log(`Prediction result:`, {
        topToken: result.nextTokens[0]?.token,
        topProbability: result.nextTokens[0]?.probability,
        confidence: result.confidence
      });
      
      return {
        ...result,
        model
      };
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error(`Failed to predict next tokens with ${model}: ${error}`);
    }
  }
  
  decode(tokenIds: number[]): string {
    return this.simpleTokenizer.decode(tokenIds);
  }
  
  getSupportedModels(): string[] {
    return [
      'gpt-4',
      'gpt-3.5-turbo',
      'claude-3-sonnet',
      'llama-2-7b',
      'bert-base-uncased'
    ];
  }
}

export const tokenizerService = new TokenizerService();
