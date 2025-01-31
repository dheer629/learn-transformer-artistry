import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OutputSectionProps {
  outputText: string;
  isProcessingComplete?: boolean;
  currentStep?: number;
  totalSteps?: number;
  intermediateOutput?: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ 
  outputText, 
  isProcessingComplete = false,
  currentStep = 0,
  totalSteps = 0,
  intermediateOutput = ""
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

  const getStepOutput = () => {
    if (!outputText && !intermediateOutput) return "Ready to process input...";
    if (isProcessingComplete) return outputText;
    if (intermediateOutput) {
      return `Step ${currentStep}/${totalSteps}: ${intermediateOutput}`;
    }
    return outputText;
  };

  const getStatusColor = () => {
    if (!outputText && !intermediateOutput) return "bg-gray-400";
    if (isProcessingComplete) return "bg-green-500";
    return "bg-yellow-500";
  };

  return (
    <motion.div
      variants={dataFlowAnimation}
      initial="initial"
      animate="animate"
      className="space-y-4"
    >
      <label className="block text-sm font-medium mb-2">Processed Output</label>
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full text-left">
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-2 h-2 ${getStatusColor()} rounded-full ${
                    !isProcessingComplete && (outputText || intermediateOutput) ? 'animate-pulse' : 'animate-none'
                  }`} 
                />
                <span className="text-lg font-medium text-gray-800">
                  {getStepOutput()}
                </span>
                {isProcessingComplete && (
                  <span className="text-sm text-green-600 ml-2">(Processing complete)</span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {!outputText && !intermediateOutput && "Waiting for input..."}
                {intermediateOutput && !isProcessingComplete && `Processing step ${currentStep} of ${totalSteps}`}
                {isProcessingComplete && "Final processed output"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Card>
    </motion.div>
  );
};

export default OutputSection;