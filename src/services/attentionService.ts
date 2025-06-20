
import type { TokenInfo } from './tokenizerService';

export interface AttentionHead {
  headIndex: number;
  layerIndex: number;
  weights: number[][];
  pattern: 'local' | 'global' | 'sparse' | 'structured';
}

export interface AttentionAnalysis {
  heads: AttentionHead[];
  summary: {
    avgAttentionEntropy: number;
    maxAttentionWeight: number;
    dominantPatterns: string[];
    tokenImportance: Array<{
      token: string;
      importance: number;
      position: number;
    }>;
  };
}

export class AttentionService {
  generateRealisticAttention(
    tokens: TokenInfo[],
    numLayers: number = 6,
    numHeads: number = 8
  ): AttentionAnalysis {
    console.log(`Generating attention patterns for ${tokens.length} tokens`);
    
    const heads: AttentionHead[] = [];
    const seqLen = tokens.length;
    
    for (let layer = 0; layer < numLayers; layer++) {
      for (let head = 0; head < numHeads; head++) {
        const weights = this.generateAttentionWeights(tokens, layer, head);
        const pattern = this.classifyAttentionPattern(weights);
        
        heads.push({
          headIndex: head,
          layerIndex: layer,
          weights,
          pattern
        });
      }
    }
    
    // Calculate summary statistics
    const summary = this.calculateAttentionSummary(heads, tokens);
    
    console.log(`Generated attention analysis:`, {
      totalHeads: heads.length,
      patterns: summary.dominantPatterns,
      avgEntropy: summary.avgAttentionEntropy.toFixed(3)
    });
    
    return { heads, summary };
  }
  
  private generateAttentionWeights(
    tokens: TokenInfo[],
    layerIndex: number,
    headIndex: number
  ): number[][] {
    const seqLen = tokens.length;
    const weights: number[][] = [];
    
    for (let i = 0; i < seqLen; i++) {
      weights[i] = [];
      for (let j = 0; j < seqLen; j++) {
        let weight: number;
        
        // Different attention patterns based on layer and head
        if (layerIndex < 2) {
          // Early layers: more local attention
          weight = this.calculateLocalAttention(i, j, seqLen);
        } else if (layerIndex < 4) {
          // Middle layers: syntactic patterns
          weight = this.calculateSyntacticAttention(tokens, i, j);
        } else {
          // Later layers: semantic patterns
          weight = this.calculateSemanticAttention(tokens, i, j);
        }
        
        // Add head-specific variations
        weight *= this.getHeadMultiplier(headIndex, i, j);
        weights[i][j] = weight;
      }
      
      // Normalize each row to sum to 1 (softmax-like)
      const sum = weights[i].reduce((a, b) => a + b, 0);
      if (sum > 0) {
        weights[i] = weights[i].map(w => w / sum);
      }
    }
    
    return weights;
  }
  
  private calculateLocalAttention(i: number, j: number, seqLen: number): number {
    const distance = Math.abs(i - j);
    const maxDistance = 3;
    
    if (distance === 0) return 1.0;
    if (distance > maxDistance) return 0.1;
    
    return Math.exp(-distance / 2) + 0.1;
  }
  
  private calculateSyntacticAttention(tokens: TokenInfo[], i: number, j: number): number {
    const token_i = tokens[i].token.toLowerCase();
    const token_j = tokens[j].token.toLowerCase();
    
    // High attention for certain syntactic relationships
    const syntacticPairs = [
      ['the', 'cat'], ['a', 'dog'], ['is', 'running'],
      ['have', 'been'], ['will', 'be'], ['can', 'see']
    ];
    
    for (const [first, second] of syntacticPairs) {
      if ((token_i === first && token_j === second) || 
          (token_i === second && token_j === first)) {
        return 0.8 + Math.random() * 0.2;
      }
    }
    
    // Medium attention for same word type
    if (this.isSameWordType(token_i, token_j)) {
      return 0.4 + Math.random() * 0.3;
    }
    
    return Math.random() * 0.3;
  }
  
