import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  content: string;
  analogy: string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  content,
  analogy,
}) => {
  return (
    <motion.div variants={cardVariants}>
      <Card className="p-6 h-full bg-white hover:shadow-lg transition-shadow">
        <motion.div 
          className="flex items-start gap-4"
          variants={contentVariants}
        >
          <span className="text-4xl">{icon}</span>
          <div className="space-y-2">
            <motion.h3 
              className="text-xl font-semibold text-primary"
              variants={contentVariants}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-muted-foreground"
              variants={contentVariants}
            >
              {description}
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-4 space-y-4"
          variants={contentVariants}
        >
          <motion.p 
            className="text-gray-600"
            variants={contentVariants}
          >
            {content}
          </motion.p>
          <motion.div 
            className="bg-muted p-4 rounded-lg"
            variants={contentVariants}
          >
            <p className="italic text-muted-foreground">{analogy}</p>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ModuleCard;