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
      description: "Convert words into number patterns that computers understand",
      detailedExplanation: "Think of this like turning each word into a special code that helps the computer understand its meaning. Just like how '🐱' means 'cat', we turn words into number patterns!",
      formula: "\\[\\textcolor{#0EA5E9}{\\text{Word}} \\rightarrow \\textcolor{#F97316}{\\text{Magic Box}} \\rightarrow \\textcolor{#D946EF}{\\text{Special Numbers}}\\]",
      formulaDescription: "Words (blue) go through a magic box (orange) to become special numbers (purple)!",
      category: "embedding"
    },
    {
      title: "Positional Encoding",
      description: "Add special numbers to remember word order",
      detailedExplanation: "Just like how the order of words matters in a sentence ('dog chases cat' is different from 'cat chases dog'), we add special numbers to remember where each word goes!",
      formula: "\\[\\textcolor{#0EA5E9}{\\text{Position}} + \\textcolor{#F97316}{\\text{Word Code}} = \\textcolor{#D946EF}{\\text{Magic Pattern}}\\]",
      formulaDescription: "We combine the position (blue) with the word code (orange) to make a magic pattern (purple)!",
      category: "encoding"
    },
    {
      title: "Self-Attention",
      description: "Help words understand each other",
      detailedExplanation: "Imagine each word is looking at all other words to understand the whole story better. Like in 'The cat saw the mouse', 'cat' pays attention to 'saw' and 'mouse' to understand what's happening!",
      formula: "\\[\\textcolor{#0EA5E9}{\\text{Word}} \\xrightarrow{\\textcolor{#F97316}{\\text{Looks At}}} \\textcolor{#D946EF}{\\text{Other Words}}\\]",
      formulaDescription: "Each word (blue) looks at (orange) all other words (purple) to understand the whole story better!",
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
          Transformers have revolutionized natural language processing and machine learning
          through their innovative attention mechanism and parallel processing capabilities.
        </p>
      </motion.div>

      <motion.div 
        variants={itemAnimation}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              Core Architecture
            </h3>
            <p className="text-gray-600">
              The Transformer architecture consists of an encoder and decoder, each containing
              self-attention layers and feed-forward neural networks. This design enables
              efficient processing of sequential data while capturing long-range dependencies.
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
                Detailed architecture of the Transformer model showing encoder and decoder components
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