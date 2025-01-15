import React from "react";
import { motion } from "framer-motion";
import TransformerIntro from "./sections/TransformerIntro";
import TransformerExplanation from "./sections/TransformerExplanation";
import TransformerDiagram from "./sections/TransformerDiagram";
import TransformerStepsList from "./sections/TransformerStepsList";

const TransformerOverview = () => {
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const transformerSteps = [
    {
      title: "Input Embedding",
      description: "Converting words into numerical vectors",
      detailedExplanation: "Each word is transformed into a vector (list of numbers) that captures its meaning. Similar words will have similar vector representations, helping the model understand relationships between words.",
      formula: "\\[\\mathbf{x} = \\text{Embedding}(\\text{word})\\]",
      formulaDescription: "Words are transformed into vectors through embedding",
      category: "embedding"
    },
    {
      title: "Positional Encoding",
      description: "Adding position information",
      detailedExplanation: "Since transformers process all words at once, we need to add information about where each word appears in the sentence. We use special mathematical functions (sine and cosine waves) to create unique patterns for each position.",
      formula: "\\[PE_{(pos,2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d}}\\right)\\]",
      formulaDescription: "Position encoding uses sine waves to encode word positions",
      category: "encoding"
    },
    {
      title: "Self-Attention",
      description: "Finding relationships between words",
      detailedExplanation: "The transformer looks at how each word relates to every other word in the sentence. This is like understanding context - how the meaning of a word can change based on the words around it.",
      formula: "\\[\\text{Attention}(Q,K,V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V\\]",
      formulaDescription: "Attention mechanism uses scaled dot-product to weight the values",
      category: "attention"
    }
  ];

  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <TransformerIntro />

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TransformerExplanation />
        <TransformerDiagram />
      </motion.div>

      <TransformerStepsList 
        steps={transformerSteps}
        isLoading={false}
      />
    </motion.div>
  );
};

export default TransformerOverview;