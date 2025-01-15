import React from "react";
import { motion } from "framer-motion";
import TransformerOverview from "./learning/TransformerOverview";
import ModuleCard from "./learning/ModuleCard";

const modules = [
  {
    title: "What Are Transformers?",
    description: "Understanding the foundation of modern AI language models.",
    icon: "🤖",
    content: "Transformers are neural networks designed to handle sequential data through self-attention mechanisms. First introduced in 2017 by Google in the 'Attention is All You Need' paper, they've revolutionized natural language processing and become the foundation for models like GPT and BERT.",
    analogy: "Think of a Transformer like a highly efficient team of researchers, each capable of focusing on different aspects of a document simultaneously, while maintaining awareness of how all pieces connect together.",
  },
  {
    title: "The Evolution from RNNs",
    description: "Why Transformers replaced traditional RNN models.",
    icon: "🔄",
    content: "Unlike RNNs that process data sequentially, Transformers can process all input data in parallel, making them much faster and more efficient. They also excel at handling long-range dependencies in data through their attention mechanism, overcoming a key limitation of RNNs.",
    analogy: "If RNNs are like reading a book one word at a time, Transformers are like being able to see and understand an entire page at once, while still grasping how each word relates to others.",
  },
  {
    title: "Self-Attention Mechanism",
    description: "The core innovation behind Transformer models.",
    icon: "🔍",
    content: "Self-attention allows the model to weigh the importance of different parts of the input when processing each element. It computes attention scores between all pairs of positions in the sequence, enabling the model to capture complex relationships and dependencies.",
    analogy: "Imagine a room full of people having multiple conversations. Self-attention is like each person's ability to focus on relevant conversations while still maintaining awareness of other important discussions happening around them.",
  },
  {
    title: "Real-World Applications",
    description: "How Transformers are changing the AI landscape.",
    icon: "🌍",
    content: "Transformers power many modern AI applications, from language translation and text generation to code completion and image recognition. They're the technology behind ChatGPT, BERT, and other groundbreaking AI models that have transformed how we interact with computers.",
    analogy: "Just as the printing press revolutionized information sharing, Transformers have revolutionized how machines understand and generate human-like content across various domains.",
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