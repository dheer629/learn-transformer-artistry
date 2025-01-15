import React from "react";
import { motion } from "framer-motion";
import TransformerStep from "../TransformerStep";

interface TransformerStepsListProps {
  steps: Array<{
    title: string;
    description: string;
    detailedExplanation: string;
    formula: string;
    formulaDescription: string;
    category: string;
  }>;
  isLoading: boolean;
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const TransformerStepsList: React.FC<TransformerStepsListProps> = ({ 
  steps, 
  isLoading 
}) => {
  const transformerSteps = [
    {
      title: "Input Embeddings",
      description: "Converting words into numerical vectors",
      detailedExplanation: "Each word is transformed into a dense vector representation that captures semantic meaning. The embedding layer learns to map similar words to similar vector spaces, enabling the model to understand relationships between words.",
      formula: "\\[\\mathbf{x} = \\text{Embedding}(\\text{word})\\]",
      formulaDescription: "Words are transformed into continuous vector representations",
      category: "embedding"
    },
    {
      title: "Positional Encoding",
      description: "Adding position information to embeddings",
      detailedExplanation: "Since transformers process all words simultaneously, positional encodings are added to provide information about word order. These use sine and cosine functions of different frequencies to create unique patterns for each position.",
      formula: "\\[PE_{(pos,2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d}}\\right)\\]",
      formulaDescription: "Position information is encoded using sinusoidal functions",
      category: "encoding"
    },
    {
      title: "Multi-Head Attention",
      description: "Parallel attention computation",
      detailedExplanation: "Multiple attention heads process the input in parallel, each focusing on different aspects of the relationships between words. This allows the model to capture various types of dependencies and patterns simultaneously.",
      formula: "\\[\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1,\\ldots,\\text{head}_h)W^O\\]",
      formulaDescription: "Multiple attention mechanisms operate in parallel",
      category: "attention"
    },
    {
      title: "Feed-Forward Networks",
      description: "Non-linear transformations",
      detailedExplanation: "Each position is processed independently through a two-layer neural network with ReLU activation. This allows the model to learn complex patterns and transformations specific to each position.",
      formula: "\\[\\text{FFN}(x) = \\max(0, xW_1 + b_1)W_2 + b_2\\]",
      formulaDescription: "Position-wise feed-forward networks apply non-linear transformations",
      category: "feedforward"
    },
    {
      title: "Layer Normalization",
      description: "Stabilizing neural networks",
      detailedExplanation: "Layer normalization helps stabilize the learning process by normalizing the activations across features. This ensures consistent scale of activations throughout the network.",
      formula: "\\[\\text{LayerNorm}(x) = \\gamma \\odot \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta\\]",
      formulaDescription: "Normalization stabilizes training and improves convergence",
      category: "normalization"
    }
  ];

  return (
    <motion.div variants={listItemVariants}>
      <motion.ol className="space-y-8">
        {transformerSteps.map((step, index) => (
          <motion.li
            key={index}
            variants={listItemVariants}
            custom={index}
          >
            <TransformerStep
              {...step}
              isLoading={isLoading}
            />
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
};

export default TransformerStepsList;