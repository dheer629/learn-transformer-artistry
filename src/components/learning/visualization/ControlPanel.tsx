
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, RotateCcw, Save, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ControlPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  speed: number;
  handleSpeedChange: (value: number[]) => void;
  isPlaying: boolean;
  handlePlayPause: () => void;
  handleNextStep: () => void;
  handleReset: () => void;
  currentStep: number;
  maxSteps: number;
  onSave?: () => Promise<void>;
  exampleInputs?: string[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  inputText,
  setInputText,
  speed,
  handleSpeedChange,
  isPlaying,
  handlePlayPause,
  handleNextStep,
  handleReset,
  currentStep,
  maxSteps,
  onSave,
  exampleInputs = []
}) => {
  // Function to handle resources link click
  const handleResourcesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Find the resources button by selector and create a MouseEvent to simulate a click
    const resourcesButton = document.querySelector('button[value="resources"]');
    if (resourcesButton instanceof HTMLElement) {
      resourcesButton.click();
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-white to-blue-50 border border-blue-100">
      <h3 className="font-semibold mb-3 flex items-center text-blue-800">
        Controls
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-700 mb-2 block font-medium">
            Input Text
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
              placeholder="Enter text to process..."
            />
            
            {exampleInputs && exampleInputs.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 mt-1">Or try an example:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleInputs.map((example, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-white hover:bg-blue-50 py-1"
                      onClick={() => setInputText(example)}
                    >
                      {example.length > 15 ? example.substring(0, 15) + '...' : example}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="text-sm text-gray-700 mb-2 block font-medium flex justify-between">
            <span>Animation Speed</span>
            <span className="text-blue-600">{speed.toFixed(1)}x</span>
          </label>
          <Slider
            defaultValue={[speed]}
            max={2}
            min={0.1}
            step={0.1}
            onValueChange={handleSpeedChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex gap-2 justify-between">
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="bg-white hover:bg-blue-50 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="ml-1">{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextStep}
                disabled={currentStep >= maxSteps}
                className="bg-white hover:bg-blue-50 transition-colors"
              >
                <SkipForward className="h-4 w-4" />
                <span className="ml-1">Step</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-white hover:bg-blue-50 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="ml-1">Reset</span>
              </Button>
            </div>
            
            {onSave && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSave}
                className="bg-white hover:bg-purple-50 border-purple-200 text-purple-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span className="ml-1">Save</span>
              </Button>
            )}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentStep / Math.max(maxSteps, 1)) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Step {currentStep}</span>
            <span>Total: {maxSteps} steps</span>
          </div>
        </div>
      </div>
      
      {/* Resources Link */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <a 
          href="#resources" 
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          onClick={handleResourcesClick}
        >
          <span>Explore learning resources</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>
    </Card>
  );
};

export default ControlPanel;
