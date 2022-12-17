export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      musical_instrument: {
        Row: {
          id: string;
          instrument_name: string;
          skill_level: number | null;
          model: string | null;
          type: string | null;
          profile_id: string | null;
        };
        Insert: {
          id?: string;
          instrument_name: string;
          skill_level?: number | null;
          model?: string | null;
          type?: string | null;
          profile_id?: string | null;
        };
        Update: {
          id?: string;
          instrument_name?: string;
          skill_level?: number | null;
          model?: string | null;
          type?: string | null;
          profile_id?: string | null;
        };
      };
      profiles: {
        Row: IProfile;
        Insert: IProfile;
        Update: IProfile;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      meeting_preference: "in_person" | "remote";
      musical_style:
        | "acoustic"
        | "afrobeat"
        | "alt-rock"
        | "alternative"
        | "ambient"
        | "anime"
        | "black-metal"
        | "bluegrass"
        | "blues"
        | "bossanova"
        | "brazil"
        | "breakbeat"
        | "british"
        | "cantopop"
        | "chicago-house"
        | "children"
        | "chill"
        | "classical"
        | "club"
        | "comedy"
        | "country"
        | "dance"
        | "dancehall"
        | "death-metal"
        | "deep-house"
        | "detroit-techno"
        | "disco"
        | "disney"
        | "drum-and-bass"
        | "dub"
        | "dubstep"
        | "edm"
        | "electro"
        | "electronic"
        | "emo"
        | "folk"
        | "forro"
        | "french"
        | "funk"
        | "garage"
        | "german"
        | "gospel"
        | "goth"
        | "grindcore"
        | "groove"
        | "grunge"
        | "guitar"
        | "happy"
        | "hard-rock"
        | "hardcore"
        | "hardstyle"
        | "heavy-metal"
        | "hip-hop"
        | "holidays"
        | "honky-tonk"
        | "house"
        | "idm"
        | "indian"
        | "indie"
        | "indie-pop"
        | "industrial"
        | "iranian"
        | "j-dance"
        | "j-idol"
        | "j-pop"
        | "j-rock"
        | "jazz"
        | "k-pop"
        | "kids"
        | "latin"
        | "latino"
        | "malay"
        | "mandopop"
        | "metal"
        | "metal-misc"
        | "metalcore"
        | "minimal-techno"
        | "movies"
        | "mpb"
        | "new-age"
        | "new-release"
        | "opera"
        | "pagode"
        | "party"
        | "philippines-opm"
        | "piano"
        | "pop"
        | "pop-film"
        | "post-dubstep"
        | "power-pop"
        | "progressive-house"
        | "psych-rock"
        | "punk"
        | "punk-rock"
        | "r-n-b"
        | "rainy-day"
        | "reggae"
        | "reggaeton"
        | "road-trip"
        | "rock"
        | "rock-n-roll"
        | "rockabilly"
        | "romance"
        | "sad"
        | "salsa"
        | "samba"
        | "sertanejo"
        | "show-tunes"
        | "singer-songwriter"
        | "ska"
        | "sleep"
        | "songwriter"
        | "soul"
        | "soundtracks"
        | "spanish"
        | "study"
        | "summer"
        | "swedish"
        | "synth-pop"
        | "tango"
        | "techno"
        | "trance"
        | "trip-hop"
        | "turkish"
        | "work-out"
        | "world-music";
    };
  };
}

export interface IProfile {
  id: string;
  updated_at: string | null;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  sound_snippets: string[] | null;
  age: number | null;
  bio: string | null;
  artist_type: string | null;
  location: string | null;
  liked_users: string[] | null;
  tags: string[] | null;
  instagram_link: string | null;
  whatsapp_link: string | null;
  discord_link: string | null;
}

interface IThinProfile {
  id: string;
  liked_users: string[];
}

export interface IProfileUpdateFields {
  full_name?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  sound_snippets?: string[] | null;
  age?: number | null;
  bio?: string | null;
  artist_type?: string | null;
  location?: string | null;
  liked_users?: string[] | null;
  tags?: (string | undefined)[] | null;
}
