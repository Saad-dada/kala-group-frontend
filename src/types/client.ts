export type Client = {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string }>;
      };
    }>;
  };
};