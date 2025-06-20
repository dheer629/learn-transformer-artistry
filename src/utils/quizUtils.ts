
import { supabase, withRetry } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Question = Database['public']['Tables']['transformer_questions']['Row'];

// Mock data as fallback
const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Attention Mechanism",
    question: "What is the primary purpose of the attention mechanism in transformers?",
    options: [
      "To reduce computational complexity",
      "To allow the model to focus on relevant parts of the input",
      "To increase model parameters",
      "To speed up training"
    ],
    correct_answer: 1,
    explanation: "The attention mechanism allows the model to dynamically focus on different parts of the input sequence when processing each element, enabling better understanding of context and relationships.",
    category: "architecture",
    difficulty_level: "intermediate",
    description: "Understanding the core concept of attention in transformer models",
    created_at: new Date().toISOString(),
    visualization_data: null
  },
  {
    id: 2,
    title: "Multi-Head Attention",
    question: "Why do transformers use multiple attention heads?",
    options: [
      "To process data faster",
      "To capture different types of relationships simultaneously",
      "To reduce overfitting",
      "To increase model size"
    ],
    correct_answer: 1,
    explanation: "Multiple attention heads allow the model to attend to information from different representation subspaces simultaneously, capturing various types of relationships and patterns in the data.",
    category: "architecture",
    difficulty_level: "intermediate",
    description: "Understanding multi-head attention in transformers",
    created_at: new Date().toISOString(),
    visualization_data: null
  },
  {
    id: 3,
    title: "Positional Encoding",
    question: "Why is positional encoding necessary in transformer models?",
    options: [
      "To make the model larger",
      "To add randomness to training",
      "To provide sequence order information since attention is permutation-invariant",
      "To improve computational efficiency"
    ],
    correct_answer: 2,
    explanation: "Since the attention mechanism is permutation-invariant, transformers need positional encoding to understand the order of elements in the sequence.",
    category: "architecture",
    difficulty_level: "beginner",
    description: "Understanding the role of positional encoding",
    created_at: new Date().toISOString(),
    visualization_data: null
  },
  {
    id: 4,
    title: "Feed Forward Networks",
    question: "What is the role of the feed-forward network in each transformer layer?",
    options: [
      "To apply attention weights",
      "To process each position independently with non-linear transformations",
      "To normalize the layer outputs",
      "To reduce dimensionality"
    ],
    correct_answer: 1,
    explanation: "The feed-forward network processes each position independently, applying non-linear transformations to enhance the model's capacity to learn complex patterns.",
    category: "architecture",
    difficulty_level: "intermediate",
    description: "Understanding feed-forward networks in transformers",
    created_at: new Date().toISOString(),
    visualization_data: null
  },
  {
    id: 5,
    title: "Layer Normalization",
    question: "When is layer normalization typically applied in transformer architectures?",
    options: [
      "Only at the input layer",
      "Before each sub-layer (pre-norm) or after each sub-layer (post-norm)",
      "Only at the output layer",
      "Between attention heads only"
    ],
    correct_answer: 1,
    explanation: "Layer normalization can be applied either before each sub-layer (pre-norm) or after each sub-layer (post-norm), helping to stabilize training and improve convergence.",
    category: "architecture",
    difficulty_level: "advanced",
    description: "Understanding layer normalization placement in transformers",
    created_at: new Date().toISOString(),
    visualization_data: null
  }
];

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    console.log('Attempting to fetch questions from Supabase...');
    
    const result = await withRetry(async () => {
      const { data, error } = await supabase
        .from('transformer_questions')
        .select('*')
        .order('id');

      if (error) {
        console.error('Supabase query error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.warn('No questions found in database, using mock data');
        return MOCK_QUESTIONS;
      }

      console.log(`Successfully fetched ${data.length} questions from database`);
      return data;
    }, 3, 1000);

    return result;

  } catch (error) {
    console.error('Failed to fetch questions from database:', error);
    
    toast.error('Using sample questions due to connection issues', {
      description: 'Database connection failed, showing demo content',
      duration: 3000,
    });
    
    return MOCK_QUESTIONS;
  }
};

export const handleAnswer = (
  selectedOption: number,
  correctAnswer: number,
  onScoreUpdate: () => void
): boolean => {
  const isCorrect = selectedOption === correctAnswer;
  
  if (isCorrect) {
    onScoreUpdate();
    toast.success("Correct answer! 🎉", {
      description: "Well done! You're mastering transformer concepts.",
      duration: 2000,
    });
  } else {
    toast.error("Not quite right", {
      description: "Review the explanation to understand the concept better.",
      duration: 3000,
    });
  }
  
  return isCorrect;
};

// Enhanced function to save quiz results with better error handling
export const saveQuizResult = async (
  score: number,
  totalQuestions: number,
  timeSpent: number
): Promise<void> => {
  try {
    // Store quiz results in localStorage with enhanced data
    const quizResult = {
      score,
      total_questions: totalQuestions,
      time_spent: timeSpent,
      completed_at: new Date().toISOString(),
      percentage: Math.round((score / totalQuestions) * 100),
      session_id: crypto.randomUUID() // Add unique session ID
    };

    // Store in localStorage with error handling
    const existingResults = JSON.parse(localStorage.getItem('quiz_results') || '[]');
    existingResults.push(quizResult);
    localStorage.setItem('quiz_results', JSON.stringify(existingResults));

    // Enhanced success message with more details
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    let performanceMessage = '';
    if (quizResult.percentage >= 90) {
      performanceMessage = 'Excellent work! 🌟';
    } else if (quizResult.percentage >= 70) {
      performanceMessage = 'Good job! 👍';
    } else {
      performanceMessage = 'Keep practicing! 💪';
    }

    toast.success(`Quiz completed! You scored ${score}/${totalQuestions} (${quizResult.percentage}%)`, {
      description: `${performanceMessage} Time taken: ${timeString}`,
      duration: 4000,
    });

    console.log('Quiz result saved locally:', quizResult);
    
    // Attempt to sync with database in background (non-blocking)
    syncQuizResultToDatabase(quizResult).catch(error => {
      console.warn('Failed to sync quiz result to database:', error);
    });

  } catch (error) {
    console.error('Failed to save quiz results:', error);
    toast.error('Failed to save results', {
      description: 'Your progress couldn\'t be saved, but you can continue learning.',
      duration: 3000,
    });
  }
};

// Background sync function (non-blocking)
const syncQuizResultToDatabase = async (quizResult: any): Promise<void> => {
  try {
    // This would sync to database if quiz_results table existed
    // For now, just log the attempt
    console.log('Would sync to database:', quizResult);
  } catch (error) {
    console.warn('Database sync failed:', error);
  }
};

// Utility function to get quiz statistics
export const getQuizStatistics = (): {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
} => {
  try {
    const results = JSON.parse(localStorage.getItem('quiz_results') || '[]');
    
    if (results.length === 0) {
      return { totalQuizzes: 0, averageScore: 0, bestScore: 0, totalTimeSpent: 0 };
    }

    const totalQuizzes = results.length;
    const averageScore = Math.round(
      results.reduce((sum: number, result: any) => sum + result.percentage, 0) / totalQuizzes
    );
    const bestScore = Math.max(...results.map((r: any) => r.percentage));
    const totalTimeSpent = results.reduce((sum: number, result: any) => sum + result.time_spent, 0);

    return { totalQuizzes, averageScore, bestScore, totalTimeSpent };
  } catch (error) {
    console.error('Error calculating quiz statistics:', error);
    return { totalQuizzes: 0, averageScore: 0, bestScore: 0, totalTimeSpent: 0 };
  }
};
