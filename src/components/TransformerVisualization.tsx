import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface EmbeddingVector {
  word: string;
  vector: number[];
}

const TransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [embeddings, setEmbeddings] = useState<EmbeddingVector[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);

  const steps = [
    {
      title: "Input Embedding",
      description: "Converting words into numerical vectors",
      formula: "E(x) = WᵉX + PE",
    },
    {
      title: "Self-Attention",
      description: "Computing attention scores between words",
      formula: "Attention(Q,K,V) = softmax(QKᵀ/√d)V",
    },
    {
      title: "Feed-Forward Network",
      description: "Processing through neural network layers",
      formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
    },
    {
      title: "Output Generation",
      description: "Producing final translation",
      formula: "Output = softmax(FFN(MultiHead(X)))",
    },
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
    
    // Generate embeddings for visualization
    const newEmbeddings = generateEmbeddings(inputText);
    setEmbeddings(newEmbeddings);
    
    // Calculate attention weights
    const weights = calculateAttention(newEmbeddings);
    setAttentionWeights(weights);

    // Simulate processing steps
    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
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

      {/* Processing Steps Visualization */}
      <div className="relative mt-8">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200" />
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center ${
                index <= currentStep && isProcessing ? "text-primary" : "text-gray-400"
              }`}
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep && isProcessing ? "bg-primary text-white" : "bg-gray-200"
                }`}
                animate={{
                  scale: index === currentStep && isProcessing ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
              >
                {index + 1}
              </motion.div>
              <div className="absolute top-12 w-32 text-center">
                <div className="font-medium text-sm">{step.title}</div>
                <div className="text-xs mt-1">{step.description}</div>
                <div className="text-xs mt-1 font-mono bg-muted p-1 rounded">
                  {step.formula}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TransformerVisualization;