import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import TransformerStepsList from "./sections/TransformerStepsList";
import KeyFeatures from "./sections/KeyFeatures";
import { cn } from "@/lib/utils";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const transformerSteps = [
  {
    title: "Input Embedding & Positional Encoding",
    description: "Converting input tokens into vector representations",
    detailedExplanation: "The embedding layer transforms discrete tokens into continuous vector spaces, while positional encoding adds sequence order information. This enables the model to understand both the meaning and position of each token.",
    formula: "\\[ E(x) = W_e x + PE_{pos} \\]",
    formulaDescription: "Combines token embeddings with positional encodings using sinusoidal functions.",
    category: "embedding"
  },
  {
    title: "Self-Attention Mechanism",
    description: "Computing token relationships",
    detailedExplanation: "Self-attention calculates importance scores between all token pairs, allowing the model to weigh relevant context when processing each token. This mechanism is key to capturing long-range dependencies.",
    formula: "\\[ Attention(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V \\]",
    formulaDescription: "Attention computation using queries (Q), keys (K), and values (V).",
    category: "attention"
  },
  {
    title: "Multi-Head Attention",
    description: "Parallel attention computation",
    detailedExplanation: "Multiple attention heads process input differently, capturing various types of relationships. This parallel processing enables the model to learn diverse representation patterns.",
    formula: "\\[ MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O \\]",
    formulaDescription: "Combines outputs from multiple attention heads.",
    category: "multi_head"
  },
  {
    title: "Feed-Forward Networks",
    description: "Non-linear transformations",
    detailedExplanation: "Position-wise feed-forward networks apply non-linear transformations to attention outputs. This component allows the model to process complex patterns independently for each position.",
    formula: "\\[ FFN(x) = max(0, xW_1 + b_1)W_2 + b_2 \\]",
    formulaDescription: "Two-layer neural network with ReLU activation.",
    category: "ffn"
  }
];

const TransformerOverview = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow animate-fade-in bg-gradient-to-br from-white to-gray-50">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center"
          variants={fadeInUpVariants}
        >
          Understanding Transformer Architecture
        </motion.h2>
        
        <div className="grid grid-cols-1 gap-8">
          <motion.div 
            className="space-y-8"
            variants={fadeInUpVariants}
          >
            {/* Architecture Diagram */}
            <div className="flex flex-col items-center space-y-4">
              <div className="max-w-md mx-auto"> {/* Added container with max-w-md */}
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

            <KeyFeatures />
            <TransformerStepsList 
              steps={transformerSteps}
              isLoading={false}
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransformerOverview;