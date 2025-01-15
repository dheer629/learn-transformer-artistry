import React from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  content: string;
  analogy: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  content,
  analogy,
}) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in bg-white">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Learn More</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Detailed Explanation:</h4>
                <p className="text-gray-600 leading-relaxed">{content}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Practical Analogy:</h4>
                <p className="text-gray-600 leading-relaxed">{analogy}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default ModuleCard;