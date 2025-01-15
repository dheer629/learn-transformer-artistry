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

  const getImageUrl = (category: string) => {
    return images?.find(img => img.category === category)?.url;
  };

  const mainImage = images?.find(img => img.category === 'overview');

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            className="lg:col-span-4 space-y-6"
            variants={fadeInUpVariants}
          >
            <div className="relative">
              {isLoading ? (
                <Skeleton className="w-full h-64 rounded-lg" />
              ) : mainImage ? (
                <img 
                  src={mainImage.url} 
                  alt={mainImage.title} 
                  className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              ) : null}
              <p className="text-sm text-gray-600 text-center mt-4 font-medium">
                {mainImage?.title || "Complete Transformer Architecture"}
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-8 space-y-8"
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
              {[
                {
                  title: "Input Embedding & Positional Encoding",
                  description: "Converts input tokens into vectors and adds positional information.",
                  formula: "\\[ E(x) = W_e x + PE_{pos} \\]",
                  formulaDescription: "Where PE_{pos} is positional encoding using sine and cosine functions.",
                  category: "embedding"
                },
                {
                  title: "Self-Attention Mechanism",
                  description: "Computes relationships between all words simultaneously.",
                  formula: "\\[ Attention(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V \\]",
                  formulaDescription: "Q, K, V are query, key, and value matrices; d_k is key dimension.",
                  category: "attention"
                },
                {
                  title: "Multi-Head Attention",
                  description: "Multiple attention heads working in parallel.",
                  formula: "\\[ MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O \\]",
                  formulaDescription: "Where each head_i is a separate attention mechanism.",
                  category: "attention"
                },
                {
                  title: "Feed-Forward Networks",
                  description: "Processes attention outputs through neural networks.",
                  formula: "\\[ FFN(x) = max(0, xW_1 + b_1)W_2 + b_2 \\]",
                  formulaDescription: "Two-layer neural network with ReLU activation.",
                  category: "ffn"
                }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  variants={listItemVariants}
                  custom={index}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg sm:text-xl font-bold text-primary">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Mathematical Formula:</h5>
                        <MathJax className="text-center">{item.formula}</MathJax>
                        <p className="text-sm text-gray-600 mt-2">{item.formulaDescription}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      {isLoading ? (
                        <Skeleton className="w-full h-48 rounded-lg" />
                      ) : (
                        <img 
                          src={getImageUrl(item.category)} 
                          alt={`${item.title} Visualization`}
                          className="w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow"
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