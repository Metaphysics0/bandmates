import "../styles/tailwind.css";
import "../styles/globals.css";

import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/db";
import NavMenu from "../ui/NavMenu";
import SupabaseListener from "../components/supabase-listener";

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

  return (
    <html>
      <head />
      <body>
        <NavMenu />
        <SupabaseListener accessToken={session?.access_token} />
        {children}
      </body>
    </html>
  );
}
