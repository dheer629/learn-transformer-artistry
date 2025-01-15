import React from "react";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg text-blue-900 mb-4">Key Architectural Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium text-blue-800">Processing Capabilities</h4>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Parallel sequence processing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Long-range dependency handling
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-blue-800">Attention Mechanisms</h4>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Multi-head attention architecture
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Context-aware representations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;