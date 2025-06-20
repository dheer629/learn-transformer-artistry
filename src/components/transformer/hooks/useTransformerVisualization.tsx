
import { useState } from "react";
import { generateEmbeddings, generateLayerOutput } from "../utils/transformerUtils";
import { encoderSteps, decoderSteps } from "../config/transformerSteps";
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
  const totalSteps = encoderSteps.length + decoderSteps.length;

  const generateNextWordPredictions = (output: LayerOutput) => {
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

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      try {
        const output = generateLayerOutput(embeddings, currentStep + 1);
        setLayerOutputs(prev => [...prev, output]);
        setCurrentStep(prev => prev + 1);
        
        const stepInfo = currentStep < encoderSteps.length 
          ? encoderSteps[currentStep]
          : decoderSteps[currentStep - encoderSteps.length];
        
        const tokenValues = embeddings.map(embed => ({
          word: embed.word,
          vector: embed.vector,
          positionalEncoding: embed.positionalVector,
          contextualVector: embed.contextualVector
        }));

        const formulaExplanation = `
Formula: ${stepInfo.formula}

${stepInfo.explanation.vectorExplanation}

Token Values:
${tokenValues.map(token => `
Word: "${token.word}"
Base Vector: [${token.vector.map(v => v.toFixed(3)).join(", ")}]
Position Encoding: [${token.positionalEncoding?.map(v => v.toFixed(3)).join(", ") || ''}]
Context Vector: [${token.contextualVector?.map(v => v.toFixed(3)).join(", ") || ''}]
`).join('\n')}

Calculations:
${output.intermediateOutputs?.queryVectors ? 
  `Query vectors (Q = W_q * X):
   [${output.intermediateOutputs.queryVectors[0].map(v => v.toFixed(3)).join(", ")}]` : 
  ''}
${output.intermediateOutputs?.keyVectors ? 
  `Key vectors (K = W_k * X):
   [${output.intermediateOutputs.keyVectors[0].map(v => v.toFixed(3)).join(", ")}]` : 
  ''}
${output.intermediateOutputs?.valueVectors ? 
  `Value vectors (V = W_v * X):
   [${output.intermediateOutputs.valueVectors[0].map(v => v.toFixed(3)).join(", ")}]` : 
  ''}
        `;
        
        toast({
          title: `Step ${currentStep + 1}: ${stepInfo.title}`,
          description: formulaExplanation,
          duration: 8000,
        });

        if (currentStep >= encoderSteps.length) {
          const predictions = generateNextWordPredictions(output);
          setNextWordProbabilities(predictions);
          
          const predictionText = `Top 5 predicted next words:
${predictions.slice(0, 5).map((pred, i) => `${i + 1}. ${pred.word}: ${(pred.probability * 100).toFixed(1)}%`).join('\n')}`;
          
          toast({
            title: "Next Word Predictions",
            description: predictionText,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error("Error in processing step:", error);
        toast({
          title: "Error Processing Step",
          description: "There was an error processing this transformation step.",
          variant: "destructive",
        });
      }
    }
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
      
      const tokenList = newEmbeddings.map((embed, i) => `Token ${i + 1}: ${embed.word}`).join('\n');
      
      toast({
        title: "Token Processing Started",
        description: `Input text tokenized into ${newEmbeddings.length} tokens:\n\n${tokenList}`,
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
