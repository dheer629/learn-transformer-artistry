import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface TransformerArchitectureProps {
  mainImageUrl: string | null;
  isLoading: boolean;
}

const TransformerArchitecture: React.FC<TransformerArchitectureProps> = ({
  mainImageUrl,
  isLoading,
}) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Error loading image:", mainImageUrl);
    setImageError(true);
    
    if (retryCount < maxRetries) {
      // Attempt to reload the image
      setRetryCount(prev => prev + 1);
      e.currentTarget.src = mainImageUrl || '/placeholder.svg';
    } else {
      toast({
        variant: "destructive",
        title: "Image Loading Error",
        description: "Failed to load the transformer architecture image. Using fallback image.",
      });
      e.currentTarget.src = '/placeholder.svg';
    }
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", mainImageUrl);
    setImageError(false);
    setRetryCount(0);
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }}
    >
      <div className="flex justify-center">
        {isLoading ? (
          <Skeleton className="w-full max-w-3xl h-96 rounded-lg" />
        ) : mainImageUrl ? (
          <div className="relative max-w-3xl mx-auto">
            <img 
              src={mainImageUrl} 
              alt="Complete Transformer Architecture"
              className={`rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-full h-auto ${imageError ? 'opacity-50' : ''}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <p className="text-sm text-gray-600 text-center mt-4 font-medium">
              {imageError ? 
                `Error loading image (Attempt ${retryCount}/${maxRetries}) - Using fallback` : 
                "Complete Transformer Architecture Overview"}
            </p>
          </div>
        ) : (
          <div className="text-gray-500 text-center p-8 bg-gray-50 rounded-lg">
            <p>No architecture image available</p>
            <p className="text-sm mt-2">Please check the database configuration</p>
          </div>
        )}
      </div>
      <div className="bg-blue-50 p-4 rounded-lg max-w-3xl mx-auto">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">Key Features</h3>
        <ul className="space-y-2 text-blue-700">
          <li>• Parallel processing of input sequences</li>
          <li>• Attention-based context understanding</li>
          <li>• Position-aware sequence processing</li>
          <li>• Multi-head attention for diverse feature capture</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default TransformerArchitecture;