
import React from "react";

export const IntroDialogContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg">
        This interactive playground helps you understand the revolutionary Transformer architecture 
        that powers modern AI models like GPT and BERT.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 mb-3">What You'll Learn</h4>
          <ul className="list-disc pl-5 text-sm space-y-2 text-blue-600">
            <li>How transformers process text input</li>
            <li>Self-attention mechanism visualization</li>
            <li>Multi-head attention patterns</li>
            <li>Layer-by-layer transformation</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 mb-3">Key Features</h4>
          <ul className="list-disc pl-5 text-sm space-y-2 text-purple-600">
            <li>Interactive visualization controls</li>
            <li>Real-time attention pattern display</li>
            <li>Step-by-step process breakdown</li>
            <li>Multiple visualization perspectives</li>
          </ul>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold text-green-700 mb-3">Getting Started</h4>
        <ol className="list-decimal pl-5 text-sm space-y-2 text-green-600">
          <li>Enter some text in the input box or use an example</li>
          <li>Use the play/pause controls to start the visualization</li>
          <li>Switch between different views to explore various aspects</li>
          <li>Hover over elements to see detailed information</li>
        </ol>
      </div>
    </div>
  );
};
