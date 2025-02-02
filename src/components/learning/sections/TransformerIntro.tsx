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

const TransformerIntro = () => {
  return (
    <motion.div variants={itemAnimation} className="space-y-6">
      <h2 className="text-3xl font-bold text-primary mb-4">
        Understanding Transformers & Large Language Models
      </h2>
      <div className="relative aspect-[21/9] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden mb-6">
        <img 
          src="/transformer-overview.png" 
          alt="Transformer Overview"
          className="object-contain w-full h-full"
        />
      </div>
      <p className="text-lg text-gray-600">
        Transformers are powerful neural networks that revolutionized natural language processing through their innovative attention mechanism, as introduced in the paper "Attention Is All You Need". They form the foundation for modern language models and enable a wide range of applications from text processing to multimodal tasks.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 bg-blue-50">
          <h3 className="text-xl font-semibold text-primary mb-3">Key Capabilities</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Text tokenization and embedding generation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Semantic search and retrieval
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Conversation memory management
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Multimodal processing capabilities
            </li>
          </ul>
        </Card>
        <Card className="p-6 bg-indigo-50">
          <h3 className="text-xl font-semibold text-primary mb-3">Applications</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Dense retrieval and RAG systems
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Named-entity recognition
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Few-shot classification
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Text generation and completion
            </li>
          </ul>
        </Card>
      </div>
    </motion.div>
  );
};

export default TransformerIntro;