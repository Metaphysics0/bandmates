import { Users } from "../lib/supabase/db";
import { IProfile } from "../types/database";
import ProfileCard from "./ProfileCard";

export default async function MusiciansList({
  currentLoggedInUser,
}: {
  currentLoggedInUser?: IProfile;
}) {
  const {
    data: musicians,
    error: getMusiciansError,
  }: { data: IProfile[] | null; error: any } = await Users.list();

  if (getMusiciansError) {
    console.error("Error loading musicians", getMusiciansError);
  }

  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
      {musicians && musicians.length > 0
        ? musicians.map((musician) => (
            <ProfileCard
              key={musician.id}
              profile={musician}
              currentLoggedInUser={currentLoggedInUser}
            />
          ))
        : "no profiles"}
    </div>
  );
}
