import React from "react";
import { Card } from "@/components/ui/card";

interface Module {
  title: string;
  description: string;
  icon: string;
}

const modules: Module[] = [
  {
    title: "Introduction to Transformers",
    description: "Learn the basics of Transformer architecture and its importance in modern AI.",
    icon: "🎯",
  },
  {
    title: "Self-Attention Mechanism",
    description: "Understand how self-attention helps models process sequential data.",
    icon: "🔍",
  },
  {
    title: "Multi-Head Attention",
    description: "Explore how multiple attention heads work together.",
    icon: "🧠",
  },
];

const LearningModule = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
          <div className="text-4xl mb-4">{module.icon}</div>
          <h3 className="text-xl font-semibold text-primary mb-2">{module.title}</h3>
          <p className="text-gray-600">{module.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default LearningModule;