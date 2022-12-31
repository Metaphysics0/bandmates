import { Session } from "@supabase/auth-helpers-nextjs";
import { IProfile, ITopSpotifyArtist } from "../types/database";
import { isDateWithinOneWeek } from "../utils/helperMethods";
import { Users } from "./supabase/db";

export class SpotifyApi {
  private BASE_URL = "https://api.spotify.com/v1/me/";
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUsersTopArtists(): Promise<ITopArtistsResponse | undefined> {
    try {
      const response = await fetch(this.BASE_URL + "top/artists", {
        headers: this.authorizationHeaders,
      });
      return await response.json();
    } catch (error) {
      console.log("unable to get users top items", error);
    }
  }

  async getAndSetTopSpotifyArtists(
    user: IProfile
  ): Promise<ITopSpotifyArtist[] | undefined> {
    const { spotify_data_updated_at: lastUpdatedAt = "" } = user;
    if (lastUpdatedAt && isDateWithinOneWeek(lastUpdatedAt)) {
      console.warn("User had their spotify data updated recently. Skipping");
      return;
    }
    const spotifyData = await this.getUsersTopArtists();
    if (!spotifyData?.items) return;

    const { error } = await Users.setSpotifyTopArtists(
      user.id,
      spotifyData.items
    );

    if (error) {
      console.error(
        "Error setting spotify artists",
        JSON.stringify(error, null, 2)
      );
    }

    return spotifyData.items;
  }

  private get authorizationHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }
}

interface ITopArtistsResponse {
  items: ITopSpotifyArtist[];
  total: 50;
  limit: 20;
  offset: 0;
  previous: null;
  href: string;
  next: string;
}
