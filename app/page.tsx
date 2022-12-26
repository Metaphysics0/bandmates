import { Users } from "../lib/supabase/db";
import Hero from "../ui/Hero";
import SearchSection from "../ui/SearchSection";
import MusiciansList from "../ui/MusiciansList";
import SignUpModal from "../ui/modals/SignUpModal";
import supabaseServer from "../lib/supabase/supabase-server";
import { IProfile } from "../types/database";
import ProfileModal from "../ui/modals/ProfileModal";

export default async function Home() {
  const musicians = await getMusicians();

  // console.log("MUSICIANS", JSON.stringify(musicians, null, 2));

  return (
    <main>
      <Hero />
      <SearchSection />
      <MusiciansList musicians={musicians} />
      <SignUpModal />
      <ProfileModal />
    </main>
  );
}

async function getMusicians(): Promise<IProfile[] | undefined> {
  const {
    data: { user },
  } = await supabaseServer().auth.getUser();

  const { data: musicians, error: getMusiciansError } = await Users.list(
    user?.id
  );

  if (getMusiciansError) {
    console.error("Error loading musicians", getMusiciansError);
    return;
  }

  return musicians;
}
