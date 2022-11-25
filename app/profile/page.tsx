import ProfileCard from "../../ui/ProfileCard";
import supabase from "../../lib/supabase/supabase-server";

// do not cache this page
export const revalidate = 0;

export default async function ProfilePage() {
  const { data, error } = await supabase().auth.getUser();
  console.log("USER ON THE PAGE", JSON.stringify(data, null, 2));

  return (
    <div className="grid place-content-center">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="First Name"
        aria-label="Full name"
      />
      {/* @ts-ignore */}
      <ProfileCard profile={data} />
    </div>
  );
}
