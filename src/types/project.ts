export type ProjectStatus = "awarded" | "ongoing" | "completed";

export type ScopeOfWork = "internal" | "external" | "civil" | "other";

export type ProjectType = "residential" | "commercial" | "industrial";

export interface TowerDetails {
  description: string;
  floor_count: number;
  project_value: number; // in crores
}

export interface ProjectACF {
  is_featured?: boolean | number | string;
  project_status: ProjectStatus;
  builder?: string;
  scope_of_work: ScopeOfWork[];
  video_url?: string | { url?: string };
  project_video?: string | { url?: string };
  videos?: Array<{
    video?: string | { url?: string } | number;
  }>;
  area_internal?: number;
  area_external?: number;
  area_civil?: number;
  area_other?: number;
  project_type: ProjectType;
  city: string; // Internal use only, do not render
  tower_details: TowerDetails;
}

export interface Project {
  id: number;
  slug: string;
  is_featured?: boolean | number | string;
  title: {
    rendered: string;
  };
  featured_image_url: string;
  gallery_urls: string[];
  acf: ProjectACF;
}

export interface ProjectsResponse {
  data: Project[];
  loading: boolean;
  error: string | null;
}
