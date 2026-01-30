import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import ProjectCard from "../../components/projects/ProjectCard";
import type { ProjectStatus, ProjectType } from "../../types/project";
import "./projects.css";

export default function Projects() {
  const { data: projects, loading, error } = useProjects();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ProjectType | "all">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const statusMatch = statusFilter === "all" || project.acf.project_status === statusFilter;
      const typeMatch = typeFilter === "all" || project.acf.project_type === typeFilter;
      return statusMatch && typeMatch;
    });
  }, [projects, statusFilter, typeFilter]);

  return (
    <main className="projects-page">
      <section className="default-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Our Projects</div>
          <h1 className="projects-headline">
            Our Projects
          </h1>
          <p className="projects-lede">Explore our portfolio of residential, commercial, and industrial projects across India.</p>
        </div>
      </section>

      <section className="filters-bar">
        <div className="projects-container" style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            <div className="filter-buttons">
              {(["all", "awarded", "ongoing", "completed"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`filter-button ${statusFilter === status ? "active" : ""}`}
                >
                  {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Type:</span>
            <div className="filter-buttons">
              {(["all", "residential", "commercial", "industrial"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`filter-button ${typeFilter === type ? "active" : ""}`}
                >
                  {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="results-count">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="projects-container">
          {loading && (
            <div className="state-block">
              <div className="spinner" />
              <p style={{ marginTop: 12 }}>Loading projects...</p>
            </div>
          )}

          {error && !loading && (
            <div className="state-block">
              <div style={{ color: "#f87171", fontWeight: 600 }}>Failed to load projects</div>
              <div style={{ color: "#fca5a5", fontSize: 13, marginTop: 6 }}>{error}</div>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="state-block">
              <p style={{ fontSize: 18, fontWeight: 600 }}>No projects found</p>
              <p style={{ color: "#9ca3af", fontSize: 14 }}>Check back later for new projects</p>
            </div>
          )}

          {!loading && !error && projects.length > 0 && filteredProjects.length === 0 && (
            <div className="state-block">
              <p style={{ fontSize: 18, fontWeight: 600 }}>No projects match your filters</p>
              <p style={{ color: "#9ca3af", fontSize: 14 }}>Try adjusting your filters</p>
            </div>
          )}

          {!loading && !error && filteredProjects.length > 0 && (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
