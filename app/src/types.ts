export interface Repo {
  slug: string;
  repo: string;
  category: string;
  description: string;
  language: string | null;
  tags: string[];
  topics?: string[];
  added: string | null;
  notes: string;
  stars: number | null;
  defaultBranch: string;
  pushedAt: string | null;
  homepage?: string | null;
  hasReadme: boolean;
}
