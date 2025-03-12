
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import NeuralNetworkDisplay from "./visualization/NeuralNetworkDisplay";
import TokenDisplay from "./visualization/TokenDisplay";
import ControlPanel from "./visualization/ControlPanel";
import StatusPanel from "./visualization/StatusPanel";
import LayerVisualizer from "./visualization/LayerVisualizer";
import AttentionPatternView from "./visualization/AttentionPatternView";
import { useTransformerState } from "./hooks/useTransformerState";
import { useTransformerAnimation } from "./hooks/useTransformerAnimation";
import { useTransformerControls } from "./hooks/useTransformerControls";
import { Info, HelpCircle, BookOpen } from "lucide-react";

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

  // Example inputs for quick selection
  const exampleInputs = [
    "Hello world",
    "The transformer architecture revolutionized NLP",
    "Attention is all you need",
    "Machine learning helps solve complex problems"
  ];

  const helpContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">How to Use the Transformer Playground</h3>
      <div className="space-y-2">
        <p className="text-sm"><span className="font-semibold">1. Enter Text:</span> Type any phrase in the input box</p>
        <p className="text-sm"><span className="font-semibold">2. Control Playback:</span> Use play/pause, step forward, or reset</p>
        <p className="text-sm"><span className="font-semibold">3. Adjust Speed:</span> Slide to change animation speed</p>
        <p className="text-sm"><span className="font-semibold">4. Switch Views:</span> Toggle between Network, Layer, and Attention views</p>
        <p className="text-sm"><span className="font-semibold">5. Select Layers:</span> Click on specific layers to see their details</p>
      </div>
      <div className="pt-2">
        <h4 className="text-md font-medium">Understanding the Visualization</h4>
        <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
          <li>Blue nodes represent input embeddings</li>
          <li>Yellow connections show attention patterns</li>
          <li>Green nodes represent transformed outputs</li>
          <li>Line thickness indicates connection strength</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Card className="p-6 space-y-6 bg-gradient-to-br from-white to-slate-50">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary">
              Interactive Transformer Architecture
            </h2>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => setShowHelp(true)}
                      className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                    >
                      <HelpCircle size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How to use this playground</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => setShowIntro(true)}
                      className="p-2 rounded-full bg-purple-50 text-purple-500 hover:bg-purple-100 transition-colors"
                    >
                      <BookOpen size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn about transformers</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
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

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:max-w-[400px]">
            <TabsTrigger value="network" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Network View
            </TabsTrigger>
            <TabsTrigger value="layers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Layer View
            </TabsTrigger>
            <TabsTrigger value="attention" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Attention View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="network" className="mt-6">
            <Card className="p-4 border border-blue-100 shadow-sm">
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
            <Card className="border border-green-100 shadow-sm">
              <LayerVisualizer
                layer={layers[selectedLayer]}
                currentStep={currentStep}
                inputTokens={inputTokens}
                outputTokens={outputTokens}
                attentionWeights={attentionWeights}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="attention" className="mt-6">
            <Card className="border border-purple-100 shadow-sm">
              <AttentionPatternView
                inputTokens={inputTokens}
                outputTokens={outputTokens}
                attentionWeights={attentionWeights}
                currentStep={currentStep}
              />
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Help Dialog */}
        <AlertDialog open={showHelp} onOpenChange={setShowHelp}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Transformer Playground Guide</AlertDialogTitle>
              <AlertDialogDescription asChild>
                {helpContent}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        
        {/* Introduction Dialog */}
        <AlertDialog open={showIntro} onOpenChange={setShowIntro}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome to the Transformer Playground</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>
                  This interactive playground helps you understand the famous Transformer architecture 
                  that powers models like GPT, BERT, and T5.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-700">Key Features</h4>
                    <ul className="list-disc pl-5 text-sm mt-2 text-blue-600">
                      <li>Self-attention mechanism</li>
                      <li>Parallel processing</li>
                      <li>Position encodings</li>
                      <li>Multi-head attention</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-700">Visualization Options</h4>
                    <ul className="list-disc pl-5 text-sm mt-2 text-purple-600">
                      <li>Network architecture</li>
                      <li>Layer-specific details</li>
                      <li>Attention patterns</li>
                      <li>Token processing</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="font-medium">Try different examples and see how the transformer processes text!</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
};

export default VisualPlayground;
