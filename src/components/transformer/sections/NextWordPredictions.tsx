import React from "react";
import { toast } from "@/components/ui/use-toast";

interface NextWordPredictionsProps {
  predictions: { word: string; probability: number }[];
}

const NextWordPredictions: React.FC<NextWordPredictionsProps> = ({ predictions }) => {
  React.useEffect(() => {
    if (predictions.length > 0) {
      toast({
        title: "Next Word Predictions",
        description: (
          <div className="space-y-2">
            <p className="font-medium">Top 5 predicted next words:</p>
            {predictions.slice(0, 5).map((pred, i) => (
              <div key={i} className="flex justify-between">
                <span>{pred.word}</span>
                <span className="font-mono">{(pred.probability * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        ),
        duration: 5000,
      });
    }
  }, [predictions]);

  return null;
};

export default NextWordPredictions;