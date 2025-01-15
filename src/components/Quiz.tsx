import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  visualization_data?: Record<string, any>;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('transformer_questions')
        .select('*')
        .order('id');

      if (error) {
        throw error;
      }

      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions. Please try again.');
      setIsLoading(false);
    }
  };

  const handleAnswer = (selectedOption: number) => {
    if (answered) return;
    
    setAnswered(true);
    if (selectedOption === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
      toast.success("Correct answer! 🎉");
    } else {
      toast.error("Not quite right. Try to understand why!");
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setAnswered(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!questions.length) {
    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <p className="text-center text-gray-600">No questions available. Please try again later.</p>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="p-6 max-w-2xl mx-auto animate-slide-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary">
            {questions[currentQuestion].title}
          </h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {questions[currentQuestion].difficulty_level}
          </span>
        </div>
        <Progress value={progress} className="mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <p className="text-sm text-gray-600 mb-8">
          Category: {questions[currentQuestion].category}
        </p>
      </div>
      
      <div className="mb-6">
        <p className="text-lg mb-2">{questions[currentQuestion].description}</p>
        <p className="text-lg mb-4 font-medium">{questions[currentQuestion].question}</p>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant={answered ? (index === questions[currentQuestion].correct_answer ? "default" : "outline") : "outline"}
              className={`w-full text-left justify-start ${
                answered && index === questions[currentQuestion].correct_answer ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => handleAnswer(index)}
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
          <p className="text-gray-600">{questions[currentQuestion].explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          Score: {score}/{questions.length}
        </div>
        {answered && currentQuestion < questions.length - 1 && (
          <Button onClick={handleNext}>Next Question</Button>
        )}
      </div>
    </Card>
  );
};

export default Quiz;