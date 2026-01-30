import { useEffect, useState } from "react";
import type { Firm } from "../types/firm";

const API_BASE_URL = "https://cms.kalagroup.webcult.in/wp-json/wp/v2";

export function useFirms() {
  const [data, setData] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFirms = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/firm?per_page=100&_embed=1`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch firms: ${res.status}`);
        const items = (await res.json()) as Firm[];
        setData(items);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Failed to load firms");
          console.error("Error fetching firms:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFirms();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
