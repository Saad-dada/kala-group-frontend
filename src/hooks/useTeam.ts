import { useEffect, useState } from "react";
import type { TeamMember } from "../types/team";

const API_BASE_URL = "https://cms.kalagroup.webcult.in/wp-json/wp/v2";

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
        const response = await fetch(`${API_BASE_URL}/team?per_page=100`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch team: ${response.status}`);
        }

        const members = (await response.json()) as TeamMember[];
        setData(members);
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
