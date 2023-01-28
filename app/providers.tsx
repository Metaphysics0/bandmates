import "server-only";

import { SignUpModalProvider } from "../providers/signUpModalProvider";
import { ProfileModalProvider } from "../providers/viewProfileModalProvider";
import { LikedUsersProvider } from "../providers/likedUserListProvider";
import { LoggedInUserProvider } from "../providers/userProvider";
import { SelectedOptionProvider } from "../ui/inputs/DropdownListProvider";
import { ProfileFormProvider } from "../providers/profileFormProvider";
import { UploadPhotoModalProvider } from "../providers/uploadPhotoModalProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoggedInUserProvider>
      <SignUpModalProvider>
        <ProfileModalProvider>
          <UploadPhotoModalProvider>
            <LikedUsersProvider>
              <ProfileFormProvider>
                <SelectedOptionProvider>{children}</SelectedOptionProvider>
              </ProfileFormProvider>
            </LikedUsersProvider>
          </UploadPhotoModalProvider>
        </ProfileModalProvider>
      </SignUpModalProvider>
    </LoggedInUserProvider>
  );
}
