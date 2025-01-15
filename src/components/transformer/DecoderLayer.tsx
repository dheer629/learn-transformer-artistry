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

      {layerOutput && index + encoderStepsLength === currentStep && (
        <motion.div 
          className="mt-4 space-y-3 bg-green-50 p-3 rounded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
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