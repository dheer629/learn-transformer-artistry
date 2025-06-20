
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

// Simplified function to save quiz results - stores locally for now
export const saveQuizResult = async (
  score: number,
  totalQuestions: number,
  timeSpent: number
): Promise<void> => {
  try {
    // Store quiz results in localStorage as fallback since quiz_results table doesn't exist
    const quizResult = {
      score,
      total_questions: totalQuestions,
      time_spent: timeSpent,
      completed_at: new Date().toISOString(),
      percentage: Math.round((score / totalQuestions) * 100)
    };

    // Store in localStorage
    const existingResults = JSON.parse(localStorage.getItem('quiz_results') || '[]');
    existingResults.push(quizResult);
    localStorage.setItem('quiz_results', JSON.stringify(existingResults));

    toast.success(`Quiz completed! You scored ${score}/${totalQuestions} (${quizResult.percentage}%)`, {
      description: `Time taken: ${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, '0')}`,
      duration: 4000,
    });

    console.log('Quiz result saved locally:', quizResult);
  } catch (error) {
    console.error('Failed to save quiz results:', error);
    toast.error('Failed to save results', {
      description: 'Your progress couldn\'t be saved, but you can continue learning.',
    });
  }
};
