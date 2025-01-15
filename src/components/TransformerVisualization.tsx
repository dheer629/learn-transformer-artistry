import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const TransformerVisualization = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Input Processing",
      description: "The sentence is broken down into individual words or tokens.",
    },
    {
      title: "Self-Attention",
      description: "Each word looks at other words to understand context and relationships.",
    },
    {
      title: "Encoding",
      description: "The information is encoded into a rich representation.",
    },
    {
      title: "Decoding",
      description: "The encoded information is transformed into the desired output.",
    },
  ];

  const handleProcess = () => {
    if (!inputText) return;
    
    setIsProcessing(true);
    setCurrentStep(0);
    setOutputText("");

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
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Transformer in Action</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

      <div className="relative">
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
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep && isProcessing ? "bg-primary text-white" : "bg-gray-200"
                }`}
                animate={{
                  scale: index === currentStep && isProcessing ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
              >
                {index + 1}
              </motion.div>
              <div className="absolute top-10 w-32 text-center">
                <div className="font-medium text-sm">{step.title}</div>
                <div className="text-xs mt-1">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TransformerVisualization;