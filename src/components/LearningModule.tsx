import React from "react";
import { motion } from "framer-motion";
import TransformerOverview from "./learning/TransformerOverview";
import ModuleCard from "./learning/ModuleCard";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const learningResources = [
  {
    title: "Best Courses",
    description: "Stanford CS231N (CNNs), CS224D (NLP), Andrew Ng's ML Course, and more top-rated courses.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#best-courses",
    category: "courses"
  },
  {
    title: "Important Deep Learning Papers",
    description: "Collection of influential papers including AlexNet, GoogLeNet, ResNet, and GANs.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#most-important-deep-learning-papers",
    category: "research"
  },
  {
    title: "ML Tech Talks",
    description: "Curated talks from leading researchers and practitioners in ML/AI.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#ml-tech-talks",
    category: "talks"
  },
  {
    title: "Best ML/AI Blogs",
    description: "Top blogs including Andrej Karpathy, Google Research, DeepMind, and more.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#best-blogs",
    category: "blogs"
  },
  {
    title: "Neural Networks Guide",
    description: "Comprehensive resources for understanding neural networks, including 3Blue1Brown series.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#neural-networks",
    category: "neural-networks"
  },
  {
    title: "CNN Resources",
    description: "In-depth materials about Convolutional Neural Networks and their applications.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#cnns",
    category: "cnn"
  },
  {
    title: "NLP Resources",
    description: "Natural Language Processing resources and best practices.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#nlp",
    category: "nlp"
  },
  {
    title: "Deep Reinforcement Learning",
    description: "Resources and articles about Deep RL implementation and theory.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#deep-reinforcement-learning",
    category: "reinforcement-learning"
  },
  {
    title: "ML Project Advice",
    description: "Practical tips and best practices for ML projects.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#ml-project-advice",
    category: "advice"
  },
  {
    title: "Debugging ML Models",
    description: "Comprehensive guide on debugging and improving ML models.",
    url: "https://github.com/adeshpande3/Machine-Learning-Links-And-Lessons-Learned#debugging-ml-models",
    category: "debugging"
  }
];

const modules = [
  {
    title: "Introduction to Transformers",
    description: "Core concepts and architectural overview",
    icon: "📚",
    content: "Transformers represent a breakthrough in neural network architecture, designed to process sequential data through self-attention mechanisms. Introduced in the seminal paper 'Attention is All You Need' (2017), they've become fundamental to modern natural language processing.",
    analogy: "Consider a Transformer as an advanced information processing system that can simultaneously analyze multiple aspects of data while maintaining contextual relationships.",
  },
  {
    title: "Text Processing Pipeline",
    description: "From raw text to embeddings",
    icon: "🔤",
    content: "Understanding how transformers process text involves several key steps: tokenization (breaking down text), embedding creation, and attention computation. This process enables the model to understand and generate human-like text.",
    analogy: "Think of tokenization like breaking a sentence into meaningful pieces, similar to how we learn to read by recognizing individual words and their combinations.",
  },
  {
    title: "Practical Applications",
    description: "Real-world implementations and use cases",
    icon: "💡",
    content: "Transformers power various applications including semantic search, RAG (Retrieval-Augmented Generation), conversation memory management, and multimodal processing. They can be fine-tuned for specific tasks like named-entity recognition and few-shot classification.",
    analogy: "Like a versatile tool that can be adapted for different tasks, transformers can be specialized for various language processing needs.",
  },
  {
    title: "Advanced Concepts",
    description: "Specialized techniques and optimizations",
    icon: "🚀",
    content: "Advanced transformer implementations include techniques like key-value caching for faster generation, dense retrieval for semantic search, and specialized architectures for multimodal processing. Understanding these concepts helps in building more efficient and capable systems.",
    analogy: "These optimizations are like fine-tuning a high-performance engine - small adjustments that lead to significant improvements in speed and efficiency.",
  },
  {
    title: "Model Training & Evaluation",
    description: "Fine-tuning and benchmarking",
    icon: "📊",
    content: "The process of adapting transformers for specific tasks involves fine-tuning pretrained models, freezing layers for efficiency, and rigorous evaluation using benchmarks. This ensures the model performs well on targeted applications while maintaining computational efficiency.",
    analogy: "Similar to how an athlete trains for specific events while maintaining overall fitness, models can be specialized while preserving their general capabilities.",
  }
];

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
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-4">Essential Learning Resources</h3>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {learningResources.map((resource, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  variants={itemVariants}
                >
                  <h4 className="font-semibold text-lg text-primary">{resource.title}</h4>
                  <p className="text-gray-600 mt-1">{resource.description}</p>
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                  >
                    View Resources →
                  </a>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {modules.map((module, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <ModuleCard {...module} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LearningModule;
