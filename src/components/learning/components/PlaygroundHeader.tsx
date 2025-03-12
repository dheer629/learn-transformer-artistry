
import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HelpCircle, BookOpen } from "lucide-react";

interface PlaygroundHeaderProps {
  onHelpClick: () => void;
  onIntroClick: () => void;
}

export const PlaygroundHeader = ({ onHelpClick, onIntroClick }: PlaygroundHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-primary">
        Interactive Transformer Architecture
      </h2>
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={onHelpClick}
                className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
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
  );
};
