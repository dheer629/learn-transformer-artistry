import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

interface TransformerArchitectureProps {
  mainImageUrl: string | null;
  isLoading: boolean;
}

const FALLBACK_IMAGE = "/lovable-uploads/601290bb-ddc6-4a28-a3f1-7e2dc0944be7.png";

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
    
    if (retryCount < maxRetries && mainImageUrl) {
      console.log(`Retrying image load (${retryCount + 1}/${maxRetries})`);
      setRetryCount(prev => prev + 1);
      e.currentTarget.src = mainImageUrl;
    } else {
      console.log("Using fallback image");
      toast({
        variant: "destructive",
        title: "Image Loading Error",
        description: "Failed to load the transformer architecture image. Using fallback image.",
      });
      e.currentTarget.src = FALLBACK_IMAGE;
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
      initial="hidden"
      animate="visible"
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
      <Card className="p-6">
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
              <p className="text-sm mt-2">Please check the image configuration</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-primary mb-4">Architecture Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-lg text-blue-700">Encoder</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  Input Embedding Layer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  Positional Encoding
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  Multi-Head Self-Attention
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span>
                  Feed-Forward Networks
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-lg text-green-700">Decoder</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  Output Embedding Layer
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  Masked Multi-Head Attention
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  Cross-Attention with Encoder
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">•</span>
                  Linear & Softmax Layer
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">Key Features</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Parallel processing of input sequences
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Attention-based context understanding
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Position-aware sequence processing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Multi-head attention for diverse feature capture
            </li>
          </ul>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransformerArchitecture;