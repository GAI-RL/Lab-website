import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase env vars. Check your .env.local file and restart the dev server.");
}

// Use placeholder values when env vars are absent so the module loads without
// throwing. Supabase calls will fail gracefully (the forms show an error
// message) rather than crashing the whole app at startup.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
