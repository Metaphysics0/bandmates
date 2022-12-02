import { Users } from "../lib/supabase/db";
import Hero from "../ui/Hero";
import SearchSection from "../ui/SearchSection";
import MusiciansList from "../ui/MusiciansList";
import { SignUpModalProvider } from "../providers/modalProvider";
import SignUpModal from "../ui/SignUpModal";
import { SelectedOptionProvider } from "../ui/inputs/DropdownListProvider";
import supabaseServer from "../lib/supabase/supabase-server";

export default async function Home() {
  const currentLoggedInUser = await Users.loadUserFromCurrentSession(
    supabaseServer()
  );

  return (
    <main>
      <SignUpModalProvider>
        <SelectedOptionProvider>
          <Hero profile={currentLoggedInUser} />
          <SearchSection />
          {await MusiciansList({ currentLoggedInUser })}
          <SignUpModal />
        </SelectedOptionProvider>
      </SignUpModalProvider>
    </main>
  );
}
