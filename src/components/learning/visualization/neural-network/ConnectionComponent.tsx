
import React from "react";
import { motion } from "framer-motion";

interface ConnectionComponentProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  weight: number;
  opacity: number;
}

const ConnectionComponent: React.FC<ConnectionComponentProps> = ({
  x1,
  y1,
  x2,
  y2,
  weight,
  opacity,
}) => {
  return (
    <motion.path
      d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
      stroke={weight > 0 ? "#60a5fa" : "#f87171"}
      strokeWidth={Math.abs(weight) * 3}
      fill="none"
      opacity={opacity}
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: 1,
        opacity: opacity
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  );
};

export default ConnectionComponent;
