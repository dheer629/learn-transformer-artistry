
import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database } from "@/integrations/supabase/types";
import QuestionCard from "./quiz/QuestionCard";
import QuizProgress from "./quiz/QuizProgress";
import { fetchQuestions, handleAnswer, saveQuizResult } from "@/utils/quizUtils";
import { checkSupabaseConnection } from "@/integrations/supabase/client";

type Question = Database['public']['Tables']['transformer_questions']['Row'];

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      setConnectionStatus('checking');
      
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'offline');
      
      const data = await fetchQuestions();
      setQuestions(data);
      
      if (data.length === 0) {
        console.warn('No questions available');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setConnectionStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  const onAnswer = useCallback((selectedOption: number) => {
    if (answered) return;
    
    setAnswered(true);
    handleAnswer(
      selectedOption, 
      questions[currentQuestion].correct_answer,
      () => setScore(prevScore => prevScore + 1)
    );
    setShowExplanation(true);
  }, [answered, currentQuestion, questions]);

  const handleNext = useCallback(async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setShowExplanation(false);
      setAnswered(false);
    } else {
      // Quiz completed
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      await saveQuizResult(score, questions.length, timeSpent);
    }
  }, [currentQuestion, questions.length, score, startTime]);

  const handleRetry = useCallback(() => {
    loadQuestions();
  }, []);

  if (isLoading) {
    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!questions.length) {
    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <Alert>
          <AlertDescription className="space-y-4">
            <p>No questions available at the moment.</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {connectionStatus === 'offline' && (
        <Alert className="max-w-2xl mx-auto">
          <AlertDescription>
            Using sample questions due to connection issues. Your progress won't be saved.
          </AlertDescription>
        </Alert>
      )}
      
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
