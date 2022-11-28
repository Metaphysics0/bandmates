import { IProfile } from "../../types/database";
import supabase from "./supabase-browser";

class UsersClass {
  async list(loggedInUserId?: string) {
    const baseCriteria = supabase
      .from("profiles")
      .select(`*, musical_instrument(*)`);

    if (loggedInUserId) {
      return await baseCriteria.not("id", "eq", loggedInUserId);
    }

    return await baseCriteria;
  }

  async find(uuid: string) {
    return await supabase.from("profiles").select("*").eq("id", uuid);
  }

  async update(uuid: string, fields: object) {
    return await supabase.from("profiles").update(fields).eq("id", uuid);
  }
}
export const Users = new UsersClass();
