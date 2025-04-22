
import React from 'react';
import { Info } from 'lucide-react';
import { useVisualization } from '../state/VisualizationContext';
import { Badge } from '@/components/ui/badge';
import { PlaygroundHeader } from '../../components/PlaygroundHeader';
import { ProcessingExplanation } from '../../components/ProcessingExplanation';

export const HeaderSection: React.FC<{
  onHelpClick: () => void;
  onIntroClick: () => void;
}> = ({ onHelpClick, onIntroClick }) => {
  const {
    currentStep,
    layers,
    activeProcessingStep,
    inputTokens,
    outputTokens,
    isProcessingComplete,
    hints
  } = useVisualization();

  return (
    <div className="space-y-4">
      <PlaygroundHeader 
        onHelpClick={onHelpClick}
        onIntroClick={onIntroClick}
        currentStep={currentStep}
        totalSteps={layers?.length || 0}
      />
      
      <p className="text-gray-600">
        Explore and understand the Transformer architecture through this interactive visualization.
        Watch how tokens flow through different layers with actual attention patterns.
      </p>
      
      <ProcessingExplanation
        currentStep={currentStep}
        activeProcessingStep={activeProcessingStep}
        inputTokens={inputTokens}
        outputTokens={outputTokens}
        isProcessingComplete={isProcessingComplete}
      />
      
      {hints.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start space-x-3">
          <Info className="text-amber-500 h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800 text-sm">Tips</p>
            <ul className="list-disc pl-5 text-sm text-amber-700 mt-1">
              {hints.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {activeProcessingStep && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
            Current: {activeProcessingStep}
          </Badge>
          {isProcessingComplete && (
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
              Processing complete
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
