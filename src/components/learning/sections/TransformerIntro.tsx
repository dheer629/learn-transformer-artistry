import React from "react";
import { motion } from "framer-motion";

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
      <p className="text-lg text-gray-600">
        Transformers are powerful neural networks that revolutionized natural language processing through their innovative attention mechanism, as introduced in the paper "Attention Is All You Need". They form the foundation for modern language models and enable a wide range of applications from text processing to multimodal tasks.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-3">Key Capabilities</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Text tokenization and embedding generation</li>
            <li>• Semantic search and retrieval</li>
            <li>• Conversation memory management</li>
            <li>• Multimodal processing capabilities</li>
          </ul>
        </div>
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-3">Applications</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Dense retrieval and RAG systems</li>
            <li>• Named-entity recognition</li>
            <li>• Few-shot classification</li>
            <li>• Text generation and completion</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default TransformerIntro;