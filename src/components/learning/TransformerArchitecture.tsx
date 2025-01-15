import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface TransformerArchitectureProps {
  mainImageUrl: string | null;
  isLoading: boolean;
}

const TransformerArchitecture: React.FC<TransformerArchitectureProps> = ({
  mainImageUrl,
  isLoading,
}) => {
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
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-full h-auto"
            />
            <p className="text-sm text-gray-600 text-center mt-4 font-medium">
              Complete Transformer Architecture Overview
            </p>
          </div>
        ) : (
          <div className="text-gray-500 text-center">No architecture image available</div>
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