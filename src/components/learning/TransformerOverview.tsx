import React from "react";
import { Card } from "@/components/ui/card";

const TransformerOverview = () => {
  return (
    <Card className="p-8 hover:shadow-lg transition-shadow animate-fade-in bg-gradient-to-br from-white to-gray-50">
      <h2 className="text-3xl font-bold text-primary mb-6">Understanding Transformer Architecture</h2>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/601290bb-ddc6-4a28-a3f1-7e2dc0944be7.png" 
            alt="Transformer Architecture Diagram" 
            className="w-full max-w-4xl h-auto rounded-lg shadow-lg mb-8"
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
  );
};

export default TransformerOverview;