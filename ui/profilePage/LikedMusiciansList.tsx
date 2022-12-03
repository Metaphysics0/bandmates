"use client";

import { useLikedUsers } from "../../providers/likedUserListProvider";
import { useLoggedInUser } from "../../providers/userProvider";
import { IProfile } from "../../types/database";
import ProfileCard from "../profileCard/ProfileCard";

export default function LikedMusiciansList({
  initialMusicians,
}: {
  initialMusicians?: IProfile[];
}) {
  const [likedUsers, setLikedUsers] = useLikedUsers();
  setLikedUsers(initialMusicians || []);

  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
      {likedUsers && likedUsers.length > 0 ? (
        likedUsers.map((musician) => (
          <ProfileCard key={musician.id} profile={musician} />
        ))
      ) : (
        <h3>no profiles</h3>
      )}
    </div>
  );
}
