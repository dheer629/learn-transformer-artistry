
import { useState } from "react";
import { generateEmbeddings, generateLayerOutput } from "../utils/transformerUtils";
import { encoderSteps, decoderSteps } from "../config/transformerSteps";
import { createTokenizationToastDescription } from "../utils/toastHelpers";
import { useStepProcessor } from "./useStepProcessor";
import type { EmbeddingVector, LayerOutput } from "../types";
import { useToast } from "@/hooks/use-toast";

export const useTransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [learningRate, setLearningRate] = useState(0.1);
  const [embeddings, setEmbeddings] = useState<EmbeddingVector[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  const [layerOutputs, setLayerOutputs] = useState<LayerOutput[]>([]);
  const [nextWordProbabilities, setNextWordProbabilities] = useState<{ word: string; probability: number }[]>([]);
  const { toast } = useToast();
  
  const { processNextStep, totalSteps } = useStepProcessor(
    embeddings,
    currentStep,
    setLayerOutputs,
    setCurrentStep,
    setNextWordProbabilities,
    toast
  );

  const handleNextStep = () => {
    processNextStep();
  };

  const handleProcess = () => {
    if (!inputText) {
      toast({
        title: "Input Required",
        description: "Please enter some text to process.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setCurrentStep(0);
    setLayerOutputs([]);
    setNextWordProbabilities([]);
    
    try {
      const newEmbeddings = generateEmbeddings(inputText);
      setEmbeddings(newEmbeddings);
      
      const weights = Array(newEmbeddings.length).fill(0).map(() => 
        Array(newEmbeddings.length).fill(0).map(() => 
          Number((Math.random()).toFixed(2))
        )
      );
      setAttentionWeights(weights);

      const initialOutput = generateLayerOutput(newEmbeddings, 0);
      setLayerOutputs([initialOutput]);
      
      const tokenList = createTokenizationToastDescription(newEmbeddings);
      
      toast({
        title: "Token Processing Started",
        description: tokenList,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error in initial processing:", error);
      setIsProcessing(false);
      toast({
        title: "Processing Error",
        description: "Failed to process input text. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    inputText,
    setInputText,
    isProcessing,
    currentStep,
    isPaused,
    setIsPaused,
    learningRate,
    setLearningRate,
    embeddings,
    attentionWeights,
    layerOutputs,
    nextWordProbabilities,
    totalSteps,
    handleNextStep,
    handleProcess
  };
};
