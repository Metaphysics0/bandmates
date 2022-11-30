import { SupabaseClient } from "@supabase/supabase-js";
import { IProfile } from "../../types/database";
import supabase from "./supabase-browser";

class UsersApi {
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

  async loadUserFromSession(
    supabaseServerInstance: SupabaseClient
  ): Promise<IProfile | undefined> {
    const { data, error } = await supabaseServerInstance.auth.getUser();
    if (error) {
      console.error("Error getting user from session", error);
      return;
    }

    const { data: profile, error: userError } = await this.find(data.user?.id);
    if (userError) {
      console.error("Error loading user", error);
      return;
    }

    return profile[0];
  }
}
export const Users = new UsersApi();
