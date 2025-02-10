
import React from "react";
import NeuronComponent from "./NeuronComponent";
import ConnectionComponent from "./ConnectionComponent";

interface NetworkVisualizationProps {
  layers: {
    name: string;
    neurons: number;
    weights?: number[][];
  }[];
  currentStep: number;
  activeLayer: number;
  hoveredNeuron: { layer: number; neuron: number } | null;
  setHoveredNeuron: (value: { layer: number; neuron: number } | null) => void;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  layers,
  currentStep,
  activeLayer,
  hoveredNeuron,
  setHoveredNeuron,
}) => {
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

  const renderNeurons = (layer: typeof layers[0], layerIndex: number) => (
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
  );
};

export default React.memo(NetworkVisualization);
