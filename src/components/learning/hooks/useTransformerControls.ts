
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { LayerData } from '../utils/neuralNetworkUtils';

export const useTransformerControls = (
  layers: LayerData[],
  inputTokens: string[],
  outputTokens: string[],
  attentionWeights: number[][],
  setCurrentStep: (step: number) => void,
  setOutputTokens: (tokens: string[]) => void,
  setIsProcessingComplete: (isComplete: boolean) => void,
  setIsPlaying: (isPlaying: boolean | ((prev: boolean) => boolean)) => void,
  currentStep: number,
  inputText: string
) => {
  const { toast } = useToast();
  const [speed, setSpeed] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [selectedTab, setSelectedTab] = useState("network");

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
    toast({
      title: "Animation Speed Updated",
      description: `Speed set to ${value[0]}x`,
    });
  };

  const handleNextStep = () => {
    if (layers && layers.length > 0 && currentStep < layers.length - 1) {
      setCurrentStep(currentStep + 1);
      const midPoint = Math.floor(layers.length / 2);
      if (currentStep >= midPoint && inputTokens[currentStep - midPoint]) {
        const newToken = inputTokens[currentStep - midPoint];
        setOutputTokens([...outputTokens, newToken]);
      }
      if (currentStep === layers.length - 2) {
        setIsProcessingComplete(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setOutputTokens([]);
    setIsProcessingComplete(false);
    toast({
      title: "Visualization Reset",
      description: "Starting from the beginning",
    });
  };

  const handleLayerSelect = (layerIndex: number) => {
    setSelectedLayer(layerIndex);
    setCurrentStep(layerIndex);
    
    if (layers[layerIndex]) {
      toast({
        title: `Layer ${layerIndex + 1} Selected`,
        description: `Viewing ${layers[layerIndex].name}`,
      });
    }
  };

  const saveVisualization = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('transformer_visualizations')
        .insert({
          input_text: inputText,
          tokens: { input: inputTokens, output: outputTokens },
          attention_weights: attentionWeights,
          layer_outputs: layers.map(layer => ({
            name: layer.name,
            neurons: layer.neurons,
            weights: layer.weights
          }))
        });

      if (error) throw error;

      toast({
        title: "Visualization Saved",
        description: "You can access this visualization later",
      });
    } catch (error) {
      console.error('Error saving visualization:', error);
      toast({
        title: "Error Saving",
        description: "Failed to save visualization",
        variant: "destructive",
      });
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
    toast({
      title: "Animation Status",
      description: "Animation toggled",
    });
  };

  return {
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
  };
};
