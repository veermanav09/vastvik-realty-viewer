import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lahntbtkexelailmzrew.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaG50YnRrZXhlbGFpbG16cmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MzY3NTksImV4cCI6MjA3NTQxMjc1OX0.R26nB5jmJbrZS-C-EbLZQ67rcuWn8C-iRJ-hLuBXWlA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
