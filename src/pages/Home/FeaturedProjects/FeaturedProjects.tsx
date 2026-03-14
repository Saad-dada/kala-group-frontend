import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../../hooks/useProjects";
import type { Project, ScopeOfWork } from "../../../types/project";
import "./featured-projects.css";

const AUTOPLAY_INTERVAL = 4000;

const typeLabels = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
};

const scopeLabels: Record<ScopeOfWork, string> = {
  internal: "Internal",
  external: "External",
  civil: "Civil",
  other: "Other",
};

function truncateWords(text: string, limit: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) {
    return text;
  }

  return `${words.slice(0, limit).join(" ")}...`;
}

function getAreaForScope(project: Project, scope: ScopeOfWork): number | undefined {
  switch (scope) {
    case "internal":
      return project.acf.area_internal;
    case "external":
      return project.acf.area_external;
    case "civil":
      return project.acf.area_civil;
    case "other":
      return project.acf.area_other;
    default:
      return undefined;
  }
}

export default function FeaturedProjects() {
  const { data: projects, loading, error } = useProjects();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const displayProjects = projects.slice(0, 4);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? displayProjects.length - 1 : prev - 1));
  }, [displayProjects.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === displayProjects.length - 1 ? 0 : prev + 1));
  }, [displayProjects.length]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused || displayProjects.length === 0) return;

    const interval = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, handleNext, displayProjects.length]);

  const getCardStyle = (index: number) => {
    let position = index - activeIndex;
    if (position < -2) position += displayProjects.length;
    if (position > 2) position -= displayProjects.length;

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

  if (loading) {
    return (
      <section className="featured-section in-view loading">
        <div className="featured-bg-overlay" />
        <div className="featured-container">
          <h2 className="featured-title">Featured Projects</h2>
          <div className="featured-content">
            <div className="project-info skeleton" />
            <div className="projects-carousel skeleton" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-section in-view error">
        <div className="featured-bg-overlay" />
        <div className="featured-container">
          <h2 className="featured-title">Featured Projects</h2>
          <p className="featured-error">Could not load projects right now. Please try again.</p>
          <button className="btn btn--primary" onClick={() => navigate("/projects")}>View All Projects</button>
        </div>
      </section>
    );
  }

  if (displayProjects.length === 0) {
    return (
      <section className="featured-section in-view empty">
        <div className="featured-bg-overlay" />
        <div className="featured-container">
          <h2 className="featured-title">Featured Projects</h2>
          <p className="featured-error">No projects available yet.</p>
          <button className="btn btn--primary" onClick={() => navigate("/projects")}>View All Projects</button>
        </div>
      </section>
    );
  }

  const activeProject = displayProjects[activeIndex];
  const projectDescription = activeProject?.acf?.tower_details?.description || "Explore this featured project.";
  const limitedProjectDescription = truncateWords(projectDescription, 50);

  const handleCardClick = (projectIndex: number, projectSlug: string) => {
    if (projectIndex === activeIndex) {
      navigate(`/projects/${projectSlug}`);
      return;
    }

    setActiveIndex(projectIndex);
  };

  return (
    <section className="featured-section in-view">
      <div className="featured-bg-overlay" />

      <div className="featured-container">
        <h2 className="featured-title">Featured Projects</h2>

        <div className="featured-content">
          <div className="project-info">
            <h3 className="project-name">{activeProject?.title?.rendered || "Untitled Project"}</h3>
            <p className="project-description">{limitedProjectDescription}</p>

            <div className="project-meta-row">
              <span className={`badge status-${activeProject.acf.project_status}`}>{activeProject.acf.project_status}</span>
              <span className="badge">{typeLabels[activeProject.acf.project_type]}</span>
              <span className="meta-pill">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {activeProject.acf.tower_details.floor_count} Floors
              </span>
              <span className="meta-pill">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ₹{activeProject.acf.tower_details.project_value} Cr
              </span>
            </div>

            {activeProject.acf.scope_of_work.length > 0 && (
              <div className="scope-tags">
                {activeProject.acf.scope_of_work.map((scope) => {
                  const area = getAreaForScope(activeProject, scope);
                  return (
                    <span key={scope} className="scope-tag">
                      {scopeLabels[scope]}
                      {area ? ` • ${area.toLocaleString()} sq ft` : ""}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div
            className="projects-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="carousel-track">
              {displayProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`carousel-card ${
                    index === activeIndex ? "active" : ""
                  }`}
                  style={getCardStyle(index)}
                  onClick={() => handleCardClick(index, project.slug)}
                >
                  <div className="card-image">
                    <img
                      src={project?.featured_image_url || "/images/projects/placeholder.jpg"}
                      alt={project?.title?.rendered || "Project"}
                      loading="lazy"
                    />
                  </div>
                  <span className="card-title">{project.title.rendered}</span>
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
