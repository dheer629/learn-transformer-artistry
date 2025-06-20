
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseErrorHandlerReturn {
  error: Error | null;
  isError: boolean;
  handleError: (error: Error | string) => void;
  clearError: () => void;
  withErrorHandling: <T>(
    asyncFn: () => Promise<T>,
    options?: { 
      successMessage?: string;
      errorMessage?: string;
      showLoading?: boolean;
    }
  ) => Promise<T | null>;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error | string) => {
    const errorObj = error instanceof Error ? error : new Error(error);
    setError(errorObj);
    
    console.error('Error handled:', errorObj);
    
    toast.error('Something went wrong', {
      description: errorObj.message,
      duration: 5000,
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const withErrorHandling = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options: { 
      successMessage?: string;
      errorMessage?: string;
      showLoading?: boolean;
    } = {}
  ): Promise<T | null> => {
    try {
      clearError();
      
      if (options.showLoading) {
        toast.loading('Processing...', { id: 'loading' });
      }

      const result = await asyncFn();
      
      if (options.showLoading) {
        toast.dismiss('loading');
      }

      if (options.successMessage) {
        toast.success(options.successMessage);
      }

      return result;
    } catch (err) {
      if (options.showLoading) {
        toast.dismiss('loading');
      }

      const errorMessage = options.errorMessage || 
        (err instanceof Error ? err.message : 'An unexpected error occurred');
      
      handleError(errorMessage);
      return null;
    }
  }, [handleError, clearError]);

  return {
    error,
    isError: error !== null,
    handleError,
    clearError,
    withErrorHandling
  };
};
