import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import InputSection from "./transformer/sections/InputSection";
import OutputSection from "./transformer/sections/OutputSection";
import ControlsSection from "./transformer/sections/ControlsSection";
import LayersVisualization from "./transformer/sections/LayersVisualization";
import EmbeddingsVisualization from "./transformer/EmbeddingsVisualization";
import AttentionVisualization from "./transformer/AttentionVisualization";
import { generateEmbeddings, generateLayerOutput } from "./transformer/utils/transformerUtils";
import { encoderSteps, decoderSteps } from "./transformer/config/transformerSteps";
import type { EmbeddingVector, LayerOutput } from "./transformer/types";

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
  const totalSteps = encoderSteps.length + decoderSteps.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      const output = generateLayerOutput(embeddings, currentStep + 1);
      setLayerOutputs(prev => [...prev, output]);
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalSteps - 1) {
      setOutputText("¡Hola! (Example translation)");
      setIsProcessing(false);
    }
  };

  const handleProcess = () => {
    if (!inputText) return;
    
    setIsProcessing(true);
    setCurrentStep(0);
    setOutputText("");
    setLayerOutputs([]);
    
    const newEmbeddings = generateEmbeddings(inputText);
    setEmbeddings(newEmbeddings);
    
    const weights = Array(newEmbeddings.length).fill(0).map(() => 
      Array(newEmbeddings.length).fill(0).map(() => 
        Number((Math.random()).toFixed(2))
      )
    );
    setAttentionWeights(weights);

    // Generate first layer output
    const initialOutput = generateLayerOutput(newEmbeddings, 0);
    setLayerOutputs([initialOutput]);
  };

  const flowAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <motion.h2 
        className="text-2xl font-bold text-primary mb-4 animate-fade-in"
        initial="hidden"
        animate="visible"
        variants={flowAnimation}
      >
        Transformer Architecture Visualization
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputSection
          inputText={inputText}
          setInputText={setInputText}
          learningRate={learningRate}
          setLearningRate={setLearningRate}
          handleProcess={handleProcess}
          isProcessing={isProcessing}
        />
        
        <OutputSection outputText={outputText} />
      </div>

      <ControlsSection
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        handleNextStep={handleNextStep}
        isProcessing={isProcessing}
        canProgress={currentStep < totalSteps - 1}
      />

      <LayersVisualization
        currentStep={currentStep}
        layerOutputs={layerOutputs}
      />

      <AnimatePresence>
        <EmbeddingsVisualization 
          embeddings={embeddings}
          currentStep={currentStep}
        />
        <AttentionVisualization 
          attentionWeights={attentionWeights}
          currentStep={currentStep}
        />
      </AnimatePresence>
    </Card>
  );
};

export default TransformerVisualization;