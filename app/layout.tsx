import "server-only";

import "../styles/tailwind.css";
import "../styles/globals.css";
import NavMenu from "../ui/NavMenu";
import SupabaseListener from "../utils/supabase-listener";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/database";
import { headers, cookies } from "next/headers";
import { LoggedInUserProvider } from "../providers/userProvider";
import LoggedInUserListener from "../utils/logged-in-user-listener";
import { Users } from "../lib/supabase/db";

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

  let profile;
  if (session) {
    profile = await Users.loadUserFromSession(session);
  }

  return (
    <html>
      <head />
      <body>
        <LoggedInUserProvider>
          <>
            <NavMenu session={session} />
            <SupabaseListener accessToken={session?.access_token} />
            <LoggedInUserListener profile={profile} />
            {children}
          </>
        </LoggedInUserProvider>
      </body>
    </html>
  );
}
