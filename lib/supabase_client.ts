import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/db";

export const supabase = createClient<Database>(
  process.env.SUPABASE_PUBLIC_URL ?? "",
  process.env.SUPABASE_PUBLIC_KEY ?? ""
);

export async function getMusicians() {
  return await supabase.from("profiles").select(`*`);
}
