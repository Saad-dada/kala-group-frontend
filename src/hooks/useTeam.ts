import { useEffect, useState } from "react";
import type { TeamMember } from "../types/team";
import { decodeHtmlEntitiesInData } from "../utils/htmlEntities";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useTeam() {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/team?per_page=100&_embed=wp:featuredmedia`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch team: ${response.status}`);
        }

        const members = decodeHtmlEntitiesInData((await response.json()) as TeamMember[]);
        // return teams in reverse order (newest first)
        setData(members.slice().reverse());
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Failed to load team");
          console.error("Error fetching team:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
