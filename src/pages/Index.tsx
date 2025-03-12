
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import TransformerVisualization from "@/components/TransformerVisualization";
import LearningModule from "@/components/LearningModule";
import Quiz from "@/components/Quiz";
import MLResources from "@/components/learning/MLResources";
import Author from "@/components/Author";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import VisualPlayground from "@/components/learning/VisualPlayground";

const Index = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-primary py-6 mb-8 shadow-lg">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-fade-in">
                Learn Transformers 🤖
              </h1>
              <p className="text-base sm:text-lg text-white/90 animate-slide-in max-w-xl">
                A step-by-step guide to understanding AI's most powerful architecture
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="text-white border-white hover:bg-white/20"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <TooltipProvider>
          <Tabs defaultValue="playground" className="space-y-8">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-6 gap-2 p-1 bg-muted rounded-lg">
              <TabsTrigger 
                value="learn" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2"
              >
                📚 Learn
              </TabsTrigger>
              <TabsTrigger 
                value="visualize"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2"
              >
                🔍 Visualize
              </TabsTrigger>
              <TabsTrigger 
                value="practice"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2"
              >
                ✏️ Practice
              </TabsTrigger>
              <TabsTrigger 
                value="playground"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2"
              >
                🎮 Playground
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2"
              >
                📚 Resources
              </TabsTrigger>
              <TabsTrigger 
                value="author"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2"
              >
                👤 Author
              </TabsTrigger>
            </TabsList>

            <div className="mt-8 space-y-8">
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
