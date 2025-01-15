import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResourceCard from "./ResourceCard";

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

const LearningResources = () => {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4">Essential Learning Resources</h3>
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {learningResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default LearningResources;