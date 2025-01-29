import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { MathJax } from "better-react-mathjax";
import { processStep } from "./utils/vectorCalculations";
import type { VectorData } from "./utils/vectorCalculations";

const VisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");
  const [vectorData, setVectorData] = useState<VectorData>({ values: [], attention: [], position: [] });
  const { toast } = useToast();

  const transformerSteps = [
    {
      title: "Input Embedding",
      description: "Convert input tokens to vectors",
      formula: "E(x) = WᵉX",
      details: "Converting words into numerical vectors that capture meaning",
      explanation: "Each word is converted into a vector of dimension 8 using a hash-based embedding function. These vectors represent the semantic meaning of the words."
    },
    {
      title: "Positional Encoding",
      description: "Add position information",
      formula: "PE(pos,2i) = sin(pos/10000^{2i/d})",
      details: "Adding position information to each token vector",
      explanation: "Sinusoidal position encodings are added to the embeddings to give the model information about token positions."
    },
    {
      title: "Self-Attention",
      description: "Calculate attention scores",
      formula: "Attention(Q,K,V) = softmax(QK^T/√d)V",
      details: "Computing relationships between all tokens",
      explanation: "Attention weights are calculated using scaled dot-product attention, showing how much each token attends to others."
    },
    {
      title: "Feed Forward",
      description: "Process through neural network",
      formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
      details: "Transforming token representations through neural layers",
      explanation: "Vectors are processed through a two-layer feed-forward network with ReLU activation."
    }
  ];

  useEffect(() => {
    if (inputText) {
      const initialData = processStep(inputText, 0);
      setVectorData(initialData);
    }
  }, [inputText]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < transformerSteps.length - 1) {
            const nextData = processStep(inputText, prev + 1);
            setVectorData(nextData);
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, inputText]);

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
    toast({
      title: "Animation Speed Updated",
      description: `Speed set to ${value[0]}x`,
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextStep = () => {
    if (currentStep < transformerSteps.length - 1) {
      const nextData = processStep(inputText, currentStep + 1);
      setVectorData(nextData);
      setCurrentStep(prev => prev + 1);
      
      const nextStep = transformerSteps[currentStep + 1];
      toast({
        title: nextStep.title,
        description: (
          <div className="space-y-2">
            <p>{nextStep.description}</p>
            <MathJax>
              <p className="font-mono text-sm">{nextStep.formula}</p>
            </MathJax>
            <p className="text-sm text-muted-foreground">{nextStep.explanation}</p>
          </div>
        ),
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (inputText) {
      const initialData = processStep(inputText, 0);
      setVectorData(initialData);
    }
    toast({
      title: "Visualization Reset",
      description: "Starting from the beginning",
    });
  };

  const renderVectorVisualization = (data: VectorData) => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {data.values.map((value, index) => (
          <motion.div
            key={`value-${index}`}
            initial={{ height: 0 }}
            animate={{ height: value * 200 }}
            className="bg-blue-500 rounded-t-lg"
          />
        ))}
      </div>
      
      {currentStep >= 1 && (
        <div className="grid grid-cols-4 gap-4">
          {data.position.map((value, index) => (
            <motion.div
              key={`position-${index}`}
              initial={{ height: 0 }}
              animate={{ height: Math.abs(value) * 200 }}
              className="bg-green-500 rounded-t-lg"
            />
          ))}
        </div>
      )}
      
      {currentStep >= 2 && (
        <div className="grid grid-cols-4 gap-4">
          {data.attention.map((value, index) => (
            <motion.div
              key={`attention-${index}`}
              initial={{ height: 0 }}
              animate={{ height: value * 200 }}
              className="bg-purple-500 rounded-t-lg"
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">
            Interactive Transformer Architecture
          </h2>
          <p className="text-gray-600">
            Explore and understand the Transformer architecture through this interactive visualization.
            Watch how vectors are processed through different layers with actual numeric values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">Controls</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Input Text
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Animation Speed
                </label>
                <Slider
                  defaultValue={[1]}
                  max={2}
                  min={0.1}
                  step={0.1}
                  onValueChange={handleSpeedChange}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextStep}
                  disabled={currentStep >= transformerSteps.length - 1}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50">
            <h3 className="font-semibold mb-3">Current Status</h3>
            <div className="space-y-2 text-sm">
              <p>Speed: {speed}x</p>
              <p>Current Step: {currentStep + 1}/{transformerSteps.length}</p>
              <p>Status: {isPlaying ? "Playing" : "Paused"}</p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Vector Information:</h4>
                <div className="bg-white p-2 rounded text-xs font-mono">
                  <p>Dimensions: {vectorData.values.length}</p>
                  <p>Max Value: {Math.max(...vectorData.values).toFixed(4)}</p>
                  <p>Min Value: {Math.min(...vectorData.values).toFixed(4)}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-4">
              {transformerSteps[currentStep].title}
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                {transformerSteps[currentStep].explanation}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <MathJax>
                  <p className="font-mono text-sm">
                    {transformerSteps[currentStep].formula}
                  </p>
                </MathJax>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Value Vectors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {vectorData.values.map((value, i) => (
                      <motion.div
                        key={`value-${i}`}
                        initial={{ height: 0 }}
                        animate={{ height: Math.abs(value) * 100 }}
                        className="bg-blue-500 rounded-t-lg"
                        title={`Value: ${value.toFixed(4)}`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-xs font-mono">
                    [{vectorData.values.map(v => v.toFixed(4)).join(', ')}]
                  </div>
                </div>

                {currentStep >= 1 && (
                  <div>
                    <h4 className="font-medium mb-2">Position Encodings</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {vectorData.position.map((value, i) => (
                        <motion.div
                          key={`position-${i}`}
                          initial={{ height: 0 }}
                          animate={{ height: Math.abs(value) * 100 }}
                          className="bg-green-500 rounded-t-lg"
                          title={`Value: ${value.toFixed(4)}`}
                        />
                      ))}
                    </div>
                    <div className="mt-2 text-xs font-mono">
                      [{vectorData.position.map(v => v.toFixed(4)).join(', ')}]
                    </div>
                  </div>
                )}

                {currentStep >= 2 && (
                  <div>
                    <h4 className="font-medium mb-2">Attention Weights</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {vectorData.attention.map((value, i) => (
                        <motion.div
                          key={`attention-${i}`}
                          initial={{ height: 0 }}
                          animate={{ height: value * 100 }}
                          className="bg-purple-500 rounded-t-lg"
                          title={`Value: ${value.toFixed(4)}`}
                        />
                      ))}
                    </div>
                    <div className="mt-2 text-xs font-mono">
                      [{vectorData.attention.map(v => v.toFixed(4)).join(', ')}]
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default VisualPlayground;
