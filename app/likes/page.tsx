import { Users } from "../../lib/supabase/db";
import supabaseServer from "../../lib/supabase/supabase-server";
import MusiciansList from "../../ui/MusiciansList";

export default async function Likes() {
  const { data: authUser } = await supabaseServer().auth.getUser();
  if (!authUser.user) return generalError;

  const { data: likedUserIds, error: getLikedUserError } =
    await Users.getLikedUserIds(authUser.user.id);
  if (likedUserIds === null || !likedUserIds[0] || getLikedUserError)
    return generalError;

  const { data: likedUsers, error } = await Users.listByIds(
    likedUserIds[0].liked_users
  );

  if (!likedUsers || error) return generalError;

  return (
    <div className="pt-10">
      <h1 className="mx-auto">Liked users</h1>
      <MusiciansList musicians={likedUsers} />
    </div>
  );
}

const generalError = (
  <>
    <h5>Something went wrong</h5>
  </>
);
