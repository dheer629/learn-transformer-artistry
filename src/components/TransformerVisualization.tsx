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

    const initialOutput = generateLayerOutput(newEmbeddings, 0);
    setLayerOutputs([initialOutput]);
  };

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const flowAnimation = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
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
      <Card className="p-6 space-y-6 overflow-hidden">
        <motion.h2 
          className="text-2xl font-bold text-primary mb-4"
          variants={itemAnimation}
        >
          Transformer Architecture Visualization
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemAnimation}
        >
          <InputSection
            inputText={inputText}
            setInputText={setInputText}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
            handleProcess={handleProcess}
            isProcessing={isProcessing}
          />
          
          <OutputSection outputText={outputText} />
        </motion.div>

        <motion.div 
          variants={itemAnimation}
          className="relative"
        >
          <ControlsSection
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            handleNextStep={handleNextStep}
            isProcessing={isProcessing}
            canProgress={currentStep < totalSteps - 1}
          />
        </motion.div>

        <motion.div 
          variants={itemAnimation}
          className="relative"
        >
          <LayersVisualization
            currentStep={currentStep}
            layerOutputs={layerOutputs}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={flowAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <EmbeddingsVisualization 
              embeddings={embeddings}
              currentStep={currentStep}
            />
            <AttentionVisualization 
              attentionWeights={attentionWeights}
              currentStep={currentStep}
            />
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default TransformerVisualization;