import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type TransformerImage = Database['public']['Tables']['transformer_images']['Row'] & {
  url?: string;
};

export const useTransformerImages = () => {
  return useQuery({
    queryKey: ["transformer-images"],
    queryFn: async () => {
      // First, let's verify we can get the images from the database
      const { data, error } = await supabase
        .from("transformer_images")
        .select("*");

      if (error) {
        console.error("Error fetching images:", error);
        throw error;
      }

      // Now let's get the public URL for each image
      const imagesWithUrls = await Promise.all(
        (data as TransformerImage[]).map(async (image) => {
          // Get the public URL using the storage API
          const { data: publicUrlData } = await supabase.storage
            .from("transformer_images")
            .getPublicUrl(image.image_path);

          // Log for debugging
          console.log('Processing image:', {
            title: image.title,
            path: image.image_path,
            publicUrl: publicUrlData.publicUrl
          });

          return {
            ...image,
            url: publicUrlData.publicUrl
          };
        })
      );

      return imagesWithUrls;
    }
  });
};