import "../styles/Nav.module.css";
import { BandMatesLogo } from "./Logo";
import NavBar from "./NavBar";
import WavyNav from "./WavyNav";

export default function Hero() {
  return (
    <section className="container flex justify-center">
      <div className="main-descripton">
        <h4 className="title">Discover artists 🎸</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dignissimos
          quisquam quos facere aut, quo sint quasi suscipit ipsam quae?
        </p>
      </div>
    </section>
  );
}
