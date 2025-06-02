
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'http://34.133.0.124:54321';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

console.log('Supabase configuration:', {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY.substring(0, 20) + '...'
});

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      },
      fetch: (url, options = {}) => {
        console.log('Fetching from URL:', url);
        console.log('Fetch options:', options);
        
        // Add CORS headers for cross-origin requests
        const headers = {
          ...options.headers,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey'
        };
        
        return fetch(url, {
          ...options,
          headers,
          mode: 'cors'
        }).catch(error => {
          console.error('Fetch error details:', error);
          throw error;
        });
      }
    },
    db: {
      schema: 'public'
    }
  }
);

// Test connection with better error handling
const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error, count } = await supabase
      .from('transformer_questions')
      .select('count', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    } else {
      console.log('Supabase connection successful, question count:', count);
    }
  } catch (networkError) {
    console.error('Network error during connection test:', networkError);
  }
};

// Run test after a short delay to ensure initialization
setTimeout(testConnection, 1000);
