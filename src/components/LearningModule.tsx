import React from "react";
import { motion } from "framer-motion";
import TransformerOverview from "./learning/TransformerOverview";
import ModuleCard from "./learning/ModuleCard";

const modules = [
  {
    title: "Introduction to Transformers",
    description: "Core concepts and architectural overview",
    icon: "📚",
    content: "Transformers represent a breakthrough in neural network architecture, designed to process sequential data through self-attention mechanisms. Introduced in the seminal paper 'Attention is All You Need' (2017), they've become fundamental to modern natural language processing.",
    analogy: "Consider a Transformer as an advanced information processing system that can simultaneously analyze multiple aspects of data while maintaining contextual relationships.",
  },
  {
    title: "Architectural Components",
    description: "Understanding the key building blocks",
    icon: "🔧",
    content: "The architecture consists of encoder and decoder stacks, each containing self-attention layers and feed-forward neural networks. This design enables parallel processing and efficient handling of long-range dependencies in sequential data.",
    analogy: "The components work together like a sophisticated assembly line where each station can communicate with all others to ensure optimal processing.",
  },
  {
    title: "Self-Attention Mechanism",
    description: "Deep dive into attention computation",
    icon: "🔍",
    content: "Self-attention allows the model to weigh the importance of different elements in a sequence when processing each element. It computes attention scores between all pairs of positions, enabling the model to capture complex relationships and dependencies.",
    analogy: "Similar to how a researcher cross-references multiple sources while writing a paper, self-attention helps the model consider all relevant information when processing each input.",
  },
  {
    title: "Applications & Impact",
    description: "Real-world implementations",
    icon: "🌐",
    content: "Transformers power state-of-the-art models in machine translation, text generation, and even computer vision. Their impact extends beyond NLP to areas like protein structure prediction and music generation.",
    analogy: "Just as the printing press revolutionized information dissemination, Transformers have fundamentally changed how machines process and generate human-like content.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const LearningModule = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <TransformerOverview />
      </motion.div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {modules.map((module, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <ModuleCard {...module} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LearningModule;