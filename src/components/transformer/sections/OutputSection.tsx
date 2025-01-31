import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OutputSectionProps {
  outputText: string;
  isProcessingComplete?: boolean;
}

const OutputSection: React.FC<OutputSectionProps> = ({ outputText, isProcessingComplete = false }) => {
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

  return (
    <motion.div
      variants={dataFlowAnimation}
      initial="initial"
      animate="animate"
      className="space-y-4"
    >
      <label className="block text-sm font-medium mb-2">Processed Output</label>
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50">
        {outputText ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 ${isProcessingComplete ? 'bg-green-500' : 'bg-yellow-500'} rounded-full ${isProcessingComplete ? 'animate-none' : 'animate-pulse'}`} />
                  <span className="text-lg font-medium text-gray-800">{outputText}</span>
                  {isProcessingComplete && (
                    <span className="text-sm text-green-600 ml-2">(Processing complete)</span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isProcessingComplete ? 'Final processed output' : 'Processing in progress...'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <span>Ready to process input...</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default OutputSection;