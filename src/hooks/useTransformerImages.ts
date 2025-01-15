import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type TransformerImage = Database['public']['Tables']['transformer_visualization_images']['Row'];

export const useTransformerImages = () => {
  return useQuery({
    queryKey: ["transformer-visualization-images"],
    queryFn: async () => {
      console.log("Starting to fetch transformer visualization images...");
      
      const { data: images, error } = await supabase
        .from("transformer_visualization_images")
        .select("*")
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching images:", error);
        throw error;
      }

      if (!images || images.length === 0) {
        console.warn("No images found in the database");
        return [];
      }

      console.log("Successfully fetched images:", images);
      console.log("Image URLs:", images.map(img => img.image_url));
      return images;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 3,
    retryDelay: 1000
  });
};