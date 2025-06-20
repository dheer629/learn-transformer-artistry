
import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database } from "@/integrations/supabase/types";
import QuestionCard from "./quiz/QuestionCard";
import QuizProgress from "./quiz/QuizProgress";
import { fetchQuestions, handleAnswer, saveQuizResult } from "@/utils/quizUtils";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const { withErrorHandling, isError, clearError } = useErrorHandler();

  const loadQuestions = useCallback(async () => {
    await withErrorHandling(async () => {
      setIsLoading(true);
      setConnectionStatus('checking');
      clearError();
      
      // Check connection first
      const isConnected = await checkSupabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'offline');
      
      const data = await fetchQuestions();
      setQuestions(data);
      
      if (data.length === 0) {
        throw new Error('No questions available');
      }
    }, {
      errorMessage: 'Failed to load quiz questions',
      showLoading: false
    });
    
    setIsLoading(false);
  }, [withErrorHandling, clearError]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const onAnswer = useCallback((selectedOption: number) => {
    if (answered || quizCompleted) return;
    
    setAnswered(true);
    const isCorrect = handleAnswer(
      selectedOption, 
      questions[currentQuestion].correct_answer,
      () => setScore(prevScore => prevScore + 1)
    );
    setShowExplanation(true);
  }, [answered, currentQuestion, questions, quizCompleted]);

  const handleNext = useCallback(async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setShowExplanation(false);
      setAnswered(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      await withErrorHandling(async () => {
        await saveQuizResult(score, questions.length, timeSpent);
      }, {
        errorMessage: 'Failed to save quiz results, but your answers were recorded locally',
        showLoading: false
      });
    }
  }, [currentQuestion, questions.length, score, startTime, withErrorHandling]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setAnswered(false);
    setQuizCompleted(false);
    clearError();
    loadQuestions();
  }, [clearError, loadQuestions]);

  const handleRetry = useCallback(() => {
    clearError();
    loadQuestions();
  }, [clearError, loadQuestions]);

  if (isLoading) {
    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <LoadingSpinner size="lg" text="Loading quiz questions..." />
        <div className="space-y-4 mt-6">
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

  if (isError || !questions.length) {
    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <Alert className="border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="space-y-4">
            <p className="text-red-700">
              {isError ? 'Failed to load quiz questions.' : 'No questions available at the moment.'}
            </p>
            <Button onClick={handleRetry} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    return (
      <Card className="p-6 max-w-2xl mx-auto text-center">
        <div className="space-y-4">
          <div className="text-6xl mb-4">
            {percentage >= 90 ? '🏆' : percentage >= 70 ? '🎉' : '💪'}
          </div>
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <div className="space-y-2">
            <p className="text-lg">
              You scored <span className="font-bold text-primary">{score}/{questions.length}</span> ({percentage}%)
            </p>
            <p className="text-gray-600">
              Time taken: {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
          <Button onClick={handleRestart} className="w-full mt-6">
            <RefreshCw className="h-4 w-4 mr-2" />
            Take Quiz Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {connectionStatus === 'offline' && (
        <Alert className="max-w-2xl mx-auto border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-700">
            Using sample questions due to connection issues. Your progress won't be saved to the cloud.
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
