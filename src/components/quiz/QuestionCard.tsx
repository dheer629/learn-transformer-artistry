import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";

type Question = Database['public']['Tables']['transformer_questions']['Row'];

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOption: number) => void;
  answered: boolean;
  showExplanation: boolean;
}

const QuestionCard = ({ question, onAnswer, answered, showExplanation }: QuestionCardProps) => {
  return (
    <Card className="p-6 max-w-2xl mx-auto animate-slide-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary">{question.title}</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {question.difficulty_level}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-8">Category: {question.category}</p>
      </div>
      
      <div className="mb-6">
        <p className="text-lg mb-2">{question.description}</p>
        <p className="text-lg mb-4 font-medium">{question.question}</p>
        <div className="space-y-4">
          {(question.options as string[]).map((option, index) => (
            <Button
              key={index}
              variant={answered ? (index === question.correct_answer ? "default" : "outline") : "outline"}
              className={`w-full text-left justify-start ${
                answered && index === question.correct_answer ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => onAnswer(index)}
              disabled={answered}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 bg-muted rounded-lg animate-fade-in">
          <h3 className="font-semibold mb-2">Explanation:</h3>
          <p className="text-gray-600">{question.explanation}</p>
        </div>
      )}
    </Card>
  );
};

export default QuestionCard;