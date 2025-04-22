
import React from 'react';
import { useVisualization } from '../state/VisualizationContext';
import ControlPanel from '../ControlPanel';
import StatusPanel from '../StatusPanel';

export const ControlPanelsSection: React.FC = () => {
  const {
    inputText,
    setInputText,
    speed,
    handleSpeedChange,
    isPlaying,
    handlePlayPause,
    handleNextStep,
    handleReset,
    currentStep,
    layers,
    saveVisualization
  } = useVisualization();

  const exampleInputs = [
    "Hello world",
    "The transformer architecture revolutionized NLP",
    "Attention is all you need",
    "Machine learning helps solve complex problems"
  ];

  return (
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
        selectedLayer={layers?.[currentStep]}
      />
    </div>
  );
};
