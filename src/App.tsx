import { useEffect } from "react";
import Lenis from "lenis";
import "./styles/App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import FeaturedProjects from "./components/FeaturedProjects";
import CursorFollower from "./components/CursorFollower";

export default function App() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-shell">
      <CursorFollower />
      <Header />
      <main className="site-main">
        <Hero />
        <FeaturedProjects />
      </main>
    </div>
  );
}
