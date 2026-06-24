import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || supabaseUrl === "undefined") {
  throw new Error(
    "Missing or literal string 'undefined' for NEXT_PUBLIC_SUPABASE_URL",
  );
}
if (!supabaseKey || supabaseKey === "undefined") {
  throw new Error(
    "Missing or literal string 'undefined' for NEXT_PUBLIC_SUPABASE_KEY",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
