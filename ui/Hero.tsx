import "../styles/Nav.module.css";
import { createClient } from "pexels";

export default async function Hero() {
  const videoLink = await fetchBackgroundVideo();
  return (
    <section className="flex relative justify-center h-auto p-10">
      <div className="h-fit pr-24 z-10 text-white">
        <h4 className="title text-6xl font-bold mb-2">🎸 Discover artists</h4>
        <p className="text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
          dignissimos quisquam quos facere aut, quo sint quasi suscipit ipsam
          quae?
        </p>
      </div>
      <div className="z-10">
        <div className="p-5 bg-sky-200 rounded-xl">
          <iframe
            src="https://www.youtube.com/embed/UBOj6rqRUME"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="mb-4"
            allowFullScreen
          ></iframe>
          <form className="container flex justify-center">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Type your email!"
              className="form-input px-4 py-3 rounded-sm w-11/12"
            />
          </form>
        </div>
      </div>
      <div>{BackgroundVideo(videoLink)}</div>
    </section>
  );
}

function BackgroundVideo(videoLink: string) {
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

const fetchBackgroundVideo = async (): Promise<string> => {
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
