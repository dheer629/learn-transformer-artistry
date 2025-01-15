import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MathJax } from "better-react-mathjax";

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
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
    >
      <Card className="p-8 hover:shadow-lg transition-shadow animate-fade-in bg-gradient-to-br from-white to-gray-50">
        <motion.h2 
          className="text-3xl font-bold text-primary mb-6"
          variants={fadeInUpVariants}
        >
          Understanding Transformer Architecture
        </motion.h2>
        <div className="grid grid-cols-12 gap-6">
          <motion.div 
            className="col-span-12 lg:col-span-4"
            variants={fadeInUpVariants}
          >
            <img 
              src="https://images.datacamp.com/image/upload/v1676302499/image3_d7c7d9ef4c.png" 
              alt="Complete Transformer Architecture" 
              className="w-full rounded-lg shadow-lg mb-8 hover:shadow-xl transition-shadow"
            />
            <p className="text-sm text-gray-600 text-center mt-2">Complete Transformer Architecture</p>
          </motion.div>
          
          <motion.div 
            className="col-span-12 lg:col-span-8 space-y-6 text-gray-600"
            variants={fadeInUpVariants}
          >
            <motion.h3 
              className="text-2xl font-semibold text-primary"
              variants={fadeInUpVariants}
            >
              Step-by-Step Transformer Process:
            </motion.h3>
            <motion.ol 
              className="list-decimal list-inside space-y-8 pl-4"
              variants={fadeInUpVariants}
            >
              {[
                {
                  title: "Input Embedding & Positional Encoding",
                  description: "Converts input tokens into vectors and adds positional information.",
                  formula: "\\[ E(x) = W_e x + PE_{pos} \\]",
                  formulaDescription: "Where PE_{pos} is positional encoding using sine and cosine functions.",
                  imageUrl: "https://images.datacamp.com/image/upload/v1676302499/image4_c6f69c5f5c.png"
                },
                {
                  title: "Self-Attention Mechanism",
                  description: "Computes relationships between all words simultaneously.",
                  formula: "\\[ Attention(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V \\]",
                  formulaDescription: "Q, K, V are query, key, and value matrices; d_k is key dimension.",
                  imageUrl: "https://images.datacamp.com/image/upload/v1676302499/image5_d7c7d9ef4c.png"
                },
                {
                  title: "Multi-Head Attention",
                  description: "Multiple attention heads working in parallel.",
                  formula: "\\[ MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O \\]",
                  formulaDescription: "Where each head_i is a separate attention mechanism.",
                  imageUrl: "https://images.datacamp.com/image/upload/v1676302499/image6_c6f69c5f5c.png"
                },
                {
                  title: "Feed-Forward Networks",
                  description: "Processes attention outputs through neural networks.",
                  formula: "\\[ FFN(x) = max(0, xW_1 + b_1)W_2 + b_2 \\]",
                  formulaDescription: "Two-layer neural network with ReLU activation.",
                  imageUrl: "https://images.datacamp.com/image/upload/v1676302499/image7_d7c7d9ef4c.png"
                }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="font-medium text-lg bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  variants={listItemVariants}
                  custom={index}
                >
                  <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                  <p className="mb-4 text-gray-600">{item.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Mathematical Formula:</h5>
                      <MathJax className="text-center">{item.formula}</MathJax>
                      <p className="text-sm text-gray-600 mt-2">{item.formulaDescription}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <img 
                        src={item.imageUrl} 
                        alt={`${item.title} Visualization`}
                        className="w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      />
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