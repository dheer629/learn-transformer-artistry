
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getTransformerLayers, computeAttentionScores } from "../utils/neuralNetworkUtils";
import type { LayerData } from "../types/neuralNetworkTypes";

export const useVisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [layers, setLayers] = useState<LayerData[]>([]);
  const [inputTokens, setInputTokens] = useState<string[]>([]);
  const [outputTokens, setOutputTokens] = useState<string[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([[0]]);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const { toast } = useToast();

  const initializeTransformerLayers = useCallback((tokens: string[]) => {
    const newLayers = getTransformerLayers(tokens.length);
    setLayers(newLayers);
    setIsProcessingComplete(false);
    setOutputTokens([]);
    setCurrentStep(0);
    
    const initialWeights = Array(tokens.length).fill(0).map(() => 
      Array(tokens.length).fill(0).map(() => 0.1)
    );
    setAttentionWeights(initialWeights.length > 0 ? initialWeights : [[0]]);
  }, []);

  const processStep = useCallback((step: number) => {
    if (!layers.length) return;

    const midPoint = Math.floor(layers.length / 2);
    
    if (step >= midPoint && inputTokens[step - midPoint]) {
      setOutputTokens(prevTokens => {
        const newToken = inputTokens[step - midPoint];
        return [...prevTokens, newToken];
      });
      
      if (layers[step].attention_heads) {
        const queries = layers[step].weights?.[0] || [];
        const keys = layers[step].weights?.[1] || [];
        const values = layers[step].weights?.[2] || [];
        
        const newWeights = computeAttentionScores([queries], [keys], [values]);
        
        setAttentionWeights(prev => {
          const updated = [...prev];
          if (updated[step]) {
            updated[step] = newWeights[0];
          }
          return updated;
        });
      }
    }
    
    if (step === layers.length - 1) {
      setIsPlaying(false);
      setIsProcessingComplete(true);
      toast({
        title: "Processing Complete",
        description: "All transformer layers have been processed",
      });
    }
  }, [layers, inputTokens, toast]);

  useEffect(() => {
    if (inputText) {
      const tokens = inputText.split(" ");
      setInputTokens(tokens);
      initializeTransformerLayers(tokens);
    }
  }, [inputText, initializeTransformerLayers]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && layers.length > 0) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep < layers.length) {
            processStep(nextStep);
            return nextStep;
          }
          return prev;
        });
      }, 2000 / speed);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, speed, layers, processStep]);

  const handleSpeedChange = useCallback((value: number[]) => {
    setSpeed(value[0]);
    toast({
      title: "Animation Speed Updated",
      description: `Speed set to ${value[0]}x`,
    });
  }, [toast]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleNextStep = useCallback(() => {
    if (layers.length > 0 && currentStep < layers.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      processStep(nextStep);
    }
  }, [currentStep, layers, processStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setOutputTokens([]);
    setIsProcessingComplete(false);
    toast({
      title: "Visualization Reset",
      description: "Starting from the beginning",
    });
  }, [toast]);

  const handleLayerSelect = useCallback((layerIndex: number) => {
    setSelectedLayer(layerIndex);
    setCurrentStep(layerIndex);
    
    if (layers[layerIndex]) {
      toast({
        title: `Layer ${layerIndex + 1} Selected`,
        description: `Viewing ${layers[layerIndex].name} with ${layers[layerIndex].neurons} neurons`,
      });
    }
  }, [layers, toast]);

  return {
    isPlaying,
    speed,
    currentStep,
    inputText,
    selectedLayer,
    layers,
    inputTokens,
    outputTokens,
    attentionWeights,
    isProcessingComplete,
    setInputText,
    handleSpeedChange,
    handlePlayPause,
    handleNextStep,
    handleReset,
    handleLayerSelect
  };
};
