import { supabase } from "./client";

export const getMusicians = async () =>
  await supabase.from("profiles").select(`*, musical_instrument(*)`);
