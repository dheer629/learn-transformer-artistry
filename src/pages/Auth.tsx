import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      
      if (session) {
        navigate("/");
      }

      switch (event) {
        case 'USER_UPDATED':
          const { error } = await supabase.auth.getSession();
          if (error) {
            setErrorMessage(getErrorMessage(error));
          }
          break;
        case 'SIGNED_OUT':
          setErrorMessage("");
          break;
        case 'SIGNED_IN':
          setErrorMessage("");
          break;
        case 'USER_DELETED':
          setErrorMessage("Account has been deleted");
          break;
        case 'PASSWORD_RECOVERY':
          setErrorMessage("Check your email for password reset instructions");
          break;
        case 'TOKEN_REFRESHED':
          console.log("Token refreshed");
          break;
        default:
          if (event.includes('ERROR')) {
            console.error("Auth error event:", event);
            setErrorMessage("An authentication error occurred. Please try again.");
          }
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Session error:", error);
        setErrorMessage(getErrorMessage(error));
      } else if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    console.error("Auth error:", error);
    
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case 'invalid_credentials':
          return 'Invalid email or password. Please check your credentials and try again.';
        case 'email_not_confirmed':
          return 'Please verify your email address before signing in.';
        case 'user_not_found':
          return 'No user found with these credentials.';
        case 'invalid_grant':
          return 'Invalid login credentials.';
        case 'invalid_claim':
          return 'Session expired. Please sign in again.';
        default:
          return `Authentication error: ${error.message}`;
      }
    }
    return error.message;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <SupabaseAuth 
            supabaseClient={supabase} 
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                  },
                },
              },
            }}
            theme="light"
            providers={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;