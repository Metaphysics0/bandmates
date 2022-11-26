import { IProfile } from "../../types/database";
import supabase from "./supbase-browser";

export const getMusicians = async (loggedInUserId?: string) => {
  const baseCriteria = supabase
    .from("profiles")
    .select(`*, musical_instrument(*)`);

  if (loggedInUserId) {
    return await baseCriteria.not("id", "eq", loggedInUserId);
  }

  return await baseCriteria;
};

export const getUser = async (uuid: string) =>
  await supabase.from("profiles").select("*").eq("id", uuid);

export const updateUser = async (user: IProfile, fields: object) =>
  await supabase.from("profiles").update(fields).eq("id", user.id);
