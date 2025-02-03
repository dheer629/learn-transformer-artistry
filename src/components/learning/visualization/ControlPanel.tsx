import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, RotateCcw, Save } from "lucide-react";
import { Card } from "@/components/ui/card";

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
}) => {
  return (
    <Card className="p-4 bg-gray-50">
      <h3 className="font-semibold mb-3">Controls</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            Input Text
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-2 block">
            Animation Speed
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextStep}
            disabled={currentStep >= maxSteps}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
            >
              <Save className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;