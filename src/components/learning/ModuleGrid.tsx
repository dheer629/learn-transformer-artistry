import React from "react";
import { motion } from "framer-motion";
import ModuleCard from "./ModuleCard";

const modules = [
  {
    title: "Introduction to Transformers",
    description: "Core concepts and architectural overview",
    icon: "📚",
    content: "Transformers represent a breakthrough in neural network architecture, designed to process sequential data through self-attention mechanisms. Introduced in the seminal paper 'Attention is All You Need' (2017), they've become fundamental to modern natural language processing.",
    analogy: "Consider a Transformer as an advanced information processing system that can simultaneously analyze multiple aspects of data while maintaining contextual relationships.",
  },
  {
    title: "Text Processing Pipeline",
    description: "From raw text to embeddings",
    icon: "🔤",
    content: "Understanding how transformers process text involves several key steps: tokenization (breaking down text), embedding creation, and attention computation. This process enables the model to understand and generate human-like text.",
    analogy: "Think of tokenization like breaking a sentence into meaningful pieces, similar to how we learn to read by recognizing individual words and their combinations.",
  },
  {
    title: "Practical Applications",
    description: "Real-world implementations and use cases",
    icon: "💡",
    content: "Transformers power various applications including semantic search, RAG (Retrieval-Augmented Generation), conversation memory management, and multimodal processing. They can be fine-tuned for specific tasks like named-entity recognition and few-shot classification.",
    analogy: "Like a versatile tool that can be adapted for different tasks, transformers can be specialized for various language processing needs.",
  },
  {
    title: "Advanced Concepts",
    description: "Specialized techniques and optimizations",
    icon: "🚀",
    content: "Advanced transformer implementations include techniques like key-value caching for faster generation, dense retrieval for semantic search, and specialized architectures for multimodal processing. Understanding these concepts helps in building more efficient and capable systems.",
    analogy: "These optimizations are like fine-tuning a high-performance engine - small adjustments that lead to significant improvements in speed and efficiency.",
  },
  {
    title: "Model Training & Evaluation",
    description: "Fine-tuning and benchmarking",
    icon: "📊",
    content: "The process of adapting transformers for specific tasks involves fine-tuning pretrained models, freezing layers for efficiency, and rigorous evaluation using benchmarks. This ensures the model performs well on targeted applications while maintaining computational efficiency.",
    analogy: "Similar to how an athlete trains for specific events while maintaining overall fitness, models can be specialized while preserving their general capabilities.",
  }
];

const ModuleGrid = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      {modules.map((module, index) => (
        <motion.div 
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 }
            }
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <ModuleCard {...module} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ModuleGrid;