import "server-only";

import { SignUpModalProvider } from "../providers/signUpModalProvider";
import { ProfileModalProvider } from "../providers/viewProfileModalProvider";
import { LikedUsersProvider } from "../providers/likedUserListProvider";
import { LoggedInUserProvider } from "../providers/userProvider";
import { SelectedOptionProvider } from "../ui/inputs/DropdownListProvider";
import { ProfileFormProvider } from "../providers/profileFormProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoggedInUserProvider>
      <SignUpModalProvider>
        <ProfileModalProvider>
          <LikedUsersProvider>
            <ProfileFormProvider>
              <SelectedOptionProvider>{children}</SelectedOptionProvider>
            </ProfileFormProvider>
          </LikedUsersProvider>
        </ProfileModalProvider>
      </SignUpModalProvider>
    </LoggedInUserProvider>
  );
}
