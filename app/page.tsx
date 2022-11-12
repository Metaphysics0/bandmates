import "../styles/globals.css";
import Hero from "../ui/Hero";

export default async function Home() {
  return (
    <div>
      {await Hero()}
      <main>Home page</main>

      <footer>
        <p>My Footer</p>
      </footer>
    </div>
  );
}
