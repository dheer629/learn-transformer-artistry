
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Question = Database['public']['Tables']['transformer_questions']['Row'];

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
      toast.error(`Failed to load questions: ${error.message}`);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No questions found in database');
      toast.error('No questions available in the database.');
      return [];
    }

    console.log('Successfully fetched questions:', data.length);
    return data;
  } catch (networkError) {
    console.error('Network error when fetching questions:', networkError);
    toast.error('Network connection failed. Please check your internet connection and try again.');
    throw networkError;
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
