import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MathJax } from "better-react-mathjax";
import { useTransformerImages } from "@/hooks/useTransformerImages";
import { Skeleton } from "@/components/ui/skeleton";

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

const TransformerOverview = () => {
  const { data: images, isLoading } = useTransformerImages();

  const getImageUrl = (category: string, index: number) => {
    const categoryImages = images?.filter(img => img.category === category) || [];
    const selectedImage = categoryImages[index % categoryImages.length];
    return selectedImage?.url;
  };

  const mainImage = images?.find(img => img.category === 'architecture');

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
            className="space-y-6"
            variants={fadeInUpVariants}
          >
            <div className="flex justify-center">
              {isLoading ? (
                <Skeleton className="w-full max-w-3xl h-96 rounded-lg" />
              ) : mainImage ? (
                <div className="relative max-w-3xl mx-auto">
                  <img 
                    src={mainImage.url} 
                    alt="Complete Transformer Architecture"
                    className="rounded-lg shadow-lg hover:shadow-xl transition-shadow object-contain w-full"
                  />
                  <p className="text-sm text-gray-600 text-center mt-4 font-medium">
                    Complete Transformer Architecture Overview
                  </p>
                </div>
              ) : null}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg max-w-3xl mx-auto">
              <h3 className="font-semibold text-lg text-blue-800 mb-2">Key Features</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Parallel processing of input sequences</li>
                <li>• Attention-based context understanding</li>
                <li>• Position-aware sequence processing</li>
                <li>• Multi-head attention for diverse feature capture</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            variants={fadeInUpVariants}
          >
            <motion.h3 
              className="text-xl sm:text-2xl font-semibold text-primary"
              variants={fadeInUpVariants}
            >
              Step-by-Step Transformer Process:
            </motion.h3>
            <motion.ol 
              className="space-y-8"
              variants={fadeInUpVariants}
            >
              {transformerSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  variants={listItemVariants}
                  custom={index}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg sm:text-xl font-bold text-primary">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-4">{step.detailedExplanation}</p>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Mathematical Formula:</h5>
                        <MathJax className="text-center">{step.formula}</MathJax>
                        <p className="text-sm text-gray-600 mt-2">{step.formulaDescription}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      {isLoading ? (
                        <Skeleton className="w-full h-64 rounded-lg" />
                      ) : (
                        <img 
                          src={getImageUrl(step.category, index)} 
                          alt={`${step.title} Visualization`}
                          className="rounded-lg shadow-sm hover:shadow-md transition-shadow object-contain w-full"
                        />
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransformerOverview;