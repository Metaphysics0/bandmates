import supabase from "../../lib/supabase/supabase-server";
import { Users } from "../../lib/supabase/db";
import ProfileForm from "../../ui/profilePage/ProfileForm";
import { ProfileFormProvider } from "../../providers/profileFormProvider";
import ProfileCardClient from "../../ui/profilePage/ProfileCardClient";

export default async function ProfilePage() {
  const { data, error } = await supabase().auth.getUser();
  if (error) {
    return <div>Something went wrong ):</div>;
  }
  const { data: profile, error: userError } = await Users.findById(
    data.user?.id
  );

  if (userError) {
    return <div>Something went wrong ):</div>;
  }

  return (
    <div className="container grid grid-cols-3 m-auto bg-white p-3 rounded-xl drop-shadow-lg mt-10 w-full">
      <ProfileFormProvider>
        <ProfileForm profile={profile[0]} />
        <div className="flex flex-col items-center justify-center">
          <ProfileCardClient profile={profile[0]} />
          <p className="text-slate-800 font-extrabold text-center mt-2 text-lg drop-shadow-md">
            This is how you&apos;ll appear! 👆
          </p>
        </div>
      </ProfileFormProvider>
    </div>
  );
}
