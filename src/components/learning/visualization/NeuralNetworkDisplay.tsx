
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NeuronComponent from "./neural-network/NeuronComponent";
import ConnectionComponent from "./neural-network/ConnectionComponent";
import LayerInfo from "./neural-network/LayerInfo";

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
          <ConnectionComponent
            key={`${fromLayer}-${fromNeuron}-${toNeuron}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            weight={weight}
            opacity={getConnectionOpacity(fromLayer, toLayer, weight)}
          />
        );
      })
    );
  };

  const renderNeurons = (layer: Layer, layerIndex: number) => (
    <g key={layerIndex}>
      {Array.from({ length: layer.neurons }).map((_, neuronIdx) => (
        <NeuronComponent
          key={`${layerIndex}-${neuronIdx}`}
          x={100 + layerIndex * 180}
          y={50 + (neuronIdx * 400) / layer.neurons}
          r={12}
          fill={getLayerColor(layerIndex)}
          neuronIndex={neuronIdx}
          layerName={layer.name}
          weights={layer.weights?.[neuronIdx]}
          onMouseEnter={() => setHoveredNeuron({ layer: layerIndex, neuron: neuronIdx })}
          onMouseLeave={() => setHoveredNeuron(null)}
        />
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

          {layers?.map((_, idx) => 
            idx < (layers?.length || 0) - 1 && renderConnections(idx, idx + 1)
          )}

          {layers?.map((layer, idx) => renderNeurons(layer, idx))}

          {layers?.map((layer, idx) => (
            <text
              key={`label-${idx}`}
              x={100 + idx * 180}
              y={20}
              textAnchor="middle"
              className="font-medium text-sm"
            >
              {layer.name}
            </text>
          ))}
        </svg>
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
