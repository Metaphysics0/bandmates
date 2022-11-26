import ProfileCard from "../../ui/ProfileCard";
import supabase from "../../lib/supabase/supabase-server";
import ProfileForm from "../../ui/ProfileForm";

// do not cache this page
export const revalidate = 0;

export default async function ProfilePage() {
  const { data, error } = await supabase().auth.getUser();
  console.log("USER ON THE PAGE", JSON.stringify(data, null, 2));

  return (
    <div className="container grid grid-cols-2 m-auto w-fit bg-white p-3 rounded-xl drop-shadow-lg mt-24">
      <ProfileForm profile={data.user?.user_metadata} />
      <div className="flex flex-col items-center">
        {/* @ts-ignore */}
        <ProfileCard profile={data.user?.user_metadata} />
        <p className="text-slate-800 font-extrabold text-center mt-2 text-lg drop-shadow-md">
          This is how you&apos;ll appear! 👆
        </p>
      </div>
    </div>
  );
}

const _fileInput = () => {
  return (
    <>
      <label>
        Profile Picture
        <input
          type="file"
          className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
        />
      </label>
      <div className="h-6"></div>
    </>
  );
};
