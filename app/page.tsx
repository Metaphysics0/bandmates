import { Users } from "../lib/supabase/db";
import Hero from "../ui/Hero";
import SearchSection from "../ui/SearchSection";
import { IProfile } from "../types/database";
import MusiciansList from "../ui/MusiciansList";
import { SignUpModalProvider } from "../providers/modalProvider";
import SignUpModal from "../ui/SignUpModal";
import { SelectedOptionProvider } from "../ui/inputs/DropdownListProvider";

export default async function Home() {
  const {
    data: musicians,
    error: getMusiciansError,
  }: { data: IProfile[] | null; error: any } = await Users.list();

  if (getMusiciansError) {
    console.error("Error loading musicians", getMusiciansError);
  }

  return (
    <main>
      <SignUpModalProvider>
        <SelectedOptionProvider>
          {await Hero()}
          <SearchSection />
          <MusiciansList musicians={musicians} />
          <SignUpModal />
        </SelectedOptionProvider>
      </SignUpModalProvider>
    </main>
  );
}
