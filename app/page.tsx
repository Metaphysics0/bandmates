import "../styles/tailwind.css";
import "../styles/globals.css";
import { getMusicians } from "../lib/supabase/db";
import Hero from "../ui/Hero";
import ProfileCard from "../ui/ProfileCard";

export default async function Home() {
  const { data: musicians, error } = await getMusicians();
  if (error) {
    console.error("Error loading musicians", error);
  }

  return (
    <div>
      {await Hero()}
      <div className="search-section py-7 px-5">
        <button className="bg-red-500 text-white font-semibold p-2 rounded-lg shadow-md mr-3">
          Filters
        </button>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Lofi Guitarist"
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="grid grid-flow-row auto-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
        {musicians && musicians.length > 0
          ? musicians.map(ProfileCard)
          : "no profiles"}
      </div>
      <main>Home page</main>
    </div>
  );
}
