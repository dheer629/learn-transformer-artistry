
import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HelpCircle, BookOpen, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlaygroundHeaderProps {
  onHelpClick: () => void;
  onIntroClick: () => void;
  currentStep: number;
  totalSteps: number;
}

export const PlaygroundHeader = ({ onHelpClick, onIntroClick, currentStep, totalSteps }: PlaygroundHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Interactive Transformer Architecture
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore how transformers process text step-by-step
          </p>
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={onHelpClick}
                  className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                  aria-label="How to use playground"
                >
                  <HelpCircle size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>How to use this playground</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={onIntroClick}
                  className="p-2 rounded-full bg-purple-50 text-purple-500 hover:bg-purple-100 transition-colors"
                  aria-label="Learn about transformers"
                >
                  <BookOpen size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Learn about transformers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {currentStep > 0 && (
        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-md">
          <Info size={16} className="text-blue-500" />
          <div className="text-sm">
            <span className="font-medium">Currently at step {currentStep}/{totalSteps}: </span>
            <span className="text-blue-700">
              {currentStep === 0 ? "Tokenizing input" : 
               currentStep < totalSteps / 2 ? "Processing in encoder" : "Generating output in decoder"}
            </span>
          </div>
          <Badge variant="outline" className="ml-auto">
            Step {currentStep}/{totalSteps}
          </Badge>
        </div>
      )}
    </div>
  );
};
