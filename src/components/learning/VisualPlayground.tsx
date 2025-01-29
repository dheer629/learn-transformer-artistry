import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { MathJax } from "better-react-mathjax";

interface VectorData {
  values: number[];
  attention: number[];
  position: number[];
}

const VisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");
  const [vectorData, setVectorData] = useState<VectorData[]>([]);
  const { toast } = useToast();

  const transformerSteps = [
    {
      title: "Input Embedding",
      description: "Convert input tokens to vectors",
      formula: "E(x) = WᵉX",
      details: "Converting words into numerical vectors that capture meaning",
      getVectorData: (text: string): VectorData => {
        // Generate embeddings based on character codes
        const values = Array.from(text).map(char => 
          (char.charCodeAt(0) % 100) / 100
        );
        return {
          values,
          attention: Array(values.length).fill(0),
          position: Array(values.length).fill(0)
        };
      }
    },
    {
      title: "Positional Encoding",
      description: "Add position information",
      formula: "PE(pos,2i) = sin(pos/10000^{2i/d})",
      details: "Adding position information to each token vector",
      getVectorData: (prevData: VectorData): VectorData => {
        const position = prevData.values.map((_, i) => 
          Math.sin(i / Math.pow(10000, 2 * i / prevData.values.length))
        );
        return {
          values: prevData.values,
          attention: prevData.attention,
          position
        };
      }
    },
    {
      title: "Self-Attention",
      description: "Calculate attention scores",
      formula: "Attention(Q,K,V) = softmax(QK^T/√d)V",
      details: "Computing relationships between all tokens",
      getVectorData: (prevData: VectorData): VectorData => {
        // Simplified attention calculation
        const attention = prevData.values.map((val, i) => {
          const scores = prevData.values.map((other, j) => {
            const dot = val * other;
            const scale = Math.sqrt(prevData.values.length);
            return Math.exp(dot / scale);
          });
          const sum = scores.reduce((a, b) => a + b, 0);
          return scores.map(s => s / sum);
        }).flat();
        
        return {
          values: prevData.values,
          attention,
          position: prevData.position
        };
      }
    },
    {
      title: "Feed Forward",
      description: "Process through neural network",
      formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
      details: "Transforming token representations through neural layers",
      getVectorData: (prevData: VectorData): VectorData => {
        // Simplified feed-forward calculation with ReLU
        const processed = prevData.values.map(v => {
          const hidden = Math.max(0, v * 1.5 + 0.1); // W₁=1.5, b₁=0.1
          return hidden * 0.8 + 0.2; // W₂=0.8, b₂=0.2
        });
        
        return {
          values: processed,
          attention: prevData.attention,
          position: prevData.position
        };
      }
    },
  ];

  useEffect(() => {
    if (inputText) {
      const initialData = transformerSteps[0].getVectorData(inputText);
      setVectorData([initialData]);
    }
  }, [inputText]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < transformerSteps.length - 1) {
            const nextData = transformerSteps[prev + 1].getVectorData(vectorData[vectorData.length - 1]);
            setVectorData(prev => [...prev, nextData]);
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, vectorData]);

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
      const nextData = transformerSteps[currentStep + 1].getVectorData(vectorData[vectorData.length - 1]);
      setVectorData(prev => [...prev, nextData]);
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
    if (inputText) {
      const initialData = transformerSteps[0].getVectorData(inputText);
      setVectorData([initialData]);
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
            Watch how vectors are processed through different layers.
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
              
              {vectorData[currentStep] && renderVectorVisualization(vectorData[currentStep])}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-3">Vector Information</h3>
          <div className="space-y-2 text-sm">
            <p>• Blue bars represent token embeddings</p>
            <p>• Green bars show positional encodings</p>
            <p>• Purple bars indicate attention weights</p>
            <p>• Heights represent vector values (normalized)</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VisualPlayground;