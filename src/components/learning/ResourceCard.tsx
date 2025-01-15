import React from "react";
import { motion } from "framer-motion";

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  category: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  url,
}) => {
  return (
    <motion.div
      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <h4 className="font-semibold text-lg text-primary">{title}</h4>
      <p className="text-gray-600 mt-1">{description}</p>
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
      >
        View Resources →
      </a>
    </motion.div>
  );
};

export default ResourceCard;