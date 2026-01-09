import { useEffect, useState } from "react";
import Lenis from "lenis";
import "./styles/App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import AboutSection from "./components/AboutSection";
import FeaturedProjects from "./components/FeaturedProjects";
import CursorFollower from "./components/CursorFollower";
import LoadingScreen from "./components/LoadingScreen";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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
    <>
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      <div className={`app-shell ${isLoading ? 'hidden' : ''}`}>
        <CursorFollower />
        <Header />
        <main className="site-main">
          <Hero />
          <FeaturedProjects />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
