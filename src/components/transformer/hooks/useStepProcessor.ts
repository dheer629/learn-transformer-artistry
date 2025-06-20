
import { generateLayerOutput } from "../utils/transformerUtils";
import { encoderSteps, decoderSteps } from "../config/transformerSteps";
import { generateNextWordPredictions } from "../utils/predictionUtils";
import { createStepToastDescription, createPredictionToastDescription } from "../utils/toastHelpers";
import type { EmbeddingVector, LayerOutput } from "../types";

export const useStepProcessor = (
  embeddings: EmbeddingVector[],
  currentStep: number,
  setLayerOutputs: React.Dispatch<React.SetStateAction<LayerOutput[]>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setNextWordProbabilities: React.Dispatch<React.SetStateAction<{ word: string; probability: number }[]>>,
  toast: any
) => {
  const totalSteps = encoderSteps.length + decoderSteps.length;

  const processNextStep = () => {
    if (currentStep < totalSteps - 1) {
      try {
        const output = generateLayerOutput(embeddings, currentStep + 1);
        setLayerOutputs(prev => [...prev, output]);
        setCurrentStep(prev => prev + 1);
        
        const stepInfo = currentStep < encoderSteps.length 
          ? encoderSteps[currentStep]
          : decoderSteps[currentStep - encoderSteps.length];
        
        const formulaExplanation = createStepToastDescription(stepInfo, embeddings, output);
        
        toast({
          title: `Step ${currentStep + 1}: ${stepInfo.title}`,
          description: formulaExplanation,
          duration: 8000,
        });

        if (currentStep >= encoderSteps.length) {
          const predictions = generateNextWordPredictions(output);
          setNextWordProbabilities(predictions);
          
          const predictionText = createPredictionToastDescription(predictions);
          
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

  return { processNextStep, totalSteps };
};
