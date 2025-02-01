import React from "react";
import { Card } from "@/components/ui/card";

interface StatusPanelProps {
  speed: number;
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  selectedLayer: any;
}

const StatusPanel: React.FC<StatusPanelProps> = ({
  speed,
  currentStep,
  totalSteps,
  isPlaying,
  selectedLayer,
}) => {
  return (
    <Card className="p-4 bg-blue-50">
      <h3 className="font-semibold mb-3">Current Status</h3>
      <div className="space-y-2 text-sm">
        <p>Speed: {speed}x</p>
        <p>Current Step: {currentStep + 1}/{totalSteps}</p>
        <p>Status: {isPlaying ? "Playing" : "Paused"}</p>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Layer Information:</h4>
          {selectedLayer && (
            <div className="bg-white p-2 rounded text-xs font-mono">
              <p>Layer: {selectedLayer.name}</p>
              <p>Neurons: {selectedLayer.neurons}</p>
              {selectedLayer.weights && (
                <p>Weights Shape: [{selectedLayer.weights.length}, {selectedLayer.weights[0]?.length}]</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatusPanel;