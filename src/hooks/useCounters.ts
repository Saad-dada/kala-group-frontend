import { useEffect, useState } from "react";
import type { CounterItem, WPACFCounter } from "../types/counter";

type UseCountersResult = {
  counters: CounterItem[];
  loading: boolean;
  error: string | null;
};

const ENDPOINT = "https://cms.kalagroup.in/wp-json/wp/v2/counter";

export default function useCounters(): UseCountersResult {
  const [counters, setCounters] = useState<CounterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCounters() {
      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();

        // WordPress returns an array of posts; counters are in acf.counters_list
        if (Array.isArray(data) && data.length > 0 && data[0].acf && Array.isArray(data[0].acf.counters_list)) {
          const list = (data[0].acf.counters_list as WPACFCounter[]).map((c) => ({
            number: (c.counter_title ?? "").toString().trim(),
            label: (c.counter_description ?? "").toString().trim(),
          }));
          if (!cancelled) setCounters(list);
        } else {
          if (!cancelled) setCounters([]);
        }
      } catch (err: any) {
        if (!cancelled) setError(String(err.message ?? err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCounters();

    return () => {
      cancelled = true;
    };
  }, []);

  return { counters, loading, error };
}
