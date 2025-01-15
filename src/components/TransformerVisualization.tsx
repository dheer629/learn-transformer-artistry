import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface EmbeddingVector {
  word: string;
  vector: number[];
}

interface LayerStep {
  title: string;
  description: string;
  formula: string;
  details: string[];
}

const TransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [embeddings, setEmbeddings] = useState<EmbeddingVector[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);

  const encoderSteps: LayerStep[] = [
    {
      title: "Input Embedding",
      description: "Converting words into numerical vectors",
      formula: "E(x) = WᵉX + PE",
      details: [
        "1. Each word is converted into a numerical vector",
        "2. Positional encoding is added to maintain word order",
        "3. Resulting embeddings capture word meaning and position"
      ]
    },
    {
      title: "Self-Attention",
      description: "Computing relationships between words",
      formula: "Attention(Q,K,V) = softmax(QKᵀ/√d)V",
      details: [
        "1. Create Query (Q), Key (K), and Value (V) vectors",
        "2. Calculate attention scores between all words",
        "3. Apply softmax to get attention weights",
        "4. Combine values based on attention weights"
      ]
    },
    {
      title: "Feed-Forward Network",
      description: "Processing through neural network layers",
      formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
      details: [
        "1. Transform through first linear layer",
        "2. Apply ReLU activation",
        "3. Transform through second linear layer",
        "4. Add residual connection and normalize"
      ]
    }
  ];

  const decoderSteps: LayerStep[] = [
    {
      title: "Output Embedding",
      description: "Embedding the partial output sequence",
      formula: "E(y) = WᵈY + PE",
      details: [
        "1. Convert partial output to embeddings",
        "2. Add positional encoding",
        "3. Prepare for masked attention"
      ]
    },
    {
      title: "Masked Self-Attention",
      description: "Processing output sequence with masking",
      formula: "MaskedAttn(Q,K,V) = softmax(mask(QKᵀ)/√d)V",
      details: [
        "1. Create Q, K, V vectors for output",
        "2. Apply future masking",
        "3. Calculate masked attention scores",
        "4. Combine values using masked attention"
      ]
    },
    {
      title: "Cross-Attention",
      description: "Attending to encoder outputs",
      formula: "CrossAttn(Q,K,V) = softmax(QKᵀ/√d)V",
      details: [
        "1. Use decoder Q with encoder K, V",
        "2. Calculate cross-attention scores",
        "3. Combine encoder values based on scores",
        "4. Connect encoder and decoder information"
      ]
    },
    {
      title: "Feed-Forward & Output",
      description: "Final processing and generation",
      formula: "Output = softmax(FFN(CrossAttn(x)))",
      details: [
        "1. Process through feed-forward network",
        "2. Apply final linear transformation",
        "3. Generate output probabilities",
        "4. Select most likely output token"
      ]
    }
  ];

  const generateEmbeddings = (text: string): EmbeddingVector[] => {
    // Simplified embedding generation for demonstration
    return text.split(" ").map(word => ({
      word,
      vector: Array.from({ length: 4 }, () => Number((Math.random() * 2 - 1).toFixed(3)))
    }));
  };

  const calculateAttention = (embeddings: EmbeddingVector[]): number[][] => {
    const dim = embeddings.length;
    const weights = Array(dim).fill(0).map(() => 
      Array(dim).fill(0).map(() => Number((Math.random()).toFixed(2)))
    );
    
    // Normalize weights using softmax
    for (let i = 0; i < dim; i++) {
      const sum = weights[i].reduce((a, b) => a + Math.exp(b), 0);
      weights[i] = weights[i].map(w => Number((Math.exp(w) / sum).toFixed(2)));
    }
    
    return weights;
  };

  const handleProcess = () => {
    if (!inputText) return;
    
    setIsProcessing(true);
    setCurrentStep(0);
    setOutputText("");
    
    const newEmbeddings = generateEmbeddings(inputText);
    setEmbeddings(newEmbeddings);
    
    const weights = calculateAttention(newEmbeddings);
    setAttentionWeights(weights);

    const processSteps = async () => {
      const totalSteps = encoderSteps.length + decoderSteps.length;
      for (let i = 0; i < totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentStep(i);
      }
      setOutputText("¡Hola! (Example translation)");
      setIsProcessing(false);
    };

    processSteps();
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Transformer Architecture Visualization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text (e.g., 'Hello')"
              disabled={isProcessing}
            />
            <Button onClick={handleProcess} disabled={!inputText || isProcessing}>
              Process
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Output</label>
          <div className="h-10 flex items-center border rounded-md px-3 bg-muted">
            {outputText || "Translation will appear here"}
          </div>
        </div>
      </div>

      {/* Layer Processing Visualization */}
      <div className="space-y-8">
        {/* Encoder Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Encoder Layers</h3>
          <div className="space-y-4">
            {encoderSteps.map((step, index) => (
              <motion.div
                key={`encoder-${index}`}
                className={`p-4 rounded-lg ${
                  index === currentStep ? 'bg-blue-100 shadow-lg' : 'bg-white'
                }`}
                animate={{
                  scale: index === currentStep ? 1.02 : 1,
                  opacity: index <= currentStep ? 1 : 0.5
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <div className="bg-blue-200 px-3 py-1 rounded text-sm font-mono">
                    {step.formula}
                  </div>
                </div>
                <ul className="mt-2 space-y-1">
                  {step.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decoder Section */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Decoder Layers</h3>
          <div className="space-y-4">
            {decoderSteps.map((step, index) => (
              <motion.div
                key={`decoder-${index}`}
                className={`p-4 rounded-lg ${
                  index + encoderSteps.length === currentStep ? 'bg-green-100 shadow-lg' : 'bg-white'
                }`}
                animate={{
                  scale: index + encoderSteps.length === currentStep ? 1.02 : 1,
                  opacity: index + encoderSteps.length <= currentStep ? 1 : 0.5
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <div className="bg-green-200 px-3 py-1 rounded text-sm font-mono">
                    {step.formula}
                  </div>
                </div>
                <ul className="mt-2 space-y-1">
                  {step.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Embeddings Visualization */}
      <AnimatePresence>
        {embeddings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-muted p-4 rounded-lg"
          >
            <h3 className="font-semibold mb-2">Word Embeddings:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {embeddings.map((embed, i) => (
                <div key={i} className="bg-white p-3 rounded shadow-sm">
                  <span className="font-medium">{embed.word}:</span>
                  <div className="text-sm text-muted-foreground">
                    [{embed.vector.join(", ")}]
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attention Weights Visualization */}
      <AnimatePresence>
        {attentionWeights.length > 0 && currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-muted p-4 rounded-lg"
          >
            <h3 className="font-semibold mb-2">Attention Weights:</h3>
            <div className="grid grid-cols-1 gap-2">
              {attentionWeights.map((row, i) => (
                <div key={i} className="flex gap-2">
                  {row.map((weight, j) => (
                    <div
                      key={j}
                      className="w-12 h-12 flex items-center justify-center rounded"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${weight})`,
                        color: weight > 0.5 ? "white" : "black",
                      }}
                    >
                      {weight}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default TransformerVisualization;
