
import React from "react";

interface LayerInfoProps {
  currentLayer: {
    name: string;
    neurons: number;
  };
}

const LayerInfo: React.FC<LayerInfoProps> = ({ currentLayer }) => {
  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-medium text-sm">Layer Information</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium">Current Layer:</p>
          <p className="text-sm">{currentLayer.name}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium">Neurons:</p>
          <p className="text-sm">{currentLayer.neurons}</p>
        </div>
      </div>
    </div>
  );
};

export default LayerInfo;
