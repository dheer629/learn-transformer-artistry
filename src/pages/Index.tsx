import React from "react";
import TransformerVisualization from "@/components/TransformerVisualization";
import LearningModule from "@/components/LearningModule";
import Quiz from "@/components/Quiz";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-12 mb-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Learn Transformer Architecture
          </h1>
          <p className="text-xl opacity-90 animate-slide-in">
            An interactive guide to understanding modern AI's most powerful architecture
          </p>
        </div>
      </header>
      
      <main className="container space-y-12 pb-12">
        <section>
          <TransformerVisualization />
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-primary mb-6">Learning Modules</h2>
          <LearningModule />
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-primary mb-6">Quiz</h2>
          <Quiz />
        </section>
      </main>
    </div>
  );
};

export default Index;