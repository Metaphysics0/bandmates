import { Users } from "../lib/supabase/db";
import Hero from "../ui/Hero";
import MusiciansList from "../ui/MusiciansList";
import SignUpModal from "../ui/modals/SignUpModal";
import supabaseServer from "../lib/supabase/supabase-server";
import { IProfile } from "../types/database";
import ProfileModal from "../ui/modals/ProfileModal";
import MusiciansListTitle from "../ui/MusiciansListTitle";

export default async function Home() {
  const musicians = await getMusicians();

  return (
    <main>
      <Hero />
      <div className="p-3">
        <MusiciansListTitle />
        <MusiciansList musicians={musicians} />
      </div>
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
