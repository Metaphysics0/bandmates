import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/db";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY ?? ""
);
