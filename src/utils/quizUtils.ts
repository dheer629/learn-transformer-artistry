
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Question = Database['public']['Tables']['transformer_questions']['Row'];

// Mock data fallback for when Supabase is not accessible
const mockQuestions: Question[] = [
  {
    id: 1,
    title: "Attention Mechanism",
    category: "Architecture",
    difficulty_level: "Beginner",
    description: "Understanding the core concept of attention in transformers",
    question: "What is the primary purpose of the attention mechanism in transformers?",
    options: [
      "To reduce computational complexity",
      "To allow the model to focus on relevant parts of the input",
      "To increase the number of parameters",
      "To speed up training"
    ],
    correct_answer: 1,
    explanation: "The attention mechanism allows the model to dynamically focus on different parts of the input sequence when processing each element, which is crucial for understanding context and relationships.",
    visualization_data: null,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Self-Attention",
    category: "Attention",
    difficulty_level: "Intermediate",
    description: "Deep dive into self-attention mechanisms",
    question: "In self-attention, what are the three main components that are computed?",
    options: [
      "Input, Output, Hidden",
      "Query, Key, Value",
      "Encoder, Decoder, Attention",
      "Position, Embedding, Layer"
    ],
    correct_answer: 1,
    explanation: "Self-attention computes Query (Q), Key (K), and Value (V) matrices from the input, then uses these to determine attention weights and create contextualized representations.",
    visualization_data: null,
    created_at: new Date().toISOString()
  }
];

export const fetchQuestions = async (): Promise<Question[]> => {
  console.log('Attempting to fetch questions from Supabase...');
  
  try {
    const { data, error } = await supabase
      .from('transformer_questions')
      .select('*')
      .order('id');

    console.log('Supabase response:', { data: data?.length || 0, error });

    if (error) {
      console.error('Error fetching questions:', error);
      console.error('Using mock data as fallback due to connection issues');
      toast.error('Using sample questions (database connection failed)');
      return mockQuestions;
    }

    if (!data || data.length === 0) {
      console.warn('No questions found in database, using mock data');
      toast.error('No questions in database, using sample questions');
      return mockQuestions;
    }

    console.log('Successfully fetched questions:', data.length);
    return data;
  } catch (networkError) {
    console.error('Network error when fetching questions:', networkError);
    console.log('Falling back to mock questions due to network error');
    toast.error('Connection failed - using sample questions');
    return mockQuestions;
  }
};

export const handleAnswer = (
  selectedOption: number,
  correctAnswer: number,
  onScoreUpdate: () => void
) => {
  if (selectedOption === correctAnswer) {
    onScoreUpdate();
    toast.success("Correct answer! 🎉", {
      duration: 2000,
    });
  } else {
    toast.error("Not quite right. Try to understand why!", {
      duration: 2000,
    });
  }
  return selectedOption === correctAnswer;
};
