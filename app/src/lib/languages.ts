/** Couleurs des pastilles de langage, comme sur GitHub. */
const COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  Go: "#00ADD8",
  Shell: "#89e051",
  Svelte: "#ff3e00",
  Swift: "#F05138",
  Dockerfile: "#384d54",
  Markdown: "#083fa1",
};

export function languageColor(language: string): string {
  return COLORS[language] ?? "#8b949e";
}
