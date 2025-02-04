import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { MathJaxContext } from "better-react-mathjax";
import { useToast } from "@/components/ui/use-toast";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session) => {
      console.log("Auth state changed:", event);
      
      if (session) {
        console.log("User signed in");
        setSession(session);
      } else {
        console.log("User signed out");
        setSession(null);
      }

      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Auth />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <MathJaxContext>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </MathJaxContext>
  );
};

export default App;