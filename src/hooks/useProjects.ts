import { useEffect, useState } from "react";
import type { Project } from "../types/project";

const API_BASE_URL = "https://cms.kalagroup.webcult.in/wp-json/wp/v2";

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const startTime = Date.now();
    const minLoadingTime = 1500; // 1.5 seconds minimum loading time
    
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
        
        // Ensure minimum loading time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          setData(projects);
          setLoading(false);
        }, remainingTime);
        
      } catch (err: any) {
        if (err.name !== "AbortError") {
          // Ensure minimum loading time even for errors
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
          
          setTimeout(() => {
            setError(err.message ?? "Failed to load projects");
            setLoading(false);
          }, remainingTime);
          
          console.error("Error fetching projects:", err);
        }
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
    const startTime = Date.now();
    const minLoadingTime = 1500; // 1.5 seconds minimum loading time
    
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
        
        // Ensure minimum loading time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          setData(projects[0]);
          setLoading(false);
        }, remainingTime);
        
      } catch (err: any) {
        if (err.name !== "AbortError") {
          // Ensure minimum loading time even for errors
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
          
          setTimeout(() => {
            setError(err.message ?? "Failed to load project");
            setLoading(false);
          }, remainingTime);
          
          console.error("Error fetching project:", err);
        }
      }
    };

    fetchProject();

    return () => controller.abort();
  }, [slug]);

  return { data, loading, error };
}
