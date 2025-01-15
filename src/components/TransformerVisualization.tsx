import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ControlsSection from "./transformer/sections/ControlsSection";
import LayersVisualization from "./transformer/sections/LayersVisualization";
import VisualizationHeader from "./transformer/sections/VisualizationHeader";
import InputOutputSection from "./transformer/sections/InputOutputSection";
import VisualizationContent from "./transformer/sections/VisualizationContent";
import { generateEmbeddings, generateLayerOutput } from "./transformer/utils/transformerUtils";
import { encoderSteps, decoderSteps } from "./transformer/config/transformerSteps";
import type { EmbeddingVector, LayerOutput } from "./transformer/types";
import { useToast } from "@/components/ui/use-toast";
import { MathJax } from "better-react-mathjax";

const TransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
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

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      try {
        const output = generateLayerOutput(embeddings, currentStep + 1);
        setLayerOutputs(prev => [...prev, output]);
        setCurrentStep(prev => prev + 1);
        
        // Show detailed formula, calculation, and token values for current step
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
          description: (
            <div className="space-y-2">
              <MathJax>
                <p className="font-medium">Formula: {stepInfo.formula}</p>
              </MathJax>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">{formulaExplanation}</p>
            </div>
          ),
          duration: 8000,
        });

        // Generate next word predictions if we're in the decoder phase
        if (currentStep >= encoderSteps.length) {
          const predictions = generateNextWordPredictions(output);
          setNextWordProbabilities(predictions);
          
          toast({
            title: "Next Word Predictions",
            description: (
              <div className="space-y-2">
                <p className="font-medium">Top 5 predicted next words:</p>
                {predictions.slice(0, 5).map((pred, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{pred.word}</span>
                    <span className="font-mono">{(pred.probability * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            ),
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

  const generateNextWordPredictions = (output: LayerOutput) => {
    // Simplified next word prediction using the last token's output
    const lastTokenVector = output.outputEmbeddings[output.outputEmbeddings.length - 1].contextualVector;
    if (!lastTokenVector) return [];

    // Generate mock vocabulary with probabilities
    const mockVocabulary = [
      "the", "is", "are", "was", "were", "will", "would", "could", "should", "may",
      "might", "must", "can", "shall", "have", "has", "had", "been", "being", "do"
    ];

    // Calculate softmax scores for each word based on vector similarity
    const scores = mockVocabulary.map(word => {
      const hash = word.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      // Generate a probability based on hash and last token vector
      const probability = Math.abs(Math.sin(hash + lastTokenVector.reduce((a, b) => a + b, 0)));
      return { word, probability };
    });

    // Sort by probability
    return scores.sort((a, b) => b.probability - a.probability);
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
    setOutputText("");
    setLayerOutputs([]);
    setNextWordProbabilities([]);
    
    try {
      const newEmbeddings = generateEmbeddings(inputText);
      setEmbeddings(newEmbeddings);
      
      // Generate initial attention weights matrix
      const weights = Array(newEmbeddings.length).fill(0).map(() => 
        Array(newEmbeddings.length).fill(0).map(() => 
          Number((Math.random()).toFixed(2))
        )
      );
      setAttentionWeights(weights);

      const initialOutput = generateLayerOutput(newEmbeddings, 0);
      setLayerOutputs([initialOutput]);
      
      // Show initial token values
      toast({
        title: "Initial Token Embeddings",
        description: (
          <div className="space-y-2">
            {newEmbeddings.map((embed, i) => (
              <div key={i} className="font-mono text-sm">
                <p className="font-medium">{embed.word}:</p>
                <p className="text-xs">[{embed.vector.map(v => v.toFixed(3)).join(", ")}]</p>
              </div>
            ))}
          </div>
        ),
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

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
      className="space-y-8"
    >
      <Card className="p-6 space-y-6 overflow-hidden bg-gradient-to-br from-white to-gray-50">
        <VisualizationHeader title="Transformer Architecture Visualization" />
        
        <InputOutputSection
          inputText={inputText}
          setInputText={setInputText}
          outputText={outputText}
          learningRate={learningRate}
          setLearningRate={setLearningRate}
          handleProcess={handleProcess}
          isProcessing={isProcessing}
        />

        <motion.div variants={containerAnimation}>
          <ControlsSection
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            handleNextStep={handleNextStep}
            isProcessing={isProcessing}
            canProgress={currentStep < totalSteps - 1}
          />
        </motion.div>

        <motion.div 
          variants={containerAnimation}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <LayersVisualization
            currentStep={currentStep}
            layerOutputs={layerOutputs}
            nextWordProbabilities={nextWordProbabilities}
          />
        </motion.div>

        <VisualizationContent
          currentStep={currentStep}
          embeddings={embeddings}
          attentionWeights={attentionWeights}
          nextWordProbabilities={nextWordProbabilities}
        />
      </Card>
    </motion.div>
  );
};

export default TransformerVisualization;