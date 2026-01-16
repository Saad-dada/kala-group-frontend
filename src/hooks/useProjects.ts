import { useEffect, useState } from "react";
import type { Project } from "../types/project";

const API_BASE_URL = "https://cms.kalagroup.webcult.in/wp-json/wp/v2";

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/project?per_page=100`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const projects = (await response.json()) as Project[];
        setData(projects);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Failed to load projects");
          console.error("Error fetching projects:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}

export function useProject(slug: string) {
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/project?slug=${slug}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.status}`);
        }

        const projects = (await response.json()) as Project[];
        
        if (projects.length === 0) {
          throw new Error("Project not found");
        }
        
        setData(projects[0]);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Failed to load project");
          console.error("Error fetching project:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

    return () => controller.abort();
  }, [slug]);

  return { data, loading, error };
}
