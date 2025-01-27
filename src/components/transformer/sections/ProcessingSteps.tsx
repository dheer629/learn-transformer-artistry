import React from "react";
import { toast } from "@/components/ui/use-toast";
import { encoderSteps, decoderSteps } from "../config/transformerSteps";
import type { EmbeddingVector, LayerOutput } from "../types";

interface ProcessingStepsProps {
  currentStep: number;
  embeddings: EmbeddingVector[];
  output: LayerOutput;
  isPaused: boolean;
}

const ProcessingSteps: React.FC<ProcessingStepsProps> = ({
  currentStep,
  embeddings,
  output,
  isPaused
}) => {
  const getSimpleExplanation = (step: number) => {
    const exampleWord = embeddings[0]?.word || "hello";
    
    switch(step) {
      case 0:
        return `
          Hey there! 👋 Let's understand what's happening with the word "${exampleWord}"!
          
          Just like how we use different languages to talk to different people, computers need numbers to understand words.
          
          Think of it like this:
          1. We take your word "${exampleWord}"
          2. Turn it into special numbers: [${embeddings[0]?.vector.slice(0, 3).map(v => v.toFixed(2)).join(", ")}...]
          3. These numbers help the computer understand that words like "happy" and "joyful" mean similar things!
          
          It's like giving each word its own special code that the computer can understand 🎯
        `;
      
      case 1:
        return `
          Now we're adding position information! 📍
          
          Why? Because in a sentence like "The cat chased the mouse", it matters that "cat" comes before "mouse"!
          
          Imagine you're reading a story:
          - Each word gets a special tag showing where it is in the sentence
          - First word: Position 1 [${output.intermediateOutputs?.queryVectors[0].slice(0, 3).map(v => v.toFixed(2)).join(", ")}...]
          - This helps the computer remember the order of words!
          
          Just like how changing word order can change meaning:
          "The dog chased the cat" ≠ "The cat chased the dog" 🐱🐕
        `;
      
      case 2:
        return `
          Time for the attention step! 👀
          
          This is where the magic happens! The computer looks at how words relate to each other.
          
          For example, in "I love ice cream":
          - When looking at "ice", the computer pays special attention to "cream"
          - Because "ice cream" is a common phrase!
          
          Current attention scores:
          ${output.attentionWeights[0]?.slice(0, 3).map((score, i) => 
            `Word ${i + 1}: ${(score * 100).toFixed(1)}% attention`
          ).join('\n')}
          
          Higher numbers mean the words are more connected to each other! 🔍
        `;
      
      default:
        return `
          Final processing step! 🎉
          
          We're putting everything together:
          1. Word meanings ✨
          2. Position information 📍
          3. How words connect to each other 🔗
          
          This helps us understand your whole sentence better!
          
          Final values:
          [${output.outputEmbeddings[0]?.contextualVector?.slice(0, 3).map(v => v.toFixed(2)).join(", ")}...]
          
          Now the computer really understands what you mean! 🌟
        `;
    }
  };

  React.useEffect(() => {
    if (!isPaused) {
      const explanation = getSimpleExplanation(currentStep);
      const stepInfo = currentStep < encoderSteps.length 
        ? encoderSteps[currentStep] 
        : decoderSteps[currentStep - encoderSteps.length];
      
      toast({
        title: `Step ${currentStep + 1}: ${stepInfo.title}`,
        description: (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-medium mb-2">What's happening? 🤔</p>
              <p className="whitespace-pre-line text-sm">{explanation}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">The Math Behind It ✨</p>
              <div className="bg-white/80 p-3 rounded-lg">
                <p className="font-mono text-sm">{stepInfo.formula}</p>
              </div>
              <p className="text-sm mt-2">{stepInfo.explanation.vectorExplanation}</p>
            </div>
          </div>
        ),
        duration: 8000,
      });
    }
  }, [currentStep, embeddings, output, isPaused]);

  return null;
};

export default ProcessingSteps;