import React from "react";
import { motion } from "framer-motion";
import { MathJaxContext } from "better-react-mathjax";
import TransformerOverview from "./learning/TransformerOverview";
import LearningResources from "./learning/LearningResources";
import ModuleGrid from "./learning/ModuleGrid";

const mathJaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["\\[", "\\]"]],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const LearningModule = () => {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <motion.div 
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <TransformerOverview />
        </motion.div>

        <motion.div variants={itemVariants}>
          <LearningResources />
        </motion.div>

        <ModuleGrid />
      </motion.div>
    </MathJaxContext>
  );
};

export default LearningModule;