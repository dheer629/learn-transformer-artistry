import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTransformerImages } from "@/hooks/useTransformerImages";
import TransformerArchitecture from "./TransformerArchitecture";
import TransformerStepsList from "./sections/TransformerStepsList";
import KeyFeatures from "./sections/KeyFeatures";

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
    description: "Converts input tokens into continuous vector representations and adds positional information to maintain sequence order.",
    detailedExplanation: "The embedding layer transforms each input token into a dense vector of fixed size. Positional encoding adds information about the position of each token in the sequence, allowing the model to understand word order.",
    formula: "\\[ E(x) = W_e x + PE_{pos} \\]",
    formulaDescription: "Where PE_{pos} is positional encoding using sine and cosine functions of different frequencies.",
    category: "embedding"
  },
  {
    title: "Self-Attention Mechanism",
    description: "Allows the model to weigh the importance of different words in relation to each other when processing a specific word.",
    detailedExplanation: "Self-attention calculates attention scores between all pairs of words in the input sequence. This helps the model understand relationships and dependencies between words, regardless of their distance in the sequence.",
    formula: "\\[ Attention(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V \\]",
    formulaDescription: "Q, K, V are query, key, and value matrices derived from the input; d_k is the dimension of the key vectors.",
    category: "attention"
  },
  {
    title: "Multi-Head Attention",
    description: "Allows the model to focus on different aspects of the input sequence simultaneously.",
    detailedExplanation: "Multiple attention heads process the input in parallel, each potentially focusing on different aspects of the relationships between words. This allows the model to capture various types of dependencies in the data.",
    formula: "\\[ MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O \\]",
    formulaDescription: "Each head independently computes attention, and results are concatenated and projected.",
    category: "multi_head"
  },
  {
    title: "Feed-Forward Networks",
    description: "Processes the attention outputs through neural networks to capture complex patterns.",
    detailedExplanation: "The feed-forward network applies two linear transformations with a ReLU activation in between. This component allows the model to process the attention mechanism's output and introduce non-linearity.",
    formula: "\\[ FFN(x) = max(0, xW_1 + b_1)W_2 + b_2 \\]",
    formulaDescription: "Two-layer neural network with ReLU activation, processing each position independently.",
    category: "ffn"
  }
];

const TransformerOverview = () => {
  const { data: images, isLoading } = useTransformerImages();

  const getImageUrl = (category: string) => {
    if (!images || images.length === 0) return null;
    
    const normalizedCategory = category.toLowerCase().trim();
    console.log(`Looking for image with category: ${normalizedCategory}`);
    
    const image = images.find(img => 
      img.category.toLowerCase().trim() === normalizedCategory
    );
    
    if (image) {
      console.log(`Found image for category ${normalizedCategory}:`, image);
      return image.image_url;
    }
    
    console.log(`No image found for category: ${normalizedCategory}`);
    return null;
  };

  const architectureImage = getImageUrl('transformer_architecture');

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
          <TransformerArchitecture 
            mainImageUrl={architectureImage}
            isLoading={isLoading}
          />
          
          <motion.div 
            className="space-y-8"
            variants={fadeInUpVariants}
          >
            <KeyFeatures />
            <TransformerStepsList 
              steps={transformerSteps}
              getImageUrl={getImageUrl}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransformerOverview;