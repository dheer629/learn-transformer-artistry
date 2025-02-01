import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import NeuralNetworkDisplay from "./visualization/NeuralNetworkDisplay";
import TokenDisplay from "./visualization/TokenDisplay";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
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
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (inputText) {
      const tokens = inputText.split(" ");
      setInputTokens(tokens);
      setLayers(getTransformerLayers(tokens.length));
      setIsProcessingComplete(false);
      setOutputTokens([]);
    }
  }, [inputText]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && layers && layers.length > 0) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const maxStep = layers.length - 1;
          if (prev < maxStep) {
            const midPoint = Math.floor(layers.length / 2);
            if (prev >= midPoint && inputTokens[prev - midPoint]) {
              setOutputTokens(prevTokens => {
                const newToken = inputTokens[prev - midPoint];
                return [...prevTokens, newToken];
              });
            }
            return prev + 1;
          }
          setIsPlaying(false);
          setIsProcessingComplete(true);
          return prev;
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, layers, inputTokens]);

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
    if (layers && layers.length > 0 && currentStep < layers.length - 1) {
      setCurrentStep(prev => prev + 1);
      const midPoint = Math.floor(layers.length / 2);
      if (currentStep >= midPoint && inputTokens[currentStep - midPoint]) {
        const newToken = inputTokens[currentStep - midPoint];
        setOutputTokens(prev => [...prev, newToken]);
      }
      if (currentStep === layers.length - 2) {
        setIsProcessingComplete(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setOutputTokens([]);
    setIsProcessingComplete(false);
    toast({
      title: "Visualization Reset",
      description: "Starting from the beginning",
    });
  };

  const handleLayerSelect = (layerIndex: number) => {
    setSelectedLayer(layerIndex);
    setCurrentStep(layerIndex);
    
    if (layers[layerIndex]) {
      toast({
        title: `Layer ${layerIndex + 1} Selected`,
        description: `Viewing ${layers[layerIndex].name}`,
      });
    }
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
          <ControlPanel 
            inputText={inputText}
            setInputText={setInputText}
            speed={speed}
            handleSpeedChange={handleSpeedChange}
            isPlaying={isPlaying}
            handlePlayPause={handlePlayPause}
            handleNextStep={handleNextStep}
            handleReset={handleReset}
            currentStep={currentStep}
            maxSteps={layers.length - 1}
          />
          <StatusPanel 
            speed={speed}
            currentStep={currentStep}
            totalSteps={layers?.length || 0}
            isPlaying={isPlaying}
            selectedLayer={layers?.[selectedLayer]}
          />
        </div>

        <Card className="p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-4">Token Processing</h3>
          <TokenDisplay
            inputTokens={inputTokens}
            outputTokens={outputTokens}
            currentStep={currentStep}
          />
        </Card>

        <NeuralNetworkDisplay
          layers={layers}
          currentStep={currentStep}
          onLayerSelect={handleLayerSelect}
          inputTokens={inputTokens}
          outputTokens={outputTokens}
        />

        {layers?.[selectedLayer]?.weights && (
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