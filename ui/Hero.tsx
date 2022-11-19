import { createClient } from "pexels";
import SignUpModal from "./SignUpModal";
import DropdownList from "./inputs/DropdownList";
import { USER_TYPE_OPTIONS } from "../data/consts";
import { SelectedOptionProvider } from "./inputs/DropdownListProvider";

export default async function Hero() {
  return (
    <section className="flex sm:flex-col relative justify-between items-center h-auto p-10 pb-20">
      <div className="h-fit pr-24 z-10 text-white sm:pr-0 sm:mb-4">
        <h4 className="title text-6xl font-bold mb-2">
          <span className="sm:hidden">🎸 </span>
          Discover artists
          <span className="md:hidden lg:hidden xl:hidden 2xl:hidden"> 🎸</span>
        </h4>
        <p className="text-2xl">
          The all in one place to meet like-minded musicians and artists.
        </p>
      </div>
      <div className="z-10">
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
              <SignUpModal />
            </SelectedOptionProvider>
          </div>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a
              href=""
              className="text-orange-500 font-medium hover:text-orange-600 transition duration-75 underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
      <div>{await BackgroundVideo()}</div>
    </section>
  );
}

async function BackgroundVideo() {
  const videoLink = await fetchBackgroundVideoLink();
  if (!videoLink) return null;
  return (
    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
      <video
        className="bg min-w-full min-h-full absolute object-cover"
        id="head-image-video"
        src={videoLink}
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
}

const fetchBackgroundVideoLink = async (): Promise<string> => {
  const pexelsClient = createClient(process.env.PEXELS_API_KEY ?? "");
  const { video_files = [] } = await pexelsClient.videos.show({
    id: "4089580",
  });

  if (video_files.length === 0) {
    console.warn("No videos found");
    return "";
  }

  return (
    video_files.find((video) => video && video.quality === "sd")?.link ?? ""
  );
};
