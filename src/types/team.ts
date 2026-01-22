export type TeamMember = {
  id: number;
  title: { rendered: string };
  content?: { rendered?: string };
  acf?: {
    [key: string]: unknown;
  };
};
