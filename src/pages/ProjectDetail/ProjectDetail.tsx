import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProject } from "../../hooks/useProjects";
import GalleryLightbox from "../../components/GalleryLightbox";
import type { ScopeOfWork } from "../../types/project";
import "./project-detail.css";

function extractVideoUrl(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: unknown }).url;
    return typeof url === "string" ? url : "";
  }

  return "";
}

function getAreaForScope(
  areas: {
    area_internal?: number;
    area_external?: number;
    area_civil?: number;
    area_other?: number;
  },
  scope: ScopeOfWork
) {
  switch (scope) {
    case "internal":
      return areas.area_internal;
    case "external":
      return areas.area_external;
    case "civil":
      return areas.area_civil;
    case "other":
      return areas.area_other;
    default:
      return undefined;
  }
}

const scopeLabels: Record<ScopeOfWork, string> = {
  internal: "Internal",
  external: "External",
  civil: "Civil",
  other: "Other",
};

const typeLabels = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
};

function isVideoUrl(url: string): boolean {
  const cleanUrl = url.split("?")[0].toLowerCase();
  return [".mp4", ".webm", ".ogg", ".mov", ".m4v"].some((ext) => cleanUrl.endsWith(ext));
}

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const { data: project, loading, error } = useProject(slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = useMemo(() => {
    if (!project) return [] as string[];
    if (Array.isArray(project.gallery_urls) && project.gallery_urls.length > 0) {
      return project.gallery_urls;
    }
    return project.featured_image_url ? [project.featured_image_url] : [];
  }, [project]);

  const videoUrls = useMemo(() => {
    if (!project) return [] as string[];

    const urlsFromRepeater = (project.acf.videos ?? [])
      .map((item) => extractVideoUrl(item?.video))
      .filter(Boolean);

    if (urlsFromRepeater.length > 0) {
      return urlsFromRepeater;
    }

    const fallbackUrl = extractVideoUrl(project.acf.video_url ?? project.acf.project_video);
    if (fallbackUrl) {
      return [fallbackUrl];
    }

    return [] as string[];
  }, [project]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (loading) {
    return (
      <main className="project-detail-page">
        <div className="state-block" style={{ padding: "120px 24px" }}>
          <div className="spinner" />
          <p style={{ marginTop: 12 }}>Loading project...</p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="project-detail-page">
        <div className="state-block" style={{ padding: "120px 24px" }}>
          <p style={{ fontSize: 18, fontWeight: 700 }}>Project not found</p>
          <p style={{ color: "#9ca3af", marginTop: 6 }}>Please check the URL or return to projects.</p>
          <Link to="/projects" className="back-link" style={{ marginTop: 12 }}>
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const { acf, title, featured_image_url } = project;

  return (
    <main className="project-detail-page">
      <section
        className="default-hero"
        style={{ backgroundImage: featured_image_url ? `url(${featured_image_url})` : undefined }}
      >
        <Link to="/projects" className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </Link>

        <div className="project-detail-hero-content">
          <div className="breadcrumb">
            <Link to="/projects">Projects</Link> / <span>{title.rendered}</span>
          </div>
          <h1 className="detail-title" dangerouslySetInnerHTML={{ __html: title.rendered }} />
          <div className="badge-row">
            <span className={`badge status-${acf.project_status}`}>{acf.project_status}</span>
            <span className="badge">{typeLabels[acf.project_type]}</span>
          </div>
        </div>
      </section>

      <section className="detail-body">
        <div className="section-card card-stack">
          <h3 className="section-title">Overview</h3>
          <div className="meta-grid">
            <div className="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                <path d="M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
              </svg>
              <span>{acf.tower_details.floor_count} Floors</span>
            </div>
            <div className="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10m0-6c1.105 0 2-.672 2-1.5S13.105 8 12 8s-2 .672-2 1.5S10.895 11 12 11Zm0 0c1.105 0 2 .672 2 1.5S13.105 14 12 14s-2-.672-2-1.5S10.895 11 12 11Z" />
              </svg>
              <span>₹{acf.tower_details.project_value} Cr</span>
            </div>
            <div className="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <span>{typeLabels[acf.project_type]}</span>
            </div>
            <div className="meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5v14" />
              </svg>
              <span style={{ textTransform: "capitalize" }}>{acf.project_status}</span>
            </div>
          </div>

          {acf.tower_details.description && (
            <p className="detail-description" style={{ marginTop: 6 }}>
              {acf.tower_details.description}
            </p>
          )}
        </div>

        <div className="section-card card-stack">
          <h3 className="section-title">Scope of Work</h3>
          <div className="scope-tags">
            {acf.scope_of_work.map((scope) => {
              const area = getAreaForScope(acf, scope);
              return (
                <span key={scope} className="scope-tag">
                  {scopeLabels[scope]}
                  {area ? ` • ${area.toLocaleString()} sq ft` : ""}
                </span>
              );
            })}
          </div>
        </div>

        {videoUrls.length > 0 && (
          <div className="section-card card-stack gallery-section">
            <h3 className="section-title">Video</h3>
            {videoUrls.map((videoUrl, index) => (
              <div className="project-video-wrap" key={`${videoUrl}-${index}`}>
                <video className="project-video" controls preload="metadata" playsInline>
                  <source src={videoUrl} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}

        <div className="section-card card-stack gallery-section">
          <h3 className="section-title">Gallery</h3>
          {galleryImages.length === 0 && <p className="detail-description">No images available.</p>}
          {galleryImages.length > 0 && (
            <div className="gallery-grid">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="gallery-item"
                  onClick={() => openLightbox(idx)}
                  aria-label={`Open media ${idx + 1}`}
                >
                  {isVideoUrl(img) ? (
                    <>
                      <video
                        src={img}
                        className="gallery-item-media"
                        muted
                        preload="metadata"
                        playsInline
                      />
                      <span className="gallery-video-badge" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <img
                      src={img}
                      alt={`${title.rendered} ${idx + 1}`}
                      loading="lazy"
                      className="gallery-item-media"
                      draggable={false}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <GalleryLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </main>
  );
}
