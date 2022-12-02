import { Users } from "../lib/supabase/db";
import Hero from "../ui/Hero";
import SearchSection from "../ui/SearchSection";
import MusiciansList from "../ui/MusiciansList";
import SignUpModal from "../ui/SignUpModal";
import { SelectedOptionProvider } from "../ui/inputs/DropdownListProvider";
import supabaseServer from "../lib/supabase/supabase-server";
import { IProfile } from "../types/database";
import ProfileModal from "../ui/ProfileModal";

export default async function Home() {
  const currentLoggedInUser = await Users.loadUserFromCurrentSession(
    supabaseServer()
  );

  const {
    data: musicians,
    error: getMusiciansError,
  }: { data: IProfile[] | null; error: any } = await Users.list(
    currentLoggedInUser?.id ?? null
  );

  if (getMusiciansError) {
    console.error("Error loading musicians", getMusiciansError);
  }

  return (
    <main>
      <SelectedOptionProvider>
        <Hero profile={currentLoggedInUser} />
        <SearchSection />
        {getMusiciansError || !musicians || musicians?.length === 0 ? (
          <div>
            <h3>No musicians</h3>
          </div>
        ) : (
          <MusiciansList
            currentLoggedInUser={currentLoggedInUser}
            musicians={musicians}
          />
        )}
        <SignUpModal />
        <ProfileModal />
      </SelectedOptionProvider>
    </main>
  );
}
