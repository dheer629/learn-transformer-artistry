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
      description: "Advanced Neural Processing",
      detailedExplanation: "The Feed-Forward Network (FFN) in transformers consists of two linear transformations with a ReLU activation in between. Each position flows through this network independently, allowing the model to process and transform the attention outputs. The first linear layer typically expands the dimensionality (often by a factor of 4), while the second layer projects back to the model's hidden size. This expansion and contraction pattern helps the model learn complex relationships and feature interactions.",
      formula: "\\[\\text{FFN}(x) = \\text{Linear}_2(\\text{ReLU}(\\text{Linear}_1(x)))\\]",
      formulaDescription: "Two-layer neural network with ReLU activation enabling complex feature learning",
      category: "feedforward"
    },
    {
      title: "Layer Normalization",
      description: "Advanced Network Stabilization",
      detailedExplanation: "Layer Normalization is crucial for transformer stability and training efficiency. It operates by normalizing the inputs across the feature dimension, computing mean and variance for each layer independently. The normalized values are then scaled and shifted using learnable parameters γ (scale) and β (shift). This normalization helps prevent internal covariate shift, enables faster training, and allows for deeper networks. Unlike batch normalization, it operates on each sample independently, making it particularly suitable for sequence processing tasks.",
      formula: "\\[\\text{LayerNorm}(x) = \\gamma \\cdot \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta\\]",
      formulaDescription: "Feature-wise normalization with learnable scale and shift parameters",
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