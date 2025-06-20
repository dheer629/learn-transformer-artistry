
import { useState, useEffect } from 'react';
import { tokenizerService, type TokenizationResult, type PredictionResult } from '@/services/tokenizerService';
import { attentionService, type AttentionAnalysis } from '@/services/attentionService';
import { useToast } from '@/hooks/use-toast';

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  data?: any;
  explanation?: string;
}

export const useEnhancedTransformerState = (inputText: string) => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [tokenizationResult, setTokenizationResult] = useState<TokenizationResult | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult | null>(null);
  const [attentionAnalysis, setAttentionAnalysis] = useState<AttentionAnalysis | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const { toast } = useToast();

  const initializeSteps = () => {
    const steps: ProcessingStep[] = [
      {
        id: 'tokenization',
        name: 'Tokenization',
        description: 'Converting text into tokens using the selected model\'s tokenizer',
        status: 'pending',
        explanation: 'The tokenizer breaks down your input text into smaller units (tokens) that the model can understand. Different models use different tokenization strategies.'
      },
      {
        id: 'embedding',
        name: 'Token Embedding',
        description: 'Converting tokens to high-dimensional vectors',
        status: 'pending',
        explanation: 'Each token is converted into a dense vector representation that captures semantic meaning. These embeddings are learned during model training.'
      },
      {
        id: 'positional',
        name: 'Positional Encoding',
        description: 'Adding position information to token embeddings',
        status: 'pending',
        explanation: 'Since transformers don\'t inherently understand order, we add positional information to tell the model where each token appears in the sequence.'
      },
      {
        id: 'attention',
        name: 'Self-Attention Computation',
        description: 'Computing attention weights between all token pairs',
        status: 'pending',
        explanation: 'The model computes how much each token should "attend to" every other token, creating rich contextual representations.'
      },
      {
        id: 'feedforward',
        name: 'Feed-Forward Processing',
        description: 'Processing through feed-forward neural networks',
        status: 'pending',
        explanation: 'Each token representation is processed through position-wise feed-forward networks to capture complex patterns.'
      },
      {
        id: 'prediction',
        name: 'Next Token Prediction',
        description: 'Generating probability distribution over vocabulary',
        status: 'pending',
        explanation: 'The model outputs a probability distribution over all possible next tokens, allowing us to see what it thinks should come next.'
      }
    ];
    
    setProcessingSteps(steps);
    setCurrentStepIndex(0);
  };

  const updateStepStatus = (stepId: string, status: ProcessingStep['status'], data?: any) => {
    setProcessingSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status, data }
        : step
    ));
  };

  const processTokenization = async () => {
    if (!inputText.trim()) return;
    
    try {
      updateStepStatus('tokenization', 'processing');
      
      const result = await tokenizerService.tokenize(inputText, selectedModel);
      setTokenizationResult(result);
      updateStepStatus('tokenization', 'completed', result);
      
      toast({
        title: "Tokenization Complete",
        description: `Successfully tokenized into ${result.tokens.length} tokens using ${selectedModel}`,
      });
      
      return result;
    } catch (error) {
      console.error('Tokenization failed:', error);
      updateStepStatus('tokenization', 'error');
      toast({
        title: "Tokenization Failed",
        description: `Error tokenizing with ${selectedModel}: ${error}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const processEmbedding = async (tokenResult: TokenizationResult) => {
    try {
      updateStepStatus('embedding', 'processing');
      
      // Simulate embedding process
      const embeddings = tokenResult.tokens.map((token, index) => ({
        token: token.token,
        vector: Array.from({ length: 768 }, () => (Math.random() - 0.5) * 2),
        dimension: 768,
        norm: Math.random() * 0.5 + 0.5
      }));
      
      updateStepStatus('embedding', 'completed', { embeddings });
      
      toast({
        title: "Embedding Complete",
        description: `Generated ${embeddings.length} token embeddings with dimension 768`,
      });
      
      return embeddings;
    } catch (error) {
      updateStepStatus('embedding', 'error');
      throw error;
    }
  };

  const processPositionalEncoding = async () => {
    try {
      updateStepStatus('positional', 'processing');
      
      if (!tokenizationResult) throw new Error('No tokenization result');
      
      const positionalEncodings = tokenizationResult.tokens.map((_, position) => ({
        position,
        encoding: Array.from({ length: 768 }, (_, i) => {
          const pos = position;
          const dim = i;
          if (dim % 2 === 0) {
            return Math.sin(pos / Math.pow(10000, dim / 768));
          } else {
            return Math.cos(pos / Math.pow(10000, (dim - 1) / 768));
          }
        })
      }));
      
      updateStepStatus('positional', 'completed', { positionalEncodings });
      
      toast({
        title: "Positional Encoding Complete",
        description: `Applied positional encoding to ${positionalEncodings.length} positions`,
      });
      
      return positionalEncodings;
    } catch (error) {
      updateStepStatus('positional', 'error');
      throw error;
    }
  };

  const processAttention = async () => {
    try {
      updateStepStatus('attention', 'processing');
      
      if (!tokenizationResult) throw new Error('No tokenization result');
      
      const analysis = attentionService.generateRealisticAttention(
        tokenizationResult.tokens,
        6, // 6 layers
        8  // 8 heads per layer
      );
      
      setAttentionAnalysis(analysis);
      updateStepStatus('attention', 'completed', analysis);
      
      toast({
        title: "Attention Computation Complete",
        description: `Computed attention for ${analysis.heads.length} attention heads across 6 layers`,
      });
      
      return analysis;
    } catch (error) {
      updateStepStatus('attention', 'error');
      throw error;
    }
  };

  const processFeedForward = async () => {
    try {
      updateStepStatus('feedforward', 'processing');
      
      // Simulate feed-forward processing
      const layerOutputs = Array.from({ length: 6 }, (_, layer) => ({
        layer,
        hiddenDim: 3072,
        activationFunction: 'GELU',
        outputs: tokenizationResult?.tokens.map(() => 
          Array.from({ length: 768 }, () => (Math.random() - 0.5) * 2)
        ) || []
      }));
      
      updateStepStatus('feedforward', 'completed', { layerOutputs });
      
      toast({
        title: "Feed-Forward Processing Complete",
        description: `Processed through 6 transformer layers with hidden dimension 3072`,
      });
      
      return layerOutputs;
    } catch (error) {
      updateStepStatus('feedforward', 'error');
      throw error;
    }
  };

  const processPrediction = async () => {
    try {
      updateStepStatus('prediction', 'processing');
      
      if (!tokenizationResult) throw new Error('No tokenization result');
      
      const predictionResult = await tokenizerService.predictNextTokens(
        tokenizationResult.ids,
        selectedModel,
        temperature
      );
      
      setPredictions(predictionResult);
      updateStepStatus('prediction', 'completed', predictionResult);
      
      toast({
        title: "Prediction Complete",
        description: `Generated ${predictionResult.nextTokens.length} token predictions with ${(predictionResult.confidence * 100).toFixed(1)}% confidence`,
      });
      
      return predictionResult;
    } catch (error) {
      updateStepStatus('prediction', 'error');
      throw error;
    }
  };

  const processAllSteps = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to process",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const tokenResult = await processTokenization();
      if (!tokenResult) return;
      
      await processEmbedding(tokenResult);
      await processPositionalEncoding();
      await processAttention();
      await processFeedForward();
      await processPrediction();
      
      toast({
        title: "Processing Complete",
        description: "All transformer steps completed successfully",
      });
    } catch (error) {
      console.error('Processing failed:', error);
      toast({
        title: "Processing Failed",
        description: "An error occurred during processing",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (currentStepIndex < processingSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const resetProcessing = () => {
    initializeSteps();
    setTokenizationResult(null);
    setPredictions(null);
    setAttentionAnalysis(null);
    setIsProcessing(false);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    initializeSteps();
  }, []);

  useEffect(() => {
    if (inputText.trim()) {
      resetProcessing();
    }
  }, [inputText, selectedModel]);

  return {
    // State
    selectedModel,
    setSelectedModel,
    tokenizationResult,
    predictions,
    attentionAnalysis,
    processingSteps,
    currentStepIndex,
    isProcessing,
    temperature,
    setTemperature,
    
    // Available models
    supportedModels: tokenizerService.getSupportedModels(),
    
    // Actions
    processAllSteps,
    nextStep,
    previousStep,
    resetProcessing,
    
    // Current step info
    currentStep: processingSteps[currentStepIndex],
    canGoNext: currentStepIndex < processingSteps.length - 1,
    canGoPrevious: currentStepIndex > 0,
    
    // Progress
    progress: ((currentStepIndex + 1) / processingSteps.length) * 100,
    completedSteps: processingSteps.filter(step => step.status === 'completed').length,
    totalSteps: processingSteps.length
  };
};
