
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import NetworkView from "./visualization/views/NetworkView";
import LayerView from "./visualization/views/LayerView";
import AttentionView from "./visualization/views/AttentionView";
import { useVisualPlayground } from "./hooks/useVisualPlayground";
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

  // Memoize animation variants
  const containerAnimation = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }), []);

  // Memoize control panel props
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

  // Memoize status panel props
  const statusPanelProps = useMemo(() => ({
    speed,
    currentStep,
    totalSteps: layers?.length || 0,
    isPlaying,
    selectedLayer: layers?.[selectedLayer]
  }), [speed, currentStep, layers, isPlaying, selectedLayer]);

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
