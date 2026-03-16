import { useEffect, useState } from "react";
import type { Award } from "../types/award";
import { decodeHtmlEntitiesInData } from "../utils/htmlEntities";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAwards() {
  const [data, setData] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAwards = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/award?per_page=100&_embed`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch awards: ${response.status}`);
        }

        const awards = decodeHtmlEntitiesInData((await response.json()) as Award[]);
        setData(awards);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Failed to load awards");
          console.error("Error fetching awards:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}