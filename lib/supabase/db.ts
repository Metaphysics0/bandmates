import { supabase } from "./client";

export async function getMusicians() {
  return await supabase.from("profiles").select(`*, musical_instrument(*)`);
}
