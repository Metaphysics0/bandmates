import ProfileCard from "../../ui/ProfileCard";
import supabase from "../../lib/supabase/supabase-server";
import { Users } from "../../lib/supabase/db";
import ProfileForm from "../../ui/ProfileForm";

// do not cache this page
export const revalidate = 0;

export default async function ProfilePage() {
  const { data, error } = await supabase().auth.getUser();
  if (error) {
    return <div>Something went wrong ):</div>;
  }
  const { data: profile, error: userError } = await Users.find(data.user?.id);

  if (userError) {
    return <div>Something went wrong ):</div>;
  }

  return (
    <div className="container grid grid-cols-3 m-auto bg-white p-3 rounded-xl drop-shadow-lg mt-24 w-full">
      {/* ts-ignore */}
      <ProfileForm profile={profile[0]} />
      <div className="flex flex-col items-center justify-center">
        {/* ts-ignore */}
        <ProfileCard profile={profile[0]} />
        <p className="text-slate-800 font-extrabold text-center mt-2 text-lg drop-shadow-md">
          This is how you&apos;ll appear! 👆
        </p>
      </div>
    </div>
  );
}
