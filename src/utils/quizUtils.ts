import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Question = Database['public']['Tables']['transformer_questions']['Row'];

export const fetchQuestions = async (): Promise<Question[]> => {
  const { data, error } = await supabase
    .from('transformer_questions')
    .select('*')
    .order('id');

  if (error) {
    toast.error('Failed to load questions. Please try again.');
    throw error;
  }

  return data || [];
};

export const handleAnswer = (
  selectedOption: number,
  correctAnswer: number,
  onScoreUpdate: () => void
) => {
  if (selectedOption === correctAnswer) {
    onScoreUpdate();
    toast.success("Correct answer! 🎉");
  } else {
    toast.error("Not quite right. Try to understand why!");
  }
};