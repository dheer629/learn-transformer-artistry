
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import NetworkView from "./visualization/views/NetworkView";
import LayerView from "./visualization/views/LayerView";
import AttentionView from "./visualization/views/AttentionView";
import { getTransformerLayers, computeAttentionScores } from "./utils/neuralNetworkUtils";
import type { LayerData } from "./types/neuralNetworkTypes";
import { motion, AnimatePresence } from "framer-motion";

const VisualPlayground: React.FC = () => {
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

  // Memoize transformer layers computation
  const initializeTransformerLayers = useCallback((tokens: string[]) => {
    const newLayers = getTransformerLayers(tokens.length);
    setLayers(newLayers);
    setIsProcessingComplete(false);
    setOutputTokens([]);
    setCurrentStep(0);
    
    const initialWeights = Array(tokens.length).fill(0).map(() => 
      Array(tokens.length).fill(0).map(() => 0.1)
    );
    setAttentionWeights(initialWeights.length > 0 ? initialWeights : [[0]]);
  }, []);

  useEffect(() => {
    if (inputText) {
      const tokens = inputText.split(" ");
      setInputTokens(tokens);
      initializeTransformerLayers(tokens);
    }
  }, [inputText, initializeTransformerLayers]);

  const processStep = useCallback((step: number) => {
    if (!layers.length) return;

    const midPoint = Math.floor(layers.length / 2);
    
    if (step >= midPoint && inputTokens[step - midPoint]) {
      setOutputTokens(prevTokens => {
        const newToken = inputTokens[step - midPoint];
        return [...prevTokens, newToken];
      });
      
      if (layers[step].attention_heads) {
        const queries = layers[step].weights?.[0] || [];
        const keys = layers[step].weights?.[1] || [];
        const values = layers[step].weights?.[2] || [];
        
        const newWeights = computeAttentionScores([queries], [keys], [values]);
        
        setAttentionWeights(prev => {
          const updated = [...prev];
          if (updated[step]) {
            updated[step] = newWeights[0];
          }
          return updated;
        });
      }
    }
    
    if (step === layers.length - 1) {
      setIsPlaying(false);
      setIsProcessingComplete(true);
      toast({
        title: "Processing Complete",
        description: "All transformer layers have been processed",
      });
    }
  }, [layers, inputTokens, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && layers.length > 0) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep < layers.length) {
            processStep(nextStep);
            return nextStep;
          }
          return prev;
        });
      }, 2000 / speed);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, speed, layers, processStep]);

  const handleSpeedChange = useCallback((value: number[]) => {
    setSpeed(value[0]);
    toast({
      title: "Animation Speed Updated",
      description: `Speed set to ${value[0]}x`,
    });
  }, [toast]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleNextStep = useCallback(() => {
    if (layers.length > 0 && currentStep < layers.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      processStep(nextStep);
    }
  }, [currentStep, layers, processStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setOutputTokens([]);
    setIsProcessingComplete(false);
    toast({
      title: "Visualization Reset",
      description: "Starting from the beginning",
    });
  }, [toast]);

  const handleLayerSelect = useCallback((layerIndex: number) => {
    setSelectedLayer(layerIndex);
    setCurrentStep(layerIndex);
    
    if (layers[layerIndex]) {
      toast({
        title: `Layer ${layerIndex + 1} Selected`,
        description: `Viewing ${layers[layerIndex].name} with ${layers[layerIndex].neurons} neurons`,
      });
    }
  }, [layers, toast]);

  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
      className="space-y-6 max-w-7xl mx-auto"
    >
      <Card className="p-6 space-y-6 bg-gradient-to-br from-white to-gray-50">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">
            Interactive Transformer Architecture
          </h2>
          <p className="text-gray-600">
            Explore and understand the Transformer architecture through this interactive visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:max-w-[400px]">
            <TabsTrigger value="network">Network View</TabsTrigger>
            <TabsTrigger value="layers">Layer View</TabsTrigger>
            <TabsTrigger value="attention">Attention View</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="network" className="mt-4">
                <NetworkView
                  layers={layers}
                  currentStep={currentStep}
                  onLayerSelect={handleLayerSelect}
                  inputTokens={inputTokens}
                  outputTokens={outputTokens}
                  attentionWeights={attentionWeights}
                />
              </TabsContent>
              
              <TabsContent value="layers" className="mt-4">
                <LayerView
                  selectedLayer={layers[selectedLayer]}
                  currentStep={currentStep}
                  inputTokens={inputTokens}
                  outputTokens={outputTokens}
                  attentionWeights={attentionWeights}
                />
              </TabsContent>
              
              <TabsContent value="attention" className="mt-4">
                <AttentionView
                  inputTokens={inputTokens}
                  outputTokens={outputTokens}
                  attentionWeights={attentionWeights}
                  currentStep={currentStep}
                />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default VisualPlayground;
