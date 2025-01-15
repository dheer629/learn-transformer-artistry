import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider"; 
import { AnimatePresence } from "framer-motion";
import EncoderLayer from "./transformer/EncoderLayer";
import DecoderLayer from "./transformer/DecoderLayer";
import EmbeddingsVisualization from "./transformer/EmbeddingsVisualization";
import AttentionVisualization from "./transformer/AttentionVisualization";
import { encoderSteps, decoderSteps } from "./transformer/config/transformerSteps";
import { generateEmbeddings, generateLayerOutput } from "./transformer/utils/transformerUtils";
import type { EmbeddingVector, LayerOutput } from "./transformer/types";

const TransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [learningRate, setLearningRate] = useState(0.1);
  const [embeddings, setEmbeddings] = useState<EmbeddingVector[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  const [layerOutputs, setLayerOutputs] = useState<LayerOutput[]>([]);
  const [waitForUser, setWaitForUser] = useState(false);

  const handleContinue = () => {
    setWaitForUser(false);
    setCurrentStep(prev => prev + 1);
  };

  const handleProcess = () => {
    if (!inputText) return;
    
    setIsProcessing(true);
    setCurrentStep(0);
    setOutputText("");
    setWaitForUser(true);
    
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
        if (isPaused) {
          await new Promise(resolve => {
            const checkPause = () => {
              if (!isPaused) {
                resolve(true);
              } else {
                setTimeout(checkPause, 100);
              }
            };
            checkPause();
          });
        }

        const output = generateLayerOutput(newEmbeddings, i);
        outputs.push(output);
        setLayerOutputs([...outputs]);
        
        if (waitForUser) {
          await new Promise(resolve => {
            const checkContinue = () => {
              if (!waitForUser) {
                resolve(true);
              } else {
                setTimeout(checkContinue, 100);
              }
            };
            checkContinue();
          });
        }

        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
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
        <div className="space-y-4">
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
            <label className="block text-sm font-medium mb-2">Learning Rate</label>
            <Slider
              value={[learningRate]}
              onValueChange={(value) => setLearningRate(value[0])}
              min={0.01}
              max={1}
              step={0.01}
              disabled={isProcessing}
            />
            <div className="text-sm text-muted-foreground mt-1">
              Current: {learningRate}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Output</label>
          <div className="h-10 flex items-center border rounded-md px-3 bg-muted">
            {outputText || "Translation will appear here"}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 my-4">
        <Button
          variant="outline"
          onClick={() => setIsPaused(!isPaused)}
          disabled={!isProcessing}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!waitForUser || !isProcessing}
        >
          Continue to Next Step
        </Button>
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