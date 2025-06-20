
import type { LayerOutput } from "../types";

export const generateNextWordPredictions = (output: LayerOutput) => {
  const lastTokenVector = output.outputEmbeddings[output.outputEmbeddings.length - 1].contextualVector;
  if (!lastTokenVector) return [];

  const mockVocabulary = [
    "the", "is", "are", "was", "were", "will", "would", "could", "should", "may",
    "might", "must", "can", "shall", "have", "has", "had", "been", "being", "do"
  ];

  const scores = mockVocabulary.map(word => {
    const hash = word.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const probability = Math.abs(Math.sin(hash + lastTokenVector.reduce((a, b) => a + b, 0)));
    return { word, probability };
  });

  return scores.sort((a, b) => b.probability - a.probability);
};
