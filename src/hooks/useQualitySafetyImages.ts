import { useEffect, useState } from "react";
import { readCache, writeCache } from "../utils/clientCache";

type QualitySafetyImages = {
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  image_5: string;
  image_6: string;
  image_7: string;
};

type UseQualitySafetyImagesResult = {
  images: QualitySafetyImages | null;
  loading: boolean;
  error: string | null;
};

const ENDPOINT = "https://cms.kalagroup.in/wp-json/wp/v2/quality-safety-page";
const MEDIA_ENDPOINT = "https://cms.kalagroup.in/wp-json/wp/v2/media";

const EMPTY_IMAGES: QualitySafetyImages = {
  image_1: "",
  image_2: "",
  image_3: "",
  image_4: "",
  image_5: "",
  image_6: "",
  image_7: "",
};

async function resolveMediaUrl(id: number | ""): Promise<string> {
  if (!id) return "";
  const res = await fetch(`${MEDIA_ENDPOINT}/${id}`);
  if (!res.ok) return "";
  const data = await res.json();
  return (data?.source_url as string) ?? "";
}

export default function useQualitySafetyImages(): UseQualitySafetyImagesResult {
  const [images, setImages] = useState<QualitySafetyImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchImages() {
      try {
        // Try cached first (stale-while-revalidate)
        const CACHE_KEY = "qualitySafety_images_v1";
        const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h
        const cached = readCache<QualitySafetyImages>(CACHE_KEY);
        if (cached.data && !cancelled) {
          setImages(cached.data);
          // if cache is fresh, skip network fetch; otherwise continue to revalidate
          if (cached.isFresh) {
            setLoading(false);
            return;
          }
        }

        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0 || !data[0].acf) {
          if (!cancelled) setImages(EMPTY_IMAGES);
          return;
        }

        const acf = data[0].acf as Record<string, number | "">;

        // Resolve all 7 image IDs to URLs in parallel
        const keys = ["image_1", "image_2", "image_3", "image_4", "image_5", "image_6", "image_7"] as const;
        const urls = await Promise.all(keys.map((key) => resolveMediaUrl(acf[key])));

        const resolved = Object.fromEntries(keys.map((key, i) => [key, urls[i]])) as QualitySafetyImages;
        if (!cancelled) {
          setImages(resolved);
          writeCache<QualitySafetyImages>("qualitySafety_images_v1", resolved, CACHE_TTL);
        }
      } catch (err: any) {
        if (!cancelled) setError(String(err.message ?? err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImages();

    return () => {
      cancelled = true;
    };
  }, []);

  return { images, loading, error };
}