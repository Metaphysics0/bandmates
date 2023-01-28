import {
  PostgrestResponse,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";
import {
  IProfile,
  IProfileUpdateFields,
  IThinProfile,
  ITopSpotifyArtist,
} from "../../types/database";
import supabase from "./supabase-browser";

class UsersApi {
  private get allProfilesCriteria() {
    return supabase.from("profiles").select(`*`);
  }

  private get onlyEligibleProfilesCriteria() {
    return this.allProfilesCriteria.eq("is_eligible_for_listing", true);
  }

  async list(loggedInUserId?: string | null) {
    if (loggedInUserId) {
      return await this.allProfilesCriteria.not("id", "eq", loggedInUserId);
    }

    return await this.allProfilesCriteria;
  }

  async listByIds(ids: string[]) {
    return this.allProfilesCriteria.in("id", ids);
  }

  async findById(uuid: string) {
    return await this.allProfilesCriteria.eq("id", uuid);
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
    return await this.loadUserFromSession(session);
  }

  async loadUserFromSession(
    session: Session | null
  ): Promise<IProfile | undefined> {
    if (!session) return;
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

  async getLikedUserIds(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from("profiles")
      .select(`liked_users`)
      .eq("id", userId);
    if (data === null) return [];

    if (data && data[0].liked_users) {
      return data[0].liked_users;
    }

    if (error) {
      console.error("Error loading liked users", error);
      return [];
    }

    return [];
  }

  async setSpotifyTopArtists(uuid: string, items: ITopSpotifyArtist[]) {
    return await this.updateById(uuid, {
      spotify_data: { items },
      spotify_data_updated_at: new Date().toJSON(),
    });
  }
}
export const Users = new UsersApi();
