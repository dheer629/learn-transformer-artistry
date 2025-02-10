
import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { getTransformerLayers, computeAttentionScores } from "../utils/neuralNetworkUtils";
import type { LayerData } from "../types/neuralNetworkTypes";
import { countTokens } from "@/components/transformer/utils/tokenUtils";

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
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const initializeTransformerLayers = useCallback(async (text: string) => {
    try {
      const tokenCount = await countTokens(text);
      if (tokenCount > 100) {
        toast({
          title: "⚠️ Warning",
          description: "Large token count may affect performance",
          variant: "default",
        });
      }
      
      const tokens = text.split(" ");
      const newLayers = getTransformerLayers(tokens.length);
      setLayers(newLayers);
      setInputTokens(tokens);
      setIsProcessingComplete(false);
      setOutputTokens([]);
      setCurrentStep(0);
      
      const initialWeights = Array(tokens.length).fill(0).map(() => 
        Array(tokens.length).fill(0).map(() => 0.1)
      );
      setAttentionWeights(initialWeights.length > 0 ? initialWeights : [[0]]);
    } catch (error) {
      console.error("Error initializing layers:", error);
      toast({
        title: "Error",
        description: "Failed to initialize visualization",
        variant: "destructive",
      });
    }
  }, [toast]);

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
      initializeTransformerLayers(inputText);
    }
  }, [inputText, initializeTransformerLayers]);

  useEffect(() => {
    if (isPlaying && layers.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep < layers.length) {
            processStep(nextStep);
            return nextStep;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 2000 / speed);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, layers, processStep]);

  const handleSpeedChange = useCallback((value: number[]) => {
    setSpeed(value[0]);
  }, []);

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

