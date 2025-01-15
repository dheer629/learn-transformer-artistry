import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import KeyFeatures from "./sections/KeyFeatures";
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

  const transformerSteps = [
    {
      title: "Input Embedding",
      description: "Converting words into numerical vectors",
      detailedExplanation: "Each word is transformed into a vector (list of numbers) that captures its meaning. Similar words will have similar vector representations.",
      formula: "\\[\\textcolor{#0EA5E9}{\\text{Word}} \\xrightarrow{\\textcolor{#F97316}{\\text{Embedding}}} \\textcolor{#D946EF}{\\mathbf{x} \\in \\mathbb{R}^d}\\]",
      formulaDescription: "Words (blue) are transformed through embedding (orange) into d-dimensional vectors (purple)",
      category: "embedding"
    },
    {
      title: "Positional Encoding",
      description: "Adding position information",
      detailedExplanation: "Since transformers process all words at once, we need to add information about where each word appears in the sentence. We use special mathematical functions to do this.",
      formula: "\\[\\textcolor{#0EA5E9}{PE_{(pos,2i)}} = \\textcolor{#F97316}{\\sin\\left(\\frac{pos}{10000^{2i/d}}\\right)}\\]",
      formulaDescription: "Position encoding (blue) uses sine waves (orange) to encode word positions",
      category: "encoding"
    },
    {
      title: "Self-Attention",
      description: "Finding relationships between words",
      detailedExplanation: "The transformer looks at how each word relates to every other word in the sentence. It's like understanding how words work together to create meaning.",
      formula: "\\[\\textcolor{#0EA5E9}{\\text{Attention}(Q,K,V)} = \\textcolor{#F97316}{\\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)}\\textcolor{#D946EF}{V}\\]",
      formulaDescription: "Attention mechanism (blue) uses scaled dot-product (orange) to weight the values (purple)",
      category: "attention"
    }
  ];

  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemAnimation}>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Understanding Transformers
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Transformers are powerful neural networks that can understand and process language by looking at how words relate to each other in a sentence.
        </p>
      </motion.div>

      <motion.div 
        variants={itemAnimation}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              How Transformers Work
            </h3>
            <p className="text-gray-600">
              A transformer processes text in three main steps: first, it converts words into numbers (embedding), 
              then adds position information, and finally looks at how words relate to each other (attention).
              This helps it understand the meaning of sentences just like we do!
            </p>
          </div>

          <KeyFeatures />
        </div>

        <motion.div 
          variants={itemAnimation}
          className="space-y-6"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="max-w-sm mx-auto">
              <img
                src="/lovable-uploads/920119ca-4a91-4285-a54b-f7c7a01af8fa.png"
                alt="Transformer Architecture Diagram"
                className={cn(
                  "rounded-lg shadow-md w-full h-auto",
                  "hover:shadow-lg transition-shadow duration-300",
                  "border border-gray-100"
                )}
              />
            </div>
            <p className="text-sm text-gray-600 text-center italic">
              The transformer architecture showing how information flows through the model
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={itemAnimation}>
        <TransformerStepsList 
          steps={transformerSteps}
          isLoading={false}
        />
      </motion.div>
    </motion.div>
  );
};

export default TransformerOverview;