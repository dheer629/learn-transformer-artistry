
import React, { createContext, useContext } from 'react';
import { useTransformerState } from '../../hooks/useTransformerState';
import { useTransformerAnimation } from '../../hooks/useTransformerAnimation';
import { useTransformerControls } from '../../hooks/useTransformerControls';

interface VisualizationContextType {
  isPlaying: boolean;
  currentStep: number;
  inputText: string;
  setInputText: (text: string) => void;
  layers: any[];
  inputTokens: string[];
  outputTokens: string[];
  attentionWeights: number[][];
  isProcessingComplete: boolean;
  activeProcessingStep: string | null;
  hints: string[];
  visualizationMode: string;
  speed: number;
  selectedLayer: number;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  handleSpeedChange: (value: number[]) => void;
  handleNextStep: () => void;
  handleReset: () => void;
  handleLayerSelect: (index: number) => void;
  saveVisualization: () => void;
  handlePlayPause: () => void;
}

const VisualizationContext = createContext<VisualizationContextType | undefined>(undefined);

export const VisualizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [inputText, setInputText] = React.useState("Hello world");
  const [showHelp, setShowHelp] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true);

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

  const value = {
    isPlaying,
    currentStep,
    inputText,
    setInputText,
    layers,
    inputTokens,
    outputTokens,
    attentionWeights,
    isProcessingComplete,
    activeProcessingStep,
    hints,
    visualizationMode,
    speed,
    selectedLayer,
    selectedTab,
    setSelectedTab,
    handleSpeedChange,
    handleNextStep,
    handleReset,
    handleLayerSelect,
    saveVisualization,
    handlePlayPause,
  };

  return (
    <VisualizationContext.Provider value={value}>
      {children}
    </VisualizationContext.Provider>
  );
};

export const useVisualization = () => {
  const context = useContext(VisualizationContext);
  if (context === undefined) {
    throw new Error('useVisualization must be used within a VisualizationProvider');
  }
  return context;
};
