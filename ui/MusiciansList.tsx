import { IProfile } from "../types/db";
import ProfileCard from "./ProfileCard";

export default function MusiciansList({
  musicians,
}: {
  musicians: IProfile[] | null;
}) {
  return (
    <div className="grid grid-flow-row auto-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
      {musicians && musicians.length > 0
        ? musicians.map(ProfileCard)
        : "no profiles"}
    </div>
  );
}
