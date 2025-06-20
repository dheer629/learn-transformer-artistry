
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import TransformerVisualization from '@/components/TransformerVisualization';

const EnhancedVisualization: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading visualization..." />}>
        <TransformerVisualization />
      </Suspense>
    </ErrorBoundary>
  );
};

export default EnhancedVisualization;
