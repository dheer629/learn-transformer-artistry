import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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
    <MathJaxContext>
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
              className="col-span-4"
              variants={fadeInUpVariants}
            >
              <img 
                src="/lovable-uploads/601290bb-ddc6-4a28-a3f1-7e2dc0944be7.png" 
                alt="Transformer Architecture Diagram" 
                className="w-full max-w-sm h-auto rounded-lg shadow-lg mb-8"
              />
            </motion.div>
            
            <motion.div 
              className="col-span-8 space-y-6 text-gray-600"
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
                    diagramUrl: "https://miro.medium.com/max/1400/1*sXNXYfAqfLUeiDXPCo130w.png"
                  },
                  {
                    title: "Self-Attention Mechanism",
                    description: "Computes relationships between all words simultaneously.",
                    formula: "\\[ Attention(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V \\]",
                    formulaDescription: "Q, K, V are query, key, and value matrices; d_k is key dimension.",
                    diagramUrl: "https://production-media.paperswithcode.com/methods/Screen_Shot_2020-07-08_at_12.21.14_AM_st5S0XK.png"
                  },
                  {
                    title: "Multi-Head Attention",
                    description: "Multiple attention heads working in parallel.",
                    formula: "\\[ MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O \\]",
                    formulaDescription: "Where each head_i is a separate attention mechanism.",
                    diagramUrl: "https://production-media.paperswithcode.com/methods/multi-head-attention_l1A3G7a.png"
                  },
                  {
                    title: "Feed-Forward Networks",
                    description: "Processes attention outputs through neural networks.",
                    formula: "\\[ FFN(x) = max(0, xW_1 + b_1)W_2 + b_2 \\]",
                    formulaDescription: "Two-layer neural network with ReLU activation.",
                    diagramUrl: "https://machinelearningmastery.com/wp-content/uploads/2021/08/attention_research_1.png"
                  }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="font-medium text-lg bg-white rounded-lg p-6 shadow-sm"
                    variants={listItemVariants}
                    custom={index}
                  >
                    <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                    <p className="mb-4 text-gray-600">{item.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Mathematical Formula:</h5>
                      <MathJax className="text-center">{item.formula}</MathJax>
                      <p className="text-sm text-gray-600 mt-2">{item.formulaDescription}</p>
                    </div>
                    <img 
                      src={item.diagramUrl} 
                      alt={`${item.title} Diagram`}
                      className="w-full h-auto rounded-lg shadow-sm mt-4"
                    />
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </MathJaxContext>
  );
};

export default TransformerOverview;