export type ProjectStatus = "awarded" | "ongoing" | "completed";

export type ScopeOfWork = "internal" | "external" | "civil" | "other";

export type ProjectType = "residential" | "commercial" | "industrial";

export interface TowerDetails {
  description: string;
  floor_count: number;
  project_value: number; // in crores
}

export interface ProjectACF {
  project_status: ProjectStatus;
  scope_of_work: ScopeOfWork[];
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
