import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";
import EncoderLayer from "./transformer/EncoderLayer";
import DecoderLayer from "./transformer/DecoderLayer";
import EmbeddingsVisualization from "./transformer/EmbeddingsVisualization";
import AttentionVisualization from "./transformer/AttentionVisualization";
import type { EmbeddingVector, LayerStep, LayerOutput } from "./transformer/types";

const TransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [embeddings, setEmbeddings] = useState<EmbeddingVector[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  const [layerOutputs, setLayerOutputs] = useState<LayerOutput[]>([]);

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

  const generatePositionalEncoding = (position: number, dim: number): number[] => {
    return Array.from({ length: dim }, (_, i) => {
      const angle = position / Math.pow(10000, (2 * Math.floor(i / 2)) / dim);
      return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
    });
  };

  const generateEmbeddings = (text: string): EmbeddingVector[] => {
    return text.split(" ").map((word, position) => {
      const baseVector = Array.from(
        { length: 4 }, 
        () => Number((Math.random() * 2 - 1).toFixed(3))
      );
      const positionalVector = generatePositionalEncoding(position, 4);
      
      const contextualVector = baseVector.map(
        (v, i) => Number((v + positionalVector[i]).toFixed(3))
      );
      
      return {
        word,
        vector: baseVector,
        positionalVector,
        contextualVector
      };
    });
  };

  const generateLayerOutput = (
    inputEmbeddings: EmbeddingVector[],
    step: number
  ): LayerOutput => {
    const dim = inputEmbeddings.length;
    const vectorDim = 4;

    const generateRandomVectors = () => 
      Array(dim).fill(0).map(() => 
        Array(vectorDim).fill(0).map(() => 
          Number((Math.random() * 2 - 1).toFixed(3))
        )
      );

    const queryVectors = generateRandomVectors();
    const keyVectors = generateRandomVectors();
    const valueVectors = generateRandomVectors();

    const weights = Array(dim).fill(0).map(() => 
      Array(dim).fill(0).map(() => 
        Number((Math.random()).toFixed(2))
      )
    );

    const weightedSum = queryVectors.map(vec => 
      vec.map(v => Number((v * Math.random()).toFixed(3)))
    );

    const outputEmbeddings = inputEmbeddings.map(embed => ({
      ...embed,
      contextualVector: weightedSum[0]
    }));

    return {
      inputEmbeddings,
      outputEmbeddings,
      attentionWeights: weights,
      intermediateOutputs: {
        queryVectors,
        keyVectors,
        valueVectors,
        weightedSum
      }
    };
  };

  const handleProcess = () => {
    if (!inputText) return;
    
    setIsProcessing(true);
    setCurrentStep(0);
    setOutputText("");
    
    const newEmbeddings = generateEmbeddings(inputText);
    setEmbeddings(newEmbeddings);
    
    const weights = Array(newEmbeddings.length).fill(0).map(() => 
      Array(newEmbeddings.length).fill(0).map(() => 
        Number((Math.random()).toFixed(2))
      )
    );
    setAttentionWeights(weights);

    const outputs: LayerOutput[] = [];
    const totalSteps = encoderSteps.length + decoderSteps.length;
    
    const processSteps = async () => {
      for (let i = 0; i < totalSteps; i++) {
        const output = generateLayerOutput(newEmbeddings, i);
        outputs.push(output);
        setLayerOutputs([...outputs]);
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
      <h2 className="text-2xl font-bold text-primary mb-4">
        Transformer Architecture Visualization
      </h2>
      
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

      <div className="space-y-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Encoder Layers</h3>
          <div className="space-y-4">
            {encoderSteps.map((step, index) => (
              <EncoderLayer
                key={`encoder-${index}`}
                step={step}
                index={index}
                currentStep={currentStep}
                layerOutput={layerOutputs[index]}
              />
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Decoder Layers</h3>
          <div className="space-y-4">
            {decoderSteps.map((step, index) => (
              <DecoderLayer
                key={`decoder-${index}`}
                step={step}
                index={index}
                currentStep={currentStep}
                encoderStepsLength={encoderSteps.length}
                layerOutput={layerOutputs[index + encoderSteps.length]}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        <EmbeddingsVisualization 
          embeddings={embeddings}
          currentStep={currentStep}
        />
        <AttentionVisualization 
          attentionWeights={attentionWeights}
          currentStep={currentStep}
        />
      </AnimatePresence>
    </Card>
  );
};

export default TransformerVisualization;
