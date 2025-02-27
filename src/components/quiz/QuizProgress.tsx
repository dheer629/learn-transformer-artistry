
import React, { memo } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  answered: boolean;
  onNext: () => void;
}

const QuizProgress = memo(({ 
  currentQuestion, 
  totalQuestions, 
  score, 
  answered, 
  onNext 
}: QuizProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <Progress value={progress} className="mb-4" />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
          <div className="text-gray-600">
            Score: {score}/{totalQuestions}
          </div>
        </div>
        {answered && currentQuestion < totalQuestions - 1 && (
          <Button 
            onClick={onNext}
            className="animate-fade-in"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
});

QuizProgress.displayName = "QuizProgress";

export default QuizProgress;
