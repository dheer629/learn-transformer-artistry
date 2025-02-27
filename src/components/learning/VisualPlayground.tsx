
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NeuralNetworkDisplay from "./visualization/NeuralNetworkDisplay";
import TokenDisplay from "./visualization/TokenDisplay";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import LayerVisualizer from "./visualization/LayerVisualizer";
import AttentionPatternView from "./visualization/AttentionPatternView";
import { useTransformerState } from "./hooks/useTransformerState";
import { useTransformerAnimation } from "./hooks/useTransformerAnimation";
import { useTransformerControls } from "./hooks/useTransformerControls";

const VisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");

  const {
    layers,
    inputTokens,
    outputTokens,
    setOutputTokens,
    attentionWeights,
    setAttentionWeights,
    isProcessingComplete,
    setIsProcessingComplete
  } = useTransformerState(inputText);

  const {
    speed,
    selectedLayer,
    selectedTab,
    setSelectedTab,
    handleSpeedChange,
    handleNextStep,
    handleReset,
    handleLayerSelect,
    saveVisualization
  } = useTransformerControls(
    layers,
    inputTokens,
    outputTokens,
    attentionWeights,
    setCurrentStep,
    setOutputTokens,
    setIsProcessingComplete,
    setIsPlaying,
    currentStep,
    inputText
  );

  useTransformerAnimation({
    isPlaying,
    speed,
    layers,
    currentStep,
    setCurrentStep,
    inputTokens,
    setOutputTokens,
    setAttentionWeights,
    setIsPlaying,
    setIsProcessingComplete
  });

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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

