import React from "react";
import TransformerVisualization from "@/components/TransformerVisualization";
import LearningModule from "@/components/LearningModule";
import Quiz from "@/components/Quiz";
import MLResources from "@/components/learning/MLResources";
import Author from "@/components/Author";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import VisualPlayground from "@/components/learning/VisualPlayground";

interface IndexProps {
  defaultTab?: string;
}

const Index = ({ defaultTab = "learn" }: IndexProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <header className="bg-primary py-4 sm:py-6 mb-4 sm:mb-8 shadow-lg">
        <div className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white animate-fade-in">
              Learn Transformers 🤖
            </h1>
            <p className="text-sm sm:text-lg text-white/90 animate-slide-in max-w-xl">
              A step-by-step guide to understanding AI's most powerful architecture
            </p>
          </div>
        </div>
      </header>
      
      <main className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12">
        <TooltipProvider>
          <Tabs defaultValue={defaultTab} className="space-y-4 sm:space-y-8">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 p-1 bg-muted rounded-lg text-xs sm:text-sm overflow-x-auto">
              <TabsTrigger 
                value="learn" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 sm:px-3 py-1.5 sm:py-2"
              >
                📚 Learn
              </TabsTrigger>
              <TabsTrigger 
                value="visualize"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 sm:px-3 py-1.5 sm:py-2"
              >
                🔍 Visualize
              </TabsTrigger>
              <TabsTrigger 
                value="practice"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 sm:px-3 py-1.5 sm:py-2"
              >
                ✏️ Practice
              </TabsTrigger>
              <TabsTrigger 
                value="playground"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 sm:px-3 py-1.5 sm:py-2"
              >
                🎮 Play
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 sm:px-3 py-1.5 sm:py-2"
              >
                📚 Docs
              </TabsTrigger>
              <TabsTrigger 
                value="author"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 sm:px-3 py-1.5 sm:py-2"
              >
                👤 About
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 sm:mt-8 space-y-4 sm:space-y-8">
              <TabsContent value="learn">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                  <LearningModule />
                </div>
              </TabsContent>

              <TabsContent value="visualize">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                  <TransformerVisualization />
                </div>
              </TabsContent>

              <TabsContent value="practice">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                  <Quiz />
                </div>
              </TabsContent>

              <TabsContent value="playground">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
                  <VisualPlayground />
                </div>
              </TabsContent>

              <TabsContent value="resources">
                <MLResources />
              </TabsContent>

              <TabsContent value="author">
                <Author />
              </TabsContent>
            </div>
          </Tabs>
        </TooltipProvider>
      </main>
    </div>
  );
};

export default Index;
