
import React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NeuronComponentProps {
  x: number;
  y: number;
  r: number;
  fill: string;
  neuronIndex: number;
  layerName: string;
  weights?: number[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const NeuronComponent: React.FC<NeuronComponentProps> = ({
  x,
  y,
  r,
  fill,
  neuronIndex,
  layerName,
  weights,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.g
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            whileHover={{ scale: 1.2 }}
          >
            <motion.circle
              cx={x}
              cy={y}
              r={r}
              fill={fill}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.text
              x={x}
              y={y}
              textAnchor="middle"
              dy=".3em"
              fill="white"
              fontSize="10"
            >
              {neuronIndex + 1}
            </motion.text>
          </motion.g>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2 space-y-2">
            <p className="font-semibold">{layerName}</p>
            <p className="text-sm">Neuron {neuronIndex + 1}</p>
            {weights && (
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium">Connection Weights:</p>
                {weights.map((w, i) => (
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
  );
};

export default NeuronComponent;
