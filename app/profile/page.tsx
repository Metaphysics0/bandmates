import ProfileForm from "../../ui/profilePage/ProfileForm";
import { Users } from "../../lib/supabase/db";
import supabaseServer from "../../lib/supabase/supabase-server";
import ProfileModal from "../../ui/modals/ProfileModal";

export default async function ProfilePage() {
  const profile = await Users.loadUserFromCurrentSession(supabaseServer());

  if (!profile) {
    return <div>Unable to load profile at this time ):</div>;
  }
  return (
    <div className="container m-auto w-full py-14">
      <ProfileForm profile={profile} />
      <ProfileModal />
    </div>
  );
}
