import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const TransformerDiagram = () => {
  return (
    <motion.div variants={itemAnimation} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Transformer Architecture</h3>
        <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
          <img 
            src="/transformer-architecture.png" 
            alt="Transformer Architecture Diagram"
            className="object-contain w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-6 bg-white/90 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-900">Multi-Head Attention Mechanism</h4>
              <p className="text-sm text-gray-600">
                Visualizing how transformers process input sequences through self-attention
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>The diagram illustrates the key components:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Input Embeddings</li>
            <li>Positional Encoding</li>
            <li>Multi-Head Attention</li>
            <li>Feed Forward Networks</li>
            <li>Layer Normalization</li>
          </ul>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransformerDiagram;