import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NeuralNetworkDisplay from "./visualization/NeuralNetworkDisplay";
import TokenDisplay from "./visualization/TokenDisplay";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import LayerVisualizer from "./visualization/LayerVisualizer";
import AttentionPatternView from "./visualization/AttentionPatternView";
import { getTransformerLayers } from "./utils/neuralNetworkUtils";
import { supabase } from "@/integrations/supabase/client";
import type { LayerData } from "./utils/neuralNetworkUtils";

const VisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [selectedTab, setSelectedTab] = useState("network");
  const [layers, setLayers] = useState<LayerData[]>([]);
  const [inputTokens, setInputTokens] = useState<string[]>([]);
  const [outputTokens, setOutputTokens] = useState<string[]>([]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([[0]]);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (inputText) {
      const tokens = inputText.split(" ");
      setInputTokens(tokens);
      setLayers(getTransformerLayers(tokens.length));
      setIsProcessingComplete(false);
      setOutputTokens([]);
      
      // Generate initial attention weights matrix with proper dimensions
      const weights = Array(tokens.length).fill(0).map(() => 
        Array(tokens.length).fill(0).map(() => Math.random())
      );
      setAttentionWeights(weights.length > 0 ? weights : [[0]]);
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
              
              // Update attention weights safely
              setAttentionWeights(prev => {
                const newWeights = [...prev];
                if (newWeights[currentStep]) {
                  newWeights[currentStep] = newWeights[currentStep].map(() => Math.random());
                }
                return newWeights;
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
  }, [isPlaying, speed, layers, inputTokens, currentStep]);

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
        
        // Update attention weights safely
        setAttentionWeights(prev => {
          const newWeights = [...prev];
          if (newWeights[currentStep]) {
            newWeights[currentStep] = newWeights[currentStep].map(() => Math.random());
          }
          return newWeights;
        });
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

  const saveVisualization = async () => {
    try {
      const { data, error } = await supabase
        .from('transformer_visualizations')
        .insert({
          input_text: inputText,
          tokens: { input: inputTokens, output: outputTokens },
          attention_weights: attentionWeights,
          layer_outputs: layers.map(layer => ({
            name: layer.name,
            neurons: layer.neurons,
            weights: layer.weights
          }))
        });

      if (error) throw error;

      toast({
        title: "Visualization Saved",
        description: "You can access this visualization later",
      });
    } catch (error) {
      console.error('Error saving visualization:', error);
      toast({
        title: "Error Saving",
        description: "Failed to save visualization",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">
            Interactive Transformer Architecture
          </h2>
          <p className="text-gray-600">
            Explore and understand the Transformer architecture through this interactive visualization.
            Watch how tokens flow through different layers with actual numeric values and attention patterns.
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
            onSave={saveVisualization}
          />
          <StatusPanel 
            speed={speed}
            currentStep={currentStep}
            totalSteps={layers?.length || 0}
            isPlaying={isPlaying}
            selectedLayer={layers?.[selectedLayer]}
          />
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:max-w-[400px]">
            <TabsTrigger value="network">Network View</TabsTrigger>
            <TabsTrigger value="layers">Layer View</TabsTrigger>
            <TabsTrigger value="attention">Attention View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="network" className="mt-6">
            <Card className="p-4">
              <TokenDisplay
                inputTokens={inputTokens}
                outputTokens={outputTokens}
                currentStep={currentStep}
                attentionWeights={attentionWeights}
              />
              <div className="mt-6">
                <NeuralNetworkDisplay
                  layers={layers}
                  currentStep={currentStep}
                  onLayerSelect={handleLayerSelect}
                  inputTokens={inputTokens}
                  outputTokens={outputTokens}
                  attentionWeights={attentionWeights}
                />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="layers" className="mt-6">
            <LayerVisualizer
              layer={layers[selectedLayer]}
              currentStep={currentStep}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              attentionWeights={attentionWeights}
            />
          </TabsContent>
          
          <TabsContent value="attention" className="mt-6">
            <AttentionPatternView
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              attentionWeights={attentionWeights}
              currentStep={currentStep}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default VisualPlayground;