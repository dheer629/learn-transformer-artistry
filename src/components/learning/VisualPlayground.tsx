
import React, { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import NetworkView from "./visualization/views/NetworkView";
import LayerView from "./visualization/views/LayerView";
import AttentionView from "./visualization/views/AttentionView";
import { useVisualPlayground } from "./hooks/useVisualPlayground";
import { useVisualPlaygroundAnimations } from "./hooks/useVisualPlaygroundAnimations";
import { motion, AnimatePresence } from "framer-motion";

const VisualPlayground: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("network");
  
  const {
    isPlaying,
    speed,
    currentStep,
    inputText,
    selectedLayer,
    layers,
    inputTokens,
    outputTokens,
    attentionWeights,
    setInputText,
    handleSpeedChange,
    handlePlayPause,
    handleNextStep,
    handleReset,
    handleLayerSelect
  } = useVisualPlayground();

  const { containerAnimation, tabContentAnimation } = useVisualPlaygroundAnimations();

  // Memoize props for child components
  const controlPanelProps = useMemo(() => ({
    inputText,
    setInputText,
    speed,
    handleSpeedChange,
    isPlaying,
    handlePlayPause,
    handleNextStep,
    handleReset,
    currentStep,
    maxSteps: layers.length - 1
  }), [
    inputText,
    speed,
    isPlaying,
    currentStep,
    layers.length,
    handleSpeedChange,
    handlePlayPause,
    handleNextStep,
    handleReset
  ]);

  const statusPanelProps = useMemo(() => ({
    speed,
    currentStep,
    totalSteps: layers?.length || 0,
    isPlaying,
    selectedLayer: layers?.[selectedLayer]
  }), [speed, currentStep, layers, isPlaying, selectedLayer]);

  const networkViewProps = useMemo(() => ({
    layers,
    currentStep,
    onLayerSelect: handleLayerSelect,
    inputTokens,
    outputTokens,
    attentionWeights
  }), [layers, currentStep, handleLayerSelect, inputTokens, outputTokens, attentionWeights]);

  const layerViewProps = useMemo(() => ({
    selectedLayer: layers[selectedLayer],
    currentStep,
    inputTokens,
    outputTokens,
    attentionWeights
  }), [layers, selectedLayer, currentStep, inputTokens, outputTokens, attentionWeights]);

  const attentionViewProps = useMemo(() => ({
    inputTokens,
    outputTokens,
    attentionWeights,
    currentStep
  }), [inputTokens, outputTokens, attentionWeights, currentStep]);

  const handleTabChange = useCallback((value: string) => {
    setSelectedTab(value);
  }, []);

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
          <ControlPanel {...controlPanelProps} />
          <StatusPanel {...statusPanelProps} />
        </div>

        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:max-w-[400px]">
            <TabsTrigger value="network">Network View</TabsTrigger>
            <TabsTrigger value="layers">Layer View</TabsTrigger>
            <TabsTrigger value="attention">Attention View</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              {...tabContentAnimation}
            >
              <TabsContent value="network" className="mt-4">
                <NetworkView {...networkViewProps} />
              </TabsContent>
              
              <TabsContent value="layers" className="mt-4">
                <LayerView {...layerViewProps} />
              </TabsContent>
              
              <TabsContent value="attention" className="mt-4">
                <AttentionView {...attentionViewProps} />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default React.memo(VisualPlayground);

