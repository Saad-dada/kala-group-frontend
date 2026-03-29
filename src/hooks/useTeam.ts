import { useEffect, useState } from "react";
import type { TeamMember } from "../types/team";
import { decodeHtmlEntitiesInData } from "../utils/htmlEntities";
import { readCache, writeCache } from "../utils/clientCache";

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

        const CACHE_KEY = "team_members_v1";
        const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours
        const cached = readCache<TeamMember[]>(CACHE_KEY);
        if (cached.data && cached.isFresh) {
          setData(cached.data as TeamMember[]);
          setLoading(false);
          return;
        }

        if (cached.data) {
          // show stale data while we revalidate
          setData(cached.data as TeamMember[]);
        }

        // Request a generic `_embed` so WordPress includes available embedded media
        const response = await fetch(`${API_BASE_URL}/team?per_page=100&_embed`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch team: ${response.status}`);
        }

        const members = decodeHtmlEntitiesInData((await response.json()) as TeamMember[]);
        // Ensure each member has an embedded media URL when possible. Some WP installs
        // return only links (in _links) or featured_media id; in that case fetch the
        // media record for the image source URL so the UI can render photos.
        const enrichMembers = await Promise.all(
          members.map(async (m) => {
            const asAny = m as any;
            const hasEmbedded = asAny._embedded && (asAny._embedded["wp:attachment"] || asAny._embedded["wp:featuredmedia"]);
            if (hasEmbedded) return asAny;

            // If the API provided a link to attachments for this post, fetch that list
            // and attach the first item as an embedded attachment so UI can read source_url.
            const attachmentLink = asAny._links?.["wp:attachment"]?.[0]?.href;
            if (attachmentLink) {
              try {
                const attachRes = await fetch(attachmentLink, { signal: controller.signal });
                if (attachRes.ok) {
                  const attachJson = await attachRes.json();
                  if (Array.isArray(attachJson) && attachJson.length > 0) {
                    asAny._embedded = asAny._embedded || {};
                    asAny._embedded["wp:attachment"] = [attachJson[0]];
                    return asAny;
                  }
                }
              } catch (e) {
                // ignore per-member attachment load errors
              }
            }

            const mediaId = Number(asAny.featured_media || 0);
            if (!mediaId) return asAny;

            try {
              const mediaRes = await fetch(`${API_BASE_URL}/media/${mediaId}`, { signal: controller.signal });
              if (mediaRes.ok) {
                const mediaJson = await mediaRes.json();
                asAny._embedded = asAny._embedded || {};
                // attach as wp:featuredmedia for existing mapping logic
                asAny._embedded["wp:featuredmedia"] = [mediaJson];
              }
            } catch (e) {
              // ignore per-member media load errors
            }
            return asAny;
          })
        );

        const ordered = enrichMembers.slice().reverse();
        setData(ordered);
        writeCache<TeamMember[]>(CACHE_KEY, ordered, CACHE_TTL);
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
