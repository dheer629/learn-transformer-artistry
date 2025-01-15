import React from "react";
import { motion } from "framer-motion";
import { LayerStep, LayerOutput } from "./types";

interface DecoderLayerProps {
  step: LayerStep;
  index: number;
  currentStep: number;
  encoderStepsLength: number;
  layerOutput?: LayerOutput;
}

const DecoderLayer: React.FC<DecoderLayerProps> = ({ 
  step, 
  index, 
  currentStep, 
  encoderStepsLength,
  layerOutput
}) => {
  const layerAnimation = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1
      }
    }
  };

  const contentAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={layerAnimation}
      initial="hidden"
      animate="visible"
      className={`p-4 rounded-lg ${
        index + encoderStepsLength === currentStep ? 'bg-green-100 shadow-lg' : 'bg-white'
      }`}
      style={{
        scale: index + encoderStepsLength === currentStep ? 1.02 : 1,
        opacity: index + encoderStepsLength <= currentStep ? 1 : 0.5,
        transition: "all 0.3s ease-out"
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{step.title}</h4>
          <p className="text-sm text-gray-600">{step.description}</p>
        </div>
        <motion.div 
          className="bg-green-200 px-3 py-1 rounded text-sm font-mono"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {step.formula}
        </motion.div>
      </div>

      {index + encoderStepsLength === currentStep && (
        <motion.div
          variants={contentAnimation}
          initial="hidden"
          animate="visible"
          className="mt-4 bg-green-50 p-4 rounded-lg space-y-4"
        >
          <div>
            <h5 className="font-medium text-lg">{step.explanation.title}</h5>
            <p className="text-gray-700 mt-2">{step.explanation.simpleExplanation}</p>
            <p className="text-gray-600 mt-2">{step.explanation.vectorExplanation}</p>
            <p className="text-gray-600 mt-2 italic">{step.explanation.example}</p>
          </div>
        </motion.div>
      )}

      <motion.ul 
        className="mt-2 space-y-1"
        variants={contentAnimation}
      >
        {step.details.map((detail, i) => (
          <motion.li 
            key={i} 
            className="text-sm text-gray-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {detail}
          </motion.li>
        ))}
      </motion.ul>

      {layerOutput && index + encoderStepsLength === currentStep && (
        <motion.div 
          className="mt-4 space-y-3 bg-green-50 p-3 rounded"
          variants={contentAnimation}
          initial="hidden"
          animate="visible"
        >
          {layerOutput.intermediateOutputs?.queryVectors && (
            <div className="text-sm">
              <div className="font-medium text-green-700">Query Vectors:</div>
              <div className="font-mono text-xs overflow-x-auto">
                {layerOutput.intermediateOutputs.queryVectors.map((vec, i) => (
                  <div key={i}>
                    [{vec.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {layerOutput.intermediateOutputs?.keyVectors && (
            <div className="text-sm">
              <div className="font-medium text-green-700">Key Vectors:</div>
              <div className="font-mono text-xs overflow-x-auto">
                {layerOutput.intermediateOutputs.keyVectors.map((vec, i) => (
                  <div key={i}>
                    [{vec.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {layerOutput.intermediateOutputs?.valueVectors && (
            <div className="text-sm">
              <div className="font-medium text-green-700">Value Vectors:</div>
              <div className="font-mono text-xs overflow-x-auto">
                {layerOutput.intermediateOutputs.valueVectors.map((vec, i) => (
                  <div key={i}>
                    [{vec.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {layerOutput.intermediateOutputs?.weightedSum && (
            <div className="text-sm">
              <div className="font-medium text-green-700">Weighted Sum:</div>
              <div className="font-mono text-xs overflow-x-auto">
                {layerOutput.intermediateOutputs.weightedSum.map((vec, i) => (
                  <div key={i}>
                    [{vec.map(v => v.toFixed(3)).join(", ")}]
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DecoderLayer;
