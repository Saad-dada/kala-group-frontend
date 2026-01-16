import { useEffect, useState, useRef } from "react";
import "./about-section.css";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      number: "12+",
      label: "Years of Experience",
      image: "/images/stats/experience.jpg",
    },
    {
      number: "25+",
      label: "Completed Projects",
      image: "/images/stats/projects.jpg",
    },
    {
      number: "110+",
      label: "Awards Winning",
      image: "/images/stats/awards.jpg",
    },
    {
      number: "30+",
      label: "Satisfied Client",
      image: "/images/stats/client.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`about-section ${isVisible ? "visible" : ""}`}
    >
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-header about-animate">
              About <span className="about-highlight">Kala Group</span>
            </h2>
            <h1 className="about-title about-animate about-delay-1">
              Building with purpose.
              <br />
              Delivering with integrity.
            </h1>
            <p className="about-description about-animate about-delay-2">
              A New Generation firm with a core focus on building activities, at kala we strive for
              customer satisfaction, without compromising on the quality of our work and
              structures. We hold an unmatched reputation for perfection, which is backed up
              by our proven track record: quality, expertise, workmanship, service, competence,
              and reliability to deliver our impressive portfolio of clients/projects.
            </p>
            <button className="about-cta about-animate about-delay-3">
              Know More About Us
            </button>
          </div>

          <div className="about-image-wrapper about-animate about-delay-2">
            <div className="about-image-container">
              <img
                src="/images/about-building.jpg"
                alt="Kala Group Building"
                className="about-building-image"
              />
            </div>
          </div>
        </div>

        <div className="about-stats">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-card about-animate about-delay-${4 + index}`}
            >
              <div
                className="stat-card-bg"
                style={{ backgroundImage: `url(${stat.image})` }}
              />
              <div className="stat-card-overlay" />
              <div className="stat-card-content">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
              <div className="stat-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
