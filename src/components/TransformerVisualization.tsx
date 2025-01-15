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

    const initialOutput = generateLayerOutput(newEmbeddings, 0);
    setLayerOutputs([initialOutput]);
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
          />
        </motion.div>

        <VisualizationContent
          currentStep={currentStep}
          embeddings={embeddings}
          attentionWeights={attentionWeights}
        />
      </Card>
    </motion.div>
  );
};

export default TransformerVisualization;