import "server-only";

import "../styles/tailwind.css";
import "../styles/globals.css";
import NavMenu from "../ui/NavMenu";
import SupabaseListener from "../utils/supabase-listener";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/database";
import { headers, cookies } from "next/headers";
import { Users } from "./../lib/supabase/db";
import Providers from "./providers";

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
