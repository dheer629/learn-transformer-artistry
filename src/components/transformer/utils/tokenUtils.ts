
import { supabase } from "@/integrations/supabase/client";

export const countTokens = async (text: string): Promise<number> => {
  if (!text) return 0;
  
  try {
    const { data, error } = await supabase.rpc('count_tokens', {
      text_input: text
    });
    
    if (error) {
      console.error('Error counting tokens:', error);
      // Fallback to basic word count
      return text.trim().split(/\s+/).filter(Boolean).length;
    }
    
    // The RPC function returns a number, so we can return it directly
    return typeof data === 'number' ? data : text.trim().split(/\s+/).filter(Boolean).length;
  } catch (error) {
    console.error('Error counting tokens:', error);
    // Fallback to basic word count
    return text.trim().split(/\s+/).filter(Boolean).length;
  }
};
