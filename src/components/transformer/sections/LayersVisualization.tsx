import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EncoderLayer from "../EncoderLayer";
import DecoderLayer from "../DecoderLayer";
import { encoderSteps, decoderSteps } from "../config/transformerSteps";
import type { LayerOutput } from "../types";

interface LayersVisualizationProps {
  currentStep: number;
  layerOutputs: LayerOutput[];
}

const LayersVisualization: React.FC<LayersVisualizationProps> = ({
  currentStep,
  layerOutputs,
}) => {
  const dataFlowAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
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
    <motion.div 
      className="space-y-8"
      variants={dataFlowAnimation}
      initial="initial"
      animate="animate"
    >
      <motion.div 
        className="bg-blue-50 p-4 rounded-lg"
        variants={flowAnimation}
      >
        <h3 className="text-lg font-semibold mb-4">Encoder Layers</h3>
        <div className="space-y-4">
          {encoderSteps.map((step, index) => (
            <EncoderLayer
              key={`encoder-${index}`}
              step={step}
              index={index}
              currentStep={currentStep}
              layerOutput={layerOutputs[index]}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="bg-green-50 p-4 rounded-lg"
        variants={flowAnimation}
      >
        <h3 className="text-lg font-semibold mb-4">Decoder Layers</h3>
        <div className="space-y-4">
          {decoderSteps.map((step, index) => (
            <DecoderLayer
              key={`decoder-${index}`}
              step={step}
              index={index}
              currentStep={currentStep}
              encoderStepsLength={encoderSteps.length}
              layerOutput={layerOutputs[index + encoderSteps.length]}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LayersVisualization;