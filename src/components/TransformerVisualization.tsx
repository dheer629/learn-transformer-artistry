import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { MathJaxContext } from "better-react-mathjax";
import ControlsSection from "./transformer/sections/ControlsSection";
import LayersVisualization from "./transformer/sections/LayersVisualization";
import TokenVisualization from "./transformer/TokenVisualization";
import TokenLimitInfo from "./transformer/sections/TokenLimitInfo";
import InputOutputSection from "./transformer/sections/InputOutputSection";
import { encoderSteps, decoderSteps } from "./transformer/config/transformerSteps";
import type { EmbeddingVector, LayerOutput } from "./transformer/types";

const MAX_TOKENS = 65536; // Deepseek's maximum context length
const COMPLETION_TOKENS = 8000; // Default completion tokens

const TransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenizedOutput, setTokenizedOutput] = useState<EmbeddingVector[]>([]);
  const [layerOutputs, setLayerOutputs] = useState<LayerOutput[]>([]);
  const [nextWordProbabilities, setNextWordProbabilities] = useState<Array<{ word: string; probability: number }>>([]);
  const [learningRate, setLearningRate] = useState(0.001);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const handleProcess = () => {
    if (!inputText) return;

    setIsProcessing(true);
    const tokens = inputText.split(" ").map((word, index) => ({
      word,
      vector: Array(512).fill(0).map(() => Math.random()),
      positionalVector: Array(512).fill(0).map(() => Math.random()),
      contextualVector: Array(512).fill(0).map(() => Math.random()),
    }));

    // Check token limits
    if (tokens.length > MAX_TOKENS) {
      const totalRequestedTokens = tokens.length + COMPLETION_TOKENS;
      console.debug(`Total message length: ${tokens.length}, words`);
      console.info("Sending llm call to Deepseek with model deepseek-chat");
      toast({
        title: "Token Limit Exceeded",
        description: `AI_APICallError: This model's maximum context length is ${MAX_TOKENS} tokens. However, you requested ${totalRequestedTokens} tokens (${tokens.length} in the messages, ${COMPLETION_TOKENS} in the completion). Please reduce the length of the messages or completion.`,
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    // Processing logic
    setTokenizedOutput(tokens);
    setLayerOutputs([]); // Reset layer outputs
    setNextWordProbabilities([]); // Reset next word probabilities
    
    // Simulate processing steps
    for (let i = 0; i < encoderSteps.length + decoderSteps.length; i++) {
      setTimeout(() => {
        setCurrentStep(i);
        // Simulate layer outputs and next word probabilities
        if (i < encoderSteps.length) {
          setLayerOutputs(prev => [...prev, {
            inputEmbeddings: tokens,
            outputEmbeddings: tokens,
            attentionWeights: Array(tokens.length).fill(Array(tokens.length).fill(0).map(() => Math.random())),
            intermediateOutputs: {
              queryVectors: [Array(512).fill(0).map(() => Math.random())],
              keyVectors: [Array(512).fill(0).map(() => Math.random())],
              valueVectors: [Array(512).fill(0).map(() => Math.random())],
              weightedSum: [Array(512).fill(0).map(() => Math.random())]
            }
          }]);
        } else {
          setNextWordProbabilities(prev => [...prev, { word: `Word ${i - encoderSteps.length}`, probability: Math.random() }]);
        }
      }, i * 1000); // Simulate processing delay
    }
    setIsProcessing(false);
  };

  const handleNextStep = () => {
    if (currentStep < encoderSteps.length + decoderSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <MathJaxContext>
      <div className="container mx-auto p-4 space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Transformer Architecture Visualization</h2>
          
          <TokenLimitInfo
            currentTokenCount={tokenizedOutput.length}
            maxTokens={MAX_TOKENS}
            modelName="deepseek-chat"
          />
          
          <InputOutputSection
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            handleProcess={handleProcess}
            isProcessing={isProcessing}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
          />
          
          {tokenizedOutput.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <TokenVisualization
                tokens={tokenizedOutput}
                currentStep={currentStep}
              />
              
              <ControlsSection
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                handleNextStep={handleNextStep}
                isProcessing={isProcessing}
                canProgress={currentStep < encoderSteps.length + decoderSteps.length - 1}
              />
              
              <LayersVisualization
                currentStep={currentStep}
                layerOutputs={layerOutputs}
                nextWordProbabilities={nextWordProbabilities}
              />
            </motion.div>
          )}
        </Card>
      </div>
    </MathJaxContext>
  );
};

export default TransformerVisualization;