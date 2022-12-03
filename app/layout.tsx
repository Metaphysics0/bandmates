import "server-only";

import "../styles/tailwind.css";
import "../styles/globals.css";
import NavMenu from "../ui/NavMenu";
import SupabaseListener from "../utils/supabase-listener";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../types/database";
import { headers, cookies } from "next/headers";
import { SignUpModalProvider } from "../providers/signUpModalProvider";
import { ProfileModalProvider } from "../providers/viewProfileModalProvider";
import { LikedUsersProvider } from "../providers/likedUserListProvider";

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
        <SignUpModalProvider>
          <ProfileModalProvider>
            <LikedUsersProvider>
              <NavMenu session={session} />
              <SupabaseListener accessToken={session?.access_token} />
              {children}
            </LikedUsersProvider>
          </ProfileModalProvider>
        </SignUpModalProvider>
      </body>
    </html>
  );
}
