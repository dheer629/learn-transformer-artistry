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
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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
import { Button } from "../ui/button";

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

  const exampleInputs = [
    "Hello world",
    "The transformer architecture revolutionized NLP",
    "Attention is all you need",
    "Machine learning helps solve complex problems"
  ];

  const helpContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">How to Use the Transformer Playground</h3>
      
      <div className="space-y-4">
        <section className="space-y-2">
          <h4 className="font-medium text-primary">1. Getting Started</h4>
          <p className="text-sm">Enter any text in the input box or choose from example phrases. The transformer will process this text through its architecture.</p>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">2. Visualization Controls</h4>
          <ul className="text-sm space-y-1.5">
            <li>• <span className="font-medium">Play/Pause:</span> Start or stop the automatic visualization</li>
            <li>• <span className="font-medium">Step:</span> Move through the process one step at a time</li>
            <li>• <span className="font-medium">Reset:</span> Return to the beginning of the visualization</li>
            <li>• <span className="font-medium">Speed:</span> Adjust how fast the visualization runs</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">3. Different Views</h4>
          <ul className="text-sm space-y-1.5">
            <li>• <span className="font-medium">Network View:</span> Shows the entire neural network architecture and how information flows between layers</li>
            <li>• <span className="font-medium">Layer View:</span> Detailed view of each transformer layer's internal processing</li>
            <li>• <span className="font-medium">Attention View:</span> Visualizes how the model pays attention to different parts of the input</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">4. Understanding the Process</h4>
          <ul className="text-sm space-y-1.5">
            <li>• <span className="font-medium">Input Tokens:</span> Your text is split into tokens (shown in blue)</li>
            <li>• <span className="font-medium">Processing:</span> Watch how each token is processed through the layers</li>
            <li>• <span className="font-medium">Attention Patterns:</span> Yellow lines show how different parts of the input relate to each other</li>
            <li>• <span className="font-medium">Output:</span> See how the model generates the final output (shown in green)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h4 className="font-medium text-primary">5. Interactive Features</h4>
          <ul className="text-sm space-y-1.5">
            <li>• Hover over neurons to see their connections</li>
            <li>• Click on layers to view detailed information</li>
            <li>• Use the progress bar to track the current step</li>
            <li>• Save interesting visualizations for later reference</li>
          </ul>
        </section>
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>Network View</TooltipTrigger>
                  <TooltipContent side="bottom" className="w-80">
                    <p>View the complete neural network architecture. Watch how information flows between layers and how attention patterns emerge.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsTrigger>
            <TabsTrigger value="layers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>Layer View</TooltipTrigger>
                  <TooltipContent side="bottom" className="w-80">
                    <p>Examine individual transformer layers in detail. See how each layer processes and transforms the input data.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsTrigger>
            <TabsTrigger value="attention" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>Attention View</TooltipTrigger>
                  <TooltipContent side="bottom" className="w-80">
                    <p>Visualize attention patterns between tokens. Understand how the model focuses on different parts of the input.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
        
        <AlertDialog open={showHelp} onOpenChange={setShowHelp}>
          <AlertDialogContent className="max-w-4xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Transformer Playground Guide</AlertDialogTitle>
              <AlertDialogDescription asChild>
                {helpContent}
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
              <AlertDialogDescription className="space-y-6">
                <p className="text-lg">
                  This interactive playground helps you understand the revolutionary Transformer architecture 
                  that powers modern AI models like GPT and BERT.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-3">What You'll Learn</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-blue-600">
                      <li>How transformers process text input</li>
                      <li>Self-attention mechanism visualization</li>
                      <li>Multi-head attention patterns</li>
                      <li>Layer-by-layer transformation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-3">Key Features</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-purple-600">
                      <li>Interactive visualization controls</li>
                      <li>Real-time attention pattern display</li>
                      <li>Step-by-step process breakdown</li>
                      <li>Multiple visualization perspectives</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-3">Getting Started</h4>
                  <ol className="list-decimal pl-5 text-sm space-y-2 text-green-600">
                    <li>Enter some text in the input box or use an example</li>
                    <li>Use the play/pause controls to start the visualization</li>
                    <li>Switch between different views to explore various aspects</li>
                    <li>Hover over elements to see detailed information</li>
                  </ol>
                </div>
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
