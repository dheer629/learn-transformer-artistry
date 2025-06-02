
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
      persistSession: false
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
);

// Test connection
supabase.from('transformer_questions').select('count', { count: 'exact' }).then(
  ({ data, error, count }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful, question count:', count);
    }
  }
);
