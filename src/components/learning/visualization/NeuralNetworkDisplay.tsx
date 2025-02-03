import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
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
  const [hoveredNeuron, setHoveredNeuron] = useState<{layer: number, neuron: number} | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const maxNeurons = Math.max(...(layers?.map(l => l.neurons) || [0]));
  const controls = useAnimation();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getWeightColor = (weight: number, distance: number) => {
    const normalizedWeight = (weight + 1) / 2;
    const intensity = Math.max(0, 1 - distance / 300);
    return `rgba(59, 130, 246, ${normalizedWeight * intensity})`;
  };

  const getDistanceFromMouse = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = (x1 + x2) / 2 - mousePosition.x;
    const dy = (y1 + y2) / 2 - mousePosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const renderTokens = (tokens: string[], isInput: boolean) => {
    return tokens.map((token, index) => (
      <motion.div
        key={`${isInput ? 'input' : 'output'}-${index}`}
        initial={{ opacity: 0, y: isInput ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`absolute ${isInput ? 'left-0' : 'right-0'} px-3 py-1 rounded-full text-sm 
          ${isInput ? 'bg-blue-100' : 'bg-green-100'} shadow-sm`}
        style={{
          top: `${(index * 400) / Math.max(tokens.length, 1)}px`,
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="font-medium">{token}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isInput ? 'Input' : 'Output'} Token {index + 1}</p>
              <p className="text-xs text-gray-500">Processing Step: {currentStep}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    ));
  };

  const renderConnections = (fromLayer: number, toLayer: number) => {
    if (!layers?.[fromLayer]?.weights) return null;

    return layers[fromLayer].weights?.map((weights, fromNeuron) => 
      weights.map((weight, toNeuron) => {
        const x1 = 100 + fromLayer * 150;
        const y1 = 50 + (fromNeuron * 400) / maxNeurons;
        const x2 = 100 + (fromLayer + 1) * 150;
        const y2 = 50 + (toNeuron * 400) / maxNeurons;
        const distance = getDistanceFromMouse(x1, y1, x2, y2);

        return (
          <motion.line
            key={`${fromLayer}-${fromNeuron}-${toNeuron}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={getWeightColor(weight, distance)}
            strokeWidth={Math.abs(weight) * 2 + (distance < 100 ? (100 - distance) / 25 : 0)}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: distance < 300 ? 0.6 + (300 - distance) / 500 : 0.2,
              transition: { duration: 0.5 }
            }}
            whileHover={{ strokeWidth: Math.abs(weight) * 4 }}
          />
        );
      })
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
            {layers?.map((layer, idx) => (
              <SelectItem key={idx} value={idx.toString()}>
                {layer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full h-[500px] overflow-x-auto">
        {renderTokens(inputTokens, true)}
        {renderTokens(outputTokens, false)}
        
        <svg width={100 + (layers?.length || 0) * 150} height="500">
          {layers?.map((_, idx) => 
            idx < (layers?.length || 0) - 1 && renderConnections(idx, idx + 1)
          )}

          {layers?.map((layer, layerIdx) => (
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
                        whileHover={{ scale: 1.2 }}
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
                            {layer.weights[neuronIdx]?.map((w, i) => (
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
        <p>Move your mouse over the visualization to see dynamic weight connections. Hover over neurons to see detailed weight values.</p>
      </div>
    </Card>
  );
};

export default NeuralNetworkDisplay;