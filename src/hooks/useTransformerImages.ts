import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type TransformerImage = Database['public']['Tables']['transformer_visualization_images']['Row'];

export const useTransformerImages = () => {
  return useQuery({
    queryKey: ["transformer-visualization-images"],
    queryFn: async () => {
      console.log("Fetching transformer visualization images...");
      
      const { data: images, error } = await supabase
        .from("transformer_visualization_images")
        .select("*");

      if (error) {
        console.error("Error fetching images:", error);
        throw error;
      }

      if (!images || images.length === 0) {
        console.log("No images found in the database");
        return [];
      }

      console.log("Successfully fetched images:", images);
      console.log("Available categories:", images.map(img => img.category));
      
      return images;
    }
  });
};