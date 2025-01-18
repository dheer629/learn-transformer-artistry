import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { MathJaxContext } from "better-react-mathjax";
import ControlsSection from "./transformer/sections/ControlsSection";
import LayersVisualization from "./transformer/sections/LayersVisualization";
import VisualizationHeader from "./transformer/sections/VisualizationHeader";
import InputOutputSection from "./transformer/sections/InputOutputSection";
import VisualizationContent from "./transformer/sections/VisualizationContent";
import TokenProcessingSection from "./transformer/sections/TokenProcessingSection";
import PredictionsSection from "./transformer/sections/PredictionsSection";
import TokenizerPlayground from "./transformer/sections/TokenizerPlayground";
import TokenLimitInfo from "./transformer/sections/TokenLimitInfo";
import StepInfo from "./transformer/sections/StepInfo";
import NextWordPredictions from "./transformer/sections/NextWordPredictions";
import { generateEmbeddings, generateLayerOutput, generateNextWordPredictions } from "./transformer/utils/transformerUtils";
import { encoderSteps, decoderSteps } from "./transformer/config/transformerSteps";
import type { EmbeddingVector, LayerOutput } from "./transformer/types";

const MAX_TOKENS = 2048; // Example token limit

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
  const [tokenizedOutput, setTokenizedOutput] = useState<{ text: string; id: number }[]>([]);
  const { toast } = useToast();
  const totalSteps = encoderSteps.length + decoderSteps.length;

  const handleTokenize = (tokens: { text: string; id: number }[]) => {
    setTokenizedOutput(tokens);
    
    // Check token limits
    if (tokens.length > MAX_TOKENS) {
      toast({
        title: "Token Limit Exceeded",
        description: "The input text exceeds the maximum token limit. Please reduce the length of your input.",
        variant: "destructive",
      });
    }
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

        // Generate next word predictions if we're in the decoder phase
        if (currentStep >= encoderSteps.length) {
          const predictions = generateNextWordPredictions(output);
          setNextWordProbabilities(predictions);
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
      
      // Show initial token values with detailed breakdown
      toast({
        title: "Token Processing Started",
        description: (
          <div className="space-y-2">
            <p className="font-medium">Input text tokenized into {newEmbeddings.length} tokens</p>
            <div className="text-sm text-muted-foreground">
              {newEmbeddings.map((embed, i) => (
                <div key={i} className="mt-1">
                  <span className="font-semibold">Token {i + 1}:</span> {embed.word}
                </div>
              ))}
            </div>
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

  return (
    <MathJaxContext>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              duration: 0.7,
              ease: "easeOut",
              staggerChildren: 0.2
            }
          }
        }}
        className="space-y-8"
      >
        <Card className="p-6 space-y-6 overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <VisualizationHeader title="Transformer Architecture Visualization" />
          
          <TokenLimitInfo
            currentTokenCount={tokenizedOutput.length}
            maxTokens={MAX_TOKENS}
          />
          
          <InputOutputSection
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
            handleProcess={handleProcess}
            isProcessing={isProcessing}
          />

          <TokenizerPlayground
            inputText={inputText}
            onTokenize={handleTokenize}
          />

          {embeddings.length > 0 && (
            <>
              <motion.div variants={{}} className="mb-6">
                <TokenProcessingSection
                  tokens={embeddings}
                  currentStep={currentStep}
                  tokenizedOutput={tokenizedOutput}
                />
              </motion.div>

              {currentStep > 0 && layerOutputs[currentStep - 1] && (
                <StepInfo
                  currentStep={currentStep - 1}
                  stepInfo={
                    currentStep <= encoderSteps.length
                      ? encoderSteps[currentStep - 1]
                      : decoderSteps[currentStep - encoderSteps.length - 1]
                  }
                  embeddings={embeddings}
                  output={layerOutputs[currentStep - 1]}
                />
              )}

              <NextWordPredictions predictions={nextWordProbabilities} />
            </>
          )}

          <motion.div variants={{}}>
            <ControlsSection
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              handleNextStep={handleNextStep}
              isProcessing={isProcessing}
              canProgress={currentStep < totalSteps - 1}
            />
          </motion.div>

          <motion.div 
            variants={{}}
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

          {nextWordProbabilities.length > 0 && (
            <PredictionsSection predictions={nextWordProbabilities} />
          )}
        </Card>
      </motion.div>
    </MathJaxContext>
  );
};

export default TransformerVisualization;
