import type { Repo } from "../types";

export const ALL_CATEGORIES = "All";

function tokenize(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

function score(repo: Repo, tokens: string[]): number {
  const name = repo.repo.toLowerCase();
  const rest = [repo.description, repo.category, repo.language ?? "", ...repo.tags, ...(repo.topics ?? []), repo.notes]
    .join(" ")
    .toLowerCase();
  let total = 0;
  for (const token of tokens) {
    if (name.includes(token)) total += 10;
    else if (rest.includes(token)) total += 1;
    else return 0;
  }
  return total;
}

/** Tous les mots doivent correspondre ; le nom du repo pèse plus que le reste ; départage par étoiles. */
export function searchRepos(repos: Repo[], query: string, category: string = ALL_CATEGORIES): Repo[] {
  const tokens = tokenize(query);
  const inCategory = repos.filter((r) => category === ALL_CATEGORIES || r.category === category);
  if (tokens.length === 0) return [...inCategory].sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  return inCategory
    .map((repo) => ({ repo, points: score(repo, tokens) }))
    .filter((x) => x.points > 0)
    .sort((a, b) => b.points - a.points || (b.repo.stars ?? 0) - (a.repo.stars ?? 0))
    .map((x) => x.repo);
}

export function categoriesOf(repos: Repo[]): string[] {
  return [...new Set(repos.map((r) => r.category))].sort();
}
