import React from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Module {
  title: string;
  description: string;
  icon: string;
  content: string;
  analogy: string;
}

const modules: Module[] = [
  {
    title: "Introduction to Transformers",
    description: "Learn what Transformers are and why they're important in AI.",
    icon: "🤖",
    content: "Transformers are a type of AI model that's really good at understanding and working with sequences of data, like sentences or music. They're the technology behind many modern AI applications like ChatGPT and Google Translate.",
    analogy: "Think of a Transformer like a team of students working together on a group project. Each student pays attention to different parts of the assignment, but they all share their findings to create the final result. Just like how students work together to understand a complex topic, Transformers work together to understand and process information.",
  },
  {
    title: "How Transformers Work",
    description: "Understand the basic components and process of Transformer models.",
    icon: "⚙️",
    content: "Transformers work by breaking down input (like a sentence) into pieces, then processing these pieces in parallel while considering how they relate to each other. This is done through special mechanisms called 'attention' that help the model focus on important relationships in the data.",
    analogy: "Imagine reading a mystery novel. When you try to solve the mystery, you pay special attention to important clues while keeping the whole story in mind. Similarly, Transformers use 'attention' to focus on the most relevant parts of the input while considering the overall context.",
  },
  {
    title: "Attention Mechanism",
    description: "Learn how Transformers focus on important information.",
    icon: "🔍",
    content: "The attention mechanism is like a spotlight that helps Transformers focus on the most important parts of the input. For each word or piece of input, the model calculates how much attention it should pay to every other piece, allowing it to understand complex relationships and context.",
    analogy: "Think about being in a crowded cafeteria. When your friend starts talking, you focus your attention on their voice while still being aware of the background noise. This is similar to how Transformers use attention to focus on relevant information while maintaining awareness of the broader context.",
  },
  {
    title: "Encoder-Decoder Structure",
    description: "Explore how Transformers process and generate information.",
    icon: "🔄",
    content: "Transformers use an encoder to understand input and a decoder to generate output. The encoder processes the input and creates a deep understanding of it, while the decoder uses this understanding to generate appropriate outputs.",
    analogy: "Imagine a translator at work. First, they read and understand a sentence in one language (encoding), then they think about how to express the same meaning in another language (decoding). Transformers work similarly, with the encoder understanding the input and the decoder expressing it in the desired form.",
  },
];

const LearningModule = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
            <div className="text-4xl mb-4">{module.icon}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">{module.title}</h3>
            <p className="text-gray-600 mb-4">{module.description}</p>
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>Learn More</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Explanation:</h4>
                      <p className="text-gray-600">{module.content}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Simple Analogy:</h4>
                      <p className="text-gray-600">{module.analogy}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
      <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
        <h3 className="text-xl font-semibold text-primary mb-4">Transformer Architecture Diagram</h3>
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/601290bb-ddc6-4a28-a3f1-7e2dc0944be7.png" 
            alt="Transformer Architecture Diagram" 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <p className="mt-4 text-gray-600 text-center">
          This diagram illustrates the complete architecture of a Transformer model, showing both encoder and decoder components,
          including the multi-head attention mechanisms, feed-forward networks, and normalization layers.
        </p>
      </Card>
    </div>
  );
};

export default LearningModule;