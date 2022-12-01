import { Session, SupabaseClient } from "@supabase/supabase-js";
import { IProfile, IProfileUpdateFields } from "../../types/database";
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

  async findById(uuid: string) {
    return await supabase.from("profiles").select("*").eq("id", uuid);
  }

  async updateById(uuid: string, fields: IProfileUpdateFields) {
    return await supabase.from("profiles").update(fields).eq("id", uuid);
  }

  async loadUserFromCurrentSession(
    supabaseServerInstance: SupabaseClient
  ): Promise<IProfile | undefined> {
    const {
      data: { session },
      error,
    } = await supabaseServerInstance.auth.getSession();
    if (error) {
      console.error("Error getting user from session", error);
      return;
    }

    if (!session) {
      console.error("Error loading");
      return;
    }
    const { data: profile, error: userError } = await this.findById(
      session.user.id
    );
    if (userError) {
      console.error("Error loading user", error);
      return;
    }

    return profile[0];
  }

  async loadUserFromSession(session: Session): Promise<IProfile | undefined> {
    const { data: profile, error: userError } = await this.findById(
      session.user.id
    );
    if (userError) {
      console.error("Error loading user", userError);
      return;
    }

    return profile[0];
  }
}
export const Users = new UsersApi();
