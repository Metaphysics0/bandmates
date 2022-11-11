export default function EmbedVideo({ videoSrc }: { videoSrc?: string }) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoSrc || "https://www.youtube.com/embed/UBOj6rqRUME"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
