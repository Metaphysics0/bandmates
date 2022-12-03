import { IProfile } from "../types/database";
import ProfileCard from "./profileCard/ProfileCard";

export default function MusiciansList({
  musicians,
}: {
  musicians?: IProfile[];
}) {
  return !musicians || musicians.length === 0 ? (
    <div>
      <h3>No musicians</h3>
    </div>
  ) : (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
      {musicians.map((musician) => (
        <ProfileCard key={musician.id} profile={musician} />
      ))}
    </div>
  );
}
