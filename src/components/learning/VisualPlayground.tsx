
import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import { useVisualPlayground } from "./hooks/useVisualPlayground";
import { useVisualPlaygroundAnimations } from "./hooks/useVisualPlaygroundAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load views to improve initial load time
const NetworkView = lazy(() => import("./visualization/views/NetworkView"));
const LayerView = lazy(() => import("./visualization/views/LayerView"));
const AttentionView = lazy(() => import("./visualization/views/AttentionView"));

const LoadingFallback = () => (
  <div className="space-y-4">
    <Skeleton className="h-[400px] w-full" />
  </div>
);

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
                <Suspense fallback={<LoadingFallback />}>
                  <NetworkView {...networkViewProps} />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="layers" className="mt-4">
                <Suspense fallback={<LoadingFallback />}>
                  <LayerView {...layerViewProps} />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="attention" className="mt-4">
                <Suspense fallback={<LoadingFallback />}>
                  <AttentionView {...attentionViewProps} />
                </Suspense>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default React.memo(VisualPlayground);
