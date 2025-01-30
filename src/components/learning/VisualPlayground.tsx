import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import NeuralNetworkDisplay from "./visualization/NeuralNetworkDisplay";
import TokenDisplay from "./visualization/TokenDisplay";
import { getTransformerLayers } from "./utils/neuralNetworkUtils";
import type { LayerData } from "./utils/neuralNetworkUtils";

const VisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [layers, setLayers] = useState<LayerData[]>([]);
  const [inputTokens, setInputTokens] = useState<string[]>([]);
  const [outputTokens, setOutputTokens] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (inputText) {
      const tokens = inputText.split(" ");
      setInputTokens(tokens);
      setLayers(getTransformerLayers(tokens.length));
    }
  }, [inputText]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && layers.length > 0) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < layers.length - 1) {
            // Generate output tokens progressively
            const midPoint = Math.floor(layers.length / 2);
            if (prev >= midPoint) {
              setOutputTokens(prev => {
                const newToken = inputTokens[prev - midPoint];
                return [...prev, newToken];
              });
            }
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, layers.length, inputTokens]);

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
    if (currentStep < layers.length - 1) {
      setCurrentStep(prev => prev + 1);
      const midPoint = Math.floor(layers.length / 2);
      if (currentStep >= midPoint) {
        const newToken = inputTokens[currentStep - midPoint];
        setOutputTokens(prev => [...prev, newToken]);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setOutputTokens([]);
    toast({
      title: "Visualization Reset",
      description: "Starting from the beginning",
    });
  };

  const handleLayerSelect = (layerIndex: number) => {
    setSelectedLayer(layerIndex);
    setCurrentStep(layerIndex);
    
    toast({
      title: `Layer ${layerIndex + 1} Selected`,
      description: `Viewing ${layers[layerIndex].name}`,
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
                  disabled={currentStep >= (layers.length - 1)}
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
              <p>Current Step: {currentStep + 1}/{layers.length}</p>
              <p>Status: {isPlaying ? "Playing" : "Paused"}</p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Layer Information:</h4>
                {layers[selectedLayer] && (
                  <div className="bg-white p-2 rounded text-xs font-mono">
                    <p>Layer: {layers[selectedLayer].name}</p>
                    <p>Neurons: {layers[selectedLayer].neurons}</p>
                    {layers[selectedLayer].weights && (
                      <p>Weights Shape: [{layers[selectedLayer].weights.length}, {layers[selectedLayer].weights[0]?.length}]</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <TokenDisplay
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          currentStep={currentStep}
        />

        <NeuralNetworkDisplay
          layers={layers}
          currentStep={currentStep}
          onLayerSelect={handleLayerSelect}
        />

        {layers[selectedLayer] && layers[selectedLayer].weights && (
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-3">Weight Matrix</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <tbody>
                  {layers[selectedLayer].weights.map((row, i) => (
                    <tr key={i}>
                      {row.map((weight, j) => (
                        <td key={j} className="p-1 text-center">
                          {weight.toFixed(3)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default VisualPlayground;