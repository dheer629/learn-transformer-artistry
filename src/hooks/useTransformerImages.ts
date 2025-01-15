import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type TransformerImage = Database['public']['Tables']['transformer_visualization_images']['Row'];

export const useTransformerImages = () => {
  return useQuery({
    queryKey: ["transformer-visualization-images"],
    queryFn: async () => {
      const { data: images, error } = await supabase
        .from("transformer_visualization_images")
        .select("*")
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching images:", error);
        throw error;
      }

      console.log("Fetched images:", images);
      return images || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2
  });
};