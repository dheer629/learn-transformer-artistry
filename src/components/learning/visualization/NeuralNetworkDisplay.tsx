import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Layer {
  name: string;
  neurons: number;
  weights?: number[][];
}

interface NeuralNetworkDisplayProps {
  layers: Layer[];
  currentStep: number;
  onLayerSelect: (layerIndex: number) => void;
}

const NeuralNetworkDisplay: React.FC<NeuralNetworkDisplayProps> = ({
  layers,
  currentStep,
  onLayerSelect
}) => {
  const [hoveredNeuron, setHoveredNeuron] = useState<{layer: number, neuron: number} | null>(null);
  const maxNeurons = Math.max(...layers.map(l => l.neurons));
  
  const getWeightColor = (weight: number) => {
    const normalizedWeight = (weight + 1) / 2; // Convert -1 to 1 range to 0 to 1
    return `rgba(59, 130, 246, ${normalizedWeight})`; // Blue with opacity based on weight
  };

  const renderConnections = (fromLayer: number, toLayer: number) => {
    if (!layers[fromLayer].weights) return null;

    return layers[fromLayer].weights?.map((weights, fromNeuron) => 
      weights.map((weight, toNeuron) => (
        <motion.line
          key={`${fromLayer}-${fromNeuron}-${toNeuron}`}
          x1={100 + fromLayer * 150}
          y1={50 + (fromNeuron * 400) / maxNeurons}
          x2={100 + (fromLayer + 1) * 150}
          y2={50 + (toNeuron * 400) / maxNeurons}
          stroke={getWeightColor(weight)}
          strokeWidth={Math.abs(weight) * 2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1 }}
        />
      ))
    );
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Neural Network Visualization</h3>
        <Select onValueChange={(value) => onLayerSelect(parseInt(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select layer" />
          </SelectTrigger>
          <SelectContent>
            {layers.map((layer, idx) => (
              <SelectItem key={idx} value={idx.toString()}>
                {layer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full h-[500px] overflow-x-auto">
        <svg width={100 + layers.length * 150} height="500">
          {/* Render connections between layers */}
          {layers.map((_, idx) => 
            idx < layers.length - 1 && renderConnections(idx, idx + 1)
          )}

          {/* Render neurons */}
          {layers.map((layer, layerIdx) => (
            <g key={layerIdx}>
              {Array.from({ length: layer.neurons }).map((_, neuronIdx) => (
                <TooltipProvider key={`${layerIdx}-${neuronIdx}`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <motion.circle
                        cx={100 + layerIdx * 150}
                        cy={50 + (neuronIdx * 400) / maxNeurons}
                        r={12}
                        fill={layerIdx === currentStep ? "#3b82f6" : "#94a3b8"}
                        onMouseEnter={() => setHoveredNeuron({ layer: layerIdx, neuron: neuronIdx })}
                        onMouseLeave={() => setHoveredNeuron(null)}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: layerIdx * 0.1 }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="p-2">
                        <p className="font-semibold">{layer.name}</p>
                        <p className="text-sm">Neuron {neuronIdx + 1}</p>
                        {layer.weights && hoveredNeuron?.layer === layerIdx && (
                          <div className="mt-2">
                            <p className="text-xs font-medium">Weights:</p>
                            {layer.weights[neuronIdx].map((w, i) => (
                              <p key={i} className="text-xs">{`Output ${i + 1}: ${w.toFixed(3)}`}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Hover over neurons to see weight values. Line thickness and color intensity represent weight magnitude.</p>
      </div>
    </Card>
  );
};

export default NeuralNetworkDisplay;