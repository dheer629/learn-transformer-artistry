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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-12 mb-8">
        <div className="container flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">
              Understanding Transformers
            </h1>
            <p className="text-xl opacity-90 animate-slide-in">
              An interactive guide to modern AI's most powerful architecture
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
      </header>
      
      <main className="container pb-12">
        <TooltipProvider>
          <Tabs defaultValue="learn" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 gap-4">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="visualize">Visualize</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="learn" className="space-y-8">
              <LearningModule />
            </TabsContent>

            <TabsContent value="visualize" className="space-y-8">
              <TransformerVisualization />
            </TabsContent>

            <TabsContent value="practice" className="space-y-8">
              <Quiz />
            </TabsContent>

            <TabsContent value="applications" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">Real-World Applications</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <h4 className="font-semibold">Language Translation</h4>
                      <p className="text-gray-600">Powers Google Translate to convert text between languages accurately.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <h4 className="font-semibold">Chatbots</h4>
                      <p className="text-gray-600">Enables AI assistants like ChatGPT to understand and respond to questions.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <h4 className="font-semibold">Text Summarization</h4>
                      <p className="text-gray-600">Creates concise summaries of long documents automatically.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">Future Possibilities</h3>
                <p className="text-gray-600 mb-4">
                  Think about how you could use Transformers in your own projects:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎮</span>
                    <div>
                      <h4 className="font-semibold">Gaming</h4>
                      <p className="text-gray-600">Create NPCs that can have natural conversations with players.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h4 className="font-semibold">Education</h4>
                      <p className="text-gray-600">Build personalized tutoring systems that adapt to each student.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h4 className="font-semibold">Creative Writing</h4>
                      <p className="text-gray-600">Develop tools that help with story ideas and character development.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            </TabsContent>
          </Tabs>
        </TooltipProvider>
      </main>
    </div>
  );
};

export default Index;
