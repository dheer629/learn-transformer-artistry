import React from "react";
import { toast } from "@/components/ui/use-toast";
import MathDisplay from "./MathDisplay";
import { EmbeddingVector, LayerOutput } from "../types";

interface StepInfoProps {
  currentStep: number;
  stepInfo: {
    title: string;
    formula: string;
    explanation: {
      vectorExplanation: string;
    };
  };
  embeddings: EmbeddingVector[];
  output: LayerOutput;
}

const StepInfo: React.FC<StepInfoProps> = ({
  currentStep,
  stepInfo,
  embeddings,
  output
}) => {
  const getSimpleExplanation = (step: number, embeddings: EmbeddingVector[]) => {
    const exampleWord = embeddings[0]?.word || "hello";
    
    if (step === 0) {
      return `
        Let's break this down! 🎯
        
        In this step, we're converting the word "${exampleWord}" into numbers that the computer can understand.
        Think of it like giving each word a special code, just like how you might use numbers to represent colors (like #FF0000 for red).
        
        For example:
        - Original word: "${exampleWord}"
        - Computer's number code: [${embeddings[0]?.vector.slice(0, 3).map(v => v.toFixed(2)).join(", ")}...]
        
        This helps the computer understand relationships between words, just like how you understand that "happy" and "joyful" are similar!
      `;
    } else if (step === 1) {
      return `
        Now we're adding position information! 📍
        
        Why? Because in a sentence like "The cat chased the mouse", it matters that "cat" comes before "mouse"!
        
        We use special math (sine and cosine waves) to create unique patterns for each position:
        Position 1: [${output.intermediateOutputs?.queryVectors[0].slice(0, 3).map(v => v.toFixed(2)).join(", ")}...]
        
        This is like giving each word a special "location tag" so we remember where it goes in the sentence!
      `;
    } else if (step === 2) {
      return `
        Time for the attention step! 👀
        
        This is where the magic happens! The computer looks at how each word relates to every other word.
        
        For example, in "I love ice cream":
        - When looking at "ice", the computer pays special attention to "cream" because they often go together
        - The attention score between these words would be higher (closer to 1.0)
        
        Current attention scores:
        ${output.attentionWeights[0]?.slice(0, 3).map((score, i) => 
          `Word ${i + 1}: ${score.toFixed(2)}`
        ).join('\n')}
        
        Higher numbers mean the words are more related to each other!
      `;
    } else {
      return `
        Final processing step! 🎉
        
        We're combining all the information we gathered:
        - Word meanings
        - Position information
        - How words relate to each other
        
        This helps us understand the full context of each word in your sentence!
        
        Final values for first word:
        [${output.outputEmbeddings[0]?.contextualVector?.slice(0, 3).map(v => v.toFixed(2)).join(", ")}...]
      `;
    }
  };

  React.useEffect(() => {
    const explanation = getSimpleExplanation(currentStep, embeddings);
    
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
            <MathDisplay 
              formula={stepInfo.formula} 
              explanation={stepInfo.explanation.vectorExplanation} 
            />
          </div>
        </div>
      ),
      duration: 8000,
    });
  }, [currentStep, stepInfo, embeddings, output]);

  return null;
};

export default StepInfo;