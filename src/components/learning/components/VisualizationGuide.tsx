
import React from "react";
import { Card } from "@/components/ui/card";
import { Network, Layers, Eye, Activity } from "lucide-react";

interface VisualizationGuideProps {
  selectedTab: string;
}

export const VisualizationGuide: React.FC<VisualizationGuideProps> = ({ selectedTab }) => {
  const getGuideContent = () => {
    switch (selectedTab) {
      case "network":
        return {
          icon: <Network className="h-5 w-5 text-blue-500" />,
          title: "Network View",
          description: "This visualization shows the complete neural network architecture of the transformer.",
          instructions: [
            "Hover over neurons to see connections between layers",
            "Each circle represents a neuron in the network",
            "Lines show information flow between neurons",
            "Blue highlights indicate active neurons in the current step"
          ]
        };
      case "layers":
        return {
          icon: <Layers className="h-5 w-5 text-green-500" />,
          title: "Layer View",
          description: "Examine individual transformer layers in detail, including attention patterns and weights.",
          instructions: [
            "Input tokens are shown on the left side",
            "Output tokens appear on the right as they're generated",
            "The weight matrix shows connection strengths",
            "Darker colors indicate stronger connections"
          ]
        };
      case "attention":
        return {
          icon: <Eye className="h-5 w-5 text-purple-500" />,
          title: "Attention View",
          description: "Visualize how the model focuses on different parts of the input when processing each token.",
          instructions: [
            "The grid shows attention weights between tokens",
            "Darker colors mean stronger attention",
            "Each row shows how much a token attends to all other tokens",
            "This reveals relationships the model has identified between words"
          ]
        };
      default:
        return {
          icon: <Activity className="h-5 w-5 text-gray-500" />,
          title: "Visualization Guide",
          description: "Select a visualization tab above to see different aspects of the transformer model.",
          instructions: [
            "Network View shows the overall architecture",
            "Layer View focuses on individual transformer components",
            "Attention View reveals token relationships"
          ]
        };
    }
  };

  const guide = getGuideContent();

  return (
    <Card className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {guide.icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{guide.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{guide.description}</p>
          <ul className="mt-2 space-y-1">
            {guide.instructions.map((instruction, index) => (
              <li key={index} className="text-xs flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
