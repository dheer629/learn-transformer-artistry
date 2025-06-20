
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import VisualPlayground from '@/components/learning/VisualPlayground';

const EnhancedPlayground: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading playground..." />}>
        <VisualPlayground />
      </Suspense>
    </ErrorBoundary>
  );
};

export default EnhancedPlayground;
