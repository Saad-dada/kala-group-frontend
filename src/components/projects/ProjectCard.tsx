import type { Project, ScopeOfWork } from "../../types/project";
import "./project-card.css";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

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

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { acf, title, featured_image_url } = project;

  return (
    <article className="project-card" onClick={onClick}>
      <div className="project-image">
        <img src={featured_image_url} alt={title.rendered} loading="lazy" />
        <div className="card-badges">
          <span className={`badge status-${acf.project_status}`}>{acf.project_status}</span>
          <span className="badge">{typeLabels[acf.project_type]}</span>
        </div>
      </div>

      <div className="card-body">
        <h3
          className="card-title"
          dangerouslySetInnerHTML={{ __html: title.rendered }}
        />

        <div className="card-meta">
          <span className="meta-item">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{acf.tower_details.floor_count} Floors</span>
          </span>
          <span className="meta-item">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>₹{acf.tower_details.project_value} Cr</span>
          </span>
        </div>

        {acf.scope_of_work.length > 0 && (
          <div className="scope-tags">
            {acf.scope_of_work.map((scope) => {
              const area = getAreaForScope(project, scope);
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

      <div className="card-arrow">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </article>
  );
}
