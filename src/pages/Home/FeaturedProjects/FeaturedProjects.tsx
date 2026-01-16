import { useState, useEffect, useCallback, useRef } from "react";
import "./featured-projects.css";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "The World Towers",
    description:
      "A landmark 45-storey twin tower development featuring 320 premium residences with world-class amenities, infinity pools, and breathtaking skyline views in the heart of the city.",
    image: "/images/projects/project1.jpg",
  },
  {
    id: 2,
    title: "The Nest",
    description:
      "An eco-conscious residential community offering 180 thoughtfully designed apartments with rooftop gardens, EV charging stations, and energy-efficient systems for modern sustainable living.",
    image: "/images/projects/project2.jpg",
  },
  {
    id: 3,
    title: "Chesterton",
    description:
      "A prestigious 28-storey commercial tower providing 150,000 sq ft of Grade A office space with smart building technology, panoramic lobbies, and dedicated parking facilities.",
    image: "/images/projects/project3.jpg",
  },
  {
    id: 4,
    title: "Sky Gardens",
    description:
      "Ultra-luxury penthouse residences spanning floors 35-50, featuring private terraces, concierge services, spa facilities, and seamless smart home integration throughout each unit.",
    image: "/images/projects/project4.jpg",
  },
];

const AUTOPLAY_INTERVAL = 4000;

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "-50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const getCardStyle = (index: number) => {
    let position = index - activeIndex;
    if (position < -2) position += projects.length;
    if (position > 2) position -= projects.length;

    const isActive = position === 0;
    const isVisible = Math.abs(position) <= 1;

    // Adjust spacing for mobile
    const spacing = isMobile ? 160 : 280;

    return {
      transform: `translateX(${position * spacing}px) scale(${isActive ? 1 : 0.85})`,
      zIndex: isActive ? 3 : 2 - Math.abs(position),
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? "visible" : "hidden",
    } as const;
  };

  const activeProject = projects[activeIndex];

  return (
    <section ref={sectionRef} className={`featured-section ${isVisible ? 'in-view' : ''}`}>
      <div className="featured-bg-overlay" />

      <div className="featured-container">
        <h2 className="featured-title">Featured Projects</h2>

        <div className="featured-content">
          <div className="project-info">
            <h3 className="project-name">{activeProject.title}</h3>
            <p className="project-description">{activeProject.description}</p>
            <button className="project-btn">View Project</button>
          </div>

          <div
            className="projects-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="carousel-track">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`carousel-card ${
                    index === activeIndex ? "active" : ""
                  }`}
                  style={getCardStyle(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="card-image">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                  <span className="card-title">{project.title}</span>
                </div>
              ))}
            </div>

            <div className="carousel-nav">
              <button
                className="nav-btn prev"
                onClick={handlePrev}
                aria-label="Previous project"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="nav-btn next"
                onClick={handleNext}
                aria-label="Next project"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
