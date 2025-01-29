import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import TransformerArchitecture from "./TransformerArchitecture";

const VisualPlayground = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mainImageUrl, setMainImageUrl] = useState("/lovable-uploads/920119ca-4a91-4285-a54b-f7c7a01af8fa.png");
  const [speed, setSpeed] = useState(1);
  const { toast } = useToast();

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
    toast({
      title: "Animation Speed Updated",
      description: `Speed set to ${value[0]}x`,
    });
  };

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
      className="space-y-8"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">
              Interactive Transformer Architecture
            </h2>
            <p className="text-gray-600">
              Explore and understand the Transformer architecture through this interactive visualization.
              Adjust the animation speed and observe how different components work together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Controls</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">
                    Animation Speed
                  </label>
                  <Slider
                    defaultValue={[1]}
                    max={2}
                    min={0.1}
                    step={0.1}
                    onValueChange={handleSpeedChange}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50">
              <h3 className="font-semibold mb-3">Current Status</h3>
              <div className="space-y-2 text-sm">
                <p>Speed: {speed}x</p>
                <p>Mode: Interactive</p>
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <TransformerArchitecture
              mainImageUrl={mainImageUrl}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <h3 className="font-semibold mb-3">How to Use</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Use the speed slider to control animation speed</li>
              <li>• Click on different components to see detailed explanations</li>
              <li>• Observe how data flows through the architecture</li>
              <li>• Experiment with different configurations</li>
            </ul>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default VisualPlayground;