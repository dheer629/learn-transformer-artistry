
import { useQuery } from "@tanstack/react-query";
import { supabase, withRetry } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type TransformerImage = Database['public']['Tables']['transformer_visualization_images']['Row'];

export const useTransformerImages = () => {
  return useQuery({
    queryKey: ["transformer-visualization-images"],
    queryFn: async () => {
      console.log("Starting to fetch transformer visualization images...");
      
      try {
        const images = await withRetry(async () => {
          const { data, error } = await supabase
            .from("transformer_visualization_images")
            .select("*")
            .order('created_at', { ascending: true });

          if (error) {
            console.error("Database error fetching images:", error);
            throw new Error(`Database error: ${error.message}`);
          }

          return data || [];
        }, 3, 1500);

        if (images.length === 0) {
          console.warn("No images found in the database");
          return [];
        }

        console.log("Successfully fetched images:", images);
        console.log("Image URLs:", images.map(img => img.image_url));
        return images;

      } catch (error) {
        console.error("Failed to fetch transformer images:", error);
        // Return empty array instead of throwing to prevent UI crashes
        return [];
      }
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
};
