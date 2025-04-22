
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const config = {
    loader: { 
      load: ["input/asciimath", "[tex]/html"] 
    },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    },
    startup: {
      typeset: false
    },
    options: {
      enableMenu: false,
      processHtmlClass: "mathjax"
    }
  };

  return (
    <MathJaxContext version={3} config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </MathJaxContext>
  );
};

export default App;
