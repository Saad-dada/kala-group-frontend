import { useEffect, useState } from "react";
import "./hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  // ──────────────────────────────────────────────────────────────────────
  // INITIALIZATION & ANIMATIONS
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    // Trigger entrance animations after a brief delay
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // SCROLL TRACKING
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // DEVICE DETECTION
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Detect mobile/tablet viewport and adapt rendering settings
   */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Content Section */}
      <section className={`hero-section ${isLoaded ? "loaded" : ""}`}>
        {/* Video Background */}
        <div className="hero-video-bg">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/videos/bg-main.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        {/* Hero Content */}
        <div className="hero-container">
          <div
            className="hero-content"
            style={{
              transform: `translateY(${isMobile ? 0 : scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <h1 className="hero-title hero-animate">
              Bringing Colour, Quality & Perfection to Every Space.
            </h1>
            <p className="hero-description hero-animate hero-delay-1">
              Thoughtfully designed residential and commercial projects shaped by
              quality, safety, and innovation.
            </p>
            <button className="btn btn--primary" onClick={() => navigate("/projects")}>
              Explore Projects
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
