import { ITopSpotifyArtist } from "../types/database";

export class SpotifyApi {
  accessToken: string;
  private BASE_URL = "https://api.spotify.com/v1/me/";

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
