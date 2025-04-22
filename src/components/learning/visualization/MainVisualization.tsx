
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { VisualizationProvider } from "./state/VisualizationContext";
import { HeaderSection } from "./sections/HeaderSection";
import { ControlPanelsSection } from "./sections/ControlPanelsSection";
import { VisualizationGuide } from "../components/VisualizationGuide";
import { VisualizationTabs } from "../components/VisualizationTabs";
import { HelpDialogContent } from "../components/HelpDialogContent";
import { IntroDialogContent } from "../components/IntroDialogContent";

const MainVisualization = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <VisualizationProvider>
      <div className="space-y-8 max-w-7xl mx-auto">
        <Card className="p-6 space-y-6 bg-gradient-to-br from-white to-slate-50">
          <HeaderSection 
            onHelpClick={() => setShowHelp(true)}
            onIntroClick={() => setShowIntro(true)}
          />
          
          <ControlPanelsSection />

          <VisualizationTabs />
        </Card>

        <AlertDialog open={showHelp} onOpenChange={setShowHelp}>
          <AlertDialogContent className="max-w-4xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Transformer Playground Guide</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <HelpDialogContent />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button onClick={() => setShowHelp(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Got it, let's explore!
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <AlertDialog open={showIntro} onOpenChange={setShowIntro}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">Welcome to the Transformer Playground</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <IntroDialogContent />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button 
                  onClick={() => setShowIntro(false)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Start Exploring!
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </VisualizationProvider>
  );
};

export default MainVisualization;
