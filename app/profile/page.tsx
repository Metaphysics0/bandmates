import ProfileForm from "../../ui/profilePage/ProfileForm";
import { Users } from "../../lib/supabase/db";
import supabaseServer from "../../lib/supabase/supabase-server";
import ProfileCardClient from "../../ui/profilePage/ProfileCardClient";

export default async function ProfilePage() {
  const profile = await Users.loadUserFromCurrentSession(supabaseServer());

  if (!profile) {
    return <div>Unable to load profile at this time ):</div>;
  }
  return (
    <div className="container grid grid-cols-3 m-auto w-full">
      <ProfileForm profile={profile} />
      <div className="flex flex-col items-center justify-center">
        <ProfileCardClient />
        <p className="text-slate-800 font-extrabold text-center mt-2 text-lg drop-shadow-md">
          This is how you&apos;ll appear! 👆
        </p>
      </div>
    </div>
  );
}
