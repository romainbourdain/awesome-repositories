import type { Repo } from "../types";
import { getJson, getText } from "./client";

const base = import.meta.env.BASE_URL;

export function fetchRepos(): Promise<Repo[]> {
  return getJson<Repo[]>(`${base}data/index.json`);
}

export function fetchReadme(slug: string): Promise<string> {
  return getText(`${base}data/readmes/${slug}.md`);
}
