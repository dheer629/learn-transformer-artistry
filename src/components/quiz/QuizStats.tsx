
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface QuizResult {
  score: number;
  total_questions: number;
  time_spent: number;
  completed_at: string;
  percentage: number;
}

export const QuizStats: React.FC = () => {
  const [quizResults] = useLocalStorage<QuizResult[]>('quiz_results', []);

  if (quizResults.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No quiz results yet. Take a quiz to see your stats!</p>
        </div>
      </Card>
    );
  }

  const totalQuizzes = quizResults.length;
  const averageScore = Math.round(
    quizResults.reduce((sum, result) => sum + result.percentage, 0) / totalQuizzes
  );
  const bestScore = Math.max(...quizResults.map(r => r.percentage));
  const totalTimeSpent = quizResults.reduce((sum, result) => sum + result.time_spent, 0);
  const averageTime = Math.round(totalTimeSpent / totalQuizzes);

  const getScoreBadgeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600">Best Score</p>
              <p className="text-2xl font-bold">{bestScore}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold">{averageScore}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Quizzes Taken</p>
              <p className="text-2xl font-bold">{totalQuizzes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Avg. Time</p>
              <p className="text-2xl font-bold">
                {Math.floor(averageTime / 60)}:{(averageTime % 60).toString().padStart(2, '0')}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Quiz Results</h3>
        <div className="space-y-3">
          {quizResults.slice(-5).reverse().map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Badge className={`text-white ${getScoreBadgeColor(result.percentage)}`}>
                  {result.percentage}%
                </Badge>
                <span className="text-sm text-gray-600">
                  {result.score}/{result.total_questions} correct
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(result.completed_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
