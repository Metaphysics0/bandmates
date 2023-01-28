import { Users } from "../../lib/supabase/db";
import supabaseServer from "../../lib/supabase/supabase-server";
import MusiciansList from "../../ui/MusiciansList";

export default async function Likes() {
  const { data: authUser } = await supabaseServer().auth.getUser();
  if (!authUser.user) return generalError;

  const likedUserIds = await Users.getLikedUserIds(authUser.user.id);
  const { data: likedUsers, error } = await Users.listByIds(likedUserIds);

  if (!likedUsers || error) return generalError;

  return (
    <div className="pt-10">
      <h1 className="mx-auto">Liked Users</h1>
      <MusiciansList musicians={likedUsers} />
    </div>
  );
}

const generalError = (
  <>
    <h5>Unable to list liked users at this time ):</h5>
  </>
);
