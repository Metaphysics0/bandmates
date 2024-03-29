export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      musical_instrument: {
        Row: {
          id: string
          instrument_name: string
          model: string | null
          profile_id: string | null
          skill_level: number | null
          type: string | null
        }
        Insert: {
          id?: string
          instrument_name: string
          model?: string | null
          profile_id?: string | null
          skill_level?: number | null
          type?: string | null
        }
        Update: {
          id?: string
          instrument_name?: string
          model?: string | null
          profile_id?: string | null
          skill_level?: number | null
          type?: string | null
        }
      }
      profiles: {
        Row: {
          age: number | null
          artist_type: string | null
          avatar_url: string | null
          bio: string | null
          discord_link: string | null
          email: string | null
          full_name: string | null
          id: string
          instagram_link: string | null
          is_eligible_for_listing: boolean | null
          liked_users: string[] | null
          location: string | null
          profile_photos: string | null
          sound_snippets: string[] | null
          soundcloud_link: string | null
          spotify_data: Json | null
          spotify_data_updated_at: string | null
          spotify_link: string | null
          tags: string[] | null
          twitter_link: string | null
          updated_at: string | null
          whatsapp_link: string | null
        }
        Insert: {
          age?: number | null
          artist_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          discord_link?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          instagram_link?: string | null
          is_eligible_for_listing?: boolean | null
          liked_users?: string[] | null
          location?: string | null
          profile_photos?: string | null
          sound_snippets?: string[] | null
          soundcloud_link?: string | null
          spotify_data?: Json | null
          spotify_data_updated_at?: string | null
          spotify_link?: string | null
          tags?: string[] | null
          twitter_link?: string | null
          updated_at?: string | null
          whatsapp_link?: string | null
        }
        Update: {
          age?: number | null
          artist_type?: string | null
          avatar_url?: string | null
          bio?: string | null
          discord_link?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          instagram_link?: string | null
          is_eligible_for_listing?: boolean | null
          liked_users?: string[] | null
          location?: string | null
          profile_photos?: string | null
          sound_snippets?: string[] | null
          soundcloud_link?: string | null
          spotify_data?: Json | null
          spotify_data_updated_at?: string | null
          spotify_link?: string | null
          tags?: string[] | null
          twitter_link?: string | null
          updated_at?: string | null
          whatsapp_link?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hello: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      meeting_preference: "in_person" | "remote"
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
        | "world-music"
    }
  }
}
