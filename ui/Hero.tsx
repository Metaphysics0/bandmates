import "../styles/Nav.module.css";
import EmbedVideo from "./EmbedVideo";

export default function Hero() {
  const logForm = () => {
    console.log("AHH");
  };
  return (
    <section className="flex justify-center h-auto p-10">
      <div className="h-fit">
        <h4 className="title text-3xl">🎸 Discover artists</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
          dignissimos quisquam quos facere aut, quo sint quasi suscipit ipsam
          quae?
        </p>
      </div>
      <div>
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
    </section>
  );
}
