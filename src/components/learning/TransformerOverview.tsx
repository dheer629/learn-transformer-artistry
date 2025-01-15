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
      description: "Convert input tokens into continuous vector representations",
      detailedExplanation: "The embedding layer transforms each input token into a dense vector of fixed size, capturing semantic relationships between words.",
      formula: "\\[E = WX\\]",
      formulaDescription: "Where W is the embedding matrix and X is the one-hot encoded input",
      category: "embedding"
    },
    {
      title: "Positional Encoding",
      description: "Add position information to the embeddings",
      detailedExplanation: "Since transformers process all tokens simultaneously, positional encoding adds information about token positions in the sequence.",
      formula: "\\[PE_{(pos,2i)} = sin(pos/10000^{2i/d_{model}})\\]",
      formulaDescription: "Sinusoidal position encoding for even dimensions",
      category: "encoding"
    },
    {
      title: "Self-Attention",
      description: "Compute attention scores between all tokens",
      detailedExplanation: "Self-attention allows each token to attend to all other tokens in the sequence, capturing contextual relationships.",
      formula: "\\[Attention(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V\\]",
      formulaDescription: "Scaled dot-product attention mechanism",
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