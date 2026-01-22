export type Award = {
  id: number;
  title: { rendered: string };
  content?: { rendered?: string };
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
  acf?: {
    description?: string;
    year?: string;
  };
};