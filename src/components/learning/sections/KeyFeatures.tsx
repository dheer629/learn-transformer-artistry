import React from "react";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg max-w-3xl mx-auto">
      <h3 className="font-semibold text-lg text-blue-800 mb-2">Key Features</h3>
      <ul className="space-y-2 text-blue-700">
        <li>• Parallel processing of input sequences</li>
        <li>• Attention-based context understanding</li>
        <li>• Position-aware sequence processing</li>
        <li>• Multi-head attention for diverse feature capture</li>
      </ul>
    </div>
  );
};

export default KeyFeatures;