import "../styles/tailwind.css";
import "../styles/globals.css";
import { getMusicians } from "../lib/supabase/db";
import Hero from "../ui/Hero";
import SearchSection from "../ui/SearchSection";
import { IProfile } from "../types/db";
import MusiciansList from "../ui/MusiciansList";

export default async function Home() {
  const { data: musicians, error }: { data: IProfile[] | null; error: any } =
    await getMusicians();

  if (error) {
    console.error("Error loading musicians", error);
  }

  return (
    <main>
      {await Hero()}
      <SearchSection />
      <MusiciansList musicians={musicians} />
    </main>
  );
}
