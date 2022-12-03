import ProfileForm from "../../ui/profilePage/ProfileForm";
import { ProfileFormProvider } from "../../providers/profileFormProvider";
import ProfileCardClient from "../../ui/profilePage/ProfileCardClient";
import { Users } from "../../lib/supabase/db";
import supabaseServer from "../../lib/supabase/supabase-server";

export default async function ProfilePage() {
  const profile = await Users.loadUserFromCurrentSession(supabaseServer());

  if (!profile) {
    return <div>Unable to load profile at this time ):</div>;
  }
  return (
    <div className="container grid grid-cols-3 m-auto bg-white p-3 rounded-xl drop-shadow-lg mt-10 w-full">
      <ProfileForm profile={profile} />
      <div className="flex flex-col items-center justify-center">
        <ProfileCardClient profile={profile} />
        <p className="text-slate-800 font-extrabold text-center mt-2 text-lg drop-shadow-md">
          This is how you&apos;ll appear! 👆
        </p>
      </div>
    </div>
  );
}
