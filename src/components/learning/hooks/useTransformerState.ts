
import { useState, useEffect } from 'react';
import { getTransformerLayers } from '../utils/neuralNetworkUtils';
import type { LayerData } from '../utils/neuralNetworkUtils';

export const useTransformerState = (inputText: string) => {
  const [layers, setLayers] = useState<LayerData[]>([]);
  const [inputTokens, setInputTokens] = useState<string[]>([]);
  const [outputTokens, setOutputTokens] = useState<string[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [activeProcessingStep, setActiveProcessingStep] = useState<string | null>(null);
  const [hints, setHints] = useState<string[]>([]);
  const [visualizationMode, setVisualizationMode] = useState<'basic' | 'detailed'>('basic');

  useEffect(() => {
    if (inputText) {
      // Generate helpful hints based on input length
      const newHints = [];
      const tokens = inputText.split(/\s+/);
      
      setInputTokens(tokens);
      setLayers(getTransformerLayers(tokens.length));
      setIsProcessingComplete(false);
      setOutputTokens([]);
      setActiveProcessingStep("tokenization");
      
      // Generate attention weights matrix
      const weights = Array(tokens.length).fill(0).map(() => 
        Array(tokens.length).fill(0).map(() => Math.random())
      );
      setAttentionWeights(weights);
      
      // Add helpful hints based on input
      if (tokens.length > 8) {
        newHints.push("Long sequences may take more time to process");
      } else if (tokens.length < 3) {
        newHints.push("Try a longer sentence for a more meaningful visualization");
      }
      
      newHints.push("Watch how attention flows between tokens as processing advances");
      setHints(newHints);
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
    setIsProcessingComplete,
    activeProcessingStep,
    setActiveProcessingStep,
    hints,
    visualizationMode,
    setVisualizationMode
  };
};
