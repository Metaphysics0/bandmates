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
import { Users } from "./../lib/supabase/db";
import { LoggedInUserProvider } from "../providers/userProvider";
import { SelectedOptionProvider } from "../ui/inputs/DropdownListProvider";
import { ProfileFormProvider } from "../providers/profileFormProvider";

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
        <LoggedInUserProvider>
          <SignUpModalProvider>
            <ProfileModalProvider>
              <LikedUsersProvider>
                <ProfileFormProvider>
                  <SelectedOptionProvider>
                    <NavMenu session={session} />
                    <SupabaseListener
                      accessToken={session?.access_token}
                      user={user}
                    />
                    {children}
                  </SelectedOptionProvider>
                </ProfileFormProvider>
              </LikedUsersProvider>
            </ProfileModalProvider>
          </SignUpModalProvider>
        </LoggedInUserProvider>
      </body>
    </html>
  );
}
