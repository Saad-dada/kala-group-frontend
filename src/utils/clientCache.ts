type CacheEnvelope<T> = {
  ts: number;
  ttl: number;
  data: T;
};

export function readCache<T>(key: string): { data: T | null; isFresh: boolean } {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { data: null, isFresh: false };
    const env = JSON.parse(raw) as CacheEnvelope<T>;
    if (!env || typeof env.ts !== "number") return { data: null, isFresh: false };
    const age = Date.now() - env.ts;
    const isFresh = typeof env.ttl === "number" ? age <= env.ttl : false;
    return { data: env.data ?? null, isFresh };
  } catch {
    return { data: null, isFresh: false };
  }
}

export function writeCache<T>(key: string, data: T, ttl: number) {
  try {
    const env: CacheEnvelope<T> = { ts: Date.now(), ttl, data };
    localStorage.setItem(key, JSON.stringify(env));
  } catch {
    // ignore quota errors
  }
}

export function clearCache(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {}
}
