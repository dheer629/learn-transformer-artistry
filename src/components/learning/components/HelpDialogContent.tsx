
import React from "react";

export const HelpDialogContent = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">How to Use the Transformer Playground</h3>
      
      <div className="space-y-4">
        <section className="space-y-2">
          <h4 className="font-medium text-primary">1. Getting Started</h4>
          <p className="text-sm">Enter any text in the input box or choose from example phrases. The transformer will process this text through its architecture.</p>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">2. Visualization Controls</h4>
          <ul className="text-sm space-y-1.5">
            <li>• <span className="font-medium">Play/Pause:</span> Start or stop the automatic visualization</li>
            <li>• <span className="font-medium">Step:</span> Move through the process one step at a time</li>
            <li>• <span className="font-medium">Reset:</span> Return to the beginning of the visualization</li>
            <li>• <span className="font-medium">Speed:</span> Adjust how fast the visualization runs</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">3. Different Views</h4>
          <ul className="text-sm space-y-1.5">
            <li>• <span className="font-medium">Network View:</span> Shows the entire neural network architecture and how information flows between layers</li>
            <li>• <span className="font-medium">Layer View:</span> Detailed view of each transformer layer's internal processing</li>
            <li>• <span className="font-medium">Attention View:</span> Visualizes how the model pays attention to different parts of the input</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">4. Understanding the Process</h4>
          <ul className="text-sm space-y-1.5">
            <li>• <span className="font-medium">Input Tokens:</span> Your text is split into tokens (shown in blue)</li>
            <li>• <span className="font-medium">Processing:</span> Watch how each token is processed through the layers</li>
            <li>• <span className="font-medium">Attention Patterns:</span> Yellow lines show how different parts of the input relate to each other</li>
            <li>• <span className="font-medium">Output:</span> See how the model generates the final output (shown in green)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">5. Interactive Features</h4>
          <ul className="text-sm space-y-1.5">
            <li>• Hover over neurons to see their connections</li>
            <li>• Click on layers to view detailed information</li>
            <li>• Use the progress bar to track the current step</li>
            <li>• Save interesting visualizations for later reference</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
