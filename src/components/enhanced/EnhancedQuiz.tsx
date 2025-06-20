
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Quiz from '@/components/Quiz';
import { QuizStats } from '@/components/quiz/QuizStats';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { BarChart3, Play } from 'lucide-react';

const EnhancedQuiz: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quiz');

  return (
    <ErrorBoundary>
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Take Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Your Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="mt-6">
            <Quiz />
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <QuizStats />
          </TabsContent>
        </Tabs>
      </Card>
    </ErrorBoundary>
  );
};

export default EnhancedQuiz;
