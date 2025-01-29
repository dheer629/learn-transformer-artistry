import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { MathJax } from "better-react-mathjax";

const VisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");
  const { toast } = useToast();

  const transformerSteps = [
    {
      title: "Input Embedding",
      description: "Convert input tokens to vectors",
      formula: "E(x) = WᵉX",
      values: [0.2, 0.5, 0.8, 0.3],
      details: "Converting words into numerical vectors that capture meaning",
      animation: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5 }
      }
    },
    {
      title: "Positional Encoding",
      description: "Add position information",
      formula: "PE(pos,2i) = sin(pos/10000^{2i/d})",
      values: [0.4, 0.6, 0.9, 0.5],
      details: "Adding position information to each token vector",
      animation: {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5 }
      }
    },
    {
      title: "Self-Attention",
      description: "Calculate attention scores",
      formula: "Attention(Q,K,V) = softmax(QK^T/√d)V",
      values: [0.7, 0.8, 0.4, 0.6],
      details: "Computing relationships between all tokens",
      animation: {
        initial: { rotate: -10, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
        transition: { duration: 0.5 }
      }
    },
    {
      title: "Feed Forward",
      description: "Process through neural network",
      formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
      values: [0.9, 0.3, 0.5, 0.7],
      details: "Transforming token representations through neural layers",
      animation: {
        initial: { scale: 1.2, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5 }
      }
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < transformerSteps.length - 1) {
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

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
          </div>
        ),
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    toast({
      title: "Visualization Reset",
      description: "Starting from the beginning",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">
            Interactive Transformer Architecture
          </h2>
          <p className="text-gray-600">
            Explore and understand the Transformer architecture through this interactive visualization.
            Watch how data flows through different layers and components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">Controls</h3>
            <div className="space-y-4">
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
                {transformerSteps[currentStep].details}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <MathJax>
                  <p className="font-mono text-sm">
                    {transformerSteps[currentStep].formula}
                  </p>
                </MathJax>
              </div>
              
              <motion.div 
                className="grid grid-cols-4 gap-4"
                {...transformerSteps[currentStep].animation}
              >
                {transformerSteps[currentStep].values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: value * 200 }}
                    transition={{ duration: 0.5 * speed }}
                    className="bg-blue-500 rounded-t-lg"
                  />
                ))}
              </motion.div>
              
              <div className="grid grid-cols-4 gap-4 mt-2">
                {transformerSteps[currentStep].values.map((value, index) => (
                  <div key={index} className="text-center text-sm text-gray-600">
                    {value.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-3">How to Use</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use the play/pause button to control the animation</li>
            <li>• Click next step to move through the transformation process</li>
            <li>• Adjust the speed slider to control animation speed</li>
            <li>• Reset to start over from the beginning</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default VisualPlayground;