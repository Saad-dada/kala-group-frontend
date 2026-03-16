import { useEffect, useState } from "react";
import "./hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCubeFlippedMobile, setIsCubeFlippedMobile] = useState(false);
  const navigate = useNavigate();

  const goToProjects = () => navigate("/projects");

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

  useEffect(() => {
    if (!isMobile) {
      setIsCubeFlippedMobile(false);
    }
  }, [isMobile]);

  const handleCubeActivate = () => {
    if (isMobile && !isCubeFlippedMobile) {
      setIsCubeFlippedMobile(true);
      return;
    }
    goToProjects();
  };

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
            <button className="btn btn--primary" onClick={() => navigate("/projects")}>
              Explore Projects
            </button>
          </div>

          <div className="hero-cube-zone hero-animate hero-delay-2" aria-label="Project highlights">
            <div
              className={`hero-cube-container ${isCubeFlippedMobile ? "mobile-flipped" : ""}`}
              role="link"
              tabIndex={0}
              onClick={handleCubeActivate}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCubeActivate();
                }
              }}
              aria-label={isMobile && !isCubeFlippedMobile ? "Tap once to preview project details, tap again to view projects" : "View projects"}
            >
              <div className="hero-photo-cube">
                <img className="front" src="/images/projects/project1.jpg" alt="Kala Group project showcase" />
                <div className="back hero-photo-desc">
                  <div className="hero-photo-copy">
                    <h3>Projects You Can Trust</h3>
                    <p>
                      Friendly teams, safety-first execution, and lasting paint finishes for homes,
                      towers, and commercial spaces.
                    </p>
                    <a
                      className="hero-cube-button"
                      href="/projects"
                      onClick={(event) => {
                        event.preventDefault();
                        goToProjects();
                      }}
                    >
                      View Work
                    </a>
                  </div>
                  <span className="hero-photo-dot" aria-hidden="true" />
                </div>
                <img className="left" src="/images/projects/project2.jpg" alt="High-rise painting work" />
                <img className="right" src="/images/projects/project3.jpg" alt="Interior quality finish" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
