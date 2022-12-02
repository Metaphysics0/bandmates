import ProfileCardSkeleton from "../ui/skeletons/ProfileCard";

function Loading() {
  return (
    <div>
      <section className="flex sm:flex-col relative justify-between items-center h-auto p-10 pb-20 sm:p-10 sm:pb-10">
        <div className="h-fit pr-24 z-10 text-white sm:pr-0 sm:mb-4 sm:mt-14">
          <div className="title text-6xl sm:text-4xl font-bold mb-2">
            <span className="sm:hidden">🎸 </span>
            Discover artists
            <span className="md:hidden lg:hidden xl:hidden 2xl:hidden">
              {" "}
              🎸
            </span>
          </div>
          <p className="text-2xl">
            Meet and collaborate with like-minded musicians and artists.
          </p>
        </div>
        <div className="z-10">
          <ProfileCardSkeleton />
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
      <div className="py-10"></div>
      <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 w-[calc(100%-2rem)] justify-center mx-auto">
        {new Array(10).fill("_").map((idx) => (
          <ProfileCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default Loading;
