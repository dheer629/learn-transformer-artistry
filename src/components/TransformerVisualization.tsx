import React, { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import InputOutputSection from "./transformer/sections/InputOutputSection";
import TokenProcessingSection from "./transformer/sections/TokenProcessingSection";
import VisualizationContent from "./transformer/sections/VisualizationContent";
import ControlsSection from "./transformer/sections/ControlsSection";
import LayersVisualization from "./transformer/sections/LayersVisualization";
import TokenLimitInfo from "./transformer/sections/TokenLimitInfo";
import { encoderSteps, decoderSteps } from "./transformer/config/transformerSteps";
import type { EmbeddingVector, LayerOutput } from "./transformer/types";
import { 
  CHUNK_SIZE, 
  MAX_TOKENS, 
  COMPLETION_TOKENS,
  splitIntoChunks,
  validateTokenLimit,
  calculateTokenCount
} from "@/utils/textChunking";

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

  const processChunk = useCallback(async (chunk: string) => {
    // Simulate token processing for the chunk
    const tokens: EmbeddingVector[] = chunk.split(' ').map((word, index) => ({
      word,
      vector: Array(512).fill(0).map(() => Math.random()),
      positionalVector: Array(512).fill(0).map(() => Math.random()),
      contextualVector: Array(512).fill(0).map(() => Math.random())
    }));

    return tokens;
  }, []);

  const handleProcess = async () => {
    const validation = validateTokenLimit(inputText, {
      maxTokens: MAX_TOKENS,
      completionTokens: COMPLETION_TOKENS,
      chunkSize: CHUNK_SIZE
    });

    if (!validation.isValid) {
      console.error(`ERROR   api.chat  AI_APICallError: This model's maximum context length is ${MAX_TOKENS} tokens. However, you requested ${validation.totalTokens} tokens (${validation.tokenCount} in the messages, ${COMPLETION_TOKENS} in the completion).`);
      console.debug(`DEBUG   api.chat  Total message length: ${inputText.split(' ').length} words`);
      console.info(`INFO   stream-text  Sending llm call to Deepseek with model deepseek-chat`);
      
      toast({
        variant: "destructive",
        title: "Token limit exceeded",
        description: `Maximum context length (${MAX_TOKENS} tokens) exceeded. Please reduce input length.`
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Split text into manageable chunks
      const chunks = splitIntoChunks(inputText);
      let allTokens: EmbeddingVector[] = [];
      
      // Process each chunk
      for (const chunk of chunks) {
        const chunkTokens = await processChunk(chunk);
        allTokens = [...allTokens, ...chunkTokens];
      }

      setTokenizedOutput(allTokens);
      setLayerOutputs([]);
      setNextWordProbabilities([]);
      
      // Simulate processing steps
      for (let i = 0; i < encoderSteps.length + decoderSteps.length; i++) {
        setTimeout(() => {
          setCurrentStep(i);
          if (i < encoderSteps.length) {
            setLayerOutputs(prev => [...prev, {
              inputEmbeddings: allTokens,
              outputEmbeddings: allTokens,
              attentionWeights: Array(allTokens.length).fill(Array(allTokens.length).fill(0).map(() => Math.random())),
              intermediateOutputs: {
                queryVectors: [Array(512).fill(0).map(() => Math.random())],
                keyVectors: [Array(512).fill(0).map(() => Math.random())],
                valueVectors: [Array(512).fill(0).map(() => Math.random())],
                weightedSum: [Array(512).fill(0).map(() => Math.random())]
              }
            }]);
          } else {
            setNextWordProbabilities(prev => [...prev, { 
              word: `Word ${i - encoderSteps.length}`, 
              probability: Math.random() 
            }]);
          }
        }, i * 1000);
      }
    } catch (error) {
      console.error('Error processing text:', error);
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "An error occurred while processing the text. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < encoderSteps.length + decoderSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <TokenLimitInfo
        currentTokenCount={calculateTokenCount(inputText)}
        maxTokens={MAX_TOKENS}
        modelName="deepseek-chat"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
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
            <TokenProcessingSection
              tokens={tokenizedOutput}
              currentStep={currentStep}
            />
          )}
        </div>

        {isProcessing && (
          <div className="space-y-6">
            <VisualizationContent
              currentStep={currentStep}
              embeddings={tokenizedOutput}
              attentionWeights={layerOutputs[currentStep]?.attentionWeights || []}
              nextWordProbabilities={nextWordProbabilities}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TransformerVisualization;