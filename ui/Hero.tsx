import "../styles/Nav.module.css";
import { createClient } from "pexels";
import SignUpModal from "./modals/base";

export default async function Hero() {
  return (
    <section className="flex relative justify-between items-center h-auto p-10 pb-20">
      <div className="h-fit pr-24 z-10 text-white">
        <h4 className="title text-6xl font-bold mb-2">🎸 Discover artists</h4>
        <p className="text-2xl">
          Find the perfect musicans and artists to collaborate with.
        </p>
      </div>
      <div className="z-10">
        <div className="p-5 bg-sky-200 rounded-xl shadow-xl">
          <div className="video-wrapper mb-4 border-orange-500 border-2 rounded-md">
            <iframe
              src="https://www.youtube.com/embed/UIofe-CEyII"
              frameBorder="0"
              className="rounded-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="container flex flex-col align-middle justify-center">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Type your email!"
              className="form-input px-4 py-3 mb-3 rounded-lg"
            />
            {/* <button
              className=""
              // onClick={toggleModal}
            >
              Sign up!
            </button> */}
            {<SignUpModal />}
          </div>
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
    video_files.find((video) => video && video.quality === "sd")?.link ?? "sdf"
  );
};
