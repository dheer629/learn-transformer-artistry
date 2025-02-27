
import { useEffect } from 'react';
import type { LayerData } from '../utils/neuralNetworkUtils';

interface AnimationProps {
  isPlaying: boolean;
  speed: number;
  layers: LayerData[];
  currentStep: number;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  inputTokens: string[];
  setOutputTokens: (tokens: string[] | ((prev: string[]) => string[])) => void;
  setAttentionWeights: (weights: number[][] | ((prev: number[][]) => number[][])) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsProcessingComplete: (isComplete: boolean) => void;
}

export const useTransformerAnimation = ({
  isPlaying,
  speed,
  layers,
  currentStep,
  setCurrentStep,
  inputTokens,
  setOutputTokens,
  setAttentionWeights,
  setIsPlaying,
  setIsProcessingComplete
}: AnimationProps) => {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && layers && layers.length > 0) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const maxStep = layers.length - 1;
          if (prev < maxStep) {
            const midPoint = Math.floor(layers.length / 2);
            if (prev >= midPoint && inputTokens[prev - midPoint]) {
              setOutputTokens(prevTokens => {
                const newToken = inputTokens[prev - midPoint];
                return [...prevTokens, newToken];
              });
              
              setAttentionWeights(prev => {
                const newWeights = [...prev];
                newWeights[currentStep] = newWeights[currentStep].map(() => Math.random());
                return newWeights;
              });
            }
            return prev + 1;
          }
          setIsPlaying(false);
          setIsProcessingComplete(true);
          return prev;
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, layers, inputTokens, currentStep, setCurrentStep, setOutputTokens, setAttentionWeights, setIsPlaying, setIsProcessingComplete]);
};

