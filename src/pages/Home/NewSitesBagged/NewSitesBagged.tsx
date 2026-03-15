import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../../components/projects/ProjectCard";
import { useProjects } from "../../../hooks/useProjects";
import "./new-sites-bagged.css";

export default function NewSitesBagged() {
  const { data: projects, loading, error } = useProjects();
  const navigate = useNavigate();

  const awardedProjects = useMemo(
    () => projects.filter((project) => project.acf.project_status === "awarded"),
    [projects]
  );

  return (
    <section className="new-sites-section site-section" aria-labelledby="new-sites-bagged-title">
      <div className="new-sites-container">
        <div className="new-sites-shell">
          <div className="new-sites-header">
            <div>
              <h2 id="new-sites-bagged-title" className="new-sites-title">
                New sites bagged
              </h2>
              <p className="new-sites-subtitle">
                Recently awarded projects trusted to our team for high-quality, safety-first delivery.
              </p>
            </div>
            {!loading && !error && awardedProjects.length > 0 && (
              <button className="btn" onClick={() => navigate("/projects")}>View all projects</button>
            )}
          </div>

          {loading && <div className="new-sites-state">Loading awarded projects...</div>}
          {error && !loading && <div className="new-sites-state">Failed to load awarded projects.</div>}

          {!loading && !error && awardedProjects.length === 0 && (
            <div className="new-sites-state">No awarded projects available right now.</div>
          )}

          {!loading && !error && awardedProjects.length > 0 && (
            <div className="new-sites-grid">
              {awardedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
