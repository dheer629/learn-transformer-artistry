import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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
        <div className="flex flex-col space-y-6">
          <motion.div 
            className="flex justify-center"
            variants={fadeInUpVariants}
          >
            <img 
              src="/lovable-uploads/601290bb-ddc6-4a28-a3f1-7e2dc0944be7.png" 
              alt="Transformer Architecture Diagram" 
              className="w-full max-w-4xl h-auto rounded-lg shadow-lg mb-8"
            />
          </motion.div>
          <motion.div 
            className="space-y-6 text-gray-600"
            variants={fadeInUpVariants}
          >
            <motion.h3 
              className="text-2xl font-semibold text-primary"
              variants={fadeInUpVariants}
            >
              Step-by-Step Transformer Process:
            </motion.h3>
            <motion.ol 
              className="list-decimal list-inside space-y-4 pl-4"
              variants={fadeInUpVariants}
            >
              {[
                {
                  title: "Input Embedding & Positional Encoding",
                  description: "Converts input tokens (words/subwords) into vectors and adds positional information using sine and cosine functions. This maintains the sequence order since Transformers process all inputs simultaneously."
                },
                {
                  title: "Encoder Stack",
                  description: "Multiple identical layers process input through self-attention and feed-forward networks. Each layer enriches the representation by capturing different aspects of the relationships between words."
                },
                {
                  title: "Multi-Head Attention",
                  description: "Parallel attention mechanisms compute relationships between all words simultaneously. Each head can focus on different aspects of the relationships, enabling rich contextual understanding."
                },
                {
                  title: "Add & Normalize",
                  description: "Residual connections and layer normalization ensure stable training and help the model maintain access to lower-level features while learning higher-level abstractions."
                },
                {
                  title: "Feed-Forward Networks",
                  description: "Each position is processed through identical feed-forward networks, allowing the model to transform the attention outputs into richer representations independently."
                },
                {
                  title: "Decoder Stack",
                  description: "Similar to the encoder but includes masked attention to prevent looking ahead during generation. This ensures the model only uses previously generated tokens when producing output."
                },
                {
                  title: "Output Generation",
                  description: "The final linear and softmax layers convert the processed information into probabilities over the vocabulary, enabling the model to generate coherent and contextually appropriate outputs."
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="font-medium text-lg"
                  variants={listItemVariants}
                  custom={index}
                >
                  {item.title}
                  <motion.p 
                    className="ml-6 mt-2 text-base leading-relaxed"
                    variants={listItemVariants}
                  >
                    {item.description}
                  </motion.p>
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
