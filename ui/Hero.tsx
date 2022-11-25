import DropdownList from "./inputs/DropdownList";
import { USER_TYPE_OPTIONS } from "../data/consts";
import { SelectedOptionProvider } from "./inputs/DropdownListProvider";
import supabase from "../lib/supabase/supabase-server";
import ProfileCard from "./ProfileCard";
import { UserMetadata } from "@supabase/supabase-js";
import SignOutText from "./inputs/signOutText";
import SignUpWithSpotfiyButton from "./inputs/SignUpWithSpotifyButton";

export default async function Hero() {
  const { data, error } = await supabase().auth.getUser();

  return (
    <section className="flex sm:flex-col relative justify-between items-center h-auto p-10 pb-20">
      <div className="h-fit pr-24 z-10 text-white sm:pr-0 sm:mb-4">
        <div className="title text-6xl font-bold mb-2">
          <span className="sm:hidden">🎸 </span>
          Discover artists
          <span className="md:hidden lg:hidden xl:hidden 2xl:hidden"> 🎸</span>
        </div>
        <p className="text-2xl">
          Meet and collaborate with like-minded musicians and artists.
        </p>
      </div>
      <div className="z-10">
        {data.user?.user_metadata
          ? SignedInProfileCard(data.user?.user_metadata)
          : SignUpModalCard()}
      </div>
      <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          className="bg min-w-full min-h-full absolute object-cover"
          id="head-image-video"
          src="/background_video.mp4"
          autoPlay
          loop
          muted
        ></video>
      </div>
    </section>
  );
}

function SignedInProfileCard(user: UserMetadata) {
  return (
    <div className="p-3 bg-white rounded-xl shadow-xl">
      {/* @ts-ignore */}
      <ProfileCard profile={user} />
      <SignOutText />
    </div>
  );
}

function SignUpModalCard() {
  return (
    <div className="p-5 pb-4 bg-white rounded-xl shadow-xl">
      <div className="video-wrapper mb-4 rounded-md">
        <iframe
          src="https://www.youtube.com/embed/UIofe-CEyII"
          frameBorder="0"
          className="rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="container flex flex-col align-middle justify-center mb-2">
        <SelectedOptionProvider>
          <div className="mb-3">
            <DropdownList options={USER_TYPE_OPTIONS} />
          </div>
          <SignUpWithSpotfiyButton />
        </SelectedOptionProvider>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a
          href=""
          className="text-orange-500 font-medium hover:text-orange-600 transition duration-75 underline"
        >
          Log In
        </a>
      </div>
    </div>
  );
}
