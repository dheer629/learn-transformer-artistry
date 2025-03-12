
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import TokenDisplay from "../visualization/TokenDisplay";
import NeuralNetworkDisplay from "../visualization/NeuralNetworkDisplay";
import LayerVisualizer from "../visualization/LayerVisualizer";
import AttentionPatternView from "../visualization/AttentionPatternView";
import type { LayerData } from "../utils/neuralNetworkUtils";

interface VisualizationTabsProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  layers: LayerData[];
  currentStep: number;
  selectedLayer: number;
  onLayerSelect: (index: number) => void;
  inputTokens: string[];
  outputTokens: string[];
  attentionWeights: number[][];
}

export const VisualizationTabs = ({
  selectedTab,
  setSelectedTab,
  layers,
  currentStep,
  selectedLayer,
  onLayerSelect,
  inputTokens,
  outputTokens,
  attentionWeights,
}: VisualizationTabsProps) => {
  return (
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
              onLayerSelect={onLayerSelect}
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
  );
};
