import "server-only";

import "../styles/tailwind.css";
import "../styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import NavMenu from "../ui/NavMenu";
import SupabaseSessionHandler from "../utils/supabase-listener";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/database";
import { headers, cookies } from "next/headers";
import { Users } from "./../lib/supabase/db";
import Providers from "./providers";
import { SpotifyApi } from "../lib/spotify";

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

  let user = await Users.loadUserFromSession(session);

  if (user && session?.provider_token) {
    const spotify = new SpotifyApi(session.provider_token);
    const items = await spotify.getAndSetTopSpotifyArtists(user);
    if (Array.isArray(items)) {
      // setting the user's top artists for the initial session load.:wq

      user = { ...user, spotify_data: { items } };
    }
  }

  return (
    <html>
      <head />
      <body>
        <Providers>
          <NavMenu session={session} />
          <SupabaseSessionHandler
            accessToken={session?.access_token}
            user={user}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
