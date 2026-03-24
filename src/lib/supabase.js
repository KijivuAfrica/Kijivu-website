import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL loaded:', supabaseUrl ? '✅ ' + supabaseUrl : '❌ MISSING');
console.log('Supabase Key loaded:', supabaseKey ? '✅ (key present, length=' + supabaseKey.length + ')' : '❌ MISSING');

export const supabase = createClient(supabaseUrl, supabaseKey);
