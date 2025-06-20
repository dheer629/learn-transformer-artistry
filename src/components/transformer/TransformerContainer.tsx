
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ControlsSection from "./sections/ControlsSection";
import LayersVisualization from "./sections/LayersVisualization";
import VisualizationHeader from "./sections/VisualizationHeader";
import InputOutputSection from "./sections/InputOutputSection";
import VisualizationContent from "./sections/VisualizationContent";
import ProcessingSection from "./sections/ProcessingSection";
import { useTransformerVisualization } from "./hooks/useTransformerVisualization";

const TransformerContainer = () => {
  const {
    inputText,
    setInputText,
    isProcessing,
    currentStep,
    isPaused,
    setIsPaused,
    learningRate,
    setLearningRate,
    embeddings,
    attentionWeights,
    layerOutputs,
    nextWordProbabilities,
    totalSteps,
    handleNextStep,
    handleProcess
  } = useTransformerVisualization();

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
          learningRate={learningRate}
          setLearningRate={setLearningRate}
          handleProcess={handleProcess}
          isProcessing={isProcessing}
        />

        <ProcessingSection
          embeddings={embeddings}
          currentStep={currentStep}
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

export default TransformerContainer;
