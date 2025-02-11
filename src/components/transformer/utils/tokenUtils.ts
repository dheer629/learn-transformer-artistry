
import { supabase } from "@/integrations/supabase/client";

export const countTokens = async (text: string): Promise<number> => {
  try {
    const { data, error } = await supabase.rpc('count_tokens', {
      text_input: text
    });
    
    if (error) {
      console.error('Error counting tokens:', error);
      return text.split(/\s+/).length; // Fallback to basic word count
    }
    
    return data;
  } catch (error) {
    console.error('Error counting tokens:', error);
    return text.split(/\s+/).length; // Fallback to basic word count
  }
};
