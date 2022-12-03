"use client";

import { useLikedUsers } from "../../providers/likedUserListProvider";
import { IProfile, IThinProfile } from "../../types/database";
import ProfileCard from "../ProfileCard";

export default function LikedMusiciansList({
  currentLoggedInUser,
  initialMusicians,
}: {
  currentLoggedInUser?: IProfile | IThinProfile;
  initialMusicians?: IProfile[];
}) {
  const [likedUsers, setLikedUsers] = useLikedUsers();
  setLikedUsers(initialMusicians || []);

  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
      {likedUsers && likedUsers.length > 0
        ? likedUsers.map((musician) => (
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
