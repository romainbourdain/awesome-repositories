export function formatStars(stars: number | null): string {
  if (stars === null) return "";
  return stars >= 1000 ? `${(stars / 1000).toFixed(stars >= 100_000 ? 0 : 1)}k` : String(stars);
}
