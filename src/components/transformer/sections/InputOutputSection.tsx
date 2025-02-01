import React from "react";
import { motion } from "framer-motion";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";

interface InputOutputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputText?: string; // Made optional
  learningRate: number;
  setLearningRate: (rate: number) => void;
  handleProcess: () => void;
  isProcessing: boolean;
}

const InputOutputSection: React.FC<InputOutputSectionProps> = ({
  inputText,
  setInputText,
  outputText = "", // Default value
  learningRate,
  setLearningRate,
  handleProcess,
  isProcessing
}) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={containerVariants}>
        <InputSection
          inputText={inputText}
          setInputText={setInputText}
          learningRate={learningRate}
          setLearningRate={setLearningRate}
          handleProcess={handleProcess}
          isProcessing={isProcessing}
        />
      </motion.div>
      
      <motion.div variants={containerVariants}>
        <OutputSection outputText={outputText} />
      </motion.div>
    </motion.div>
  );
};

export default InputOutputSection;