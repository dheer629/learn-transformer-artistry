
import { useState, useEffect } from 'react';
import { getTransformerLayers } from '../utils/neuralNetworkUtils';
import type { LayerData } from '../utils/neuralNetworkUtils';

export const useTransformerState = (inputText: string) => {
  const [layers, setLayers] = useState<LayerData[]>([]);
  const [inputTokens, setInputTokens] = useState<string[]>([]);
  const [outputTokens, setOutputTokens] = useState<string[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);

  useEffect(() => {
    if (inputText) {
      const tokens = inputText.split(" ");
      setInputTokens(tokens);
      setLayers(getTransformerLayers(tokens.length));
      setIsProcessingComplete(false);
      setOutputTokens([]);
      
      const weights = Array(tokens.length).fill(0).map(() => 
        Array(tokens.length).fill(0).map(() => Math.random())
      );
      setAttentionWeights(weights);
    }
  }, [inputText]);

  return {
    layers,
    inputTokens,
    outputTokens,
    setOutputTokens,
    attentionWeights,
    setAttentionWeights,
    isProcessingComplete,
    setIsProcessingComplete
  };
};

