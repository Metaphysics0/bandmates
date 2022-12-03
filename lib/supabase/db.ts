import {
  PostgrestResponse,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";
import {
  IProfile,
  IProfileUpdateFields,
  IThinProfile,
} from "../../types/database";
import supabase from "./supabase-browser";

class UsersApi {
  async list(loggedInUserId?: string | null) {
    const baseCriteria = supabase.from("profiles").select(`*`);

    if (loggedInUserId) {
      return await baseCriteria.not("id", "eq", loggedInUserId);
    }

    return await baseCriteria;
  }

  async listByIds(ids: string[]) {
    return supabase.from("profiles").select(`*`).in("id", ids);
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
      console.error("No current auth session");
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

  async likeUser(
    currentLoggedInUser: IProfile | IThinProfile,
    userToLike: IProfile
  ): Promise<PostgrestResponse<any>> {
    return this.updateById(currentLoggedInUser.id, {
      liked_users: [...(currentLoggedInUser.liked_users || []), userToLike.id],
    });
  }

  async unlikeUser(
    currentLoggedInUser: IProfile | IThinProfile,
    userToUnlike: IProfile
  ): Promise<PostgrestResponse<any>> {
    return this.updateById(currentLoggedInUser.id, {
      // @ts-ignore: Object is possibly 'null'.
      liked_users: currentLoggedInUser.liked_users.filter(
        (id) => id !== userToUnlike.id
      ),
    });
  }

  async getLikedUserIds(userId: string) {
    return await supabase
      .from("profiles")
      .select(`liked_users`)
      .eq("id", userId);
  }
}
export const Users = new UsersApi();
