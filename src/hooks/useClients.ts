import { useEffect, useState } from "react";
import type { Client } from "../types/client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useClients() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/client?per_page=100&_embed=1`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch clients: ${res.status}`);
        const items = (await res.json()) as Client[];
        // return clients in reverse order (newest first)
        setData(items.slice().reverse());
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message ?? "Failed to load clients");
          console.error("Error fetching clients:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
