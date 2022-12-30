import "server-only";

import "../styles/tailwind.css";
import "../styles/globals.css";
import NavMenu from "../ui/NavMenu";
import SupabaseListener from "../utils/supabase-listener";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database, IProfile } from "../types/database";
import { headers, cookies } from "next/headers";
import { Users } from "./../lib/supabase/db";
import Providers from "./providers";
import { SpotifyApi } from "../lib/spotify";
import { AuthSession } from "@supabase/supabase-js";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = await Users.loadUserFromSession(session);

  if (session?.provider_token && user) {
    await getAndSetTopSpotifyArtists(user, session);
  }

  return (
    <html>
      <head />
      <body>
        <Providers>
          <NavMenu session={session} />
          <SupabaseListener accessToken={session?.access_token} user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

async function getAndSetTopSpotifyArtists(
  user: IProfile,
  session: AuthSession
) {
  try {
    const spotify = new SpotifyApi(session.provider_token!);
    const spotifyData = await spotify.getUsersTopArtists();
    if (!spotifyData?.items) return;

    await Users.setSpotifyTopArtists(user.id, spotifyData?.items);
  } catch (error) {
    console.warn("Unable to set spotify data on user", error);
  }
}
