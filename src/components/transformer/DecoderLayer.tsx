import React from "react";
import { motion } from "framer-motion";
import { LayerStep } from "./types";

interface DecoderLayerProps {
  step: LayerStep;
  index: number;
  currentStep: number;
  encoderStepsLength: number;
}

const DecoderLayer: React.FC<DecoderLayerProps> = ({ 
  step, 
  index, 
  currentStep, 
  encoderStepsLength 
}) => {
  return (
    <motion.div
      className={`p-4 rounded-lg ${
        index + encoderStepsLength === currentStep ? 'bg-green-100 shadow-lg' : 'bg-white'
      }`}
      animate={{
        scale: index + encoderStepsLength === currentStep ? 1.02 : 1,
        opacity: index + encoderStepsLength <= currentStep ? 1 : 0.5
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{step.title}</h4>
          <p className="text-sm text-gray-600">{step.description}</p>
        </div>
        <div className="bg-green-200 px-3 py-1 rounded text-sm font-mono">
          {step.formula}
        </div>
      </div>
      <ul className="mt-2 space-y-1">
        {step.details.map((detail, i) => (
          <li key={i} className="text-sm text-gray-600">
            {detail}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default DecoderLayer;