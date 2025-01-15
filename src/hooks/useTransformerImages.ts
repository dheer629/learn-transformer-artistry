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
      // Get the image records from the database
      const { data: dbData, error: dbError } = await supabase
        .from("transformer_images")
        .select("*");

      if (dbError) {
        console.error("Error fetching images:", dbError);
        throw dbError;
      }

      // Now let's get the public URL for each image
      const imagesWithUrls = await Promise.all(
        (dbData as TransformerImage[]).map(async (image) => {
          const { data: publicUrlData } = await supabase.storage
            .from("transformer_images")
            .getPublicUrl(image.image_path);

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