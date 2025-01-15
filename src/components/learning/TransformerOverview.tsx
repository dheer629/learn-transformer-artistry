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
      description: "Converting text into numerical vectors",
      detailedExplanation: "In this step, we transform each word or token into a vector of numbers that represents its meaning in a high-dimensional space. Similar words will have similar vector representations.",
      formula: "\\[\\textcolor{#0EA5E9}{\\text{Token}} \\xrightarrow{\\textcolor{#F97316}{\\text{Embedding Matrix}}} \\textcolor{#D946EF}{\\text{Vector } \\mathbf{x} \\in \\mathbb{R}^d}\\]",
      formulaDescription: "Each token (blue) is transformed by the embedding matrix (orange) into a d-dimensional vector (purple)",
      category: "embedding"
    },
    {
      title: "Positional Encoding",
      description: "Adding position information to embeddings",
      detailedExplanation: "Since transformers process all tokens simultaneously, we need to add information about the position of each token in the sequence. This is done using sinusoidal functions of different frequencies.",
      formula: "\\[\\textcolor{#0EA5E9}{PE_{(pos,2i)}} = \\textcolor{#F97316}{\\sin(\\frac{pos}{10000^{2i/d}})} + \\textcolor{#D946EF}{\\mathbf{x}}\\]",
      formulaDescription: "Position encoding (blue) uses sine waves (orange) added to the embedding vector (purple)",
      category: "encoding"
    },
    {
      title: "Self-Attention",
      description: "Computing relationships between tokens",
      detailedExplanation: "Each token learns to pay attention to other relevant tokens in the sequence. This is done by computing Query (Q), Key (K), and Value (V) vectors for each token and using them to calculate attention scores.",
      formula: "\\[\\textcolor{#0EA5E9}{\\text{Attention}(Q,K,V)} = \\textcolor{#F97316}{\\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})}\\textcolor{#D946EF}{V}\\]",
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
          Transformers are advanced neural networks that have revolutionized natural language processing
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