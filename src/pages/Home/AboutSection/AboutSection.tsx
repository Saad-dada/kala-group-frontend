import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./about-section.css";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`about-section ${isVisible ? "visible" : ""}`}>
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-header">
              About <span className="about-highlight">Kala Group</span>
            </h2>
            <h1 className="about-title">
              Resourceful.
              <br />
              Reliable. Refined
            </h1>
            <p className="about-description">
              A New Generation firm with a core focus on building activities, at kala we strive for
              customer satisfaction, without compromising on the quality of our work and structures.
              We hold an unmatched reputation for perfection, which is backed up by our proven track
              record: quality, expertise, workmanship, service, competence, and reliability to
              deliver our impressive portfolio of clients/projects.
            </p>
            <button className="btn btn--outline" onClick={() => navigate("/about")}>
              Know More About Us
            </button>
          </div>

          <div className="about-image-wrapper">
            <div className="about-image-container">
              <img src="/images/team-kala.jpeg" alt="Kala Group Team" className="about-building-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
