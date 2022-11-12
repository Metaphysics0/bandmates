import { getMusicians } from "../lib/supabase_client";
import "../styles/globals.css";
import Hero from "../ui/Hero";
import ProfileCard from "../ui/ProfileCard";

export default async function Home() {
  const { data: musicians, error } = await getMusicians();
  console.log("MUSICIANS", musicians);

  return (
    <div>
      {await Hero()}

      <div>
        {musicians && musicians.length > 0
          ? musicians.map((musician) => ProfileCard(musician))
          : "no profiles"}
      </div>

      <main>Home page</main>

      <footer>
        <p>My Footer</p>
      </footer>
    </div>
  );
}
