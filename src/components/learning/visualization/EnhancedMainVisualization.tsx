
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, StepForward, StepBack, Brain, Zap, Settings } from "lucide-react";
import { useEnhancedTransformerState } from "../hooks/useEnhancedTransformerState";
import { EnhancedTokenDisplay } from "./EnhancedTokenDisplay";
import { HelpDialogContent } from "../components/HelpDialogContent";
import { IntroDialogContent } from "../components/IntroDialogContent";

const EnhancedMainVisualization = () => {
  const [inputText, setInputText] = useState("The quick brown fox jumps over the lazy dog");
  const [showHelp, setShowHelp] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  const {
    selectedModel,
    setSelectedModel,
    tokenizationResult,
    predictions,
    attentionAnalysis,
    processingSteps,
    currentStepIndex,
    isProcessing,
    temperature,
    setTemperature,
    supportedModels,
    processAllSteps,
    nextStep,
    previousStep,
    resetProcessing,
    currentStep,
    canGoNext,
    canGoPrevious,
    progress,
    completedSteps,
    totalSteps
  } = useEnhancedTransformerState(inputText);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Card className="p-6 space-y-6 bg-gradient-to-br from-white to-slate-50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Real Transformer Visualization
            </h1>
            <p className="text-gray-600">
              Experience authentic tokenization and processing with real LLM APIs
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowIntro(true)}>
              <Brain className="h-4 w-4 mr-2" />
              Introduction
            </Button>
            <Button variant="outline" onClick={() => setShowHelp(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
        </div>

        {/* Input and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Input Configuration</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="text-input">Input Text</Label>
                <Input
                  id="text-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to analyze..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="model-select">Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger id="model-select" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedModels.map(model => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Temperature: {temperature}</Label>
                <Slider
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                  min={0.1}
                  max={2.0}
                  step={0.1}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Controls randomness in predictions (0.1 = deterministic, 2.0 = very random)
                </p>
              </div>
            </div>
          </Card>

          {/* Progress Section */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Processing Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{completedSteps}/{totalSteps} steps</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {currentStep && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant={currentStep.status === 'completed' ? 'default' : 'secondary'}>
                      {currentStep.status}
                    </Badge>
                    <span className="font-medium">{currentStep.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{currentStep.description}</p>
                  {currentStep.explanation && (
                    <p className="text-xs text-blue-700 mt-2 italic">{currentStep.explanation}</p>
                  )}
                </div>
              )}

              {/* Processing Steps Overview */}
              <div className="space-y-2">
                {processingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'processing' ? 'bg-blue-500 animate-pulse' :
                      step.status === 'error' ? 'bg-red-500' :
                      'bg-gray-300'
                    }`} />
                    <span className={`text-sm ${index === currentStepIndex ? 'font-medium' : ''}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={processAllSteps} 
            disabled={isProcessing || !inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Processing
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={previousStep} 
            disabled={!canGoPrevious || isProcessing}
          >
            <StepBack className="h-4 w-4 mr-2" />
            Previous Step
          </Button>
          
          <Button 
            variant="outline" 
            onClick={nextStep} 
            disabled={!canGoNext || isProcessing}
          >
            <StepForward className="h-4 w-4 mr-2" />
            Next Step
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetProcessing}
            disabled={isProcessing}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Visualization Tabs */}
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokens">Token Analysis</TabsTrigger>
            <TabsTrigger value="attention">Attention Patterns</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tokens" className="mt-6">
            <EnhancedTokenDisplay
              tokenizationResult={tokenizationResult}
              predictions={predictions}
              currentStep={currentStep?.id || 'tokenization'}
              model={selectedModel}
            />
          </TabsContent>
          
          <TabsContent value="attention" className="mt-6">
            <Card className="p-6">
              {attentionAnalysis ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Real Attention Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Attention Statistics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Average Entropy:</span>
                          <span className="font-mono">{attentionAnalysis.summary.avgAttentionEntropy.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Weight:</span>
                          <span className="font-mono">{attentionAnalysis.summary.maxAttentionWeight.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Heads:</span>
                          <span className="font-mono">{attentionAnalysis.heads.length}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium mb-2">Attention Patterns</h4>
                      <div className="space-y-1">
                        {attentionAnalysis.summary.dominantPatterns.map((pattern, index) => (
                          <Badge key={index} variant="outline" className="mr-1">
                            {pattern}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-3">Token Importance Ranking</h4>
                    <div className="grid gap-2">
                      {attentionAnalysis.summary.tokenImportance.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                          <span className="font-mono">{item.token}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={item.importance * 100} className="w-20 h-2" />
                            <span className="text-sm text-gray-600">{(item.importance * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Process text to see real attention patterns</p>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="predictions" className="mt-6">
            <Card className="p-6">
              {predictions ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Next Token Predictions</h3>
                  
                  <div className="grid gap-3">
                    {predictions.nextTokens.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">#{prediction.rank}</Badge>
                          <span className="font-mono text-lg">{prediction.token}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-medium">{(prediction.probability * 100).toFixed(2)}%</div>
                            <div className="text-xs text-gray-500">
                              log p: {prediction.logProb.toFixed(4)}
                            </div>
                          </div>
                          <Progress value={prediction.probability * 100} className="w-24 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Process text to see real predictions</p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Help Dialog */}
      <AlertDialog open={showHelp} onOpenChange={setShowHelp}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Real Transformer Visualization Guide</AlertDialogTitle>
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
      
      {/* Intro Dialog */}
      <AlertDialog open={showIntro} onOpenChange={setShowIntro}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Welcome to Real Transformer Analysis</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p className="text-gray-600">
                  This enhanced visualization uses real tokenizers and provides authentic insights into how 
                  modern language models process text. You'll see actual token IDs, probabilities, and 
                  attention patterns similar to what happens in production models.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">🔧 Real Processing</h4>
                    <p className="text-sm text-blue-700">
                      Experience authentic tokenization with actual token IDs, offsets, and probabilities
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">🧠 Multiple Models</h4>
                    <p className="text-sm text-green-700">
                      Compare different model architectures and their tokenization strategies
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">📊 Real Predictions</h4>
                    <p className="text-sm text-purple-700">
                      See actual next-token predictions with confidence scores and rankings
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">🎯 Educational</h4>
                    <p className="text-sm text-orange-700">
                      Learn how transformers work with step-by-step explanations
                    </p>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button 
                onClick={() => setShowIntro(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Start Exploring Real AI!
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EnhancedMainVisualization;
