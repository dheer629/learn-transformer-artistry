import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

  const getLayerColor = (layerIndex: number) => {
    if (layerIndex === currentStep) return "rgb(59, 130, 246)";
    if (layerIndex < currentStep) return "rgb(147, 197, 253)";
    return "rgb(203, 213, 225)";
  };

  const getConnectionOpacity = (fromLayer: number, toLayer: number, weight: number) => {
    if (fromLayer !== activeLayer) return 0.1;
    return Math.abs(weight);
  };

  const renderConnections = (fromLayer: number, toLayer: number) => {
    if (!layers?.[fromLayer]?.weights) return null;

    return layers[fromLayer].weights?.map((weights, fromNeuron) => 
      weights.map((weight, toNeuron) => {
        const x1 = 100 + fromLayer * 180;
        const y1 = 50 + (fromNeuron * 400) / layers[fromLayer].neurons;
        const x2 = 100 + (fromLayer + 1) * 180;
        const y2 = 50 + (toNeuron * 400) / layers[toLayer].neurons;

        return (
          <motion.path
            key={`${fromLayer}-${fromNeuron}-${toNeuron}`}
            d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
            stroke={weight > 0 ? "#60a5fa" : "#f87171"}
            strokeWidth={Math.abs(weight) * 3}
            fill="none"
            opacity={getConnectionOpacity(fromLayer, toLayer, weight)}
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: getConnectionOpacity(fromLayer, toLayer, weight)
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        );
      })
    );
  };

  const renderNeurons = (layer: Layer, layerIndex: number) => (
    <g key={layerIndex}>
      {Array.from({ length: layer.neurons }).map((_, neuronIdx) => (
        <TooltipProvider key={`${layerIndex}-${neuronIdx}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.g
                onMouseEnter={() => setHoveredNeuron({ layer: layerIndex, neuron: neuronIdx })}
                onMouseLeave={() => setHoveredNeuron(null)}
                whileHover={{ scale: 1.2 }}
              >
                <motion.circle
                  cx={100 + layerIndex * 180}
                  cy={50 + (neuronIdx * 400) / layer.neurons}
                  r={12}
                  fill={getLayerColor(layerIndex)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: layerIndex * 0.1 }}
                />
                <motion.text
                  x={100 + layerIndex * 180}
                  y={50 + (neuronIdx * 400) / layer.neurons}
                  textAnchor="middle"
                  dy=".3em"
                  fill="white"
                  fontSize="10"
                >
                  {neuronIdx + 1}
                </motion.text>
              </motion.g>
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2 space-y-2">
                <p className="font-semibold">{layer.name}</p>
                <p className="text-sm">Neuron {neuronIdx + 1}</p>
                {layer.weights && hoveredNeuron?.layer === layerIndex && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium">Connection Weights:</p>
                    {layer.weights[neuronIdx]?.map((w, i) => (
                      <p key={i} className="text-xs">
                        To {i + 1}: {w.toFixed(3)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </g>
  );

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
        <svg width={100 + (layers?.length || 0) * 180} height="500">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
            </marker>
          </defs>

          {/* Layer connections */}
          {layers?.map((_, idx) => 
            idx < (layers?.length || 0) - 1 && renderConnections(idx, idx + 1)
          )}

          {/* Neurons */}
          {layers?.map((layer, idx) => renderNeurons(layer, idx))}

          {/* Layer labels */}
          {layers?.map((layer, idx) => (
            <motion.text
              key={`label-${idx}`}
              x={100 + idx * 180}
              y={20}
              textAnchor="middle"
              className="font-medium text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {layer.name}
            </motion.text>
          ))}
        </svg>
      </div>

      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-sm">Layer Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium">Current Layer:</p>
            <p className="text-sm">{layers[currentStep]?.name}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium">Neurons:</p>
            <p className="text-sm">{layers[currentStep]?.neurons}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>• Hover over neurons to see connection weights</p>
        <p>• Blue connections indicate positive weights, red indicate negative weights</p>
        <p>• Connection thickness represents weight magnitude</p>
      </div>
    </Card>
  );
};

export default NeuralNetworkDisplay;