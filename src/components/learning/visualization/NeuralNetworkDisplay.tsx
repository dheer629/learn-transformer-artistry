
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LayerInfo from "./neural-network/LayerInfo";
import NetworkVisualization from "./neural-network/NetworkVisualization";

interface Layer {
  name: string;
  neurons: number;
  weights?: number[][];
}

interface NeuralNetworkDisplayProps {
  layers: Layer[];
  currentStep: number;
  onLayerSelect: (layerIndex: number) => void;
  inputTokens?: string[];
  outputTokens?: string[];
  attentionWeights: number[][];
}

const NeuralNetworkDisplay: React.FC<NeuralNetworkDisplayProps> = ({
  layers,
  currentStep,
  onLayerSelect,
  inputTokens = [],
  outputTokens = [],
  attentionWeights
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(currentStep);
  const [hoveredNeuron, setHoveredNeuron] = useState<{layer: number, neuron: number} | null>(null);
  
  useEffect(() => {
    setActiveLayer(currentStep);
  }, [currentStep]);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Neural Network Architecture</h3>
        <Select onValueChange={(value) => onLayerSelect(parseInt(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select layer" />
          </SelectTrigger>
          <SelectContent>
            {layers?.map((layer, idx) => (
              <SelectItem key={idx} value={idx.toString()}>
                {layer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full h-[500px] overflow-x-auto">
        <NetworkVisualization
          layers={layers}
          currentStep={currentStep}
          activeLayer={activeLayer}
          hoveredNeuron={hoveredNeuron}
          setHoveredNeuron={setHoveredNeuron}
        />
      </div>

      <LayerInfo currentLayer={layers[currentStep]} />

      <div className="mt-4 text-sm text-gray-500">
        <p>• Hover over neurons to see connection weights</p>
        <p>• Blue connections indicate positive weights, red indicate negative weights</p>
        <p>• Connection thickness represents weight magnitude</p>
      </div>
    </Card>
  );
};

export default React.memo(NeuralNetworkDisplay);
