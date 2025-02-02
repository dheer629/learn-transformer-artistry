import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const TransformerArchitecture: React.FC = () => {
  return (
    <motion.div 
      className="space-y-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }}
    >
      <Card className="p-6">
        <h3 className="font-semibold text-xl text-blue-800 mb-4">Transformer Architecture Overview</h3>
        <div className="space-y-6">
          <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
            <img 
              src="/transformer-detailed.png" 
              alt="Detailed Transformer Architecture"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-800 mb-2">Key Features</h4>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Parallel processing of input sequences
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Attention-based context understanding
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Position-aware sequence processing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Multi-head attention for diverse feature capture
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
              <img 
                src="/attention-mechanism.png" 
                alt="Attention Mechanism"
                className="w-full h-auto rounded-lg mb-2"
              />
              <p className="text-sm text-blue-700">Self-attention mechanism visualization</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
              <img 
                src="/positional-encoding.png" 
                alt="Positional Encoding"
                className="w-full h-auto rounded-lg mb-2"
              />
              <p className="text-sm text-blue-700">Positional encoding patterns</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransformerArchitecture;