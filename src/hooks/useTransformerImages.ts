import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export interface TransformerImage {
  id: string;
  title: string;
  description: string | null;
  image_path: string;
  category: string;
  created_at: string;
  url?: string;
}

export const useTransformerImages = () => {
  return useQuery({
    queryKey: ["transformer-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transformer_images")
        .select("*")
        .returns<TransformerImage[]>();

      if (error) throw error;

      const imagesWithUrls = await Promise.all(
        data.map(async (image) => {
          const { data: { publicUrl } } = supabase.storage
            .from("transformer_images")
            .getPublicUrl(image.image_path);

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