  private calculateSemanticAttention(tokens: TokenInfo[], i: number, j: number): number {
    const token_i = tokens[i].token.toLowerCase();
    const token_j = tokens[j].token.toLowerCase();
    
    // Semantic similarity (simplified)
    const semanticGroups = [
      ['cat', 'dog', 'animal', 'pet'],
      ['run', 'walk', 'move', 'go'],
      ['big', 'large', 'huge', 'enormous'],
      ['small', 'tiny', 'little', 'mini']
    ];
    
    for (const group of semanticGroups) {
      if (group.includes(token_i) && group.includes(token_j)) {
        return 0.7 + Math.random() * 0.3;
      }
    }
    
    return Math.random() * 0.4;
  }
  
  private getHeadMultiplier(headIndex: number, i: number, j: number): number {
    // Different heads focus on different aspects
    switch (headIndex % 4) {
      case 0: // Position-based head
        return Math.abs(i - j) < 2 ? 1.2 : 0.8;
      case 1: // Content-based head
        return 0.9 + Math.random() * 0.2;
      case 2: // Long-range head
        return Math.abs(i - j) > 2 ? 1.1 : 0.9;
      case 3: // Balanced head
        return 1.0;
      default:
        return 1.0;
    }
  }
  
  private isSameWordType(token1: string, token2: string): boolean {
    const articles = ['the', 'a', 'an'];
    const verbs = ['is', 'are', 'was', 'were', 'run', 'walk', 'see'];
    const nouns = ['cat', 'dog', 'house', 'car', 'book'];
    
    return (
      (articles.includes(token1) && articles.includes(token2)) ||
      (verbs.includes(token1) && verbs.includes(token2)) ||
      (nouns.includes(token1) && nouns.includes(token2))
    );
  }
  
  private classifyAttentionPattern(weights: number[][]): 'local' | 'global' | 'sparse' | 'structured' {
    const seqLen = weights.length;
    let localSum = 0;
    let globalSum = 0;
    let nonZeroCount = 0;
    
    for (let i = 0; i < seqLen; i++) {
      for (let j = 0; j < seqLen; j++) {
        const weight = weights[i][j];
        if (weight > 0.1) nonZeroCount++;
        
        if (Math.abs(i - j) <= 2) {
          localSum += weight;
        } else {
          globalSum += weight;
        }
      }
    }
    
    const sparsity = nonZeroCount / (seqLen * seqLen);
    const localRatio = localSum / (localSum + globalSum);
    
    if (sparsity < 0.3) return 'sparse';
    if (localRatio > 0.7) return 'local';
    if (localRatio < 0.3) return 'global';
    return 'structured';
  }
  
  private calculateAttentionSummary(heads: AttentionHead[], tokens: TokenInfo[]) {
    const allWeights = heads.flatMap(h => h.weights.flat());
    const maxAttentionWeight = Math.max(...allWeights);
    
    // Calculate entropy for each head
    const entropies = heads.map(head => {
      let totalEntropy = 0;
      for (const row of head.weights) {
        let entropy = 0;
        for (const weight of row) {
          if (weight > 0) {
            entropy -= weight * Math.log2(weight);
          }
        }
        totalEntropy += entropy;
      }
      return totalEntropy / head.weights.length;
    });
    
    const avgAttentionEntropy = entropies.reduce((a, b) => a + b, 0) / entropies.length;
    
    // Find dominant patterns
    const patternCounts: Record<string, number> = {};
    heads.forEach(head => {
      patternCounts[head.pattern] = (patternCounts[head.pattern] || 0) + 1;
    });
    
    const dominantPatterns = Object.entries(patternCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([pattern]) => pattern);
    
    // Calculate token importance (sum of incoming attention)
    const tokenImportance = tokens.map((token, pos) => {
      let totalAttention = 0;
      heads.forEach(head => {
        for (let i = 0; i < tokens.length; i++) {
          totalAttention += head.weights[i][pos] || 0;
        }
      });
      
      return {
        token: token.token,
        importance: totalAttention / heads.length,
        position: pos
      };
    }).sort((a, b) => b.importance - a.importance);
    
    return {
      avgAttentionEntropy,
      maxAttentionWeight,
      dominantPatterns,
      tokenImportance
    };
  }
}

export const attentionService = new AttentionService();
