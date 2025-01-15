import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import TransformerVisualization from "@/components/TransformerVisualization";
import LearningModule from "@/components/LearningModule";
import Quiz from "@/components/Quiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

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
          <Tabs defaultValue="learn" className="space-y-8">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4 gap-2 p-1 bg-muted rounded-lg">
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
                value="applications"
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-3 py-2"
              >
                🌟 Examples
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

              <TabsContent value="applications">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="text-3xl">🌐</span>
                      Real-World Examples
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-xl bg-blue-100 p-2 rounded-lg">💬</span>
                        <div>
                          <h4 className="font-semibold text-lg">ChatGPT & Language Models</h4>
                          <p className="text-gray-600">Powers AI assistants to understand and respond to questions naturally.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-xl bg-green-100 p-2 rounded-lg">🎮</span>
                        <div>
                          <h4 className="font-semibold text-lg">Gaming AI</h4>
                          <p className="text-gray-600">Creates smart characters that can have realistic conversations with players.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-xl bg-purple-100 p-2 rounded-lg">🎨</span>
                        <div>
                          <h4 className="font-semibold text-lg">Creative Tools</h4>
                          <p className="text-gray-600">Helps generate art, music, and stories based on descriptions.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="text-3xl">🚀</span>
                      Future Possibilities
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-600 text-lg">
                        Imagine what you could create with Transformers:
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="text-xl bg-yellow-100 p-2 rounded-lg">📚</span>
                          <div>
                            <h4 className="font-semibold text-lg">Personal Tutor</h4>
                            <p className="text-gray-600">AI that adapts to your learning style and helps you understand complex topics.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-xl bg-red-100 p-2 rounded-lg">🔬</span>
                          <div>
                            <h4 className="font-semibold text-lg">Science Assistant</h4>
                            <p className="text-gray-600">Help analyze data and suggest experiments in your science projects.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-xl bg-orange-100 p-2 rounded-lg">🎯</span>
                          <div>
                            <h4 className="font-semibold text-lg">Study Helper</h4>
                            <p className="text-gray-600">Create flashcards and practice questions from your notes automatically.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </TooltipProvider>
      </main>
    </div>
  );
};

export default Index;