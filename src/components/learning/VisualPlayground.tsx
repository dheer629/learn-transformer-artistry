
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import { useTransformerState } from "./hooks/useTransformerState";
import { useTransformerAnimation } from "./hooks/useTransformerAnimation";
import { useTransformerControls } from "./hooks/useTransformerControls";
import { PlaygroundHeader } from "./components/PlaygroundHeader";
import { HelpDialogContent } from "./components/HelpDialogContent";
import { IntroDialogContent } from "./components/IntroDialogContent";
import { VisualizationTabs } from "./components/VisualizationTabs";

const VisualPlayground = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Hello world");
  const [showHelp, setShowHelp] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const {
    layers,
    inputTokens,
    outputTokens,
    setOutputTokens,
    attentionWeights,
    setAttentionWeights,
    isProcessingComplete,
    setIsProcessingComplete,
    activeProcessingStep,
    hints,
    visualizationMode,
    setVisualizationMode
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
    saveVisualization,
    handlePlayPause
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

  const exampleInputs = [
    "Hello world",
    "The transformer architecture revolutionized NLP",
    "Attention is all you need",
    "Machine learning helps solve complex problems"
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Card className="p-6 space-y-6 bg-gradient-to-br from-white to-slate-50">
        <div className="space-y-4">
          <PlaygroundHeader 
            onHelpClick={() => setShowHelp(true)}
            onIntroClick={() => setShowIntro(true)}
          />
          
          <p className="text-gray-600">
            Explore and understand the Transformer architecture through this interactive visualization.
            Watch how tokens flow through different layers with actual attention patterns.
          </p>
          
          {hints.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start space-x-3">
              <Info className="text-amber-500 h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800 text-sm">Tips</p>
                <ul className="list-disc pl-5 text-sm text-amber-700 mt-1">
                  {hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {activeProcessingStep && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                Current: {activeProcessingStep}
              </Badge>
              {isProcessingComplete && (
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                  Processing complete
                </Badge>
              )}
            </div>
          )}
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
            exampleInputs={exampleInputs}
          />
          <StatusPanel 
            speed={speed}
            currentStep={currentStep}
            totalSteps={layers?.length || 0}
            isPlaying={isPlaying}
            selectedLayer={layers?.[selectedLayer]}
          />
        </div>

        <VisualizationTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          layers={layers}
          currentStep={currentStep}
          selectedLayer={selectedLayer}
          onLayerSelect={handleLayerSelect}
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          attentionWeights={attentionWeights}
        />
        
        <AlertDialog open={showHelp} onOpenChange={setShowHelp}>
          <AlertDialogContent className="max-w-4xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Transformer Playground Guide</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <HelpDialogContent />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button onClick={() => setShowHelp(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Got it, let's explore!
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <AlertDialog open={showIntro} onOpenChange={setShowIntro}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">Welcome to the Transformer Playground</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <IntroDialogContent />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button 
                  onClick={() => setShowIntro(false)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Start Exploring!
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
};

export default VisualPlayground;
