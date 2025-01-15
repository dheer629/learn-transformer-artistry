import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/integrations/supabase/types";
import QuestionCard from "./quiz/QuestionCard";
import QuizProgress from "./quiz/QuizProgress";
import { fetchQuestions, handleAnswer } from "@/utils/quizUtils";

type Question = Database['public']['Tables']['transformer_questions']['Row'];

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await fetchQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      setIsLoading(false);
    }
  };

  const onAnswer = (selectedOption: number) => {
    if (answered) return;
    
    setAnswered(true);
    handleAnswer(
      selectedOption, 
      questions[currentQuestion].correct_answer,
      () => setScore(score + 1)
    );
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

  return (
    <div className="space-y-6">
      <QuestionCard
        question={questions[currentQuestion]}
        onAnswer={onAnswer}
        answered={answered}
        showExplanation={showExplanation}
      />
      <QuizProgress
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        score={score}
        answered={answered}
        onNext={handleNext}
      />
    </div>
  );
};

export default Quiz;