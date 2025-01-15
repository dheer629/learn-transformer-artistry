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
    title: "What Are Transformers?",
    description: "Understanding the foundation of modern AI language models.",
    icon: "🤖",
    content: "Transformers are neural networks designed to handle sequential data through self-attention mechanisms. First introduced in 2017 by Google in the 'Attention is All You Need' paper, they've revolutionized natural language processing and become the foundation for models like GPT and BERT.",
    analogy: "Think of a Transformer like a highly efficient team of researchers, each capable of focusing on different aspects of a document simultaneously, while maintaining awareness of how all pieces connect together.",
  },
  {
    title: "The Evolution from RNNs",
    description: "Why Transformers replaced traditional RNN models.",
    icon: "🔄",
    content: "Unlike RNNs that process data sequentially, Transformers can process all input data in parallel, making them much faster and more efficient. They also excel at handling long-range dependencies in data through their attention mechanism, overcoming a key limitation of RNNs.",
    analogy: "If RNNs are like reading a book one word at a time, Transformers are like being able to see and understand an entire page at once, while still grasping how each word relates to others.",
  },
  {
    title: "Self-Attention Mechanism",
    description: "The core innovation behind Transformer models.",
    icon: "🔍",
    content: "Self-attention allows the model to weigh the importance of different parts of the input when processing each element. It computes attention scores between all pairs of positions in the sequence, enabling the model to capture complex relationships and dependencies.",
    analogy: "Imagine a room full of people having multiple conversations. Self-attention is like each person's ability to focus on relevant conversations while still maintaining awareness of other important discussions happening around them.",
  },
  {
    title: "Real-World Applications",
    description: "How Transformers are changing the AI landscape.",
    icon: "🌍",
    content: "Transformers power many modern AI applications, from language translation and text generation to code completion and image recognition. They're the technology behind ChatGPT, BERT, and other groundbreaking AI models that have transformed how we interact with computers.",
    analogy: "Just as the printing press revolutionized information sharing, Transformers have revolutionized how machines understand and generate human-like content across various domains.",
  },
];

const LearningModule = () => {
  return (
    <div className="space-y-8">
      <Card className="p-8 hover:shadow-lg transition-shadow animate-fade-in bg-gradient-to-br from-white to-gray-50">
        <h2 className="text-3xl font-bold text-primary mb-6">Understanding Transformer Architecture</h2>
        <div className="flex flex-col space-y-6">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/601290bb-ddc6-4a28-a3f1-7e2dc0944be7.png" 
              alt="Transformer Architecture Diagram" 
              className="w-full max-w-5xl h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6 text-gray-600">
            <h3 className="text-2xl font-semibold text-primary">Step-by-Step Transformer Process:</h3>
            <ol className="list-decimal list-inside space-y-4 pl-4">
              <li className="font-medium text-lg">Input Embedding & Positional Encoding
                <p className="ml-6 mt-2 text-base leading-relaxed">
                  Converts input tokens (words/subwords) into vectors and adds positional information using sine and cosine functions. This maintains the sequence order since Transformers process all inputs simultaneously.
                </p>
              </li>
              <li className="font-medium text-lg">Encoder Stack
                <p className="ml-6 mt-2 text-base leading-relaxed">
                  Multiple identical layers process input through self-attention and feed-forward networks. Each layer enriches the representation by capturing different aspects of the relationships between words.
                </p>
              </li>
              <li className="font-medium text-lg">Multi-Head Attention
                <p className="ml-6 mt-2 text-base leading-relaxed">
                  Parallel attention mechanisms compute relationships between all words simultaneously. Each head can focus on different aspects of the relationships, enabling rich contextual understanding.
                </p>
              </li>
              <li className="font-medium text-lg">Add & Normalize
                <p className="ml-6 mt-2 text-base leading-relaxed">
                  Residual connections and layer normalization ensure stable training and help the model maintain access to lower-level features while learning higher-level abstractions.
                </p>
              </li>
              <li className="font-medium text-lg">Feed-Forward Networks
                <p className="ml-6 mt-2 text-base leading-relaxed">
                  Each position is processed through identical feed-forward networks, allowing the model to transform the attention outputs into richer representations independently.
                </p>
              </li>
              <li className="font-medium text-lg">Decoder Stack
                <p className="ml-6 mt-2 text-base leading-relaxed">
                  Similar to the encoder but includes masked attention to prevent looking ahead during generation. This ensures the model only uses previously generated tokens when producing output.
                </p>
              </li>
              <li className="font-medium text-lg">Output Generation
                <p className="ml-6 mt-2 text-base leading-relaxed">
                  The final linear and softmax layers convert the processed information into probabilities over the vocabulary, enabling the model to generate coherent and contextually appropriate outputs.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-in bg-white">
            <div className="text-4xl mb-4">{module.icon}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">{module.title}</h3>
            <p className="text-gray-600 mb-4">{module.description}</p>
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>Learn More</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Detailed Explanation:</h4>
                      <p className="text-gray-600 leading-relaxed">{module.content}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Practical Analogy:</h4>
                      <p className="text-gray-600 leading-relaxed">{module.analogy}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningModule;