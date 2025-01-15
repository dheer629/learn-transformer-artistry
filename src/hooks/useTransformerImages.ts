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
      const { data, error } = await supabase
        .from("transformer_images")
        .select("*");

      if (error) throw error;

      const imagesWithUrls = await Promise.all(
        (data as TransformerImage[]).map(async (image) => {
          // Get the public URL for the image from the transformer_images bucket
          const { data: { publicUrl } } = supabase.storage
            .from("transformer_images")
            .getPublicUrl(`${image.image_path}`);

          console.log('Image path:', image.image_path);
          console.log('Public URL:', publicUrl);

          return {
            ...image,
            url: publicUrl
          };
        })
      );

      return imagesWithUrls;
    }
  });
};